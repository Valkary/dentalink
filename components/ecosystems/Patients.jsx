import { Button, Flex, Grid, GridItem, VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowForward } from "react-icons/io";

import { useState, useEffect } from "react";
import axios from "axios";

// <CustomComponets>
  import PatientTable from "../molecules/PatientTable";
  import PatientSelector from "../molecules/PatientSelector";
  import DentureColors from "../atoms/DentureColors";
  import Denture from "../molecules/Denture";
  import PatientExpedient from "../molecules/PatientExpedient";
  import AppointmentModal from "../molecules/AppointmentModal";
import PatientAppointments from "../atoms/PatientAppointments";
import ToothHistoryTable from "../molecules/ToothHistoryTable";
// </CustomComponets>

/*
  TODO:
    [*] hacer la peticion de lista de pacientes en este componente y no la tabla de pacientes
    [*] hacer que el componente del selector de pacientes y el de tabla de pacientes se comuniquen entre si y compartan estado
*/

function Patients({ userCreds }) {
  const [ showPatientsTable, setShowPatientsTable ] = useState(true);
  const [ showPatientInfo, setShowPatientInfo ] = useState(true);
  const [ showPatientDenture, setShowPatientDenture ] = useState(true);
  const [ patient, setPatient ] = useState({});
  const [ patients, setPatients ] = useState([]);
  const [ procedures, setProcedures ] = useState([]);
  const [ tooth, setTooth ] = useState({
    tooth_id: null,
    tooth_name: null
  });

  const { user_name, security_lvl, first_name, last_name } = userCreds;

  useEffect(async () => {
    const getAllPatients = await (await axios.post('/api/patients/getAllPatients')).data;
    const getAllProcedures = await (await axios.post('/api/teeth/getProcedures')).data;

    setProcedures(getAllProcedures);
    setPatients(getAllPatients);
  }, []);

  const selectPatientFunc = async (patient_id) => {
    const patient_data = await (await axios.post('/api/patients/getPatientData', { patientID: patient_id })).data;

    setPatient(patient_data);
    setTooth({
      tooth_id: null,
      tooth_name: null
    });
  };

  const selectToothFunc = (tooth_id, tooth_name) => {
    const tooth_obj = {
      tooth_id: tooth_id,
      tooth_name: tooth_name
    };

    setTooth(tooth_obj);
  };

  return (
    <Grid
      templateColumns="75% 25%"
      templateRows="[titulo] 5vh [lista-pacientes] auto [informacion-paciente] auto [dentadura-paciente] auto"
      gap={2}
    >
      <GridItem
        colStart={1}
        colEnd={3}
        rowStart={1}
        rowEnd={2}
      >
        <Flex direction="row" justify="center" align="center">
          <Text fontSize="3xl">Pacientes</Text>
        </Flex>
      </GridItem>
      <GridItem
        colStart={1}
        colEnd={3}
        rowStart={2}
        rowEnd={3}
      >
        <Flex pl="2rem" direction="row" justify="flex-start" align="center" width="100%" background="gray.100">
          <strong style={{ paddingBottom: "0.1em" }}>Paciente:</strong>
          <PatientSelector selectPatient={selectPatientFunc} currentPatient={patient.id}></PatientSelector>
        </Flex>

        <Flex pl="1rem" direction="row" justify="flex-start" align="center" width="100%" background="gray.100">
          <Button leftIcon={showPatientsTable ? <IoIosArrowUp /> : <IoIosArrowDown />} onClick={() => setShowPatientsTable(!showPatientsTable)}>
            {showPatientsTable ?
              "Cerrar tabla de pacientes" :
              "Abrir tabla de pacientes"}
          </Button>
        </Flex>

        {showPatientsTable ?
          <Flex
            direction="column"
            maxW="100%"
            maxH="100%"
          >
            <PatientTable selectPatient={selectPatientFunc} patients={patients} procedures={procedures}></PatientTable>
          </Flex>
          :
          <></>}
      </GridItem>

      {patient.id ?
        <GridItem
          colStart={1}
          colEnd={3}
          rowStart={3}
          rowEnd={4}
        >
          <Flex pl="1rem" direction="row" justify="flex-start" align="center" width="100%" background="gray.100">
            <Button leftIcon={showPatientInfo ? <IoIosArrowUp /> : <IoIosArrowDown />} onClick={() => setShowPatientInfo(!showPatientInfo)}>
              {showPatientInfo ?
                `Cerrar información del paciente: ${patient.names} ${patient.last_names}` :
                `Abrir información del paciente: ${patient.names} ${patient.last_names}`}
            </Button>
          </Flex>

          {showPatientInfo ?
            <Flex
              direction="column"
              maxW="100%"
              maxH="100%"
            >
              <PatientExpedient patient_data={patient}></PatientExpedient>
            </Flex>
            :
            <></>}
        </GridItem> :
        <></>}

      {patient.id ?
        <GridItem
          colStart={1}
          colEnd={3}
          rowStart={4}
          rowEnd={5}
        >
          <Flex pl="1rem" direction="row" justify="flex-start" align="center" width="100%" background="gray.100">
            <Button leftIcon={showPatientDenture ? <IoIosArrowUp /> : <IoIosArrowDown />} onClick={() => setShowPatientDenture(!showPatientDenture)}>
              {showPatientDenture ?
                `No mostrar dentadura del paciente: ${patient.names} ${patient.last_names}` :
                `Mostrar dentadura del paciente: ${patient.names} ${patient.last_names}`}
            </Button>
          </Flex>

          {showPatientDenture ?
            <Flex direction="column" pt="1.5rem">
              <DentureColors></DentureColors>
              <Denture selectTooth={selectToothFunc} patientID={patient.id}></Denture>
              <Grid
                pl="2rem"
                pr="2rem"
                templateColumns="[denture] 4fr [appointments] 1fr"
                columnGap={2}
              >
                <GridItem
                  colStart={1}
                  colSpan={1}
                >
                  <Flex direction="column" width="100%" height="100%" justify="start" align="start">
                    <ToothHistoryTable
                      toothName={tooth.tooth_name}
                      toothID={tooth.tooth_id}
                      patientID={patient.id}
                    ></ToothHistoryTable>
                  </Flex>
                </GridItem>
                
                <GridItem
                  colStart={2}
                  colSpan={1}
                >
                  <VStack spacing={2}>
                    <AppointmentModal patient={patient} procedures={procedures}></AppointmentModal>
                    <PatientAppointments patient_id={patient.id}></PatientAppointments>
                  </VStack>
                </GridItem>
              </Grid>
            </Flex> :
            <></>}
        </GridItem> :
        <></>}
    </Grid>
  );
}

export default Patients;