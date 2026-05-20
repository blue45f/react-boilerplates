import { Center, Spinner } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';
import Layout from '@/components/Layout';
import { Toaster } from '@/components/ui/toaster';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Posts = lazy(() => import('@/pages/Posts'));
const Contact = lazy(() => import('@/pages/Contact'));
const Settings = lazy(() => import('@/pages/Settings'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function PageLoader() {
  return (
    <Center py={12} aria-label="페이지 로딩 중">
      <Spinner size="lg" color="brand.solid" />
    </Center>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="posts" element={<Posts />} />
            <Route path="contact" element={<Contact />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </ErrorBoundary>
  );
}

export default App;
