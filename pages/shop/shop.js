// pages/shop/shop.js
var app = getApp()
import IP from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "",
    list: {},
    shopdata: {},
    img: IP.img,
    isDel: false,
    isSize: false,
    clickStyle: -1,
    clickSize: -1,
    styleText: '',
    sizeText: '',
    num: 1,
    isSelected: false,
    arr: [],
    money: 0,
    isnum: 0,
  },
  moneyFn() {
    let money = 0
    let isnum = 0
    this.data.list.filter(item => {
      if (item.selected) {
        item.promotion = item.promotion.split("￥")[1] - 0
        money += item.promotion * item.num
        isnum +=item.num
      }
    })
    this.setData({
      money: money,
      isnum: isnum
    })
  },
  onShow(options) {
    this.setData({
      text:app.data.text
    })
    wx.request({
      url: IP.ip + 'buyShop',
      data: {
        buyName: this.data.text
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        this.setData({
          list: res.data,
          isSelected: res.data.every(item => item.selected)
        })
        this.moneyFn()
      }
    })

  },
  manage() {
    this.setData({
      isDel: !this.data.isDel
    })
  },
  // 编辑
  editor(e) {
    console.log(e.currentTarget.dataset.item)
    this.setData({
      shopdata: e.currentTarget.dataset.item,
      styleText: e.currentTarget.dataset.item.styleText,
      sizeText: e.currentTarget.dataset.item.sizeText,
      clickStyle: e.currentTarget.dataset.item.styleIndex,
      clickSize: e.currentTarget.dataset.item.sizeIndex,
      num: e.currentTarget.dataset.item.num
    })
    this.showSize()
  },
  //---------------------- 尺码选择-----------------------//
  //显示对话框
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
    console.log(e.currentTarget)
    this.setData({
      clickStyle: e.currentTarget.id,
      styleText: e.currentTarget.dataset.value
    })
  },
  chose_size(e) {
    console.log(e.currentTarget)
    this.setData({
      clickSize: e.currentTarget.id,
      sizeText: e.currentTarget.dataset.value
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
  // 修改
  alter(e) {
    console.log(this.data.shopdata)
    wx.request({
      url: IP.ip + 'shopUpdata',
      data: {
        _id: this.data.shopdata._id,
        styleText: this.data.styleText,
        sizeText: this.data.sizeText,
        num: this.data.num
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        wx.request({
          url: IP.ip + 'buyShop',
          data: {
            buyName: this.data.text
          },
          method: "POST",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: res => {
            console.log(res.data)
            this.setData({
              list: res.data
            })
            this.hideSize()
            this.moneyFn()
          }
        })
      }
    })
  },
  // 取消
  cancel() {
    this.hideSize()
  },
  // 选中
  select(e) {
    wx.request({
      url: IP.ip + 'shopUpdata',
      data: {
        _id: e.currentTarget.dataset.item._id,
        selected: !e.currentTarget.dataset.item.selected
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {

        wx.request({
          url: IP.ip + 'buyShop',
          data: {
            buyName: this.data.text
          },
          method: "POST",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: res => {
            let money = 0;
            console.log(res.data)
            this.setData({
              list: res.data,
              isSelected: res.data.every(item => item.selected)
            })
            this.moneyFn()
          }
        })
      }
    })
  },
  // 全选
  all() {
    this.setData({
      isSelected: !this.data.isSelected
    })
    console.log(this.data.list)
    this.data.list.map(item => {
      wx.request({
        url: IP.ip + 'shopUpdata',
        data: {
          _id: item._id,
          selected: this.data.isSelected
        },
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          wx.request({
            url: IP.ip + 'buyShop',
            data: {
              buyName: this.data.text
            },
            method: "POST",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: res => {
              this.setData({
                list: res.data
              })
              this.moneyFn()
            }
          })
        }
      })
    })

  },
  // 结算或者删除
  dispose(e) {
    if (!this.data.isDel) {
      if (this.data.list.some(item => item.selected)) {
        wx.showLoading({
          title: '正在进行支付',
          mask: true,
          success: res => {
            let arr = this.data.list.filter(item => item.selected)
            arr = arr.map(item => item._id)
            console.log(arr)
            wx.request({
              url: IP.ip + 'delShop',
              data: {
                ids: arr
              },
              method: "POST",
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: res => {
                wx.request({
                  url: IP.ip + 'buyShop',
                  data: {
                    buyName: this.data.text
                  },
                  method: "POST",
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: res => {
                    console.log(res.data)
                    this.setData({
                      list: res.data,
                      isSelected: res.data.every(item => item.selected)
                    })
                    this.moneyFn()
                    setTimeout(() => {
                      wx.showToast({
                        title: '购买成功',
                        icon: 'success',
                        duration: 1000,
                        mask: true,
                        images: {}
                      })
                    }, 1000)
                  }
                })
              }
            })

          }
        })
      } else {
        wx.showToast({
          title: '请先选择一件你所要结算的商品',
          icon: 'none',
          duration: 1000,
          mask: true,
          images: {}
        })
      }

    } else {
      if (this.data.list.some(item => item.selected)) {
        wx.showModal({
          title: '提示',
          content: '确认删除',
          success: (res) => {
            if (res.confirm) {
              let arr = this.data.list.filter(item => item.selected)
              arr = arr.map(item => item._id)
              console.log(arr)
              wx.request({
                url: IP.ip + 'delShop',
                data: {
                  ids: arr
                },
                method: "POST",
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: res => {
                  wx.request({
                    url: IP.ip + 'buyShop',
                    data: {
                      buyName: this.data.text
                    },
                    method: "POST",
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    success: res => {
                      console.log(res.data)
                      this.setData({
                        list: res.data,
                        isSelected: res.data.every(item => item.selected)
                      })
                      this.moneyFn()
                    }
                  })
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        wx.showToast({
          title: '请先选择一件你所要删除的商品',
          icon: 'none',
          duration: 1000,
          mask: true,
          images: {}
        })
      }
    }
  }

})