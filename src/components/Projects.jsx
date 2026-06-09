import { motion } from "framer-motion";

const projects = [
  {
    title: "MERN Task Manager",
    emoji: "📋",
  },
  {
    title: "Expense Tracker",
    emoji: "💰",
  },
  {
    title: "Weather App",
    emoji: "🌤️",
  },
  {
    title: "SMIT Portal",
    emoji: "🧠",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>

      <div className="grid">
        {projects.map((project, index) => (
          <motion.div
            className="card"
            key={index}
            whileHover={{
              scale: 1.08,
              rotateY: 10,
              rotateX: 5,
            }}
          >
            <div className="emoji">
              {project.emoji}
            </div>

            <h3>{project.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}