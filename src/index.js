import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';
import { BrowserRouter } from 'react-router-dom';
import 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.render(
  <BrowserRouter>
    <App />
    </BrowserRouter>
  ,
  document.getElementById('root')
);


