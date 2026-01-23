import React from 'react'
import styles from './About.module.css'
import { motion } from 'framer-motion'
import { useI18n } from '../../context/i18n'

export const About = () => {
  const { t } = useI18n()

  const skills = [
    'React',
    'Next.js',
    'TypeScript',
    'Shopify',
    'Liquid',
    'Remix',
    'Node.js',
    'GraphQL',
    'Tailwind CSS',
    'PostgreSQL',
    'Prisma',
  ]

  const experience = [
    { company: 'Prismfly', role: 'Shopify Developer' },
    { company: 'Gohub', role: 'Frontend Developer' },
    { company: 'GMO Solutions', role: 'Web Developer' },
    { company: 'FJ Solutions', role: 'Frontend Developer' },
    { company: 'Conversion Flow', role: 'Frontend Developer' },
  ]

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.header}>
            <span className={styles.label}>{t.about.label}</span>
            <h2 className={styles.title}>
              {t.about.title} <br />
              <span className={styles.gradientText}>{t.about.titleHighlight}</span>
            </h2>
          </div>

          <div className={styles.grid}>
            <div className={styles.bio}>
              <p className={styles.text}>
                {t.about.bio1} <strong>{t.about.bio1Bold}</strong> {t.about.bio1End}
              </p>
              <p className={styles.text}>
                {t.about.bio2} <strong>{t.about.bio2Bold}</strong> {t.about.bio2End}
              </p>
              <p className={styles.text}>
                {t.about.bio3}
              </p>
            </div>

            <div className={styles.details}>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{t.about.experience}</h3>
                <ul className={styles.experienceList}>
                  {experience.map((exp, i) => (
                    <motion.li
                      key={exp.company}
                      className={styles.experienceItem}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className={styles.company}>{exp.company}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{t.about.technologies}</h3>
                <div className={styles.skills}>
                  {skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className={styles.skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
