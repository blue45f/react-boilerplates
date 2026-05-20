import { Box, Button, Container, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isDev = import.meta.env.DEV;

      return (
        <Container maxW="2xl" py={16}>
          <Stack gap="6" textAlign="center" align="center">
            <Box
              boxSize="16"
              borderRadius="full"
              bg="red.subtle"
              color="red.fg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="3xl"
              aria-hidden="true"
            >
              !
            </Box>
            <Stack gap="2">
              <Heading as="h1" size="xl">
                문제가 발생했습니다
              </Heading>
              <Text color="fg.muted">
                예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
              </Text>
            </Stack>

            {isDev && this.state.error && (
              <Box
                w="full"
                p={4}
                bg="bg.muted"
                borderRadius="md"
                borderWidth="1px"
                borderColor="border"
                textAlign="left"
              >
                <Text fontSize="xs" color="fg.muted" mb="2" fontWeight="bold">
                  DEBUG (개발 모드에서만 표시)
                </Text>
                <Box
                  as="pre"
                  fontSize="xs"
                  fontFamily="mono"
                  whiteSpace="pre-wrap"
                  wordBreak="break-word"
                  maxH="60"
                  overflow="auto"
                >
                  {this.state.error.message}
                  {this.state.errorInfo?.componentStack ?? ''}
                </Box>
              </Box>
            )}

            <HStack gap="3">
              <Button colorPalette="brand" onClick={this.handleReset}>
                다시 시도
              </Button>
              <Button variant="outline" onClick={this.handleGoHome}>
                홈으로
              </Button>
            </HStack>
          </Stack>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
