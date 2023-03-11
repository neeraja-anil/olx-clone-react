import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/auth'
import 'firebase/storage'



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7KBrDak7SvuqOUcxYcye3wKjW8GuTVVY",
    authDomain: "olx-clone-8719f.firebaseapp.com",
    projectId: "olx-clone-8719f",
    storageBucket: "olx-clone-8719f.appspot.com",
    messagingSenderId: "518214033380",
    appId: "1:518214033380:web:0533a14b71ec2df663f1f1",
    measurementId: "G-Y7TLTGY5K5"
  };

 export default firebase.initializeApp(firebaseConfig)