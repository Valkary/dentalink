import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios";
import moment from "moment";
import { useEffect, useState, useReducer } from "react";
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
  Badge,
  Button,
	useDisclosure
} from '@chakra-ui/react'

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
};

const appointmentInitialState = {
	procedure: 1,
	date: '',
	start: '',
	end: '',
	cost: 1,
};

const Calendar = ({}) => {
	const [ appointments, setAppointments ] = useState([{}]);
	const [ procedures, setProcedures ] = useState([]);
	const [ patients, setPatients ] = useState([]);
	
	const { isOpen, onOpen, onClose } = useDisclosure();
  const [ sent, setSent ] = useState(false);
  const [ sentStatus, setSentStatus ] = useState({ error: false, message: "Sin agendar" });

  const [ patient_id, setPatient_id ] = useState(1);
	const [ insert_id, setInsert_id ]= useState(0);

	const [ state, dispatch ] = useReducer(appointmentReducer, appointmentInitialState);

  const makeAppointment = async (state) => {
    const appointment_request = await (await axios.post('/api/appointments/makeAppointment', { ...state, patient_id: patient_id })).data;

    setSent(true);
		setInsert_id(appointment_request.insertId);
    appointment_request.insertId ? setSentStatus({ error: false, message: "Agendada" }) : setSentStatus({ error: true, message: "No agendada" }) 
  }
	
	useEffect(async () => {
		const req_appointments = await (await axios.post('/api/appointments/appointments')).data;
		const req_procedures = await (await axios.post('/api/teeth/getProcedures')).data;
		const req_patients = await (await axios.post('api/patients/getAllPatients')).data;

		setAppointments(req_appointments);
		setProcedures(req_procedures);
		setPatients(req_patients);
	}, []);

	useEffect(async () => {
		const req_appointments = await (await axios.post('/api/appointments/appointments')).data;
		setAppointments(req_appointments);
	}, [insert_id]);

	const businessHours = [
		{
			daysOfWeek: [ 1, 2, 3, 4, 5 ],
			startTime: '08:00',
			endTime: '18:00'
		},
		{
			daysOfWeek: [ 6, 7 ],
			startTime: '10:00',
			endTime: '16:00'
		}
	];

	const handleOpenClick = (e) => {
		const formated_date_time = moment(e.dateStr).format("YYYY-MM-DD HH:mm");
		const date_time_array = formated_date_time.split(" ");
		const date = date_time_array[0];
		const time = date_time_array[1];

		dispatch({ type: 'date', payload: date });
		dispatch({ type: 'start', payload: time });
		onOpen();
	};

	const handleClose = () => {
		dispatch({ type: 'procedure', payload: 1 });
		dispatch({ type: 'date', payload: "" });		
		dispatch({ type: 'start', payload: "" });
		dispatch({ type: 'end', payload: "" });		
		dispatch({ type: 'cost', payload: 1 });	
		setSent(false);	
		setSentStatus({ error: false, message: "Sin agendar" });

		onClose();
	}

  return (
		<>
			<FullCalendar
				businessHours = {businessHours}
				plugins={[timeGridPlugin, interactionPlugin]}
				initialView="timeGridWeek"
				selectable
				nowIndicator
				height={"100%"}
				events={appointments}
				dateClick={(e) => handleOpenClick(e)}
			/>

      <Modal isOpen={isOpen} onClose={() => handleClose()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Agendar Cita
            <Badge colorScheme={sentStatus.message === 'Sin agendar' ? "gray" : sentStatus.error ? "red" : "green"}>{sentStatus.message}</Badge>  
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={2}>
              <InputGroup>
                <InputAddon>Paciente:</InputAddon>
                <Select variant="flushed" onChange={(e) => setPatient_id(e.target.value)} value={patient_id}>
                  {
                    patients.map(patient => {
                      return <option key={patient.id} value={patient.id}>{patient.names} {patient.last_names}</option>
                    })
                  }
                </Select>
              </InputGroup>
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
            <Button colorScheme='blue' mr={3} onClick={() => handleClose()}>
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
  );
};

export default Calendar;