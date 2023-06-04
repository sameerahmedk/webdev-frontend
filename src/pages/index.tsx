import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

// import LoginForm from '@/components/login/login-form';

import LoginForm from '@/components/login/login-form'
import Head from 'next/head'

const IndexPage = () => {
  // const router = useRouter()
  // const userRole = Cookies.get('Role')

  // useEffect(() => {
  //   if (userRole === 'supplier') {
  //     router.push('supplierPortal/supplierTable')
  //   } else if (userRole === 'retailer') {
  //     router.push('/home')
  //   }
  // }, [userRole, router])

  return (
    <div>
      <main>
        <Head>
          <title>Login</title>
        </Head>
        <div className="flex items-center justify-center h-screen bg-container bg-no-repeat bg-cover bg-center bg-fixed">
          <LoginForm />
        </div>
      </main>
    </div>
  )
}

export default IndexPage
