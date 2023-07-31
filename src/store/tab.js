export default {
    state: {
        isCollapse: false
    },
    mutations: {
        // 修改菜单
        collapseMenu (state) {
            state.isCollapse = !state.isCollapse
        }
    }
}
