const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const sequelize = require('../config/db');
const Species = require('../models/species');

async function main() {
  await sequelize.authenticate();
  console.log('DB connected');

  // map of available public static media files
  const mediaDir = path.join(__dirname, '..', 'public', 'static', 'media');
  const files = fs.existsSync(mediaDir) ? fs.readdirSync(mediaDir) : [];
  const fileLower = files.reduce((m, f) => { m[f.toLowerCase()] = f; return m; }, {});

  const speciesList = await Species.findAll();
  let updated = 0;

  for (const s of speciesList) {
    const url = s.image_url || '';
    if (!url || !url.startsWith('/images/species/')) continue;

    const filename = url.split('/').pop();
    const candidate = fileLower[filename.toLowerCase()];

    if (candidate) {
      // found an exact file in public/static/media -> create served path
      const newUrl = '/static/media/' + candidate;
      if (s.image_url !== newUrl) {
        s.image_url = newUrl;
        await s.save();
        updated++;
        console.log(`Updated ${s.species_id} -> ${newUrl}`);
      }
    } else {
      // fallback to generic species image already present in static/media
      const fallback = '/static/media/species.b40f02316d60318d0dbe.jpeg';
      if (s.image_url !== fallback) {
        s.image_url = fallback;
        await s.save();
        updated++;
        console.log(`Fallback ${s.species_id} -> ${fallback}`);
      }
    }
  }

  console.log(`Done. Updated ${updated} rows.`);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });