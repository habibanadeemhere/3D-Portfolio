import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Scene from "./Scene";

const ROLES = [
  "Full Stack Developer",
  "MERN Stack Engineer",
  "React Specialist",
  "UI/UX Enthusiast",
];

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        70
      );
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        40
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="typewriter">
      {displayed}
      <span className="cursor">|</span>
    </span>
  );
}

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const rotateX = useTransform(springY, [-300, 300], [8, -8]);
  const rotateY = useTransform(springX, [-300, 300], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section className="hero" onMouseMove={handleMouseMove} id="home">
      {/* Full-screen 3D background */}
      <Scene />

      {/* Vignette overlay */}
      <div className="hero-vignette" />

      {/* Content */}
      <div className="hero-content">
        <motion.div
          className="profile-wrapper"
          style={{ rotateX, rotateY, transformPerspective: 800 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
        >
          <div className="profile-ring">
            <img
              src="/profile.png"
              alt="Habiba Nadeem"
              className="profile-img"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.classList.add("no-img");
              }}
            />
            <div className="profile-glow" />
          </div>
        </motion.div>

        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">
            <span className="name-habiba">Habiba</span>{" "}
            <span className="name-nadeem">Nadeem</span>
          </h1>

          <h2 className="hero-role">
            <TypewriterRole />
          </h2>

          <p className="hero-bio">
            Crafting modern web experiences with React, Node.js, Express &amp;
            MongoDB — currently studying at SMIT, Karachi.
          </p>

          <motion.div
            className="hero-btns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
           <a
  href="/habiba_nadeem_cv1.pdf"
  target="_blank"
  rel="noreferrer"
  className="btn btn-primary"
>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
  View CV
</a>

            <a
              href="https://github.com/habibanadeemhere"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/habiba-nadeem-4b63412b9"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="scroll-line" />
        <span>scroll</span>
      </motion.div>
    </section>
  );
}