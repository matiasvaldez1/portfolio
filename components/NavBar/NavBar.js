import React from 'react'
import styles from './NavBar.module.css'

export const NavBar = () => {
  return (
    <>
    <nav id="home" className={styles.nav} >
        <ul className={styles.ul}>
            <li className={styles.li}><a className={styles.a} href='#home'>Home</a></li>
            <li className={styles.li}><a className={styles.a} href='#about'>About</a></li>
            <li className={styles.li}><a className={styles.a} href='#projects'>Projects</a></li>
            <li className={styles.li}><a className={styles.a} href='#contact'>Contact</a></li>
        </ul>
    </nav>
    </>
  )
}
