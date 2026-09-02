import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Certification = sequelize.define('Certification', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  issuer: {
    type: DataTypes.STRING,
    defaultValue: 'Certified'
  },
  year: {
    type: DataTypes.STRING,
    defaultValue: '2025'
  },
  topics: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  icon: {
    type: DataTypes.STRING,
    defaultValue: 'Award'
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'certifications',
  timestamps: true,
});
