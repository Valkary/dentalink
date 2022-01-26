import Tooth from '../atoms/Tooth'
import { useState, useEffect } from 'react'
import { Flex, Grid, GridItem, Text } from '@chakra-ui/layout';
import axios from 'axios';

const dimensions = 100;
let isSmall = false;

const Denture = ({ selectTooth, patientID, updatedID }) => {
  const [ adult, setAdult ] = useState(true);
  const [ small, setSmall ] = useState(true);

  const [ topLeftTeeth, setTopLeftTeeth ] = useState([]);
  const [ topRightTeeth, setTopRightTeeth ] = useState([]);
  const [ botLeftTeeth, setBotLeftTeeth ] = useState([]);
  const [ botRightTeeth, setBotRightTeeth ] = useState([]);

  const growTooth = (tooth) => {
    tooth.children[0].style.transform = "scale(1.1)";
    tooth.children[0].style.border = "thin solid blue";
  }
  
  const shrinkTooth = (tooth) => {
    tooth.children[0].style.transform = "scale(1)";
    tooth.children[0].style.border = "none";
  }

  const handleResize = () => {
    const totalScreenWidth = window.innerWidth;
    isSmall = !!(totalScreenWidth < 1920);

    if(isSmall !== small) setSmall(isSmall);
  };

  useEffect(async () => {
    const getDenture = await (await axios.post('/api/teeth/denture', { patientID: patientID })).data;
    const isPatientAdult = await (await axios.post('/api/patients/isPatientAdult', { patientID: patientID })).data;

    setAdult(isPatientAdult);

    let teeth_arrays = [[],[],[],[]];
    const order_numbers = isPatientAdult ? [8,16,24,32] : [5,10,15,20];

    for(const i = 0; i < getDenture.length; i++) {
      const { colores, id, type, position, identifier, name } = getDenture[i];

      let tooth_name = name;
      let area = "superior-izquierdo";
      
      if(i < order_numbers[0]) {
        tooth_name = `${tooth_name} ${area}`
      } else if (i < order_numbers[1]) {
        let area = "superior-derecho";
        tooth_name = `${tooth_name} ${area}`
      } else if (i < order_numbers[2]) {
        let area = "inferior-izquierdo";
        tooth_name = `${tooth_name} ${area}`
      } else {
        let area = "inferior-derecho";
        tooth_name = `${tooth_name} ${area}`
      }

      const new_tooth = (
        <Flex 
          direction="column" 
          key={`tooth_container_${id}`}
          onClick={() => {
            selectTooth(id, tooth_name);
          }}
          onMouseEnter={(e) => growTooth(e.currentTarget)}
          onMouseLeave={(e) => shrinkTooth(e.currentTarget)}
          style={{"transition": "all 0.2s ease-in-out"}}
          margin={"0 0.2em"}
        >
          <Tooth colors={colores} width={dimensions} height={dimensions} toot_id={id} toot_type={type} tooth_position={position} tooth_identifier={identifier} tooth_name={name} key={i}/>
          <Flex width="100%" justify="center" align="center" key={`tooth_index_container_${id}`}>
            <Text key={`tooth_index_${id}`}>{id}</Text>
          </Flex>
        </Flex>
      );

      if(i < order_numbers[0]) {
        teeth_arrays[0].push(new_tooth);
      } else if (i < order_numbers[1]) {
        teeth_arrays[1].push(new_tooth);
      } else if (i < order_numbers[2]) {
        teeth_arrays[2].push(new_tooth);
      } else {
        teeth_arrays[3].push(new_tooth);
      }
    }

    setTopLeftTeeth(teeth_arrays[0]);
    setTopRightTeeth(teeth_arrays[1]);
    setBotLeftTeeth(teeth_arrays[2]);
    setBotRightTeeth(teeth_arrays[3]);

  }, [patientID, updatedID]);
  
  window.addEventListener('resize', handleResize());

  if(!isSmall) {
    return (
      <Grid
        templateColumns={"5fr 5fr"}
        templateRows={"1fr 1fr"}
        columnGap={3}
        rowGap={3}
        maxWidth={"100%"}
      >
        <GridItem
          className='top-left-teeth'
          colStart={1}
          rowStart={1}
        >
          <Flex direction={"row"} justify={"center"} align={"center"}>
            {
              topLeftTeeth.map(tooth => {
                return tooth;
              })
            }
          </Flex>
        </GridItem>
        <GridItem
          className='top-right-teeth'
          colStart={2}
          rowStart={1}
        >
          <Flex direction={"row"} justify={"center"} align={"center"}>
            {
              topRightTeeth.map(tooth => {
                return tooth;
              })
            }
          </Flex>
        </GridItem>
        <GridItem
          className='bot-left-teeth'
          colStart={1}
          rowStart={2}
        >
          <Flex direction={"row"} justify={"center"} align={"center"}>
            {
              botLeftTeeth.map(tooth => {
                return tooth;
              })
            }
          </Flex>
        </GridItem>
        <GridItem
          className='top-left-teeth'
          colStart={2}
          rowStart={2}
        >
          <Flex direction={"row"} justify={"center"} align={"center"}>
            {
              botRightTeeth.map(tooth => {
                return tooth;
              })
            }
          </Flex>
        </GridItem>
      </Grid>
    );
  } else {
    return (
      <Grid
        templateColumns={"100%"}
        templateRows={"1fr 1fr 1fr 1fr"}
        columnGap={3}
        rowGap={3}
        maxWidth={"100%"}
      >
        <GridItem
          className='top-left-teeth'
          colStart={1}
          rowStart={1}
        >
          <Flex direction={"row"} justify={"center"} align={"center"}>
            {
              topLeftTeeth.map(tooth => {
                return tooth;
              })
            }
          </Flex>
        </GridItem>
        <GridItem
          className='top-right-teeth'
          colStart={1}
          rowStart={3}
        >
          <Flex direction={"row"} justify={"center"} align={"center"}>
            {
              topRightTeeth.map(tooth => {
                return tooth;
              })
            }
          </Flex>
        </GridItem>
        <GridItem
          className='bot-left-teeth'
          colStart={1}
          rowStart={2}
        >
          <Flex direction={"row"} justify={"center"} align={"center"}>
            {
              botLeftTeeth.map(tooth => {
                return tooth;
              })
            }
          </Flex>
        </GridItem>
        <GridItem
          className='top-left-teeth'
          colStart={1}
          rowStart={4}
        >
          <Flex direction={"row"} justify={"center"} align={"center"}>
            {
              botRightTeeth.map(tooth => {
                return tooth;
              })
            }
          </Flex>
        </GridItem>
      </Grid>
    );
  }
}

export default Denture;