// pages/classic/classic.js
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    classicModel.getLatest(res => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 点赞时间
  onLike: function(event) {
    likeModel.like(event.detail.behavior, this.data.classic.id, this.data.classic.type)
  },

  // nav next
  onNext: function (evnet) {
    this._updateClassic('next')
  },
  // nav previous
  onPrevious: function(evnet) {
    this._updateClassic('previous')
  },
  _updateClassic: function(nextOrPrevious) {
    const index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, res => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLatest(res.index)
      })
    })
  },
  _getLikeStatus: function(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
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