import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./components/navbar.js";
import Foram from "./components/Foram.js";
import Scanner from "./components/Scanner.js";
import Myaccount from "./components/Myaccount.js";
import Signup from "./components/Signup.js";
import Login from "./components/login.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navbar />}> */}
          <Route index element={<Login />} />
          <Route path="/form" element={<Foram />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myaccount" element={<Myaccount />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;

/*import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./components/navbar.js";
import Foram from "./components/Foram.js";
import Scanner from "./components/Scanner.js";
import Myaccount from "./components/Myaccount.js";
import Signup from "./components/Signup.js";
import { AuthProvider, useAuth } from "./components/AuthContext.js";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Foram />} />
          <Route path="/form" element={<Foram />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myaccount" element={<Myaccount />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// PrivateRoute component to handle routes accessible only to authenticated users
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/signup" replace />;
};

export default App;*/

