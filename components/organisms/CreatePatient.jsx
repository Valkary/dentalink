import { useReducer, useState } from "react";
import { Flex, Text } from "@chakra-ui/layout";
import { Input, InputGroup } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { InputRightElement, InputLeftAddon } from "@chakra-ui/input";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import PriorIllnessesTable from "../molecules/PriorIllnessesTable";
import ExtraInformation from "../molecules/ExtraInformation";

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
  edo_civil: "",
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
    has_illnesses: [false, false, false, false],
  },
  question_2: {
    title: "¿Recibe tratamiento médico actualmente?",
    under_treatment: false,
  },
  question_3: {
    title: "¿A presentado problemas graves relacionados con tratamientos dentales previos?",
    under_treatment: false,
    problems: ""
  },
  question_4: {
    title: "¿Está tomando algún medicamento?",
    under_treatment: false,
    drug: ""
  },
  question_5: {
    title: "¿Es alérgico a algún medicamento?",
    allergy: ""
  },
  question_6: {
    title: "¿Tiene alguna addicción?",
    addiction: false,
    sub_title_1: "¿Cuál?",
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

  }
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const CreatePatient = ({}) => {
  const [formState, dispatch] = useReducer(formReducer, formInitialState);
  const [priorIllnessesState, setPriorIllnesses] = useReducer(priorIllnessesReducer, priorIllnessesInitialState);
  const [extraInformation, setExtraInformationReducer] = useReducer(extraInformationReducer, extraInformationInitialState);
  
  const [validEmail, setValidEmail] = useState(false);

  console.log(extraInformation);
  
  return (
    <Flex direction="column" align="center" justify="center" width="100%">
      <Text>Agregar Paciente</Text>
      <Flex direction="row" width="100%">
        <InputGroup>
          <InputLeftAddon children="Nombre(s):"></InputLeftAddon>
          <Input 
            variant='flushed' 
            placeholder='Nombre(s) del paciente' 
            onChange={e => dispatch({ type: "add_name", payload: e.target.value })}
          />
          <InputLeftAddon children="Apellidos:"></InputLeftAddon>
          <Input 
            variant='flushed' 
            placeholder='Apellidos del paciente' 
            onChange={e => dispatch({ type: "add_last_names", payload: e.target.value })}
          />
        </InputGroup>
      </Flex>
      <Flex direction="row" align="center" justify="center" width="100%">
        <InputGroup>
          <InputLeftAddon children="Sexo:"></InputLeftAddon>
          <Select variant="flushed" onChange={e => dispatch({ type: "set_sex", payload: e.target.value })}>
            <option value={0}>Hombre</option>
            <option value={1}>Mujer</option>
          </Select>
          <InputLeftAddon children="Edad:"></InputLeftAddon>
          <Input 
            variant='flushed' 
            placeholder='Edad'
            type="number" 
            value={formState.age}
            onChange={e => dispatch({ type: "set_age", payload: e.target.value })}
          />
          <InputLeftAddon children="Teléfono:"></InputLeftAddon>
          <Input 
            variant='flushed' 
            placeholder='Teléfono'
            type="tel" 
            value={formState.phone}
            onChange={e => dispatch({ type: "set_phone", payload: e.target.value })}
          />
        </InputGroup>
      </Flex>
      <Flex direction="row" align="center" justify="center" width="100%">
        <InputGroup>
          <InputLeftAddon children="Email:"></InputLeftAddon>
          <Input 
            variant='flushed' 
            placeholder='Email'
            type="text"
            isInvalid={!validEmail}
            errorBorderColor="red.300"
            value={formState.email}
            onChange={e => {
                setValidEmail(validateEmail(e.target.value))
                dispatch({ type: "set_email", payload: e.target.value })
              }}
          />
          <InputRightElement 
            children={
              validEmail ?
                <CheckIcon color='green.500' /> :
                <CloseIcon color='red.500' />
            } 
          />
        </InputGroup>
      </Flex>
      <Flex direction="row" align="center" justify="center" width="100%">
        <InputGroup>
            <InputLeftAddon children="Direccion:"></InputLeftAddon>
            <Input 
              variant='flushed' 
              placeholder='Direccion' 
              onChange={e => dispatch({ type: "set_address", payload: e.target.value })}
            />
            <InputLeftAddon children="CP:"></InputLeftAddon>
            <Input 
              variant='flushed' 
              placeholder='Edad'
              type="number" 
              value={formState.postal_code}
              onChange={e => dispatch({ type: "set_postal_code", payload: e.target.value })}
            />
        </InputGroup>
      </Flex>
      <Flex direction="row" align="center" justify="center" width="100%">
        <InputGroup>
            <InputLeftAddon children="Ocupación: "></InputLeftAddon>
            <Input 
              variant='flushed' 
              placeholder='Ocupación' 
              onChange={e => dispatch({ type: "set_job", payload: e.target.value })}
            />
            <InputLeftAddon children="Tel. casa:"></InputLeftAddon>
            <Input 
              variant='flushed' 
              placeholder='Teléfono casa'
              type="number" 
              value={formState.house_phone}
              onChange={e => dispatch({ type: "set_house_phone", payload: e.target.value })}
            />
            <InputLeftAddon children="Tel. trabajo:"></InputLeftAddon>
            <Input 
              variant='flushed' 
              placeholder='Teléfono trabajo'
              type="number" 
              value={formState.office_phone}
              onChange={e => dispatch({ type: "set_office_phone", payload: e.target.value })}
            />
        </InputGroup>
      </Flex>
      <Flex direction="row" width="100%">
        <InputGroup>
          <InputLeftAddon children="Contacto de emergencia:"></InputLeftAddon>
          <Input 
            variant='flushed' 
            placeholder='Nombre(s) del paciente' 
            onChange={e => dispatch({ type: "set_emergency_contact", payload: e.target.value })}
          />
          <InputLeftAddon children="Número de emergencia:"></InputLeftAddon>
          <Input 
            variant='flushed' 
            placeholder='Teléfono trabajo'
            type="number" 
            value={formState.emergency_phone}
            onChange={e => dispatch({ type: "set_emergency_phone", payload: e.target.value })}
          />
        </InputGroup>
      </Flex>
      <Flex direction="row" width="100%">
        <InputGroup>
          <InputLeftAddon children="Estado civil:"></InputLeftAddon>
          <Select variant="flushed" onChange={e => dispatch({ type: "set_edo_civil", payload: e.target.value })}>
            <option value={0}>Soltero</option>
            <option value={1}>Casado</option>
            <option value={2}>Divorciado</option>
            <option value={3}>Separación en proceso judicial</option>
            <option value={4}>Viudo</option>
            <option value={5}>Concubinato</option>
          </Select>
          <InputLeftAddon children="Fecha de nacimiento:"></InputLeftAddon>
          <Input 
            variant='flushed' 
            placeholder='Teléfono trabajo'
            type="date" 
            value={formState.birth_date}
            onChange={e => dispatch({ type: "set_birth_date", payload: e.target.value })}
          />
        </InputGroup>
      </Flex>
        <PriorIllnessesTable 
          children={priorIllnessesInitialState} 
          priorIllnessesState={priorIllnessesState} 
          setPriorIllnesses={setPriorIllnesses}
        ></PriorIllnessesTable>
        <ExtraInformation children={extraInformationInitialState}></ExtraInformation>
    </Flex>
  )
}

export default CreatePatient;