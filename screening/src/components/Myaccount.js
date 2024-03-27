/*import React from 'react';
import { useEffect } from 'react';
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";

const Myaccount = () => {
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <div>
      <h1>Hey you have succesfully accessed your account</h1>
    </div>
  )
}

export default Myaccount*/


// Myaccount.js
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

