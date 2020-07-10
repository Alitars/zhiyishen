import NetworkRequest from '../../../template/network.js';
Page({
  data: {
    arry: [],
  },
  getNews() {
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var that = this;
    NetworkRequest({
      url: '/message/getMessageList',
      data: {
        user_id: userid,
        token: token,
      },
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        that.setData({
          arry: res.data.data,
        });
      };
      if (code == 0) {
        Toast('暂无消息！');
      };
    }).catch(err => {})
  },
  onLoad: function(options) {
    this.getNews();
  },
})