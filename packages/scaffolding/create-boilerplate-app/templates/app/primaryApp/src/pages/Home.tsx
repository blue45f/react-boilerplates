import { Box, Flex } from '@chakra-ui/react'

import Content from '../components/Content'
import Header from '../components/Header'
import LNB from '../components/LNB'

const Home = () => {
  return (
    <Box minH="100vh" bg="white">
      <Header />
      <Flex>
        <LNB />
        <Box flex={1} display="flex" alignItems="center" justifyContent="center">
          <Content />
        </Box>
      </Flex>
    </Box>
  )
}

export default Home
