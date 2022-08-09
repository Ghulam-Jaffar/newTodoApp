import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { collection, addDoc, getDocs } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAByt6FRrTvCbERKcDWablCLiXklvbL3LU",
  authDomain: "todoapp-b98a3.firebaseapp.com",
  projectId: "todoapp-b98a3",
  storageBucket: "todoapp-b98a3.appspot.com",
  messagingSenderId: "931363768978",
  appId: "1:931363768978:web:18170fb8d6acc6e0a1744b",
  measurementId: "G-Z6JTQCSK3S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);

// const docRef = addDoc(collection(db, "todos"), {
//   name: "ye kia baat hui boss",
//   completed: false,
// })
//   .then(() => {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(() => {
//     console.log("Error adding document: ");
//   });

// const querySnapshot = getDocs(collection(db, "todos")).then(() => {
//   console.log(querySnapshot);
//   if (querySnapshot) {
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data()}`);
//     });
//   }
// });

// db.collection("todos")
//   .then(() => {
//     console.log("got it");
//   })
//   .catch((err) => {
//     console.log("error", err);
//   });
export default db;
