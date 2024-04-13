import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.css';
// import "./css/output.css";
import Navbar from "./components/navbar.js";
import Foram from "./components/Foram.js";
import Scanner from "./components/Scanner.js";
import Myaccount from "./components/Myaccount.js";
import Login from "./components/login.js";
import MovieForm from "./components/addmovie.js";
import ModifyMovie from "./components/modifymovie.js";
import Home from "./components/home.js";
import GetOTP from "./components/getOTP.js";
import Signup from "./components/Signup.js";
import AdddropVolunteer from "./components/adddropvolunteer.js";
import { LoginProvider } from './components/LoginContext';
import ForgotPassword from "./components/forgotPassword.js";
import UpdatePassword from "./components/updatePassowrd.js";
import Showtime from "./components/showtime.js";
import Showtimepage from "./components/AllShowTimings.js";
import SeatMapPage from "./components/SeatMap.js";
import Test from "./components/test.js";

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
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
          <Route path="/modifymovie" element={<ModifyMovie />} />
          <Route path="/myaccount" element={<Myaccount />} />
          <Route path="/adddropvolunteer" element={<AdddropVolunteer/>} />
          <Route path="/forgot" element={<ForgotPassword/>}/>
          <Route path="/update" element={<UpdatePassword/>}/>
          <Route path="/showtime/:movieId" element={<Showtime/>}/>
          <Route path = "/test" element={<Test/>}/>
          <Route path="/allshowtime/:email" element={<Showtimepage/>}/>
          <Route path="/seatmap/:showtimeId" element={<SeatMapPage />} />
        </Routes>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;



