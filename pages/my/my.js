// pages/my/my.js
import IP from '../../utils/util.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: IP.img,
    name: '',
    isReg: false,
    myImg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      isReg: app.data.isReg,
      name: app.data.text,
      myImg:app.data.img
    })
    console.log(this.data.myImg.length)
  },
  reg() {
    wx.navigateTo({
      url: '../reg/reg'
    })
  },
  exitReg() {
    app.data.isReg = false
    wx.reLaunch({
      url: '../index/index',
    })
  },
  buyshop() {
    wx.switchTab({
      url: '../shop/shop'
    });

  },
  order() {
    wx.navigateTo({
      url: '../indent/indent'
    })
  }

})