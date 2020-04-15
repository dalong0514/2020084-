// pages/post/post.js
// var dataObj = require("../../data/data.js")
import {DBPost} from '../../db/DBPost.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var dbPost = new DBPost();
    this.setData({
      postList: dbPost.getAllPostData()
    });
    // 试验
  },

  // 跳转到列表详细页面
  onTapToDetail(event) {
    var postId = event.currentTarget.dataset.postid;
    console.log(postId);
    wx.navigateTo({
      url: 'post-detail/post-detail?testid='+postId,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  
  // 跳转到评论页面
    onCommentTap:function(event) {
    var id = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'post-comment/post-comment?id='+id,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  // swiper 组件跳转到详细页面
  onSwiperTap:function(event){
    var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onready: 页面被渲染")

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onready: 页面被显示")

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onhide: 页面被隐藏")

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onunload: 页面被卸载")

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