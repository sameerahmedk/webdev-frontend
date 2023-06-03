// import React from 'react'
// // import ProductListing from '../components/ProductListing';
// import ProductListing from '../../components/supplierPortal/ProductListing'
// import ClippedDrawer from '@/components/supplierPortal/reactdrawer'
// import Layout from '@/components/supplierPortal/Layout'
// import Box from '@mui/material/Box'
// const ListingPage = () => {
//   return (
//     <div>
//       <ClippedDrawer>
//         <div>
//           <ProductListing />
//         </div>
//       </ClippedDrawer>
//     </div>
//   )
// }

// export default ListingPage

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import ClippedDrawer from './ClippedDrawer';
// import Page from './Page'
import ClippedDrawer from '@/components/supplierPortal/reactdrawer'
import ProductListing from '../../components/supplierPortal/ProductListing'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/components/supplierPortal/reactdrawer"
          component={ClippedDrawer}
        />
        <Route
          path="../../components/supplierPortal/ProductListing"
          component={ProductListing}
        />
      </Switch>
    </Router>
  )
}
