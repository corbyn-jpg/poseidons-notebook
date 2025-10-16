// backend/scripts/check_db.js
// Small diagnostic script to run on the Heroku dyno. Prints non-secret DB env info and species count.
const sequelize = require('../config/db');

(async () => {
  try {
    const env = process.env;
    console.log('DB_HOST=' + (env.DB_HOST || '<not set>'));
    console.log('DB_NAME=' + (env.DB_NAME || '<not set>'));
    console.log('DB_USER=' + (env.DB_USER || '<not set>'));
    console.log('DB_PORT=' + (env.DB_PORT || '<not set>'));
    console.log('JAWSDB_URL_PRESENT=' + (!!env.JAWSDB_URL));

    await sequelize.authenticate();
    const [results] = await sequelize.query('SELECT COUNT(*) AS cnt FROM species');
    const count = results && results[0] && (results[0].cnt || results[0].COUNT || results[0].Cnt) ? (results[0].cnt || results[0].COUNT || results[0].Cnt) : 'unknown';
    console.log('SPECIES_COUNT=' + count);
  } catch (err) {
    console.error('ERROR:', err && err.stack ? err.stack : err);
    process.exit(1);
  }
  process.exit(0);
})();
