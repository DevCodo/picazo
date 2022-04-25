import React from 'react'
import { useForm } from 'react-hook-form'
import useStore from '../store'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  Input,
  Flex
} from '@chakra-ui/react'

const EntryModal = () => {
  const { connect, connected } = useStore()

  const { handleSubmit, register } = useForm()

  const onSubmit = ({ userName }) => {
    useStore.setState({ userName })
    connect()
  }

  return (
    <Modal closeOnOverlayClick={false} isOpen={!connected}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Назовись воин</ModalHeader>
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired>
              <Input {...register('userName')} placeholder="Имя" autoComplete="off" />
            </FormControl>

            <Flex>
              <Button type="submit" mt={10} ml="auto">
                Войти
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EntryModal
