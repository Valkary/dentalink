import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import { FaUserTie, FaUserFriends } from "react-icons/fa";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { useState } from "react";
import Image from 'next/image';
import Logo from "../../public/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

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
  const [openMenu, setOpenMenu] = useState(false);
  const { user_name, security_lvl, first_name, last_name } = userCreds;

  if(openMenu) {
    const { width, icon_padding, icon_align } = menu_config.open

    return (
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
        <VStack spacing={2} borderBottom="thin solid white" width="100%">
          <Flex direction="row" justify="flex-end" align="flex-end" width="100%">
            <Button 
              colorScheme="white"
              onClick={() => setOpenMenu(false)}
              size="lg"
            >
              <AiOutlineClose></AiOutlineClose>
            </Button>
          </Flex>
          <Flex direction="row" justify="center" align="center" width="100%" isTruncated>
            <Text color="white">{first_name} {last_name}</Text>
          </Flex>
          <Image 
            src={Logo}
            alt="imagen no encontrada juasjuas"
          ></Image>
        </VStack>
        <Button 
          colorScheme="white"
          onClick={() => setSelectedPage("users")}
        >
          <FaUserTie></FaUserTie>
          <Text pl="1em">Usuarios</Text>
        </Button>
        <Button 
          colorScheme="white"
          onClick={() => setSelectedPage("patients")}
        >
          <FaUserFriends></FaUserFriends>
          <Text pl="1em">Pacientes</Text>
        </Button>
        <Button 
          colorScheme="white"
          onClick={() => setSelectedPage("calendar")}
        >
          <BsFillCalendarWeekFill></BsFillCalendarWeekFill>
          <Text pl="1em">Calendario</Text>
        </Button>
      </Flex>
    )
  } else {
    const { width, icon_padding, icon_align } = menu_config.closed

    return (
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
          onClick={() => setOpenMenu(true)}
          size="lg"
        >
          <GiHamburgerMenu></GiHamburgerMenu>
        </Button>
        <Image 
          src={Logo}
          alt="imagen no encontrada juasjuas"
        ></Image>
        <Button 
          colorScheme="white"
          onClick={() => setSelectedPage("users")}
        >
          <FaUserTie></FaUserTie>
        </Button>
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
    )
  }
}

export default Menu;