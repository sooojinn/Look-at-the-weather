import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLogin } = useAuthStore();

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
