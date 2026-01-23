import { createContext, useContext, useState, useEffect } from 'react'

const translations = {
  en: {
    // NavBar & Footer
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
    },
    // Hero
    hero: {
      greeting: "Hello, I'm",
      title: 'Frontend Developer',
      location: 'Based in Buenos Aires',
      exploreWork: 'Explore my work',
      downloadCV: 'Download CV',
      scroll: 'Scroll',
    },
    // About
    about: {
      label: 'About',
      title: 'Building digital experiences',
      titleHighlight: 'that make a difference',
      bio1: "I'm a frontend developer with over 4 years of experience crafting",
      bio1Bold: 'high-performance web applications',
      bio1End: 'with React, Next.js, and TypeScript.',
      bio2: "I've worked across startups and agencies, from building custom",
      bio2Bold: 'Shopify apps and e-commerce solutions',
      bio2End: 'to developing full-stack features with Node.js, API integrations, and A/B testing strategies that drive real results.',
      bio3: 'I focus on writing clean, scalable code and delivering solutions that combine great user experience with measurable business impact.',
      experience: 'Experience',
      technologies: 'Technologies',
    },
    // Projects
    projects: {
      featuredWork: 'Featured Work',
      featuredSubtitle: "Projects I've built to learn and explore new technologies",
      professionalWork: 'Professional Work',
      professionalSubtitle: "Client projects and professional websites I've developed",
      viewProject: 'View Project',
    },
    // Contact
    contact: {
      label: 'Contact',
      title: "Let's build something",
      titleHighlight: 'together',
      description: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
      copy: 'Copy',
      copied: 'Copied!',
    },
    // Footer
    footer: {
      copyright: 'All rights reserved.',
    },
    // Card
    card: {
      github: 'Github',
      deploy: 'Deploy',
    },
  },
  es: {
    // NavBar & Footer
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    // Hero
    hero: {
      greeting: 'Hola, soy',
      title: 'Desarrollador Frontend',
      location: 'Buenos Aires, Argentina',
      exploreWork: 'Ver mi trabajo',
      downloadCV: 'Descargar CV',
      scroll: 'Desplazar',
    },
    // About
    about: {
      label: 'Sobre mí',
      title: 'Construyendo experiencias digitales',
      titleHighlight: 'que marcan la diferencia',
      bio1: 'Soy un desarrollador frontend con más de 4 años de experiencia creando',
      bio1Bold: 'aplicaciones web de alto rendimiento',
      bio1End: 'con React, Next.js y TypeScript.',
      bio2: 'He trabajado en startups y agencias, desde desarrollar',
      bio2Bold: 'apps Shopify y soluciones e-commerce',
      bio2End: 'hasta construir features full-stack con Node.js, integraciones de APIs y estrategias de A/B testing que generan resultados reales.',
      bio3: 'Me enfoco en escribir código limpio y escalable, entregando soluciones que combinan gran experiencia de usuario con impacto medible en el negocio.',
      experience: 'Experiencia',
      technologies: 'Tecnologías',
    },
    // Projects
    projects: {
      featuredWork: 'Proyectos Destacados',
      featuredSubtitle: 'Proyectos que he construido para aprender y explorar nuevas tecnologías',
      professionalWork: 'Trabajo Profesional',
      professionalSubtitle: 'Proyectos de clientes y sitios web profesionales que he desarrollado',
      viewProject: 'Ver Proyecto',
    },
    // Contact
    contact: {
      label: 'Contacto',
      title: 'Construyamos algo',
      titleHighlight: 'juntos',
      description: 'Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tu visión.',
      copy: 'Copiar',
      copied: '¡Copiado!',
    },
    // Footer
    footer: {
      copyright: 'Todos los derechos reservados.',
    },
    // Card
    card: {
      github: 'Github',
      deploy: 'Deploy',
    },
  },
}

// Default context value for SSR
const defaultValue = {
  locale: 'en',
  setLocale: () => {},
  t: translations.en,
}

const I18nContext = createContext(defaultValue)

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('locale')
    if (saved && (saved === 'en' || saved === 'es')) {
      setLocale(saved)
    } else {
      const systemLang = navigator.language.split('-')[0]
      setLocale(systemLang === 'es' ? 'es' : 'en')
    }
    setMounted(true)
  }, [])

  const changeLocale = (newLocale) => {
    setLocale(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale)
    }
  }

  const t = translations[locale]

  return (
    <I18nContext.Provider value={{ locale, setLocale: changeLocale, t, mounted }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
