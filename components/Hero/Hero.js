import React from "react";
import { NavBar } from "../NavBar/NavBar";
import styles from "./Hero.module.css";
import cv from "../../public/assets/MatiasCv.pdf";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <>
      <NavBar />
      <div className={styles.pos}>
        <motion.div
          initial={{ x: 1000 }}
          animate={{x: 0}}
          transition={{duration: 1}}
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          className={styles.container}
        >
          <div>
            <h1 className={styles.h1Wrapp}>
              <a className={styles.h1}>Frontend Developer</a> <br />
              Matias Valdez <br />
              Based in Buenos Aires
            </h1>
          </div>
          <div className={styles.containerBtn}>
            <button className={styles.btnSeeMore}>
              <a href="#about">See more</a>
            </button>
            <button className={styles.btnCv}>
              <a href={process.env.NEXT_PUBLIC_LINK_CV} target="_blank" rel="noopener noreferrer">
                Download CV
              </a>
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};
