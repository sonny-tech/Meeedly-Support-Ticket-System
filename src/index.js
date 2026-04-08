import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; 
import { TicketProvider } from './Context/TicketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <TicketProvider>
        <App />
    </TicketProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
