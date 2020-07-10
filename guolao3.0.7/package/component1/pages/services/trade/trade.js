import vioceText from '../../../../../template/vioceText.js';
import recoder from '../../../../../template/recorder.js';
import canonical from '../../../../../template/canonical.js';
import Notify from '../../../../..//dist/notify/notify';
import Toast from '../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../template/network.js';
import clickrepeat from '../../../../../template/clickrepeat.js';
import func from '../../../../../template/func.js';
Page({
  data: {
    animationStatus: false,
    info: getApp().globalData.sysinfo,
    menu: getApp().globalData.menu,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    icon_Url: getApp().globalData.icon_Url,
    value: '',
    size: '',
    groups: [],
    checked: false,
    show: false,
    arry: [],
    text: '',
    options: {},
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
    var key = this.data.value;
    var options = this.data.options;
    var id = options.id;
    var imgUrls = options.imgUrls;
    var text = options.text;
    // clickrepeat(key).then(res => {
      func.onTrade(key).then(res => {
        if (res.data.code == 1) {
          if (res.data.data.is_empty == 0) {
            wx.setStorageSync('groups', res.data.data.group);
            wx.redirectTo({
              url: '/package/component1/pages/services/check/check?text=' + text + "&imgUrls=" + imgUrls + "&id=" + id + '&key=' + key,
            })
          } else {
            getApp().globalData.tradeArry = res.data.data.data;
            wx.setStorageSync('options', options);
            wx.navigateTo({
              url: '/package/component1/pages/services/choose/choose?key=' + key,
            })
          }
        }
      }).catch(err => {})
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

  notify(res) {
    Notify({
      text: res,
      duration: 8000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },
  onBack() {
    wx.navigateBack();
  },
  onLoad: function(options) {
    // this.notify('asasa')
    this.data.options = options;
    vioceText({
      data: {
        content: '请输入您的产品名称或服务行业',
      },
    }).then(res => {})
  },
  onUnload: function() {

  },
})