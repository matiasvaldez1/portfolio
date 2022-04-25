import React,{useRef,useState} from "react";
import styles from "./Contact.module.css";
import { AiOutlineMail } from "react-icons/ai";
import workingAvatar from "../../public/assets/Computer.png";
import Image from "next/image";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export const Contact = () => {
    const form = useRef();
    const [show,setShow] = useState(false)
    const sendEmail = (e) => {
        e.preventDefault();
            emailjs.sendForm(process.env.NEXT_PUBLIC_SERVICE_ID,process.env.NEXT_PUBLIC_TEMPLATE_ID, form.current, process.env.NEXT_PUBLIC_PUBLIC_KEY)
            .then((result) => {
                setShow(true)
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        };
    return (
        <div id="contact" className={styles.pos}>
        <motion.h1
            initial={{ x: 200 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1 }}
            className={styles.text}
        >
            Lets talk!
        </motion.h1>
        <motion.div
            initial={{ x: -200 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1 }}
            className={styles.img}
        >
            <Image alt={"workin avatar"} src={workingAvatar} width={350} height={350} />
        </motion.div>
        <div>
            <div className={styles.grid}>
            <div>
                <h2>Get in touch</h2>
                <p className={styles.p}>
                I am very approchable and <br />
                would love to speak with you. <br />
                Fell free to send me an email <br />
                contact me through my social media <br />
                or simply complete the enquiry form
                </p>
                <p className={styles.mail}>{<AiOutlineMail className={styles.mail} />} matiasvaldez8184@gmail.com</p>
            </div>
            <div className={styles.inputs}>
                <h2>Send me a message</h2>
                <form ref={form} onSubmit={sendEmail} className={styles.inputs}>
                <input placeholder="Name" name="name" type="text" required className={styles.input} />
                <input placeholder="Email" name="email" required className={styles.input} />
                <input placeholder="Subject" name="subject" required className={styles.input} />
                <textarea
                    placeholder="Your message"
                    className={styles.textarea}
                    name="message"
                    required
                />
                <button className={styles.btn} type="submit">Send message</button>
                {show &&
                <motion.p 
                initial={{opacity:0}} 
                animate={{opacity:1}}
                transition={{duration:0.6}}>
                    Your mail has been sent succesfully!
                </motion.p>}
                </form>
            </div>
            </div>
        </div>
        </div>
    );
};
