import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
Page({
  data: {
    arry: [],
    id: '',
  },
  getDt(e) {
    this.toast('加载中...');
    // var userid = wx.getStorageSync('userid');
    // var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/invoice/invoiceRecordDetail',
      data: {
        id: e,
        // user_id: userid,
        // token: token,
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      var arry = res.data.data;
      if (code == 1) {
        var number = arry.create_time;
        arry.order_id = arry.order_id.split(',');
        arry.invoice_money = arry.invoice_money.toFixed(2);
        this.setData({
          arry: arry,
        })
      } else {
        this.notify(res.data.msg);
      };
      if (code == 2) {
        setTime().then(res => {
          wx.navigateTo({
            url: '/pages/user/log_on/log_on',
          })
        });
      };
      Toast.clear();
      wx.stopPullDownRefresh();
    }).catch(err => {
      Toast.clear();
      wx.stopPullDownRefresh();
    })
  },
  notify(res) {
    Notify({
      text: res,
      duration: 1000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
  },
  toast(e) {
    Toast.loading({
      message: e,
      duration: 0,
    });
  },
  onLoad: function(options) {
    this.getDt(options.id);
    this.data.id = options.id;
  },
  onPullDownRefresh: function() {
    this.getDt(this.data.id);
  },
})