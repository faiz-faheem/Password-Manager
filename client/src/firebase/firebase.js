import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpsbdMwVziQH3kpbtycZj92f_snadVjsc",
  authDomain: "password-266c7.firebaseapp.com",
  projectId: "password-266c7",
  storageBucket: "password-266c7.firebasestorage.app",
  messagingSenderId: "266174917871",
  appId: "1:266174917871:web:3bc20c10ad99cfda263f1a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
