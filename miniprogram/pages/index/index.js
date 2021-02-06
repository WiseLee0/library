import { apiSeatCount } from '../../api/seat'
Page({
  onLoad: async function (options) {
    const res = await apiSeatCount()
    this.setData({
      counts: res
    })
  },
  data: {
    counts: []
  },
  onRulePage: function () {
    wx.redirectTo({
      url: '/pages/rule/index'
    })
  },
  onMyPage: function () {
    wx.redirectTo({
      url: '/pages/my/index'
    })
  }
})
