import { Spinner, Center } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';
import Layout from '@/components/Layout';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function PageLoader() {
  return (
    <Center py={12}>
      <Spinner size="lg" />
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
