import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <VStack gap={6} textAlign="center" py={12}>
      <Heading as="h1" size="4xl">
        404
      </Heading>
      <Text fontSize="xl" color="gray.600">
        페이지를 찾을 수 없습니다
      </Text>
      <Button as={Link} to="/" colorScheme="blue">
        홈으로 돌아가기
      </Button>
    </VStack>
  );
}

export default NotFound;
