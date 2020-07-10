Page({
  data: {
    title: ['商品类别详情', '关联订单', '订单进度'],
    arry: [],
    id: 0,
  },
  onLoad: function(options) {
    var id = options.type;
    wx.setNavigationBarTitle({
      title: this.data.title[id],
    });
    this.setData({
      arry: wx.getStorageSync('arry'),
      id: options.type
    });
  },
  onUnload: function() {
    wx.removeStorageSync('arry')
  },
})