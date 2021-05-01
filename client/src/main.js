import Vue from 'vue'
import App from './App.vue'
import VueRx from "vue-rx";
import VTooltip from "v-tooltip";
import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

Vue.config.productionTip = false;

Vue.use(VueRx);
Vue.use(VTooltip);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});

// new Vue({
//   el: '#app',
//   render: h => h(App)
// })


