import { sequelize, testConnection } from '../models/index.js';

async function runMigration() {
  console.log('🚀 Starting PostgreSQL Database Migration via Sequelize ORM...');
  
  const connected = await testConnection();
  if (!connected) {
    console.error('❌ Migration failed: Could not connect to PostgreSQL database.');
    process.exit(1);
  }

  try {
    // Sync all defined models to the database schema
    await sequelize.sync({ alter: true });
    console.log('✅ All PostgreSQL tables migrated and synchronized successfully:');
    console.log('   - personal_info');
    console.log('   - tech_stacks');
    console.log('   - services');
    console.log('   - experiences');
    console.log('   - educations');
    console.log('   - certifications');
    console.log('   - volunteerings');
    console.log('   - projects');
    console.log('   - testimonials');
    console.log('🎉 Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

runMigration();
