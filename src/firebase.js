import { initializeApp } from "@firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "@firebase/auth";

import "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyDRbwf_6RPX_T26KpOtaorKQgd_rvZhJg0",
  authDomain: "reactauth-9ca0e.firebaseapp.com",
  projectId: "reactauth-9ca0e",
  storageBucket: "reactauth-9ca0e.appspot.com",
  messagingSenderId: "729447556598",
  appId: "1:729447556598:web:ff94a6fcb80313790b93d7",
  measurementId: "G-33WGPXNPK2",
}); 

const auth = getAuth(app);

export { auth, signInWithEmailAndPassword ,signOut  };

export default app; 