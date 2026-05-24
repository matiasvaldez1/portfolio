import Head from 'next/head'
import dynamic from 'next/dynamic'
import { config } from '../utils/config'
import { Hero } from '../components/Hero/Hero'
import { About } from '../components/About/About'
import { scrapePersonalProjects, scrapeProfessionalProjects } from '../utils/projects'
import { Card } from '../components/Card projects/Card'
import styles from '../styles/Index.module.css'
import { Contact } from '../components/Contact/Contact'
import { Footer } from '../components/Footer/Footer'
import { useScroll } from '../components/Layout/SmoothScroll'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'
import { useI18n } from '../context/i18n'

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
  const { t } = useI18n()

  return (
    <div>
      <Head>
        <title>Matias Valdez | Frontend Developer</title>
        <meta
          name="description"
          content="Frontend Developer based in Buenos Aires. Building high-performance web experiences with React, Next.js, and Shopify."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://matias-valdez-portfolio.vercel.app/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matias-valdez-portfolio.vercel.app/" />
        <meta property="og:title" content="Matias Valdez | Frontend Developer" />
        <meta property="og:description" content="Frontend Developer based in Buenos Aires. Building high-performance web experiences with React, Next.js, and Shopify." />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Matias Valdez | Frontend Developer" />
        <meta name="twitter:description" content="Frontend Developer based in Buenos Aires. Building high-performance web experiences with React, Next.js, and Shopify." />

        {/* JSON-LD Person schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: config.name,
              url: 'https://matias-valdez-portfolio.vercel.app',
              jobTitle: 'Frontend Developer',
              description: 'Frontend Developer based in Buenos Aires. Building high-performance web experiences with React, Next.js, and Shopify.',
              sameAs: [
                config.social.github,
                config.social.linkedin,
              ],
            }),
          }}
        />
      </Head>

      <SceneWrapper />

      <main>
        <Hero />
        <About />

        <AnimatedSection id="projects" className={styles.container}>
          <h2 className={styles.title}>
            <span className={styles.gradientText}>{t.projects.featuredWork}</span>
          </h2>
          <p className={styles.subtitle}>
            {t.projects.featuredSubtitle}
          </p>
          <AnimatedGrid className={styles.grid}>
            {personalProjects?.map((project, k) => (
              <Card
                key={k}
                image={project.image}
                title={project.title}
                github={project.github}
                deploy={project.deploy}
                description={project.description}
                tech={project.tech}
              />
            ))}
          </AnimatedGrid>
        </AnimatedSection>

        <AnimatedSection id="professional-projects" className={styles.container}>
          <h2 className={styles.title}>
            <span className={styles.gradientText}>{t.projects.professionalWork}</span>
          </h2>
          <p className={styles.subtitle}>
            {t.projects.professionalSubtitle}
          </p>
          <AnimatedGrid className={styles.grid}>
            {professionalProjects?.map((project, k) => (
              <Card
                key={k}
                image={project.image}
                title={project.title}
                github={project.github}
                deploy={project.deploy}
                description={project.description}
                tech={project.tech}
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
