import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App.js';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const root = ReactDOM.createRoot(document.getElementById('accounting-app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

