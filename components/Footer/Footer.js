import React from 'react'
import styles from './Footer.module.css'
import Image from 'next/image'
import github from '../../public/assets/github.png'
import gmail from '../../public/assets/gmail.png'
import linkedin from '../../public/assets/linkedin.png'
import twitter from '../../public/assets/twitter.png'
import { BsHouseDoor,BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { MdWorkOutline } from "react-icons/md";
import { motion } from 'framer-motion'

export const Footer = () => {
  return (
    <div className={styles.pos}>
        <footer>
        <ul className={styles.ul}>
            <li className={styles.li}>{<BsHouseDoor/>} <a className={styles.a} href='#home'>Home</a></li>
            <li className={styles.li}>{<AiOutlineUser />}<a className={styles.a} href='#about'>About</a></li>
            <li className={styles.li}>{<MdWorkOutline />}<a className={styles.a} href='#projects'>Projects</a></li>
            <li className={styles.li}>{<BsFillTelephoneFill />}<a className={styles.a} href='#contact'>Contact</a></li>
        </ul>
        <div className={styles.images}>
          <motion.a 
          whileHover={{scale: 1.2}}
          href='https://www.linkedin.com/in/matiasvaldez1/'>
            <Image 
            src={linkedin}
            width={60}
            height={60}/>
          </motion.a>
          <motion.a
          whileHover={{scale: 1.2}}
          href='https://mail.google.com/mail/?view=cm&source=mailto&to=matiasvaldez8184@gmail.com'>
            <Image 
            src={gmail}
            width={60}
            height={60}/>
          </motion.a>
          <motion.a 
          whileHover={{scale: 1.2}}
          href='https://github.com/matiasvaldez1'>
            <Image 
            src={github}
            width={60}
            height={60}/>
          </motion.a>
        </div>
        </footer>
    </div>
  )
}
