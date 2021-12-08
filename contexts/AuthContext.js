import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  user: {
    user_name: null,
    first_name: null,
    last_name: null,
    logged_in: false
  },
  setLogin: () => {}
});

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const value = { user, setUser };
  
  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
};

export default AuthContext;