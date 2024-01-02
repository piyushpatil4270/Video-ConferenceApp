import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom"
import {SocketProvider} from './Context/SocketProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <SocketProvider>
      <App/>
      </SocketProvider>
    </Router>
  </React.StrictMode>
);
