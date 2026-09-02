import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Web App'
  },
  categoryKey: {
    type: DataTypes.STRING,
    defaultValue: 'web'
  },
  image: {
    type: DataTypes.TEXT,
    defaultValue: '/assets/project-network.jpg'
  },
  client: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  period: {
    type: DataTypes.STRING,
    defaultValue: '2026'
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  shortDescription: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  fullDescription: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  features: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  tech: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  demoUrl: {
    type: DataTypes.STRING,
    defaultValue: '#'
  },
  githubUrl: {
    type: DataTypes.STRING,
    defaultValue: '#'
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'projects',
  timestamps: true,
});
