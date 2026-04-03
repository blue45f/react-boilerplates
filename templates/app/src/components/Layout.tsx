import {
  Box,
  Container,
  Flex,
  IconButton,
  Link as ChakraLink,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: '홈' },
  { to: '/posts', label: '게시글' },
  { to: '/about', label: '소개' },
];

function Layout() {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const headerBg = useColorModeValue('blue.500', 'blue.700');
  const footerBg = useColorModeValue('gray.100', 'gray.800');
  const footerColor = useColorModeValue('gray.600', 'gray.400');

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
          Object.assign(e.currentTarget.style, {
            position: 'fixed', left: '8px', top: '8px',
            width: 'auto', height: 'auto', zIndex: '9999',
            background: '#3182ce', color: 'white',
            padding: '8px 16px', borderRadius: '4px',
          });
        }}
        onBlur={(e) => {
          Object.assign(e.currentTarget.style, {
            position: 'absolute', left: '-9999px',
          });
        }}
      >
        본문으로 건너뛰기
      </a>

      <Box as="header" bg={headerBg} color="white" py={4}>
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
            <Flex align="center" gap={6}>
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
              <IconButton
                aria-label={colorMode === 'light' ? '다크모드 전환' : '라이트모드 전환'}
                onClick={toggleColorMode}
                variant="ghost"
                color="white"
                size="sm"
                _hover={{ bg: 'whiteAlpha.300' }}
              >
                {colorMode === 'light' ? '🌙' : '☀️'}
              </IconButton>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box as="main" id="main-content" flex={1} py={8}>
        <Container maxW="container.xl">
          <Outlet />
        </Container>
      </Box>

      <Box as="footer" bg={footerBg} py={4}>
        <Container maxW="container.xl" textAlign="center">
          <Box as="p" color={footerColor}>
            &copy; {new Date().getFullYear()} React App. All rights reserved.
          </Box>
        </Container>
      </Box>
    </Flex>
  );
}

export default Layout;
