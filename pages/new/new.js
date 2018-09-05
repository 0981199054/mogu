// pages/new/new.js
import IP from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: IP.img,
    name: ""
  },
  onLoad() {
    this.setData({
      name: app.data.text
    })
  },
  order() {
    wx.navigateTo({
      url: `../news/news`
    })
  }
})