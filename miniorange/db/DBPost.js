var util = require('../utils/util.js')

class DBPost {
  // 构造函数里的传入参数从原来的 url 改成 postId
  constructor(postId) {
    this.storageKeyName = 'postList';
    // 传递进来的参数
    this.postId=postId;
  }

  // 得到全部文章信息
  getAllPostData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res){
      res = require('../data/data.js').postList;
      this.execSetStorageSync(res);
    }
    return res;
  }

  // 本地缓存，保存/更新
  execSetStorageSync(data) {
    // 书里是 get 更改为 set，但发现 get 也能存入数据，疑问
    wx.setStorageSync(this.storageKeyName, data);
  }

  //获取指定id号的文章数据
  getPostItemById() {
    var postsData = this.getAllPostData();
    var len = postsData.length;
    for (var i=0;i<len;i++) {
      if (postsData[i].postId == this.postId) {
        return {
          // 当前文章在缓存数据库中的序号
          index: i,
          data: postsData[i]
        }
      }
    }
  }

  //更新本地的点赞、评论信息、收藏、阅读量
  updatePostData(action, newComment) {
    const itemData = this.getPostItemById();
    let postData = itemData.data;
    let allPostData = this.getAllPostData();
    switch (action) {
      case "collect":
        if (!postData.collectionStatus) {
          postData.collectionStatus = true;
          postData.collectionNum++;
        } else {
          postData.collectionStatus = false;
          postData.collectionNum--;
        }
        break;
      case "up":
        if (!postData.upStatus) {
          postData.upStatus = true;
          postData.upNum++;
        } else {
          postData.upStatus = false;
          postData.upNum--;
        }
        break;
      case "comment":
        postData.comments.push(newComment);
        postData.commentNum++;
        break;
      case "reading":
        postData.readingNum++;
        break;
      default:
        break;
    }
    allPostData[itemData.index] = postData;
    this.execSetStorageSync(allPostData);
    return postData;
  }

  collect() {
    return this.updatePostData('collect');
  }

  up() {
    return this.updatePostData('up');
  }

  newComment(newComment){
    this.updatePostData('comment', newComment);
  }
  
  addReadingTimes(){
    this.updatePostData("reading");
  }

  /* 获取评论数据 */
  getCommentData() {
    var itemData = this.getPostItemById().data;
    /** 按时间降序排列评论 */
    itemData.comments.sort(this.compareWithTime);
    var len = itemData.comments.length, comment;
    for (var i = 0; i < len; i++) {
      /**将 comment 中的时间戳转换成阅读格式 */
      comment = itemData.comments[i];
      comment.create_time = util.getDiffTime(comment.create_time, true);
    }
    return itemData.comments;
  }

  compareWithTime(value1, value2) {
    var flag = parseFloat(value1.create_time) - parseFloat(value2.create_time);
    if (flag < 0) {
      return 1;
    } else if (flag > 0) {
      return -1
    } else {
      return 0;
    }
  }

  // 阅读量+1
  addReadingTimes(){
    this.updatePostData('reading');
  }

};

export {DBPost}