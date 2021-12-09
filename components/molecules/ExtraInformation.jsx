import { Checkbox, Flex, Text, Stack, RadioGroup, Radio, Input, CheckboxGroup } from "@chakra-ui/react";

const ExtraInformation = ({ children, setExtraInformationReducer }) => {
  return (
    <Flex direction="column" justify="start" align="start">
      <Flex direction="row">
        <Text>{children.question_1.title}</Text>
        <CheckboxGroup 
          onChange={e => setExtraInformationReducer({ type: "question_1", payload: e })}
        >
          {
            children.question_1.illnesses_names.map((illness, idx) => {
              return (
                <Stack pl={6} mt={1} spacing={1} key={`illnesses_${idx}`}>
                  <Checkbox value={illness}>{illness}</Checkbox>
                </Stack>
              );
            })
          }  
        </CheckboxGroup>
      </Flex>
      <Flex direction="row">
        <Text>{children.question_2.title}</Text>
        <RadioGroup onChange={e => setExtraInformationReducer({ type: "question_2", payload: e })}>
          <Stack direction="row" pl={6} mt={1} spacing={1}>
            <Radio value='1'>Si</Radio>
            <Radio value='0'>No</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex direction="row">
        <Text>{children.question_3.title}</Text>
        <RadioGroup onChange={e => setExtraInformationReducer({ type: "question_3_severe_problems", payload: e })}>
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
          onChange={e => setExtraInformationReducer({ type: "question_3_problems", payload: e.target.value })}
        ></Input>
      </Flex>
      <Flex direction="row">
        <Text>{children.question_4.title}</Text>
        <RadioGroup onChange={e => setExtraInformationReducer({ type: "question_4_taking_drugs", payload: e })}>
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
          onChange={e => setExtraInformationReducer({ type: "question_4_drugs", payload: e.target.value })}
          ></Input>
      </Flex>
      <Flex direction="row">
        <Text>{children.question_5.title}</Text>
        <Input
          type="text" 
          variant="flushed" 
          placeholder="Especifique"
          onChange={e => setExtraInformationReducer({ type: "question_5", payload: e.target.value })}
          ></Input>
      </Flex>
      <Flex direction="row">
        <Text>{children.question_6.title}</Text>
        <RadioGroup onChange={e => setExtraInformationReducer({ type: "question_6_addiction", payload: e })}>
          <Stack direction="row" pl={6} mt={1} spacing={1}>
            <Radio value='1'>Si</Radio>
            <Radio value='0'>No</Radio>
          </Stack>
        </RadioGroup>
        <Text>{children.question_6.sub_title_1}</Text>
        <Input
          type="text" 
          variant="flushed" 
          placeholder="Especifique"
          onChange={e => setExtraInformationReducer({ type: "question_6_addictions", payload: e.target.value })}
        ></Input>
        <Text>{children.question_6.sub_title_2}</Text>
        <RadioGroup onChange={e => setExtraInformationReducer({ type: "question_6_smokes", payload: e })}>
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
          onChange={e => setExtraInformationReducer({ type: "question_6_daily_cigarettes", payload: e.target.value })}
        ></Input>
      </Flex>
    </Flex>
  )
}

export default ExtraInformation;