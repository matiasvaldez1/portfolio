import React from 'react'
import styles from './NavBar.module.css'
import {motion} from 'framer-motion'

export const NavBar = () => {
  return (
    <>
    <nav id="home" className={styles.nav} >
        <motion.ul 
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{duration: 1}}
        className={styles.ul}>
            <li className={styles.li}><a className={styles.a} href='#home'>Home</a></li>
            <li className={styles.li}><a className={styles.a} href='#about'>About</a></li>
            <li className={styles.li}><a className={styles.a} href='#projects'>Projects</a></li>
            <li className={styles.li}><a className={styles.a} href='#contact'>Contact</a></li>
        </motion.ul>
    </nav>
    </>
  )
}
