import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './api/mock'
import Cookie from 'js-cookie'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // 判断cookie是否存在
  const token = Cookie.get('token')
  if (!token && to.name !== 'login') {
    // 说明用户没有登录
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
