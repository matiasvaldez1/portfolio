import React from 'react'
import styles from './About.module.css'
import avatar from '../../public/assets/Music-pana.png'
import Image from 'next/image'
import {motion} from 'framer-motion'

export const About = () => {
  return (
      <>
      <div className={styles.pos}>
        <motion.div 
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{duration: 1}}
        className={styles.bg}>
            <motion.div
            whileHover={{ scale: 1.1 }} 
            >
                <Image
                src={avatar} 
                height={500}
                width={300}
                />
            </motion.div>
            <div className={styles.text}>
                <h1>About me</h1>
                <p>ajjasjasjaaksajskasjaskajsajk</p>
            </div>
        </motion.div>
    </div>
    </>
  )
}
