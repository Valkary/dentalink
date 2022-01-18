import axios from "axios";
import { useState, useRef, useReducer } from "react";
import { Button, Grid, GridItem, Input, InputLeftAddon, Badge, InputGroup, Flex, Select, Image } from "@chakra-ui/react";
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
      return { ...state, username: action.payload };
    };
    case 'setPassword': {
      return { ...state, password: action.payload };
    };
    case 'setFirstNames': {
      return { ...state, first_names: action.payload };
    };
    case 'setLastNames': {
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

const AddUser = ({}) => {
  const [ sentStatus, setSentStatus ] = useState({ error: false, message: "Sin enviar" });
  const [ sent, setSent ] = useState(false);

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
    console.log(add_user_request);
  }

  return (
    <form method="post" action="/api/users/addUser" encType="multipart/form-data" onSubmit={(e) => addUser(e)}>
      <Grid
        templateColumns="[informacion] 3fr [imagen] 1fr"
        templateRows="[titulo] 1fr [informacion] auto [enviar] 1fr"
      >
        <GridItem
          colStart={1}
          colSpan={2}
          rowStart={1}
          rowSpan={1}
        >
          <Flex direction="row" justify="center" align="center">
            Agregar Usuario
            <Badge colorScheme={!sent ? "gray" : sentStatus.error ? "red" : "green"}>
              {sentStatus.message}
            </Badge>
          </Flex>
        </GridItem>

        <GridItem
          colStart={1}
          colSpan={1}
          rowStart={2}
          rowSpan={1}
        >
          <Flex
            direction='column'
            justify='center'
            align='center'
          >
            <InputGroup>
              <InputLeftAddon>Nombre de usuario: </InputLeftAddon>
              <Input 
                type="text" 
                placeholder="Introduzca un nombre"
                value={formState.username}
                name="username"
                onChange={e => {
                  dispatch({ type: 'setUsername', payload: e.currentTarget.value });
                }}
              />
            </InputGroup>
            
            <InputGroup>
              <InputLeftAddon>Contraseña provisional: </InputLeftAddon>
              <Input 
                type="password" 
                placeholder="Contraseña"
                value={formState.password}
                name="password"
                onChange={e => {
                  dispatch({ type: 'setPassword', payload: e.currentTarget.value });
                }}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftAddon>Nombres: </InputLeftAddon>
              <Input 
              type="text" 
              placeholder="Introduzca los nombres"
              value={formState.first_names}
              name="first_names"
              onChange={e => {
                dispatch({ type: 'setFirstNames', payload: e.currentTarget.value });
              }}
              />
            </InputGroup>
            
            <InputGroup>
              <InputLeftAddon>Apellidos: </InputLeftAddon>
              <Input 
                type="text" 
                placeholder="Introduzca los apellidos"
                value={formState.last_names}
                name="last_names"
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
          </Flex>
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
          <Flex direction="row" justify="flex-end" align="center">
            <Button type="submit" rightIcon={<AiOutlineUserAdd/>} colorScheme="blue">Agregar</Button>
          </Flex>
        </GridItem>
      </Grid>
    </form>
  );
};

export default AddUser;