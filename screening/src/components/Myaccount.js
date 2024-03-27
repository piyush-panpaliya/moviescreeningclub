import React, { useEffect } from 'react';
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";
import { useLogin } from './LoginContext'; // Import useLogin hook

const Myaccount = () => {
  const { loggedIn } = useLogin(); // Use loggedIn state from context
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  return (
    <div>
      <h1>Hey you have successfully accessed your account</h1>
    </div>
  );
}

export default Myaccount;

