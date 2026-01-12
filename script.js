// Smooth scrolling and navigation
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Mobile navigation toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")

      // Special handling for skill levels
      if (entry.target.classList.contains("skill-item")) {
        const level = entry.target.getAttribute("data-level")
        entry.target.style.setProperty("--level", level + "%")
      }

      // Staggered animation for project cards
      if (entry.target.classList.contains("project-card")) {
        const cards = document.querySelectorAll(".project-card")
        const index = Array.from(cards).indexOf(entry.target)
        entry.target.style.animationDelay = index * 0.1 + "s"
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  // Timeline items
  document.querySelectorAll(".timeline-item").forEach((item) => {
    observer.observe(item)
  })

  // Project cards
  document.querySelectorAll(".project-card").forEach((card) => {
    observer.observe(card)
  })

  // Skill items
  document.querySelectorAll(".skill-item").forEach((item) => {
    observer.observe(item)
  })

  // Other animated elements
  document.querySelectorAll(".fade-in, .slide-up").forEach((element) => {
    observer.observe(element)
  })

  // Initialize default skills view
  renderSkills("programming")
})

// Skills category switching
const skillCategories = document.querySelectorAll(".skill-category")
const skillsGrid = document.getElementById("skillsGrid")

const skillsData = {
  programming: [
    { icon: "🐍", name: "Python", desc: "Advanced proficiency in AI/ML development", level: 90 },
    { icon: "⚛️", name: "JavaScript", desc: "Modern ES6+ and async programming", level: 85 },
    { icon: "🌐", name: "HTML/CSS", desc: "Responsive design and modern CSS", level: 95 },
    { icon: "☕", name: "Java", desc: "Object-oriented programming", level: 75 },
    { icon: "💾", name: "C Programming", desc: "Modern C with DSA fundamentals", level: 85 },
  ],
  csfundamentals: [
    { icon: "🧩", name: "Data Structures & Algorithms", desc: "Fundamentals of DSA and problem solving", level: 90 },
    { icon: "🏛️", name: "OOP", desc: "Object-Oriented Programming principles", level: 85 },
    { icon: "🖥️", name: "Operating Systems", desc: "OS concepts and process management", level: 80 },
    { icon: "🗃️", name: "DBMS", desc: "Database Management Systems fundamentals", level: 80 },
  ],
  frameworks: [
    { icon: "⚛️", name: "React", desc: "Component-based UI development", level: 80 },
    { icon: "🔥", name: "Firebase", desc: "Backend-as-a-Service platform", level: 70 },
    { icon: "🗄️", name: "MongoDB", desc: "NoSQL database management", level: 75 },
    { icon: "☁️", name: "AWS", desc: "Cloud computing services", level: 65 },
    { icon: "🐬", name: "MySQL", desc: "Relational database management", level: 80 },
    { icon: "🍃", name: "MongoDB", desc: "NoSQL document database", level: 75 },
    { icon: "🦉", name: "OracleSQL", desc: "Enterprise relational database", level: 70 },
  ],
  tools: [
    { icon: "📝", name: "VS Code", desc: "Primary development environment", level: 95 },
    { icon: "🐙", name: "Git", desc: "Version control and collaboration", level: 85 },
    { icon: "🐳", name: "Docker", desc: "Containerization and deployment", level: 70 },
    { icon: "📊", name: "Analytics", desc: "Data analysis and visualization", level: 75 },
    { icon: "📓", name: "Jupyter Notebook", desc: "Interactive Python notebooks", level: 85 },
    { icon: "🟨", name: "Google Colab", desc: "Cloud-based Python notebooks", level: 80 },
    { icon: "🖱️", name: "Cursor", desc: "AI-powered code editor", level: 75 },
    { icon: "📄", name: "Microsoft Office", desc: "Productivity suite (Word, Excel, PowerPoint)", level: 90 },
    { icon: "🌐", name: "Streamlit", desc: "Rapid data app prototyping", level: 80 },
  ],
  soft: [
    { icon: "👥", name: "Leadership", desc: "Team management and mentoring", level: 90 },
    { icon: "🎯", name: "Problem Solving", desc: "Analytical thinking and debugging", level: 95 },
    { icon: "💬", name: "Communication", desc: "Technical and interpersonal skills", level: 85 },
    { icon: "📈", name: "Project Management", desc: "Planning and execution", level: 80 },
    { icon: "🧑‍🤝‍🧑", name: "Team Leadership", desc: "Guiding teams to success", level: 90 },
    { icon: "🧠", name: "Critical Thinking", desc: "Objective analysis and evaluation", level: 90 },
    { icon: "🌱", name: "Growth Mindset", desc: "Continuous learning and improvement", level: 95 },
  ],
}

function renderSkills(category) {
  const skills = skillsData[category]
  skillsGrid.innerHTML = skills
    .map(
      (skill) => `
    <div class="skill-item" data-category="${category}" data-level="${skill.level}">
      <div class="skill-icon">${skill.icon}</div>
      <div class="skill-info">
        <h4>${skill.name}</h4>
        <p>${skill.desc}</p>
      </div>
      <div class="skill-level">
        <div class="level-bar"></div>
        <span class="level-text">${skill.level}%</span>
      </div>
    </div>
  `,
    )
    .join("")

  // Re-observe new skill items
  document.querySelectorAll(".skill-item").forEach((item) => {
    item.style.setProperty("--level", item.getAttribute("data-level") + "%")
    observer.observe(item)
  })
}

skillCategories.forEach((category) => {
  category.addEventListener("click", () => {
    // Update active category
    skillCategories.forEach((cat) => cat.classList.remove("active"))
    category.classList.add("active")

    // Render new skills
    const categoryName = category.getAttribute("data-category")
    renderSkills(categoryName)
  })
})

// Project modal functionality
const modal = document.getElementById("projectModal")
const modalBody = document.getElementById("modalBody")
const modalClose = document.querySelector(".modal-close")

const projectData = {
  "ai-monitoring": {
    title: "AI-Based Central Patient Monitoring System",
    description:
      "An innovative healthcare solution that leverages artificial intelligence to monitor patient vitals in real-time, predict critical conditions, and automate medical interventions.",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Real-time vital signs monitoring with IoT sensors",
      "AI-powered predictive analytics for early warning",
      "Smart alarm system for critical conditions",
      "Automated medication delivery integration",
      "Healthcare professional dashboard",
      "Patient data visualization and reporting",
    ],
    technologies: ["Python", "TensorFlow", "IoT Sensors", "Real-time Analytics", "Healthcare APIs", "Machine Learning"],
    status: "Ongoing Research",
    impact:
      "Aims to reduce response time in critical situations by 40% and improve patient outcomes through predictive healthcare.",
    github: "https://github.com/yugavardhank",
    demo: "https://www.linkedin.com/in/yugavardhank",
  },
  "voice-assistant": {
    title: "AI Voice Assistant",
    description:
      "A comprehensive voice-controlled assistant built with Python that can perform various tasks through natural language processing and speech recognition.",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Voice command recognition with 95% accuracy",
      "Application launching and system control",
      "Web browsing and intelligent search",
      "Media playback and smart home control",
      "System automation and task scheduling",
      "Question answering with context awareness",
    ],
    technologies: [
      "Python",
      "Speech Recognition",
      "Natural Language Processing",
      "API Integration",
      "Machine Learning",
    ],
    status: "Completed",
    impact: "Demonstrates proficiency in AI integration and human-computer interaction design.",
    github: "https://github.com/yugavardhank/pyprojectvoice",
    demo: "https://www.linkedin.com/in/yugavardhank",
  },
  "audio-analysis": {
    title: "Audio Analysis & Topic Segmentation for Podcasts",
    description:
      "An advanced podcast analysis system leveraging Automatic Speech Recognition (ASR) technology, PyAnnote for speaker diarization, and comprehensive audio preprocessing techniques. Implements intelligent topic segmentation with sophisticated text preprocessing and NLP algorithms for automated podcast insights and intelligent categorization.",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Automatic Speech Recognition (ASR) with high accuracy",
      "Speaker diarization using PyAnnote framework",
      "Comprehensive audio preprocessing and enhancement",
      "Advanced text preprocessing and normalization",
      "Intelligent topic segmentation and clustering",
      "Natural Language Processing for content analysis",
      "Automated transcript generation and timestamping",
      "Podcast metadata extraction and categorization",
    ],
    technologies: [
      "Python",
      "ASR (Automatic Speech Recognition)",
      "PyAnnote",
      "Audio Signal Processing",
      "NLP",
      "Machine Learning",
      "Text Preprocessing",
      "Speaker Diarization",
    ],
    status: "Ongoing - Infosys Springboard",
    impact:
      "Transforms raw podcast audio into actionable insights with automated topic discovery, speaker attribution, and content analysis capabilities for media research and content management.",
    github: "https://github.com/yugavardhank",
    demo: "https://www.linkedin.com/in/yugavardhank",
  },
  "productivity-tracker": {
    title: "Personalized AI-Integrated Productivity OS",
    description:
      "A custom-built productivity system that tracks learning, work, and wellness, integrating AI for intelligent planning and automation. Designed for mindful growth, it leverages Streamlit, Google Sheets, Plotly, and Gemini AI to visualize progress and optimize daily routines.",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Effort logging and categorization across multiple domains",
      "Progress visualization and under-practice detection",
      "Gemini AI-powered task suggestions and scheduling",
      "Natural language automation of daily routines",
      "Wellness reminders and daily reflections",
      "Quantitative and qualitative time analysis",
    ],
    technologies: ["Streamlit", "Google Sheets API", "Plotly", "Gemini 1.5 AI"],
    status: "Completed",
    impact:
      "Empowers intentional learning and personal growth by combining analytics, automation, and AI-driven insights in a single dashboard.",
    github: "https://github.com/yugavardhank",
    demo: "https://www.linkedin.com/posts/yugavardhank_productivityos-generativeai-studentbuilder-activity-7345823133691428865-4oli?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEmoM40Bb3mY-FHIr7Wa37MxiLnq5rk3bIE",
  },
  "attendance-system": {
    title: "Barcode-Based Attendance System",
    description:
      "An innovative attendance tracking solution that secured Runner-Up position at TARIGYM 2024 hackathon, revolutionizing traditional attendance methods.",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "QR/Barcode generation and scanning",
      "Real-time attendance tracking",
      "Automated report generation",
      "Database integration with analytics",
      "Admin dashboard with insights",
      "Mobile-friendly responsive interface",
    ],
    technologies: ["Barcode Technology", "Database Management", "Web Development", "Mobile Optimization", "Analytics"],
    status: "Award Winner - Runner-Up TARIGYM 2024",
    impact: "Recognized for innovation in educational technology and practical problem-solving.",
    github: "https://github.com/yugavardhank",
    demo: "https://www.linkedin.com/posts/yugavardhank_hackathon-innovation-teamwork-activity-7259950220023644162-yBWm?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEmoM40Bb3mY-FHIr7Wa37MxiLnq5rk3bIE",
  },
}

function openProjectModal(projectId) {
  const project = projectData[projectId]
  if (!project) return

  modalBody.innerHTML = `
    <div class="modal-header">
      <h2>${project.title}</h2>
      <div class="project-status ${project.status.toLowerCase().includes("completed") ? "completed" : project.status.toLowerCase().includes("award") ? "award" : ""}">${project.status}</div>
    </div>

    
    <p class="project-description">${project.description}</p>
    
    <div class="modal-section">
      <h3>Key Features</h3>
      <ul class="feature-list">
        ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
      </ul>
    </div>
    
    <div class="modal-section">
      <h3>Technologies Used</h3>
      <div class="tech-tags">
        ${project.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
      </div>
    </div>
    
    <div class="modal-section">
      <h3>Impact</h3>
      <p>${project.impact}</p>
    </div>
    
    <div class="modal-actions" style="display: flex; gap: 16px; margin-top: 24px;">
      <a href="${project.github}" class="modal-btn primary" target="_blank" style="
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        background: var(--gradient-primary, #4f8cff 0%, #6ee7b7 100%);
        color: #fff;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 1rem;
        text-decoration: none;
        box-shadow: 0 2px 8px rgba(79,140,255,0.15);
        transition: background 0.2s, transform 0.2s;
        cursor: pointer;
      " onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='var(--gradient-primary, #4f8cff 0%, #6ee7b7 100%)'">
        <span>💻</span>
        <span>View Code</span>
      </a>
      <a href="${project.demo}" class="modal-btn secondary" target="_blank" style="
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        background: linear-gradient(90deg, #fbbf24 0%, #f472b6 100%);
        color: #fff;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 1rem;
        text-decoration: none;
        box-shadow: 0 2px 8px rgba(251,191,36,0.15);
        transition: background 0.2s, transform 0.2s;
        cursor: pointer;
      " onmouseover="this.style.background='#f59e42'" onmouseout="this.style.background='linear-gradient(90deg, #fbbf24 0%, #f472b6 100%)'">
        <span>🚀</span>
        <span>Live Demo</span>
      </a>
    </div>
  `

  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeProjectModal() {
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Project card click handlers
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const projectId = card.getAttribute("data-project")
    openProjectModal(projectId)
  })
})

// Modal close handlers
modalClose.addEventListener("click", closeProjectModal)
document.querySelector(".modal-overlay").addEventListener("click", closeProjectModal)

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeProjectModal()
  }
})

// Contact form handling
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const submitBtn = contactForm.querySelector(".submit-btn")
  const originalText = submitBtn.innerHTML

  // Show loading state
  submitBtn.innerHTML = '<span class="btn-text">Sending...</span>'
  submitBtn.disabled = true

  // Simulate form submission
  setTimeout(() => {
    submitBtn.innerHTML = '<span class="btn-text">Message Sent! ✓</span>'
    submitBtn.style.background = "var(--gradient-secondary)"

    setTimeout(() => {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
      submitBtn.style.background = ""
      contactForm.reset()

      // Reset form labels
      document.querySelectorAll(".form-group label").forEach((label) => {
        label.style.top = ""
        label.style.fontSize = ""
        label.style.color = ""
      })
    }, 2000)
  }, 1500)
})

// Form validation and styling
document.querySelectorAll(".form-group input, .form-group textarea").forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.classList.remove("valid")
    } else {
      input.classList.add("valid")
    }
  })
})

// Parallax effects
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const rate = scrolled * -0.5

  // Parallax for floating shapes
  document.querySelectorAll(".shape").forEach((shape, index) => {
    const speed = 0.5 + index * 0.1
    shape.style.transform = `translateY(${scrolled * speed}px)`
  })

  // Parallax for hero elements
  const heroGradient = document.querySelector(".hero-gradient")
  if (heroGradient) {
    heroGradient.style.transform = `translateY(${rate}px)`
  }
})

// Theme toggle (placeholder for future implementation)
const themeToggle = document.getElementById("themeToggle")
themeToggle.addEventListener("click", () => {
  // Theme switching logic would go here
  console.log("Theme toggle clicked")
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Active navigation link highlighting
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active")
    }
  })
})

// Smooth reveal animations for stats
function animateStats() {
  document.querySelectorAll(".stat-number").forEach((stat) => {
    const target = Number.parseFloat(stat.getAttribute("data-target"))
    const isDecimal = target % 1 !== 0
    let current = 0
    const increment = target / 50

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }

      stat.textContent = isDecimal ? current.toFixed(2) : Math.floor(current)
    }, 50)
  })
}

// Trigger stats animation when hero is visible
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(animateStats, 1000)
        heroObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const heroSection = document.querySelector(".hero")
if (heroSection) {
  heroObserver.observe(heroSection)
}

// Custom Cursor
const cursor = document.getElementById("cursor")
const cursorDot = document.querySelector(".cursor-dot")
const cursorOutline = document.querySelector(".cursor-outline")

let mouseX = 0
let mouseY = 0
let outlineX = 0
let outlineY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY

  cursorDot.style.left = mouseX + "px"
  cursorDot.style.top = mouseY + "px"
})

// Smooth cursor outline animation
function animateCursor() {
  outlineX += (mouseX - outlineX) * 0.1
  outlineY += (mouseY - outlineY) * 0.1

  cursorOutline.style.left = outlineX + "px"
  cursorOutline.style.top = outlineY + "px"

  requestAnimationFrame(animateCursor)
}
animateCursor()

// Cursor interactions
document.querySelectorAll("a, button, .project-card, .skill-item").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)"
    cursorDot.style.transform = "translate(-50%, -50%) scale(0.5)"
  })

  el.addEventListener("mouseleave", () => {
    cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
    cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
  })
})

// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loadingScreen").classList.add("hidden")
  }, 2000)
})

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Navbar background change
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Active navigation highlighting
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active")
    }
  })
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// Console easter egg
console.log(`
🚀 Welcome to K Yugavardhan's Modern Portfolio! 🚀

Built with cutting-edge technologies:
- Modern CSS with custom properties
- Advanced animations and transitions
- Glassmorphism and modern design patterns
- Vanilla JavaScript with ES6+
- Responsive design with CSS Grid
- Performance optimized

Contact: yugavardhank@gmail.com
LinkedIn: linkedin.com/in/yugavardhank
GitHub: github.com/yugavardhank

Interested in the code? Let's connect!
`)

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add initial animation classes
  document.querySelectorAll(".fade-in, .slide-up").forEach((element) => {
    observer.observe(element)
  })

  console.log("Portfolio initialized successfully! 🎉")
})

// Extracurricular activities logging
const activities = [
  {
    title: "AI/ML Research Intern",
    organization: "Innovative Tech Solutions",
    duration: "June 2023 - Present",
    description:
      "Conducting research on AI/ML algorithms for healthcare applications, focusing on predictive analytics and real-time data processing.",
    skills: ["Python", "TensorFlow", "Data Analysis"],
  },
  {
    title: "Full-Stack Developer",
    organization: "Freelance",
    duration: "Jan 2023 - May 2023",
    description:
      "Developed and maintained web applications using the MERN stack, with a focus on responsive design and user experience.",
    skills: ["React", "Node.js", "MongoDB", "CSS"],
  },
  {
    title: "Data Science Intern",
    organization: "Data Insights Inc.",
    duration: "Sept 2022 - Dec 2022",
    description:
      "Assisted in data collection, cleaning, and analysis for various projects, utilizing Python and SQL for data manipulation.",
    skills: ["Python", "SQL", "Data Visualization"],
  },
]

function renderActivities() {
  const activitiesGrid = document.getElementById("activitiesGrid")
  activitiesGrid.innerHTML = activities
    .map(
      (activity) => `
    <div class="activity-item">
      <h3>${activity.title}</h3>
      <p class="organization">${activity.organization} | ${activity.duration}</p>
      <p class="description">${activity.description}</p>
      <div class="skills">
        ${activity.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
      </div>
    </div>
  `,
    )
    .join("")
}

// Initial render of activities
renderActivities()

// Activity item click handler (for potential interactivity)
document.querySelectorAll(".activity-item").forEach((item) => {
  item.addEventListener("click", () => {
    const title = item.querySelector("h3").innerText
    const org = item.querySelector(".organization").innerText
    const desc = item.querySelector(".description").innerText

    console.log(`Activity: ${title}\nOrganization: ${org}\nDescription: ${desc}`)
    alert(`Clicked on activity: ${title}`)
  })
})

// Adding interactivity to the honors section
const honorBadges = document.querySelectorAll('.honor-badge');
honorBadges.forEach(badge => {
    badge.addEventListener('click', () => {
        alert(`You clicked on: ${badge.querySelector('.badge-text').innerText}`);
    });
});

