import React from 'react'
import Header from '@/components/supplierPortal/Header'
import NavigationDrawer from '@/components/supplierPortal/NavigationDrawer'
import ClippedDrawer from '@/components/supplierPortal/reactdrawer'

const home = () => {
  return (
    <div>
      {/* <Header /> */}
      <div className="relative">
        {/* <NavigationDrawer />
         */}
        <ClippedDrawer>
          <div>
            <div className="ml-56 p-8">
              <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
              <p className="text-gray-700">
                Welcome to your B2B marketplace backend portal.
              </p>
            </div>
          </div>
        </ClippedDrawer>
      </div>
    </div>
  )
}

export default home
