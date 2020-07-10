import NetworkRequest from '../../../../../template/network.js';
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import copyText from '../../../../../template/copyText.js';
import applyType from "../../../../../template/template.js";
import chooseImgs from "../../../../../template/chooseImgs.js";
import preview from "../../../../../template/preview.js";
import setTime from '../../../../../template/setTime.js';
import route from '../../../../../template/route.js';
Page({
  data: {
    height: getApp().globalData.sysinfo.statusBarHeight * 4,
    order: [],
    icon_Url: getApp().globalData.icon_Url,
    checked: false
  },

  onBack() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var order = this.data.order;
    var chooseId = [];
    for (var i = 0; i < order.length; i++) {
      if (order[i].isSelect) {
        chooseId.push(order[i].order_id);
      };
    };
    // console.log(chooseId);
    if (chooseId.length == 0) {
      this.notify('请先选择！');
      return;
    };
    prevPage.setData({
      chooseId: chooseId,
    });
    wx.navigateBack({
      delta: 1,
    })
  },
  onChecked(e) {
    var id = e.currentTarget.dataset.id;
    var order = JSON.parse(JSON.stringify(this.data.order));
    var isSelect = order[id].isSelect;
    for (var i = 0; i < order.length; i++) {
      order[i].isSelect = false;
    };
    order[id].isSelect = !isSelect;
    this.setData({
      order: order
    })
  },

  notify(res) {
    Notify({
      text: res,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
  },

  toast(res) {
    Toast.loading({
      message: res,
      duration: 0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(getApp().globalData.arry);
    this.setData({
      order: JSON.parse(JSON.stringify(getApp().globalData.arry))
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})