import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const TechStack = sequelize.define('TechStack', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Frontend'
  },
  level: {
    type: DataTypes.STRING,
    defaultValue: 'Advanced'
  },
  icon: {
    type: DataTypes.STRING,
    defaultValue: 'Code2'
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'tech_stacks',
  timestamps: true,
});
