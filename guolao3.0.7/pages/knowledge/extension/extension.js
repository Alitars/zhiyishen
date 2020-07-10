import Toast from '../../../dist/toast/toast';
import Notify from '../../../dist/notify/notify';
import NetworkRequest from '../../../template/network.js';
Page({
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    title: '',
    list: [],
    arry: [],
  },
  onClick() {
    wx.navigateTo({
      url: '/package/component1/pages/services/dt/dt?id=' + 2 + '&title=' + '商标信息业务',
    })
  },
  onDt(e) {
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    var list = this.data.list[index];
    wx.setStorageSync("list", list);
    var value = this.data.value;
    wx.navigateTo({
      url: '/pages/index/search/dt/dt?id=' + id + "&type=" + type + "&value=" + this.data.title,
    });
  },
  onSeach() {
    this.setData({
      display: false
    })
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var arry = PrePage.data.arryMax;
    this.data.arry = arry;
    var list = arry.slice(0, 10);
    var s = this.data.list.length;
    var a = list.length;
    for (var i = s; i < s + a; i++) {
      this.setData({
        ["list[" + i + "]"]: list[i - s],
      })
    };
    for (var i = a - 1; i >= 0; i--) {
      arry.splice(i, 1);
    }
    this.setData({
      display: true
    })
  },
  onLoad: function(options) {
    if (options.title == false) {} else {
      this.onSeach()
    }
  },
  onReachBottom: function() {
    this.onSeach()
  },
})