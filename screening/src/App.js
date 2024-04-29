import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import { LoginProvider } from './components/LoginContext.js';
import ForgotPassword from "./components/forgotPassword.js";
import UpdatePassword from "./components/updatePassowrd.js";
import Showtime from "./components/showtime.js";
import Showtimepage from "./components/AllShowTimings.js";
import SeatMapPage from "./components/SeatMap.js";
import Test from "./components/test.js";
import QR from "./components/displayQR.js";
import Footer from "./components/footer.js";
import MovieList from "./components/VotePage.js";
import { SERVERIP } from "./config.js";

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Navbar/>
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
          <Route path="/showtime/:movieId/:poster" element={<Showtime/>}/>
          <Route path = "/test" element={<Test/>}/>
          <Route path="/allshowtime/:paymentId" element={<Showtimepage/>}/>
          <Route path="/seatmap/:showtimeId" element={<SeatMapPage />} />
          <Route path="/QR" element={<QR />} />
          <Route path="/VotePage" element={<MovieList />} />
        </Routes>
        <Footer/>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;



