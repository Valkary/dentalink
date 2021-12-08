import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex
} from '@chakra-ui/react';
import moment from 'moment';

const ToothHistoryTable = ({ children }) => {

  return (
    <Table variant='striped' colorScheme="blue" size="lg">
      <Thead>
        <Tr>
          <Th>Fecha</Th>
          <Th>Descripción</Th>
          <Th>Procedimiento</Th>
          <Th>Estado</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          children.map((row, idx) => {
            const date = moment(row.date).format("DD/MM/YYYY");
            
            return (
              <Tr key={`row_${idx}`}>
                <Td>{date}</Td>
                <Td>{row.description}</Td>
                <Td>{row.name}</Td>
                <Td isNumeric>
                  <Flex direction="column" width="100%" height="100%" justify="center" align="center">
                    <Box backgroundColor={row.color} height="2em" width="2em" borderRadius="0.2em" m="0"></Box>
                  </Flex>
                </Td>
              </Tr>
            );
          })
        }        
      </Tbody>
    </Table>
  );
}

export default ToothHistoryTable;