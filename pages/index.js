import Head from "next/head";
import { Introduction } from "../components/Introduction/Introduction";
import { Hero } from "../components/Hero/Hero";
import { About } from "../components/About/About";
import { scrapePersonalProjects, scrapeProfessionalProjects } from "../utils/projects";
import { Card } from "../components/Card projects/Card";
import styles from "../styles/Index.module.css";
import { Contact } from "../components/Contact/Contact";
import { Footer } from "../components/Footer/Footer";

export default function Home({ personalProjects, professionalProjects }) {
  return (
    <div>
      <Head>
        <title>Matias Valdez</title>
        <meta name="description" content="Personal porfolio Matias Valdez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
          <Introduction />
          <About />
      <div id="projects" className={styles.container}>
        <h1 className={styles.title}>Personal Projects</h1>
        <p className={styles.subtitle}>Projects I&apos;ve built to learn and explore new technologies</p>
        <div className={styles.grid}>
          {personalProjects?.map((project, k) => {
            return (
              <Card
                key={k}
                image={project.image}
                title={project.title}
                github={project.github}
                deploy={project.deploy}
              />
            );
          })}
        </div>
      </div>
      
      <div id="professional-projects" className={styles.container}>
        <h1 className={styles.title}>Professional Work</h1>
        <p className={styles.subtitle}>Client projects and professional websites I&apos;ve developed</p>
        <div className={styles.grid}>
          {professionalProjects?.map((project, k) => {
            return (
              <Card
                key={k}
                image={project.image}
                title={project.title}
                github={project.github}
                deploy={project.deploy}
              />
            );
          })}
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const personalProjects = await scrapePersonalProjects();
  const professionalProjects = await scrapeProfessionalProjects();
  
  return {
    props: {
      personalProjects,
      professionalProjects,
    },
  };
};
