import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Hero } from '../components/Hero/Hero'
import { About } from '../components/About/About'
import { scrapePersonalProjects, scrapeProfessionalProjects } from '../utils/projects'
import { Card } from '../components/Card projects/Card'
import styles from '../styles/Index.module.css'
import { Contact } from '../components/Contact/Contact'
import { Footer } from '../components/Footer/Footer'
import { useScroll } from '../components/Layout/SmoothScroll'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'

// Dynamic import for Three.js scene (no SSR)
const Scene = dynamic(() => import('../components/Scene/Scene'), {
  ssr: false,
  loading: () => null,
})

function SceneWrapper() {
  const { progress } = useScroll()
  return <Scene scrollProgress={progress} />
}

// Animated section wrapper
function AnimatedSection({ children, className, id }) {
  const sectionRef = useScrollReveal({ y: 50, duration: 0.7 })
  return (
    <section id={id} className={className} ref={sectionRef}>
      {children}
    </section>
  )
}

// Animated grid for project cards
function AnimatedGrid({ children, className }) {
  const gridRef = useStaggerReveal({
    childSelector: ':scope > *',
    y: 60,
    stagger: 0.15,
    duration: 0.7,
  })
  return (
    <div className={className} ref={gridRef}>
      {children}
    </div>
  )
}

export default function Home({ personalProjects, professionalProjects }) {
  return (
    <div>
      <Head>
        <title>Matias Valdez | Frontend Developer</title>
        <meta
          name="description"
          content="Frontend Developer based in Buenos Aires. Building high-performance web experiences with React, Next.js, and Shopify."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SceneWrapper />

      <main>
        <Hero />
        <About />

        <AnimatedSection id="projects" className={styles.container}>
          <h2 className={styles.title}>
            <span className={styles.gradientText}>Featured Work</span>
          </h2>
          <p className={styles.subtitle}>
            Projects I&apos;ve built to learn and explore new technologies
          </p>
          <AnimatedGrid className={styles.grid}>
            {personalProjects?.map((project, k) => (
              <Card
                key={k}
                image={project.image}
                title={project.title}
                github={project.github}
                deploy={project.deploy}
              />
            ))}
          </AnimatedGrid>
        </AnimatedSection>

        <AnimatedSection id="professional-projects" className={styles.container}>
          <h2 className={styles.title}>
            <span className={styles.gradientText}>Professional Work</span>
          </h2>
          <p className={styles.subtitle}>
            Client projects and professional websites I&apos;ve developed
          </p>
          <AnimatedGrid className={styles.grid}>
            {professionalProjects?.map((project, k) => (
              <Card
                key={k}
                image={project.image}
                title={project.title}
                github={project.github}
                deploy={project.deploy}
              />
            ))}
          </AnimatedGrid>
        </AnimatedSection>

        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  const personalProjects = await scrapePersonalProjects()
  const professionalProjects = await scrapeProfessionalProjects()

  return {
    props: {
      personalProjects,
      professionalProjects,
    },
  }
}
