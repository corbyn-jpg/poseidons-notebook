// backend/scripts/query_species.js
// Read-only script to print a preview of species rows and some diagnostics.
// Usage:
//  - Locally: set JAWSDB_URL env or DB_* vars, then: node backend/scripts/query_species.js
//  - On Heroku: heroku run node backend/scripts/query_species.js --app <your-app>

const sequelize = require('../config/db');

(async () => {
  try {
    console.log('Using DB connection from backend/config/db.js');
    if (!process.env.JAWSDB_URL && !process.env.DATABASE_URL && !process.env.DB_NAME) {
      console.log('Warning: no JAWSDB_URL/DATABASE_URL/DB_NAME detected in env — the script will still attempt to connect using config.js settings');
    }

    await sequelize.authenticate();
    console.log('DB authentication OK');

    // Preview rows
    const [rows] = await sequelize.query(`
      SELECT species_id, common_name, image_url
      FROM species
      ORDER BY species_id DESC
      LIMIT 100
    `);

    console.log(`\nPreviewing up to ${rows.length} species rows:\n`);
    for (const r of rows) {
      // Limit image_url length for terminal readability
      const img = r.image_url ? (r.image_url.length > 120 ? r.image_url.slice(0, 120) + '…' : r.image_url) : null;
      console.log(`${r.species_id}	| ${r.common_name}	| ${img}`);
    }

    // Quick summary diagnostics
    const [[counts]] = await sequelize.query(`
      SELECT COUNT(*) AS total,
             SUM(image_url IS NULL) AS null_count,
             SUM(image_url = '') AS empty_count,
             SUM(image_url LIKE '//%') AS protocol_relative
      FROM species
    `);

    console.log('\nSummary:');
    console.log(`Total species: ${counts.total}`);
    console.log(`NULL image_url: ${counts.null_count}`);
    console.log(`Empty image_url: ${counts.empty_count}`);
    console.log(`Protocol-relative (//...) image_url: ${counts.protocol_relative}`);

    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error('ERROR while querying species:', err && err.stack ? err.stack : err);
    process.exit(2);
  }
})();
