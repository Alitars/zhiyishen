import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
const menuInfo = getApp().globalData.menuInfo;
const info = getApp().globalData.sysinfo;
import vioceText from '../../../../../template/vioceText.js';
import recoder from '../../../../../template/recorder.js';
import canonical from '../../../../../template/canonical.js';
import clickrepeat from '../../../../../template/clickrepeat.js';
import func from '../../../../../template/func.js';
Page({
  data: {
    animationStatus: false,
    info: info,
    menuInfo: menuInfo,
    SafeButtom: info.statusBarHeight * 4,
    icon_Url: getApp().globalData.icon_Url,
    value: '',
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    text: '',
    groups: [],
    checked: false,
    show: false,
    arry: [],
    num: '',
    name: '',
  },

  notify(res) {
    Notify({
      text: res,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },
  onBlock() {
    this.setData({
      show: true,
    })
  },
  onVioce() {
    recoder('start')
  },
  onStop() {
    recoder('stop').then(res => {
      canonical(res.data.data);
    })
  },

  onClick() {
    var servername = this.data.value;
    var num = this.data.num;
    var name = this.data.name;
    // clickrepeat(servername).then(res => {
      func.onTrade(name).then(res => {
        if (res.data.code == 1) {
          if (res.data.data.is_empty == 0) {
            wx.setStorageSync('groups', res.data.data.group);
            wx.redirectTo({
              url: '/package/component1/pages/intitle/check/check?name=' + name + '&num=' + num + '&servername=' + servername,
            })
          } else {
            getApp().globalData.tradeArry = res.data.data.data;
            wx.navigateTo({
              url: '/package/component1/pages/intitle/choose/choose?name=' + name + '&num=' + num + '&servername=' + servername,
            })
          }
        }
      }).catch(err => { })
    // })
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    })
  },
  onChange(e) {
    canonical(e.detail);
  },

  onBack() {
    wx.navigateBack();
  },
  onLoad: function(options) {
    vioceText({
      data: {
        content: '请输入您的产品名称或服务行业',
      },
    }).then(res => {})
    this.data.num = options.num;
    this.data.name = options.name;
  },

  onUnload: function() {
  },
})