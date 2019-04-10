// pages/login/index.js
const utils = require('../../utils/util.js')
const app = getApp()
let that
let username
let password
let code
Page({

  data: {
    nameFocus: false,
    pswFocus: false,
    showLoading: false
  },

  onLoad: function (options) {
    that = this
    username = ''
    password = ''
  },

/**
 * 用户名输入
 */
  onNameInput: function(e){
    username = e.detail.value
  },
  /**
   * 密码输入
   */
  onPswInput: function(e){
    password = e.detail.value
  },
/**
 * 获取焦点时
 */
  onfocus: function(e){
    let value = e.currentTarget.dataset.focusValue
    if(value == 'name'){
      that.setData({
        nameFocus: true,
      })
    }
    if(value == 'psw'){
      that.setData({
        pswFocus: true
      })
    }
  },
  /**
   * 失去焦点时
   */
  onblur: function(e){
    let value = e.currentTarget.dataset.focusValue
    if(value == 'name' && username == ''){
      that.setData({
        nameFocus: false
      })
    }
    if (value == 'psw' && password == '') {
      that.setData({
        pswFocus: false
      })
    }
  },

/**
 * 进入Todo页面
 */
  bindToMain: function(){
    that.login()
  },
/**
 * 登录
 */
  login: function(){
    if(username == ''){
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none'
      })
      return;
    }
    if (password == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return;
    }

    this.setData({
      showLoading: true
    })

    let params = {
      username: username,
      password: password
    }
    
    utils.doRequest(
      'user/login',
      'POST',
      params,
      function(res){

        wx.setStorageSync('isLogin',true)
        wx.setStorageSync('userInfo', res)
        app.globalData.isLogin = true
        app.globalData.userInfo = res
        wx.navigateBack()
        wx.showToast({
          title: '登录成功',
        })
      },
      function(code,msg){
        wx.showToast({
          title: msg,
          icon: 'none'
        })
      },function(){
        that.setData({
          showLoading: false
        })
      }
      )
  },
  bindToRegister: function(){
    wx.navigateTo({
      url: '/pages/register/index',
    })
  }
})