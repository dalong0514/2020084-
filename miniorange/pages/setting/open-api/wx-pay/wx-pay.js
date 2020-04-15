// pages/setting/open-api/wx-pay/wx-pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 微信支付的业务逻辑
  onTap: function () {
    wx.login({
      success: function (res) {
        console.log('code:' + res.code);
        wx.request({
          url: "http://192.168.64.2/2020084wxserver/wxPay.php",
          data: {
            code: res.code
          },
          success: function (res) {
            var preData = res.data;
            console.log(preData);
            wx.requestPayment({
              timeStamp: preData.timeStamp.toString(),
              nonceStr: preData.nonceStr,
              package: preData.package,
              signType: preData.signType,
              paySign: preData.paySign,
              success: function(res){
                console.log(res);
              },
              fail: function(error) {
                 console.log(res);
              }
            })
          }
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