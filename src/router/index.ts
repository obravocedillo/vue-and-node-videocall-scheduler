import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store/index';
/* eslint-disable */
Vue.use(VueRouter)

  const routes:Array<RouteConfig> = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: () => import('../views/Appointments.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/meeting:id',
    name: 'Meeting',
    component: () => import('../views/Meeting.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new-appointment',
    name: 'NewAppointment',
    component: () => import('../views/NewAppointment.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if(store.getters.LOADED == false){
        store.dispatch('CHECKUSER').then((result) => {
          console.log(store.getters.LOGGED_IN)
          if (store.getters.LOGGED_IN) {
            next()
            return
          }else{
            next('/login')
          }
        })
      }else if (store.getters.LOGGED_IN){
        next()
        return
      }else{
        next('/login')
      } 
  } else {
      next()
  }
})

export default router
