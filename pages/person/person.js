// pages/news/news.js
const { $Toast } = require('../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personList:[]
  },
  addTask(){
    wx.navigateTo({
      url:'../add-person/add-person'
    })
  },
  handleCall(e){
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber:phone,
    })
  },
getList(){
  wx.request({
    url: 'https://api.grasses.top:3000/personSchedule/list',
    data:{
      pageNo:0,
      pageSize:9999,
    },
    method:'post',
    success:res=>{
      this.setData({
        personList:res.data.result
      })
      console.log(res.data.result)
    }
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList()
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
    this.getList()
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