import { Box, Flex, Heading, IconButton } from '@chakra-ui/react'
import { FiHome, FiMenu } from 'react-icons/fi'

const Header = () => {
  return (
    <Box
      as="header"
      bg="teal.500"
      color="white"
      px={4}
      py={3}
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex align="center" justify="space-between" maxW="container.xl" mx="auto">
        <IconButton
          aria-label="Menu"
          variant="ghost"
          color="white"
          _hover={{ bg: 'teal.600' }}
        >
          <FiMenu size={20} />
        </IconButton>

        <Heading size="md" fontWeight="semibold">
          My App
        </Heading>

        <IconButton
          aria-label="Home"
          variant="ghost"
          color="white"
          _hover={{ bg: 'teal.600' }}
        >
          <FiHome size={20} />
        </IconButton>
      </Flex>
    </Box>
  )
}

export default Header
