import home from '@/api/mockSeveData/home'

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
    ]
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
    }
  }
}
