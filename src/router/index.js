import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/login"
import News from "../views/news"
import Homepage from "../views/home";
import Sys from "../views/sys/"
import Layout from "../components/layout";
import User from "../views/user"
import NewsManagement from "../views/NewsManagement";
import Draft from "../views/draft";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'homepage',
        component: Homepage
      },
      {
        path: '/draft',
        name: 'draft',
        component: Draft
      },
      {
        path: '/news',
        name: 'news',
        component: News
      },
      {
        path: '/sys',
        name: 'sys',
        component: Sys
      },
      {
        path: '/News-management',
        name: 'news-management',
        component: NewsManagement
      },
      {
        path: '/users',
        name: 'users',
        component: User
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
