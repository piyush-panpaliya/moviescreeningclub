import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MembershipProvider } from "./components/MembershipContext";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MembershipProvider>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </MembershipProvider>
  </React.StrictMode>
);
