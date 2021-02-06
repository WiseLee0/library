import { apiSeatCreate, apiSeatGet } from '../../api/seat'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seats: [],
    selectIndex: -1,
    room: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mockSeats(options.room)
  },
  onSubmit: async function () {
    const index = this.data.selectIndex
    if (index < 0 || this.data.seats[index].exist) {
      wx.lin.showToast({
        title: "抱歉，您还没有选座",
        icon: 'error'
      })
      return
    }
    const res = await apiSeatCreate({
      room: this.data.room,
      index
    })
    this.handleResponse(res)
  },
  handleResponse: function ({ code, message, data }) {
    if (code == 200) {
      wx.lin.showToast({
        title: message,
        icon: 'success',
        success: () => {
          this.refreshData(data)
        }
      })
    }
    if (code == 403) {
      wx.lin.showToast({
        title: message,
        icon: 'error',
        success: () => {
          this.refreshData(data)
        }
      })
    }
  },
  refreshData: function (data) {
    data.forEach(d => {
      this.data.seats[d.index].exist = true
    })
    this.setData({
      seats: this.data.seats
    })
  },
  // 选座
  onSelect: function (e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      selectIndex: index
    })
  },
  mockSeats: async function (room) {
    const { data, openId } = await apiSeatGet({
      room
    })
    let partten = ''
    if (room == '205') partten = 'a'
    if (room == '305') partten = 'b'
    if (room == '405') partten = 'c'
    const seats = []
    let selectIndex = -1
    for (let i = 1; i <= 50; i++) {
      seats.push({
        exist: false,
        tag: `${partten}${i}`
      })
    }
    data.forEach(d => {
      seats[d.index].exist = true
      if (d.openId == openId) {
        seats[d.index].exist = false
        selectIndex = d.index
      }
    })
    this.setData({
      seats,
      selectIndex,
      room
    })
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