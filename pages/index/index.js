//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  switchNews:function(){
    wx.request({
      url: 'https://api.grasses.top:3000/user/updateMessage',
      data:{
        uid:app.globalData.uid,
        values:{
          accountType:1,
        }
      },
      method:"POST",
      success:res=>{
        console.log(res)
        wx.switchTab({
          url:'../news/news'
        })
      }
    })

    
  },
  switchManager:function(){
    wx.request({
      url: 'https://api.grasses.top:3000/user/updateMessage',
      data:{
        uid:app.globalData.uid,
        values:{
          accountType:2,
        }
      },
      method:"POST",
      success:res=>{
        console.log(res)
        wx.switchTab({
          url:'../manager/manager'
        })
      }
    })
   
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        wx.request({
          url: 'https://api.grasses.top:3000/user/updateMessage',
          data:{
            uid:app.globalData.uid,
            values:{
              name:res.userInfo.nickName,
              img:res.userInfo.avatarUrl
            }
          },
          method:"POST",
          success:res2=>{
            console.log(res2)
          }
        })
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          wx.request({
            url: 'https://api.grasses.top:3000/user/updateMessage',
            data:{
              uid:app.globalData.uid,
              values:{
                name:res.userInfo.nickName,
                img:res.userInfo.avatarUrl
              }
            },
            method:"POST",
            success:res2=>{
              console.log(res2)
            }
          })
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
