import { Button, Heading, Link, Text, VStack } from '@chakra-ui/react'

const Content = () => {
  return (
    <VStack gap={6} textAlign="center" py={10} px={5}>
      <VStack gap={3}>
        <Heading size="xl" fontWeight="medium">
          Start Building Your App
        </Heading>
        <VStack gap={1}>
          <Text color="gray.600">
            A powerful scaffolding tool for building modern web applications.
          </Text>
          <Text color="gray.600">
            Quickly set up your project and configure your development environment.
          </Text>
        </VStack>
      </VStack>

      <Link href="https://github.com" target="_blank" w={{ base: 'full', sm: '296px' }}>
        <Button
          size="lg"
          colorPalette="blue"
          variant="outline"
          w="full"
        >
          View Documentation
        </Button>
      </Link>
    </VStack>
  )
}

export default Content
