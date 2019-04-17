// pages/edit/index.js

const dateUtils = require('../../utils/dateUtils.js')
const utils = require('../../utils/util.js')
const app = getApp()
let that
const years = dateUtils.getDateDatas().year
const months = dateUtils.getDateDatas().month
let days = []
let id
let status
let title,content
let priority //优先级：1重要 2一般
let type //分类: 0全部 1工作 2学习 3生活

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    year:'',
    month: '',
    day: '',
    status: status,
    priority: priority,
    years: years,
    months: months,
    days: days,
    value: [],
    actionSheetHidden: true,
    showLoading: false
  },
  onLoad: function(options){
    that = this
    let todo = JSON.parse(options.todo)
    todo.title = decodeURIComponent(todo.title)
    todo.content = decodeURIComponent(todo.content)
    id = todo.id
    status = todo.status
    title = todo.title
    content = todo.content
    type = todo.type
    priority = todo.priority
    let dateStr = todo.date
    let date = new Date(dateStr)
    let year = date.getFullYear()
    let month = date.getMonth() +1
    let day = date.getDate()

    this.updateDays(year,month)

    if(status == 0) {
      wx.setNavigationBarTitle({
        title: '编辑',
      })
    }else {
      wx.setNavigationBarTitle({
        title: '查看',
      })
    }
    
    this.setData({
      title: title,
      content: content,
      year: year,
      month: month,
      day: day,
      status: status,
      priority: priority,
      value: [year - dateUtils.getCurDate().getFullYear(), month-1, day - 1]
    })

  },

  /**
 * 更新当前选中月份的总天数
 */
  updateDays: function (year, month) {
    days = []
    let maxDays = dateUtils.getCurMaxDays(year, month)
    for (let i = 0; i < maxDays; i++) {
      days.push(i + 1)
    }
    this.setData({
      days: days,
    })
  },
  /**
    * 选择日期
    */
  bindChange: function (e) {
    const val = e.detail.value
    this.updateDays(val[0], val[1] + 1)
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },


  bindSelDate: function () {
    this.setData({
      actionSheetHidden: false
    })
  },

  bindActionSheetChange: function (res) {
    this.setData({
      actionSheetHidden: true
    })
  },

  bindTitleInput: function (e) {
    title = e.detail.value
  },
  bindContentInput: function (e) {
    content = e.detail.value
  },
  bindPriorityChange: function (e) {
    priority = e.detail.value
  },
/**
 * 保存
 */
  bindCommit: function (e) {
    this.updateTodo()
  },
/**
 * 更新Todo
 */
  updateTodo: function () {
    this.setData({
      showLoading: true
    })
    let date = this.data.year + '-' + this.data.month + '-' + this.data.day
    let params = {
      title: title ? title : '',
      content: content,
      date: date,
      status: status,
      type: type,
      priority: priority
    }
    utils.doRequest(
      `lg/todo/update/${id}/json`,
      'POST',
      params,
      function (res) {
        wx.navigateBack()
        wx.showToast({
          title: '保存成功',
        })

      },
      function (code, msg) {

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

})