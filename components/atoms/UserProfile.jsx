import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import UserEditUser from "./UserEditUser";

const base_user = {
  username: "",
  first_names: "",
  last_names: "",
  path: "",
}

const UserProfile = ({ userCreds }) => {
  const { username } = userCreds;
  const [ userInfo, setUserInfo ] = useState(base_user);
  const [ userId, setUserId ] = useState(0);

  useEffect(async () => {
    const get_user_info_req = await (await axios.post('/api/users/getUserPP', { username: username })).data;
    const new_info = { ...get_user_info_req[0], path: get_user_info_req[0].path !== null ? get_user_info_req[0].path.replaceAll(String.fromCharCode(92), '/') : "" };

    setUserId(new_info.id);
    setUserInfo(new_info);
  }, []);

  return (
    <Flex direction={"column"}>
      <Flex direction={"row"} justify={"flex-start"} align={"center"} width={"100%"}>
        <Flex
          height={"3px"}
          background={"blue.500"}
          flexGrow={1}
        ></Flex>
        <Text
          pl={"1em"}
          pr={"1em"}
          fontWeight={"bold"}
          fontSize={"xl"}
        >Perfil</Text>
        <Flex
          height={"3px"}
          background={"blue.500"}
          flexGrow={1}
        ></Flex>
      </Flex>

      <UserEditUser profilePicturePath={userInfo.path} userCreds={userCreds} idUser={userId}/>
    </Flex>
  );
};

export default UserProfile;