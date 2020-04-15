// pages/post/post-comment/post-comment.js
import { DBPost } from '../../../db/DBPost.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制使用键盘还是发送语音
    useKeyboardFlag: true,
    // 控制 input 组件的初始值，为了代码的可读性
    keyboardInputValue: '',
    // 控制是否显示图片选择面板
    sendMoreMsgFlag: false,
    // 保存已选择的图片
    chooseFiles: [],
    // 被删除的图片序号
    deleteIndex: -1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.dbPost = new DBPost(postId);
    var comments = this.dbPost.getCommentData();

    /* 绑定评论数据 */
    this.setData({
      comments: comments
    });

    console.log(comments)

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

  },

  // 预览图片
  previewImg:function(event){
    // 获取评论号
    var commentIdx = event.currentTarget.dataset.commentIdx,
      imgIdx = event.currentTarget.dataset.imgIdx,
      imgs = this.data.comments[commentIdx].content.img;
      wx.previewImage({
        urls: imgs,
        current:imgs[imgIdx]
      })
  },

  // 切换语音和键盘输入
  switchInputType:function(event) {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag
    })
  },

  // 获取用户输入
  bindCommentInput:function(event) {
    var val = event.detail.value;
    console.log(val);
    this.data.keyboardInputValue = val;
    // var value = event.detail.value;
    // return value.replace(/qq/g, '*')
  },

  // 提交用户评论
  submitComment: function (event) {
    var imgs = this.data.chooseFiles;
    var newData = {
        username: "青石",
        avatar: "/images/avatar/avatar-3.png",
        create_time: new Date().getTime() / 1000,
        content: {
          txt: this.data.keyboardInputValue,
          img: imgs
        },
    };
    if (!newData.content.txt && imgs.length === 0) {
      return;
    }
    //保存新评论到缓存数据库中
    this.dbPost.newComment(newData);

    //显示操作结果
    this.showCommitSuccessToast();
    //重新渲染并绑定所有评论
    this.bindCommentData();
    //恢复初始状态
    this.resetAllDefaultStatus();
  },  

  // 评论成功
  showCommitSuccessToast:function(){
    wx.showToast({
      title: '评论成功',
      duration:1000,
      icon:"success"
    });
  },

  bindCommentData:function(){
    var comments = this.dbPost.getCommentData();
    // 重新绑定数据
    this.setData({
      comments:comments
    });
  },

  // 将所有相关的按钮状态、输入状态都恢复到初始化状态
  resetAllDefaultStatus:function(){
    this.setData({
      keyboardInputValue:'',
      chooseFiles:[],
      sendMoreMsgFlag:false
    });
  },

  // 显示照片、拍照等按钮
  sendMoreMsg:function(){
    this.setData({
      sendMoreMsgFlag:!this.data.sendMoreMsgFlag
    })
  },

  // 选择本地照片与拍照
  chooseImage:function(event){
    var imgArr = this.data.chooseFiles;
    var leftCount = 3 - imgArr.length;
    if(leftCount <=0){
      return;
    }
    var sourceType = [event.currentTarget.dataset.category],
      that = this;
    wx.chooseImage({
      count:leftCount,
      sourceType:sourceType,
      success: function(res) {
        that.setData({
          chooseFiles:imgArr.concat(res.tempFilePaths)
        })
      },
    })
  },

  // 删除已选择的图片
  deleteImage:function(event){
    var index = event.currentTarget.dataset.idx,
      that = this;
    that.setData({
      deleteIndex:index
    });
    that.data.chooseFiles.splice(index, 1);
    setTimeout(function(){
      that.setData({
        deleteIndex:-1,
        chooseFiles: that.data.chooseFiles
      });
    }, 500);  
  },


})