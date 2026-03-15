import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <VStack gap={6} textAlign="center" py={12}>
      <Heading as="h1" size="4xl">
        404
      </Heading>
      <Text fontSize="xl" color="gray.600">
        페이지를 찾을 수 없습니다
      </Text>
      <Text color="gray.500" maxW="md">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </Text>
      <VStack gap={3}>
        <Button as={Link} to="/" colorScheme="blue">
          홈으로 돌아가기
        </Button>
        <Button variant="outline" onClick={() => navigate(-1)}>
          이전 페이지로
        </Button>
      </VStack>
    </VStack>
  );
}

export default NotFound;
