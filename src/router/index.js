import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import Mall from '@/views/Mall.vue'
import PageOne from '@/views/PageOne.vue'
import PageTwo from '@/views/PageTwo.vue'
import Home_main from '@/views/Home_main.vue'

Vue.use(VueRouter)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
    {
        path: '/',
        component: Home_main,
        redirect: '/home', // 重定向
        children: [
            { path: '/home', component: Home }, // 首页
            { path: '/user', component: User }, // 用户管理
            { path: '/mall', component: Mall }, // 商品管理
            { path: '/page1', component: PageOne }, // 页面一
            { path: '/page2', component: PageTwo } // 页面二
        ]

    }

]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router
