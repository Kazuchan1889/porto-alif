import express from 'express';
import { 
  PersonalInfo, 
  TechStack, 
  Service, 
  Experience, 
  Education, 
  Certification, 
  Volunteering, 
  Project, 
  Testimonial,
  ContactMessage
} from '../models/index.js';
import { seedDatabase } from '../scripts/seed.js';

const router = express.Router();

// ===================== FULL PORTFOLIO GET =====================
router.get('/portfolio', async (req, res) => {
  try {
    let personalInfo = await PersonalInfo.findOne();
    if (!personalInfo) {
      await seedDatabase(false);
      personalInfo = await PersonalInfo.findOne();
    }

    const techStack = await TechStack.findAll({ order: [['order', 'ASC'], ['createdAt', 'ASC']] });
    const services = await Service.findAll({ order: [['order', 'ASC'], ['createdAt', 'ASC']] });
    const experiences = await Experience.findAll({ order: [['order', 'ASC'], ['createdAt', 'DESC']] });
    const education = await Education.findAll({ order: [['order', 'ASC'], ['createdAt', 'ASC']] });
    const certifications = await Certification.findAll({ order: [['order', 'ASC'], ['createdAt', 'ASC']] });
    const volunteering = await Volunteering.findAll({ order: [['order', 'ASC'], ['createdAt', 'ASC']] });
    const projects = await Project.findAll({ order: [['order', 'ASC'], ['createdAt', 'DESC']] });
    const testimonial = await Testimonial.findOne();
    const contactMessages = await ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
    const unreadMessagesCount = await ContactMessage.count({ where: { read: false } });

    res.json({
      personalInfo,
      techStack,
      services,
      experiences,
      education,
      certifications,
      volunteering,
      projects,
      testimonial,
      contactMessages,
      unreadMessagesCount
    });
  } catch (err) {
    console.error('Error fetching portfolio data:', err);
    res.status(500).json({ error: 'Failed to fetch portfolio data', details: err.message });
  }
});

// ===================== PERSONAL INFO =====================
router.put('/personal-info', async (req, res) => {
  try {
    let info = await PersonalInfo.findOne();
    if (!info) {
      info = await PersonalInfo.create(req.body);
    } else {
      await info.update(req.body);
    }
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update personal info', details: err.message });
  }
});

// ===================== TECH STACK =====================
router.post('/tech-stack', async (req, res) => {
  try {
    const id = req.body.id || (req.body.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now());
    const count = await TechStack.count();
    const item = await TechStack.create({ ...req.body, id, order: count });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create tech stack item', details: err.message });
  }
});

router.put('/tech-stack/:id', async (req, res) => {
  try {
    const item = await TechStack.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Tech stack item not found' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update tech stack item', details: err.message });
  }
});

router.delete('/tech-stack/:id', async (req, res) => {
  try {
    const item = await TechStack.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Tech stack item not found' });
    await item.destroy();
    res.json({ success: true, message: 'Tech stack item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete tech stack item', details: err.message });
  }
});

// ===================== SERVICES =====================
router.post('/services', async (req, res) => {
  try {
    const id = req.body.id || ('svc-' + Date.now());
    const count = await Service.count();
    const item = await Service.create({ ...req.body, id, order: count });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create service', details: err.message });
  }
});

router.put('/services/:id', async (req, res) => {
  try {
    const item = await Service.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Service not found' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update service', details: err.message });
  }
});

router.delete('/services/:id', async (req, res) => {
  try {
    const item = await Service.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Service not found' });
    await item.destroy();
    res.json({ success: true, message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete service', details: err.message });
  }
});

// ===================== EXPERIENCES =====================
router.post('/experiences', async (req, res) => {
  try {
    const id = req.body.id || ('exp-' + Date.now());
    const item = await Experience.create({ ...req.body, id });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create experience', details: err.message });
  }
});

router.put('/experiences/:id', async (req, res) => {
  try {
    const item = await Experience.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Experience not found' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update experience', details: err.message });
  }
});

router.delete('/experiences/:id', async (req, res) => {
  try {
    const item = await Experience.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Experience not found' });
    await item.destroy();
    res.json({ success: true, message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete experience', details: err.message });
  }
});

// ===================== EDUCATION =====================
router.post('/education', async (req, res) => {
  try {
    const id = req.body.id || ('edu-' + Date.now());
    const item = await Education.create({ ...req.body, id });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create education', details: err.message });
  }
});

router.put('/education/:id', async (req, res) => {
  try {
    const item = await Education.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Education not found' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update education', details: err.message });
  }
});

router.delete('/education/:id', async (req, res) => {
  try {
    const item = await Education.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Education not found' });
    await item.destroy();
    res.json({ success: true, message: 'Education deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete education', details: err.message });
  }
});

// ===================== CERTIFICATIONS =====================
router.post('/certifications', async (req, res) => {
  try {
    const id = req.body.id || ('cert-' + Date.now());
    const item = await Certification.create({ ...req.body, id });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create certification', details: err.message });
  }
});

router.put('/certifications/:id', async (req, res) => {
  try {
    const item = await Certification.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Certification not found' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update certification', details: err.message });
  }
});

router.delete('/certifications/:id', async (req, res) => {
  try {
    const item = await Certification.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Certification not found' });
    await item.destroy();
    res.json({ success: true, message: 'Certification deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete certification', details: err.message });
  }
});

// ===================== VOLUNTEERING =====================
router.post('/volunteering', async (req, res) => {
  try {
    const id = req.body.id || ('vol-' + Date.now());
    const item = await Volunteering.create({ ...req.body, id });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create volunteering', details: err.message });
  }
});

router.put('/volunteering/:id', async (req, res) => {
  try {
    const item = await Volunteering.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Volunteering not found' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update volunteering', details: err.message });
  }
});

router.delete('/volunteering/:id', async (req, res) => {
  try {
    const item = await Volunteering.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Volunteering not found' });
    await item.destroy();
    res.json({ success: true, message: 'Volunteering deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete volunteering', details: err.message });
  }
});

// ===================== PROJECTS =====================
router.post('/projects', async (req, res) => {
  try {
    const id = req.body.id || (req.body.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now());
    const item = await Project.create({ ...req.body, id });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project', details: err.message });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const item = await Project.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Project not found' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project', details: err.message });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const item = await Project.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Project not found' });
    await item.destroy();
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project', details: err.message });
  }
});

// ===================== TESTIMONIAL =====================
router.put('/testimonials', async (req, res) => {
  try {
    let test = await Testimonial.findOne();
    if (!test) {
      test = await Testimonial.create(req.body);
    } else {
      await test.update(req.body);
    }
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update testimonial', details: err.message });
  }
});

// ===================== CONTACT MESSAGES & INBOX =====================
router.get('/contact-messages', async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
    const unreadCount = await ContactMessage.count({ where: { read: false } });
    res.json({ messages, unreadCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contact messages', details: err.message });
  }
});

router.post('/contact-messages', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // 1. Save message to PostgreSQL
    const savedMessage = await ContactMessage.create({
      name,
      email,
      subject: subject || 'Pesan Baru dari Pengunjung Portofolio',
      message,
      read: false
    });

    // 2. Fetch configured receiver email
    const personalInfo = await PersonalInfo.findOne();
    const targetEmail = personalInfo?.contactReceiverEmail || personalInfo?.email || 'aliframadhani575@gmail.com';

    // 3. Attempt async email forward to the configured email
    let emailSent = false;
    try {
      const emailResp = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          _subject: subject ? `[Portfolio Inquiry] ${subject} - ${name}` : `[Portfolio Inquiry] Pesan Baru dari ${name}`,
          message,
          _template: 'table',
          _captcha: 'false'
        })
      });
      if (emailResp.ok) {
        emailSent = true;
      }
    } catch (mailErr) {
      console.warn('Auto email dispatch warning (saved to DB):', mailErr.message);
    }

    res.status(201).json({
      success: true,
      message: savedMessage,
      targetEmail,
      emailSent
    });
  } catch (err) {
    console.error('Error creating contact message:', err);
    res.status(500).json({ error: 'Failed to save contact message', details: err.message });
  }
});

router.put('/contact-messages/:id/read', async (req, res) => {
  try {
    const msg = await ContactMessage.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    const newStatus = typeof req.body.read === 'boolean' ? req.body.read : !msg.read;
    await msg.update({ read: newStatus });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update message status', details: err.message });
  }
});

router.delete('/contact-messages/:id', async (req, res) => {
  try {
    const msg = await ContactMessage.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    await msg.destroy();
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message', details: err.message });
  }
});

// ===================== RESET & BULK IMPORT =====================
router.post('/portfolio/reset', async (req, res) => {
  try {
    await seedDatabase(true);
    res.json({ success: true, message: 'Portfolio reset to default dummy data in PostgreSQL' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset portfolio database', details: err.message });
  }
});

export default router;
