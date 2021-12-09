import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Stack, Input } from '@chakra-ui/react';

const PriorIllnessesTable = ({ children, setPriorIllnesses }) => {
  const childrenKeys = Object.keys(children);
  const childrenEntries = Object.entries(children);
  
  return (
    <Table variant="striped" colorScheme="blue">
      <Thead>
        <Tr>
          <Th colSpan={2}>¿Padece o ha padecido alguna de las siguientes enfermedades?</Th>
          <Th colSpan={1}>Especifique</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          childrenEntries.map((illness, idx) => {
            return (
              <Tr key={`illness_row_${childrenKeys[idx]}`}>
                <Td>{illness[1].title}</Td>
                <Td>
                  <RadioGroup onChange={e => setPriorIllnesses({ type: `${childrenKeys[idx]}_has_illness`, payload: e })}>
                    <Stack direction='row'>
                      <Radio value='1'>Si</Radio>
                      <Radio value='0'>No</Radio>
                    </Stack>
                  </RadioGroup>
                </Td>
                <Td>
                  <Input 
                    type="text" 
                    variant="flushed" 
                    placeholder="Especifique" 
                    onChange={e => setPriorIllnesses({ type: `${childrenKeys[idx]}_specify`, payload: e.target.value })}
                  ></Input>
                </Td>
              </Tr>
            );
          })
        }
      </Tbody>
    </Table>
  )
}

export default PriorIllnessesTable;