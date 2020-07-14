import Toast from '../../../../dist/toast/toast';
import Notify from '../../../../dist/notify/notify';
import NetworkRequest from '../../../../template/network.js';
import setTime from '../../../../template/setTime.js';
Page({
  data: {
    arry: [],
  },
  getData() {
    this.toast('加载中...');
    // var userid = wx.getStorageSync('userid');
    // var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/invoice/invoiceRecordList',
      data: {
        // user_id: userid,
        // token: token,
        // type
      },
    }).then(res => {
      var code = res.data.code;
      var arry = res.data.data.dataList;
      if (code == 1) {
        for (var i = 0; i < arry.length; i++) {
          arry[i].order_id = arry[i].order_id.split(',');
          if (arry[i].invoice_money > 0) {
            if (typeof (arry[i].invoice_money) == 'string') {
              arry[i].invoice_money = JSON.parse(arry[i].invoice_money).toFixed(2);
            } else {
              arry[i].invoice_money = arry[i].invoice_money.toFixed(2);
            };
          } else {
            arry[i].invoice_money = '0.00';
          };
        }
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
  onDt(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/user/bill/r_bill/dt/dt?id=' + id,
    })
  },
  onLoad: function(options) {
    this.getData();
  },
  onPullDownRefresh: function() {
    this.getData();
  },
})