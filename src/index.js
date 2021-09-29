import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBf-uJPH8wl9VgslTVj6_9DzyOCjXlzUW8",
  authDomain: "chatting-57f70.firebaseapp.com",
  projectId: "chatting-57f70",
  storageBucket: "chatting-57f70.appspot.com",
  messagingSenderId: "198577478587",
  appId: "1:198577478587:web:6d6f95311aa8ca84f6829e",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
