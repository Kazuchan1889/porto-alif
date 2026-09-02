import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtitle: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    defaultValue: 'Layout'
  },
  skills: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  projectCount: {
    type: DataTypes.STRING,
    defaultValue: '5+ Projects'
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'services',
  timestamps: true,
});
