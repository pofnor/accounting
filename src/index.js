import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App.js';

const root = ReactDOM.createRoot(document.getElementById('accounting-app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);