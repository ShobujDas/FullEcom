
import { useNavigate,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Spinner({path = "login"}) {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();



  useEffect(() => {
    const countInterval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    count === 0 && navigate(`${path}`,{
      state:location.pathname,
    })
    return ()=>clearInterval(countInterval)
  }, [count,navigate,location,path]);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "100vh" }}
      >
        <h1>Redirecting you in {count} secoand </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}

export default Spinner;
