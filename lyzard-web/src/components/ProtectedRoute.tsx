import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('supabase_jwt');

  if (!token) {
    // Redirect to login if unauthenticated
    return <Navigate to="/login" replace />;
  }

  // Render child routes
  return <Outlet />;
}
