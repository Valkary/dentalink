import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import { AuthContextProvider } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

// <Pages>
import LoginForm from '../components/organisms/LoginForm';
import Menu from "../components/organisms/menu";
import Calendar from "../components/organisms/Calendar";
import Patients from "../components/ecosystems/Patients";
// </Pages>

export default function Home() {
  const [selectedPage, setSelectedPage] = useState("");
  const [credentials, setCredentials] = useState({loggedIn: false});

  const log_in = (data) => {
    const { user_name, security_lvl, first_name, last_name } = data.user

    if(user_name !== '' && security_lvl !== '') {
      setCredentials({
        username: user_name,
        security_lvl: security_lvl,
        first_name: first_name,
        last_name: last_name,
        loggedIn: true
      });
    }
  }

  useEffect(() => {}, [credentials.loggedIn]);

  const switchRender = (selectedPage) => {
    switch(selectedPage) {
      case "":
        return <Patients userCreds={credentials}></Patients>;
      case "patients":
        return <Patients userCreds={credentials}></Patients>;
      case "calendar":
        return <Calendar></Calendar>;
      case "users":
        return <></>;
    }
  }

  return (
    <ChakraProvider>
      <AuthContextProvider
        children={ 
          credentials.loggedIn ?
            <Grid
              templateColumns="1fr 25fr"
              height="100vh"
              width="100vw"
            >
              <GridItem>
                <Menu
                  setSelectedPage={setSelectedPage}
                ></Menu>
              </GridItem>
              <GridItem maxHeight="100vh" maxWidth="95vw" overflowY="scroll">
                {
                  switchRender(selectedPage)
                }
              </GridItem>
            </Grid>
          :
          <LoginForm logFunc={log_in}></LoginForm> 
        }
      >  
      </AuthContextProvider>
    </ChakraProvider>
  )
}
