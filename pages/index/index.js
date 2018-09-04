//index.js
//获取应用实例
const app = getApp()
import IP from '../../utils/util.js'
Page({
  data: {
    imgUrls: [
      'ban1.jpg',
      'ban2.jpg',
      'ban3.jpg'
    ],
    imgList: [{
        img: 'cz.jpg',
        text: '充值中心'
      },
      {
        img: 'tg.jpg',
        text: '团购立省'
      },
      {
        img: 'xs.jpg',
        text: '限时快抢'
      },
      {
        img: 'rq.jpg',
        text: '人气女装'
      },
      {
        img: 'qd.jpg',
        text: '签到有礼'
      },
      {
        img: 'dj.jpg',
        text: "当季热卖"
      },
      {
        img: 'ny.jpg',
        text: '内衣百货'
      },
      {
        img: 'top.jpg',
        text: 'TOP鞋包'
      },
      {
        img: 'mz.jpg',
        text: '美妆个护'
      },
      {
        img: 'qz.jpg',
        text: '气质男装'
      }
    ],
    spell: [
      [{
        img: 'bp1.jpg',
        imgText: '全国包邮无忧',
        text: '抹茶滋润眼贴',
        news: '29.90',
        old: '98.00'
      }, {
        img: 'bp2.jpg',
        imgText: '河北卫视推荐',
        text: '滋润不掉色口红',
        news: '17.90',
        old: '98.00'
      }, {
        img: 'bp3.jpg',
        imgText: '赠送运费险',
        text: '格子衬衫外套',
        news: '29.90',
        old: '100.00'
      }],
      [{
        img: 'bp4.jpg',
        imgText: '5折促销价',
        text: '韩国蜂蜜面膜',
        news: '38.80',
        old: '128.00'
      }, {
        img: 'bp5.jpg',
        imgText: '防嗮2件套',
        text: '抖音同款2件套',
        news: '25.00',
        old: '89.00'
      }, {
        img: 'bp6.jpg',
        imgText: '甜美卡通睡衣',
        text: '新款丝绸家居服',
        news: '38.80',
        old: '99.86'
      }],
      [{
        img: 'bp7.jpg',
        imgText: '全国包邮无忧',
        text: '百搭小白鞋女',
        news: '29.90',
        old: '80.00'
      }, {
        img: 'bp8.jpg',
        imgText: '全国包邮无忧',
        text: '卷边高腰牛仔裤',
        news: '39.00',
        old: '98.58'
      }, {
        img: 'bp9.jpg',
        imgText: '全国包邮无忧',
        text: '秋季休闲小白鞋',
        news: '36.00',
        old: '99.00'
      }]
    ],
    tabs: [{
      text: '女装',
      val: 'wear'
    }, {
      text: '男友',
      val: 'man'
    }, {
      text: '女鞋',
      val: 'shoes'
    }, {
      text: '美妆',
      val: 'makeup'
    }, {
      text: '家居',
      val: 'home'
    }, {
      text: '食品',
      val: 'foot'
    }, {
      text: '包包',
      val: 'handbag'
    }, {
      text: '运动',
      val: 'exercise'
    }, {
      text: '玩具',
      val: 'drone'
    }],
    // 时
    h: 5,
    // 分
    m: 59,
    // 秒
    s: 20,
    img: IP.img,
    indicatorDots: true, //是否显示面板指示点
    indicatorActiveColor: '#ff5777',
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000, //滑动动画时长
    clickid: 0, // 精选商品选中按钮
    data: "wear", //初始商品
    list: [], //商品列表
    inputVal: ''
  },
  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    wx.request({
      url: IP.ip + 'shop',
      data: {
        "type": this.data.data
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        // console.log(res.data)
        this.setData({
          list: res.data
        })
      }
    })
  },
  //今日必拼计数器
  onReady() {
    setInterval(() => {
      if (this.data.s > 0) {
        this.setData({
          s: this.data.s - 1
        })
      } else if (this.data.s === 0 && this.data.m > 0) {
        this.setData({
          s: 59,
          m: this.data.m - 1
        })
      } else if (this.data.s === 0 && this.data.m === 0 && this.data.h > 0) {
        this.setData({
          s: 59,
          m: 59,
          h: this.data.h - 1
        })
      } else {
        this.setData({
          h: 5,
          m: 59,
          s: 59
        })
      }
    }, 1000)
  },
  //精选商品点击按钮
  handpick_text(e) {
    console.log(e.currentTarget)
    this.setData({
      clickid: e.currentTarget.id,
      data: e.currentTarget.dataset.value
    })
    wx.request({
      url: IP.ip + 'shop',
      data: {
        "type": this.data.data
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        // console.log(res.data)
        this.setData({
          list: res.data
        })
        wx.pageScrollTo({
          scrollTop: 880,
        })
      }
    })
  },
  //商品页面跳转
  shop_click(e) {
    wx.navigateTo({
      url: `../details/details?data=${e.currentTarget.dataset.item._id}`
    })
  },
  seek(e) {
    wx.navigateTo({
      url: `../seek/seek?val=${e.detail.value}&&seek=true`
    })
    this.setData({
      inputVal: ""
    })
  },
  phone() {
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })
  }
})