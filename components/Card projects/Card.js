import React from 'react'
import styles from './Card.module.css'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { AiFillGithub,AiOutlineRocket } from "react-icons/ai";
import { GrDeploy } from "react-icons/gr";

export const Card = ({image,title,github,deploy}) => {
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{duration: 1}}
    className={styles.container}>
      <img 
      src={image}
      className={styles.img}
      />
      <div className={styles.text}>
        <h2>{title}</h2>
        <div className={styles.links}>
          {github && (
            <a className={styles.a} href={github} target="_blank" rel="noopener noreferrer">{<AiFillGithub/>} Github</a>
          )}
          {deploy && (
            <a className={styles.a} href={deploy} target="_blank" rel="noopener noreferrer">{<AiOutlineRocket/>} Deploy</a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
