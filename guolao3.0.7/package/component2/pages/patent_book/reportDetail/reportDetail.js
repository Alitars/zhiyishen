var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
  },
  onLoad: function (options) {
    var id = options.id
    var that = this;
    var list = wx.getStorageSync('reportList')
    var article = list[id];
    WxParse.wxParse('article', 'html', article, that,5);
  }
})