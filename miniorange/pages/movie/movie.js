// pages/movie/movie.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false,
    searchResult: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    //var inTheatersUrl = app.globalData.doubanBase +
      //"/search/repositories?q=language:python&sort=stars";
    //var comingSoonUrl = app.globalData.doubanBase +
      //"/search/repositories?q=language:python&sort=stars";
    //var top250Url = app.globalData.doubanBase +
    var top250Url = "https://api.github.com/search/repositories?q=language:python&sort=stars";

    wx.showNavigationBarLoading();
    console.log('show');

    //this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    //this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    //this.getMovieListData(top250Url, "top250", "豆瓣Top250");
    this.getMovieListData(top250Url);
  },

  // 处理请求来的 json 数据
  // getMovieListData: function (url, settedKey, categoryTitle) {
  getMovieListData: function (url) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res.data)
        //that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  },

  // 处理豆瓣电影数据
  processDoubanData: function (moviesDouban, settedKey,
    categoryTitle) {
    var movies = [];
    console.log(moviesDouban)
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]

      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
    console.log('hide');
    wx.hideNavigationBarLoading();
  },

  // 跳转到更多页面
  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },

  // 切换面板
  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  // 隐藏搜索代码
  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {},
      inputValue: ''
    }
    )
  },

  // 响应搜索事件
  onBindConfirm: function (event) {
    var keyWord = event.detail.value;
    var searchUrl = app.globalData.doubanBase +
      "/v2/movie/search?q=" + keyWord;
    this.getMovieListData(searchUrl, "searchResult", "");
  },

  // 跳转到详细页的事件函数
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: "movie-detail/movie-detail?id=" + movieId
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