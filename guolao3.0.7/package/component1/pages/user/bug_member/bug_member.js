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
    list: [],
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    succesfull: true,
    buttons: [{
      type: 'balanced',
      block: true,
      text: '返回',
    }, ],
    detail: {},
  },
  onClick() {

  },
  onBuy() {
    NetworkRequest({
      url: '/level/buyLevel',
      data: {
        l_id: this.data.detail.id,
        openid: wx.getStorageSync('openId'),
      },
      method: "POST"
    }).then(res => {
      if (res.statusCode !== 200) {
        wx.showToast({
          title: 'fail：' + ' ' + 'statusCode：' + +res.statusCode,
          icon: 'none',
          duration: 5000,
        });
      } else {
        this.onWxpay(res.data.data);
      };
    }).catch(err => {

    })
  },
  onWxpay(list) {
    wx.requestPayment({
      timeStamp: list.timeStamp,
      nonceStr: list.nonceStr,
      package: list.package,
      signType: list.signType,
      paySign: list.paysign,
      success: (res => {
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 5000,
          mask: true
        })
        setTime().then(() => {
          wx.navigateBack({
            delta: 2,
          })
        })
      }),
      fail: (err => {
        wx.showToast({
          title: '已取消支付',
          icon: 'none',
          duration: 5000,
        })
      }),
    })
  },
  // onClick() {
  //   wx.navigateBack({
  //     complete: (res) => {},
  //     delta: 2,
  //     fail: (res) => {},
  //     success: (res) => {},
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var id = options.id;
    var index = options.index;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var list = PrePage.data.list;
    var detail = JSON.parse(JSON.stringify(PrePage.data.detail[index]));
    if (typeof (detail.amount) == 'string') {
      detail.amount = JSON.parse(detail.amount).toFixed(2);
    };
    this.setData({
      list: list,
      detail: detail,
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