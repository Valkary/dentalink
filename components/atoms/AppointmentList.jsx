import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Flex, Text, Tag, Grid, GridItem, Button, ScaleFade } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import moment from "moment";
import { MdDeleteForever } from 'react-icons/md';

const AppointmentList = ({}) => {
  const [ dayAppointments, setDayAppointments ] = useState([{}]);
  const [ posteriorAppointments, setPosteriorAppointments ] = useState([{}]);
  const [ showDeleteBtn, setShowDeleteBtn ] = useState(false);
  const [ deletedAppointment, setDeletedAppointment ] = useState("");

  const [ isOpen, setIsOpen ] = useState(false);
  const [ currAppointent, setCurrAppointment ] = useState({ id: 0, procedure: "", patient: "", })
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  useEffect(async () => {
    const day_appointments_req = await (await axios.post('/api/appointments/dayAppointments')).data;
    const posterior_appointments_req = await (await axios.post('/api/appointments/posteriorAppointments')).data;

    setPosteriorAppointments(posterior_appointments_req);
    setDayAppointments(day_appointments_req);
    return;
  }, [deletedAppointment]);

  const hover_appointment = (e) => {
    e.stopPropagation();
    e.currentTarget.style.transform = "translateX(0.7em)";
    e.currentTarget.style.boxShadow = "0 8px 16px 0 rgba(0,0,0,0.2)";
    e.currentTarget.style.margin = "0.7em 0em";
    setShowDeleteBtn(true);
  };
  
  const unhover_appointment = (e) => {
    e.stopPropagation();
    e.currentTarget.style.transform = "translateX(0)";
    e.currentTarget.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2)";
    e.currentTarget.style.margin = "0.5em 0 0 0";
    setShowDeleteBtn(false);
  };

  const delete_appointment = (id, procedure, patient) => {
    setIsOpen(true);
    setCurrAppointment({ id: id, procedure: procedure, patient: patient });
  };

  const request_appointment_deletion = async (id) => {
    console.log("here")
    const req_deletion = await (await axios.post('/api/appointments/deleteAppointment', { id: id })).data;
    onClose();
    setDeletedAppointment(req_deletion);
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              ¿Eliminar cita para {currAppointent.patient} de {currAppointent.procedure} ?
            </AlertDialogHeader>

            <AlertDialogBody>
              Esto eliminará la cita de manera permanente de la base de datos
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={() => request_appointment_deletion(currAppointent.id)} ml={3} leftIcon={<MdDeleteForever/>}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>


      <Flex direction={"column"}>
        <Flex direction={"row"} justify={"flex-start"} align={"center"} width={"100%"}>
          <Flex
            height={"3px"}
            background={"blue.500"}
            flexGrow={1}
          ></Flex>
          <Text
            pl={"1em"}
            pr={"1em"}
            fontWeight={"bold"}
            fontSize={"xl"}
          >
            Citas para el día de hoy
          </Text>
          <Flex
            height={"3px"}
            background={"blue.500"}
            flexGrow={1}
          ></Flex>
        </Flex>
        {
          dayAppointments.length === 0 ? 
            <Flex direction={"column"} justify={"center"} align={"center"} height={"100%"} width={"100%"}>
              <Text fontSize={"md"} fontStyle={"italic"}>Nada programado para hoy...</Text>
            </Flex> :
            dayAppointments.map(appointment => {
              const { id, start_time, end_time, cost, names, last_names, procedimiento } = appointment;
              
              if(typeof id !== "undefined") {
                const formatted_start = start_time.slice(0, -3);
                const formatted_end = end_time.slice(0, -3);

                return (
                  <Flex 
                    key={id} 
                    direction={"column"} 
                    justify={"flex-start"} 
                    align={"flex-start"}

                    border={"thin solid"}
                    borderLeft={"thick solid"}
                    borderLeftColor={"blue.500"}

                    p={"0.5em 1em"}
                    marginTop={"0.5em"}

                    boxShadow={"0 4px 8px 0 rgba(0,0,0,0.2)"}
                    borderRadius={"0.2em"}
                    transition={"0.3s ease-in-out"}
                    onMouseEnter={(e) => hover_appointment(e)}
                    onMouseLeave={(e) => unhover_appointment(e)}
                  >
                    <Grid
                      templateColumns={"90% 10%"}
                      width={"100%"}
                    >
                      <GridItem
                        colStart={1}
                        colSpan={1}
                      >
                        <Flex direction={"row"} justify={"flex-start"} align={"center"}>
                          <Text pr={"0.3em"} fontWeight={"bold"}>Procedimiento: </Text>
                          <Tag size={"md"} colorScheme={"blue"}>{procedimiento}</Tag>
                        </Flex>
                      </GridItem>
                      <GridItem
                        colStart={2}
                        colSpan={1}
                      >
                        <ScaleFade in={showDeleteBtn}>
                          <Button colorScheme={"red"} size={"md"} onClick={() => delete_appointment(id, procedimiento, (names + " " + last_names))}>
                            <MdDeleteForever />
                          </Button>
                        </ScaleFade>
                      </GridItem>
                    </Grid>
                    <Flex direction={"row"} justify={"flex-start"} align={"center"}>
                      <Text pr={"0.3em"} fontWeight={"bold"}>Paciente:</Text>
                      <Text>{names} {last_names}</Text>
                    </Flex>
                    <Flex direction={"row"} justify={"flex-start"} align={"center"}>
                      <Text pr={"0.3em"} fontWeight={"bold"}>Inicio:</Text>
                      <Text>{formatted_start}</Text>
                    </Flex>
                    <Flex direction={"row"} justify={"flex-start"} align={"center"}>
                      <Text pr={"0.3em"} fontWeight={"bold"}>Fin:</Text>
                      <Text>{formatted_end}</Text>
                    </Flex>
                    <Flex direction={"row"} justify={"flex-start"} align={"center"}>
                      <Text color={"green.600"} fontWeight={"bold"}>Costo: ${cost}</Text>
                    </Flex>
                  </Flex>
                );
              }
            })
        }

        <Flex direction={"row"} justify={"flex-start"} align={"center"} width={"100%"} mt={"1rem"}>
          <Flex
            height={"3px"}
            background={"blue.500"}
            flexGrow={1}
          ></Flex>
          <Text
            pl={"1em"}
            pr={"1em"}
            fontWeight={"bold"}
            fontSize={"xl"}
          >
            Citas posteriores
          </Text>
          <Flex
            height={"3px"}
            background={"blue.500"}
            flexGrow={1}
          ></Flex>
        </Flex>
        {
          posteriorAppointments.length === 0 ? 
            <Flex direction={"column"} justify={"center"} align={"center"} height={"100%"} width={"100%"}>
              <Text fontSize={"md"} fontStyle={"italic"}>Nada programado para futuras fechas...</Text>
            </Flex> :
            posteriorAppointments.map(appointment => {
              const { id, date, start_time, end_time, cost, names, last_names, procedimiento } = appointment;
              
              if(typeof id !== "undefined") {
                const formatted_start = start_time.slice(0, -3);
                const formatted_end = end_time.slice(0, -3);
                const formatted_date = moment(date).format("DD-MM-YYYY");

                return (
                  <Flex 
                    key={id} 
                    direction={"column"} 
                    justify={"flex-start"} 
                    align={"flex-start"}

                    border={"thin solid"}
                    borderLeft={"thick solid"}
                    borderLeftColor={"blue.500"}

                    p={"0.5em 1em"}
                    marginTop={"0.5em"}

                    boxShadow={"0 4px 8px 0 rgba(0,0,0,0.2)"}
                    borderRadius={"0.2em"}
                    transition={"0.3s ease-in-out"}
                    onMouseEnter={(e) => hover_appointment(e)}
                    onMouseLeave={(e) => unhover_appointment(e)}
                  >
                    <Grid
                      templateColumns={"90% 10%"}
                      width={"100%"}
                    >
                      <GridItem
                        colStart={1}
                        colSpan={1}
                      >
                        <Flex direction={"row"} justify={"flex-start"} align={"center"}>
                          <Text pr={"0.3em"} fontWeight={"bold"}>Procedimiento: </Text>
                          <Tag size={"md"} colorScheme={"blue"}>{procedimiento}</Tag>
                        </Flex>
                      </GridItem>
                      <GridItem
                        colStart={2}
                        colSpan={1}
                      >
                        <ScaleFade in={showDeleteBtn}>
                          <Button colorScheme={"red"} size={"md"} onClick={() => delete_appointment(id, procedimiento, (names + " " + last_names))}>
                            <MdDeleteForever />
                          </Button>
                        </ScaleFade>
                      </GridItem>
                    </Grid>
                    <Flex direction={"row"} justify={"flex-start"} align={"center"}>
                      <Text pr={"0.3em"} fontWeight={"bold"}>Paciente:</Text>
                      <Text>{names} {last_names}</Text>
                    </Flex>
                    <Flex direction={"row"} justify={"flex-start"} align={"center"}>
                      <Text pr={"0.3em"} fontWeight={"bold"}>Fecha:</Text>
                      <Text>{formatted_date}</Text>
                    </Flex>
                    <Flex direction={"row"} justify={"flex-start"} align={"center"}>
                      <Text pr={"0.3em"} fontWeight={"bold"}>Inicio:</Text>
                      <Text>{formatted_start}</Text>
                    </Flex>
                    <Flex direction={"row"} justify={"flex-start"} align={"center"}>
                      <Text pr={"0.3em"} fontWeight={"bold"}>Fin:</Text>
                      <Text>{formatted_end}</Text>
                    </Flex>
                    <Flex direction={"row"} justify={"flex-start"} align={"center"}>
                      <Text color={"green.600"} fontWeight={"bold"}>Costo: ${cost}</Text>
                    </Flex>
                  </Flex>
                );
              }
            })
        }
      </Flex>
    </>
  );
};

export default AppointmentList;