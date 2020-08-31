// pages/news/news.js
const { $Toast } = require('../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todoList:[],
    doneList:[],
    handleTaskId:null,
    isTodo:true,
    current: 'todoTab',
    showDeleteDialog: false,
    isToggleTask : false,
    toggle2 : false,
    deleteActions: [
      {
          name: '取消'
      },
      {
          name: '删除',
          color: '#ed3f14',
          loading: false
      }
    ],
  },
  addTask(){
    wx.navigateTo({
      url:'../add-task/add-task?role=1'
    })
  },
  taskDelete(e){
    let taskid = e.currentTarget.dataset['taskid']
    console.log(taskid)
    this.setData({
      handleTaskId:taskid,
        showDeleteDialog: true
    });
  },
  taskDone(e){
    let taskinfo = e.currentTarget.dataset['taskinfo']
    let self = this;
    console.log(taskinfo)
    wx.request({
      url: 'https://api.grasses.top:3000/task/modify',
      data:{
        state:1,
        taskId:taskinfo.id,
        title:taskinfo.title,
        detail:taskinfo.detail
      },
      method:"post",
      success:function(){
        self.getList()
      }
    })
  },
  handleClickDeleteItem ({ detail }) {
  if (detail.index === 0) {
    this.setData({
      showDeleteDialog: false,
      isToggleTask:false
    });
  } else {
    const action = [...this.data.deleteActions];
    action[1].loading = true;
    this.setData({
      deleteActions: action
    });
    let self = this;
    console.log(this.data.handleTaskId)
    wx.request({
      url: 'https://api.grasses.top:3000/task/delete',
      data:{
        taskId:self.data.handleTaskId
      },
      method:"post",
      success:function(){
        action[1].loading = false;
        self.setData({
          showDeleteDialog: false,
          deleteActions: action,
          isToggleTask:false,
          handleTaskId:null
        });
        $Toast({
          content: '删除成功',
          type: 'success'
        });
        self.getList()
      }
    })
  }
},
  handleChange ({ detail }) {
    this.setData({
        current: detail.key
    });
    if(detail.key == 'todoTab'){
      this.setData({
        isTodo:true
      })
    }else{
      this.setData({
        isTodo:false
      })
    }
},
getList(){
  wx.request({
    url: 'https://api.grasses.top:3000/task/todoList-customer',
    data:{
      pageNo:0,
      pageSize:9999,
    },
    method:'post',
    success:res=>{
      let todoList = new Array();
      let doneList = new Array();
      console.log(res.data.result)
      res.data.result.forEach(item=>{
        if(item.state == 0){
          todoList.push(item)
        }else if(item.state == 1){
          doneList.push(item)
        }
      })
      this.setData({
        todoList:todoList,
        doneList:doneList
      })
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