import { ChakraProvider } from "@chakra-ui/react"
import PatientHistory from '../components/organisms/PatientHistory'
import LoginForm from '../components/organisms/LoginForm'
import { AuthContextProvider } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

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
            <PatientHistory userCreds={credentials}></PatientHistory> : 
            <LoginForm logFunc={log_in} ></LoginForm> }
      >  
      </AuthContextProvider>
    </ChakraProvider>
  )
}
