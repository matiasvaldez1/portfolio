import Head from "next/head";
import { Introduction } from "../components/Introduction/Introduction";
import { Hero } from "../components/Hero/Hero";
import { About } from "../components/About/About";
import { projects, scrapeGoogleSheet } from "../utils/projects";
import { Card } from "../components/Card projects/Card";
import styles from "../styles/Index.module.css";
import { Contact } from "../components/Contact/Contact";
import { Footer } from "../components/Footer/Footer";

export default function Home({ projectsProps }) {
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
        <h1 className={styles.title}>My recent work</h1>
        <div className={styles.grid}>
          {projectsProps?.map((project, k) => {
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
  const projects = await scrapeGoogleSheet(
    process.env.NEXT_PUBLIC_LINK_DRIVE
  );
  return {
    props: {
      projectsProps: projects,
    },
  };
};
