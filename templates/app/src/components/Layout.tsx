import { Box, Container, Flex, Link as ChakraLink } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <Flex direction="column" minH="100vh">
      <Box as="header" bg="blue.500" color="white" py={4}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <ChakraLink as={Link} to="/" fontSize="xl" fontWeight="bold">
              React App
            </ChakraLink>
            <Flex gap={6}>
              <ChakraLink as={Link} to="/">
                홈
              </ChakraLink>
              <ChakraLink as={Link} to="/about">
                소개
              </ChakraLink>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box as="main" flex={1} py={8}>
        <Container maxW="container.xl">
          <Outlet />
        </Container>
      </Box>

      <Box as="footer" bg="gray.100" py={4}>
        <Container maxW="container.xl" textAlign="center">
          <Box color="gray.600">© 2024 React App. All rights reserved.</Box>
        </Container>
      </Box>
    </Flex>
  );
}

export default Layout;
