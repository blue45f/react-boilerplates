import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'

const LNB = () => {
  const [selected, setSelected] = useState(0)
  const items = Array.from({ length: 15 }, (_, index) => index + 1)

  return (
    <Box
      as="nav"
      w="280px"
      h="calc(100vh - 56px)"
      borderRightWidth="1px"
      borderColor="gray.200"
      overflowY="auto"
    >
      {items.map((item) => (
        <Flex
          key={item}
          px={4}
          py={3}
          cursor="pointer"
          align="center"
          justify="space-between"
          bg={selected === item ? 'blue.50' : 'transparent'}
          borderLeftWidth="3px"
          borderLeftColor={selected === item ? 'blue.500' : 'transparent'}
          _hover={{ bg: selected === item ? 'blue.50' : 'gray.50' }}
          onClick={() => setSelected(item)}
          transition="all 0.2s"
        >
          <Box>
            <Text fontWeight={selected === item ? 'semibold' : 'normal'}>
              Item {item}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Description
            </Text>
          </Box>
          <Icon color="gray.400">
            <FiChevronRight />
          </Icon>
        </Flex>
      ))}
    </Box>
  )
}

export default LNB
