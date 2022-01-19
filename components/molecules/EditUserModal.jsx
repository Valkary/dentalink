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
import AddUser from '../atoms/EditUser';
import { AiOutlineEdit } from "react-icons/ai";

const EditUserModal = ({ idUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ sentStatus, setSentStatus ] = useState({ error: false, message: "Sin enviar" });
  const [ sent, setSent ] = useState(false);

  return (
    <>
      <Button leftIcon={<AiOutlineEdit/>} onClick={onOpen} colorScheme={"yellow"}>Editar Usuario</Button>

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
                <strong>Editar Usuario</strong>
              </Flex>
            </VStack>
          </ModalHeader>
          <ModalBody>
            <AddUser
              setSent={setSent}
              setSentStatus={setSentStatus}
              onClose={onClose}
              idUser={idUser}
            ></AddUser>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
};

export default EditUserModal;