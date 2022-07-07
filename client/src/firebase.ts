import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAYgQMwGMT0wXIDXeiokQ1sqspC0gNXeFI",
  authDomain: "netflix-c0e14.firebaseapp.com",
  projectId: "netflix-c0e14",
  storageBucket: "netflix-c0e14.appspot.com",
  messagingSenderId: "597257449578",
  appId: "1:597257449578:web:1c4ea99a2d6f48ada75a13",
  measurementId: "G-N6Q1CNJKLN"
};

firebase.initializeApp(firebaseConfig);
const storage  = firebase.storage();
export default storage;