import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/test'
import Project from '@/components/project/Project.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: test
    },
    {
        path: "/project",
        component: Project
    }
  ]
})
