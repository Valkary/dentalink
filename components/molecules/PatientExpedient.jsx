import moment from "moment";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

const format_phone = (phone_number) => {
  let formatted_phone = "";

  for(let i = 0; i < phone_number.length; i++) {
    if (i === 0) { formatted_phone += `(${phone_number[i]}` }
    else if (i === 1) { formatted_phone += `${phone_number[i]})` }
    else { formatted_phone += phone_number[i] }
  }

  return formatted_phone;
}

const PatientExpedient = ({ patient_data }) => {
  const keys = Object.keys(patient_data);
  const civil_status_lookup = ["Soltero","Casado","Divorciado","Separación en proceso judicial","Viudo","Concubinato"];

  if(keys.length > 0) {
    const {names,last_names,age,sex,phone,email,address,postal_code,job,house_phone,office_phone,emergency_phone,civil_status,birth_date,prior_illnesses,other_information,emergency_contact} = patient_data;

    const illness_questionare = prior_illnesses === null ? null : Object.entries(prior_illnesses);
    const other_information_questionare = other_information === null ? null : Object.entries(other_information);

    return (
      <Table variant='striped' colorScheme='blue'>
        <Thead>
          <Tr>
            <Th colSpan={2}>Información del paciente</Th>
          </Tr>
          <Tr>
            <Th>Concepto</Th>
            <Th>Informacón</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Nombre completo:</Td>
            <Td>{`${names} ${last_names}`}</Td>
          </Tr>
          <Tr>
            <Td>Edad:</Td>
            <Td>{`${age} años`}</Td>
          </Tr>
          <Tr>
            <Td>Sexo</Td>
            <Td>{ sex === 1 ? "Masculino" : "Femenino" }</Td>
          </Tr>
          <Tr>
            <Td>Teléfono</Td>
            <Td>{format_phone(phone)}</Td>
          </Tr>
          <Tr>
            <Td>Email:</Td>
            <Td>{email}</Td>
          </Tr>
          <Tr>
            <Td>Dirección:</Td>
            <Td>{address}</Td>
          </Tr>
          <Tr>
            <Td>Código postal:</Td>
            <Td>{postal_code}</Td>
          </Tr>
          <Tr>
            <Td>Télefono de casa:</Td>
            <Td>{format_phone(house_phone)}</Td>
          </Tr>
          <Tr>
            <Td>Ocupación:</Td>
            <Td>{job}</Td>
          </Tr>
          <Tr>
            <Td>Télefono del trabajo:</Td>
            <Td>{format_phone(office_phone)}</Td>
          </Tr>
          <Tr>
            <Td>Contacto de emergencia:</Td>
            <Td>{emergency_contact}</Td>
          </Tr>
          <Tr>
            <Td>Télefono de emergencia:</Td>
            <Td>{format_phone(emergency_phone)}</Td>
          </Tr>
          <Tr>
            <Td>Estado civil:</Td>
            <Td>{civil_status_lookup[civil_status]}</Td>
          </Tr>
          <Tr>
            <Td>Fecha de nacimiento:</Td>
            <Td>{moment(birth_date).format("YYYY-MM-DD")}</Td>
          </Tr>
          <Tr>
            <Td>Enfermedades previas:</Td>
            {
              prior_illnesses === null ?
                <Td>Sin enfermedades previas</Td> :
                <Td>
                  <Table variant='striped' colorScheme='gray'>
                    <Thead>
                      <Tr>
                        <Th>Pregunta</Th>
                        <Th>Respuesta</Th>
                        <Th>Especificación</Th>
                      </Tr>
                    </Thead> 
                    <Tbody>
                      {
                        illness_questionare.map(illness => {
                          const { title, specify, has_illness } = illness[1];

                          return (
                            <Tr>
                              <Td>{title}</Td>
                              <Td>{has_illness ? "Si" : "No"}</Td>
                              <Td>{specify === "" ? "Ninguna" : specify}</Td>
                            </Tr>
                          )
                        })
                      }
                    </Tbody>
                  </Table>
                </Td>
            }
          </Tr>
          <Tr>
            <Td>Otra información:</Td>
            {
              other_information === null ?
                <Td>Sin información extra</Td> :
                <Td>
                  <Table variant='striped' colorScheme='gray'>
                    <Thead>
                      <Tr>
                        <Th>Pregunta</Th>
                        <Th>Respuesta</Th>
                        <Th>Especificación</Th>
                      </Tr>
                    </Thead> 
                    <Tbody>
                      {
                        other_information_questionare.map((question, idx) => {
                          const question_object = question[1];
                          const { title } = question_object;

                          switch(idx) {
                            case 0:
                              return (
                                <Tr>
                                  <Td>{title}</Td>
                                  <Td>{question_object.illnesses_names.length > 0 ? "Si" : "No"}</Td>
                                  <Td>{question_object.illnesses_names.join(", ")}</Td>
                                </Tr>
                              );
                            case 1:
                              return (
                                <Tr>
                                  <Td>{title}</Td>
                                  <Td>{question_object.under_treatment ? "Si" : "No"}</Td>
                                  <Td></Td>
                                </Tr>
                              );
                            case 2:
                              return (
                                <Tr>
                                  <Td>{title}</Td>
                                  <Td>{question_object.severe_problems ? "Si" : "No"}</Td>
                                  <Td>{question_object.problems}</Td>
                                </Tr>
                              );
                            case 3:
                              return (
                                <Tr>
                                  <Td>{title}</Td>
                                  <Td>{question_object.taking_drugs ? "Si" : "No"}</Td>
                                  <Td>{question_object.drug}</Td>
                                </Tr>
                              );
                            case 4:
                              return (
                                <Tr>
                                  <Td>{title}</Td>
                                  <Td></Td>
                                  <Td>{question_object.allergy}</Td>
                                </Tr>
                              );
                            case 5: 
                              return (
                                <Tr>
                                  <Td>{title}</Td>
                                  <Td>{question_object.addiction ? "Si" : "No"}</Td>
                                  <Td>
                                    <Table variant='simple'>
                                      <Tbody>
                                        <Tr>
                                          <Td>{question_object.sub_title_1}</Td>
                                          <Td>{question_object.addictions === "" ? "Ninguna" : question_object.addictions}</Td>
                                        </Tr>
                                        <Tr>
                                          <Td>{question_object.sub_title_2}</Td>
                                          <Td>{question_object.smokes ? "Si" : "No"}</Td>
                                        </Tr>
                                        <Tr>
                                          <Td>{question_object.sub_title_3}</Td>
                                          <Td>{question_object.daily_cigarettes}</Td>
                                        </Tr>
                                      </Tbody>
                                    </Table>
                                  </Td>
                                </Tr>
                              );
                          }
                        })
                      }
                    </Tbody>
                  </Table>
                </Td>
            }
          </Tr>
        </Tbody>
      </Table>
    )
  } else {
    return <></>;
  }
}

export default PatientExpedient;