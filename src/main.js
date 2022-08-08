import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/styles/main.css";
import "./assets/tailwind.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
initializeApp(firebaseConfig);

createApp(App).use(router).mount("#app");
