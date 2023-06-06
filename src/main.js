import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import "./assets/main.css";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far, fab);
dom.watch();

const app = createApp(App);
app.use(VueTailwindDatepicker);
app.use(router);
app.use(store);

app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");
