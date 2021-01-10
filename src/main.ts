import { createApp } from "vue"
import App from "./App.vue"
import "./index.css"

import { rtdbPlugin } from "vuefire"

createApp(App).use(rtdbPlugin).mount("#app")
