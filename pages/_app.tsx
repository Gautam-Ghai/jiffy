import type { AppProps } from 'next/app'

import "../styles/global.sass"
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
