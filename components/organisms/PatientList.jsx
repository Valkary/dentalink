import { List } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import ListedPatient from "../molecules/ListedPatient";

const PatientList = ({ selectPatient }) => {
  const [patients, setPatients] = useState([]);
  
  useEffect(async () => {
    const getAllPatients = await (await axios.post('/api/patients/getAllPatients')).data;

    setPatients(getAllPatients);
  }, []);

  return (
    <List>
      {
        patients.map(patient => {
          return (
            <ListedPatient
              names={patient.names}
              last_names={patient.last_names}
              phone={patient.phone}
              email={patient.email}
              patient_id={patient.id}
              isAdult={patient.age >= 18}
              selectPatient={selectPatient}
              key={patient.id}
            ></ListedPatient>
          )
        })
      }
    </List>
  )
}

export default PatientList;