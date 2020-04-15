// pages/setting/open-api/tpl-message/tpl-message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2017-11-18"
  },

  // tpl-meaasge 的业务逻辑
  bindDateChange: function (event) {
    this.setData({
      date: event.detail.value
    })
  },
  formSubmit: function (event) {
    console.log(event);
    wx.login({
      success: function (loginRes) {
        wx.request({
          url: 'http://192.168.64.2/2020084wxserver/wxTPLMessage.php?code='
          + loginRes.code,
          data: {
            formId: event.detail.formId,
            formData: event.detail.value
          },
          method: 'POST',
          success: function (res) {
            console.log(res.data);
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