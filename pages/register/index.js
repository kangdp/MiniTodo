// pages/register/index.js
const utils = require('../../utils/util.js')
let that
let username
let psw
let repsw
Page({

  data: {

    nameFocus: false,
    pswFocus: false,
    repswFocus: false

  },
  onLoad: function(options){
    that = this
    username = ''
    psw = ''
    repsw = ''
  },
/**
 * 用户名
 */
  bindInputUserName: function(e){
    username = e.detail.value
  },
  /**
   * 密码
   */
  bindInputPsw: function(e){
    psw = e.detail.value
  },
  /**
   * 再次输入密码
   */
  bindInputRePsw: function(e){
    repsw = e.detail.value
  },

  /**
 * 获取焦点时
 */
  onfocus: function (e) {
    let value = e.currentTarget.dataset.focusValue
    if (value == 'name') {
      that.setData({
        nameFocus: true,
      })
    }
    if (value == 'psw') {
      that.setData({
        pswFocus: true
      })
    }

    if (value == 'repsw') {
      that.setData({
        repswFocus: true
      })
    }

  },

  /**
   * 失去焦点时
   */
  onblur: function (e) {
    let value = e.currentTarget.dataset.focusValue
    if (value == 'name' && username == '') {
      that.setData({
        nameFocus: false
      })
    }
    if (value == 'psw' && psw == '') {
      that.setData({
        pswFocus: false
      })
    }

    if (value == 'repsw' && repsw == '') {
      that.setData({
        repswFocus: false
      })
    }
  },

  register: function(){
    if(username == ''){
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none'
      })
      return
    }

    if (psw == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return
    }

    if (repsw == '') {
      wx.showToast({
        title: '再次输入密码不能为空',
        icon: 'none'
      })
      return
    }

    let params = {
      username: username,
      password: psw,
      repassword: repsw
    }

    utils.doRequest(
      'user/register',
      'POST',
      params,
      function(res){
        wx.navigateBack()
        wx.showToast({
          title: '注册完成',
        })
      },
      function(code,msg){
        wx.showToast({
          title: msg,
          icon: 'none',
        })
      })

  }

})