import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { value: "170+", label: "Projects Built" },
  { value: "2+", label: "Year Learning" },
  { value: "18+", label: "Technologies" },
  { value: "100%", label: "Passion" },
];

const TIMELINE = [
  {
    year: "2023",
    title: "Started SMIT",
    desc: "Joined Saylani Mass IT Training, diving deep into full-stack web development.",
  },
  {
    year: "2024",
    title: "Frontend Focus",
    desc: "Focused on mastering modern frontend technologies and frameworks.",
  },
  {
    year: "2025",
    title: "Launching Portfolio",
    desc: "Launching professional portfolio, contributing to open source, seeking opportunities.",
  },
    {
    year: "2026",
    title: "MERN Stack",
    desc: "Mastered MongoDB, Express, React, and Node.js — built real-world projects.",
  },
];

function StatCard({ value, label, index }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, type: "spring" }}
    >
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="about" ref={ref}>
      <motion.div
        className="section-eyebrow"
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="eyebrow-line" /> About Me
      </motion.div>

      <div className="about-grid">
        {/* Left: text */}
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="section-title">
            Building the web,<br />
            <span className="gradient-text">one commit at a time.</span>
          </h2>
          <p>
            I'm Habiba Nadeem, a Full Stack Developer based in Karachi, Pakistan.
            I specialise in the MERN stack — creating fast, accessible, and
            visually polished web applications that solve real problems.
          </p>
          <p>
            Currently studying at SMIT (Saylani Mass IT Training), I'm constantly
            pushing my skills further — from 3D web experiences with Three.js to
            scalable back-end APIs with Node and Express.
          </p>
          <p>
            When I'm not coding, I'm exploring new libraries, contributing to
            projects, and designing things that make people stop scrolling.
          </p>
        </motion.div>

        {/* Right: timeline */}
        <motion.div
          className="about-timeline"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.15 }}
            >
              <div className="timeline-dot" />
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats row */}
      <div className="stats-row">
        {STATS.map((s, i) => (
          <StatCard key={i} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}