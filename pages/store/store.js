// pages/store/store.js
import IP from '../../utils/util.js'
var sheight;
//乱序
function shuffle(arr) {
  let i = arr.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}
Page({
  data: {
    list: {},
    navbar: ['首页', '全部', '上新', '分类'],
    currentTab: 0,
    img: IP.img,
    listData: {},
    ranlist: {},
    randata: {},
    inputVal:''
  },
  onLoad(option) {
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
        this.setData({
          list: res.data,
        })
        wx.request({
          url: IP.ip + 'shop',
          data: {
            store_name: this.data.list.store_name
          },
          method: "POST",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: res => {
            this.setData({
              listData: res.data,
            })
            let arr = [...this.data.listData]
            let arr1 = shuffle(arr)
            let arr3 = [...arr1]
            let arr2 = shuffle(arr3)
            this.setData({
              ranlist: arr1,
              randata: arr2
            })
          }
        })
      }
    })
  },
  navbarTap(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    })
  },
  seek(e) {
    wx.navigateTo({
      url: `../seek/seek?name=${this.data.list.store_name}&&val=${e.detail.value}&&seek=false`
    })
    this.setData({
      inputVal: ""
    })
  },
  shop_click(e) {
    wx.navigateTo({
      url: `../details/details?data=${e.currentTarget.dataset.item._id}`
    })
    this.setData({
      inputVal: ''
    })
  },
  phone() {
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        wx.navigateTo({
          url: `../seek/seek?val=${res.result}&&seek=false`
        })
      }
    })
  }
})