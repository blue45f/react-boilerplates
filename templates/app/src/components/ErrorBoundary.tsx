import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Container maxW="container.md" py={16}>
          <VStack gap={4} textAlign="center">
            <Heading as="h1" size="xl" color="red.500">
              문제가 발생했습니다
            </Heading>
            <Text color="gray.600">
              예상치 못한 오류가 발생했습니다. 페이지를 새로고침하거나 다시 시도해 주세요.
            </Text>
            {this.state.error && (
              <Box
                as="pre"
                p={4}
                bg="gray.100"
                borderRadius="md"
                fontSize="sm"
                maxW="100%"
                overflow="auto"
                textAlign="left"
              >
                {this.state.error.message}
              </Box>
            )}
            <Button colorScheme="blue" onClick={this.handleReset}>
              다시 시도
            </Button>
          </VStack>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
