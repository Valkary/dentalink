import { Flex, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { useState } from "react";

const Menu = ({ pageSelector, setSelectedPage }) => {
  const [openMenu, setOpenMenu] = useState(false);

  if(!openMenu) return <GiHamburgerMenu onClick={() => setOpenMenu(!openMenu)}></GiHamburgerMenu>;

  return (
    <Grid
      templateColumns="9fr 1fr"
      templateRows="5% 95%"
      backgroundColor="blue.500"
      className="menu"
      height="100%"
      width="30%"
      position="absolute"
    >
      <GridItem
       colStart={1}
       colEnd={2}
       rowStart={1}
       rowEnd={2}
       height="100%"
       width="100%"
      >
        <Text fontSize='3xl' color='white'>DentalInk</Text>
      </GridItem>
      <GridItem
       colStart={2}
       colEnd={3}
       rowStart={1}
       rowEnd={2}
       height="100%"
       width="100%"
      >
        <Flex 
          direction="column"
          justify="center"
          align="center"
          height="100%"
          width="100%"
        >
          <GrClose onClick={() => setOpenMenu(!openMenu)}></GrClose>
        </Flex>
      </GridItem>
      <GridItem
        colStart={1}
        colEnd={3}
        rowStart={2}
        rowEnd={3}
      >
        <Flex 
          direction="column"
          justify="center"
          align="center"
        >
          <div onClick={() => pageSelector("create_patient")}>Crear Paciente</div>
        </Flex>
      </GridItem>
    </Grid>

  )
}

export default Menu;