import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Badge,
  VStack
} from '@chakra-ui/react';
import { useState } from 'react';
import AddUser from '../atoms/AddUser';
import { AiOutlineUserAdd } from "react-icons/ai";

const AddUserModal = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ sentStatus, setSentStatus ] = useState({ error: false, message: "Sin enviar" });
  const [ sent, setSent ] = useState(false);

  return (
    <>
      <Button leftIcon={<AiOutlineUserAdd/>} onClick={onOpen}>Agregar usuario</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack spacing={0}>
              <ModalCloseButton />
              <Flex direction="row" justify="flex-start" align="center" width="100%" height="100%">
                <Badge ml={3} colorScheme={!sent ? "gray" : sentStatus.error ? "red" : "green"}>
                  {sentStatus.message}
                </Badge>
              </Flex>
              <Flex direction="row" justify="center" align="center" width="100%" height="100%">
                <strong>Agregar Usuario</strong>
              </Flex>
            </VStack>
          </ModalHeader>
          <ModalBody>
            <AddUser
              setSent={setSent}
              setSentStatus={setSentStatus}
              onClose={onClose}
            ></AddUser>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
};

export default AddUserModal;