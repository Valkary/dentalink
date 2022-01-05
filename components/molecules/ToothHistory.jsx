import { Flex, Text, Box, List } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import ToothHistoryTable from "./ToothHistoryTable";

const ToothHistory = ({ toothName, toothID, patientID }) => {
  const [toothHistory, setToothHistory] = useState([{}]);
  
  useEffect(async () => {
    const getToothHistory = await (await axios.post("/api/teeth/toothHistory", { tooth_id: toothID, patient_id: patientID })).data;
    setToothHistory(getToothHistory);
  }, [toothID, patientID]);

  return (
    <Flex direction="column" height="100%" width="60%">
      <Flex direction="row" width="100%">
        <Box
          pl="1em"
          pr="1em"
          backgroundColor="#3182CE"
          borderRadius="0.3em"
        >
          <Text fontSize="1.2em" color="white">
            <strong>Historial Dental: </strong>
          </Text>
        </Box>
        <Text ml="2em" fontSize="1.2em">
          {toothName}
        </Text>
      </Flex>
      <Flex direction="column" width="100%" justify="center" align="center">
        <List width="100%">
          <ToothHistoryTable children={toothHistory}></ToothHistoryTable>
        </List>
      </Flex>
    </Flex>
  );
}

export default ToothHistory;