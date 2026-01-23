import React, { useState, useEffect } from 'react'
import styles from './NavBar.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../../context/i18n'

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { locale, setLocale, t } = useI18n()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact', label: t.nav.contact },
  ]

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'es' : 'en')
  }

  return (
    <>
      <motion.nav
        id="home"
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className={styles.container}>
          <a href="#home" className={styles.logo}>
            MV<span className={styles.logoDot}>.</span>
          </a>

          <ul className={styles.ul}>
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                className={styles.li}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <a className={styles.a} href={link.href}>
                  {link.label}
                </a>
              </motion.li>
            ))}
            <motion.li
              className={styles.li}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <button onClick={toggleLocale} className={styles.langToggle}>
                {locale === 'en' ? 'ES' : 'EN'}
              </button>
            </motion.li>
          </ul>

          <button
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              onClick={toggleLocale}
              className={styles.mobileLangToggle}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {locale === 'en' ? 'Español' : 'English'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
