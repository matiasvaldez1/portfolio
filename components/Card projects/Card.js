import React from 'react'
import styles from './Card.module.css'
import { motion } from 'framer-motion'
import { AiFillGithub, AiOutlineRocket } from "react-icons/ai"

export const Card = ({ image, title, github, deploy, description, tech }) => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <div className={styles.imgWrapper}>
        <img
          src={image}
          alt={title || "Project image"}
          className={styles.img}
        />
        <div className={styles.overlay}>
          <span className={styles.viewProject}>View Project</span>
        </div>
      </div>
      <div className={styles.text}>
        <h2>{title}</h2>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
        {tech && (
          <div className={styles.techStack}>
            {tech.split(',').map((t, i) => (
              <span key={i} className={styles.techTag}>{t.trim()}</span>
            ))}
          </div>
        )}
        <div className={styles.links}>
          {github && (
            <motion.a
              className={styles.a}
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AiFillGithub /> Github
            </motion.a>
          )}
          {deploy && (
            <motion.a
              className={styles.a}
              href={deploy}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AiOutlineRocket /> Deploy
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
