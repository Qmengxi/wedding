// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todoList:new Map(),
    doneList:new Map(),
    isTodo:true,
    current: 'tab1',
  },
  showTodo:function(){
    this.setData({
      isTodo:true
    })
  },
  showDone:function(){
    this.setData({
      isTodo:false
    })
  },
  changeStatus:function(e){
    let query = e.currentTarget.dataset['status']
    console.log(e)
  },

  handleChange ({ detail }) {
    this.setData({
        current: detail.key
    });
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://api.grasses.top:3000/task/todoList-customer',
      data:{
        pageNo:0,
        pageSize:9999,
        // screen:{
        //   state:0
        // }
      },
      method:'post',
      success:res=>{
        let toDoMap = new Map();
        let doneMap = new Map();
        res.data.result.forEach(item=>{
          if(item.state == 0){
            toDoMap.set(item.id,item)
          }else if(item.state == 1){
            doneMap.set(item.id,item)
          }
        })
        console.log(toDoMap,toDoMap.size)
        console.log(doneMap,doneMap.size)
        this.setData({
          todoList:toDoMap,
          doneList:doneMap
        })
        console.log(res)
      }
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