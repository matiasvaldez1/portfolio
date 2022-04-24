import React from 'react'
import styles from './About.module.css'
import avatar from '../../public/assets/Music-pana.png'
import Image from 'next/image'

export const About = () => {
  return (
      <>
      <div className={styles.pos}>
        <div className={styles.bg}>
            <div>
                <Image
                src={avatar} 
                height={400}
                width={250}
                />
                </div>
            <div className={styles.text}>
                <h1>About me</h1>
                <p>ajjasjasjaaksajskasjaskajsajk</p>
            </div>
        </div>
    </div>
    </>
  )
}
