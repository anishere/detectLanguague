/* eslint-disable no-unused-vars */
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LayoutDetect from './components/layoutDetect'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCr-cyVx-unMyLt9cyHWL6K3Wx51M7wTAU",
  authDomain: "detectlanguague.firebaseapp.com",
  projectId: "detectlanguague",
  storageBucket: "detectlanguague.appspot.com",
  messagingSenderId: "463049655104",
  appId: "1:463049655104:web:c6f9efa3d4ee7b11d570a5",
  measurementId: "G-XWV7ZJ3YCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {

  return (
    <div className='App'>
      <LayoutDetect></LayoutDetect>
    </div>
  )
}

export default App
