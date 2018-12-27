import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/test'
import Project from '@/components/project/Project.vue'
import Login from '@/components/login/Login.vue'


Vue.use(Router)

const routes = [
  {
    path: '/',
    component: test
  },
  {
    path: '/login',
    component: Login
  },
  {
      path: "/project",
      component: Project
  }
]

const router = new Router({
  routes: routes
})

router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('token')
  console.log(token)
  if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    console.log('here 2')
  } else {
    console.log('here 1')
    next()
  }
})

export default router
