// components/fn-grid/index.js
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
      badge: 120,
      name: '监督占座'
    }, {
      icon: 'babyfill',
      color: 'orange',
      badge: 1,
      name: '使用记录'
    }, {
      icon: 'noticefill',
      color: 'yellow',
      badge: 0,
      name: '违规记录'
    }, {
      icon: 'warnfill',
      color: 'red',
      badge: 22,
      name: '占座举报'
    }],
    gridCol: 3,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
