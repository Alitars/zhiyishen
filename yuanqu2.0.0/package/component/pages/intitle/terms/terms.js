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
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    value: '',
    text: '',
    groups: [],
    checked: false,
    show: false,
    arry: [],
    num: '',
  },
  onBlock() {
    this.setData({
      show: true,
    })
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
  onVioce() {
    recoder('start')
  },
  onStop() {
    recoder('stop').then(res => {
      canonical(res.data.data);
    })
  },

  onClick() {
    var name = this.data.value;
    var num = this.data.num;
    clickrepeat(name).then(res => {
      func.onHistory().then(ss => {
        if (ss) {
          wx.showModal({
            title: '温馨提示',
            content: '您要注册的商标类别是否同历史商标相同？',
            showCancel: true,
            cancelText: '否',
            cancelColor: '',
            confirmText: '是',
            confirmColor: '#f96006',
            success: (res => {
              if (res.confirm == true) {
                wx.navigateTo({
                  url: '/package/component/pages/intitle/same_similar/same_similar?text=' + name + '&num=' + num,
                });
              } else {
                wx.navigateTo({
                  url: '/package/component/pages/intitle/brand_name/brand_name?name=' + name + '&num=' + num,
                })
              }
            })
          })
        } else {
          wx.navigateTo({
            url: '/package/component/pages/intitle/brand_name/brand_name?name=' + name + '&num=' + num,
          })
        }
      })
    })
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
        content: '您想要名称中含有哪些字或者词呢？',
      },
    }).then(res => {})
    this.data.num = options.num;
  },
  onUnload: function() {

  },
})