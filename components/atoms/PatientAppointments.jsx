import { Table, Tbody, Th, Thead, Tr, Td } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";

const PatientAppointments = ({patient_id}) => {
  const [ patientAppointments, setPatientAppointments ] = useState([{ title: "", start: "", end: "" }]);

  useEffect(async () => {
    const patient_appointments = await (await axios.post("/api/appointments/patientAppointments", { patient_id: patient_id })).data;
    setPatientAppointments(patient_appointments);
  }, [patient_id]);

  return (
    <Table colorScheme="blue" variant="striped">
      <Thead>
        <Tr>
          <Th>Procedimiento</Th>
          <Th isNumeric>Fecha</Th>
          <Th isNumeric>Hr. Inicio</Th>
          <Th isNumeric>Hr. Fin</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          patientAppointments.map((appointment, idx) => {
            if(appointment) {
              const { title, start, end } = appointment;
              const procedure = title.split(" - ")[1];
              const date = start.split(" ")[0];
              const time_start = start.split(" ")[1];
              const time_end = end.split(" ")[1];
  
              return (
                <Tr key={`appointment_${idx}`}>
                  <Td>{procedure}</Td>
                  <Td>{date}</Td>
                  <Td>{time_start}</Td>
                  <Td>{time_end}</Td>
                </Tr>
              )
            }
          })
        }
      </Tbody>
    </Table>
  )
}

export default PatientAppointments;