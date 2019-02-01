import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCGQTZ_hyTQvH4P05cXqhvEmFV-6VRgKVc",
    authDomain: "ntu-lifehacks.firebaseapp.com",
    databaseURL: "https://ntu-lifehacks.firebaseio.com",
    projectId: "ntu-lifehacks",
    storageBucket: "ntu-lifehacks.appspot.com",
    messagingSenderId: "444471549283"
};
firebase.initializeApp(config);
const db = firebase.firestore();

// db.settings ({timestampsInSnapshots: true});
export default db;