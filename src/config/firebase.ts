import Firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDSlzi-R46ww9LPYPl0OtuSL2aiP7ICtF8",
    authDomain: "todo-app-65457.firebaseapp.com",
    databaseURL: "https://todo-app-65457-default-rtdb.firebaseio.com",
    projectId: "todo-app-65457",
    storageBucket: "todo-app-65457.appspot.com",
    messagingSenderId: "262976678452",
    appId: "1:262976678452:web:e9874b9c05fe1fa3e83861"
};

const firebaseApp = Firebase.initializeApp(firebaseConfig);

export default firebaseApp;
