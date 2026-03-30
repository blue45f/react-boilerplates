import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Helmet>
        <title>홈 - React App</title>
        <meta name="description" content="React 보일러플레이트로 생성된 웹 애플리케이션입니다." />
      </Helmet>
      <VStack gap={6} textAlign="center" py={12}>
        <Heading as="h1" size="2xl">
          React 보일러플레이트에 오신 것을 환영합니다
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="2xl">
          Vite, React 19, Chakra UI, React Router, Tanstack Query, Zustand를 사용한 현대적인 React
          앱 템플릿입니다.
        </Text>
        <Box>
          <Button as={Link} to="/about" colorScheme="blue" size="lg">
            더 알아보기
          </Button>
        </Box>
      </VStack>
    </>
  );
}

export default Home;
