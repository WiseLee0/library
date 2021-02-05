import { apiUserRegister, apiUserLogin } from '../../api/user'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewType: "",
    username: "",
    password: ""
  },
  // 登录
  onLogin: async function () {
    if (this.virifyFields()) return
    const { username, password } = this.data
    const res = await apiUserLogin({
      username: username.trim(),
      password: password.trim()
    })
    this.handleResponse(res)
  },
  // 注册
  onRegister: async function () {
    if (this.virifyFields()) return
    const { username, password } = this.data
    const res = await apiUserRegister({
      username: username.trim(),
      password: password.trim()
    })
    this.handleResponse(res)
  },
  // 字段验证
  virifyFields: function () {
    const { username, password } = this.data
    if (username.trim().length < 6 && password.trim().length < 6) {
      wx.lin.showToast({
        title: "用户名密码需要大于6位",
        icon: 'error',
      })
      return true
    }
    return false
  },
  // 返回处理
  handleResponse: function ({ code, message }) {
    if (code == 200) {
      wx.lin.showToast({
        title: message,
        icon: 'success',
        success: () => {
          this.setData({
            viewType: "",
            username: "",
            password: ""
          })
        }
      })
    }
    if (code == 403) {
      wx.lin.showToast({
        title: message,
        icon: 'error',
        success: () => {
          this.setData({
            username: "",
            password: ""
          })
        }
      })
    }
  },
  // 返回
  onBack: function () {
    console.log("back");
    this.setData({
      viewType: "",
      username: "",
      password: ""
    })
  },
  // 切换登录注册界面
  changeView: function (e) {
    this.setData({
      viewType: e.currentTarget.dataset.type
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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