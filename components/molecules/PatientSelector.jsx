import { Select } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const PatientSelector = ({ selectPatient }) => {
  const [patients, setPatients] = useState([]);

  useEffect(async () => {
    const get_patients = await (await axios.post('/api/patients/getAllPatients')).data;

    setPatients(get_patients);
  }, []);


  return (
    <Select 
      variant="flushed"
      onChange={e => selectPatient(e.currentTarget.value)}
    >
      <option value="0">Seleccionar</option>
      {
        patients.map(patient => {
          return (
            <option key={patient.id} value={patient.id}>{`${patient.names} ${patient.last_names}`}</option>
          )
        })
      }
    </Select>
  )
}

export default PatientSelector;