import React, { useState } from "react";
import styles from "./Contact.module.css";
import { AiOutlineMail } from "react-icons/ai";
import { FiCopy, FiCheck } from "react-icons/fi";
import workingAvatar from "../../public/assets/Computer.png";
import Image from "next/image";
import { motion } from "framer-motion";

export const Contact = () => {
    const [copied, setCopied] = useState(false);
    const email = "matiasvaldez8184@gmail.com";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div id="contact" className={styles.pos}>
        <motion.h1
            initial={{ x: 200 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1 }}
            className={styles.text}
        >
            Let's talk!
        </motion.h1>
        <motion.div
            initial={{ x: -200 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1 }}
            className={styles.img}
        >
            <Image alt={"working avatar"} src={workingAvatar} width={350} height={350} />
        </motion.div>
        <div className={styles.contactContent}>
            <div className={styles.emailSection}>
                <h2 className={styles.h2}>Get in touch</h2>
                <p className={styles.p}>
                    I'm always open to discussing new opportunities, <br />
                    collaborations, or just having a chat about web development. <br />
                    Feel free to reach out to me directly via email.
                </p>
                <div className={styles.emailContainer}>
                    <AiOutlineMail className={styles.mailIcon} />
                    <a 
                        href="mailto:matiasvaldez8184@gmail.com" 
                        className={styles.emailLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {email}
                    </a>
                    <button 
                        onClick={copyToClipboard}
                        className={styles.copyButton}
                        title={copied ? "Copied!" : "Copy email"}
                    >
                        {copied ? <FiCheck /> : <FiCopy />}
                    </button>
                </div>
                {copied && (
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={styles.copiedMessage}
                    >
                        Email copied to clipboard!
                    </motion.p>
                )}
            </div>
        </div>
        </div>
    );
};
