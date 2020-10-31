import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios'
import About from "../views/About";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080' /*配置前缀URL*/
/*使用this.$http.而不是axios.是因为this.$http.这种形式比较通用。如果不再使用axios，只需要在main.js中修改即可*/
/*无需再改页面代码*/
Vue.prototype.$http = axios
Vue.use(axios)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about/:scenarioCode',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
