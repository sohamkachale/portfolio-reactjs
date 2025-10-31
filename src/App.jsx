import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Loading Screen Component
const LoadingScreen = ({ isLoading }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        className="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="loading-content"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <i className="fas fa-code"></i>
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to Soham's Portfolio
          </motion.h2>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Professional Navbar
const Navbar = ({ currentPage, setCurrentPage, isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: 'home', page: 'home' },
    { name: 'About', icon: 'user', page: 'about' },
    { name: 'Projects', icon: 'project-diagram', page: 'projects' },
    { name: 'Work', icon: 'briefcase', page: 'work' },
  ];

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container">
        <motion.a 
          className="navbar-brand" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('home');
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.i 
            className="fas fa-code"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          SOHAM'S PORTFOLIO
        </motion.a>
        
        <motion.button 
          className="navbar-toggler" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="navbar-toggler-icon"></span>
        </motion.button>
        
        <div className={`navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.name} 
                className="nav-item"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <motion.a 
                  className={`nav-link ${currentPage === item.page ? 'active' : ''}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(item.page);
                    setIsMobileMenuOpen(false);
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`fas fa-${item.icon}`}></i>
                  {item.name}
                </motion.a>
              </motion.li>
            ))}
            <motion.li 
              className="nav-item"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <motion.a 
                className="nav-link" 
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-envelope"></i>
                Contact
              </motion.a>
            </motion.li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

// Home Page with Fixed Typing Effect
const Home = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const typingRef = useRef(null);

  const stats = [
    { number: 4, label: 'Projects Completed', icon: 'fas fa-project-diagram' },
    // { number: 5, label: 'Month Experience', icon: 'fas fa-calendar-alt' },
    { number: 12, label: 'Technologies', icon: 'fas fa-code' },
    { number: 100, label: 'Client Satisfaction', icon: 'fas fa-heart', suffix: '%' }
  ];

  // Custom typing effect
  useEffect(() => {
    const texts = ['Full Stack Development', 'React Applications', 'Node.js Backend', 'Database Developer', 'Modern Web Solutions'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newTextDelay = 2000;

    function type() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typingRef.current.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
      } else {
        typingRef.current.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
      }

      if (!isDeleting && charIndex === currentText.length) {
        typingDelay = newTextDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex++;
        if (textIndex >= texts.length) textIndex = 0;
        typingDelay = 500;
      }

      setTimeout(type, typingDelay);
    }

    // Start typing effect after a short delay
    const timer = setTimeout(() => {
      if (typingRef.current) {
        type();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const Counter = ({ number, suffix = '' }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (isInView) {
        let start = 0;
        const end = parseInt(number);
        const duration = 2000; // 2 seconds
        const increment = end / (duration / 50);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 50);
        
        return () => clearInterval(timer);
      }
    }, [isInView, number]);
    
    return <span>{count}{suffix}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Hi, I'm <span className="accent-text">Soham</span>
              </motion.h1>
              
              <motion.h2 
                className="hero-subtitle"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                And I'm passionate about
              </motion.h2>
              
              <motion.div 
                className="typing-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <span 
                  ref={typingRef} 
                  className="typing-text"
                ></span>
                <span className="typing-cursor">|</span>
              </motion.div>

              <motion.div 
                className="btn-group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <motion.a 
                  href="https://drive.google.com/file/d/13MNrqiX2LyUFK08uOBhg4H-x4yt799lD/view?usp=drivesdk" 
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-download"></i>
                  Download Resume
                </motion.a>
                <motion.a 
                  href="https://github.com/sohamkachale" 
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i>
                  Visit GitHub
                </motion.a>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="hero-image-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.img 
                src="./img/p1(1).png" 
                alt="Developer Illustration" 
                className="hero-image"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="stats-section"
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <motion.i 
                  className={stat.icon}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
                <motion.h3>
                  <Counter number={stat.number} suffix={stat.suffix} />
                </motion.h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Experience Timeline */}
      <section className="experience-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="section-subtitle">What I Have Done So Far</h3>
            <h2 className="section-title">Language Experience</h2>
          </motion.div>
          
          <div className="timeline">
            {[
              {
                title: "Basic Web Developer",
                desc: "I'm a web developer with a strong understanding of HTML, CSS, and JavaScript. I use these core technologies to build simple, responsive, and user-friendly websites.",
                img: "./img/HTML-CSS-JS-Logo.png"
              },
              {
                title: "Bootstrap Developer",
                desc: "I use Bootstrap 5 to build responsive and mobile-friendly websites quickly and efficiently. It helps me create clean layouts and modern components.",
                img: "./img/bootstrap5-removebg-preview.png"
              },
              {
                title: "React + Node Developer",
                desc: "I work with React JS to build fast and interactive user interfaces. On the backend, I use Node JS to handle server-side logic, APIs, and database connections.",
                img: "./img/ChatGPT Image Jul 26, 2025, 02_26_11 PM.png"
              },
              {
                title: "MySQL Developer",
                desc: "As a MySQL developer, I work with databases to store, manage, and organize data efficiently. I design tables with proper relationships and ensure data is structured.",
                img: "./img/mysq.png"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="timeline-item"
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="timeline-content"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.div>
                <motion.div 
                  className="timeline-icon"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <img src={item.img} alt={item.title} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// About Page (Keep your existing About component)
const About = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  const skillsData = {
    frontend: [
      { name: 'HTML5', icon: 'fab fa-html5', level: 'Advanced', progress: 95, color: '#e34f26' },
      { name: 'CSS3', icon: 'fab fa-css3-alt', level: 'Advanced', progress: 90, color: '#1572b6' },
      { name: 'JavaScript', icon: 'fab fa-js', level: 'Advanced', progress: 85, color: '#f7df1e' },
      { name: 'Bootstrap 5', icon: 'fab fa-bootstrap', level: 'Expert', progress: 95, color: '#7952b3' },
      { name: 'React.js', icon: 'fab fa-react', level: 'Learning', progress: 70, color: '#61dafb' }
    ],
    backend: [
      { name: 'PHP', icon: 'fab fa-php', level: 'Intermediate', progress: 75, color: '#777bb4' },
      { name: 'MySQL', icon: 'fas fa-database', level: 'Advanced', progress: 85, color: '#4479a1' },
      { name: 'Node.js', icon: 'fab fa-node-js', level: 'Learning', progress: 60, color: '#339933' },
      { name: 'API Integration', icon: 'fas fa-plug', level: 'Learning', progress: 65, color: '#ff6b35' }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="about-section">
        <div className="container">
          {/* Profile Section */}
          <motion.div 
            className="profile-section"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="profile-content">
              <motion.div 
                className="profile-image"
                whileHover={{ scale: 1.05 }}
              >
                <motion.img 
                  src="./img/sohamk.png" 
                  alt="Soham Kachale" 
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.div>
              
              <motion.div className="profile-info">
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Soham Kachale
                </motion.h1>
                
                <motion.div 
                  className="developer-title"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  Full Stack Developer
                </motion.div>
                
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  Passionate about creating elegant solutions to complex problems. 
                  With 3+ years of experience in web development, I specialize in 
                  building responsive, user-friendly applications.
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div 
            className="about-content"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="section-header">
              <motion.h2 
                className="section-title"
                whileHover={{ scale: 1.05 }}
              >
                About Me
              </motion.h2>
            </div>
            
            <div className="about-text-content">
              <motion.p
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                I'm a passionate <strong>Full Stack Developer</strong> with expertise in both 
                front-end and back-end technologies. My journey in web development has 
                equipped me with a diverse skill set to build responsive, user-friendly 
                applications from concept to deployment.
              </motion.p>
              
              <motion.p
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                I specialize in creating modern web applications using <strong>HTML5, CSS3, 
                JavaScript, Bootstrap 5</strong> for the frontend, and <strong>PHP, MySQL</strong> for backend 
                connectivity. Currently, I'm expanding my expertise by learning 
                <strong>React.js, API Integration, and Node.js</strong> to build more dynamic and 
                scalable applications.
              </motion.p>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div 
            className="skills-section"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="section-header">
              <motion.h2 
                className="section-title"
                whileHover={{ scale: 1.05 }}
              >
                Technical Skills
              </motion.h2>
            </div>
            
            <motion.div 
              className="skills-tabs"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {Object.keys(skillsData).map((tab, index) => (
                <motion.button
                  key={tab}
                  className={`skills-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                className="skills-grid"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                {skillsData[activeTab].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="skill-card"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className="skill-icon">
                      <i className={skill.icon} style={{ color: skill.color }}></i>
                    </div>
                    
                    <div className="skill-name">{skill.name}</div>
                    
                    <div className="skill-level">{skill.level}</div>
                    
                    <div className="skill-progress">
                      <motion.div
                        className="progress-bar"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="cta-section"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.a 
              href="https://drive.google.com/file/d/1_hUxA-KbeHEJS-_eoluIpsDgYJS13G9Z/view?usp=drivesdk" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-file-download"></i>
              Download Resume
            </motion.a>
            
            <motion.a 
              href="#projects" 
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-eye"></i>
              View Projects
            </motion.a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

// Projects Page (Keep your existing Projects component)
const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projectsData = [
    {
      id: 1,
      title: "Flight Booking System",
      image: "./img/filght.png",
      tech: ["HTML", "CSS", "Bootstrap", "PHP"],
      category: "fullstack",
      description: "A comprehensive flight booking platform with user authentication, flight search, booking management, and admin dashboard.",
      link: "https://github.com/sohamkachale/flight-booking-system",
      features: ["User Authentication", "Real-time Search", "Admin Dashboard", "Responsive Design"],
      status: "Completed"
    },
    {
      id: 2,
      title: "OneCart E-commerce",
      image: "./img/onecart.png", 
      tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      category: "frontend",
      description: "A responsive e-commerce platform featuring product listings, shopping cart, user accounts, and checkout process.",
      link: "https://webonecart.netlify.app",
      features: ["Shopping Cart", "Product Catalog", "User Accounts", "Mobile First"],
      status: "Live"
    },
    {
      id: 3,
      title: "Rescue Buddy Dog Adoption",
      image: "./img/dog.png",
      tech: ["Bootstrap", "Custom CSS"],
      category: "frontend",
      description: "A website connecting rescue dogs with loving homes. Features dog profiles with search filters and adoption forms.",
      link: "https://rescuebuddy.netlify.app",
      features: ["Dog Profiles", "Search Filters", "Adoption Forms", "Success Stories"],
      status: "Live"
    },
       {
      id: 4,
      title: "Note Make App",
      image: "./img/note-app.png",
      tech: ["React", "JavaScript", "CSS","Framermotion"],
      category: "frontend",
      description: "A modern note-taking application built with React. Features include creating, editing, and deleting notes with a clean, intuitive interface. Perfect for organizing thoughts and managing tasks efficiently.",
      link: "https://note-make-app-react-udex.vercel.app/",
      features: ["Create Notes", "Edit & Delete", "Clean UI", "Real-time Updates"],
      status: "Live"
    }
  ];
  // ];
  

  const categories = [
    { name: 'all', label: 'All Projects', icon: 'fas fa-th-large' },
    { name: 'fullstack', label: 'Full Stack', icon: 'fas fa-layer-group' },
    { name: 'frontend', label: 'Frontend', icon: 'fab fa-html5' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="projects-section">
        <div className="container">
          {/* Header */}
          <motion.div 
            className="section-header"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="section-subtitle"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              My Recent Work
            </motion.h2>
            
            <motion.h1 
              className="section-title"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Featured Projects
            </motion.h1>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="project-filters"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="filters-container">
              {categories.map((category, index) => (
                <motion.button
                  key={category.name}
                  className={`filter-btn ${selectedCategory === category.name ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.name)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={category.icon}></i>
                  {category.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Project Grid */}
          <motion.div className="projects-grid" layout>
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="project-image">
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="project-status">{project.status}</div>
                  </div>

                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>

                    <div className="tech-stack">
                      {project.tech.map((tech, i) => (
                        <motion.span 
                          key={i}
                          className="tech-badge"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <p className="project-description">{project.description}</p>

                    <motion.a 
                      href={project.link} 
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Project
                      <i className="fas fa-external-link-alt"></i>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="cta-section"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p>Interested in collaborating or have a project in mind? Let's create something amazing together!</p>
            
            <motion.a
              href="#contact"
              className="btn btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-rocket"></i>
              Start a Project
            </motion.a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

// Work Page (Keep your existing Work component)
const Work = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <section className="work-section">
      <div className="container">
        <motion.div 
          className="work-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="work-header"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="work-icon">
              <i className="fas fa-user-md"></i>
            </div>
            
            <div className="work-info">
              <h1>DoctorCare-CRM</h1>
              <div className="work-subtitle">Frontend Developer | Digital Solutions Agency</div>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            As the lead frontend developer for this healthcare CRM platform, I've built a comprehensive 
            interface using HTML, CSS, and Bootstrap with extensive customizations.
          </motion.p>
          
          <motion.div 
            className="work-highlights"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h4>Frontend Development Highlights</h4>
            <ul>
              <li>Built 30+ responsive components from scratch using semantic HTML5 and CSS3</li>
              <li>Customized Bootstrap 5 with extensive override CSS for unique design system</li>
              <li>Implemented mobile-first responsive layouts with custom breakpoints</li>
              <li>Developed accessible UI components meeting WCAG standards</li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="work-actions"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.a 
              href="#" 
              className="btn btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-eye"></i>View Live Project
            </motion.a>
            <motion.a 
              href="#" 
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-code"></i>View Code Samples
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  </motion.div>
);

// Footer Component
const Footer = () => (
  <motion.footer 
    id="contact" 
    className="footer"
    initial={{ y: 100, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className="container">
      <div className="footer-content">
        <div className="footer-col">
          <h3>SOHAM'S PORTFOLIO</h3>
          <p>Creative developer passionate about building beautiful, functional digital experiences.</p>
          <div className="social-links">
            {[
              { icon: 'fab fa-github', url: 'https://github.com/sohamkachale' },
              { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/soham-kachale-b02810312' },
              { icon: 'fab fa-twitter', url: '#' },
              { icon: 'fab fa-instagram', url: '#' }
            ].map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={link.icon}></i>
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {['Home', 'About', 'Projects', 'Work', 'Contact'].map((link) => (
              <li key={link}>
                <motion.a 
                  href="#"
                  whileHover={{ x: 5 }}
                >
                  {link}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <motion.div 
              className="contact-item"
              whileHover={{ x: 5 }}
            >
              <i className="fas fa-envelope"></i>
              <span>sohamkachale7@gmail.com</span>
            </motion.div>
            <motion.div 
              className="contact-item"
              whileHover={{ x: 5 }}
            >
              <i className="fas fa-phone"></i>
              <span>+91 8657417401</span>
            </motion.div>
            <motion.div 
              className="contact-item"
              whileHover={{ x: 5 }}
            >
              <i className="fas fa-map-marker-alt"></i>
              <span>Pune, Maharashtra</span>
            </motion.div>
          </div>
        </div>
      </div>
      
      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <p>&copy; 2025 Soham Kachale. All rights reserved.</p>
      </motion.div>
    </div>
  </motion.footer>
);

// Main App Component with Font Awesome Fix
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Load Font Awesome
  useEffect(() => {
    // Load Font Awesome
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==';
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'no-referrer';
    document.head.appendChild(link);

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'work':
        return <Work />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <LoadingScreen isLoading={isLoading} />
      
      {!isLoading && (
        <>
          <Navbar 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            isScrolled={isScrolled}
          />
          
          <main className="main-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;