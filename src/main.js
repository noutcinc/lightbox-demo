// app.js
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import Vue from "vue";
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueLazyload);

new Vue({
  render: h => h(App)
}).$mount("#app");
