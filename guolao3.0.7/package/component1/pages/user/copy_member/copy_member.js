import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
const menuInfo = getApp().globalData.menuInfo;
const info = getApp().globalData.sysinfo;
const recorderManager = getApp().globalData.recorderManager;
import setTime from '../../../../../template/setTime';
import func from '../../../../../template/func.js';
import vioceText from '../../../../../template/vioceText.js';
import animation from '../../../../../template/animation.js';
import canonical from '../../../../../template/canonical';
import recoderTS from '../../../../../template/recorder.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    icon_Url: getApp().globalData.icon_Url,
    list: [],
    detail: [],
  },
  onBack() {
    wx.navigateBack({
      complete: (res) => {},
      delta: 0,
      fail: (res) => {},
      success: (res) => {},
    })
  },
  onClick(e) {
    // console.log(e)
    const {
      index
    } = e.detail

    index === 0 && wx.showModal({
      title: 'Thank you for your support!',
      showCancel: !1,
    })

    index === 1 && wx.navigateBack()
  },
  onBuy(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/package/component1/pages/user/bug_member/bug_member?id=' + id + '&index=' + index,
    })
  },
  getData() {
    NetworkRequest({
      url: '/usercenter/userLevel',
      data: {},
      method: 'POST',
    }).then(res => {
      if (res.statusCode !== 200 && res.data.code == '1') {
        wx.showToast({
          title: 'fail：' + ' ' + 'statusCode：' + +res.statusCode,
          icon: 'none',
          duration: 5000,
        });
      } else {
        var arry = res.data.data;
        for (var i = 0; i < arry.length; i++) {
          arry[i].index = i;
        };
        this.setData({
          detail: arry,
        })
      };
    })
  },
  getAttest() {
    NetworkRequest({
      url: '/usercenter/attestationlst',
      data: {},
      method: 'POST',
    }).then(res => {
      // console.log(res);
      var attest = res.data.msg;
      if (res.data.code == 1) {
        this.setData({
          ['list.attest']: attest,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var PrePage = getCurrentPages()
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var list = PrePage.data;
    // console.log(list,'asasas')
    this.setData({
      list: list
    })
    this.getData();
    this.getAttest();
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