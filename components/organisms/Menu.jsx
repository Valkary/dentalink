import { Button, Flex, Text } from "@chakra-ui/react";
import { FaUserTie, FaUserFriends } from "react-icons/fa";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { useState } from "react";
import Image from 'next/image';
import Logo from "../../public/logo.png";

const menu_config = {
  focused: {
    width: "8%",
    icons_margin: "0.25em",
    icons_align: "flex-start",
  },
  unfocused: {
    width: "4%",
    icons_margin: "none",
    icons_align: "center",
  }
}


const Menu = ({}) => {
  const [menuFocus, setMenuFocus] = useState(false);

  return (
    <Flex
      direction="column"
      justify="flex-start"
      width="100%"
      height="100%"
      background="#001b26"
      zIndex={1000}
      position="absolute"
      
      align={menuFocus ? menu_config.focused.icons_align : menu_config.unfocused.icons_align}
      width={menuFocus ? menu_config.focused.width : menu_config.unfocused.width}

      onMouseEnter={() => {setMenuFocus(true)}}
      onMouseLeave={() => {setMenuFocus(false)}}
      pl={menuFocus ? menu_config.focused.icons_margin : menu_config.unfocused.icons_margin}
    >
      <Image 
        src={Logo}
        alt="imagen no encontrada juasjuas"
      ></Image>
      <Button colorScheme="white">
        <FaUserTie></FaUserTie>
        {
          menuFocus ? 
            <Text pl="1em">Usuarios</Text> :
            <></>
        }
      </Button>
      <Button colorScheme="white">
        <FaUserFriends></FaUserFriends>
        {
          menuFocus ? 
            <Text pl="1em">Pacientes</Text> :
            <></>
        }
      </Button>
      <Button colorScheme="white">
        <BsFillCalendarWeekFill></BsFillCalendarWeekFill>
        {
          menuFocus ? 
            <Text pl="1em">Calendario</Text> :
            <></>
        }
      </Button>
    </Flex>
  )
}

export default Menu;