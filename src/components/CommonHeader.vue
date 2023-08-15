<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
        style="margin-right: 20px"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="@/assets/images/user.png" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'

export default {
  data () {
    return {}
  },
  methods: {
    handleMenu () {
      this.$store.commit('collapseMenu')
    },
    // 登出方法
    handleClick (command) {
      // 清除cookie信息
      if (command === 'cancel') {
        console.log('登出')
        Cookie.remove('token')
        // 还要清楚menu
        Cookie.remove('menu')
        // 跳转到首页
        this.$router.push('/login')
        // 退出登录后强制刷新一下页面。。。。
        // this.$router.go(0)
        location.reload()
      }
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  mounted () {
    console.log(this.tags, 'tags')
  }
}
</script>

<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .text {
    font-size: 14px;
    color: #fff;
    padding-left: 15px;
  }
  .r-content .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .l-content{
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        &.is-link{
          color: #666;
        }
      }
      &:last-child{
        .el-breadcrumb__inner{
          color: white;
        }
      }
    }
  }
}
</style>
