import React, { useRef, useEffect } from 'react'
import useStore from '../store'
import { useForm } from 'react-hook-form'
import Avatar from './Avatar'
import { IconButton, FormControl, Input, Flex, Box } from '@chakra-ui/react'

const Chat = () => {
  const { messages, sendMessage } = useStore()
  const { handleSubmit, register, setValue } = useForm()
  const messagesRef = useRef(null)

  useEffect(() => {
    messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight })
  }, [messages])

  const onSubmit = ({ message }) => {
    if (!message) return
    sendMessage(message)
    setValue('message', '')
  }

  return (
    <Box w={350} p={4} h="100%">
      <Flex
        bg="white"
        flexDir="column"
        border="solid 1px #c2c2c2"
        borderRadius={4}
        overflowY="auto"
        h="100%"
      >
        <Box flex={1} overflowY="auto" p={4} ref={messagesRef}>
          {messages.map((message, index) => (
            <Box key={index}>
              {message.event === 'connection' ? (
                <Box mb="8px" fontSize="14px" textAlign="center" color="#57a5ff">
                  Воин <b>{message.userName}</b> теперь с нами
                </Box>
              ) : (
                <Flex className="message" alignItems="end" mb="8px">
                  <Avatar id={message.avatarID} />
                  <Box bg="#f0f0f0" ml="4px" p="4px 8px" borderRadius="8px">
                    <Box fontWeight={600} mb="4px">
                      {message.userName}
                    </Box>
                    <Box>{message.message}</Box>
                  </Box>
                </Flex>
              )}
            </Box>
          ))}
        </Box>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            background: '#d3e0e9',
            position: 'relative',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4px'
          }}
        >
          <Box pos="relative" flex={1}>
            <FormControl>
              <Input
                {...register('message')}
                placeholder="Сообщение"
                autoComplete="off"
                bg="white"
                pr="40px"
                _focus={{
                  boxShadow: 'none !important'
                }}
              />
            </FormControl>

            <IconButton
              type="submit"
              borderRadius="4px"
              pos="absolute"
              bg="transparent"
              top={0}
              right={0}
              zIndex={999}
              _hover={{
                bg: 'transparent !important'
              }}
              _focus={{
                boxShadow: 'none !important'
              }}
              icon={
                <i
                  className="eva eva-paper-plane-outline"
                  style={{ fontSize: '26px', color: '#2a9ff3' }}
                />
              }
            />
            {/* <Button type="submit">Отправить</Button> */}
          </Box>
        </form>
      </Flex>
    </Box>
  )
}

export default Chat
