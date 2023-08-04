<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right:10px">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/images/user.png" alt />
            <div class="userInfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2023-9-9</span></p>
            <p>上次登录地点：<span>武汉</span></p>
          </div>
        </el-card>
        <!-- 依然要用卡片展示 -->
        <el-card>
          <el-table
            :data="tableData"
            style="width: 100%">
              <el-table-column
                prop="name"
                label="品牌"
                width="120">
              </el-table-column>
              <el-table-column
                prop="todayBuy"
                label="日卖"
                width="120">
              </el-table-column>
              <el-table-column
                prop="monthBuy"
                label="月卖"
                width="120">
              </el-table-column>
              <el-table-column
                prop="totalBuy"
                label="总售卖">
              </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left:10px">
        <div class="num">
          <el-card v-for="item in countData" :key="item.name" :body-style="{display: 'flex', padding: 0}">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
            <div class="detail">
              <p class="price">¥ {{item.value}}</p>
              <p class="txt">{{item.name}}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px">
          <!-- 折线图 -->
          <div ref="echarts1" style="height: 280px"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 260px">
            <div ref="echarts2" style="height: 260px"></div>
          </el-card>
          <el-card style="height: 260px">
            <div ref="echarts3" style="height: 240px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default {
  data () {
    return {
       tableData: [
          {
            name: 'oppo',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000
          },
          {
            name: 'vivo',
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000
          },
          {
            name: '苹果',
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000
          },
          {
            name: '小米',
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000
          },
          {
            name: '三星',
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000
          },
          {
            name: '魅族',
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: 22000
          }
        ],

        countData: [
          {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
          },
          {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
          },
          {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
          },
          {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
          },
          {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
          },
          {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
          }
        ]
    }
  },
  mounted () {
    getData().then(({ data }) => {
      const { tableData } = data.data
      console.log(data.data)
      this.tableData = tableData

      // 折线图
      // 基于准备好的DOM，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1)
      // 指定图标的数据项和数据
      const echarts1Option = {}

      // 数据处理xAxis
      const { orderData, userData, videoData } = data.data
      const xAxis = Object.keys(orderData.data[0])
      console.log(xAxis)
      echarts1Option.xAxis = {
        data: xAxis
        }
      echarts1Option.legend = {
        data: xAxis
      }
      echarts1Option.yAxis = {}
      echarts1Option.series = []
      xAxis.forEach(key => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        })
      })
      // console.log(echarts1Option)
      // 根据配置显示图表
      echarts1.setOption(echarts1Option)

      // 柱状图   用户配置
      // 基于准备好的DOM，初始化echarts实例
      const echarts2 = echarts.init(this.$refs.echarts2)
      // 指定图标的数据项和数据
      const echarts2Option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '20%'
        },
        // 提示框
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category', // 类目轴
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            interval: 0,
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3'],
        series: [
          {
            name: '新增用户',
            data: userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar'
          }
        ]
      }
      // 根据配置显示图表
      echarts2.setOption(echarts2Option)

      // 饼状图   用户配置
      // 基于准备好的DOM，初始化echarts实例
      const echarts3 = echarts.init(this.$refs.echarts3)
      // 指定图标的数据项和数据
      const echarts3Option = {
          tooltip: {
          trigger: 'item'
        },
        color: [
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf'
        ],
        series: [
          {
            data: videoData,
            type: 'pie'
          }
        ]
      }
      // 根据配置显示图表
      echarts3.setOption(echarts3Option)
    })
  }
}
</script>

<style lang="less" scoped>
  .box-card{
    margin-bottom: 20px;
  }
  .user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    img {
      margin-right: 40px;
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
    .userInfo{
      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }
      .access {
        color: #999;
      }
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .num {
    .el-card{
      width: 32%;
      margin-bottom: 20px;
    }
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .icon {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      display: flex;
      flex-direction: column;  //flex布局主轴纵向显示
      justify-content: center;
      margin-left: 15px;
      .price {
        font-size: 30px;
        margin-bottom: 10px;
        line-height: 30px;
      }
      .txt {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph {
    display: flex;
    justify-content: space-between;   //    左右贴边
    margin-top: 20px;
    .el-card {
      width: 48%;
    }
  }
</style>
