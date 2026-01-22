import React from 'react'
import styles from './Footer.module.css'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]

  const socialLinks = [
    {
      href: 'https://www.linkedin.com/in/matiasvaldez1/',
      icon: <FiLinkedin />,
      label: 'LinkedIn',
    },
    {
      href: 'https://github.com/matiasvaldez1',
      icon: <FiGithub />,
      label: 'GitHub',
    },
    {
      href: 'mailto:matiasvaldez8184@gmail.com',
      icon: <FiMail />,
      label: 'Email',
    },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <a href="#home" className={styles.logo}>
            MV<span className={styles.logoDot}>.</span>
          </a>

          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.socials}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Matias Valdez. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
