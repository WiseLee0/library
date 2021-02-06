import { apiSeatExist } from '../../api/seat'
import { apiReportCreate } from '../../api/report'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    iconList: [{
      icon: 'cardboardfill',
      color: 'cyan',
      badge: 0,
      name: '监督占座'
    }, {
      icon: 'babyfill',
      color: 'orange',
      badge: 0,
      name: '使用记录'
    }, {
      icon: 'noticefill',
      color: 'yellow',
      badge: 0,
      name: '违规记录'
    }, {
      icon: 'warnfill',
      color: 'red',
      badge: 0,
      name: '占座举报'
    }],
    gridCol: 3,
    showAction: false,
    showReportAction: false,
    seatMsg: '',
    seat: '',
    seatPhone: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onIconTap: function (e) {
      const name = e.currentTarget.dataset.data.name
      if (name == '使用记录') this.useHistory()
      if (name == '监督占座') this.useWatch()
      if (name == '违规记录') this.violation()
      if (name == '占座举报') this.useReport()
    },
    onReport: async function () {
      const res = await apiReportCreate({
        seat: this.data.seat,
        phone: this.data.seatPhone,
        message: this.data.seatMsg
      })
      this.handleResponse(res)
      this.setData({
        showReportAction: false,
        seat: "",
        seatPhone: "",
        seatMsg: ""
      })
    },
    useReport: function () {
      this.setData({
        showReportAction: true
      })
    },
    violation: function () {
      wx.lin.showDialog({
        type: "alert",
        title: "违规记录说明",
        content: "占座一次，平台警告；占座两次，禁止预约座位一天；占座三次，禁止三天；占座三次以上，老师约谈并上报系部",
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    useHistory: function () {
      wx.navigateTo({
        url: '/pages/history/index',
      })
    },
    useWatch: function () {
      this.setData({
        showAction: true
      })
    },
    onActionClose: function () {
      this.setData({
        showAction: false
      })
    },
    onReportActionClose: function () {
      this.setData({
        showReportAction: false
      })
    },
    onSearch: async function (event) {
      let str = event.detail.trim()
      let room = ''
      let seat = ''
      if (str[0] == 'a' || str[0] == 'A') {
        room = '205'
      }
      if (str[0] == 'b' || str[0] == 'B') {
        room = '305'
      }
      if (str[0] == 'c' || str[0] == 'C') {
        room = '405'
      }
      if (str[1] == 0) seat = str.slice(2)
      else seat = str.slice(1)
      if (!room.length || !/^\d+$/.test(seat) || seat > 50) {
        wx.lin.showToast({
          title: "此座位不存在",
          icon: 'error'
        })
        return
      }
      const res = await apiSeatExist({
        room,
        index: seat
      })
      this.handleResponse(res)
    },
    handleResponse: function ({ code, message }) {
      if (code == 200) {
        wx.lin.showToast({
          title: message,
          icon: 'success'
        })
      }
      if (code == 403) {
        wx.lin.showToast({
          title: message,
          icon: 'error'
        })
      }
    },
  }
})
