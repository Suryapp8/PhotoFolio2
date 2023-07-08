import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDz5bJnM_ZVg9pbp3eLdTNnsN9BBtyTfrc",
    authDomain: "photofolio-6ab0e.firebaseapp.com",
    projectId: "photofolio-6ab0e",
    storageBucket: "photofolio-6ab0e.appspot.com",
    messagingSenderId: "984716149501",
    appId: "1:984716149501:web:4180e3b5c0c7ffbcbab494"
  };
  

  
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();