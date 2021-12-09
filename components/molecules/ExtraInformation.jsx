import { Checkbox, Flex, Text, Stack, RadioGroup, Radio, Input } from "@chakra-ui/react";

const ExtraInformation = ({ children, setPriorIllnesses }) => {
  return (
    <Flex direction="column" justify="start" align="start">
      <Flex direction="row">
        <Text>{children.question_1.title}</Text>
        {
          children.question_1.illnesses_names.map((illness, idx) => {
            return (
              <Stack pl={6} mt={1} spacing={1} key={`illnesses_${idx}`}>
                <Checkbox>{illness}</Checkbox>
              </Stack>
            );
          })
        }
      </Flex>
      <Flex direction="row">
        <Text>{children.question_2.title}</Text>
        <RadioGroup>
          <Stack direction="row" pl={6} mt={1} spacing={1}>
            <Radio value='1'>Si</Radio>
            <Radio value='0'>No</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex direction="row">
        <Text>{children.question_3.title}</Text>
        <RadioGroup>
          <Stack direction="row" pl={6} mt={1} spacing={1}>
            <Radio value='1'>Si</Radio>
            <Radio value='0'>No</Radio>
          </Stack>
        </RadioGroup>
        <Text>¿Cuál?</Text>
        <Input
          type="text" 
          variant="flushed" 
          placeholder="Especifique"
        ></Input>
      </Flex>
      <Flex direction="row">
        <Text>{children.question_3.title}</Text>
        <RadioGroup>
          <Stack direction="row" pl={6} mt={1} spacing={1}>
            <Radio value='1'>Si</Radio>
            <Radio value='0'>No</Radio>
          </Stack>
        </RadioGroup>
        <Text>¿Cuál(es)?</Text>
        <Input
          type="text" 
          variant="flushed" 
          placeholder="Especifique"
        ></Input>
      </Flex>
      <Flex direction="row">
        <Text>{children.question_4.title}</Text>
        <RadioGroup>
          <Stack direction="row" pl={6} mt={1} spacing={1}>
            <Radio value='1'>Si</Radio>
            <Radio value='0'>No</Radio>
          </Stack>
        </RadioGroup>
        <Text>¿Cuál(es)?</Text>
        <Input
          type="text" 
          variant="flushed" 
          placeholder="Especifique"
          ></Input>
      </Flex>
      <Flex direction="row">
        <Text>{children.question_5.title}</Text>
        <Input
          type="text" 
          variant="flushed" 
          placeholder="Especifique"
          ></Input>
      </Flex>
      <Flex direction="row">
        <Text>{children.question_6.title}</Text>
        <RadioGroup>
          <Stack direction="row" pl={6} mt={1} spacing={1}>
            <Radio value='1'>Si</Radio>
            <Radio value='0'>No</Radio>
          </Stack>
        </RadioGroup>
        <Text>¿Cuál(es)?</Text>
        <Input
          type="text" 
          variant="flushed" 
          placeholder="Especifique"
        ></Input>
        <Text>{children.question_6.sub_title_1}</Text>
        <Input
          type="text" 
          variant="flushed" 
          placeholder="Especifique"
        ></Input>
        <Text>{children.question_6.sub_title_2}</Text>
        <RadioGroup>
          <Stack direction="row" pl={6} mt={1} spacing={1}>
            <Radio value='1'>Si</Radio>
            <Radio value='0'>No</Radio>
          </Stack>
        </RadioGroup>
        <Text>{children.question_6.sub_title_3}</Text>
        <Input
          type="number"
          variant="flushed" 
          placeholder="Especifique"
        ></Input>
      </Flex>
    </Flex>
  )
}

export default ExtraInformation;