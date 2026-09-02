import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Experience = sequelize.define('Experience', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'work'
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: 'Indonesia'
  },
  period: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  summary: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  achievements: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  tech: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'experiences',
  timestamps: true,
});
