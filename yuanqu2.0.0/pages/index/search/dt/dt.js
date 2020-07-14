const main_Url = getApp().globalData.main_Url;
import applyType from '../../../../template/template.js';
import NetworkRequest from '../../../../template/network.js';
Page({
  data: {
    arry: [],
    list: [],
    value: '',
    applyType: applyType.applyType,
    block: []
  },
  onDt(e) {
    var id = e.currentTarget.dataset.id;
    var arry = this.data.arry;
    if (id == 4) {
      wx.setStorageSync("arry", this.data.block);
      wx.navigateTo({
        url: '/pages/index/search/common/common?id=' + '商品/服务项目',
      });
    };
    if (id == 6) {
      if (arry.length > 0) {
        wx.setStorageSync("arry", arry);
      };
      wx.navigateTo({
        url: '/pages/index/search/common/common?id=' + '商标流程',
      });
    };
  },
  getData(id, type) {
    NetworkRequest({
      url: '/getdatadetail',
      data: {
        regid: id,
        intcls: type,
      },
    }).then(res => {
      this.setData({
        arry: res.data.data,
      })
    }).catch(err => {})

    NetworkRequest({
      url: '/getdataone',
      data: {
        regid: id,
        intcls: type,
      },
    }).then(res => {
      var code = res.data.code
      if (code == 1) {
        this.setData({
          block: res.data.data
        })
      }
    }).catch(err => {})
  },
  onLoad: function(options) {
    var list = wx.getStorageSync("list")
    this.setData({
      list: list,
    });
    this.getData(options.id, ~~options.type);
  },
  onReady: function() {
    wx.removeStorageSync('list');
  },
})