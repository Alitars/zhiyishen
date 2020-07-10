const main_Url = getApp().globalData.main_Url;
const menuInfo = getApp().globalData.menuInfo;
const info = getApp().globalData.sysinfo;
import Toast from '../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../template/network.js';
import Dialog from '../../../../../dist/dialog/dialog';
import Notify from '../../../../../dist/notify/notify';
Page({
  data: {
    SafeHigh: menuInfo.height + menuInfo.top,
    imgUrls: [],
    scale: info.screenHeight / info.screenWidth,
    id: '-1',
    icon_Url: getApp().globalData.icon_Url,
    key: '',
    text: '',
    pass: true,
  },
  onBack() {
    var pages = getCurrentPages();
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].route == 'package/component1/pages/index/brand_name/brand_name') {
        wx.navigateBack({
          delta: i,
        });
        break;
      };
    };
  },
  onScale(e) {

  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
      mask: true,
      zIndex: 1000
    })
  },
  notify(res) {
    Notify({
      text: res,
      duration: 2000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
  },
  onMore() {
    if (this.data.pass) {
      this.data.pass = false;
      var imgUrls = this.data.imgUrls
      this.toast();
      NetworkRequest({
        url: '/getpicall',
        data: {
          name: this.data.key,
          servername: this.data.text,
        },
      }).then(res => {
        Toast.clear();
        var code = res.data.code;
        var list = res.data.data;
        var arry = this.data.imgUrls;
        var index = arry.length;
        if (code == 1) {
          for (var i = 0; i < list.length; i++) {
            var a = index + i
            this.setData({
              ["imgUrls[" + a + "]"]: list[i]
            })
          }
        
        }
        this.data.pass = true;
      }).catch(err => {
        Toast.clear();
        this.data.pass = true;
        
      })
    }
  },

  onIndex() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  onDt(e) {
    var index = e.currentTarget.dataset.id;
    var n = this.data.imgUrls.length;
    wx.navigateTo({
      url: '/package/component1/pages/index/createDt/createDt?index=' + index + '&s=' + n + '&key=' + this.data.key + '&text=' + this.data.text,
    })
  },
  onLoad: function(options) {
    this.setData({
      imgUrls: getApp().globalData.icon
    })
    this.data.key = options.key;
    this.data.text = options.text;
  },
})