import '../styles/globals.css'
import SmoothScroll from '../components/Layout/SmoothScroll'

function MyApp({ Component, pageProps }) {
  return (
    <SmoothScroll>
      <Component {...pageProps} />
    </SmoothScroll>
  )
}

export default MyApp
