import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SKILL_CATEGORIES = [
  {
    label: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React.js", level: 88 },
      { name: "JavaScript", level: 85 },
      { name: "HTML & CSS", level: 92 },
      { name: "Framer Motion", level: 75 },
      { name: "Three.js", level: 60 },
    ],
  },
  {
    label: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 82 },
      { name: "MongoDB", level: 78 },
      { name: "REST APIs", level: 85 },
      { name: "JWT Auth", level: 75 },
    ],
  },
  {
    label: "Tools",
    icon: "🛠️",
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 80 },
      { name: "Figma", level: 65 },
      { name: "Vercel", level: 82 },
    ],
  },
];

const TECH_ICONS = [
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Express", icon: "🚂" },
  { name: "JavaScript", icon: "⚡" },
  { name: "Git", icon: "📦" },
  { name: "CSS3", icon: "🎨" },
  { name: "HTML5", icon: "🌐" },
];

function SkillBar({ name, level, delay }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true });

  return (
    <div className="skill-bar-item" ref={ref}>
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
        <span className="skill-percent">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="skills" ref={ref}>
      <motion.div
        className="section-eyebrow"
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="eyebrow-line" /> Skills
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
      >
        My <span className="gradient-text">Tech Stack</span>
      </motion.h2>

      {/* Tech icons orbit row */}
      <motion.div
        className="tech-icons-row"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        {TECH_ICONS.map((t, i) => (
          <motion.div
            key={t.name}
            className="tech-icon-pill"
            whileHover={{ scale: 1.15, y: -6 }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.07 }}
          >
            <span className="tech-icon-emoji">{t.icon}</span>
            <span className="tech-icon-name">{t.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Skill bars grid */}
      <div className="skills-grid">
        {SKILL_CATEGORIES.map((cat, ci) => (
          <motion.div
            key={cat.label}
            className="skills-category"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 + ci * 0.15 }}
          >
            <h3 className="skills-category-title">
              <span>{cat.icon}</span> {cat.label}
            </h3>
            {cat.skills.map((s, si) => (
              <SkillBar
                key={s.name}
                {...s}
                delay={0.5 + ci * 0.1 + si * 0.08}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}