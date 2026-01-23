import React, { useState } from 'react'
import styles from './Contact.module.css'
import { FiCopy, FiCheck, FiGithub, FiLinkedin } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useI18n } from '../../context/i18n'

export const Contact = () => {
  const [copied, setCopied] = useState(false)
  const email = 'matiasvaldez8184@gmail.com'
  const { t } = useI18n()

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
          <span className={styles.label}>{t.contact.label}</span>
          <h2 className={styles.title}>
            {t.contact.title} <br />
            <span className={styles.gradientText}>{t.contact.titleHighlight}</span>
          </h2>

          <p className={styles.description}>
            {t.contact.description}
          </p>

          <div className={styles.emailBox}>
            <span className={styles.email}>{email}</span>
            <button
              onClick={copyToClipboard}
              className={styles.copyButton}
              title={copied ? t.contact.copied : t.contact.copy}
            >
              {copied ? <FiCheck /> : <FiCopy />}
              <span>{copied ? t.contact.copied : t.contact.copy}</span>
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
