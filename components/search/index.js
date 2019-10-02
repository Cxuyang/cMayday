// components/search/index.js
import {KeywordModel} from '../../models/keyword.js'
import {BookModel} from '../../models/book.js'
// import {paginationBev} from '../../'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },

  attached () {
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event) {
      this._closeResult()
    },

    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.text
      this.setData({
        q
      })
      bookModel.search(0, q).then(res => {
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})
