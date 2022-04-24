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



export const Footer = () => {
  return (
    <div className={styles.pos}>
        <footer>
        <ul className={styles.ul}>
            <li className={styles.li}>{<BsHouseDoor/>} Home</li>
            <li className={styles.li}>{<AiOutlineUser />} About</li>
            <li className={styles.li}>{<MdWorkOutline />} Proyects</li>
            <li className={styles.li}>{<BsFillTelephoneFill />} Contact</li>
        </ul>
        <div className={styles.images}>
            <Image 
            src={twitter}
            width={60}
            height={60}/>
            <Image 
            src={linkedin}
            width={60}
            height={60}/>
            <Image 
            src={gmail}
            width={60}
            height={60}/>
            <Image 
            src={github}
            width={60}
            height={60}/>
        </div>
        </footer>
    </div>
  )
}
