// pages/edit/index.js

const dateUtils = require('../../utils/dateUtils.js')
const utils = require('../../utils/util.js')
let that
const date = dateUtils.getCurDate()
const years = dateUtils.getDateDatas().year
const months = dateUtils.getDateDatas().month
let days = []


let title, content
let priority //优先级：0一般 1重要 
let type //分类:0全部 1工作 2学习 3生活
Page({

  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    days: days,
    day: date.getDate(),
    value: [],
    actionSheetHidden: true,
    showLoading: false
  },


  onLoad: function(options) {
    that = this
    type = options.type
    title = ''
    content = ''
    this.updateDays(this.data.year, this.data.month)
    this.setData({
      value: [0, date.getMonth(), date.getDate() - 1]
    })
  },

  bindTitleInput: function(e) {
    title = e.detail.value
  },
  bindContentInput: function(e) {
    content = e.detail.value
  },
  bindPriorityChange: function(e) {
    priority = e.detail.value
  },

  bindCommit: function(e){
    this.addTodo()
  },

  /**
   * 新增Todo
   */
  addTodo: function() {
    this.setData({
      showLoading: true
    })
    let date = this.data.year + '-'+ this.data.month + '-' + this.data.day
    
    let params = {
      title: title,
      content: content,
      date: date,
      type: type,
      priority: priority? priority : 0
    }
    utils.doRequest(
      'lg/todo/add/json',
      'POST',
      params,
      function(res){
        // that.updateTodoList()
        wx.navigateBack()
        wx.showToast({
          title: '添加成功',
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
      })
  },

  /**
   * 更新当前选中月份的总天数
   */
  updateDays: function(year, month) {
    days = []
    let maxDays = dateUtils.getCurMaxDays(year, month)
    for (let i = 0; i < maxDays; i++) {
      days.push(i + 1)
    }
    that.setData({
      days: days,
    })
  },

  /**
   * 选择日期
   */
  bindChange: function(e) {
    const val = e.detail.value
    this.updateDays(val[0], val[1] + 1)
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },

  bindSelDate: function() {
    this.setData({
      actionSheetHidden: false
    })
  },

  bindActionSheetChange: function(res) {
    this.setData({
      actionSheetHidden: true
    })
  }



})