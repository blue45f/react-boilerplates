import { Badge, Box, Card, Code, HStack, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';

const stack = [
  { name: 'React 19', desc: '컴파일러 친화적인 최신 React' },
  { name: 'Vite 6', desc: 'esbuild 기반 초고속 번들러' },
  { name: 'TypeScript 5', desc: 'strict 모드 활성화' },
  { name: 'Chakra UI v3', desc: 'createSystem 기반 디자인 시스템' },
  { name: 'React Router 7', desc: 'lazy 라우트 + 중첩 레이아웃' },
  { name: 'TanStack Query 5', desc: '서버 상태와 캐싱' },
  { name: 'Zustand 5', desc: 'persist 미들웨어로 영속화' },
  { name: 'react-hook-form + zod', desc: '폼 검증' },
  { name: 'MSW 2', desc: '브라우저/노드 양쪽 모킹' },
  { name: 'Vitest + Testing Library', desc: '단위/통합 테스트' },
  { name: 'Playwright', desc: 'E2E 테스트' },
  { name: 'ESLint 9', desc: 'flat config + typescript-eslint' },
];

const folderStructure = `src/
├── components/        # UI 컴포넌트
│   ├── ui/           # Provider, Toaster, Color Mode
│   ├── Layout.tsx
│   └── ErrorBoundary.tsx
├── pages/            # 라우트별 페이지 (lazy)
├── hooks/            # 커스텀 훅 (usePosts, useInfinitePosts)
├── stores/           # Zustand 스토어 (persist)
├── lib/              # api(ky) 등 외부 통신
├── theme/            # Chakra v3 system 정의
├── mocks/            # MSW handlers + browser/server worker
├── App.tsx
└── main.tsx`;

function About() {
  return (
    <>
      <Helmet>
        <title>소개 - React App</title>
        <meta
          name="description"
          content="React 보일러플레이트에 포함된 기술 스택과 폴더 구조를 소개합니다."
        />
      </Helmet>

      <Stack gap="10">
        <Stack gap="3">
          <Heading as="h1" size="2xl">
            소개
          </Heading>
          <Text color="fg.muted" fontSize="lg" maxW="3xl">
            이 프로젝트는 React 보일러플레이트 CLI로 생성되었습니다. 프로덕션 수준의 기본 설정과
            모범 사례를 첫 커밋부터 제공합니다.
          </Text>
        </Stack>

        <Stack gap="4">
          <Heading as="h2" size="lg">
            기술 스택
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="3">
            {stack.map((item) => (
              <Card.Root key={item.name} variant="outline">
                <Card.Body py="4">
                  <Stack gap="1">
                    <HStack justify="space-between" align="center">
                      <Heading as="h3" size="sm">
                        {item.name}
                      </Heading>
                      <Badge colorPalette="brand" variant="subtle">
                        deps
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="fg.muted">
                      {item.desc}
                    </Text>
                  </Stack>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </Stack>

        <Stack gap="4">
          <Heading as="h2" size="lg">
            폴더 구조
          </Heading>
          <Box
            bg="bg.subtle"
            borderWidth="1px"
            borderColor="border"
            borderRadius="lg"
            p="6"
            overflow="auto"
          >
            <Code
              as="pre"
              variant="plain"
              fontSize="sm"
              fontFamily="mono"
              whiteSpace="pre"
              bg="transparent"
              p="0"
            >
              {folderStructure}
            </Code>
          </Box>
          <Text fontSize="sm" color="fg.muted">
            <Code>@/</Code> 별칭으로 <Code>src/</Code> 하위 모듈을 import 할 수 있습니다.
          </Text>
        </Stack>
      </Stack>
    </>
  );
}

export default About;
