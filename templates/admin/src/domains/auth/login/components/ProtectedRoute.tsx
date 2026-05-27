import { Navigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '../model/useAuthStore';

import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
