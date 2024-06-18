import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/login"
import News from "../views/news"
import Homepage from "../views/home";
import Sys from "../views/sys/"
import Layout from "../components/layout";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    children:[
      {
        path:'/home',
        name:'homepage',
        component:Homepage
      },
      {
        path:'/news',
        name:'news',
        component:News
      },
      {
        path:'/sys',
        name:'sys',
        component:Sys
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
