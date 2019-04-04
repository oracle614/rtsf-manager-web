import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import Project from '@/components/project/Project.vue'
import Login from '@/components/login/Login.vue'
import Register from '@/components/login/Register.vue'
import NotFound from '@/components/404.vue'
import HelloWorld from '@/components/HelloWorld.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/index',
    component: index,
    children: [
        { path: '/project', component: Project, name: '项目主页' }
    ]
  },
  {
      path: '/login',
      component: Login,
      name: '',
      hidden: true
  },
  {
      path: '/register',
      component: Register,
      name: '',
      hidden: true
  },
  {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
  },
  {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
  },
  {
    path: '/hello',
    component: HelloWorld
  },
]

const router = new Router({
  routes: routes
})

// production or development
if(process.env.NODE_ENV == "production") {
  router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
      sessionStorage.removeItem('token');
    }
    let token = JSON.parse(sessionStorage.getItem('token'));
    if (to.path == '/register') {
      next()
    } else if (!token && to.path != '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
  })
}

export default router
