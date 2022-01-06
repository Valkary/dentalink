import { Flex } from "@chakra-ui/layout";
import { Input, InputGroup } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { InputRightElement, InputLeftAddon } from "@chakra-ui/input";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import PriorIllnessesTable from "../molecules/PriorIllnessesTable";
import ExtraInformation from "../molecules/ExtraInformation";

const CreatePatient = ({ dispatch, setPriorIllnesses, setExtraInformationReducer, formState, priorIllnessesState, validEmail, setValidEmail, formInitialState, priorIllnessesInitialState, extraInformationInitialState, validateEmail }) => {
  return (
    <Flex direction="column" align="center" justify="center" width="100%">
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
          <Select variant="flushed" value={formState.edo_civil} onChange={e => dispatch({ type: "set_edo_civil", payload: e.target.value })}>
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
        <ExtraInformation 
          children={extraInformationInitialState}
          setExtraInformationReducer={setExtraInformationReducer}
        ></ExtraInformation>
    </Flex>
  )
}

export default CreatePatient;