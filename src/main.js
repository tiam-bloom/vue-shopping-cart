import Vue from "vue";
import App from "@/App.vue";

Vue.config.productionTip = false;

import store from "@/store/index.js";
import router from "@/router/index.js";

import "@/Mock/index.js";
import "@/assets/css/style.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount("#app");
