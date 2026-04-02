import { Box, Card, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';

import { usePosts } from '@/hooks/usePosts';

function Posts() {
  const { data: posts, isLoading, error } = usePosts();

  return (
    <>
      <Helmet>
        <title>게시글 - React App</title>
        <meta name="description" content="React Query를 사용한 데이터 페칭 예시입니다." />
      </Helmet>
      <VStack gap={6} align="start">
        <Heading as="h1" size="xl">
          게시글
        </Heading>
        <Text color="gray.500" fontSize="sm">
          Tanstack Query를 사용한 서버 데이터 페칭 예시 (JSONPlaceholder API)
        </Text>

        {isLoading && <Spinner size="lg" />}

        {error && (
          <Box p={4} bg="red.50" borderRadius="md" w="full">
            <Text color="red.600">데이터를 불러오는 중 오류가 발생했습니다.</Text>
          </Box>
        )}

        {posts?.map((post) => (
          <Card.Root key={post.id} w="full" variant="outline">
            <Card.Body>
              <Heading as="h2" size="md" mb={2}>
                {post.title}
              </Heading>
              <Text color="gray.600">{post.body}</Text>
            </Card.Body>
          </Card.Root>
        ))}
      </VStack>
    </>
  );
}

export default Posts;
