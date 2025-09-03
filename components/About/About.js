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
          <div className={styles.img}>
            <Image src={avatar} alt={"avatar"} height={500} width={300} />
          </div>
          <div className={styles.text}>
            <h1 className={styles.h1}>About me</h1>
            <p className={styles.p}>
              I am a frontend web developer <br /> based in Buenos Aires, Argentina. <br />
              With strong problem-solving skills, <br /> I bring a wealth of experience <br />
              in building, developing, and managing <br /> various platforms and websites. <br /><br />
              
              Throughout my professional journey, <br /> I&apos;ve worked with companies like <br />
              Gohub, GMO Solutions, FJ Solutions, <br /> and Conversion Flow, where I&apos;ve <br />
              developed Shopify integrations, <br /> optimized payment systems, and <br />
              led A/B testing experiments. <br /><br />
              
              I&apos;m passionate about creating <br /> seamless user experiences <br />
              and building scalable web solutions <br /> that drive business growth.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};
