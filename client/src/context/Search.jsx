import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";
// import { json } from "react-router-dom";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {

  const [auth,setAuth] = useState({
    keyword:"",
    results:[],
  })




  

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

//custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };