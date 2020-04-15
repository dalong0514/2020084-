// pages/setting/open-api/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 书里的代码
  onTap: function () {
    wx.login({
      success: function (res) {
        console.log('code:'+res.code);
        wx.request({
          url: "http://192.168.64.2/2020084wxserver/wxLogin.php",
          data: {
            code: res.code
          },
          success: function (res) {
            console.log(res.data);
          }
        })
      }
    })
  },
  
  /* 参考文档里的登录代码，无法获取用户 openId 信息，具体什么问题待确认
  onTap: function () {
    wx.login({
      success (res) {
        if (res.code) {
          console.log('code:'+res.code)
          //发起网络请求
          wx.request({
            url: 'http://192.168.64.2/2020084wxserver/wxLogin.php',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  */

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