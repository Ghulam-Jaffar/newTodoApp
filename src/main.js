import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/styles/main.css";
import "./assets/tailwind.css";
import db from "./fb/index";

db;

createApp(App).use(router).mount("#app");
