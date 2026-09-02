import { 
  sequelize, 
  PersonalInfo, 
  TechStack, 
  Service, 
  Experience, 
  Education, 
  Certification, 
  Volunteering, 
  Project, 
  Testimonial 
} from '../models/index.js';
import * as defaultData from '../../src/data/portfolioData.js';

export async function seedDatabase(force = false) {
  console.log('🌱 Seeding PostgreSQL database with portfolio data...');

  try {
    // 1. Seed Personal Info
    const countPersonal = await PersonalInfo.count();
    if (countPersonal === 0 || force) {
      if (force) await PersonalInfo.destroy({ where: {}, truncate: true, cascade: true });
      await PersonalInfo.create(defaultData.personalInfo);
      console.log('   ✓ Seeded PersonalInfo');
    }

    // 2. Seed Tech Stack
    const countTech = await TechStack.count();
    if (countTech === 0 || force) {
      if (force) await TechStack.destroy({ where: {}, truncate: true, cascade: true });
      const techRecords = defaultData.techStack.map((item, idx) => ({
        id: item.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + idx,
        name: item.name,
        category: item.category,
        level: item.level,
        icon: item.icon,
        order: idx
      }));
      await TechStack.bulkCreate(techRecords);
      console.log(`   ✓ Seeded ${techRecords.length} TechStack items`);
    }

    // 3. Seed Services
    const countServices = await Service.count();
    if (countServices === 0 || force) {
      if (force) await Service.destroy({ where: {}, truncate: true, cascade: true });
      const serviceRecords = defaultData.services.map((item, idx) => ({
        id: item.id || `svc-${idx}`,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        icon: item.icon,
        skills: item.skills,
        projectCount: item.projectCount,
        order: idx
      }));
      await Service.bulkCreate(serviceRecords);
      console.log(`   ✓ Seeded ${serviceRecords.length} Services`);
    }

    // 4. Seed Experiences
    const countExp = await Experience.count();
    if (countExp === 0 || force) {
      if (force) await Experience.destroy({ where: {}, truncate: true, cascade: true });
      const expRecords = defaultData.experiences.map((item, idx) => ({
        id: item.id || `exp-${idx}`,
        type: item.type || 'work',
        role: item.role,
        company: item.company,
        location: item.location,
        period: item.period,
        summary: item.summary,
        achievements: item.achievements,
        tech: item.tech,
        order: idx
      }));
      await Experience.bulkCreate(expRecords);
      console.log(`   ✓ Seeded ${expRecords.length} Experiences`);
    }

    // 5. Seed Education
    const countEdu = await Education.count();
    if (countEdu === 0 || force) {
      if (force) await Education.destroy({ where: {}, truncate: true, cascade: true });
      const eduRecords = defaultData.education.map((item, idx) => ({
        id: item.id || `edu-${idx}`,
        degree: item.degree,
        institution: item.institution,
        location: item.location,
        period: item.period,
        gpa: item.gpa,
        description: item.description,
        highlight: item.highlight,
        order: idx
      }));
      await Education.bulkCreate(eduRecords);
      console.log(`   ✓ Seeded ${eduRecords.length} Education items`);
    }

    // 6. Seed Certifications
    const countCerts = await Certification.count();
    if (countCerts === 0 || force) {
      if (force) await Certification.destroy({ where: {}, truncate: true, cascade: true });
      const certRecords = defaultData.certifications.map((item, idx) => ({
        id: item.id || `cert-${idx}`,
        title: item.title,
        issuer: item.issuer,
        year: item.year,
        topics: item.topics,
        icon: item.icon,
        order: idx
      }));
      await Certification.bulkCreate(certRecords);
      console.log(`   ✓ Seeded ${certRecords.length} Certifications`);
    }

    // 7. Seed Volunteering
    const countVol = await Volunteering.count();
    if (countVol === 0 || force) {
      if (force) await Volunteering.destroy({ where: {}, truncate: true, cascade: true });
      const volRecords = defaultData.volunteering.map((item, idx) => ({
        id: item.id || `vol-${idx}`,
        role: item.role,
        organization: item.organization,
        location: item.location,
        period: item.period,
        description: item.description,
        contributions: item.contributions,
        order: idx
      }));
      await Volunteering.bulkCreate(volRecords);
      console.log(`   ✓ Seeded ${volRecords.length} Volunteering records`);
    }

    // 8. Seed Projects
    const countProj = await Project.count();
    if (countProj === 0 || force) {
      if (force) await Project.destroy({ where: {}, truncate: true, cascade: true });
      const projRecords = defaultData.projects.map((item, idx) => ({
        id: item.id || `proj-${idx}`,
        title: item.title,
        category: item.category,
        categoryKey: item.categoryKey,
        image: item.image,
        client: item.client,
        period: item.period,
        featured: item.featured,
        shortDescription: item.shortDescription,
        fullDescription: item.fullDescription,
        features: item.features,
        tech: item.tech,
        demoUrl: item.demoUrl,
        githubUrl: item.githubUrl,
        order: idx
      }));
      await Project.bulkCreate(projRecords);
      console.log(`   ✓ Seeded ${projRecords.length} Projects`);
    }

    // 9. Seed Testimonial
    const countTest = await Testimonial.count();
    if (countTest === 0 || force) {
      if (force) await Testimonial.destroy({ where: {}, truncate: true, cascade: true });
      await Testimonial.create(defaultData.testimonial);
      console.log('   ✓ Seeded Testimonial');
    }

    console.log('✅ PostgreSQL database seeded successfully with initial dummy data!');
    return true;
  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  }
}

// Standalone execution
if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase(true)
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
