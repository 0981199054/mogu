// pages/seek/seek.js
import IP from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    img: IP.img,
    seek: "false",
    val: '', 
    store_name:'',
    inputVal:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      seek: options.seek,
      val: options.val,
    })
    if (this.data.seek == "false") {
      wx.request({
        url: IP.ip + 'shop',
        data: {
          commodity_name: options.val,
          store_name: options.name,
        },
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          this.setData({
            list: res.data,
            store_name: options.name,
          })
        }
      })
    } else {
      wx.request({
        url: IP.ip + 'shop',
        data: {
          commodity_name: options.val
        },
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          this.setData({
            list: res.data,
          })
          console.log(this.data.list)
        }
      })
    }

  },
  phone() {
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })
  },
  seek(e) {
    this.setData({
      inputVal: ""
    })
    if (this.data.seek == "false") {
      wx.request({
        url: IP.ip + 'shop',
        data: {
          commodity_name: e.detail.value,
          store_name: this.data.store_name,
        },
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          this.setData({
            list: res.data,
          })
          console.log(this.data.list)
        }
      })
    } else {
      wx.request({
        url: IP.ip + 'shop',
        data: {
          commodity_name: e.detail.value
        },
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          this.setData({
            list: res.data,
          })
        }
      })
    }
  } ,//商品页面跳转
  shop_click(e) {
    wx.navigateTo({
      url: `../details/details?data=${e.currentTarget.dataset.item._id}`
    })
    
  },
})