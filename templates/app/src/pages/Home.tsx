import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  ArrowRight,
  Bell,
  Database,
  Globe,
  Layout as LayoutIcon,
  Moon,
  Palette,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Zap,
    title: '빠른 개발',
    description: 'Vite 기반 HMR과 React 19, TypeScript Strict 모드로 즉시 시작합니다.',
  },
  {
    icon: Palette,
    title: '디자인 시스템',
    description: 'Chakra UI v3 시맨틱 토큰과 다크모드를 갖춘 디자인 시스템.',
  },
  {
    icon: Database,
    title: '데이터 페칭',
    description: 'TanStack Query + ky로 캐싱, 재시도, 무한 스크롤까지.',
  },
  {
    icon: Globe,
    title: 'SEO Ready',
    description: 'react-helmet-async로 페이지별 메타 태그를 손쉽게 관리.',
  },
  {
    icon: Moon,
    title: '다크모드',
    description: 'next-themes와 결합된 시스템 환경설정 추종 다크모드.',
  },
  {
    icon: Bell,
    title: '폼 & 알림',
    description: 'react-hook-form, zod 검증, 토스트 알림이 기본 탑재.',
  },
  {
    icon: LayoutIcon,
    title: '접근성',
    description: 'ARIA 속성, skip link, 키보드 네비게이션이 처음부터 적용.',
  },
  {
    icon: Sparkles,
    title: 'MSW 모킹',
    description: '브라우저/노드 양쪽에서 동작하는 MSW로 백엔드 없이 개발.',
  },
];

function Home() {
  return (
    <>
      <Helmet>
        <title>홈 - React App</title>
        <meta
          name="description"
          content="React 19 + Vite + Chakra UI v3 기반의 프로덕션 준비 보일러플레이트"
        />
      </Helmet>

      <Box as="section" py={{ base: 8, md: 16 }}>
        <Container maxW="4xl" textAlign="center">
          <Stack gap="6" align="center">
            <Badge colorPalette="brand" variant="subtle" px="3" py="1" borderRadius="full">
              v1.0 · Production Ready
            </Badge>
            <Heading
              as="h1"
              size={{ base: '3xl', md: '5xl' }}
              lineHeight="1.1"
              letterSpacing="tight"
            >
              현대적인 React SPA를
              <br />
              <Text as="span" color="brand.fg">
                바로 시작하세요
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', md: 'xl' }} color="fg.muted" maxW="2xl">
              React 19, Vite 6, Chakra UI v3, TanStack Query, Zustand로 구성된 엔터프라이즈급
              보일러플레이트입니다. 접근성, 다크모드, 폼, 토스트, MSW까지 기본 탑재.
            </Text>
            <HStack gap="3" pt="2">
              <Button asChild colorPalette="brand" size="lg">
                <Link to="/posts">
                  데모 보기 <Icon as={ArrowRight} ml="2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">자세히 알아보기</Link>
              </Button>
            </HStack>
          </Stack>
        </Container>
      </Box>

      <Box as="section" py={{ base: 8, md: 12 }}>
        <Container maxW="6xl">
          <Stack gap="8">
            <Stack gap="2" textAlign="center">
              <Heading as="h2" size="xl">
                기본 탑재 기능
              </Heading>
              <Text color="fg.muted">프로젝트 첫날부터 필요한 모든 도구가 준비되어 있습니다.</Text>
            </Stack>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4">
              {features.map(({ icon: FeatureIcon, title, description }) => (
                <Card.Root key={title} variant="outline" h="full">
                  <Card.Body>
                    <Stack gap="3">
                      <Box
                        boxSize="10"
                        borderRadius="md"
                        bg="brand.subtle"
                        color="brand.fg"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <FeatureIcon size={20} aria-hidden="true" />
                      </Box>
                      <Heading as="h3" size="md">
                        {title}
                      </Heading>
                      <Text color="fg.muted" fontSize="sm">
                        {description}
                      </Text>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Home;
