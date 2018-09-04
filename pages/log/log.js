// pages/log/log.js
import IP from '../../utils/util.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    pwd: '',
    city: '',
    nickname: '',
    img: IP.img,
  },
  getUser(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getPwd(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  getNickname(e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  getCity(e) {
    this.setData({
      city: e.detail.value
    })
  },
  log() {
    let param = {
      name: this.data.name,
      pwd: this.data.pwd,
      city: this.data.city,
      nickname: this.data.nickname,
    }
    wx.request({
      url: IP.ip + 'log',
      data: {
        ...param
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        wx.navigateBack({
          delta: 1
        })
      }
    })

  },
})