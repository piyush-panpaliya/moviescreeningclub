import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MembershipProvider } from "./components/MembershipContext";
import reportWebVitals from './reportWebVitals';
import {NextUIProvider} from '@nextui-org/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MembershipProvider>
    <NextUIProvider>
      <App />
    </NextUIProvider>
    </MembershipProvider>
  </React.StrictMode>
);

reportWebVitals();
