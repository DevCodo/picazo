import React from 'react'
import PaintTools from './PaintTools'
import Canvas from './Canvas'
import { Flex } from '@chakra-ui/react'

function Paint() {
  return (
    <Flex flex={1} h="100%" justifyContent="center" alignItems="center">
      <Flex
        h="100%"
        height="600px"
        width="800px"
        pos="relative"
        border="1px"
        borderRadius={4}
        overflow="hidden"
      >
        <PaintTools />
        <Canvas />
      </Flex>
    </Flex>
  )
}

export default Paint
