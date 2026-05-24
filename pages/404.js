import React,{useEffect} from "react"
import Head from "next/head"
import styles from "../styles/404.module.css"
import Image from "next/image"
import errorimage from "../public/assets/404.png"
import Link from "next/link"
import { useI18n } from "../context/i18n"

export default function Custom404() {
    const { t } = useI18n()

    useEffect(() => {
        document.body.style.overflow ="hidden"
        return () => document.body.style.overflow ="auto"
    }, [])

    return (
            <div className={styles.bg}>
                <Head>
                    <title>404 - Page Not Found | Matias Valdez</title>
                    <meta name="robots" content="noindex" />
                </Head>
                <div className={styles.pos}>
                    <Image
                    width={500}
                    height={500}
                    src={errorimage}
                    alt={"404 page not found"}/>
                </div>
                <div className={styles.link}>
                    <Link href={"/"}>{t.notFound.backHome}</Link>
                </div>
            </div>
    )
  }