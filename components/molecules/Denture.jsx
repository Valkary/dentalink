import Tooth from '../atoms/Tooth'
import { useState, useEffect } from 'react'
import { Flex, Grid, GridItem, Text } from '@chakra-ui/layout';
import axios from 'axios';

const dimensions = 100;

const Denture = ({ isAdult, selectTooth, patientID }) => {
  const [teeth, setTeeth] = useState([]);

  const growTooth = (tooth) => {
    tooth.children[0].style.transform = "scale(1.1)"
    tooth.children[0].style.border = "thin solid blue"
  }
  
  const shrinkTooth = (tooth) => {
    tooth.children[0].style.transform = "scale(1)"
    tooth.children[0].style.border = "none"
  }

  useEffect(async () => {
    const getDenture = await (await axios.post('/api/teeth/denture', { isAdult: isAdult, patientID: patientID })).data;

    setTeeth(getDenture);
  }, [isAdult])


  return (
    <Flex direction="column" justify="center" align="center">
      {
        isAdult ?
          <Grid 
            templateColumns="repeat(8, 5fr) 1fr repeat(8, 5fr)"
            templateRows="repeat(2, 1fr)"
            gap={1} justifyItems="center"
          >
            { 
              teeth.map((tooth, index) => {
                return (
                  <GridItem 
                    colStart={
                      index <= 15 ?
                        index <= 7 ? index + 1 : index + 2 :
                        index <= 23 ? (index + 1) - 17 : (index + 2) - 16
                    } 
                    rowStart={index <= 15 ? 1 : 2}
                    key={`tooth_${index}`}
                  >
                    <Flex 
                      direction="column" 
                      key={`tooth_container_${index}`}
                      onClick={() => {
                        selectTooth(tooth.id, tooth.name)
                      }}
                      onMouseEnter={(e) => growTooth(e.currentTarget)}
                      onMouseLeave={(e) => shrinkTooth(e.currentTarget)}
                      style={{"transition": "all .2s ease-in-out"}}
                    >
                      <Tooth 
                        colors={tooth.colores} 
                        width={dimensions} 
                        height={dimensions} 
                        toot_id={tooth.id}
                        toot_type={tooth.type}
                        tooth_position={tooth.position}
                        tooot_identifier={tooth.identifier}
                        tooth_name={tooth.tooth_name}
                        key={`tooth_svg_${index}`}
                        ></Tooth>
                      <Flex width="100%" justify="center" align="center" key={`tooth_index_container_${index}`}>
                        <Text key={`tooth_index_${index}`}>{index + 1}</Text>
                      </Flex>
                    </Flex>
                  </GridItem>
                );
              })
            }
          </Grid> :
          <Grid 
            templateColumns="repeat(5, 5fr) 1fr repeat(5, 5fr)"
            templateRows="repeat(2, 1fr)"
            gap={1} justifyItems="center"
            width="60%"
          >
            { 
              teeth.map((tooth, index) => {
                return (
                  <GridItem 
                    colStart={
                      index <= 9 ?
                        index <= 4 ? index + 1 : index + 2 :
                        index <= 14 ? index - 10 : index - 8
                    } 
                    rowStart={ index <= 9 ? 1 : 2 }
                    key={`tooth_${index}`}
                  >
                    <Flex 
                      direction="column" 
                      key={`tooth_container_${index}`}
                      onClick={() => {
                        selectTooth(tooth.id, tooth.name)
                      }}
                      onMouseEnter={(e) => growTooth(e.currentTarget)}
                      onMouseLeave={(e) => shrinkTooth(e.currentTarget)}
                      style={{"transition": "all .2s ease-in-out"}}
                    >
                      <Tooth 
                        colors={tooth.colores} 
                        width={dimensions} 
                        height={dimensions} 
                        toot_id={tooth.id}
                        toot_type={tooth.type}
                        tooth_position={tooth.position}
                        tooot_identifier={tooth.identifier}
                        tooth_name={tooth.tooth_name}
                        key={`tooth_svg_${index}`}
                        ></Tooth>
                      <Flex width="100%" justify="center" align="center" key={`tooth_index_container_${index}`}>
                        <Text key={`tooth_index_${index}`}>{index + 1}</Text>
                      </Flex>
                    </Flex>
                  </GridItem>
                );
              })
            }
          </Grid>
      }
    </Flex>
  )
}

export default Denture;