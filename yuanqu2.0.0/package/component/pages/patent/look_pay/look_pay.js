import Notify from '../../../../../dist/notify/notify';
import Toast from '../../../../../dist/toast/toast';
import applyType from '../../../../../template/template.js';
import NetworkRequest from '../../../../../template/network.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },
  notify(e) {
    Notify({
      text: e,
      duration: 5000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      zIndex: 200
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.notify('声明：如果选择官费自缴，知依昇将不再提醒您缴纳官费，产生缴费延误平台概不负责');
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