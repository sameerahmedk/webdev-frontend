import RegisterForm from '@/components/register/register-form'
import Head from 'next/head'
import React from 'react'

function register() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex items-center justify-center h-screen bg-container bg-no-repeat bg-cover bg-center bg-fixed">
        <RegisterForm />
      </div>
    </>
  )
}

export default register
