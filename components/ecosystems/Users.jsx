import { Flex } from "@chakra-ui/react";
import { useState } from "react";

import UsersTable from "../molecules/UsersTable";

const selected_user_initial_state = {
  id: 0,
  username: "",
  security_lvl: "",
  first_names: "", 
  last_names: ""
};

const Users = ({ userCreds }) => {
  const { first_name, last_name, security_lvl, username } = userCreds;
  const [ selectedUser, setSelectedUser ] = useState(selected_user_initial_state);

  return (
    <Flex
      direction="column"
      justify="flex-start"
      align="flex-start" 

      pl="1rem"
      pr="1rem"
      minHeight="100vh"
      height="100%"
      width="95vw"
    >
      <Flex direction="row" justify="flex-start" align="center" pt="0.5rem">
        <div className="ten">
          <h1>Usuarios - {first_name} {last_name}</h1>
        </div>
      </Flex>

      <UsersTable setSelectedUser={setSelectedUser}/>
    </Flex>
  );
};

export default Users;