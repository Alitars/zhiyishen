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

    function format(obj) {
      var arry = JSON.parse(JSON.stringify(obj.arry));
      var type = obj.type;
      for (var i = 0; i < arry.length; i++) {
        arry[i].mold = type;
        arry[i].money = arry[i].invoice_money ? arry[i].invoice_money : arry[i].money;
        if (arry[i].money > 0) {
          if (typeof (arry[i].money) == 'string') {
            arry[i].money = JSON.parse(arry[i].money).toFixed(2);
          } else {
            arry[i].money = arry[i].money.toFixed(2);
          };
        } else {
          arry[i].money = '0.00';
        };
      }
      return arry;
    }

    var brand = new Promise((resolve, reject) => {
      NetworkRequest({
        url: '/invoice/invoiceRecordList',
        data: {},
      }).then(res => {
        resolve(res.data.code == 1 ? res.data.data.dataList : []);
      })
    })


    var patent = new Promise((resolve, reject) => {
      NetworkRequest({
        url: '/patent/invoicelist',
        data: {},
        method: "POST",
      }).then(res => {
        resolve(res.data.code == 1 ? res.data.data.data : []);
      })
    })

    var copyright = new Promise((resolve, reject) => {
      NetworkRequest({
        url: '/copyRight/invoicelist',
        data: {},
        method: "POST",
      }).then(res => {
        resolve(res.data.code == 1 ? res.data.data.data : []);
      })
    })

    Promise.all([brand, patent, copyright]).then((res) => {
      var arry = format({
        'arry': res[0],
        'type': 'brand'
      }).concat(format({
        'arry': res[1],
        'type': 'patent'
      })).concat(format({
        'arry': res[2],
        'type': 'copyright'
      }));
      // console.log(arry, 'Promise.all');
      this.setData({
        arry: arry,
      })
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
    var index = e.currentTarget.dataset.index;
    var obj = this.data.arry[index];
    getApp().globalData.arry = obj;
    wx.navigateTo({
      url: '/pages/user/bill/r_bill/dt/dt',
    })
  },
  onLoad: function (options) {
    this.getData();
  },
  onPullDownRefresh: function () {
    this.getData();
  },
})