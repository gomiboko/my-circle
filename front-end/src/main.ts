import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { errorHandler } from "./utils/global-error-handler";
import { state } from "./store/store";

Vue.config.productionTip = false;

// 状態管理用のオブジェクトを設定
Vue.prototype.$state = state;

// axiosの設定
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_BASE_URL;
axios.defaults.timeout = 10 * 1000;
Vue.prototype.$http = axios;

// エラーハンドラの設定
Vue.config.errorHandler = errorHandler;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
