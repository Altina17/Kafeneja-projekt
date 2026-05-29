import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly, roles }) => {
  const { user, checking } = useAuth();

  if (checking) return (
    <div className="flex items-center justify-center h-screen text-xl text-gray-500">
      Duke u ngarkuar...
    </div>
  );

  if (!user) return <Navigate to="/" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;