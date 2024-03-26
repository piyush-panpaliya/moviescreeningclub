import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./components/navbar.js";
import Foram from "./components/Foram.js";
import Scanner from "./components/Scanner.js";
import Myaccount from "./components/Myaccount.js";
import Login from "./components/login.js";
import MovieForm from "./components/addmovie.js";
import Home from "./components/home.js";
import GetOTP from "./components/getOTP.js";
import Signup from "./components/Signup.js";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Foram />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/getOTP" element={<GetOTP />} />
        <Route path="/addmovie" element={<MovieForm />} />
        <Route path="/myaccount" element={<Myaccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


