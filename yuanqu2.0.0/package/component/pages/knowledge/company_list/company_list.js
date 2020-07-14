import Dialog from '../../../../../dist/dialog/dialog';
import Notify from '../../../../../dist/notify/notify';
import contrast from '../../../../../template/template.js';
import Toast from '../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../template/network.js';
import setTime from '../../../../../template/setTime.js'
import func from '../../../../../template/func.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arry: [],
  },
  getData() {
    wx.showLoading({
      title: '加载中...'
    });
    NetworkRequest({
      url: '/assets/companyList',
      data: {
        company: '',
        // park_name	否	string	园区名
        sort: 'desc',
        len:50000,
        // page:10000,
      },
      method: "POST",
    }).then((res) => {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      this.setData({
        arry: res.data.data.data
      })
    })
  },
  onDt(e) {
    // var id = e.
    // console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/package/component/pages/knowledge/company_details/company_details?title=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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
    this.getData();
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