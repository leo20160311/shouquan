//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.switchTab({
      url: '../home/home'
    })
  },
  //获取用户信息处理事件
  getUserInfo: function (e) {
    var that = this;
    if(!e.detail.userInfo){
      wx.openSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (data) {
                wx.setStorageSync('userInfo', data.userInfo)
                that.bindViewTap()
                // app.wxlogin();
                // console.log(data.userInfo)
              }
            });
          }
        }
      });
    }else{
      that.bindViewTap()
    }
    // console.log(e.detail.userInfo)
  },
  onLoad: function () {
    var that = this;
    wx.login({
      success: function (res) {
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              // console.log(res.userInfo)
              that.setData({
                hasUserInfo: false
              })
              that.bindViewTap()
            } else {
              that.setData({
                hasUserInfo:true
              })
            }
          },
          fail: function () {
            // console.log()
          }
        })
      }
    })
    
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  } 
   
})
