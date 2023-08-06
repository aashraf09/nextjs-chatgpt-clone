import '@/styles/globals.css'
import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0/client'

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
