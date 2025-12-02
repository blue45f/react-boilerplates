import { Box, Button, Heading, Link, Text, VStack } from '@chakra-ui/react'

interface Props {
  tabName: string
}

const Content = ({ tabName }: Props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="60vh"
      px={5}
    >
      <VStack gap={6} textAlign="center">
        <VStack gap={3}>
          <Heading size="xl" fontWeight="bold">
            Start Building Your App
          </Heading>
          <Text color="gray.600" maxW="md">
            A powerful scaffolding tool for building modern web applications.
            Quickly set up your project and configure your development environment.
          </Text>
        </VStack>

        <Link href="https://github.com" target="_blank" w={{ base: 'full', sm: '296px' }}>
          <Button
            size="lg"
            colorPalette="teal"
            variant="outline"
            w="full"
          >
            View Documentation
          </Button>
        </Link>

        <Text fontSize="sm" color="gray.500">
          You are currently on <strong>{tabName}</strong> tab.
        </Text>
      </VStack>
    </Box>
  )
}

export default Content
