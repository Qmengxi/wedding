// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todoList:[],
    doneList:[],
    isTodo:true,
    current: 'todoTab',
    visible2: false,
    toggle : false,
    toggle2 : false,
    actions2: [
      {
          name: '删除',
          color: '#ed3f14'
      }
  ],
  },
  handleCancel2 () {
    this.setData({
        visible2: false,
        toggle : this.data.toggle ? false : true
    });
    console.log( this.data.toggle,111111111 )
},
handleClickItem2 () {
    const action = [...this.data.actions2];
    action[0].loading = true;

    this.setData({
        actions2: action
    });

    setTimeout(() => {
        action[0].loading = false;
        this.setData({
            visible2: false,
            actions2: action,
            toggle: this.data.toggle ? false : true
        });
        
    }, 2000);
},
handlerCloseButton(){
  this.setData({
      toggle2: this.data.toggle2 ? false : true
  });
},
actionsTap(){
  this.setData({
      visible2: true
  });
},
taskDone(e){
  let query = e.currentTarget.dataset['taskid']
  console.log(e.currentTarget)
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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