import React from 'react'
import styles from './Introduction.module.css'
import Image from 'next/image'
import cat from '../../public/assets/cat.png'

export const Introduction = () => {
  return (
    <div id='about' className={styles.pos}>
        <div className={styles.bg}>
            <h1>Who am I?</h1>
            <div>
              <h2>
              My name is Matias valdez, <br/>
              a creative UI developer with <br/>
              knowledge about backend. <br/>
              However my focus as frontend<br/>
              developer is to provide to <br/>
              the user the most interactive <br/>
              and simpler experience.
              </h2>
            </div>
            <h2>My working tools: <br/>
            React JS, Next JS, Sass, <br/>
            Tailwind Css, Express and more..</h2>
        </div>
        <div className={styles.cat}>
          <Image 
          src={cat}
          width={300}
          height={200}
          />
        </div>
    </div>
  )
}
