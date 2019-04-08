// pages/about/index.js
Page({

  data: {
    link: 'https://github.com/kangdongpu/MiniTodo'
  },

  copyText: function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function(res){
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  }
})