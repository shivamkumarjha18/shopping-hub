import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ isAuthenticated, user, children, isLoading }) {
  const location = useLocation();

  // 🛑 Jab tak loading hai, kuch nahi dikhana
  if (isLoading) {
    console.log(`CheckAuth: Loading state for path ${location.pathname}`);
    return <div>Loading...</div>;
  }

  // Debugging log
  console.log(
    `CheckAuth: Path: ${location.pathname}, Auth: ${isAuthenticated}, User: ${
      user ? JSON.stringify(user) : 'null'
    }`
  );

  // Define auth pages
  const isAuthPage =
    location.pathname === '/auth/login' || location.pathname === '/auth/signup';

  // 1. Root path handling
  if (location.pathname === '/') {
    console.log('CheckAuth: Root path accessed');
    if (!isAuthenticated) {
      console.log('CheckAuth: Not authenticated, redirecting to /auth/login');
      return <Navigate to='/auth/login' replace />;
    }
    if (user?.role === 'admin') {
      console.log('CheckAuth: Admin user, redirecting to /admin');
      return <Navigate to='/admin' replace />;
    }
    console.log('CheckAuth: Non-admin user, redirecting to /shopping/home');
    return <Navigate to='/shopping/home' replace />;
  }

  // 2. Unauthorized access for non-authenticated users
  if (!isAuthenticated && !isAuthPage) {
    console.log(`CheckAuth: Not authenticated for ${location.pathname}, redirecting to /auth/login`);
    return <Navigate to='/auth/login' replace />;
  }

  // 3. Redirect authenticated users from auth pages
  if (isAuthenticated && isAuthPage) {
    if (user?.role === 'admin') {
      console.log('CheckAuth: Authenticated admin on auth page, redirecting to /admin');
      return <Navigate to='/admin' replace />;
    }
    console.log('CheckAuth: Authenticated non-admin on auth page, redirecting to /shopping');
    return <Navigate to='/shopping' replace />;
  }

  // 4. Role-based restrictions
  if (isAuthenticated && user?.role === 'admin' && location.pathname.startsWith('/shopping')) {
    console.log('CheckAuth: Admin tried to access shopping route, redirecting to /unauthorized');
    return <Navigate to='/unauthorized' replace />;
  }

  if (isAuthenticated && user?.role !== 'admin' && location.pathname.startsWith('/admin')) {
    console.log('CheckAuth: Non-admin tried to access admin route, redirecting to /unauthorized');
    return <Navigate to='/unauthorized' replace />;
  }

  // 5. Allow access
  console.log(`CheckAuth: Allowing access to ${location.pathname}`);
  return <>{children}</>;
}

export default CheckAuth;