// clean_image_urls.js
// Usage: node backend/scripts/clean_image_urls.js
// This script will normalize `image_url` fields on the `species` table.
const sequelize = require('../config/db');
const Species = require('../models/species');

function normalizeImageUrl(raw) {
  if (raw === null || raw === undefined) return null;
  let s = String(raw).trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  if (s === '') return null;
  if (s.toLowerCase().startsWith('data:')) return s;
  if (s.startsWith('//')) return `https:${s}`;
  if (/^https?:\/\//i.test(s)) return s;
  // keep relative paths as-is (e.g., /images/species/...)
  return s;
}

async function run() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    const rows = await Species.findAll();
    console.log(`Found ${rows.length} species rows`);

    let updated = 0;
    for (const r of rows) {
      const orig = r.image_url;
      const normalized = normalizeImageUrl(orig);
      if (normalized !== orig) {
        r.image_url = normalized;
        await r.save();
        updated++;
        console.log(`Updated id=${r.species_id}: '${orig}' -> '${normalized}'`);
      }
    }

    console.log(`Done. Updated ${updated} rows.`);
    process.exit(0);
  } catch (err) {
    console.error('Error running clean_image_urls:', err && err.stack ? err.stack : err);
    process.exit(2);
  }
}

run();
