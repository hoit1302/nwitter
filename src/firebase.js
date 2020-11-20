// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC9G66G3FdMgh4rFTnKmOAyuqDQYwQP8sI",
    authDomain: "nwitter-5bfcd.firebaseapp.com",
    databaseURL: "https://nwitter-5bfcd.firebaseio.com",
    projectId: "nwitter-5bfcd",
    storageBucket: "nwitter-5bfcd.appspot.com",
    messagingSenderId: "711658436726",
    appId: "1:711658436726:web:65b55861eddfc9b6218757"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);  