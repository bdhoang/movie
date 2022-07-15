import firebase from "firebase";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAYgQMwGMT0wXIDXeiokQ1sqspC0gNXeFI",
  authDomain: "netflix-c0e14.firebaseapp.com",
  projectId: "netflix-c0e14",
  storageBucket: "netflix-c0e14.appspot.com",
  messagingSenderId: "597257449578",
  appId: "1:597257449578:web:1c4ea99a2d6f48ada75a13",
  measurementId: "G-N6Q1CNJKLN",
  databaseURL:"https://netflix-c0e14-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
const storage  = firebase.storage();
export const  database = firebase.database();
export default storage;