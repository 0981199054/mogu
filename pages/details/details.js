// pages/details/details.js
import IP from '../../utils/util.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    img: IP.img,
    animationData: '',
    isServe: false,
    size: '规格',
    isSize: false,
    clickStyle: -1,
    clickSize: -1,
    styleText: '',
    sizeText: '',
    num: 1,
    styleIndex: "",
    sizeIndex: "",
    isReg: false,
    collect: true,
    buyName: "",
    ball: false
  },
  onLoad: function(option) {
    wx.request({
      url: IP.ip + 'shop',
      data: {
        _id: option.data
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        // console.log(res.data)
        this.setData({
          list: res.data,
          isReg: app.data.isReg,
          buyName: app.data.text,
        })
      }
    })
  },
  //---------------------- 服务说明-----------------------//
  //显示对话框
  showServe() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      serveData: animation.export(),
      isServe: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        serveData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideServe() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      serveData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        serveData: animation.export(),
        isServe: false
      })
    }.bind(this), 200)
  } //---------------------- 尺码选择-----------------------//
  //显示对话框
  ,
  showSize() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      sizeData: animation.export(),
      isSize: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        sizeData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideSize() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      sizeData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        sizeData: animation.export(),
        isSize: false
      })
    }.bind(this), 200)
  },
  // -------------------------------------规格选择------------------------------//
  chose_style(e) {
    this.setData({
      clickStyle: e.currentTarget.id,
      styleText: e.currentTarget.dataset.value,
      styleIndex: e.currentTarget.dataset.index
    })
  },
  chose_size(e) {
    this.setData({
      clickSize: e.currentTarget.id,
      sizeText: e.currentTarget.dataset.value,
      sizeIndex: e.currentTarget.dataset.index
    })
  },
  goShop() {
    wx.navigateTo({
      url: `../store/store?data=${this.data.list._id}`
    })
  },
  // -------------------------------------数量加减-------------------------------//
  decNum() {
    if (this.data.num > 1) {
      this.setData({
        num: this.data.num - 1
      })
    } else {
      wx.showToast({
        title: '很抱歉，该商品至少购买一份',
        icon: 'none',
        duration: 1000,
        mask: true,
        images: {}
      })
    }
  },
  addNum() {
    this.setData({
      num: this.data.num + 1
    })
  },
  // 购买
  buy() {
    this.cart("ture")
  },
  // 加入购物车
  cart(skip) {
    if (this.data.isReg) {
      if (this.data.styleText !== "") {
        wx.showToast({
          title: '加入购物车成功',
          icon: 'none',
          duration: 1000,
          mask: true,
          images: {}
        })
        setTimeout(()=>{
          this.hideSize()
        },500)
        let data = this.data.list;
        delete data._id
        // console.log(this.data.list)
        // 查询是否有重复
        wx.request({
          url: IP.ip + 'buyShop',
          data: {
            commodity_name: this.data.list.commodity_name,
            buyName: this.data.buyName
          },
          method: "POST",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: res => {
            if (res.data.length > 0) {
              wx.request({
                url: IP.ip + 'shopUpdata',
                data: {
                  _id: res.data[0]._id,
                  num: res.data[0].num + this.data.num
                },
                method: "POST",
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: res => {
                  if (skip === "ture") {
                    wx.switchTab({
                      url: '../shop/shop'
                    });
                  }
                }
              })
            } else {
              wx.request({
                url: IP.ip + 'addShop',
                data: {
                  ...data,
                  styleText: this.data.styleText,
                  sizeText: this.data.sizeText,
                  num: this.data.num,
                  buyName: app.data.text,
                  selected: false,
                  styleIndex: this.data.styleIndex,
                  sizeIndex: this.data.sizeIndex
                },
                method: "POST",
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: res => {
                  if (skip == "ture") {
                    wx.switchTab({
                      url: '../shop/shop'
                    });
                  }
                }
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '请先选择规格',
          icon: 'none',
          duration: 1000,
          mask: true,
          images: {}
        })
      }
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1000,
        mask: true,
        images: {}
      })
    }

  },
  onClick() {
    this.setData({
      collect: !this.data.collect
    })
  },
  move(e) {
    this.setData({
      ball: true
    })
    setTimeout(()=>{
      this.setData({
        ball: false
      })
    }, 400)
  },
})