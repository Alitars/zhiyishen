import NetworkRequest from '../../../../template/network.js';
import Toast from '../../../../dist/toast/toast';
Page({
  data: {

  },
  getDt(e) {
    var token = wx.getStorageSync('token');
    var that = this;
    NetworkRequest({
      url: '/message/messageDetail',
      data: {
        id: e,
        token: token,
      },
    }).then(res => {}).catch(err => {})
  },
  onLoad: function(options) {
    this.getDt(options.id);
  },
})