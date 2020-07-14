Page({
  data: {
    arry: [],
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.id,
    });
    this.setData({
      arry: wx.getStorageSync("arry"),
    });
  },
  onReady: function() {
    wx.removewx.setStorageSync({
      key: 'arry',
    });
  },
})