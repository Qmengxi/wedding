// pages/add-person/add-person.js
const { $Toast } = require('../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topTitle:"添加人员安排",
    title:'',
    name:'',
    phone:"",
    description:""
  },
  changeTitle({detail}){
    let {detail:title} = detail
    this.setData({
      title:title.value
    })
  },
  changeDescription({detail}){
    let {detail:description} = detail
    this.setData({
      description:description.value
    })
  },
  changeName({detail}){
    let {detail:name} = detail
    this.setData({
      name:name.value
    })
  },
  changePhone({detail}){
    let {detail:phone} = detail
    this.setData({
      phone:phone.value
    })
  },
  checkInfo(){
    if(!this.data.name){
      $Toast({
        content: '请填写姓名',
        type: 'warning'
      });
    return false
    }
    if(!this.data.title){
      $Toast({
        content: '请填写负责项',
        type: 'warning'
      });
    return false
    }
    if(!this.data.phone){
      $Toast({
        content: '请填写手机号',
        type: 'warning'
      });
    return false
    }
    if(this.data.phone){
      let reg = /^1[3456789]\d{9}$/
      if(!reg.test(this.data.phone)){
        $Toast({
          content: '请填写正确手机号',
          type: 'warning'
        });
        return false
      }
    }
    return true
  },
  saveTask(){
    if(this.checkInfo()){
      wx.request({
        url: 'https://api.grasses.top:3000/personSchedule/create',
        data:{
          "name":this.data.name,
          "title":this.data.title,
          "phone":this.data.phone,
          "description":this.data.description,
        },
        method:"POST",
        success:function(res){
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
   
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