// pages/reg/reg.js
import IP from '../../utils/util.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    pwd: '',
    img: IP.img,
  },
  getUser(e) {
    this.setData({
      user: e.detail.value
    })
  },
  getPwd(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  reg() {
    wx.request({
      url: IP.ip + 'reg',
      data: {
        name: this.data.user,
        pwd: this.data.pwd
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        if (res.data.length === 0) {
          wx.showToast({
            title: '账号密码错误',
            icon: 'none',
            duration: 1000,
            mask: true,
          })
        } else {
          app.data.text = res.data[0].nickname;
          app.data.isReg = true;
          wx.reLaunch({
            url: '../index/index',
          })
        }
      }
    })

  },
  // 前往注册页面
  golog() {
    wx.navigateTo({
      url: '../log/log'
    })
  }

})