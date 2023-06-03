import React from 'react'
import Link from 'next/link'
import { FaShoppingBag, FaFileAlt } from 'react-icons/fa'

const NavigationDrawer = () => {
  return (
    <nav className="bg-blue-500 fixed top-25 left-0 h-screen w-56 p-4">
      <ul className="space-y-2">
        <li>
          <Link href="/listing" passHref>
            <span className="btn btn-products">
              <FaShoppingBag className="btn-icon" />
              Manage Products
            </span>
          </Link>
        </li>
        <li>
          <Link href="/orders" passHref>
            <span className="btn btn-orders">
              <FaFileAlt className="btn-icon" />
              Manage Orders
            </span>
          </Link>
        </li>
        {/* Add more links for other backend functionalities */}
      </ul>
    </nav>
  )
}

export default NavigationDrawer
