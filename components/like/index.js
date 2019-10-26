// pages/components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    islike: {
      type: Boolean
    },
    count: {
      type: Number
    },
    readOnly: {
      type: Boolean
    },
    test: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLink: function (event) {
      if (this.properties.readOnly) {
        return
      }
      let _islike = this.properties.islike
      let _count = this.properties.count
      _islike ? _count-- : _count++
      this.setData({
        islike: !_islike,
        count: _count
      })
      // triggerEvent 自定义函数(以供传入参数))
      let _behavior = this.properties.islike ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior: _behavior
      }, {})
    }
  }
})
