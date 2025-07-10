import { Box, Container, Flex, Link as ChakraLink } from '@chakra-ui/react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: '홈' },
  { to: '/about', label: '소개' },
];

function Layout() {
  const location = useLocation();

  return (
    <Flex direction="column" minH="100vh">
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
        onFocus={(e) => {
          e.currentTarget.style.position = 'fixed';
          e.currentTarget.style.left = '8px';
          e.currentTarget.style.top = '8px';
          e.currentTarget.style.width = 'auto';
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.zIndex = '9999';
          e.currentTarget.style.background = '#3182ce';
          e.currentTarget.style.color = 'white';
          e.currentTarget.style.padding = '8px 16px';
          e.currentTarget.style.borderRadius = '4px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.position = 'absolute';
          e.currentTarget.style.left = '-9999px';
        }}
      >
        본문으로 건너뛰기
      </a>

      <Box as="header" bg="blue.500" color="white" py={4}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <ChakraLink
              as={Link}
              to="/"
              fontSize="xl"
              fontWeight="bold"
              aria-label="홈으로 이동"
            >
              React App
            </ChakraLink>
            <Flex as="nav" gap={6} aria-label="메인 네비게이션">
              {navLinks.map(({ to, label }) => (
                <ChakraLink
                  key={to}
                  as={Link}
                  to={to}
                  aria-current={location.pathname === to ? 'page' : undefined}
                  fontWeight={location.pathname === to ? 'bold' : 'normal'}
                  textDecoration={location.pathname === to ? 'underline' : 'none'}
                >
                  {label}
                </ChakraLink>
              ))}
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box as="main" id="main-content" flex={1} py={8}>
        <Container maxW="container.xl">
          <Outlet />
        </Container>
      </Box>

      <Box as="footer" bg="gray.100" py={4}>
        <Container maxW="container.xl" textAlign="center">
          <Box as="p" color="gray.600">
            &copy; {new Date().getFullYear()} React App. All rights reserved.
          </Box>
        </Container>
      </Box>
    </Flex>
  );
}

export default Layout;
