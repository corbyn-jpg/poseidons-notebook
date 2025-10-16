<#
PowerShell script to POST species rows from a CSV into the deployed API.
Usage:
  .\import_species_from_csv.ps1 -CsvPath "C:\path\to\species.csv" -BaseUrl "https://poseidonsnotebook-6c9a06419df4.herokuapp.com" -Token "<JWT>"
Options:
  -CsvPath  Path to CSV file (required)
  -BaseUrl  Base URL of deployed app (default: https://poseidonsnotebook-6c9a06419df4.herokuapp.com)
  -Token    Optional Bearer token for authenticated endpoints
  -DelayMs  Milliseconds to wait between requests (default 200)
  -DryRun   If present, prints payloads instead of sending
  -MaxRows  If set, limit number of rows to POST
#>
param(
    [Parameter(Mandatory=$true)]
    [string]$CsvPath,

    [string]$BaseUrl = "https://poseidonsnotebook-6c9a06419df4.herokuapp.com",

    [string]$Token = "",

    [int]$DelayMs = 200,

    [switch]$DryRun,

    [int]$MaxRows = 0
)

if (-not (Test-Path $CsvPath)) {
    Write-Error "CSV file not found: $CsvPath"
    exit 2
}

# Read CSV
Write-Host "Reading CSV: $CsvPath"
$rows = Import-Csv -Path $CsvPath
$total = $rows.Count
if ($MaxRows -gt 0 -and $MaxRows -lt $total) {
    $rows = $rows[0..($MaxRows-1)]
    $total = $rows.Count
}
Write-Host "Rows to process: $total"

# Function to map CSV row to API payload
function Build-Payload($row) {
    # Map columns to the API's expected fields. Adjust if your backend expects different names.
    return @{
        species_id = if ($row.species_id -ne "") { [int]$row.species_id } else { $null }
        common_name = $row.common_name
        scientific_name = $row.scientific_name
        category = $row.category
        conservation_status = $row.conservation_status
        avg_depth_range = $row.avg_depth_range
        habitat = $row.habitat
        image_url = $row.image_url
        description = $row.description
        size_range = $row.size_range
        diet = $row.diet
        geographic_range = $row.geographic_range
    } | ConvertTo-Json -Depth 6
}

# POST each row
$success = 0
$fail = 0
$index = 0
foreach ($row in $rows) {
    $index++
    $payload = Build-Payload $row
    if ($DryRun) {
        Write-Host "[DRYRUN] Row $index payload:`n$payload`n"
        continue
    }

    $uri = "$BaseUrl/api/species"
    $headers = @{ "Content-Type" = "application/json" }
    if ($Token -ne "") { $headers.Authorization = "Bearer $Token" }

    try {
        $resp = Invoke-RestMethod -Uri $uri -Method Post -Body $payload -Headers $headers -ErrorAction Stop
        Write-Host "[$index/$total] Created: status=OK id=$(($resp | ConvertTo-Json -Depth 2))"
        $success++
    }
    catch {
        $fail++
        Write-Warning "[$index/$total] Failed: $($_.Exception.Message)"
        # Optionally print response body if present
        if ($_.Exception.Response -ne $null) {
            try {
                $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
                $body = $reader.ReadToEnd()
                Write-Host "Response body: $body"
            } catch {}
        }
    }

    Start-Sleep -Milliseconds $DelayMs
}

Write-Host "Import finished. success=$success fail=$fail total=$total"