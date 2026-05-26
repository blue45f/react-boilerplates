import { Navigate, useLocation } from 'react-router-dom';

import type { ReactNode } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';

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
