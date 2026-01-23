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
      bio1: "I'm a frontend developer passionate about building",
      bio1Bold: 'high-performance web experiences',
      bio1End: 'with React, Next.js, and TypeScript that are both beautiful and functional.',
      bio2: "With experience across startups and agencies, I've worked on everything from",
      bio2Bold: 'Shopify e-commerce',
      bio2End: "integrations and A/B testing to translating Figma designs into pixel-perfect, responsive code.",
      bio3: 'I focus on writing clean, maintainable code and delivering solutions that drive real business results.',
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
      bio1: 'Soy un desarrollador frontend apasionado por crear',
      bio1Bold: 'experiencias web de alto rendimiento',
      bio1End: 'con React, Next.js y TypeScript que son tanto atractivas como funcionales.',
      bio2: 'Con experiencia en startups y agencias, he trabajado en todo, desde integraciones de',
      bio2Bold: 'e-commerce con Shopify',
      bio2End: 'y pruebas A/B hasta traducir diseños de Figma en código responsivo y pixel-perfect.',
      bio3: 'Me enfoco en escribir código limpio y mantenible, entregando soluciones que generan resultados reales.',
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
    setMounted(true)

    // Check for saved preference first
    const saved = localStorage.getItem('locale')
    if (saved && (saved === 'en' || saved === 'es')) {
      setLocale(saved)
      return
    }

    // Detect system language preference
    const systemLang = navigator.language.split('-')[0]
    const supportedLocale = systemLang === 'es' ? 'es' : 'en'
    setLocale(supportedLocale)
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
