import React from 'react'
import styles from './Contact.module.css'
import { AiOutlineMail } from "react-icons/ai";

export const Contact = () => {
  return (
    <div className={styles.pos}>
        <div className={styles.grid}>
            <div>
                <h2>Get in touch</h2>
                <p>
                I'm very approchable and <br/>
                would love to speak with you. <br/>
                Fell free to send me an email <br/>
                contact me through my social media <br/>
                or simply complete the enquiry form
                </p>
                <p>{<AiOutlineMail />} matiasvaldez8184@gmail.com</p>
            </div>
            <div className={styles.inputs}>
                <h2>Send me a message</h2>
                <form className={styles.inputs}>
                    <input placeholder='Name' className={styles.input}/>
                    <input placeholder='Email' className={styles.input}/>
                    <input placeholder='Subject' className={styles.input}/>
                    <textarea placeholder='Your message' className={styles.input}/>
                    <button className={styles.btn}>Send message</button>
                </form>
            </div>
        </div>
    </div>
  )
}
