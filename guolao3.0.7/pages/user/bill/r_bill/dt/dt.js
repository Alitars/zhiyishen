import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
Page({
  data: {
    arry: [],
    obj: {},
    show: true,
    mold:'',
  },

  getDt(obj) {
    this.toast('加载中...');
    var type = obj.type;
    var mold = obj.mold;
    var id = obj.id;
    if (mold == 'brand') {
      var url = '/invoice/invoiceRecordDetail';
    };
    if (mold == 'patent') {
      var url = '/patent/invoiceDetail';
    };
    if (mold == 'copyright') {
      var url = '/copyRight/invoiceDetail';
    };
    NetworkRequest({
      url: url,
      data: {
        id: id,
        type: mold == 'brand' ? type : '',
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      var arry = res.data.data;
      if (code == 1) {
        var number = arry.create_time;
        arry.order_id = typeof (arry.order_id) == 'string' ? arry.order_id.split(',') : arry.order_id;
        arry.invoice_money = typeof (arry.invoice_money) == 'string' ? JSON.parse(arry.invoice_money).toFixed(2) : arry.invoice_money.toFixed(2);
        // if(mold == 'patent'||mold == 'copyright'){
          
        // }
        this.setData({
          arry: arry,
          show: false,
          mold:mold,
        })
      } else {
        this.setData({
          show: true,
        })
      };
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
  onLoad: function (options) {
    var obj = getApp().globalData.arry;
    // console.log(obj);
    this.getDt(obj);
    this.data.obj = obj;
  },
  onPullDownRefresh: function () {
    this.getDt(this.data.obj);
  },
})