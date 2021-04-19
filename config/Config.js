import firebase from 'firebase';

 var firebaseConfig = {
    apiKey: "AIzaSyARCACuKSYwSjvtjL3-wo378PzQnbx39C8",
    authDomain: "homeautomation-d2d4b.firebaseapp.com",
    databaseURL: "https://homeautomation-d2d4b.firebaseio.com",
    projectId: "homeautomation-d2d4b",
    storageBucket: "homeautomation-d2d4b.appspot.com",
    messagingSenderId: "992288997645",
    appId: "1:992288997645:web:9dc2e5bad3f55494647044",
    measurementId: "G-7Q2XQFZ5G8"
  };





  firebase.initializeApp(firebaseConfig)

  export const f = firebase;
  export const database = firebase.database();
  export const auth = firebase.auth();
  export const storage = firebase.storage();