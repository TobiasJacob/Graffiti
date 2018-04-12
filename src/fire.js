import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyCqGns11RGHYG1iHTaDFLCF1DRXtT6sTEM",
  authDomain: "graffiti-85757.firebaseapp.com",
  databaseURL: "https://graffiti-85757.firebaseio.com",
  storageBucket: "graffiti-85757.appspot.com",
  messagingSenderId: "470110009659"
};
var fire = firebase.initializeApp(config);
export default fire;