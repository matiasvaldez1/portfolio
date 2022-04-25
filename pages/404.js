import React,{useEffect,useState} from "react"
import styles from "../styles/404.module.css"
import Image from "next/image"
import errorimage from "../public/assets/404.png"
import Link from "next/link"

export default function Custom404() {
    useEffect(() => {
        document.body.style.overflow ="hidden"
        return () => document.body.style.overflow ="auto"
    }, [])
    
    return (
            <div className={styles.bg}>
                <div className={styles.pos}>
                    <Image 
                    width={500}
                    height={500}
                    src={errorimage}/>
                </div>
                <div className={styles.link}>
                    <Link href={"/"}><a>Go Back To Home</a></Link>
                </div>
            </div>
    )
  }