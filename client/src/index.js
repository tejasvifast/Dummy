
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './scss/style.scss'

export const apiUrl= process.env.NODE_ENV==='development'? 'http://localhost:5000/':'https://warm-island-82496.herokuapp.com'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
