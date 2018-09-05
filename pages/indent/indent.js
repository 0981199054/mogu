// pages/indent/indent.js
import IP from '../../utils/util.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: IP.img,
    list: {},
    deliver: {},
    take: {},
    navbar: ['全部', '待付款', '待发货', '待收货'],
    currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.data.text)
    wx.request({
      url: IP.ip + 'indent',
      data: {
        buyname: app.data.text
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        let deliver = res.data.map(item => {
          if (item.isfufei === '买家已付款') {
            return item
          }
        })
        let take = res.data.map(item => {
          if (item.isfufei === '卖家已发货') {
            return item
          }
        })
        console.log(take)
        this.setData({
          // 全部
          list: res.data,
          // 待发货
          deliver: deliver,
          // 待收货
          take: take
        })
      }
    })
  },
  // 跳转
  navbarTap(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    })
  }

})