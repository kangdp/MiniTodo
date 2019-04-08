// pages/my/index.js
const utils = require('../../utils/util.js')
const app = getApp()
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
  },

  onShow: function(){
    this.updateHeaderInfo()
  },

  updateHeaderInfo: function(){
    that.setData({
      isLogin: app.globalData.isLogin,
      username: app.globalData.userInfo == null ? '' : app.globalData.userInfo.username
    })
  },


  bindExit: function(){
    wx.showModal({
      title: '提示',
      content: '您确定要退出吗?',
      confirmColor: '#0091ea',
      success: function(r){
        if(r.confirm){
          utils.doRequest(
            'user/logout/json',
            'GET',
            null,
            function (res) {
              //清理缓存
              wx.clearStorageSync()
              app.globalData.isLogin = false
              app.globalData.cookie = ''
              app.globalData.userInfo = null
              that.updateHeaderInfo()
              wx.showToast({
                title: '已退出登录',
              })
            })
        }
      }
    })
  },


  bindToLogin: function () {
    if (app.globalData.isLogin) return
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },

  bindToUs: function(){
    wx.navigateTo({
      url: '/pages/about/index',
    })
  }
 
})