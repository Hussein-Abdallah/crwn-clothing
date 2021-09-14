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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return ;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }
  return userRef;
  
}

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider).catch(function(error) {
  if(error.code === 'auth/popup-closed-by-user') {
    console.log(error)
  }
});

export default firebase;