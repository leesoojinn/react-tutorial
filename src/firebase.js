// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// 사용자 인증 import
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByVNW5KoK8Cop6XtVTUUBPf8vkeUYvJAk",
  authDomain: "react-tutorial-adef8.firebaseapp.com",
  projectId: "react-tutorial-adef8",
  storageBucket: "react-tutorial-adef8.appspot.com",
  messagingSenderId: "950745249",
  appId: "1:950745249:web:dfb67130e40ea1ffff58e0",
};

// Initialize Firebase
// export 해주기
export const app = initializeApp(firebaseConfig);
// 사용자 인증 export
export const auth = getAuth(app);
