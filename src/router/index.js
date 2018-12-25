import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/test'
import Project from '@/components/project/Project.vue'
import Login from '@/components/login/Login.vue'


Vue.use(Router)


export default new Router({
  routes: [
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
})
