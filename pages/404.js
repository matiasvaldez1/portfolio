import React from "react"
import styles from "../styles/404.module.css"
import Image from "next/image"
import errorimage from "../public/assets/404.png"

export default function Custom404() {
    return (
            <div className={styles.bg}>
                <div className={styles.pos}>
                    <Image 
                    width={500}
                    height={500}
                    src={errorimage}/>
                </div>
            </div>
    )
  }