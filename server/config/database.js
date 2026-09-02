import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.ernwqrrbxchbxmlkpalq:IIE4kIUgfPipXWG9@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres';

export const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    keepAlive: true
  },
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 60000,
    idle: 10000
  }
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL database connected successfully via Sequelize ORM.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to PostgreSQL database:', error.message);
    return false;
  }
};
