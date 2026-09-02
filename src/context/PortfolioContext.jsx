import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as defaultData from '../data/portfolioData';

const PortfolioContext = createContext(null);

const STORAGE_KEY = 'portfolio_alif_cms_data_v1';
const API_BASE = '/api';

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          personalInfo: parsed.personalInfo || defaultData.personalInfo,
          techStack: parsed.techStack || defaultData.techStack,
          services: parsed.services || defaultData.services,
          experiences: parsed.experiences || defaultData.experiences,
          education: parsed.education || defaultData.education,
          volunteering: parsed.volunteering || defaultData.volunteering,
          certifications: parsed.certifications || defaultData.certifications,
          projects: parsed.projects || defaultData.projects,
          testimonial: parsed.testimonial || defaultData.testimonial,
          contactMessages: parsed.contactMessages || [],
        };
      }
    } catch (e) {
      console.error('Error reading localStorage initial data:', e);
    }
    return {
      personalInfo: defaultData.personalInfo,
      techStack: defaultData.techStack,
      services: defaultData.services,
      experiences: defaultData.experiences,
      education: defaultData.education,
      volunteering: defaultData.volunteering,
      certifications: defaultData.certifications,
      projects: defaultData.projects,
      testimonial: defaultData.testimonial,
      contactMessages: [],
    };
  });

  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDbConnected, setIsDbConnected] = useState(false);

  // Fetch live portfolio data from PostgreSQL API
  const refreshData = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/portfolio`);
      if (res.ok) {
        const dbData = await res.json();
        setData({
          personalInfo: dbData.personalInfo || defaultData.personalInfo,
          techStack: dbData.techStack || defaultData.techStack,
          services: dbData.services || defaultData.services,
          experiences: dbData.experiences || defaultData.experiences,
          education: dbData.education || defaultData.education,
          volunteering: dbData.volunteering || defaultData.volunteering,
          certifications: dbData.certifications || defaultData.certifications,
          projects: dbData.projects || defaultData.projects,
          testimonial: dbData.testimonial || defaultData.testimonial,
          contactMessages: dbData.contactMessages || [],
        });
        setUnreadMessagesCount(dbData.unreadMessagesCount ?? (dbData.contactMessages?.filter(m => !m.read).length || 0));
        setIsDbConnected(true);
      }
    } catch (err) {
      console.warn('API backend not reachable yet, using local state / cache:', err.message);
      setIsDbConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Sync to localStorage as offline cache
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error caching data to localStorage:', e);
    }
  }, [data]);

  // --- Reset to Defaults ---
  const resetToDefaults = async () => {
    try {
      await fetch(`${API_BASE}/portfolio/reset`, { method: 'POST' });
    } catch (e) {
      console.warn('Backend reset failed, resetting local state:', e);
    }
    setData({
      personalInfo: defaultData.personalInfo,
      techStack: defaultData.techStack,
      services: defaultData.services,
      experiences: defaultData.experiences,
      education: defaultData.education,
      volunteering: defaultData.volunteering,
      certifications: defaultData.certifications,
      projects: defaultData.projects,
      testimonial: defaultData.testimonial,
    });
    localStorage.removeItem(STORAGE_KEY);
    await refreshData();
  };

  // --- Export JSON ---
  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portfolio_database_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // --- Import JSON ---
  const importData = (jsonData) => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      setData(prev => ({
        ...prev,
        ...parsed
      }));
      return { success: true };
    } catch (err) {
      console.error('Failed to import JSON data:', err);
      return { success: false, error: err.message };
    }
  };

  // --- Personal Info CRUD ---
  const updatePersonalInfo = async (updatedFields) => {
    const merged = {
      ...data.personalInfo,
      ...updatedFields,
      stats: {
        ...data.personalInfo?.stats,
        ...(updatedFields.stats || {})
      }
    };
    setData(prev => ({ ...prev, personalInfo: merged }));

    try {
      await fetch(`${API_BASE}/personal-info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(merged)
      });
    } catch (err) {
      console.error('Failed to sync personal info with PostgreSQL:', err);
    }
  };

  // --- Tech Stack CRUD ---
  const addTechStack = async (tech) => {
    const id = tech.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();
    const item = { ...tech, id };
    setData(prev => ({ ...prev, techStack: [...prev.techStack, item] }));

    try {
      await fetch(`${API_BASE}/tech-stack`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
    } catch (err) {
      console.error('Failed to add tech stack to PostgreSQL:', err);
    }
  };

  const updateTechStack = async (indexOrNameOrId, updatedTech) => {
    setData(prev => ({
      ...prev,
      techStack: prev.techStack.map((item, idx) => 
        (idx === indexOrNameOrId || item.name === indexOrNameOrId || item.id === indexOrNameOrId) 
          ? { ...item, ...updatedTech } 
          : item
      )
    }));

    const target = data.techStack.find((item, idx) => 
      idx === indexOrNameOrId || item.name === indexOrNameOrId || item.id === indexOrNameOrId
    );

    if (target?.id) {
      try {
        await fetch(`${API_BASE}/tech-stack/${target.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...target, ...updatedTech })
        });
      } catch (err) {
        console.error('Failed to update tech stack in PostgreSQL:', err);
      }
    }
  };

  const deleteTechStack = async (indexOrNameOrId) => {
    const target = data.techStack.find((item, idx) => 
      idx === indexOrNameOrId || item.name === indexOrNameOrId || item.id === indexOrNameOrId
    );

    setData(prev => ({
      ...prev,
      techStack: prev.techStack.filter((item, idx) => 
        idx !== indexOrNameOrId && item.name !== indexOrNameOrId && item.id !== indexOrNameOrId
      )
    }));

    if (target?.id) {
      try {
        await fetch(`${API_BASE}/tech-stack/${target.id}`, { method: 'DELETE' });
      } catch (err) {
        console.error('Failed to delete tech stack from PostgreSQL:', err);
      }
    }
  };

  // --- Services CRUD ---
  const addService = async (service) => {
    const id = service.id || ('svc-' + Date.now());
    const item = { ...service, id };
    setData(prev => ({ ...prev, services: [...prev.services, item] }));

    try {
      await fetch(`${API_BASE}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
    } catch (err) {
      console.error('Failed to add service to PostgreSQL:', err);
    }
  };

  const updateService = async (id, updatedService) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(item => item.id === id ? { ...item, ...updatedService } : item)
    }));

    try {
      await fetch(`${API_BASE}/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedService)
      });
    } catch (err) {
      console.error('Failed to update service in PostgreSQL:', err);
    }
  };

  const deleteService = async (id) => {
    setData(prev => ({
      ...prev,
      services: prev.services.filter(item => item.id !== id)
    }));

    try {
      await fetch(`${API_BASE}/services/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete service from PostgreSQL:', err);
    }
  };

  // --- Experiences CRUD ---
  const addExperience = async (exp) => {
    const id = exp.id || ('exp-' + Date.now());
    const item = { ...exp, id };
    setData(prev => ({ ...prev, experiences: [item, ...prev.experiences] }));

    try {
      await fetch(`${API_BASE}/experiences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
    } catch (err) {
      console.error('Failed to add experience to PostgreSQL:', err);
    }
  };

  const updateExperience = async (id, updatedExp) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(item => item.id === id ? { ...item, ...updatedExp } : item)
    }));

    try {
      await fetch(`${API_BASE}/experiences/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedExp)
      });
    } catch (err) {
      console.error('Failed to update experience in PostgreSQL:', err);
    }
  };

  const deleteExperience = async (id) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(item => item.id !== id)
    }));

    try {
      await fetch(`${API_BASE}/experiences/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete experience from PostgreSQL:', err);
    }
  };

  // --- Education CRUD ---
  const addEducation = async (edu) => {
    const id = edu.id || ('edu-' + Date.now());
    const item = { ...edu, id };
    setData(prev => ({ ...prev, education: [...prev.education, item] }));

    try {
      await fetch(`${API_BASE}/education`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
    } catch (err) {
      console.error('Failed to add education to PostgreSQL:', err);
    }
  };

  const updateEducation = async (id, updatedEdu) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(item => item.id === id ? { ...item, ...updatedEdu } : item)
    }));

    try {
      await fetch(`${API_BASE}/education/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEdu)
      });
    } catch (err) {
      console.error('Failed to update education in PostgreSQL:', err);
    }
  };

  const deleteEducation = async (id) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));

    try {
      await fetch(`${API_BASE}/education/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete education from PostgreSQL:', err);
    }
  };

  // --- Volunteering CRUD ---
  const addVolunteering = async (vol) => {
    const id = vol.id || ('vol-' + Date.now());
    const item = { ...vol, id };
    setData(prev => ({ ...prev, volunteering: [...prev.volunteering, item] }));

    try {
      await fetch(`${API_BASE}/volunteering`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
    } catch (err) {
      console.error('Failed to add volunteering to PostgreSQL:', err);
    }
  };

  const updateVolunteering = async (id, updatedVol) => {
    setData(prev => ({
      ...prev,
      volunteering: prev.volunteering.map(item => item.id === id ? { ...item, ...updatedVol } : item)
    }));

    try {
      await fetch(`${API_BASE}/volunteering/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVol)
      });
    } catch (err) {
      console.error('Failed to update volunteering in PostgreSQL:', err);
    }
  };

  const deleteVolunteering = async (id) => {
    setData(prev => ({
      ...prev,
      volunteering: prev.volunteering.filter(item => item.id !== id)
    }));

    try {
      await fetch(`${API_BASE}/volunteering/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete volunteering from PostgreSQL:', err);
    }
  };

  // --- Certifications CRUD ---
  const addCertification = async (cert) => {
    const id = cert.id || ('cert-' + Date.now());
    const item = { ...cert, id };
    setData(prev => ({ ...prev, certifications: [...prev.certifications, item] }));

    try {
      await fetch(`${API_BASE}/certifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
    } catch (err) {
      console.error('Failed to add certification to PostgreSQL:', err);
    }
  };

  const updateCertification = async (id, updatedCert) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.map(item => item.id === id ? { ...item, ...updatedCert } : item)
    }));

    try {
      await fetch(`${API_BASE}/certifications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCert)
      });
    } catch (err) {
      console.error('Failed to update certification in PostgreSQL:', err);
    }
  };

  const deleteCertification = async (id) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(item => item.id !== id)
    }));

    try {
      await fetch(`${API_BASE}/certifications/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete certification from PostgreSQL:', err);
    }
  };

  // --- Projects CRUD ---
  const addProject = async (project) => {
    const id = project.id || (project.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now());
    const item = { ...project, id };
    setData(prev => ({ ...prev, projects: [item, ...prev.projects] }));

    try {
      await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
    } catch (err) {
      console.error('Failed to add project to PostgreSQL:', err);
    }
  };

  const updateProject = async (id, updatedProject) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(item => item.id === id ? { ...item, ...updatedProject } : item)
    }));

    try {
      await fetch(`${API_BASE}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject)
      });
    } catch (err) {
      console.error('Failed to update project in PostgreSQL:', err);
    }
  };

  const deleteProject = async (id) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(item => item.id !== id)
    }));

    try {
      await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete project from PostgreSQL:', err);
    }
  };

  // --- Testimonials CRUD ---
  const updateTestimonial = async (updatedTestimonial) => {
    setData(prev => ({
      ...prev,
      testimonial: {
        ...prev.testimonial,
        ...updatedTestimonial
      }
    }));

    try {
      await fetch(`${API_BASE}/testimonials`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTestimonial)
      });
    } catch (err) {
      console.error('Failed to update testimonial in PostgreSQL:', err);
    }
  };

  // --- Contact Messages CRUD ---
  const sendContactMessage = async (messageData) => {
    try {
      const res = await fetch(`${API_BASE}/contact-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      });

      if (res.ok) {
        const result = await res.json();
        if (result.message) {
          setData(prev => ({
            ...prev,
            contactMessages: [result.message, ...(prev.contactMessages || [])]
          }));
          setUnreadMessagesCount(prev => prev + 1);
        }
        return { success: true, targetEmail: result.targetEmail, emailSent: result.emailSent };
      } else {
        const err = await res.json();
        return { success: false, error: err.error || 'Gagal mengirim pesan' };
      }
    } catch (err) {
      console.error('Failed to post contact message:', err);
      return { success: false, error: err.message };
    }
  };

  const toggleMessageRead = async (id, currentReadStatus) => {
    const newStatus = !currentReadStatus;
    setData(prev => ({
      ...prev,
      contactMessages: (prev.contactMessages || []).map(m => 
        m.id === id ? { ...m, read: newStatus } : m
      )
    }));
    setUnreadMessagesCount(prev => newStatus ? Math.max(0, prev - 1) : prev + 1);

    try {
      await fetch(`${API_BASE}/contact-messages/${id}/read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: newStatus })
      });
    } catch (err) {
      console.error('Failed to toggle message read status:', err);
    }
  };

  const deleteContactMessage = async (id) => {
    const target = (data.contactMessages || []).find(m => m.id === id);
    if (target && !target.read) {
      setUnreadMessagesCount(prev => Math.max(0, prev - 1));
    }
    setData(prev => ({
      ...prev,
      contactMessages: (prev.contactMessages || []).filter(m => m.id !== id)
    }));

    try {
      await fetch(`${API_BASE}/contact-messages/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Failed to delete contact message:', err);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const res = await fetch(`${API_BASE}/contact-messages`);
      if (res.ok) {
        const resData = await res.json();
        setData(prev => ({ ...prev, contactMessages: resData.messages || [] }));
        setUnreadMessagesCount(resData.unreadCount || 0);
      }
    } catch (err) {
      console.error('Failed to fetch contact messages:', err);
    }
  };

  const value = {
    ...data,
    unreadMessagesCount,
    isLoading,
    isDbConnected,
    refreshData,
    sendContactMessage,
    toggleMessageRead,
    deleteContactMessage,
    fetchContactMessages,
    updatePersonalInfo,
    addTechStack,
    updateTechStack,
    deleteTechStack,
    addService,
    updateService,
    deleteService,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addVolunteering,
    updateVolunteering,
    deleteVolunteering,
    addCertification,
    updateCertification,
    deleteCertification,
    addProject,
    updateProject,
    deleteProject,
    updateTestimonial,
    resetToDefaults,
    exportData,
    importData,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
