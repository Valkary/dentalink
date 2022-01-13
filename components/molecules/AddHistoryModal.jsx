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
  InputLeftAddon,
  Textarea,
  Badge
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

const validateForm = (area, procedure, status, date) => {
  if(Object.keys(area).length === 0) return false;
  if(procedure === 0 || procedure === "" || procedure === null) return false;
  if(status === 0 || status === "" || status === null) return false;
  return moment(date, "YYYY-MM-DD", true).isValid();
}

const AddHistoryModal = ({ patient_id, tooth_id, setUpdatedId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ toothArea, setToothArea ] = useState({});
  const [ procedures, setProcedures ] = useState([]);
  const [ statuses, setStatuses ] = useState([]);
  const [ toothInfo, setToothInfo ] = useState(tooth_info);
  const [sent, setSent] = useState(false);
  const [sentStatus, setSentStatus] = useState({ error: false, message: "Sin enviar" });

  const [ procedure, setProcedure ] = useState(1);
  const [ status, setStatus ] = useState(1);
  const [ date, setDate ] = useState("");
  const [ description, setDescription ] = useState("");

  useEffect(async () => {
    const get_procedures = await (await axios.post('/api/procedures/getAllProcedures')).data;
    const get_statuses = await (await axios.post('/api/status/getAllStatus')).data;

    setProcedures(get_procedures);
    setStatuses(get_statuses);
  }, []);

  const addProcedureToHistory = async (patient, tooth, area, procedure, status, date, description) => {
    const add_procedure_to_history_request = await (await axios.post("/api/procedures/addProcedureToHistory", { patient: patient, tooth: tooth, area: area, procedure: procedure, status: status, date: date, description: description })).data;
    setSent(true);
    setUpdatedId(add_procedure_to_history_request.insertId);
    return add_procedure_to_history_request.affectedRows === 1 ? setSentStatus({ error: false, message: "Agregado" }) : setSentStatus({ error: true, message: "No agregado" }) 
  }

  const cleanData = () => {
    setProcedure(1);
    setStatus(1);
    setDate("");
    setToothInfo(tooth_info);
    setToothArea({});
    setDescription("");
    setSent(false);
    setSentStatus({ error: false, message: "Sin enviar" });
    onClose();
  };

  const clickToothArea = (tooth_area) => {
    setToothArea({ area_id: tooth_area, area_name: tooth_info.names[tooth_area - 1] });
    setToothInfo({...toothInfo, colors: setColorFunc(tooth_area, statuses[status - 1].color)});

    return;
  };

  return (
    <>
      <Button 
        leftIcon={<FaHandHoldingMedical/>} 
        colorScheme="green" 
        width="100%" 
        onClick={onOpen}
        disabled={!!!tooth_id}
      >Realizar Procedimiento</Button>

      <Modal isOpen={isOpen} onClose={cleanData} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Agregar Procedimiento al Historial
            <Badge colorScheme={!sent ? "gray" : sentStatus.error ? "red" : "green"}>{sentStatus.message}</Badge> 
          </ModalHeader>
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
                  <Textarea
                    value={description}
                    onChange={e => setDescription(e.currentTarget.value)}
                    placeholder="Descripción del procedimiento realizado"
                    size="md"
                    resize="none"
                  />
                </Flex>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme='green'
              mr={3}
              disabled={!validateForm(toothArea, procedure, status, date)}
              onClick={() => addProcedureToHistory(patient_id, tooth_id, toothArea, procedure, status, date, description)}
            >
              Agregar
            </Button>
            <Button 
              colorScheme='blue' 
              mr={3} 
              onClose={cleanData}
              onClick={cleanData}
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