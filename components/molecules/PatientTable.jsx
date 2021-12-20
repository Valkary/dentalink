import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import axios from 'axios';

import AppointmentModal from './AppointmentModal';

const PatientTable = ({}) => {
  const [patients, setPatients] = useState([]);
  const [procedures, setProcedures] = useState([]);

  useEffect(async () => {
    const getAllPatients = await (await axios.post('/api/patients/getAllPatients')).data;
    const getAllProcedures = await (await axios.post('/api/teeth/getProcedures')).data;

    setProcedures(getAllProcedures);
    setPatients(getAllPatients);
  }, []);

  return (
    <Table variant="striped" colorScheme="blue">
      <TableCaption>Listado de Pacientes</TableCaption>
      <Thead>
        <Tr>
          <Th>Nombres</Th>
          <Th>Apellidos</Th>
          <Th>Email</Th>
          <Th>No. Teléfono</Th>
          <Th>Edad</Th>
          <Th>Información</Th>
          <Th>Agendar Cita</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          patients.map(patient => {
            const { names, last_names, phone, email, id, age} = patient;
            
            return (
              <Tr key={`patient_${id}`}>
                <Td>{names}</Td>
                <Td>{last_names}</Td>
                <Td>{email}</Td>
                <Td isNumeric>{phone}</Td>
                <Td isNumeric>{age}</Td>
                <Td>
                  <Button colorScheme="blue">Información</Button>
                </Td>
                <Td>
                  <AppointmentModal patient={patient} procedures={procedures}></AppointmentModal>
                </Td>
              </Tr>
            )
          })
        }
      </Tbody>
    </Table>
  )
}

export default PatientTable;