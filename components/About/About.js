import React from "react";
import styles from "./About.module.css";
import avatar from "../../public/assets/Music-pana.png";
import Image from "next/image";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <>
      <div className={styles.pos}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={styles.bg}
        >
          <motion.div whileHover={{ scale: 1.1 }} className={styles.img}>
            <Image src={avatar} alt={"avatar"} height={500} width={300} />
          </motion.div>
          <div className={styles.text}>
            <h1 className={styles.h1}>About me</h1>
            <p className={styles.p}>
              Lately, I&apos;ve been focusing <br /> on enhancing my skills <br /> to
              become a better developer. <br /> As a part of this effort, <br />{" "}
              I&apos;ve recently embarked on a journey <br /> to explore various
              career paths <br /> that align with my goal. <br /> I am delving
              into subjects like <br /> design patterns, clean code, <br />
              testing, and more. <br /> If you&apos;re interested in <br /> following
              my progress, <br />
              you can do so by connecting <br /> with me on GitHub or <br />{" "}
              LinkedIn, where I&apos;ll be sharing <br />
              updates about my journey.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};
