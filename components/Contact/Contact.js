import React, { useState } from 'react'
import styles from './Contact.module.css'
import { FiCopy, FiCheck, FiGithub, FiLinkedin } from 'react-icons/fi'
import { motion } from 'framer-motion'

export const Contact = () => {
  const [copied, setCopied] = useState(false)
  const email = 'matiasvaldez8184@gmail.com'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Contact</span>
          <h2 className={styles.title}>
            Let&apos;s build something <br />
            <span className={styles.gradientText}>together</span>
          </h2>

          <p className={styles.description}>
            I&apos;m always open to discussing new projects, creative ideas,
            or opportunities to be part of your vision.
          </p>

          <div className={styles.emailBox}>
            <span className={styles.email}>{email}</span>
            <button
              onClick={copyToClipboard}
              className={styles.copyButton}
              title={copied ? 'Copied!' : 'Copy email'}
            >
              {copied ? <FiCheck /> : <FiCopy />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <div className={styles.socials}>
            <a
              href="https://www.linkedin.com/in/matiasvaldez1/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FiLinkedin />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/matiasvaldez1"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FiGithub />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
