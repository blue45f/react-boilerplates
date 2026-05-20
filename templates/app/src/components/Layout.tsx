import {
  Box,
  Container,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Link as ChakraLink,
  Portal,
  Stack,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { ColorModeButton } from '@/components/ui/color-mode';

const navLinks = [
  { to: '/', label: '홈' },
  { to: '/posts', label: '게시글' },
  { to: '/contact', label: '문의' },
  { to: '/settings', label: '설정' },
  { to: '/about', label: '소개' },
];

function NavLink({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  const location = useLocation();
  const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
  return (
    <ChakraLink
      asChild
      aria-current={isActive ? 'page' : undefined}
      color={isActive ? 'brand.fg' : 'fg'}
      fontWeight={isActive ? 'semibold' : 'medium'}
      px="2"
      py="1"
      borderRadius="md"
      _hover={{ bg: 'bg.muted', textDecoration: 'none' }}
      _focusVisible={{
        outline: '2px solid',
        outlineColor: 'brand.focusRing',
        outlineOffset: '2px',
      }}
      position="relative"
      _after={
        isActive
          ? {
              content: '""',
              position: 'absolute',
              left: '50%',
              bottom: '-4px',
              transform: 'translateX(-50%)',
              w: '60%',
              h: '2px',
              bg: 'brand.solid',
              borderRadius: 'full',
            }
          : undefined
      }
    >
      <Link to={to} onClick={onClick}>
        {label}
      </Link>
    </ChakraLink>
  );
}

function SkipLink() {
  return (
    <ChakraLink
      href="#main-content"
      position="absolute"
      left="-9999px"
      top="auto"
      width="1px"
      height="1px"
      overflow="hidden"
      bg="brand.solid"
      color="brand.contrast"
      px="3"
      py="2"
      borderRadius="md"
      zIndex="9999"
      _focus={{
        position: 'fixed',
        left: '8px',
        top: '8px',
        width: 'auto',
        height: 'auto',
        outline: 'none',
      }}
    >
      본문으로 건너뛰기
    </ChakraLink>
  );
}

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <Flex direction="column" minH="100vh" bg="bg" color="fg">
      <SkipLink />

      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="docked"
        bg="bg"
        borderBottomWidth="1px"
        borderColor="border"
        backdropFilter="saturate(180%) blur(8px)"
      >
        <Container maxW="6xl">
          <Flex h="16" justify="space-between" align="center">
            <ChakraLink asChild fontWeight="bold" fontSize="lg">
              <Link to="/" aria-label="홈으로 이동">
                <HStack gap="2">
                  <Box
                    boxSize="8"
                    borderRadius="md"
                    bg="brand.solid"
                    color="brand.contrast"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                    fontSize="sm"
                  >
                    R
                  </Box>
                  <Text>React App</Text>
                </HStack>
              </Link>
            </ChakraLink>

            <HStack
              as="nav"
              gap="2"
              aria-label="메인 네비게이션"
              display={{ base: 'none', md: 'flex' }}
            >
              {navLinks.map((link) => (
                <NavLink key={link.to} {...link} />
              ))}
            </HStack>

            <HStack gap="2">
              <ColorModeButton />
              <Drawer.Root
                open={mobileOpen}
                onOpenChange={(e) => setMobileOpen(e.open)}
                placement="end"
              >
                <Drawer.Trigger asChild>
                  <IconButton
                    aria-label="메뉴 열기"
                    variant="ghost"
                    size="sm"
                    display={{ base: 'inline-flex', md: 'none' }}
                  >
                    <Menu size={20} aria-hidden="true" />
                  </IconButton>
                </Drawer.Trigger>
                <Portal>
                  <Drawer.Backdrop />
                  <Drawer.Positioner>
                    <Drawer.Content>
                      <Drawer.Header borderBottomWidth="1px" borderColor="border">
                        <Drawer.Title>메뉴</Drawer.Title>
                        <Drawer.CloseTrigger asChild>
                          <IconButton aria-label="메뉴 닫기" variant="ghost" size="sm">
                            <X size={18} aria-hidden="true" />
                          </IconButton>
                        </Drawer.CloseTrigger>
                      </Drawer.Header>
                      <Drawer.Body>
                        <Stack as="nav" aria-label="모바일 네비게이션" gap="2" mt="2">
                          {navLinks.map((link) => (
                            <NavLink key={link.to} {...link} onClick={() => setMobileOpen(false)} />
                          ))}
                        </Stack>
                      </Drawer.Body>
                    </Drawer.Content>
                  </Drawer.Positioner>
                </Portal>
              </Drawer.Root>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Box as="main" id="main-content" flex={1} py="10">
        <Container maxW="6xl">
          <Outlet />
        </Container>
      </Box>

      <Box as="footer" bg="bg.subtle" borderTopWidth="1px" borderColor="border" py="6">
        <Container maxW="6xl">
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            justify="space-between"
            align="center"
            gap="2"
          >
            <Text color="fg.muted" fontSize="sm">
              &copy; {new Date().getFullYear()} React App. All rights reserved.
            </Text>
            <Text color="fg.subtle" fontSize="xs">
              Built with React 19, Vite, Chakra UI v3
            </Text>
          </Flex>
        </Container>
        <VisuallyHidden>페이지 끝</VisuallyHidden>
      </Box>
    </Flex>
  );
}

export default Layout;
