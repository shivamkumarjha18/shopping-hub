import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './components/auth/Layout';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import AdminLayout from './components/admin-view/Layout';
import AdminSidebar from './components/admin-view/Sidebar';
import AdminHeader from './components/admin-view/Header';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminFeatures from './pages/admin-view/features';
import AdminOrders from './pages/admin-view/orders';
import AdminProducts from './pages/admin-view/products';
import ShoppingLayout from './components/shopping-view/Layout';
import ShoppingCheckout from './pages/shopping-view/checkout';
import ShoppingAccount from './pages/shopping-view/account';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingListing from './pages/shopping-view/listing';
import './App.css';
import NotFound from './pages/not-found';
import CheckAuth from './components/common/check-auth';
import UnauthPage from './pages/unauth-page';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from './store/auth-slice';
import PaypalReturnPage from './pages/shopping-view/paypal-return';
import PaymentSuccessPage from './pages/shopping-view/payment-success';
function App() {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false); // Track if auth check is complete

  useEffect(() => {
    console.log('Dispatching checkAuth...');
    dispatch(checkAuth())
      .then((result) => {
        console.log('checkAuth result:', result.payload); // Log payload directly
        setAuthChecked(true); // Mark auth check as complete
      })
      .catch((error) => {
        console.error('checkAuth error:', error);
        setAuthChecked(true); // Still mark as complete to avoid infinite loading
      });
  }, [dispatch]);

  // Wait for both isLoading (from Redux) and authChecked (from useEffect) to render
  if (isLoading || !authChecked) {
    console.log('App is waiting for auth check...', { isLoading, authChecked });
    return <div>Loading...</div>;
  }

  console.log('App rendering with:', { isAuthenticated, user });

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route
          path='/auth'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
        <Route
          path='/admin'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='features' element={<AdminFeatures />} />
        </Route>
        <Route
          path='/shopping'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} isLoading={isLoading}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path='home' element={<ShoppingHome />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='account' element={<ShoppingAccount />} />
             <Route path="paypal-return" element={<PaypalReturnPage />} />
             <Route path="payment-success" element={<PaymentSuccessPage />} />
        </Route>
        <Route path='/unauthorized' element={<UnauthPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;