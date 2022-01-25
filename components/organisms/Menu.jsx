import { Button, Flex, Text, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, VStack } from "@chakra-ui/react";
import { FaUserTie, FaUserFriends } from "react-icons/fa";
import { BsCalendarWeekFill, BsFillCalendarWeekFill } from "react-icons/bs";
import { useState, useRef } from "react";
import Image from 'next/image';
import Logo from "../../public/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineDashboard } from "react-icons/ai";

const menu_config = {
  open: {
    width: "8%",
    icon_padding: "0.25em",
    icon_align: "flex-start",
  },
  closed: {
    width: "4%",
    icon_padding: "none",
    icon_align: "center",
  }
}


const Menu = ({ setSelectedPage, userCreds }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const { user_name, security_lvl, first_name, last_name } = userCreds;
  const { width, icon_align, icon_padding } = menu_config.closed

  return (
    <>
      <Flex
        direction="column"
        justify="flex-start"
        width="100%"
        height="100%"
        background="#001b26"
        zIndex={1000}
        position="absolute"
        
        align={icon_align}
        width={width}

        pl={icon_padding}
      >
        <Button 
          colorScheme="white"
          ref={btnRef}
          onClick={onOpen}
          size="lg"
          leftIcon={<GiHamburgerMenu/>}
        ></Button>
        <Image 
          src={Logo}
          alt="imagen no encontrada juasjuas"
        ></Image>
        <Button 
          colorScheme="white"
          onClick={() => setSelectedPage("dashboard")}
        >
          <AiOutlineDashboard></AiOutlineDashboard>
        </Button>
        {
          security_lvl < 2 &&
            <Button 
              colorScheme="white"
              onClick={() => setSelectedPage("users")}
            >
              <FaUserTie></FaUserTie>
            </Button>
        }
        <Button 
          colorScheme="white"
          onClick={() => setSelectedPage("patients")}
        >
          <FaUserFriends></FaUserFriends>
        </Button>
        <Button 
          colorScheme="white"
          onClick={() => setSelectedPage("calendar")}
        >
          <BsFillCalendarWeekFill></BsFillCalendarWeekFill>
        </Button>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"xs"}
      >
        <DrawerOverlay />
        <DrawerContent background={"#001b26"}>
          <Flex direction={"row"} align={"center"} justify={"flex-end"}>
            <DrawerHeader color={"white"}>DentalInk</DrawerHeader>
            <Flex flexGrow={1}></Flex>
            <Button colorScheme={"white"} onClick={onClose}>
              <DrawerCloseButton />
            </Button>
          </Flex>

          <DrawerBody>
            <VStack spacing={2} justify={"flex-start"} direction={"column"} align={"flex-start"}>
              <Image 
                src={Logo}
                alt="imagen no encontrada juasjuas"
              ></Image>
              <Button 
                colorScheme="white"
                onClick={() => setSelectedPage("dashboard")}
                leftIcon={<AiOutlineDashboard/>}
              >
                Dashboard
              </Button>
              {
                security_lvl < 2 &&
                  <Button 
                    colorScheme="white"
                    onClick={() => setSelectedPage("users")}
                    leftIcon={<FaUserTie/>}
                  >
                    Usuarios
                  </Button>
              }
              <Button 
                colorScheme="white"
                onClick={() => setSelectedPage("patients")}
                leftIcon={<FaUserFriends/>}
              >
                Pacientes
              </Button>
              <Button 
                colorScheme="white"
                onClick={() => setSelectedPage("calendar")}
                leftIcon={<BsCalendarWeekFill/>}
              >
                Calendario
              </Button>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Flex justify={"flex-end"} align={"center"} direction={"row"}>
              <Text color={"white"} fontSize={"lg"} fontStyle={"italic"}>{first_name} {last_name}</Text>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Menu;