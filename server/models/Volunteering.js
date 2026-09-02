import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Volunteering = sequelize.define('Volunteering', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organization: {
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
  description: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  contributions: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'volunteerings',
  timestamps: true,
});
