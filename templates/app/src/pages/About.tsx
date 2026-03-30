import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';

function About() {
  return (
    <>
      <Helmet>
        <title>소개 - React App</title>
        <meta name="description" content="이 프로젝트에 사용된 기술 스택을 소개합니다." />
      </Helmet>
      <VStack gap={6} align="start">
        <Heading as="h1" size="xl">
          소개
        </Heading>
        <Text color="gray.600">
          이 프로젝트는 React 보일러플레이트 CLI로 생성되었습니다.
        </Text>
        <Box>
          <Heading as="h2" size="md" mb={2}>
            포함된 기술
          </Heading>
          <VStack as="ul" align="start" pl={4} gap={1}>
            <Text as="li">React 19</Text>
            <Text as="li">Vite 6</Text>
            <Text as="li">Chakra UI 3</Text>
            <Text as="li">React Router 7</Text>
            <Text as="li">Tanstack Query 5</Text>
            <Text as="li">Zustand 5</Text>
            <Text as="li">TypeScript 5</Text>
            <Text as="li">Vitest 3</Text>
          </VStack>
        </Box>
      </VStack>
    </>
  );
}

export default About;
