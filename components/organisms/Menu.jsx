import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { useState } from "react";
import {
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'

const Menu = ({ pageSelector, setSelectedPage, menu }) => {
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
      width="30%"
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
        <List spacing={3}>
          {
            menu_entries.map(entry => {
              const [title, routes] = [entry[1].title, entry[1].routes];

              const route_entries = Object.entries(routes);

              return (
                <>
                  <Text
                    fontSize='2xl' 
                    color='white'
                    as="i"
                  >
                    { title }
                  </Text>
                  <List spacing={2} pl="7%">
                    {
                      route_entries.map(route => {

                        const [title, action] = [route[1].title, route[1].action];

                        return (
                          <ListItem onClick={() => pageSelector(action)}>
                            <Text 
                              fontSize='lg' 
                              color='white'
                            >
                              { title }
                            </Text>
                          </ListItem>
                        )
                      })
                    }
                  </List>
                </>
              )
            })
          }
        </List>
      </GridItem>
    </Grid>

  )
}

export default Menu;