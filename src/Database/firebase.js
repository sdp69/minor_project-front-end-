import firebase from 'firebase';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

    let firebaseConfig = {
    apiKey: "AIzaSyDjSzdabDm8D5FK8BR5g_mIoxO_rXxxuL4",
    authDomain: "hooks-3f180.firebaseapp.com",
    projectId: "hooks-3f180",
    storageBucket: "hooks-3f180.appspot.com",
    messagingSenderId: "1068253657124",
    appId: "1:1068253657124:web:10097ef4deaf18ce73c0b1",
    measurementId: "G-Q8Q8HZPF69"
};
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();


 export default firebase;