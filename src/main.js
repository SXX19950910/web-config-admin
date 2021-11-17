import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementComponents from './plugins/element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import api from './api'
import loadsh from 'loadsh/lang'


elementComponents.map(item => Vue.use(item))
import fetchTable from 'fetch-table'
import 'fetch-table/dist/fetch-table.css'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$_ = loadsh

Vue.use(fetchTable, {
  baseURL: 'http://127.0.0.1:6002/configApi/table/query',
  // baseURL: 'http://10.0.30.142/configApi/table/query'
})
Vue.use(antd)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
