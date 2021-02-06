import { apiHistoryGet } from '../../api/history'
import { apiSeatCancel } from '../../api/seat'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let lists = await apiHistoryGet()
    lists = lists.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
    this.setData({ lists })
  },
  // 取消预定
  onCancelOrder: async function (e) {
    const result = await apiSeatCancel({
      room: e.currentTarget.dataset.item.room
    })
    this.handleResponse(result)
  },
  handleResponse: function ({ code, message, data }) {
    if (code == 200) {
      wx.lin.showToast({
        title: message,
        icon: 'success',
        success: () => {
          const lists = data.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
          this.setData({ lists })
        }
      })
    }
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