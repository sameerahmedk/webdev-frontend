import Link from 'next/link'
import React from 'react'
import { HiOutlineClipboardCheck, HiOutlineShoppingCart } from 'react-icons/hi'
import Cookies from 'js-cookie'
import { FiLogOut } from 'react-icons/fi'
import { useRouter } from 'next/router'
const Header = () => {
  const router = useRouter()
  const handleLogout = () => {
    // Clear cookies here
    Cookies.remove('AccessToken')
    Cookies.remove('RefreshToken')
    Cookies.remove('Role')
    // Redirect to index page
    router.push('/')
  }

  return (
    <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold px-4 flex-grow">Supplier Portal</h1>
        <div className="flex justify-center items-center flex-grow">
          <Link href={`/supplierPortal/supplierTable`} passHref>
            <button className="mr-2 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded ">
              <HiOutlineShoppingCart className="inline-block mr-2 text-xl" />
              Manage Products
            </button>
          </Link>
          <Link href={`/supplierPortal/orders`} passHref>
            <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded ">
              <HiOutlineClipboardCheck className="inline-block mr-2 text-xl" />
              Manage Orders
            </button>
          </Link>

          <button
            className="ml-2 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}>
            <FiLogOut className="inline-block mr-2 text-xl" />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
