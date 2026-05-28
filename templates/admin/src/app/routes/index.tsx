import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminLayout from '@/app/shell';
import ProtectedRoute from '@/domains/auth/login/components/ProtectedRoute';
import ErrorBoundary from '@/shared/ui/ErrorBoundary';

const Dashboard = lazy(() => import('@/domains/dashboard/overview'));
const Users = lazy(() => import('@/domains/users/list'));
const Analytics = lazy(() => import('@/domains/analytics/overview'));
const Settings = lazy(() => import('@/domains/settings/preferences'));
const Login = lazy(() => import('@/domains/auth/login'));
const NotFound = lazy(() => import('@/domains/system/not-found'));

function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
      <Spin size="large" />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
