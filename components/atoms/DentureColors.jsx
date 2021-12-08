import { Flex, Box, Text } from "@chakra-ui/layout"

const DentureColors = ({}) => {

  return (
    <Flex className="colorIdentification" justify="space-around" align="center" height="100%">
      <Flex direction="row" justify="center" align="center" height="100%">
        <Box backgroundColor="#4A5568" height="2em" width="2em" borderRadius="0.2em" mr="1em"></Box>
        <Text height="100%">Realizado anteriormente</Text>
      </Flex>
      <Flex direction="row" justify="center" align="center" height="100%">
        <Box backgroundColor="#C53030" height="2em" width="2em" borderRadius="0.2em" mr="1em"></Box>
        <Text height="100%">Por hacer</Text>
      </Flex>
      <Flex direction="row" justify="center" align="center" height="100%">
        <Box backgroundColor="#2B6CB0" height="2em" width="2em" borderRadius="0.2em" mr="1em"></Box>
        <Text height="100%">Realizado</Text>
      </Flex>
    </Flex>
  )
}

export default DentureColors;