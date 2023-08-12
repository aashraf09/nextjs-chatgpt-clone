import '@/styles/globals.css'
import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({ Component, pageProps }) {
  return (

    <UserProvider>
      <Head>
      <title>AASHRAF - Login or Signup</title>
      <link rel="icon" href='/logo.ico' type="image/png" sizes="32x32" />
    </Head>
      <Component {...pageProps} />
    </UserProvider>
  )
}
