import React from 'react'
import styles from './NavBar.module.css'

export const NavBar = () => {
  return (
    <>
    <nav>
        <ul className={styles.ul}>
            <li className={styles.li}>Home</li>
            <li className={styles.li}>About</li>
            <li className={styles.li}>Proyects</li>
            <li className={styles.li}>Contact</li>
        </ul>
    </nav>
    </>
  )
}
