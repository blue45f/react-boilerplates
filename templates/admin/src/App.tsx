import { Routes, Route } from 'react-router-dom';

import AdminLayout from '@/components/AdminLayout';
import Dashboard from '@/pages/Dashboard';
import Settings from '@/pages/Settings';
import Users from '@/pages/Users';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
