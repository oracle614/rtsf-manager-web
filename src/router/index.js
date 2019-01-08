import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import Project from '@/components/project/Project.vue'
import Login from '@/components/login/Login.vue'
import test from '@/components/test.vue'

Vue.use(Router)

const routes = [
  {
    name: 'project',
    path: "/project",
    component: Project
  },
  {
    name: 'test',
    path: '/test',
    component: test
  }
]

const router = new Router({
  routes: routes
})

router.beforeEach((to, from, next) => {
  let token = $cookies.get('token')
  if (token || to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})

export default router
