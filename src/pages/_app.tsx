import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import NextNProgress from "nextjs-progressbar";

import "../../styles/global.sass"
import '../../styles/tailwind.css';
import 'react-image-crop/src/ReactCrop.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <NextNProgress color="#008fff" />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
