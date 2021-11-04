import firebase from "firebase";

import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyATvc6Os9FzW2OSRsYRxrkZg7LzQLv1rU0",
    authDomain: "reactnative-firebase-9ddd7.firebaseapp.com",
    projectId: "reactnative-firebase-9ddd7",
    storageBucket: "reactnative-firebase-9ddd7.appspot.com",
    messagingSenderId: "147530679083",
    appId: "1:147530679083:web:2b16fadfbba97766073b6e"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default {
    firebase,
    db
}