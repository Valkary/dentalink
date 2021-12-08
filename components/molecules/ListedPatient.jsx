import { ListItem, ListIcon, Flex, Text, Grid } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { IoPersonSharp } from "react-icons/io5";

const ListedPatient = ({ names, last_names, phone, email, patient_id, selectPatient, isAdult }) => {

  return (
    <ListItem>
      <Grid templateColumns="1fr repeat(4, 4fr) 5fr">
        <ListIcon as={IoPersonSharp} color="green.500" />
        <Flex direction="row" pr="1em" pd="1em">
          <Text pr="1em">Nombre(s):</Text>
          <Text>{names}</Text>
        </Flex>
        <Flex direction="row" pr="1em" pd="1em">
          <Text pr="1em">Apellidos:</Text>
          <Text>{last_names}</Text>
        </Flex>
        <Flex direction="row" pr="1em" pd="1em">
          <Text pr="1em">No. Telefono:</Text>
          <Text>{phone}</Text>
        </Flex>
        <Flex direction="row" pr="1em" pd="1em">
          <Text pr="1em">Email:</Text>
          <Text>{email}</Text>
        </Flex>
        <Button
          onClick={() => selectPatient(patient_id, isAdult, names, last_names)}
        >Escoger</Button>
      </Grid>
    </ListItem>
  );
}

export default ListedPatient;