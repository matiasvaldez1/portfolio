import React from 'react'
import { NavBar } from '../NavBar/NavBar'
import styles from './Hero.module.css'
import { motion } from 'framer-motion'

export const Hero = () => {
  return (
    <>
      <NavBar />
      <section className={styles.hero}>
        <div className={styles.content}>
          <motion.div
            className={styles.textContainer}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className={styles.greeting}>Hello, I&apos;m</p>
            <h1 className={styles.name}>
              <span className={styles.gradientText}>Matias Valdez</span>
            </h1>
            <p className={styles.title}>Frontend Developer</p>
            <p className={styles.location}>Based in Buenos Aires</p>
          </motion.div>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <a href="#about" className={styles.btnPrimary}>
              Explore my work
            </a>
            <a
              href={process.env.NEXT_PUBLIC_LINK_CV}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              Download CV
            </a>
          </motion.div>

          <motion.div
            className={styles.scrollIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <span className={styles.scrollText}>Scroll</span>
            <div className={styles.scrollLine} />
          </motion.div>
        </div>
      </section>
    </>
  )
}
