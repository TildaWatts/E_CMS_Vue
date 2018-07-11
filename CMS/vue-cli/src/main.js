import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'//要安装router包
import {routes} from './routes'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(VueRouter);
Vue.use(iView);

const router = new VueRouter({
  routes: routes,
  mode: 'hash'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
