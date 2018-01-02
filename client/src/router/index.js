import Vue from 'vue'
import Router from 'vue-router'
import HouseList from '@/components/houselist'
import Signin from '@/components/signin'
import Signup from '@/components/signup'
import House from '@/components/house'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'houselist',
      component: HouseList
    },
    {
      path: '/signin',
      name: 'sign',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/house/:id',
      name: 'house',
      component: House
    },
  ]
})
