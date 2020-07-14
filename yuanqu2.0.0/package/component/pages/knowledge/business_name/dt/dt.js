// package/component/pages/knowledge/business_name/dt/dt.js
import selectQuery from '../../../../../../template/selectQuery';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    arry: [],
    tradeItem: '',
    region: [],
    color: ['#22B14C', '#FFF200', '#FF7F27', '#FF0000'],
    text: ['低', '中', '较高', '高'],
    valueTwo: '',
    level: 0,
    top: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    selectQuery('bg').then((res) => {
      var pages = getCurrentPages();
      var _this = pages[pages.length - 2];
      var arry = JSON.parse(JSON.stringify(_this.data.arry));
      for (var i = 0; i < arry.length; i++) {
        arry[i].business_scope = '';
        arry[i].reg_location = '';
        if (arry[i].warning == "红色警告") {
          arry[i].warning = '高';
          arry[i].color = '#FF0000';
        };
        if (arry[i].warning == "橙色警告") {
          arry[i].warning = '较高';
          arry[i].color = '#FF7F27';
        };
        if (arry[i].warning == "黄色警告") {
          arry[i].warning = '中';
          arry[i].color = '#FFF200';
        };
        if (arry[i].warning == "无警告") {
          arry[i].warning = '低';
          arry[i].color = '#22B14C';
        };
        arry[i] = {
          company_name: arry[i].company_name,
          warning: arry[i].warning,
          color: arry[i].color,
        };
      };
      this.setData({
        level: _this.data.level,
        arry: arry,
        tradeItem: _this.data.tradeItem,
        region: _this.data.region,
        valueTwo: _this.data.valueTwo + _this.data.commpany[_this.data.commpanyItem],
        top: res[0].height,
      })
    });
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