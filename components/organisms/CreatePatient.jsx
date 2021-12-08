import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { useReducer, useState } from "react";
import { Flex, Text, Stack } from "@chakra-ui/layout";
import { Input, InputGroup } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { InputRightElement, InputLeftAddon } from "@chakra-ui/input";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Radio, RadioGroup } from "@chakra-ui/radio";

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
  prior_illnesses: [],
  family_illnesses: [],
  is_under_treatment: false,
  has_severe_dental_issues: false,
  severe_dental_treatments: "",
  is_taking_drugs: false,
  drugs: "",
  allergies_drugs: "",
  has_addiction: false,
  addiction: "",
  is_smoker: false,
  daily_cigarettes: 0,
  is_pregnant: false,
  gestation_months: 0,
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

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const CreatePatient = ({}) => {
  const [formState, dispatch] = useReducer(formReducer, formInitialState);
  const [validEmail, setValidEmail] = useState(false);
  console.log(formState);
  
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

      <Table variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            <Th colSpan={2}>¿Padece o ha padecido alguna de las siguientes enfermedades?</Th>
            <Th colSpan={1}>Especifique</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Fiebre reumática o enfermedad cardiáca reumática</Td>
            <Td>
              <RadioGroup>
                <Stack direction='row'>
                  <Radio value='1'>Si</Radio>
                  <Radio value='2'>No</Radio>
                </Stack>
              </RadioGroup>
            </Td>
            <Td>
              <Input type="text" variant="flushed" placeholder="Especifique"></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>Enfermedades cardiovasculares</Td>
            <Td>
              <RadioGroup>
                <Stack direction='row'>
                  <Radio value='1'>Si</Radio>
                  <Radio value='2'>No</Radio>
                </Stack>
              </RadioGroup>
            </Td>
            <Td>
              <Input type="text" variant="flushed" placeholder="Especifique"></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>Mareos, desmayos o ataques</Td>
            <Td>
              <RadioGroup>
                <Stack direction='row'>
                  <Radio value='1'>Si</Radio>
                  <Radio value='2'>No</Radio>
                </Stack>
              </RadioGroup>
            </Td>
            <Td>
              <Input type="text" variant="flushed" placeholder="Especifique"></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>Diabetes</Td>
            <Td>
              <RadioGroup>
                <Stack direction='row'>
                  <Radio value='1'>Si</Radio>
                  <Radio value='2'>No</Radio>
                </Stack>
              </RadioGroup>
            </Td>
            <Td>
              <Input type="text" variant="flushed" placeholder="Especifique"></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>Hepatitis</Td>
            <Td>
              <RadioGroup>
                <Stack direction='row'>
                  <Radio value='1'>Si</Radio>
                  <Radio value='2'>No</Radio>
                </Stack>
              </RadioGroup>
            </Td>
            <Td>
              <Input type="text" variant="flushed" placeholder="Especifique"></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>VIH positivo/SIDA</Td>
            <Td>
              <RadioGroup>
                <Stack direction='row'>
                  <Radio value='1'>Si</Radio>
                  <Radio value='2'>No</Radio>
                </Stack>
              </RadioGroup>
            </Td>
            <Td>
              <Input type="text" variant="flushed" placeholder="Especifique"></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>Artritis o reumatismo</Td>
            <Td>
              <RadioGroup>
                <Stack direction='row'>
                  <Radio value='1'>Si</Radio>
                  <Radio value='2'>No</Radio>
                </Stack>
              </RadioGroup>
            </Td>
            <Td>
              <Input type="text" variant="flushed" placeholder="Especifique"></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>Gastritis o úlceras gástricas</Td>
            <Td>
              <RadioGroup>
                <Stack direction='row'>
                  <Radio value='1'>Si</Radio>
                  <Radio value='2'>No</Radio>
                </Stack>
              </RadioGroup>
            </Td>
            <Td>
              <Input type="text" variant="flushed" placeholder="Especifique"></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>Problemas renales</Td>
            <Td>
              <RadioGroup>
                <Stack direction='row'>
                  <Radio value='1'>Si</Radio>
                  <Radio value='2'>No</Radio>
                </Stack>
              </RadioGroup>
            </Td>
            <Td>
              <Input type="text" variant="flushed" placeholder="Especifique"></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>Anémia</Td>
            <Td>
              <RadioGroup>
                <Stack direction='row'>
                  <Radio value='1'>Si</Radio>
                  <Radio value='2'>No</Radio>
                </Stack>
              </RadioGroup>
            </Td>
            <Td>
              <Input type="text" variant="flushed" placeholder="Especifique"></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>Presión arterial alta o baja</Td>
            <Td>
              <RadioGroup>
                <Stack direction='row'>
                  <Radio value='1'>Si</Radio>
                  <Radio value='2'>No</Radio>
                </Stack>
              </RadioGroup>
            </Td>
            <Td>
              <Input type="text" variant="flushed" placeholder="Especifique"></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>Sangrado anormal con extracciones dentales o cortaduras</Td>
            <Td>
              <RadioGroup>
                <Stack direction='row'>
                  <Radio value='1'>Si</Radio>
                  <Radio value='2'>No</Radio>
                </Stack>
              </RadioGroup>
            </Td>
            <Td>
              <Input type="text" variant="flushed" placeholder="Especifique"></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>Se le hacen moretones con facilidad</Td>
            <Td>
              <RadioGroup>
                <Stack direction='row'>
                  <Radio value='1'>Si</Radio>
                  <Radio value='2'>No</Radio>
                </Stack>
              </RadioGroup>
            </Td>
            <Td>
              <Input type="text" variant="flushed" placeholder="Especifique"></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>Ha requerido transfusiones sanguineas</Td>
            <Td>
              <RadioGroup>
                <Stack direction='row'>
                  <Radio value='1'>Si</Radio>
                  <Radio value='2'>No</Radio>
                </Stack>
              </RadioGroup>
            </Td>
            <Td>
              <Input type="text" variant="flushed" placeholder="Especifique"></Input>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Flex>
  )
}

export default CreatePatient;