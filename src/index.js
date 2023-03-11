import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { FirebaseContext } from './store/FirebaseContext';
import firebase from './firebase/config';
import Context from './store/FirebaseContext'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <FirebaseContext.Provider value={{ firebase }}>
        <Context>
          <App />
        </Context>
      </FirebaseContext.Provider>

    </Router>

  </React.StrictMode>
);

