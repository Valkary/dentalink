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
import moment from 'moment';

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

const setColorFunc = (area, color) => {
  let colors = {
    top: "#FFF",
    bottom: "#FFF",
    center: "#FFF",
    left: "#FFF",
    right: "#FFF",
  }

  switch(area) {
    case 1:
      colors = {
        top: color,
        bottom: "#FFF",
        center: "#FFF",
        left: "#FFF",
        right: "#FFF",
      };
      break;
    case 2:
      colors = {
        top: "#FFF",
        bottom: "#FFF",
        center: "#FFF",
        left: color,
        right: "#FFF",
      };
      break;
    case 3:
      colors = {
        top: "#FFF",
        bottom: "#FFF",
        center: color,
        left: "#FFF",
        right: "#FFF",
      };
      break;
    case 4:
      colors = {
        top: "#FFF",
        bottom: "#FFF",
        center: "#FFF",
        left: "#FFF",
        right: color,
      };
      break;
    case 5:
      colors = {
        top: "#FFF",
        bottom: color,
        center: "#FFF",
        left: "#FFF",
        right: "#FFF",
      };
      break;
  }

  return colors;
}

const addProcedureToHistory = async (patient, tooth, area, procedure, status, date) => {
  const query = await axios.post("/api/procedures/addProcedureToHistory", { patient: patient, tooth: tooth, area: area, procedure: procedure, status: status, date: date });

  return;
}

const validateForm = (area, procedure, status, date) => {
  if(Object.keys(area).length === 0) return false;
  if(procedure === 0 || procedure === "" || procedure === null) return false;
  if(status === 0 || status === "" || status === null) return false;
  return moment(date, "YYYY-MM-DD", true).isValid();
}

const AddHistoryModal = ({ patient_id, tooth_id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ toothArea, setToothArea ] = useState({});
  const [ procedures, setProcedures ] = useState([]);
  const [ statuses, setStatuses ] = useState([]);
  const [ toothInfo, setToothInfo ] = useState(tooth_info);

  const [ procedure, setProcedure ] = useState(1);
  const [ status, setStatus ] = useState(1);
  const [ date, setDate ] = useState("");

  useEffect(async () => {
    const get_procedures = await (await axios.post('/api/procedures/getAllProcedures')).data;
    const get_statuses = await (await axios.post('/api/status/getAllStatus')).data;

    setProcedures(get_procedures);
    setStatuses(get_statuses);
  }, []);

  const cleanData = () => {
    setProcedure(1);
    setStatus(1);
    setDate("");
    setToothInfo(tooth_info);
    setToothArea({});
  }

  const clickToothArea = (tooth_area) => {
    setToothArea({ area_id: tooth_area, area_name: tooth_info.names[tooth_area - 1] });
    setToothInfo({...toothInfo, colors: setColorFunc(tooth_area, statuses[status - 1].color)});

    return;
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
                  <FunctionalTooth colors={toothInfo.colors} width={100} height={100} clickToothArea={clickToothArea} />
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
                    <Select 
                      variant="flushed"
                      value={procedure}
                      onChange={(e) => setProcedure(parseInt(e.currentTarget.value, 10))}
                    >
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
                    <Select 
                      variant="flushed"
                      value={status}
                      onChange={(e) => {
                        clickToothArea(toothArea.area_id);
                        setStatus(parseInt(e.currentTarget.value, 10));
                      }}
                    >
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
                    <Input 
                      type="date"
                      onChange={(e) => setDate(e.currentTarget.value)}
                    ></Input>
                  </InputGroup>
                </Flex>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme='green'
              mr={3}
              disabled={!validateForm(toothArea, procedure, status, date)}
              onClick={() => {
                addProcedureToHistory(patient_id, tooth_id, toothArea, procedure, status, date);
                cleanData();
              }}
            >
              Agregar
            </Button>
            <Button 
              colorScheme='blue' 
              mr={3} 
              onClick={onClose}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddHistoryModal;