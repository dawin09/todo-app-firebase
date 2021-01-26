import { createApp } from "vue";
import Root from "./App.vue";
import "./index.css"
import "./config";
import { rtdbPlugin } from "vuefire";

const app = createApp(Root);
app.use(rtdbPlugin);
app.mount("#app")
