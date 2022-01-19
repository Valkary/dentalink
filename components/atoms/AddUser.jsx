import axios from "axios";
import { useState, useRef, useReducer } from "react";
import { Button, Grid, GridItem, Input, InputLeftAddon, InputGroup, Flex, Select, Image, FormControl, FormLabel, VStack } from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";

const form_initial_state = {
  username: '',
  password: '',
  first_names: '',
  last_names: '',
  security_lvl: 2,
  profile_picture: ''
};

const formReducer = (state, action) => {
  switch(action.type) {
    case 'setUsername': {
      error_state.username.error = action.payload === "";
      return { ...state, username: action.payload };
    };
    case 'setPassword': {
      error_state.password.error = action.payload === "";
      return { ...state, password: action.payload };
    };
    case 'setFirstNames': {
      error_state.names.error = action.payload === "";
      return { ...state, first_names: action.payload };
    };
    case 'setLastNames': {
      error_state.last_names.error = action.payload === "";
      return { ...state, last_names: action.payload };
    };
    case 'setSecurityLvl': {
      return { ...state, security_lvl: parseInt(action.payload, 10) };
    };
    case 'setProfilePicture': {
      return { ...state, profile_picture: action.payload };
    };
  };
};

const error_state = {
  username: {
    error: false,
    error_message: "Es necesario un nombre de usuario!"
  },
  password: {
    error: false,
    error_message: "Es necesaria una contraseña!"
  },
  names: {
    error: false,
    error_message: "Es necesario el nombre completo!"
  },
  last_names: {
    error: false,
    error_message: "Son necesarios los apellidos!"
  }
};

const AddUser = ({ setSent, setSentStatus, onClose }) => {
  const hiddenFileInput = useRef(null);
  const [ profilePicture, setProfilePicture ] = useState(null);

  const [ formState, dispatch ] = useReducer(formReducer, form_initial_state);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = async e => {
    const fileUploaded = e.target.files[0];
    const url =  URL.createObjectURL(fileUploaded);

    setProfilePicture(url);
    dispatch({ type: 'setProfilePicture', payload: fileUploaded });
  };

  const addUser = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const add_user_request = await (await axios.post('/api/users/addUser', data)).data;

    const { success, message } = add_user_request;
    setSent(true);

    success ? setSentStatus({ error: false, message: message }) : setSentStatus({ error: true, message: message });
  }

  return (
    <FormControl isRequired>
      <form method="post" action="/api/users/addUser" encType="multipart/form-data" onSubmit={(e) => addUser(e)}>
        <Grid
          templateColumns="[informacion] 3fr [imagen] 1fr"
          templateRows="[informacion] auto [enviar] 1fr"
          columnGap={2}
          rowGap={2}
        >
          <input type={"text"} value={"add"} style={{ "display": "none" }} name={"type"}/>
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
                  id="username-input"
                  type="text" 
                  placeholder="Introduzca un nombre"
                  value={formState.username}
                  name="username"
                  required
                  isInvalid={error_state.username.error}
                  onChange={e => {
                    dispatch({ type: 'setUsername', payload: e.currentTarget.value });
                  }}
                />
              </InputGroup>
              
              <InputGroup>
                <InputLeftAddon><FormLabel htmlFor="password-input">Contraseña provisional</FormLabel></InputLeftAddon>
                <Input 
                  id="password-input"
                  type="password" 
                  placeholder="Contraseña"
                  value={formState.password}
                  name="password"
                  required
                  isInvalid={error_state.password.error}
                  onChange={e => {
                    dispatch({ type: 'setPassword', payload: e.currentTarget.value });
                  }}
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
                  isInvalid={error_state.names.error}
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
                  isInvalid={error_state.last_names.error}
                  onChange={e => {
                    dispatch({ type: 'setLastNames', payload: e.currentTarget.value });
                  }}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftAddon>Nivel de seguridad: </InputLeftAddon>
                <Select
                  value={formState.security_lvl}
                  name="security_lvl"
                  onChange={e => {
                    dispatch({ type: 'setSecurityLvl', payload: e.currentTarget.value });
                  }}
                >
                  <option value={1}>Administrador</option>
                  <option value={2}>Usuario</option>
                </Select>
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
                profilePicture === null ?
                  <AiOutlineUser size="60%"/> :
                  <Image src={profilePicture} alt="Error" width="100%" height="auto"/>
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
              <Button type="submit" rightIcon={<AiOutlineUserAdd/>} colorScheme="blue">Agregar</Button>
              <Button ml={3} onClick={() => onClose()} colorScheme="gray">Cerrar</Button>
            </Flex>
          </GridItem>
        </Grid>
      </form>
    </FormControl>
  );
};

export default AddUser;