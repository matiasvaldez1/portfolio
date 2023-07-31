import React from "react";
import styles from "./Introduction.module.css";
import Image from "next/image";
import cat from "../../public/assets/cat.png";
import { motion } from "framer-motion";

export const Introduction = () => {
  return (
    <div id="about" className={styles.pos}>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 100 }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className={styles.bg}
      >
        <h1 className={`${styles.h1} ${styles.h1Size}`}>Who am I?</h1>
        <div>
          <h2>
            My name is Matias valdez, <br />
            a creative <a className={styles.h3}>Frontend developer</a> with <br />
            knowledge about backend. <br />
            Although my main focus as
            <br />
            developer is to provide to <br />
            the user the most <a className={styles.h1}>interactive</a> <br />
            and <a className={styles.h2}>simpler</a> experience.
          </h2>
        </div>
        <h2>
          My working tools: <br />
          React, Next JS, Typescrypt, <br />
          GraphQl, Apollo, Tailwind Css, <br />
          Styled Components, Node Js, <br />
          Postgresql and more.
        </h2>
      </motion.div>
      <motion.div 
        initial={{ x: 100 }}
        whileInView={{x: 0}}
        whileTap={{scale: 1.2}}
        className={styles.cat}>
        <Image src={cat} alt={"cat"} width={300} height={200} />
      </motion.div>
    </div>
  );
};
