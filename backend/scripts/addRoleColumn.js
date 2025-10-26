// Simple script to add 'role' column to users table if missing.
// Usage: node backend/scripts/addRoleColumn.js
const sequelize = require('../config/db');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connection OK');

    // MySQL-specific check
    const [results] = await sequelize.query(
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'Users' AND COLUMN_NAME = 'role'"
    );

    if (results && results.length > 0) {
      console.log('role column already exists; nothing to do.');
      process.exit(0);
    }

    // Add column with default 'user'
    console.log('Adding role column to Users table...');
    await sequelize.query("ALTER TABLE `Users` ADD COLUMN `role` VARCHAR(255) NOT NULL DEFAULT 'user'");
    console.log('role column added successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error adding role column:', err);
    process.exit(1);
  }
})();
