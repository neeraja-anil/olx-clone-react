import React,{useState, useContext} from 'react';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import {FirebaseContext} from '../../store/FirebaseContext'

import Logo from '../../olx-logo.png';
import './Login.css';
import {useNavigate} from 'react-router-dom'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {firebase} = useContext(FirebaseContext)

  const auth = getAuth()
  const navigate = useNavigate()

  const handleLogin=(e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth,email,password).then(()=>{
      navigate('/')
    }).catch((err)=>{
      alert(err.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
