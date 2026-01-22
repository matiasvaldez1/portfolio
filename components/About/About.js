import React from 'react'
import styles from './About.module.css'
import { motion } from 'framer-motion'

export const About = () => {
  const skills = [
    'React',
    'Next.js',
    'TypeScript',
    'Shopify',
    'Node.js',
    'GraphQL',
    'Tailwind CSS',
    'PostgreSQL',
  ]

  const experience = [
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
            <span className={styles.label}>About</span>
            <h2 className={styles.title}>
              Building digital experiences <br />
              <span className={styles.gradientText}>that make a difference</span>
            </h2>
          </div>

          <div className={styles.grid}>
            <div className={styles.bio}>
              <p className={styles.text}>
                I&apos;m a frontend developer based in Buenos Aires, Argentina, passionate
                about creating high-performance web experiences that are both beautiful
                and functional.
              </p>
              <p className={styles.text}>
                With experience across startups and agencies, I&apos;ve developed Shopify
                integrations, optimized payment systems, and led A/B testing experiments
                that drive real business results.
              </p>
              <p className={styles.text}>
                I focus on writing clean, maintainable code and staying current with
                modern web technologies to deliver the best possible solutions.
              </p>
            </div>

            <div className={styles.details}>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Experience</h3>
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
                <h3 className={styles.sectionTitle}>Technologies</h3>
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
