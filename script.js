/**
 * ADITI KUMARI - DEVELOPER PORTFOLIO JAVASCRIPT
 * Interactive functionality: Typewriter, REST API Simulator, Project Modals, Filtering, Toasts
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. TYPEWRITER EFFECT
     ========================================================================== */
  const typewriterElement = document.getElementById('typewriterText');
  const roles = [
    "Python Full Stack Solutions",
    "Scalable Django & Flask Backends",
    "Modern & Responsive React UIs",
    "High-Speed RESTful APIs",
    "Clean Relational MySQL Schemas",
    "Reliable Pytest Test Suites"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typewriterElement) {
    typeEffect();
  }

  /* ==========================================================================
     2. NAVBAR STICKY & SCROLL SPY
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');
  const btnBackToTop = document.getElementById('btnBackToTop');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Sticky shadow
    if (scrollPos > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (btnBackToTop) {
      btnBackToTop.style.opacity = scrollPos > 400 ? '1' : '0.4';
    }

    // Scroll spy
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     3. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');

  function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navBackdrop.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', toggleMobileMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  /* ==========================================================================
     4. SKILLS FILTER SYSTEM
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.classList.remove('hide');
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* ==========================================================================
     5. INTERACTIVE REST API TERMINAL PLAYGROUND
     ========================================================================== */
  const apiData = {
    profile: {
      method: "GET",
      path: "/api/v1/developer/profile",
      status: "200 OK",
      time: "38 ms",
      payload: {
        status: "success",
        developer: {
          name: "Aditi Kumari",
          title: "Python Full Stack Developer",
          education: {
            degree: "Master of Computer Applications (MCA)",
            institution: "Birla Institute of Technology (BIT), Mesra",
            duration: "2024 - 2026",
            cgpa: "8.12 / 10.0"
          },
          bachelors: {
            degree: "Bachelor of Computer Applications (BCA)",
            institution: "BIT Mesra",
            duration: "2021 - 2024",
            cgpa: "7.77 / 10.0"
          },
          experience: "Software Developer Intern @ Central Coalfield Limited",
          contact: {
            email: "aditi23200@gmail.com",
            phone: "+91 8252339540",
            location: "Bokaro Steel City & Ranchi, Jharkhand"
          },
          open_to_hire: true
        }
      }
    },
    projects: {
      method: "GET",
      path: "/api/v1/projects/featured",
      status: "200 OK",
      time: "52 ms",
      payload: {
        total_projects: 3,
        projects: [
          {
            id: "proj_01",
            title: "ShopEasy — E-Commerce Platform",
            year: 2026,
            stack: ["Django", "React.js", "MySQL", "REST API", "pytest"],
            features: ["Product catalog", "Live cart updates", "Order tracking", "JWT Auth"],
            deployment: "Railway"
          },
          {
            id: "proj_02",
            title: "HireHub — Job Portal",
            year: 2025,
            stack: ["Django", "React.js", "MySQL", "REST API"],
            features: ["Employer/Seeker portals", "Sub-100ms SQL search", "Application tracking"],
            deployment: "Railway"
          },
          {
            id: "proj_03",
            title: "TaskFlow — Team Kanban System",
            year: 2025,
            stack: ["Flask", "React.js", "MySQL", "pytest"],
            features: ["Drag & Drop Kanban", "Team management", "JWT security"],
            deployment: "Heroku"
          }
        ]
      }
    },
    skills: {
      method: "GET",
      path: "/api/v1/skills/matrix",
      status: "200 OK",
      time: "29 ms",
      payload: {
        languages: ["Python", "JavaScript (ES6+)", "SQL"],
        backend_frameworks: ["Django", "Flask", "Django REST Framework (DRF)"],
        frontend: ["React.js", "HTML5", "CSS3 / Modern Responsive Design"],
        database: ["MySQL", "Schema Design & Normalization", "Query Optimization"],
        testing: ["pytest", "API Contract Validation", "Fixtures"],
        tools: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Railway", "Heroku"]
      }
    },
    hire: {
      method: "POST",
      path: "/api/v1/hire-aditi",
      status: "201 CREATED",
      time: "64 ms",
      payload: {
        status: "interview_requested",
        message: "Thank you for reaching out! Aditi is ready to bring high-impact full-stack engineering to your team.",
        candidate: {
          name: "Aditi Kumari",
          roles: ["Full Stack Developer", "Python Backend Developer", "Django/React Engineer"],
          email: "aditi23200@gmail.com",
          phone: "+91 8252339540",
          availability: "Immediate / Notice-Free"
        }
      }
    },
    tests: {
      method: "GET",
      path: "/api/v1/pytest/report",
      status: "200 OK",
      time: "45 ms",
      payload: {
        test_framework: "pytest 8.1.0",
        summary: {
          passed: 42,
          failed: 0,
          skipped: 0,
          coverage: "98.4%"
        },
        suites: [
          { name: "test_auth_jwt.py", status: "PASSED", tests: 12 },
          { name: "test_order_cart_api.py", status: "PASSED", tests: 15 },
          { name: "test_kanban_flow.py", status: "PASSED", tests: 9 },
          { name: "test_db_queries.py", status: "PASSED", tests: 6 }
        ]
      }
    }
  };

  const apiButtons = document.querySelectorAll('.api-btn');
  const currentMethodElem = document.getElementById('currentMethod');
  const currentPathElem = document.getElementById('currentPath');
  const responseStatusElem = document.getElementById('responseStatus');
  const responseTimeElem = document.getElementById('responseTime');
  const jsonResponseDisplay = document.getElementById('jsonResponseDisplay');
  const btnExecuteApi = document.getElementById('btnExecuteApi');
  const btnCopyJson = document.getElementById('btnCopyJson');

  let activeEndpointKey = 'profile';

  function formatJSONToHTML(json) {
    if (typeof json !== 'string') {
      json = JSON.stringify(json, null, 2);
    }
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'json-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key';
        } else {
          cls = 'json-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'json-boolean';
      } else if (/null/.test(match)) {
        cls = 'json-null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  function renderEndpoint(endpointKey) {
    const data = apiData[endpointKey];
    if (!data) return;

    activeEndpointKey = endpointKey;
    currentMethodElem.textContent = data.method;
    currentMethodElem.className = 'method-tag ' + (data.method === 'POST' ? 'text-amber' : 'text-success');
    currentPathElem.textContent = data.path;
    responseStatusElem.textContent = data.status;
    responseTimeElem.textContent = data.time;

    jsonResponseDisplay.innerHTML = formatJSONToHTML(data.payload);
  }

  apiButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      apiButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const endpoint = btn.getAttribute('data-endpoint');
      renderEndpoint(endpoint);
    });
  });

  if (btnExecuteApi) {
    btnExecuteApi.addEventListener('click', () => {
      btnExecuteApi.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Running...';
      setTimeout(() => {
        renderEndpoint(activeEndpointKey);
        btnExecuteApi.innerHTML = '<i class="fa-solid fa-play"></i> Run Request';
        showToast('API Request Executed: ' + apiData[activeEndpointKey].path);
      }, 250);
    });
  }

  if (btnCopyJson) {
    btnCopyJson.addEventListener('click', () => {
      const textToCopy = JSON.stringify(apiData[activeEndpointKey].payload, null, 2);
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('JSON payload copied to clipboard!');
      });
    });
  }

  // Initial render for terminal
  if (jsonResponseDisplay) {
    renderEndpoint('profile');
  }

  /* ==========================================================================
     6. PROJECT DETAIL MODAL SYSTEM
     ========================================================================== */
  const projectDetails = {
    shopeasy: {
      title: "ShopEasy — E-Commerce Web Application",
      year: "2026",
      category: "Full Stack • E-Commerce",
      tags: ["Django", "React.js", "MySQL", "REST API", "pytest", "Railway"],
      overview: "ShopEasy is a scalable, feature-complete e-commerce platform designed with a clean micro-service architecture separating the Django REST Framework backend and a dynamic React.js frontend. Customers can explore categorized product listings, apply dynamic filters, manage real-time shopping cart states, and track order fulfillment statuses.",
      features: [
        "Architected Django REST APIs for catalog management, shopping cart operations, and order lifecycle tracking.",
        "Engineered secure JWT token-based authentication and authorization with protected customer endpoints.",
        "Modeled a normalized MySQL database schema handling relational integrity for Users, Categories, Products, CartItems, and OrderHeaders.",
        "Built responsive React components with stateful search, instant price filtering, and streamlined checkout.",
        "Implemented automated unit tests using pytest verifying business logic, API status contracts, and edge cases."
      ],
      techBox: "Backend: Python 3.11, Django 5.x, DRF\nFrontend: React 18, Custom CSS3, Axios\nDatabase: MySQL 8.0 (Normalized Relational Schema)\nTesting & CI: pytest, pytest-django\nDeployment: Railway Cloud"
    },
    hirehub: {
      title: "HireHub — Job Portal Web Application",
      year: "2025",
      category: "Full Stack • Recruitment Platform",
      tags: ["Django", "React.js", "MySQL", "REST API", "Railway"],
      overview: "HireHub bridges hiring companies and job seekers through a dual-role recruitment portal. Employers can post openings, review applicants, and schedule statuses, while job candidates can search, filter by multiple criteria, and track their applications in real-time.",
      features: [
        "Implemented role-based authentication differentiating Recruiter/Employer accounts from Candidate profiles.",
        "Created RESTful endpoints for posting jobs, managing applicants, resume link storage, and status updates.",
        "Built an interactive React interface featuring instant multi-filter search (location, salary range, experience, title).",
        "Optimized MySQL indexes and query joins to ensure sub-100ms response times for large vacancy datasets.",
        "Deployed on Railway with robust environment variable configuration and secure production settings."
      ],
      techBox: "Backend: Python, Django, Django REST Framework\nFrontend: React.js, Modern CSS Grid & Flexbox\nDatabase: MySQL (Optimized indexes & foreign key constraints)\nSecurity: Role-Based Access Control (RBAC), JWT\nDeployment: Railway"
    },
    taskflow: {
      title: "TaskFlow — Team Task Management App",
      year: "2025",
      category: "Full Stack • Productivity & Agile",
      tags: ["Flask", "React.js", "MySQL", "REST API", "pytest", "Heroku"],
      overview: "TaskFlow is an agile productivity app featuring a Kanban drag-and-drop board for agile engineering teams. Users can create multi-member project workspaces, track sprint items across status columns (To Do, In Progress, Done), and assign priorities.",
      features: [
        "Engineered modular Flask Blueprints providing RESTful endpoints for boards, task cards, and team member assignments.",
        "Built smooth React.js drag-and-drop Kanban interface with instant state synchronization upon column transfers.",
        "Integrated JWT authentication for secure login, session renewal, and team access permissions.",
        "Designed relational database schema in MySQL managing board hierarchies, cards, timestamps, and activity logs.",
        "Authored comprehensive pytest test suites for all API routes and deployed to Heroku with production database setup."
      ],
      techBox: "Backend: Python, Flask, Flask-JWT-Extended, Flask-SQLAlchemy\nFrontend: React.js, Drag & Drop API, CSS Animations\nDatabase: MySQL\nTesting: pytest\nDeployment: Heroku"
    }
  };

  const projectModalOverlay = document.getElementById('projectModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const projectModalTriggers = document.querySelectorAll('.project-modal-trigger');

  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalYear = document.getElementById('modalYear');
  const modalTags = document.getElementById('modalTags');
  const modalOverview = document.getElementById('modalOverview');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalTechBox = document.getElementById('modalTechBox');

  function openProjectModal(projectKey) {
    const p = projectDetails[projectKey];
    if (!p) return;

    modalTitle.textContent = p.title;
    modalCategory.textContent = p.category;
    modalYear.textContent = p.year;
    modalOverview.textContent = p.overview;
    modalTechBox.textContent = p.techBox;

    // Render Tags
    modalTags.innerHTML = p.tags.map(t => `<span class="tag tag-api">${t}</span>`).join('');

    // Render Features
    modalFeatures.innerHTML = p.features.map(f => `<li>${f}</li>`).join('');

    projectModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  projectModalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      openProjectModal(projectKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModalOverlay) {
    projectModalOverlay.addEventListener('click', (e) => {
      if (e.target === projectModalOverlay) {
        closeProjectModal();
      }
    });
  }

  /* ==========================================================================
     7. RESUME PREVIEW MODAL
     ========================================================================== */
  const resumeModalBtn = document.getElementById('resumeModalBtn');
  const resumeModalOverlay = document.getElementById('resumeModalOverlay');
  const resumeModalCloseBtn = document.getElementById('resumeModalCloseBtn');

  function openResumeModal() {
    resumeModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResumeModal() {
    resumeModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (resumeModalBtn) {
    resumeModalBtn.addEventListener('click', openResumeModal);
  }

  if (resumeModalCloseBtn) {
    resumeModalCloseBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModalOverlay) {
    resumeModalOverlay.addEventListener('click', (e) => {
      if (e.target === resumeModalOverlay) {
        closeResumeModal();
      }
    });
  }

  /* ==========================================================================
     8. ONE-CLICK COPY TO CLIPBOARD
     ========================================================================== */
  const copyButtons = document.querySelectorAll('.btn-copy-action');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
          btn.innerHTML = '<i class="fa-solid fa-check text-success"></i>';
          setTimeout(() => {
            btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
          }, 2000);
        });
      }
    });
  });

  /* ==========================================================================
     9. CONTACT FORM SUBMISSION
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const btnSubmitForm = document.getElementById('btnSubmitForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      btnSubmitForm.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
      btnSubmitForm.disabled = true;

      setTimeout(() => {
        btnSubmitForm.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        showToast(`Thank you ${name}! Your message has been sent successfully.`);
        
        // Prepare mailto link fallback
        const mailtoUri = `mailto:aditi23200@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
        
        // Reset form
        contactForm.reset();

        setTimeout(() => {
          btnSubmitForm.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
          btnSubmitForm.disabled = false;
        }, 3000);
      }, 1000);
    });
  }

  /* ==========================================================================
     10. TOAST NOTIFICATION HELPER
     ========================================================================== */
  function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid ${type === 'error' ? 'fa-triangle-exclamation text-rose' : 'fa-circle-check'}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  }

  // Keyboard shortcut: ESC to close any modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeResumeModal();
      if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    }
  });

});
