import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quote: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'Lead Collaborator'
  },
  company: {
    type: DataTypes.STRING,
    defaultValue: 'Tech Enterprise'
  },
  avatar: {
    type: DataTypes.TEXT,
    defaultValue: '/assets/testimonial-avatar.jpg'
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 5
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'testimonials',
  timestamps: true,
});
