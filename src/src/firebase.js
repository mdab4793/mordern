import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAtnqiJK22SWAIedvzOCekO-IH_ia3_ok",
  authDomain: "withpet-c462c.firebaseapp.com",
  projectId: "withpet-c462c",
  storageBucket: "withpet-c462c.appspot.com",
  messagingSenderId: "856511514611",
  appId: "1:856511514611:web:fc81e2f38aa9ad71653486",
};

firebase.initializeApp(firebaseConfig);
export const authService = firebase.auth();
