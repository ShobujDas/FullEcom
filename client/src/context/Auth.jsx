import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";
// import { json } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // default axios
  axios.defaults.headers.common['Authorization'] = auth?.token


  useEffect(() => {
    const data = localStorage.getItem('auth')
    if(data){
      const persData = JSON.parse(data);
      setAuth({
         ...auth,
         user:persData.user,
         token:persData.token,
      })
    }
    //eslint-disable-next-line
  }, []);


  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
const useAuth = () => useContext(AuthContext);


export { useAuth, AuthProvider };



