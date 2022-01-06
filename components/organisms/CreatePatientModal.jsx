import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Badge,
  Flex
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useState, useReducer } from 'react';
import axios from 'axios';
import { FaUserPlus } from "react-icons/fa";

import CreatePatient from "./CreatePatient";

const formInitialState = {
  names: "",
  last_names: "",
  sex: 1,
  age: "",
  phone: "",
  email: "",
  address: "",
  postal_code: 0,
  job: "",
  house_phone: "",
  office_phone: "",
  emergency_contact: "",
  emergency_phone: "",
  edo_civil: 0,
  birth_date: "",
  prior_illnesses: {},
  other_information: {},
}

const priorIllnessesInitialState = {
  question_1: {
    title: "Fiebre reumática o enfermedad cardiáca reumática",
    has_illness: false,
    specify: ""
  },
  question_2: {
    title: "Enfermedades cardiovasculares",
    has_illness: false,
    specify: ""
  },
  question_3: {
    title: "Mareos, desmayos o ataques",
    has_illness: false,
    specify: ""
  },
  question_4: {
    title: "Diabetes",
    has_illness: false,
    specify: ""
  },
  question_5: {
    title: "Hepatitis",
    has_illness: false,
    specify: ""
  },
  question_6: {
    title: "VIH positivo/SIDA",
    has_illness: false,
    specify: ""
  },
  question_7: {
    title: "Artritis o reumatismo",
    has_illness: false,
    specify: ""
  },
  question_8: {
    title: "Gastritis o úlceras gástricas",
    has_illness: false,
    specify: ""
  },
  question_9: {
    title: "Problemas renales",
    has_illness: false,
    specify: ""
  },
  question_10: {
    title: "Anémia",
    has_illness: false,
    specify: ""
  },
  question_11: {
    title: "Presión arterial alta o baja",
    has_illness: false,
    specify: ""
  },
  question_12: {
    title: "Sangrado anormal con extracciones dentales o cortaduras",
    has_illness: false,
    specify: ""
  },
  question_13: {
    title: "Se le hacen moretones con facilidad",
    has_illness: false,
    specify: ""
  },
  question_14: {
    title: "Ha requerido transfusiones sanguineas",
    has_illness: false,
    specify: ""
  },
  question_15: {
    title: "Otras:",
    has_illness: false,
    specify: ""
  },
}

const extraInformationInitialState = {
  question_1: {
    title: "¿Algún miembro de su familia padece o padeció?",
    illnesses_names: ["Diabetes", "Enfermedades del corazón", "Hipertensión", "Cáncer"],
    has_illnesses: []
  },
  question_2: {
    title: "¿Recibe tratamiento médico actualmente?",
    under_treatment: false,
  },
  question_3: {
    title: "¿A presentado problemas graves relacionados con tratamientos dentales previos?",
    severe_problems: false,
    problems: ""
  },
  question_4: {
    title: "¿Está tomando algún medicamento?",
    taking_drugs: false,
    drug: ""
  },
  question_5: {
    title: "¿Es alérgico a algún medicamento?",
    allergy: ""
  },
  question_6: {
    title: "¿Tiene alguna addicción?",
    addiction: false,
    sub_title_1: "¿Cuál(es)?",
    addictions: "",
    sub_title_2: "¿Fuma?",
    smokes: false,
    sub_title_3: "¿Cuántos cigarrillos al día?",
    daily_cigarettes: 0
  },
}

const formReducer = (state, action) =>  {
  switch(action.type) {
    case 'add_name':
      return { ...state, names: action.payload }
    case 'add_last_names':
      return { ...state, last_names: action.payload }
    case 'set_sex':
      return { ...state, sex: action.payload }
    case 'set_age':
      return { ...state, age: action.payload.slice(0,3) }
    case 'set_phone':
      return { ...state, phone: action.payload.slice(0,10) }
    case 'set_email':
      return { ...state, email: action.payload }
    case 'set_address':
      return { ...state, address: action.payload }
    case 'set_postal_code':
      return { ...state, postal_code: action.payload }
    case 'set_job':
      return { ...state, job: action.payload }
    case 'set_house_phone':
      return { ...state, house_phone: action.payload.slice(0,10) }
    case 'set_office_phone':
      return { ...state, office_phone: action.payload.slice(0,10) }
    case 'set_emergency_contact':
      return { ...state, emergency_contact: action.payload }
    case 'set_emergency_phone':
      return { ...state, emergency_phone: action.payload.slice(0,10) }
    case 'set_edo_civil':
      return { ...state, edo_civil: action.payload }
    case 'set_birth_date':
      return { ...state, birth_date: action.payload }
  }
}

const priorIllnessesReducer = (state, action) => {
  switch(action.type) {
    case 'question_1_has_illness':
      return { ...state, question_1: { ...state.question_1, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_1_specify':
      return { ...state, question_1: { ...state.question_1, specify: action.payload } }
    case 'question_2_has_illness':
      return { ...state, question_2: { ...state.question_2, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_2_specify':
      return { ...state, question_2: { ...state.question_2, specify: action.payload } }
    case 'question_3_has_illness':
      return { ...state, question_3: { ...state.question_3, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_3_specify':
      return { ...state, question_3: { ...state.question_3, specify: action.payload } }
    case 'question_4_has_illness':
      return { ...state, question_4: { ...state.question_4, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_4_specify':
      return { ...state, question_4: { ...state.question_4, specify: action.payload } }
    case 'question_5_has_illness':
      return { ...state, question_5: { ...state.question_5, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_5_specify':
      return { ...state, question_5: { ...state.question_5, specify: action.payload } }
    case 'question_6_has_illness':
      return { ...state, question_6: { ...state.question_6, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_6_specify':
      return { ...state, question_6: { ...state.question_6, specify: action.payload } }
    case 'question_7_has_illness':
      return { ...state, question_7: { ...state.question_7, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_7_specify':
      return { ...state, question_7: { ...state.question_7, specify: action.payload } }
    case 'question_8_has_illness':
      return { ...state, question_8: { ...state.question_8, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_8_specify':
      return { ...state, question_8: { ...state.question_8, specify: action.payload } }
    case 'question_9_has_illness':
      return { ...state, question_9: { ...state.question_9, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_9_specify':
      return { ...state, question_9: { ...state.question_9, specify: action.payload } }
    case 'question_10_has_illness':
      return { ...state, question_10: { ...state.question_10, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_10_specify':
      return { ...state, question_10: { ...state.question_10, specify: action.payload } }
    case 'question_11_has_illness':
      return { ...state, question_11: { ...state.question_11, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_11_specify':
      return { ...state, question_11: { ...state.question_11, specify: action.payload } }
    case 'question_12_has_illness':
      return { ...state, question_12: { ...state.question_12, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_12_specify':
      return { ...state, question_12: { ...state.question_12, specify: action.payload } }
    case 'question_13_has_illness':
      return { ...state, question_13: { ...state.question_13, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_13_specify':
      return { ...state, question_13: { ...state.question_13, specify: action.payload } }
    case 'question_14_has_illness':
      return { ...state, question_14: { ...state.question_14, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_14_specify':
      return { ...state, question_14: { ...state.question_14, specify: action.payload } }
    case 'question_15_has_illness':
      return { ...state, question_15: { ...state.question_15, has_illness: !!parseInt(action.payload, 10) } }
    case 'question_15_specify':
      return { ...state, question_15: { ...state.question_15, specify: action.payload } }
  }
}

const extraInformationReducer = (state, action) => {
  switch (action.type) {
    case 'question_1':
      return { ...state, question_1: { ...state.question_1, has_illnesses: action.payload } }
    case 'question_2':
      return { ...state, question_2: { ...state.question_2,  under_treatment: !!parseInt(action.payload, 10) } }
    case 'question_3_severe_problems':
      return { ...state, question_3: { ...state.question_3,  severe_problems: !!parseInt(action.payload, 10) } }
    case 'question_3_problems':
      return { ...state, question_3: { ...state.question_3,  problems: action.payload } }
    case 'question_4_taking_drugs':
      return { ...state, question_4: { ...state.question_4,  taking_drugs: !!parseInt(action.payload, 10) } }
    case 'question_4_drugs':
      return { ...state, question_4: { ...state.question_4,  drug: action.payload } }
    case 'question_5':
      return { ...state, question_5: { ...state.question_5,  allergy: action.payload } }
    case 'question_6_addiction':
      return { ...state, question_6: { ...state.question_6,  addiction: !!parseInt(action.payload, 10) } }
    case 'question_6_addictions':
      return { ...state, question_6: { ...state.question_6,  addictions: action.payload } }
    case 'question_6_smokes':
      return { ...state, question_6: { ...state.question_6,  smokes: !!parseInt(action.payload, 10) } }
    case 'question_6_daily_cigarettes':
      return { ...state, question_6: { ...state.question_6,  daily_cigarettes: parseInt(action.payload, 10) } }
  }
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const CreatePatientModal = () => {
  // Modal Functionality
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sent, setSent] = useState(false);
  const [sentStatus, setSentStatus] = useState({ error: false, message: "Por enviar" });

  // Reducers
  const [formState, dispatch] = useReducer(formReducer, formInitialState);
  const [priorIllnessesState, setPriorIllnesses] = useReducer(priorIllnessesReducer, priorIllnessesInitialState);
  const [extraInformation, setExtraInformationReducer] = useReducer(extraInformationReducer, extraInformationInitialState);

  // Helpers
  const [validEmail, setValidEmail] = useState(false);

  const sendForm = async (formState, priorIllnesses, extraInformation) => {
    const completeForm = { ...formState, prior_illnesses: priorIllnesses, other_information: extraInformation }
    const post_patient = await (await axios.post('/api/patients/createPatient', { patient_obj: completeForm })).data;

    setSent(true);

    post_patient.warningStatus === 0 ? setSentStatus({ error: false, message: "Agregado" }) : setSentStatus({ error: true, message: "Error al agregar" });
  }

  const validateFullInformation = (information_object) => {
    const entries = Object.entries(information_object);
    let validated = true;
  
    entries.forEach(entry => {
      if (entry[1] === "") validated = false;
      if (entry[0] === "email") validated = validateEmail(entry[1]);
    });
  
    return validated;
  }

  return (
    <>
      <Flex direction="row" justify="flex-end" align="center" width="100%" mr="1rem">
        <Button colorScheme="green" leftIcon={<FaUserPlus />} onClick={onOpen}>Agregar Paciente</Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Forma: Agregar Paciente
            <Badge colorScheme={sentStatus.message === 'Por enviar' ? "gray" : sentStatus.error ? "red" : "green"}>{sentStatus.message}</Badge>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreatePatient 
              sendForm={sendForm} 
              validateFullInformation={validateFullInformation}
              dispatch={dispatch}
              setPriorIllnesses={setPriorIllnesses}
              setExtraInformationReducer={setExtraInformationReducer}
              formState={formState}
              priorIllnessesState={priorIllnessesState}
              validEmail={validEmail}
              setValidEmail={setValidEmail}
              formInitialState={formInitialState}
              priorIllnessesInitialState={priorIllnessesInitialState}
              extraInformationInitialState={extraInformationInitialState}
              validateEmail={validateEmail}
            ></CreatePatient>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button 
              type="button" 
              colorScheme='blue' 
              disabled={!validateFullInformation(formState) || sent}
              onClick={() => sendForm(formState, priorIllnessesState, extraInformation)}
            >Agregar Paciente</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePatientModal;