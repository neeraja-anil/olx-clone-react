import React, { useEffect, useContext } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import LoginPage from './Pages/Login';
import View from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import Create from './Components/Create/Create';
import Post from './store/PostContext';

function App() {

  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  const auth = getAuth()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])

  return (
    <div>
      <Post>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/login' element={<LoginPage />}></Route>
          <Route exact path='/create' element={<Create />}></Route>
          <Route exact path='/view-post' element={<View />}></Route>
        </Routes>
      </Post>
    </div>
  );
}

export default App;
