import {
  apiHistoryGet
} from '../../api/history'
import {
  apiTimerRemove
} from '../../api/timer'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayTime: '0',
    allTime: '0',
    countTime: '0',
    username: ""
  },
  onIndexPage: function () {
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  onRulePage: function () {
    wx.redirectTo({
      url: '/pages/rule/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const username = wx.getStorageSync('username')
    this.setData({
      username
    })
    const res = await apiHistoryGet()
    this.handleCount(res)
  },
  onScancode: function () {
    wx.scanCode({
      success: async () => {
        const res = await apiTimerRemove()
        this.handleResponse(res)
      }
    })
  },
  handleResponse: function ({
    code,
    message
  }) {
    if (code == 200) {
      wx.lin.showToast({
        title: message,
        icon: 'success',
      })
    }
    if (code == 403) {
      wx.lin.showToast({
        title: message,
        icon: 'error'
      })
    }
  },
  handleCount: function (arr) {
    const getToday = () => {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return [year, month, day].join('-')
    }
    const today = arr.filter(d => new Date(d.start).getTime() > new Date(getToday()).getTime())
    let dayTime = 0
    for (let i = 0; i < today.length; i++) {
      const t = today[i];
      if (t.end) {
        dayTime += new Date(t.end).getTime() - new Date(t.start).getTime()
      }
    }
    let allTime = 0
    for (let i = 0; i < arr.length; i++) {
      const t = arr[i];
      if (t.end) {
        allTime += new Date(t.end).getTime() - new Date(t.start).getTime()
      }
    }
    const sortArr = arr.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
    let ins = 0
    for (let i = 0; i < sortArr.length - 1; i++) {
      const diff = new Date(sortArr[i].start).getTime() - new Date(sortArr[i + 1].start).getTime()
      if (diff > 12 * 60 * 60 * 1000) ins++
      if (diff > 36 * 60 * 60 * 1000) break
    }
    this.setData({
      dayTime: this.getMin(dayTime, 1) + ' h',
      allTime: this.getMin(allTime, 0) + ' h',
      countTime: ins
    })
  },
  getMin: function (time, limit) {
    const h = time / (1000 * 60 * 60)
    return h.toFixed(limit)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})