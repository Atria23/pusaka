// resources/js/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBTEnwMfkJDBPknY8hmnTVy77Wq6n3xRrQ",
  authDomain: "muvausaapp.firebaseapp.com",
  projectId: "muvausaapp",
  storageBucket: "muvausaapp.appspot.com",
  messagingSenderId: "831224367804",
  appId: "1:831224367804:web:b2c1384fe97c6ac6f2deb9",
  measurementId: "G-979ZSBERGQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
