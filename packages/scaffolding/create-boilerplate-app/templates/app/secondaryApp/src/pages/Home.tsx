import { Box } from '@chakra-ui/react'

import Header from '../components/Header'
import Tab from '../components/Tab'

const Home = () => {
  return (
    <Box minH="100vh" bg="white">
      <Header />
      <Tab />
    </Box>
  )
}

export default Home
