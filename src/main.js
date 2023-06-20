import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import router from "./router/index.js";

import "./Mock/index.js";
import "@/assets/css/style.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import Vuex from 'vuex'
Vue.use(Vuex)

new Vue({
  render: h => h(App),
  router,
}).$mount("#app");
