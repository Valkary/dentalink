import { Flex, Text } from "@chakra-ui/layout";
import Denture from "../molecules/denture";
import ToothHistory from '../molecules/ToothHistory';
import { useState } from "react";
import PatientList from "./PatientList";
import DentureColors from "../atoms/DentureColors";

const PatientHistory = ({ userCreds }) => {
  const [patient, setPatient] = useState({
    patient_id: null,
    isAdult: null,
    names: null,
    last_names: null
  });

  const [tooth, setTooth]  = useState({
    tooth_id: null,
    tooth_identifier: null,
    tooth_position: null,
    tooth_name: null
  });

  const { user_name, security_lvl, first_name, last_name } = userCreds;

  // TODO: ya se tiene el paciente seleccionado. Arreglar todos los dientes dependiendo el paciente
  const selectPatientFunc = (patient_id, isAdult, names, last_names) => {
    const patient_obj = {
      patient_id: patient_id,
      isAdult: isAdult,
      names: names,
      last_names: last_names
    }

    setPatient(patient_obj);
    setTooth({
      tooth_id: null,
      tooth_identifier: null,
      tooth_position: null,
      tooth_name: null
    });
  }

  const selectToothFunc = (tooth_id, tooth_name) => {
    // TODO: extraer el historial del diente a traves de la base de datos tomando en cuenta el paciente escogido
    const tooth_obj = {
      tooth_id: tooth_id,
      tooth_name: tooth_name
    }

    setTooth(tooth_obj);
  }

  return (
    <Flex direction="column">
      <PatientList selectPatient={selectPatientFunc}></PatientList>
      <Flex className="patientHistory" direction="column" >
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
            patient.patient_id ?
              <>
                <DentureColors></DentureColors>
                <Denture isAdult={patient.isAdult} selectTooth={selectToothFunc} patientID={patient.patient_id}></Denture>
                <Flex direction="column" justify="center" align="center" width="100%" height="100%">
                  <ToothHistory 
                    toothName={tooth.tooth_name} 
                    toothID={tooth.tooth_id} 
                    patientID={patient.patient_id}
                    
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