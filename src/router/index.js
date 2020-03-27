import Vue from 'vue'
import VueRouter from 'vue-router'

import Intro from '@/components/Intro'
import Day from '@/components/Day'
import Calendar from '@/components/Calendar'
import Setting from '@/components/Setting'
import About from '@/components/About'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'intro',
    component: Intro
  },
  {
    path: '/day/:date',
    name: 'day',
    component: Day
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting
  },
  {
    path: '/about',
    name: 'about',
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
