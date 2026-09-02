import { sequelize } from '../config/database.js';

async function updateSchema() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB');
    await sequelize.query('ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true;');
    console.log('✅ Added isActive column to testimonials table successfully!');
    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error('Schema update error:', err);
    await sequelize.close();
    process.exit(1);
  }
}

updateSchema();
