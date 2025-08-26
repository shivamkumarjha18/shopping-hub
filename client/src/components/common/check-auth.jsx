import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log("Path:", location.pathname, "Auth:", isAuthenticated, "User:", user);

  const isAuthPage =
    location.pathname.includes("/auth/login") ||
    location.pathname.includes("/auth/signup");

  // 1️⃣ Root path ("/") → redirect according to login state
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" replace />;
    }
    if (user?.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/shopping" replace />;
  }

  // 2️⃣ Agar login nahi hai aur non-auth page access kar raha hai
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/auth/login" replace />;
  }

  // 3️⃣ Agar login hai aur login/signup pe gaya
  if (isAuthenticated && isAuthPage) {
    if (user?.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/shopping" replace />;
  }

  // 4️⃣ Prevent normal user from accessing admin
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 5️⃣ Prevent admin from accessing shopping
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.startsWith("/shopping")
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 6️⃣ Otherwise → allow
  return <>{children}</>;
}

export default CheckAuth;
