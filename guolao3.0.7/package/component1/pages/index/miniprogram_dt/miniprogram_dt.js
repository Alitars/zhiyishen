// package/component1/pages/index/miniprogram_dt/miniprogram_dt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    icon: 'https://admin.iguolao.com/public/uploads/20200403140929712.jpg',
  },
  onClick() {
    wx.navigateToMiniProgram({
      // wxb02328727f551015
      appId: 'wxb02328727f551015',
      path: '',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // console.log(res)
        // 打开成功
      },
      fail: (err => {
        // console.log(err);
      })
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