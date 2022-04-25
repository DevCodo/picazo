import React, { useEffect } from 'react'
import Chat from './Chat'
import Paint from './Paint'
import EntryModal from './EntryModal'
import useStore from '../store'
import { Box, Flex } from '@chakra-ui/react'
import fon from '../images/fon.jpg'
import { useParams } from 'react-router-dom'

function Layout() {
  const params = useParams()
  const { connected } = useStore()

  useEffect(() => {
    useStore.setState({ sessionID: params.id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box h="100%" bgImage={fon} bgSize="120px">
      {!connected && <EntryModal />}

      {connected && (
        <Flex h="100%" bg="rgba(120, 150, 172, 0.5)">
          <Paint />
          <Chat />
        </Flex>
      )}
    </Box>
  )
}

export default Layout
