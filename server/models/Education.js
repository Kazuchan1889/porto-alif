import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Education = sequelize.define('Education', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  degree: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institution: {
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
  gpa: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  highlight: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'educations',
  timestamps: true,
});
