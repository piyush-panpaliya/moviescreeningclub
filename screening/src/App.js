import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./components/navbar.js";
import Foram from "./components/Foram.js";
import Scanner from "./components/Scanner.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Foram />} />
          <Route path="/form" element={<Foram />} />
          <Route path="/scanner" element={<Scanner />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
