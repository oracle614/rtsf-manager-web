import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import Project from '@/components/project/Project.vue'
import Login from '@/components/login/Login.vue'


Vue.use(Router)

const routes = [
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
  let token = $cookies.get('token')
  console.log(token)
  if (token || to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})

export default router
