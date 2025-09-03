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
            My name is Matias Ezequiel Valdez, <br />
            a <a className={styles.h3}>Frontend Web Developer</a> <br />
            based in Buenos Aires, Argentina. <br />
            With <a className={styles.h1}>strong problem-solving skills</a>, <br />
            I bring a wealth of experience in <br />
            building, developing, and managing <br />
            <a className={styles.h2}>various platforms and websites</a>.
          </h2>
        </div>
        <h2>
          My tech stack: <br />
          TypeScript, React, Next.js, <br />
          Remix, Shopify, GraphQL, <br />
          Node.js, PostgreSQL, <br />
          Tailwind CSS, Docker and more.
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
