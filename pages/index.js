import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'
import { getSession } from '@auth0/nextjs-auth0'


const index = () => {
  const { isLoading, error, user } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <>
      <Head>
        <title>IntellectoBot - Login or Signup</title>
      </Head>
      <div className="container">
        <div className='min-h-screen w-screen text-center flex justify-center items-center'>
          {
            user &&
            <button className='btn'>
              <Link href={'/api/auth/logout'}>Logout</Link>
            </button>
          }
          {
            !user &&
            <div>
              <button className='btn'>
                <Link href={'/api/auth/login'}>Login</Link>
              </button>
              <button className='btn'>
                <Link href={'/api/auth/signup'}>Sign Up</Link>
              </button>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default index

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx.req, ctx.res)
  if (session) {
    return {
      redirect: {
        destination: '/chat'
      }
    }
  }
  return {
    props: {}
  }
}