
const app = getApp()
const doRequest = (url, method, params, doSuccess, doFail, doComplete) => {

  wx.request({
    url: app.httpConfig.baseUrl + url,
    data: params,
    method: method,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': app.globalData.cookie
    },
    success: function (res) {
      let result = res.data
      if (result.errorCode == 0) {
        if(url.endsWith('login')){
          //缓存cookie
          wx.setStorageSync("cookie", res.header['Set-Cookie'])
          app.globalData.cookie = res.header['Set-Cookie']
        }
        doSuccess(result.data)
      } else {
        if(result.errorCode == -1001){
          //登录失效
          showLoginTip()
          // wx.showModal({
          //   title: '提示',
          //   content: '请登录',
          //   success: function (r) {
          //     if (r.confirm) {
          //       wx.navigateTo({
          //         url: '/pages/login/index',
          //       })
          //     }
          //   }
          // })
          return
        }

        if (typeof doFail == 'function') {
          doFail(result.errorCode, result.errorMsg)
        }
      }
    },
    fail: function (res) {
      wx.showToast({
        title: '请求失败'
      })
    },
    complete: function () {
      if (typeof doComplete == 'function') {
        doComplete()
      }
    }
  })
}

const showLoginTip = () => {
  wx.showModal({
    title: '提示',
    content: '请登录',
    success: function (r) {
      if (r.confirm) {
        wx.navigateTo({
          url: '/pages/login/index',
        })
      }
    }
  })
}


module.exports = {
  doRequest: doRequest,
  showLoginTip: showLoginTip
}