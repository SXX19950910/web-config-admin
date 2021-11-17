import Vue from 'vue'
import VueRouter from 'vue-router'
import table from './table'
import Cookies from 'js-cookie'

Vue.use(VueRouter)
const isProd = process.env.NODE_ENV === 'production'

const routes = [
  {
    path: '/',
    redirect: '/table'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  ...table
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASEURL,
  routes
})

router.beforeEach((to, from, next) => {
  const meta = Object.assign({ title: '组件数据配置中心' }, to.meta || {})
  document.title = meta.title
  const token = Cookies.get('config_token') && Cookies.get('config_user_id')
  const inWhitePaths = ['/login'].includes(to.path)
  const query = to.query
  const { login_token = '', user_id = '' } = query
  if (!token && (login_token && user_id)) {
    Cookies.set('config_token', login_token, 1)
    Cookies.set('config_user_id', user_id, 1)
  }
  if (inWhitePaths) {
    next()
  } else if (isProd && !token) {
    next({
      name: 'Login'
    })
  } else {
    next()
  }
})

export default router
