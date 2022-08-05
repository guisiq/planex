import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DCC from '../views/dcc.vue'
import chart3d from '../views/3dtest.vue'
import Meta from 'vue-meta'
Vue.use(VueRouter)
Vue.use(Meta)
const routes = [
  {
    meta:{
      title:"Sobre"
    },
    title:"Sobre",
    path: '/',
    name: 'home',
    component: HomeView,
    icon: 'door-open'
  },
  {
    meta:{
      title:"Delineamento Composto Central (DCC)"
    },
    title:"Delineamento Composto Central (DCC)",
    icon: 'list-nested', 
    path: '/DCC',
    name: 'DCC',
    component: DCC
  },
  {
    meta:{
      title:"Delineamento Composto Central (DCC)"
    },
    title:"chart3d",
    icon: 'list-nested', 
    path: '/chart3d',
    name: 'chart3d',
    component: chart3d
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //   }
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
