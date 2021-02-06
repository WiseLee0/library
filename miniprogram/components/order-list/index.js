Component({
  /**
   * 组件的属性列表
   */
  properties: {
    counts: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    counts: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onOrder: function (e) {
      const room = e.currentTarget.dataset.room
      wx.navigateTo({
        url: '/pages/seat/index?room=' + room,
      })
    }
  }
})
