// mock数据模抵
import Mock from 'mockjs'

const List = []
export default {
  getStatisticalData: () => {
    // Mock.Random.float  生随机数100到8000之同 保留小数 最小9位 最大01
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 8000, 0, 0),
          oppo: Mock.Random.float(100, 8000, 0, 0),
          三星: Mock.Random.float(100, 8000, 0, 0),
          小米: Mock.Random.float(100, 8000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
        videoData: [{
          name: '小米',
          value: 2999
        },
        {
          name: '苹果',
          value: 5999
        },
        {
          name: 'vivo',
          value: 1500
        },
        {
          name: 'oppo',
          value: 1999
        },
        {
          name: '魅族',
          value: 2200
        },
        {
          name: '三星',
          value: 4500
        }
        ],
        userData: [{
          date: '周一',
          new: 5,
          active: 200
        },
        {
          date: '周二',
          new: 10,
          active: 500
        },
        {
          date: '周三',
          new: 12,
          active: 550
        },
        {
          date: '周四',
          new: 60,
          active: 800
        },
        {
          date: '周五',
          new: 65,
          active: 550
        }
        ],
        orderData: {
          date: ['20191001', '20191001', '20191001', '20191001', '20191001', '20191001', '20191001'],
          data: List
        },
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
        ]
      }
    }
  }
}
