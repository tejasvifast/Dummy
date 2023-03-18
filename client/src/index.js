
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './scss/style.scss'

export const apiUrl= 'http://localhost:3000/'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
