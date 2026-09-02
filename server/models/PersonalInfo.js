import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const PersonalInfo = sequelize.define('PersonalInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Muhammad Alif Ramadhani'
  },
  shortName: {
    type: DataTypes.STRING,
    defaultValue: 'Stefan Alif'
  },
  brandName: {
    type: DataTypes.STRING,
    defaultValue: 'ALIF.'
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Front-End & Mobile Developer'
  },
  tagline: {
    type: DataTypes.TEXT,
    defaultValue: 'Building scalable web diagrams, high-performance mobile apps & intelligent data tools.'
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: 'Tangerang, Indonesia'
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: 'aliframadhani575@gmail.com'
  },
  contactReceiverEmail: {
    type: DataTypes.STRING,
    defaultValue: 'aliframadhani575@gmail.com'
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: '+6281511851621'
  },
  whatsapp: {
    type: DataTypes.STRING,
    defaultValue: 'https://wa.me/6281511851621'
  },
  linkedin: {
    type: DataTypes.STRING,
    defaultValue: 'https://www.linkedin.com/in/muhammad-alif-ramadhani-39a281316/'
  },
  github: {
    type: DataTypes.STRING,
    defaultValue: 'https://github.com/aliframadhani'
  },
  cvUrl: {
    type: DataTypes.TEXT,
    defaultValue: '/CV - Muhammad Alif Ramadhani.pdf'
  },
  avatarUrl: {
    type: DataTypes.TEXT,
    defaultValue: '/assets/alip-real-photo.jpg'
  },
  stats: {
    type: DataTypes.JSONB,
    defaultValue: {
      yearsExperience: '1+',
      completedProjects: '12+',
      happyClients: '10+',
      techSkillsCount: '8+'
    }
  }
}, {
  tableName: 'personal_info',
  timestamps: true,
});
