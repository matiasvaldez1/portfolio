import '../styles/globals.css'
import SmoothScroll from '../components/Layout/SmoothScroll'
import { I18nProvider } from '../context/i18n'

function MyApp({ Component, pageProps }) {
  return (
    <I18nProvider>
      <SmoothScroll>
        <Component {...pageProps} />
      </SmoothScroll>
    </I18nProvider>
  )
}

export default MyApp
