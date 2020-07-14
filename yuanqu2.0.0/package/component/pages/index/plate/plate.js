const menuInfo = getApp().globalData.menuInfo;
const info = getApp().globalData.sysinfo;
import Toast from '../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../template/network.js';
import vioceText from '../../../../../template/vioceText.js';
import recoder from '../../../../../template/recorder.js';
import canonical from '../../../../../template/canonical.js';
import Notify from '../../../../../dist/notify/notify';
import clickrepeat from '../../../../../template/clickrepeat.js';
import func from '../../../../../template/func.js';
Page({
  data: {
    animationStatus: false,
    info: info,
    menuInfo: menuInfo,
    SafeButtom: info.statusBarHeight * 4,
    icon_Url: getApp().globalData.icon_Url,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    value: '',
    size: '',
    groups: [],
    checked: false,
    show: false,
    arry: [],
    text: '',
  },
  onBlock() {
    this.setData({
      show: true,
    })
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

  onVioce() {
    recoder('start')
  },
  onStop() {
    recoder('stop').then(res => {
      canonical(res.data.data);
    })
  },

  onClick() {
    var text = this.data.value;
    var key = this.data.key;
    // clickrepeat(key).then(res => {
      func.onTrade(text).then(res => {
        if (res.data.code == 1) {
          if (res.data.data.is_empty == 0) {
            wx.setStorageSync('groups', res.data.data.group);
            wx.redirectTo({
              url: '/package/component/pages/index/check/check?text=' + text + '&key=' + key,
            })
          } else {
            getApp().globalData.tradeArry = res.data.data.data;
            wx.navigateTo({
              url: '/package/component/pages/index/choose/choose?text=' + text + '&key=' + key,
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
  onBack() {
    wx.navigateBack();
  },
  onLoad: function(options) {
    this.data.key = options.key;
    vioceText({
      data: {
        content: '请输入您的产品名称或服务行业',
      },
    }).then(res => {})
  },
  onUnload: function() {

  },
})