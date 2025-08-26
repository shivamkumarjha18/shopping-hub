import { useEffect, useState } from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import AuthLayout from './components/auth/Layout'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import AdminLayout from './components/admin-view/Layout'
import AdminSidebar from './components/admin-view/Sidebar'
import AdminHeader from './components/admin-view/Header'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeatures from './pages/admin-view/features'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import ShoppingLayout from './components/shopping-view/Layout'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import './App.css'
import NotFound from './pages/not-found'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page'
import { useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { useDispatch } from 'react-redux'


  function App() {
//const isAuthenticated = false;
// const user= null

const { isAuthenticated, user ,isLoading} = useSelector((state) => state.auth);
const dispatch = useDispatch();
useEffect(() => {
  dispatch(checkAuth());
}, [dispatch]);
if(isLoading)return <div>Loading...</div>;
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
  <Route path='/auth' element={
    <CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /></CheckAuth>}>
    <Route path='login' element={<Login />} />
    <Route path='signup' element={<Signup />} />
  </Route>
<Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

  <Route path='/shopping' element={
    <CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout /></CheckAuth>}>
   <Route index element={<ShoppingHome />} />
   <Route path='listing' element={<ShoppingListing />} />
   <Route path='checkout' element={<ShoppingCheckout />} />
   <Route path='account' element={<ShoppingAccount />} />
  </Route>
  <Route path='*' element={<NotFound />} />
<Route path='/unauthorized' element={<UnauthPage />} />
</Routes>

    </div>
  )
}

export default App
