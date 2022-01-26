import { Button, Flex, Grid, GridItem, HStack, VStack } from "@chakra-ui/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
  import CreatePatientModal from "../organisms/CreatePatientModal";
  import AddHistoryModal from "../molecules/AddHistoryModal";
import HistoryImages from "../molecules/HistoryImages";
// </CustomComponets>

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
  const [ updatedId, setUpdatedId ] = useState(0);

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
      templateRows="[title] 5vh [lista-pacientes] auto [informacion-paciente] auto [dentadura-paciente] auto"
      gap={2}
      pl="1rem"
      pr="1rem"
      width="95vw"
    >
      <GridItem
        colStart={1}
        colEnd={3}
        rowStart={1}
        rowEnd={2}
      >
        <Flex direction="row" justify="flex-start" align="center" pt="0.5rem">
          <div className="ten">
            <h1>Pacientes</h1>
          </div>
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
          <CreatePatientModal></CreatePatientModal>
        </Flex>

        {showPatientsTable ?
          <Flex
            direction="column"
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

          {
          showPatientDenture &&
            <Flex direction="column" pt="1.5rem" background="gray.50" minHeight="80vh" height="100%">
              <VStack spacing={4} width="100%">
                <DentureColors></DentureColors>
                <Denture selectTooth={selectToothFunc} patientID={patient.id} updatedID={updatedId}></Denture>
              </VStack>
              <Grid
                pl="2rem"
                pr="2rem"
                templateColumns="[denture] 4fr [appointments] 1fr"
                columnGap={2}
                pt="3rem"
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
                      updatedID={updatedId}
                    ></ToothHistoryTable>
                    <HistoryImages patient={patient}/>
                  </Flex>
                </GridItem>
                
                <GridItem
                  colStart={2}
                  colSpan={1}
                >
                  <VStack spacing={2}>
                    <Flex direction="row" justify="center" align="center" width="100%">
                      <AddHistoryModal patient_id={patient.id} tooth_id={tooth.tooth_id} setUpdatedId={setUpdatedId}></AddHistoryModal>
                      <AppointmentModal patient={patient} procedures={procedures}></AppointmentModal>
                    </Flex>
                    <PatientAppointments patient_id={patient.id} updatedID={updatedId}></PatientAppointments>
                  </VStack>
                </GridItem>
              </Grid>
            </Flex>
          }
        </GridItem> :
        <></>}
    </Grid>
  );
}

export default Patients;