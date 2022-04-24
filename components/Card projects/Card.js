import React from 'react'
import styles from './Card.module.css'
import Image from 'next/image'

export const Card = ({image,title,github,deploy}) => {
  return (
    <div id='projects' className={styles.container}>
      <img 
      src={image}
      className={styles.img}
      />
      <div className={styles.text}>
        <h2>{title}</h2>
        <div className={styles.links}>
          <a href={github}>Github</a>
          <a href={deploy}>Deploy</a>
        </div>
      </div>
    </div>
  )
}
