import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyBnKsXTHTS2QnU-fs8EqjXyjZUd5fcL1vc",
  authDomain: "crwn-db-bogas.firebaseapp.com",
  projectId: "crwn-db-bogas",
  storageBucket: "crwn-db-bogas.appspot.com",
  messagingSenderId: "437573226181",
  appId: "1:437573226181:web:9c12493068c07cc947eaac",
  measurementId: "G-NFBSTG6HSR"
};

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;