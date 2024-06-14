import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/login"
import News from "../views/news"
import Homepage from "../views/home";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Homepage
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path:'/login',
    name:'login',
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
