// package/component2/pages/patent_book/correlation/correlation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var text = "";
    for (var i = 0; i < 1000; i++) {
      text += '阿士大夫大幅度发上档次的说法是的发送到水电费第三方士大夫是的是的范德萨范德萨。'
    };
    this.setData({
      text: text
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