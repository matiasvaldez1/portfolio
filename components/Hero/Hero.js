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
          initial={{ x: 800 }}
          animate={{x: 100}}
          transition={{duration: 1}}
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          className={styles.container}
        >
          <div>
            <h1>
              <a className={styles.h1}>Frontend Developer</a> <br />
              Matias Valdez <br />
              Based on Buenos Aires
            </h1>
          </div>
          <div className={styles.containerBtn}>
            <button className={styles.btnSeeMore}>
              <a href="#about">See more</a>
            </button>
            <button className={styles.btnCv}>
              <a href={cv} download={"Matias_Valdez_CV"}>
                Download CV
              </a>
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};
