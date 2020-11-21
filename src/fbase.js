// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    // 키 값을 직접 써주지 않는 이유는 키 들을 github에 올리고 싶지 않아서이다.
    // 하지만 빌드를 하면 값이 바뀌기 때문에 결국엔 사용자에게 보인다.
    // 이 부분은 결국 github만을 위한 코드
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const authService = firebase.auth();