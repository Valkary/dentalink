import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  InputGroup,
  InputAddon,
  Input,
  Stack,
  InputLeftElement,
  Badge
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useReducer, useState } from 'react';
import axios from 'axios';

const appointmentInitialState = {
  procedure: 1,
  date: '',
  start: '',
  end: '',
  cost: 1,
}

const appointmentReducer = (state, action) => {
  switch(action.type) {
    case 'procedure':
      return { ...state, procedure: parseInt(action.payload, 10) }
    case 'date':
      return { ...state, date: action.payload }
    case 'start':
      return { ...state, start: action.payload }
    case 'end':
      return { ...state, end: action.payload }
    case 'cost':
      return { ...state, cost: parseInt(action.payload, 10) }
  }
}

const AppointmentModal = ({patient, procedures}) => {
  const { names, last_names } = patient;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, dispatch] = useReducer(appointmentReducer,appointmentInitialState);
  const [sent, setSent] = useState(false);
  const [sentStatus, setSentStatus] = useState({ error: false, message: "Sin agendar" })

  const makeAppointment = async (state) => {
    const appointment_request = await (await axios.post('/api/appointments/makeAppointment', { ...state, patient_id: patient.id })).data;

    setSent(true);

    appointment_request.affectedRows === 1 ? setSentStatus({ error: false, message: "Agendada" }) : setSentStatus({ error: true, message: "No agendada" }) 
  }

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>Agendar</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Cita: {names} {last_names}
            <Badge colorScheme={sentStatus.message === 'Sin agendar' ? "gray" : sentStatus.error ? "red" : "green"}>{sentStatus.message}</Badge>  
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={2}>
              <InputGroup>
                <InputAddon>Procedimiento:</InputAddon>
                <Select variant="flushed" onChange={(e) => dispatch({ type: 'procedure', payload: e.currentTarget.value })}>
                  {
                    procedures.map(procedure => {
                      return <option key={procedure.id} value={procedure.id}>{procedure.name}</option>
                    })
                  }
                </Select>
              </InputGroup>
              <InputGroup>
                  <InputAddon>Fecha:</InputAddon>
                  <Input 
                    type="date" 
                    onChange={(e) => dispatch({ type: 'date', payload: e.currentTarget.value })}
                    value={state.date}
                  ></Input>
              </InputGroup>
              <InputGroup>
                  <InputAddon>Hr. inicio</InputAddon>
                  <Input 
                    type="time" 
                    onChange={(e) => dispatch({ type: 'start', payload: e.currentTarget.value })}
                    value={state.start}
                  ></Input>
                  <InputAddon>Hr. fin</InputAddon>
                  <Input 
                    type="time" 
                    onChange={(e) => dispatch({ type: 'end', payload: e.currentTarget.value })}
                    value={state.end}
                  ></Input>
              </InputGroup>
              <InputGroup>
                <InputAddon>Costo:</InputAddon>
                <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      color='gray.600'
                      fontSize='1.2em'
                      children='$'
                    />
                    <Input 
                      type="number" 
                      min={0} 
                      step="any" 
                      onChange={(e) => dispatch({ type: 'cost', payload: e.currentTarget.value })}
                      value={state.cost}
                    ></Input>
                </InputGroup>
              </InputGroup>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button 
              colorScheme="green" 
              disabled={ (state.date === '' || state.start === '' || state.end === '' || isNaN(state.cost) || state.cost === 0 || state.cost === null || sent) ? true : false }
              onClick={() => {makeAppointment(state)}}
              >Agendar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AppointmentModal;