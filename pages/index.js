import { ChakraProvider, Flex } from "@chakra-ui/react"
import PatientHistory from '../components/organisms/PatientHistory'
import LoginForm from '../components/organisms/LoginForm'
import { AuthContextProvider } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import Calendar from "../components/organisms/Calendar";

export default function Home() {
  const [credentials, setCredentials] = useState({loggedIn: false})

  const log_in = (data) => {
    const { user_name, security_lvl, first_name, last_name } = data.user

    if(user_name !== '' && security_lvl !== '') {
      setCredentials({
        username: user_name,
        security_lvl: security_lvl,
        first_name: first_name,
        last_name: last_name,
        loggedIn: true
      })
    }
  }

  useEffect(() => {}, [credentials.loggedIn]);

  return (
    <ChakraProvider>
      <AuthContextProvider
        children={ 
          credentials.loggedIn ? 
            <Calendar></Calendar>
            // <Flex direction="column" justify="center" align="center" width="100%" height="100%">
            //   <PatientHistory userCreds={credentials}></PatientHistory>  
            //   <Calendar></Calendar>
            // </Flex> 
            :
            <LoginForm logFunc={log_in} ></LoginForm> 
        }
      >  
      </AuthContextProvider>
    </ChakraProvider>
  )
}
