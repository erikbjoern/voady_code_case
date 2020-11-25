import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { createProvider } from './vue-apollo';
import './assets/styles/index.css';

Vue.config.productionTip = false;

new Vue({
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
