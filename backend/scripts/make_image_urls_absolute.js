const sequelize = require('../config/db');
const Species = require('../models/species');

async function main() {
  const base = process.env.BASE_HOST || process.env.REACT_APP_API_URL || process.env.APP_HOST;
  if (!base) {
    console.error('Please set BASE_HOST (e.g. https://your-app.herokuapp.com)');
    process.exit(2);
  }

  // strip trailing slash if present
  const host = base.replace(/\/$/, '');

  await sequelize.authenticate();
  console.log('DB connected');

  const list = await Species.findAll();
  let updated = 0;

  for (const s of list) {
    const img = s.image_url || '';
    if (!img) continue;
    // only change relative paths starting with '/'
    if (img.startsWith('http')) continue;
    if (img.startsWith('/')) {
      const next = host + img;
      if (next !== img) {
        s.image_url = next;
        await s.save();
        updated++;
        console.log(`Updated ${s.species_id} -> ${next}`);
      }
    }
  }

  console.log(`Done. Updated ${updated} rows.`);
  process.exit(0);
}

main().catch(err => { console.error(err && err.stack ? err.stack : err); process.exit(1); });
