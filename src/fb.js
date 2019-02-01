import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAf3_bSXFa_cxI8XzwEDOSM2-MD_uwth38",
    authDomain: "vuetify-tut-9d958.firebaseapp.com",
    databaseURL: "https://vuetify-tut-9d958.firebaseio.com",
    projectId: "vuetify-tut-9d958",
    storageBucket: "vuetify-tut-9d958.appspot.com",
    messagingSenderId: "1068225669636"
};
firebase.initializeApp(config);
const db = firebase.firestore();

db.settings ({timestampsInSnapshots: true});
export default db;