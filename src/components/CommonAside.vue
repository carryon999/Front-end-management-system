<template>

  <el-menu default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">

    <h3>{{isCollapse ? '后台': '通用后台管理系统' }}</h3>

    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template v-slot:title>
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </template>

      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>

      <!-- <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item :index="subItem.path">{{subItem.label}}</el-menu-item>
      </el-menu-item-group> -->
    </el-submenu>
  </el-menu>
</template>

<script>
import store from '../store'
import Cookie from 'js-cookie'
export default {
  data () {
    return {
      // isCollapse: false,

    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 点击菜单
    clickMenu (item) {
      console.log(item)
      // 解决二次点击报错的问题
      // 当页面的路由与页面的路由不一致的情况下才跳转
      //   if (this.$route.path === '/home' && ['/home', '/'].includes(item.path)) return
      //   this.$router.push(item.path)
      if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
        this.$router.push(item.path)
      }
      this.$store.commit('selectMenu', item)
    }
  },
  computed: {
    // 没有子菜单
    noChildren () {
      return this.menuData.filter(item => !item.children)
    },
    // 有子菜单
    hasChildren () {
      return this.menuData.filter(item => item.children)
    },
    menuData () {
      // 判断当前数据，如果缓存中没有，当前store中去获取
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    },
    isCollapse () {
      return this.$store.state.tab.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  height: 100vh;
  border-right: none;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
</style>
