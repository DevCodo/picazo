import React, { useState } from 'react'
import { Box, Flex, IconButton, Input, Button } from '@chakra-ui/react'
import Brush from '../canvasTools/Brush'
import Eraser from '../canvasTools/Eraser'
import useStore from '../store'

function PaintTools() {
  const [isShowDropdown, setIsShowDropdown] = useState(false)
  const { lineWidth, setLineWidth, setStrokeColor, canvas } = useStore()

  return (
    <Flex
      top={0}
      pos="absolute"
      left={0}
      width="100%"
      h="48px"
      background="rgba(0, 0, 0, 0.05)"
      p="4px"
    >
      <IconButton
        onClick={() => useStore.setState({ tool: new Brush(canvas) })}
        borderRadius="50%"
        _hover={{
          bg: 'transparent !important'
        }}
        _active={{
          bg: 'rgba(0, 0, 0, 0.1) !important'
        }}
        _focus={{
          boxShadow: 'none !important'
        }}
        icon={<i className="eva eva-edit-outline" style={{ fontSize: '26px', color: '#2a9ff3' }} />}
      />

      <IconButton
        onClick={() => useStore.setState({ tool: new Eraser(canvas) })}
        borderRadius="50%"
        _hover={{
          bg: 'transparent !important'
        }}
        _active={{
          bg: 'rgba(0, 0, 0, 0.1) !important'
        }}
        _focus={{
          boxShadow: 'none !important'
        }}
        icon={<i className="eva eva-book-outline" style={{ fontSize: '26px', color: '#2a9ff3' }} />}
      />

      <Box w="150px" h="40px" pos="relative">
        <Button
          justifyContent="space-between"
          fontWeight="normal"
          onClick={() => setIsShowDropdown(!isShowDropdown)}
          display="flex"
          _focus={{
            boxShadow: 'none !important'
          }}
        >
          <Box height={`${lineWidth + 2}px`} width="100px" bg="#000" borderRadius={4} />
          <i
            className={
              !isShowDropdown
                ? 'eva eva-arrow-ios-downward-outline'
                : 'eva eva-arrow-ios-upward-outline'
            }
            style={{ fontSize: '20px', flexShrink: 0, marginLeft: '5px' }}
          />
        </Button>

        <Box
          pos="absolute"
          top="44px"
          left="0"
          maxHeight={isShowDropdown ? '200px' : 0}
          transition=".3s"
          overflow="hidden"
          bg="rgba(255, 255, 255, 1)"
        >
          {[5, 10, 15, 20].map(value => (
            <Button
              key={value}
              bg="transparent"
              h="30px"
              display="flex"
              onClick={() => {
                setLineWidth(value)
                setIsShowDropdown(!isShowDropdown)
              }}
              _focus={{
                boxShadow: 'none !important'
              }}
            >
              <Box key={value} height={`${value + 2}px`} width="100px" bg="#000" borderRadius={4} />
            </Button>
          ))}
        </Box>
      </Box>

      <Input
        cursor="pointer"
        onChange={e => setStrokeColor(e.target.value)}
        w="40px"
        p={0}
        _focus={{
          boxShadow: 'none !important'
        }}
        type="color"
      />
    </Flex>
  )
}

export default PaintTools
