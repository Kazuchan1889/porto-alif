export const personalInfo = {
  name: "Muhammad Alif Ramadhani",
  shortName: "Stefan Alif",
  brandName: "ALIF.",
  role: "Front-End & Mobile Developer",
  tagline: "Building scalable web diagrams, high-performance mobile apps & intelligent data tools.",
  about: "Computer Science student at Universitas Bina Nusantara with hands-on experience in front-end and back-end development. Skilled in Vue.js, React, Tailwind CSS, Python, Flutter, and PostgreSQL, with a proven track record delivering enterprise web tools at PLN Icon Plus and campus mobile applications.",
  location: "Tangerang, Indonesia",
  email: "aliframadhani575@gmail.com",
  phone: "+6281511851621",
  whatsapp: "https://wa.me/6281511851621",
  linkedin: "https://www.linkedin.com/in/muhammad-alif-ramadhani-39a281316/",
  github: "https://github.com/aliframadhani",
  cvUrl: "/CV - Muhammad Alif Ramadhani.pdf",
  avatarUrl: "/assets/alip-real-photo.jpg",
  workspaceUrl: "/assets/alip-real-photo.jpg",
  stats: {
    yearsExperience: "1+",
    completedProjects: "12+",
    happyClients: "10+",
    techSkillsCount: "8+"
  }
};

export const techStack = [
  { name: "Vue.js", category: "Frontend", level: "Advanced", icon: "Code2" },
  { name: "React.js", category: "Frontend", level: "Intermediate", icon: "Atom" },
  { name: "Tailwind CSS", category: "Styling", level: "Advanced", icon: "Palette" },
  { name: "JavaScript (ES6+)", category: "Language", level: "Advanced", icon: "FileCode2" },
  { name: "Python", category: "Backend/Data", level: "Intermediate", icon: "Terminal" },
  { name: "Flutter", category: "Mobile", level: "Intermediate", icon: "Smartphone" },
  { name: "PostgreSQL", category: "Database", level: "Intermediate", icon: "Database" },
  { name: "REST APIs", category: "Architecture", level: "Advanced", icon: "Network" },
  { name: "Git & GitHub", category: "Tools", level: "Advanced", icon: "GitBranch" },
  { name: "Data Analytics", category: "Analytics", level: "Intermediate", icon: "BarChart3" },
];

export const services = [
  {
    id: "frontend",
    title: "Front-End Web Development",
    subtitle: "8+ Projects Delivered",
    description: "Architecting lightning-fast, reactive single-page applications with Vue.js and React. Specialized in interactive diagramming tools, reusable UI components, and fluid responsive design with Tailwind CSS.",
    icon: "Layout",
    skills: ["Vue.js", "React", "Tailwind CSS", "Vite", "Responsive Design"],
    projectCount: "8+ Projects"
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    subtitle: "Campus & Consumer Apps",
    description: "Building cross-platform iOS and Android mobile experiences using Flutter. Focused on smooth navigation routing, real-time data sync with RESTful backends, and intuitive user flows.",
    icon: "Smartphone",
    skills: ["Flutter", "Dart", "REST APIs", "State Management", "Mobile UI"],
    projectCount: "4+ Projects"
  },
  {
    id: "database",
    title: "Database & Backend Integration",
    subtitle: "Data Architecture & APIs",
    description: "Designing robust relational database schemas and queries using PostgreSQL. Seamlessly bridging front-end interfaces with backend REST APIs for efficient data storage and retrieval.",
    icon: "Database",
    skills: ["PostgreSQL", "SQL Queries", "Schema Design", "REST APIs", "Data Flow"],
    projectCount: "6+ Projects"
  },
  {
    id: "data-ocr",
    title: "Data Analytics & OCR Solutions",
    subtitle: "Python & Automated Tools",
    description: "Developing automated document processing tools using Python OCR to extract structured table data from PDFs/images, alongside comprehensive business intelligence charts and data visualizations.",
    icon: "Cpu",
    skills: ["Python", "OCR Processing", "Table Extraction", "Data Viz", "Excel/Pandas"],
    projectCount: "5+ Projects"
  }
];

export const experiences = [
  {
    id: "pln-icon-plus",
    type: "work",
    role: "Front-End Developer",
    company: "PT PLN Icon Plus",
    location: "Jakarta Selatan, Indonesia",
    period: "Feb 2025 - Feb 2026",
    summary: "PT PLN Icon Plus is the technology and digital solutions arm under PT PLN (Persero), powering Indonesia's national electricity telecommunications and digital infrastructure.",
    achievements: [
      "Engineered the Network Model Management web application for interactive creation, visualization, and management of electrical grid topology diagrams using Vue.js.",
      "Developed a web-based OCR application that automatically parses, extracts, and validates complex tabular data from document scans into structured JSON/table formats.",
      "Designed PostgreSQL relational database schemas and optimized data queries to ensure high throughput and seamless data retrieval for network telemetries.",
      "Collaborated closely with cross-functional engineering teams to implement scalable component libraries and intuitive UX workflows."
    ],
    tech: ["Vue.js", "JavaScript", "Tailwind CSS", "Python (OCR)", "PostgreSQL", "REST APIs", "Git"]
  },
  {
    id: "antreless",
    type: "work",
    role: "Front-End Developer",
    company: "Antreless",
    location: "Tangerang, Indonesia",
    period: "Jan 2026 - Mar 2026",
    summary: "Antreless is a campus-focused mobile food ordering ecosystem that allows university students and faculty to order meals from cafeteria vendors without waiting in long lines.",
    achievements: [
      "Engineered the mobile application routing architecture and screen navigation flows to ensure seamless, fluid transitions between food menus, cart, and checkout.",
      "Integrated secure REST APIs to asynchronously fetch restaurant menus, manage user sessions, and broadcast real-time order status updates.",
      "Optimized bidirectional data flow between the front-end user interface, backend microservices, and database layers for zero-lag mobile performance.",
      "Conducted extensive usability testing across diverse iOS and Android screen resolutions to guarantee responsive layouts."
    ],
    tech: ["Flutter", "Dart", "REST APIs", "State Management", "Mobile UI/UX", "JSON Parsing"]
  }
];

export const education = [
  {
    id: "binus",
    degree: "Bachelor of Computer Science (S.Kom)",
    institution: "Universitas Bina Nusantara (BINUS)",
    location: "Tangerang Selatan, Indonesia",
    period: "Sep 2022 - Dec 2026 (Expected)",
    gpa: "GPA: 3.23 / 4.00",
    description: "Core coursework in Software Engineering, Data Structures & Algorithms, Database Systems, Web & Mobile Application Development, Object-Oriented Programming, and Computer Networks.",
    highlight: "Active contributor in student tech projects, university literacy initiatives, and software development competitions."
  },
  {
    id: "sman95",
    degree: "High School Diploma - Natural Sciences",
    institution: "SMAN 95 Jakarta",
    location: "Jakarta Barat, Indonesia",
    period: "Jun 2019 - Jun 2022",
    gpa: null,
    description: "Focus on Mathematics, Physics, and foundational computing skills. Active participant in student technology and extracurricular clubs.",
    highlight: "Graduated with strong foundations in analytical reasoning and problem-solving."
  }
];

export const volunteering = [
  {
    id: "blits",
    role: "Volunteer & Event Coordinator",
    organization: "BLiTS (BINUS Untuk Literasi)",
    location: "Tangerang Selatan, Indonesia",
    period: "Jun 2026",
    description: "BINUS Untuk Literasi (BLiTS) is a university-led community outreach program focused on fostering literacy, education equality, and environmental responsibility.",
    contributions: [
      "Organized and managed the community donation booth, cataloging hundreds of donated educational books and electronics.",
      "Facilitated donor engagements, handled logistics, and sorted e-waste materials for safe recycling practices."
    ]
  }
];

export const certifications = [
  {
    id: "cert-sql",
    title: "SQL Masterclass: From Absolute Beginner to Developer",
    issuer: "Modules Taken / Certified",
    year: "2025",
    topics: ["Complex Joins & Subqueries", "Schema Design & Indexing", "Stored Procedures", "PostgreSQL", "Database Optimization"],
    icon: "Database"
  },
  {
    id: "cert-data-analytics",
    title: "Data Analytics & Visualization: Using Excel and Python",
    issuer: "Modules Taken / Certified",
    year: "2025",
    topics: ["Python (Pandas, Matplotlib, Seaborn)", "Data Wrangling", "Interactive Dashboards", "Statistical Analysis", "Automated Reporting"],
    icon: "BarChart3"
  }
];

export const projects = [
  {
    id: "network-model-management",
    title: "PLN Network Model Management",
    category: "Web App",
    categoryKey: "web",
    image: "/assets/project-network.jpg",
    client: "PT PLN Icon Plus",
    period: "2025 - 2026",
    featured: true,
    shortDescription: "Interactive web platform for diagramming, managing, and monitoring electrical network topologies across regional power grids.",
    fullDescription: "A mission-critical enterprise web application built for PT PLN Icon Plus. The platform enables power network engineers to dynamically construct, visualize, and configure high-voltage electrical grid diagrams, substations, and transmission nodes using an interactive Vue.js canvas.",
    features: [
      "Interactive topological node editor for electrical power stations and sub-stations",
      "Real-time voltage and telemetry metric charts with instant alert flags",
      "High-throughput PostgreSQL database schema supporting thousands of grid relations",
      "Exportable CAD/diagram models and SVG topology snapshots for field engineers"
    ],
    tech: ["Vue.js", "JavaScript", "Tailwind CSS", "PostgreSQL", "Canvas API", "REST APIs"],
    demoUrl: "https://plniconplus.co.id",
    githubUrl: "https://github.com/aliframadhani/pln-network-model"
  },
  {
    id: "antreless-app",
    title: "Antreless - Campus Food Ordering",
    category: "Mobile App",
    categoryKey: "mobile",
    image: "/assets/project-antreless.jpg",
    client: "Antreless Project",
    period: "2026",
    featured: true,
    shortDescription: "Cross-platform mobile application eliminating cafeteria waiting queues with smart pre-ordering and live prep tracking.",
    fullDescription: "Antreless transforms the campus dining experience for thousands of students and faculty. By enabling contactless food browsing, pre-ordering, and live order preparation tracking, cafeteria lines are reduced by over 70%. Built with Flutter for buttery 60fps animations on iOS and Android.",
    features: [
      "Dynamic cafeteria menu exploration with real-time stock availability",
      "Seamless multi-screen navigation and smooth checkout state management",
      "Live order status tracker (In Preparation, Ready for Pickup, Completed)",
      "Integrated secure digital wallet and REST API backend synchronisation"
    ],
    tech: ["Flutter", "Dart", "REST APIs", "State Management", "Mobile UI/UX"],
    demoUrl: "https://antreless.app",
    githubUrl: "https://github.com/aliframadhani/antreless-mobile"
  },
  {
    id: "ocr-data-extractor",
    title: "Web-Based Document OCR Extractor",
    category: "Data & Tools",
    categoryKey: "data",
    image: "/assets/project-ocr.jpg",
    client: "PT PLN Icon Plus",
    period: "2025",
    featured: true,
    shortDescription: "Automated OCR table extraction tool turning PDF scans and invoices into structured PostgreSQL records.",
    fullDescription: "An intelligent document processing web tool designed to eliminate manual data entry. Uploaded technical documents, invoices, and power reports are scanned using Python OCR engines, which automatically detect table bounding boxes, parse cells into normalized data, and sync directly to PostgreSQL.",
    features: [
      "Side-by-side interactive document viewer with bounding box highlights",
      "Automated tabular cell segmentation with 98.4% OCR confidence rate",
      "Instant schema mapper with single-click PostgreSQL synchronization",
      "Multi-format export supporting JSON, CSV, and formatted Excel sheets"
    ],
    tech: ["Python", "OCR Tesseract", "Vue.js", "PostgreSQL", "REST APIs", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "https://github.com/aliframadhani/document-ocr-extractor"
  },
  {
    id: "sql-analytics-hub",
    title: "Data Analytics & SQL Dashboard",
    category: "Data & Tools",
    categoryKey: "data",
    image: "/assets/project-analytics.jpg",
    client: "Certification Capstone",
    period: "2025",
    featured: true,
    shortDescription: "Comprehensive data visualization hub with interactive SQL query runner and Python Pandas analytics charts.",
    fullDescription: "A full-featured analytics workstation developed as part of advanced SQL & Python certifications. It integrates an in-browser SQL query execution engine, automated statistical data pipelines with Python Pandas, and glowing interactive metric graphs for enterprise business intelligence.",
    features: [
      "Live SQL query editor with syntax highlighting and instant execution",
      "Interactive charts (revenue distribution, performance trends, user cohort)",
      "Python data transformation pipelines integrated with REST endpoints",
      "Customizable KPI summary cards with trend comparison indicators"
    ],
    tech: ["Python", "Pandas", "PostgreSQL", "Chart.js", "React.js", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "https://github.com/aliframadhani/sql-analytics-hub"
  },
  {
    id: "modern-portfolio",
    title: "Responsive Developer Portfolio",
    category: "Web App",
    categoryKey: "web",
    image: "/assets/alif-portrait.jpg",
    client: "Personal Portfolio",
    period: "2026",
    featured: false,
    shortDescription: "High-performance dark theme portfolio website built with React.jsx and Tailwind CSS, featuring glassmorphism and micro-animations.",
    fullDescription: "A cutting-edge developer portfolio showcasing engineering works, CV credentials, certifications, and interactive contact channels. Built with Vite, React, and Tailwind CSS, following modern glassmorphism aesthetics and 100% responsive viewport adaptability.",
    features: [
      "Dark mode aesthetic inspired by top modern tech portfolios",
      "Interactive category filters and modal project inspections",
      "Responsive navigation drawer optimized for all screen sizes",
      "Direct CV PDF download and integrated WhatsApp & Email channels"
    ],
    tech: ["React.js", "Tailwind CSS", "Vite", "Lucide Icons", "Vercel"],
    demoUrl: "https://aliframadhani.vercel.app",
    githubUrl: "https://github.com/aliframadhani/portfolio"
  }
];

export const testimonial = {
  quote: "Alif is an exceptionally talented and dedicated developer who consistently delivers clean, high-performance web and mobile solutions. His technical acumen in Vue.js and rapid problem-solving during our project execution was beyond our expectations.",
  author: "Lead Project Collaborator",
  role: "Engineering Lead & Tech Mentor",
  company: "Enterprise Software Division",
  avatar: "/assets/testimonial-avatar.jpg",
  rating: 5
};
