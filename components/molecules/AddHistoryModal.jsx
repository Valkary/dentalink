import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Grid,
  GridItem,
  Select,
  Input,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { FaHandHoldingMedical } from "react-icons/fa";
import FunctionalTooth from '../atoms/FunctionalTooth';
import axios from "axios";

const tooth_info = {
  colors: {
    top: "#FFF",
    bottom: "#FFF",
    center: "#FFF",
    left: "#FFF",
    right: "#FFF",
  },
  names: ["Superior", "Izquierda", "Centro", "Derecha", "Inferior"]
}
const AddHistoryModal = ({ patient_id, tooth_id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ toothArea, setToothArea ] = useState({});
  const [ procedures, setProcedures ] = useState([]);
  const [ statuses, setStatuses ] = useState([]);

  useEffect(async () => {
    const get_procedures = await (await axios.post('/api/procedures/getAllProcedures')).data;
    const get_statuses = await (await axios.post('/api/status/getAllStatus')).data;

    setProcedures(get_procedures);
    setStatuses(get_statuses);
  }, []);

  const unHovering = (e) => {
    e.target.style.fill = "white";
  };

  const hovering = (e) => {
    e.target.style.fill = "red";
  };

  const clickToothArea = (tooth_area) => {
    setToothArea({ area_id: tooth_area, area_name: tooth_info.names[tooth_area - 1] });
  }

  return (
    <>
      <Button leftIcon={<FaHandHoldingMedical/>} colorScheme="green" width="100%" onClick={onOpen}>Realizar Procedimiento</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Procedimiento al Historial</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              templateColumns="1fr 2fr"
            >
              <GridItem>
                <Flex direction="column" justify="center" align="center">
                  <FunctionalTooth colors={tooth_info.colors} width={100} height={100} hovering={hovering} unHovering={unHovering} clickToothArea={clickToothArea} />
                </Flex>
              </GridItem>

              <GridItem>
                <Flex direction="column" justify="center" align="center">
                  <InputGroup>
                    <InputLeftAddon>Area:</InputLeftAddon>
                    <Input value={toothArea.area_name} type="text" disabled/>
                  </InputGroup>
                  
                  <InputGroup>
                    <InputLeftAddon>Procedimiento:</InputLeftAddon>
                    <Select variant="flushed">
                      {
                        procedures.map(procedure => {
                          const { name, id } = procedure;
                          return <option key={`procedure_${id}`} value={id}>{name}</option>
                        })
                      }
                    </Select>
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon>Estado:</InputLeftAddon>
                    <Select variant="flushed">
                      {
                        statuses.map(status => {
                          const { name, id } = status;
                          return <option key={`status_${id}`} value={id}>{name}</option>
                        })
                      }
                    </Select>
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon>Fecha:</InputLeftAddon>
                    <Input type="date"></Input>
                  </InputGroup>
                </Flex>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddHistoryModal;