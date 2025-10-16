// backend/scripts/dump_species.js
// Diagnostic: print up to 20 rows from the species table as JSON.
const sequelize = require('../config/db');

(async () => {
  try {
    await sequelize.authenticate();
    const [results] = await sequelize.query('SELECT * FROM species LIMIT 20');
    console.log(JSON.stringify(results, null, 2));
  } catch (err) {
    console.error('ERROR:', err && err.stack ? err.stack : err);
    process.exit(1);
  }
  process.exit(0);
})();
