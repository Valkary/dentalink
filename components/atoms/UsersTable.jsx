import { Flex, Table, Thead, Th, Tr, Td, Tbody, Tfoot, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

const UsersTable = ({ setSelectedUser }) => {
  const [ users, setUsers ] = useState([]);

  useEffect(async () => {
    const get_users_request = await (await axios.post('/api/users/getUsers', {} )).data;
    setUsers(get_users_request);

    return;
  }, []);

  const selectUser = (id, username, security_lvl, first_names, last_names) => {
    setSelectedUser({
      id: id,
      username: username,
      security_lvl: security_lvl,
      first_names: first_names, 
      last_names: last_names
    });
  }

  return (
    <Table variant="striped" colorScheme="blue">
      <Thead>
        <Tr>
          <Th>Usuario</Th>
          <Th isNumeric>Nivel de Seguridad</Th>
          <Th>Nombres</Th>
          <Th>Apellidos</Th>
          <Th isNumeric>Seleccionar</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          users.map(user => {
            const { id, username, security_lvl, first_names, last_names } = user;

            return (
              <Tr>
                <Td>{username}</Td>
                <Td isNumeric>{security_lvl}</Td>
                <Td>{first_names}</Td>
                <Td>{last_names}</Td>
                <Td>
                  <Flex
                    height="100%"
                    width="100%"
                    justify="center"
                    align="center"
                  >
                    <Button 
                      colorScheme="blue"
                      onClick={() => selectUser(id, username, security_lvl, first_names, last_names)}
                    >Seleccionar</Button>
                  </Flex>
                </Td>
              </Tr>
            );
          })
        }
      </Tbody>
    </Table>
  )
};

export default UsersTable;