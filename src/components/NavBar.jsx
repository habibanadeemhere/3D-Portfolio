import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["home", "about", "projects", "skills", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <a href="#home" className="nav-logo">
        HN<span className="nav-logo-dot">.</span>
      </a>

      {/* Desktop links */}
      <ul className="nav-links">
        {LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className={`nav-link ${active === href.slice(1) ? "nav-link--active" : ""}`}
            >
              {label}
              {active === href.slice(1) && (
                <motion.span
                  className="nav-link-underline"
                  layoutId="nav-underline"
                />
              )}
            </a>
          </li>
        ))}
      </ul>

 <div className="nav-actions">
  <a
    href="https://resume-five-ruddy.vercel.app/"
    target="_blank"
    rel="noreferrer"
    className="nav-resume-btn"
  >
    Resume
  </a>

  <a
    href="/habiba_nadeem_cv1.pdf"
    target="_blank"
    rel="noreferrer"
    className="nav-resume-btn"
  >
    CV
  </a>
</div>
   

      {/* Mobile burger */}
      <button
        className="nav-burger"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? "open" : ""} />
        <span className={menuOpen ? "open" : ""} />
        <span className={menuOpen ? "open" : ""} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="nav-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}