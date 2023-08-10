import home from '@/api/mockServeData/home'
import Cookie from 'js-cookie'

export default {
  state: {
    isCollapse: false, // 控制菜单栏的收起
    tabsList: [
      // 存放面包屑的数据
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      }
    ],
    Menu: []
  },
  mutations: {
    // 修改菜单
    collapseMenu (state) {
      state.isCollapse = !state.isCollapse
    },
    // 更新面包屑的数据
    selectMenu (state, val) {
      console.log(val, 'val')
      if (val.name !== 'home') {
        const index = state.tabsList.findIndex(item => item.name === val.name)
        // 如果不存在
        if (index === -1) {
          state.tabsList.push(val)
        }
      }
    },
    // 删除指定的tag数据
    closeTag (state, item) {
      // console.log(item, 'item')
      const index = state.tabsList.findIndex(val => item.name === val.name)
      state.tabsList.splice(index, 1)
    },
    setMenu (state, val) {
      state.Menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    // 动态注册路由
    addMenu (state, router) {
      // 判断缓存中是否有数据
      if (!Cookie.get('menu')) {
        const menu = JSON.parse(Cookie.get('menu'))
        state.menu = menu
        // 组装动态路由的数据
        const menuArray = []
        menu.forEach(item => {
          if (item.children) {
            item.children = item.children.map(item => {
              item.component = () => import(`../views/${item.url}`)
              return item
            })
            menuArray.push(...item.children)
          } else {
            item.component = () => import(`../views/${item.url}`)
            return item
          }
        })
        console.log(menuArray, 'menuArray')
        // 路由的动态添加
        menuArray.forEach(item => {
          router.addRoute('Home_main', item)
        })
      }
    }

  }
}
