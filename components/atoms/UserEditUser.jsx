import axios from "axios";
import { useState, useRef, useReducer } from "react";
import { Button, Grid, GridItem, Input, InputLeftAddon, InputGroup, Flex, Select, Image, FormControl, FormLabel, VStack } from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineEdit } from "react-icons/ai";
import { useToast } from '@chakra-ui/react'

const form_initial_state = {
  username: '',
  password: '',
  verifypassword: '',
  first_names: '',
  last_names: '',
  security_lvl: 2,
  profile_picture: ''
};

const formReducer = (state, action) => {
  switch(action.type) {
    case 'setPassword': {
      const error = !!(state.verifypassword !== action.payload || action.payload === "");
      [error_state.verifypassword, error_state.password] = [error, error];
      return { ...state, password: action.payload };
    };
    case 'setVerifyPassword': {
      const error = !!(state.password !== action.payload || action.payload === "");
      [error_state.verifypassword, error_state.password] = [error, error];
      return { ...state, verifypassword: action.payload };
    };
    case 'setFirstNames': {
      error_state.names = !!(action.payload === "");
      return { ...state, first_names: action.payload };
    };
    case 'setLastNames': {
      error_state.last_names = !!(action.payload === "");
      return { ...state, last_names: action.payload };
    };
    case 'setProfilePicture': {
      return { ...state, profile_picture: action.payload };
    };
  };
};

const error_state = {
  password: false,
  verifypassword: false,
  names: false,
  last_names: false
};

const EditUser = ({ idUser, profilePicturePath, userCreds }) => {
  const toast = useToast();
  const { username, security_lvl } = userCreds;
  const hiddenFileInput = useRef(null);
  const [ profilePicture, setProfilePicture ] = useState("");
  const [ changed, setChanged ] = useState(false);

  const [ formState, dispatch ] = useReducer(formReducer, form_initial_state);

  const verify_form = () => {
    const state_entries = Object.entries(formState);
    const error_entries = Object.entries(error_state);

    let verified = true;

    for(const entry of state_entries) {
      if(entry[1] === "" && (entry[0] !== "username" && entry[0] !== "profile_picture")) verified = false;
    }

    for(const entry of error_entries) {
      if(entry[1] === true) verified = false;
    }

    return verified;
  }

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = async e => {
    const fileUploaded = e.target.files[0];
    const url =  URL.createObjectURL(fileUploaded);

    setChanged(true);
    setProfilePicture(url);
    dispatch({ type: 'setProfilePicture', payload: fileUploaded });
  };

  const editUser = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const edit_user_request = await (await axios.post('/api/users/addUser', data)).data;

    const { success, message } = edit_user_request;

    success ?
      toast({
        title: "Usuario editado!",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true
      }) :
      toast({
        title: "Error al crear el usuario",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true

      });
  };

  return (
    <FormControl isRequired>
      <form method="post" action="/api/users/addUser" encType="multipart/form-data" onSubmit={(e) => editUser(e)}>
        <Grid
          templateColumns="[informacion] 3fr [imagen] 1fr"
          templateRows="[informacion] auto [enviar] 1fr"
          columnGap={2}
          rowGap={2}
        >
          <input type={"text"} value={"edit"} style={{ "display": "none" }} name={"type"}/>
          <input type={"text"} value={username} style={{ "display": "none" }} name={"username"}/>
          <input type={"number"} value={security_lvl} style={{ "display": "none" }} name={"security_lvl"}/>
          <input type={"number"} value={idUser} style={{ "display": "none" }} name={"id"}/>
          <GridItem
            colStart={1}
            colSpan={1}
            rowStart={2}
            rowSpan={1}
          >
            <VStack
              spacing={2}
            >
              <InputGroup>
                <InputLeftAddon><FormLabel htmlFor="username-input">Nombre de usuario</FormLabel></InputLeftAddon>
                <Input 
                  readOnly
                  id="username-input"
                  type="text" 
                  placeholder="Introduzca un nombre"
                  value={username}
                  required
                />
              </InputGroup>

              <InputGroup>
                <InputLeftAddon><FormLabel htmlFor="names-input">Nombres</FormLabel></InputLeftAddon>
                <Input 
                  id="names-input"
                  type="text" 
                  placeholder="Introduzca los nombres"
                  value={formState.first_names}
                  name="first_names"
                  required
                  isInvalid={error_state.names}
                  onChange={e => {
                    dispatch({ type: 'setFirstNames', payload: e.currentTarget.value });
                  }}
                />
              </InputGroup>
              
              <InputGroup>
                <InputLeftAddon><FormLabel htmlFor="last-names-input">Apellidos</FormLabel></InputLeftAddon>
                <Input 
                  id="last-names-input" 
                  type="text" 
                  placeholder="Introduzca los apellidos"
                  value={formState.last_names}
                  name="last_names"
                  required
                  isInvalid={error_state.last_names}
                  onChange={e => {
                    dispatch({ type: 'setLastNames', payload: e.currentTarget.value });
                  }}
                />
              </InputGroup>
              
              <InputGroup>
                <InputLeftAddon><FormLabel htmlFor="password-input">Nueva contraseña</FormLabel></InputLeftAddon>
                <Input 
                  id="password-input"
                  type="password" 
                  placeholder="Contraseña"
                  value={formState.password}
                  name="password"
                  required
                  isInvalid={error_state.password}
                  onChange={e => {
                    dispatch({ type: 'setPassword', payload: e.currentTarget.value });
                  }}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftAddon><FormLabel htmlFor="password-input">Verificar nueva contraseña</FormLabel></InputLeftAddon>
                <Input 
                  id="verifypassword-input"
                  type="password" 
                  placeholder="Contraseña"
                  value={formState.verifypassword}
                  name="verifypassword"
                  required
                  isInvalid={error_state.verifypassword}
                  onChange={e => {
                    dispatch({ type: 'setVerifyPassword', payload: e.currentTarget.value });
                  }}
                />
              </InputGroup>
            </VStack>
          </GridItem>

          <GridItem
            colStart={2}
            colSpan={1}
            rowStart={2}
            rowSpan={1}
          >
            <Button colorScheme="gray" height="100%" width="100%" onClick={handleClick}>
              {
                (profilePicturePath === "" && changed === false) ?
                  <AiOutlineUser size="60%"/> :
                  <Image src={changed ? profilePicture : profilePicturePath} alt="Error" width="auto" height="auto"/>
              }
            </Button>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{display: 'none'}}
              name="profile_picture"
              accept="image/png, image/jpeg"
            />
          </GridItem>

          <GridItem
            colStart={1}
            colSpan={2}
            rowStart={3}
            rowSpan={1}
          >
            <Flex direction="row" justify="flex-end" align="flex-end" height="100%" minHeight="7.5vh">
              <Button type="submit" rightIcon={<AiOutlineEdit/>} colorScheme="yellow" disabled={!verify_form()}>Editar</Button>
            </Flex>
          </GridItem>
        </Grid>
      </form>
    </FormControl>
  );
};

export default EditUser;