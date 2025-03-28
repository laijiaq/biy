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
import review from "../views/review";
import reviewPhoto from "../views/reviewPhoto";
import contentreview from "../views/contentreview";


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
        path: '/review',
        name: 'review',
        component: review
      },
      {
        path: '/reviewPhoto',
        name: 'reviewPhoto',
        component: reviewPhoto
      },
      {
        path: '/contentreview',
        name: 'contentreview',
        component: contentreview
      },
      {
        path: '/users',
        name: 'users',
        component: User
      },
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

// router.beforeEach((to, from, next) => {
//   const user = localStorage.getItem('user');
//   console.log('login',to.path);
//   if (to.path !== '/login' && !user) {
//     // 如果不是登录页且用户未登录，则跳转到登录页
    
//     next('/login');
//   } else {
//     // 否则放行
//     next();
//   }
// });
// 全局前置守卫
// router.beforeEach((to, from, next) => {
  // 这里是检查逻辑
  // to: 即将要进入的目标路由对象
  // from: 当前导航正要离开的路由
  // next: 一定要调用该方法来 resolve 这个钩子

  // 假设你有一个全局状态管理 store，你可以在这里检查用户是否登录
  // 如果用户未登录，并且即将访问的路由需要认证，则重定向到登录页面
  // const isAuthenticated = this.$store.state.loginSdate;
  // const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // if (to.path =='/login') {
  //   next();
  // } else {
  //   if()
  // }
  // console.log(to.path);
// });
export default router
