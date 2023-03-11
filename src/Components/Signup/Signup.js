import React, { useState, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import Firebase from '../../firebase/config'
import { useNavigate } from 'react-router-dom';


import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/FirebaseContext';
import './Signup.css';

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const { firebase } = useContext(FirebaseContext)
  const auth = getAuth()
 
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log('signedIn')
      updateProfile(userCredential.user, { displayName: username })
        .catch(err => console.log({ err }))
        .then(() => {
          firebase.firestore().collection('users').add({
            id: userCredential.user.uid,
            username: username,
            phone: phone
          })
            .then(() => {
              navigate('/login')
            })
        })
    })
  }



  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
