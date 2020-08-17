// pages/add-task/add-task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role:1,
    title:"新人待办事项",
    taskTitle:'',
    taskDes:''
  },
  changeTitle({detail}){
    let {detail:titleInfo} = detail
    this.setData({
      taskTitle:titleInfo.value
    })
  },
  changeDes({detail}){
    let {detail:titleInfo} = detail
    this.setData({
      taskDes:titleInfo.value
    })
  },
  saveTask(){
    wx.request({
      url: 'https://api.grasses.top:3000/task/create',
      data:{
        "detail":this.data.taskDes,
        "title":this.data.taskTitle,
        "role":this.data.role
      },
      method:"POST",
      success:function(res){
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let title;
    if(options.role == 1){
      title="新人待办事项"
    }else if(options.role == 2){
      title="婚礼人待办事项"
    }
    this.setData({
      role:options.role,
      title:title
    })
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