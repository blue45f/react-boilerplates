import { Badge, Box, Tabs } from '@chakra-ui/react'
import { FiMessageCircle, FiVolume2 } from 'react-icons/fi'

import Content from './Content'

const Tab = () => {
  return (
    <Tabs.Root defaultValue="tab1" variant="line" colorPalette="teal">
      <Tabs.List bg="gray.50" px={4}>
        <Tabs.Trigger value="tab1" gap={2}>
          첫 번째
          <Badge colorPalette="teal" size="sm">
            <FiVolume2 />
          </Badge>
        </Tabs.Trigger>
        <Tabs.Trigger value="tab2" gap={2}>
          두 번째
          <FiMessageCircle />
        </Tabs.Trigger>
        <Tabs.Trigger value="tab3">세 번째</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>

      <Box p={4}>
        <Tabs.Content value="tab1">
          <Content tabName="첫 번째" />
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <Content tabName="두 번째" />
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <Content tabName="세 번째" />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  )
}

export default Tab
