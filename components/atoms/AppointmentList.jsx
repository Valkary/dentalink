import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Flex, Text, Tag } from "@chakra-ui/react";
import moment from "moment";

const AppointmentList = ({}) => {
  const [ dayAppointments, setDayAppointments ] = useState([{}]);
  const [ posteriorAppointments, setPosteriorAppointments ] = useState([{}]);

  useEffect(async () => {
    const day_appointments_req = await (await axios.post('/api/appointments/dayAppointments')).data;
    const posterior_appointments_req = await (await axios.post('/api/appointments/posteriorAppointments')).data;

    setPosteriorAppointments(posterior_appointments_req);
    setDayAppointments(day_appointments_req);
    return;
  }, []);

  const hover_appointment = (e) => {
    e.stopPropagation();
    e.currentTarget.style.transform = "translateX(0.7em)";
    e.currentTarget.style.boxShadow = "0 8px 16px 0 rgba(0,0,0,0.2)";
    e.currentTarget.style.margin = "0.7em 0em";
  };

  const unhover_appointment = (e) => {
    e.stopPropagation();
    e.currentTarget.style.transform = "translateX(0)";
    e.currentTarget.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2)";
    e.currentTarget.style.margin = "0.5em 0 0 0";
  };

  return (
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
                  <Flex direction={"row"} justify={"flex-start"} align={"center"}>
                    <Text pr={"0.3em"} fontWeight={"bold"}>Procedimiento: </Text>
                    <Tag size={"md"} colorScheme={"blue"}>{procedimiento}</Tag>
                  </Flex>
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
                  <Flex direction={"row"} justify={"flex-start"} align={"center"}>
                    <Text pr={"0.3em"} fontWeight={"bold"}>Procedimiento: </Text>
                    <Tag size={"md"} colorScheme={"blue"}>{procedimiento}</Tag>
                  </Flex>
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
  );
};

export default AppointmentList;