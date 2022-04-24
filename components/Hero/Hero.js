import React from "react";
import { NavBar } from "../NavBar/NavBar";
import styles from "./Hero.module.css";
import cv from "../../public/assets/MatiasCv.pdf";

export const Hero = () => {
  return (
    <>
      <NavBar />
      <div className={styles.pos}>
        <div className={styles.container}>
          <div>
            <h1>
              <a className={styles.h1}>Frontend Developer</a> <br />
              Matias Valdez <br />
              Based on Buenos Aires
            </h1>
          </div>
          <div className={styles.containerBtn}>
            <button className={styles.btnSeeMore}>See more</button>
            <button className={styles.btnCv}>
              <a href={cv} download={"Matias_Valdez_CV"}>
                Download CV
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
