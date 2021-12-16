import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import LoginForm from '../components/organisms/LoginForm';
import { AuthContextProvider } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import PatientHistory from '../components/organisms/PatientHistory';
import CreatePatient from "../components/organisms/CreatePatient";
import Menu from "../components/organisms/menu";

export default function Home() {
  const [selectedPage, setSelectedPage] = useState("");
  const [credentials, setCredentials] = useState({loggedIn: false});
  const [openMenu, setOpenMenu] = useState(false);

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
        return <PatientHistory userCreds={credentials}></PatientHistory>;
      case "create_patient":
        return <CreatePatient></CreatePatient>;
    }
  }

  return (
    <ChakraProvider>
      <AuthContextProvider
        children={ 
          credentials.loggedIn ?
            <Grid
              templateColumns="1fr 30fr"
              height="100vh"
              width="100vw"
            >
              <GridItem>
                <Menu 
                  pageSelector={setSelectedPage} 
                  setSelectedPage={setSelectedPage}              
                ></Menu>
              </GridItem>
              <GridItem>
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
