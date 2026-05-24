import React from 'react'
import styles from './Footer.module.css'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { useI18n } from '../../context/i18n'
import { config } from '../../utils/config'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { locale, setLocale, t, mounted } = useI18n()

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'es' : 'en')
  }

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact', label: t.nav.contact },
  ]

  const socialLinks = [
    {
      href: config.social.linkedin,
      icon: <FiLinkedin />,
      label: 'LinkedIn',
    },
    {
      href: config.social.github,
      icon: <FiGithub />,
      label: 'GitHub',
    },
    {
      href: `mailto:${config.email}`,
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
            <button
              onClick={toggleLocale}
              className={styles.langToggle}
              aria-label={locale === 'en' ? 'Switch to Spanish' : 'Switch to English'}
            >
              {mounted ? (locale === 'en' ? 'EN' : 'ES') : ''}
            </button>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Matias Valdez. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
