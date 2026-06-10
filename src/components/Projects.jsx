import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const PROJECTS = [
  {
    title: "MERN Task Manager",
    desc: "Full-stack task management app with authentication, CRUD operations, and real-time updates. Built with React, Node.js, Express, and MongoDB.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    category: "fullstack",
    github: "https://github.com/habibanadeemhere/ToDo-application-frontend.git",
    live: "https://to-do-application-frontend-phi.vercel.app",
    gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    icon: "📋",
  },
  {
    title: "Expense Tracker",
    desc: "Track income and expenses with charts, category filters, and monthly reports. Persistent data with MongoDB backend.",
    tags: ["React", "MongoDB", "Chart.js"],
    category: "fullstack",
    github: "https://github.com/habibanadeemhere/Expense-Tracker.git",
    live: "https://expense-tracker-1dob.vercel.app/#",
    gradient: "linear-gradient(135deg, #a855f7, #7c3aed)",
    icon: "💰",
  },
  {
    title: "Weather Application",
    desc: "Real-time weather app using OpenWeather API with 5-day forecast, animated weather icons, and location search.",
    tags: ["React", "API", "CSS"],
    category: "frontend",
    github: "https://github.com/habibanadeemhere/Weather-Application.git",
    live: "https://habibanadeemhere.github.io/Weather-Application/",
    gradient: "linear-gradient(135deg, #c084fc, #8b5cf6)",
    icon: "🌤️",
  },
  {
    title: "Scentra Website",
    desc: "Premium fragrance e-commerce UI with product gallery, cart functionality, and smooth animations.",
    tags: ["React", "CSS", "Framer Motion"],
    category: "frontend",
    github: "https://github.com/habibanadeemhere/scentra-website.git",
    live: "https://amazing-kitsune-506fba.netlify.app/",
    gradient: "linear-gradient(135deg, #7c3aed, #4c1d95)",
    icon: "🌸",
  },
  {
    title: "SMIT Connect Portal",
    desc: "Student portal for SMIT with course listings, announcements, and student profiles. Full MERN stack application.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    category: "fullstack",
    github: "https://github.com/habibanadeemhere/SMIT-Connect-Portal.git",
    live: "https://smit-connect-portal-five.vercel.app/",
    gradient: "linear-gradient(135deg, #9333ea, #6d28d9)",
    icon: "🧠",
  },
  {
    title: "Rock Paper Scissors",
    desc: "Interactive RPS game with score tracking, animated hands, win/loss history, and VS computer AI logic.",
    tags: ["React", "JavaScript", "CSS"],
    category: "frontend",
    github: "https://github.com/habibanadeemhere/rock-paper-scissor-game.git",
    live: "https://habibanadeemhere.github.io/rock-paper-scissor-game/",
    gradient: "linear-gradient(135deg, #e879f9, #a855f7)",
    icon: "✊",
  },
];

const FILTERS = ["all", "fullstack", "frontend"];

function ProjectCard({ project, index }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -14;
    setTilt({ x, y });
  };
  console.log(project.github);

  return (
    <motion.div
      ref={ref}
      className="project-card"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <div className="card-glow" style={{ background: project.gradient }} />

      <div className="card-top">
        <div
          className="card-icon-wrap"
          style={{ background: project.gradient }}
        >
          <span className="card-icon">{project.icon}</span>
        </div>
        <div className="card-links">
          <a
            href="https://github.com/habibanadeemhere"
            target="_blank"
            rel="noreferrer"
            className="card-link"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="card-link"
            title="Live Demo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      <h3 className="card-title">{project.title}</h3>
      <p className="card-desc">{project.desc}</p>

      <div className="card-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const ref = useRef();
  const inView = useInView(ref, { once: true });

  const filtered = filter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="projects" ref={ref}>
      <motion.div
        className="section-eyebrow"
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="eyebrow-line" /> Projects
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
      >
        Things I've <span className="gradient-text">Built</span>
      </motion.h2>

      {/* Filter pills */}
      <motion.div
        className="filter-row"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "filter-btn--active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </motion.div>

      <div className="projects-grid">
        {filtered.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}