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
            className={styles.img}
            >
                <Image
                src={avatar} 
                alt={"avatar"}
                height={500}
                width={300}
                />
            </motion.div>
            <div className={styles.text}>
                <h1 className={styles.h1}>About me</h1>
                <p className={styles.p}>
                  Lately Ive been more <br/>
                  interested in developing <br/>
                  my skils as a creative UI <br/>
                  developer,thats why re- <br/>
                  cently Ive started my <br/>
                  journey learning <br/>
                  technologies that help <br/>
                  me reach that goal, such <br/>
                  as Three Js or UI/UX design. <br/>
                  You can follow my journey <br/>
                  by following in my social <br/>
                  media where I will be <br/>
                  posting my progress. <br/>
                </p>
            </div>
        </motion.div>
    </div>
    </>
  )
}
