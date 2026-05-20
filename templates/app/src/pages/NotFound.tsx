import { Box, Button, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 - 페이지를 찾을 수 없습니다</title>
        <meta name="description" content="요청하신 페이지가 존재하지 않습니다." />
      </Helmet>
      <Stack gap="6" textAlign="center" align="center" py={{ base: 12, md: 20 }}>
        <Box fontSize="7xl" aria-hidden="true">
          🧭
        </Box>
        <Heading as="h1" size="4xl" letterSpacing="tight">
          404
        </Heading>
        <Stack gap="2" maxW="md">
          <Text fontSize="xl" fontWeight="medium">
            페이지를 찾을 수 없습니다
          </Text>
          <Text color="fg.muted">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</Text>
        </Stack>
        <HStack gap="3" pt="2">
          <Button asChild colorPalette="brand">
            <Link to="/">홈으로 돌아가기</Link>
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            이전 페이지로
          </Button>
        </HStack>
      </Stack>
    </>
  );
}

export default NotFound;
