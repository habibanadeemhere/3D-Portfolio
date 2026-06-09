import { motion } from "framer-motion";
import profileImg from "../assets/profile.png";
import Scene from "./Scene";

export default function Hero() {
  return (
    <section className="hero">
      <motion.img
        src={profileImg}
        alt="Habiba"
        className="profile"
        initial={{
   scale: 0,
   rotate: -180,
 }}
 animate={{
   scale: 1,
   rotate: 0,
 }}
 transition={{
   duration: 1.5,
 }}

      />
<Scene />
   <motion.h1
 initial={{ opacity: 0, y: 100 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{
   duration: 1.2,
 }}
>
        
        Habiba Nadeem
      </motion.h1>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Full Stack Developer | MERN Stack
      </motion.h3>

      <p>
        Building modern web applications with React, Node.js,
        Express and MongoDB.
      </p>

      <div className="heroBtns">
        <a href="#projects">Projects</a>
        <a
          href="https://github.com/habibanadeemhere"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}