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
import logoCheck from '../../../../../template/logon.js';
Page({
  data: {
    animationStatus: false,
    info: info,
    menuInfo: menuInfo,
    SafeButtom: info.statusBarHeight * 4,
    icon_Url: getApp().globalData.icon_Url,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
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
    var key = this.data.value;
    clickrepeat(key).then(res => {
      func.onHistory().then(ss => {
        if (ss) {
          wx.showModal({
            title: '温馨提示',
            content: '您要注册的商标类别是否同历史商标相同？',
            showCancel: true,
            cancelText: '否',
            cancelColor: '',
            confirmText: '是',
            confirmColor: '#f96509',
            success: (res => {
              if (res.confirm == true) {
                wx.navigateTo({
                  url: '/package/component1/pages/index/same_similar/same_similar?key=' + key,
                });
              } else {
                wx.navigateTo({
                  url: '/package/component1/pages/index/plate/plate?key=' + key,
                })
              }
            })
          })
        } else {
          wx.navigateTo({
            url: '/package/component1/pages/index/plate/plate?key=' + key,
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
  onShow: function () {
    logoCheck(this);
  },
  onBack() {
    var pages = getCurrentPages();
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].route == 'pages/index/index') {
        wx.navigateBack();
        return;
      } else {
        if (i == pages.length-1) {
          wx.reLaunch({
            url: '/pages/index/index',
          });
        };
      };
    };
  },
  onLoad: function (options) {
    vioceText({
      data: {
        content: 'Hi!我是小果，请问您的品牌名称是？',
      },
    }).then(res => {

    }).catch(err => {})
  },

  onUnload: function () {

  },
})