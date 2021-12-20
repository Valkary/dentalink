import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { useState } from "react";
import MenuSection from "../molecules/MenuSection";

const Menu = ({ pageSelector, menu }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menu_entries = Object.entries(menu);

  if(!openMenu) return <GiHamburgerMenu onClick={() => setOpenMenu(!openMenu)}></GiHamburgerMenu>;

  return (
    <Grid
      templateColumns="9fr 1fr"
      templateRows="5% 95%"
      backgroundColor="blue.500"
      className="menu"
      height="100%"
      width="25%"
      position="absolute"
      zIndex="1000"
      rowGap={2}
      overflow="hidden"
    >
      <GridItem
       colStart={1}
       colEnd={2}
       rowStart={1}
       rowEnd={2}
       height="100%"
       width="100%"
       borderBottom="thin solid white"
       pl="5%"
      >
        <Text fontSize='4xl' color='white'><strong>DentalInk</strong></Text>
      </GridItem>
      <GridItem
       colStart={2}
       colEnd={3}
       rowStart={1}
       rowEnd={2}
       height="100%"
       width="100%"
       borderBottom="thin solid white"
      >
        <Flex 
          direction="column"
          justify="center"
          align="center"
          height="100%"
          width="100%"
        >
          <GrClose 
            onClick={() => setOpenMenu(!openMenu)}
          ></GrClose>
        </Flex>
      </GridItem>
      <GridItem
        colStart={1}
        colEnd={3}
        rowStart={2}
        rowEnd={3}
        pl="5%"
      >        
        <MenuSection children={menu_entries} pageSelector={pageSelector}></MenuSection>
      </GridItem>
    </Grid>

  )
}

export default Menu;