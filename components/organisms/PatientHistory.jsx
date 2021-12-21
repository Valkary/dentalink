import { Flex, Text } from "@chakra-ui/layout";
import Denture from "../molecules/denture";
import ToothHistory from '../molecules/ToothHistory';
import { useState } from "react";
import DentureColors from "../atoms/DentureColors";
import PatientSelector from "../molecules/PatientSelector";
import axios from "axios";

const PatientHistory = ({ userCreds }) => {
  const [patient, setPatient] = useState({});

  const [tooth, setTooth]  = useState({
    tooth_id: null,
    tooth_name: null
  });

  const { user_name, security_lvl, first_name, last_name } = userCreds;

  const selectPatientFunc = async (patient_id) => {
    const patient_data = await (await axios.post('/api/patients/getPatientData', { patientID: patient_id })).data;
    console.log(patient_data);

    setPatient(patient_data);
    setTooth({
      tooth_id: null,
      tooth_name: null
    });
  }

  const selectToothFunc = (tooth_id, tooth_name) => {
    const tooth_obj = {
      tooth_id: tooth_id,
      tooth_name: tooth_name
    }

    setTooth(tooth_obj);
  }

  return (
    <Flex direction="column">
      <PatientSelector selectPatient={selectPatientFunc}></PatientSelector>
      <Flex className="patientHistory" direction="column">
        <Flex className="information" direction="column">
          <Flex className="patientCredentials" direction="row">
            <Text mr="1rem">Paciente:</Text>
            <Text>{patient.names} {patient.last_names}</Text>
          </Flex>
          <Flex className="doctorCredentials" direction="row">
            <Text mr="1rem">Diagnosticado por:</Text>
            <Text>Dr. {first_name} {last_name}</Text>
          </Flex>
        </Flex>
        <Flex className="patientDenture" direction="column" width="100%">
          { 
            patient.id ?
              <>
                <DentureColors></DentureColors>
                <Denture selectTooth={selectToothFunc} patientID={patient.id}></Denture>
                <Flex direction="column" justify="center" align="center" width="100%" height="100%">
                  <ToothHistory 
                    toothName={tooth.tooth_name} 
                    toothID={tooth.tooth_id} 
                    patientID={patient.id}
                    
                  ></ToothHistory> 
                </Flex>
              </> :
            <></>
          }
        </Flex>
      </Flex>
    </Flex>
  ) 
}

export default PatientHistory;