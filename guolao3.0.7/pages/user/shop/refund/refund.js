const main_Url = getApp().globalData.main_Url;
const info = getApp().globalData.sysinfo;
import Notify from '../../../../dist/notify/notify';
import Toast from '../../../../dist/toast/toast';
import Dialog from '../../../../dist/dialog/dialog';
import NetworkRequest from '../../../../template/network.js';
import setTime from '../../../../template/setTime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    title: '',
    checked: true,
    order_id: '',
    value: '',
    click_type: '',
    paytype: '',
    refund_account: '',
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },
  notify(res) {
    Notify({
      text: res,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
      zIndex: 300,
    });
  },
  onInput(e) {
    this.setData({
      refund_account: e.detail.value
    })
  },
  onRefund() {
    var order_id = this.data.order_id;
    var refund_type = this.data.title;
    var refund_account = this.data.refund_account;
    var refund_explain = this.data.value;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var options = this.data.options;
    if (PrePage.route == 'pages/user/my_copyright/dt/dt') {
      var url = '/copyRight/orderReturn';
      var order_id = options.id;
    } else {
      if (PrePage.route == 'pages/user/my_patent/dt/dt') {
        var order_id = options.id;
        var url = '/patent/orderReturn';
      } else {
        var url = '/order/refundApply';
      };
    };
    if (!refund_account) {
      this.notify('请输入退款账号！');
      return;
    };
    if (!refund_explain) {
      this.notify('请输入退款理由！');
      return;
    };
    this.toast();
    NetworkRequest({
      url: url,
      data: {
        order_id: order_id,
        id: order_id,
        // type:
        refund_type: refund_type,
        refund_account: refund_account,
        refund_explain: refund_explain,
      },
    }).then(res => {
      Toast.clear();
      this.notify(res.data.msg);
      var code = res.data.code;
      if (code == 1) {
        setTime().then(res => {
          PrePage.getDt(PrePage.data.id);
          wx.navigateBack({
            delta: 1,
          })
        })
      };
      if (code == 2) {
        setTime().then(res => {
          wx.navigateTo({
            url: '/pages/user/log_on/log_on',
          })
        })
      };
    }).catch(err => {
      Toast.clear();
    })
  },
  onClose() {
    this.setData({
      show: !this.data.show,
    });
  },
  onSelect(event) {

  },
  onChange(e) {
    this.setData({
      value: e.detail
    })
  },

  onLoad: function (options) {
    // console.log(options);
    this.data.options = options;
    this.data.order_id = options.order_id;
    this.setData({
      title: options.refund_type
    })
  },
})

// const main_Url = getApp().globalData.main_Url;
// const info = getApp().globalData.sysinfo;
// import Notify from '../../../../dist/notify/notify';
// import Toast from '../../../../dist/toast/toast';
// import Dialog from '../../../../dist/dialog/dialog';
// import webquest from '../../../../template/network.js';
// import setTime from '../../../../template/setTime.js';
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     show: false,
//     title: '',
//     checked: true,
//     order_id: '',
//     value: '',
//     click_type: '',
//     paytype: '',
//     refund_account: '',
//     type: 0,
//     pay_type: 0,
//   },
//   toast() {
//     Toast.loading({
//       message: '加载中...',
//       duration: 0,
//     });
//   },
//   notify(res) {
//     Notify({
//       text: res,
//       duration: 3000,
//       selector: '#custom-selector',
//       backgroundColor: '#f44',
//       color: '#fff',
//       zIndex: 300,
//     });
//   },
//   onInput(e) {
//     this.setData({
//       refund_account: e.detail.value
//     })
//   },
//   onRefund() {
//     var type = this.data.type;
//     if (type == 0) {
//       this.notify('订单错误！请重试！');
//     };
//     var order_id = this.data.order_id;
//     var id = this.data.order_id;
//     var refund_type = this.data.title;
//     var refund_account = this.data.refund_account;
//     var refund_explain = this.data.value;
//     var pages = getCurrentPages();
//     var prevPage = pages[pages.length - 2];
//     if (!refund_account) {
//       this.notify('请输入退款账号！');
//       return;
//     };
//     if (!refund_explain) {
//       this.notify('请输入退款理由！');
//       return;
//     };
//     this.toast();
//     webquest({
//       url: type == 1 ? "/order/refundApply" : "/patent/orderReturn",
//       data: {
//         order_id: order_id,
//         id: id,
//         refund_type: refund_type,
//         type: type == 1 ? refund_type : this.data.pay_type,
//         refund_account: refund_account,
//         account: refund_account,
//         remark: refund_explain,
//         refund_explain: refund_explain,
//       },
//       method: type == 1 ? 'GET' : 'POST',
//     }).then(res => {
//       Toast.clear();
//       this.notify(res.data.msg);
//       var code = res.data.code;
//       if (code == 1) {
//         setTime().then(res => {
//           prevPage.getDt(prevPage.data.id);
//           wx.navigateBack({
//             delta: 1,
//           })
//         })
//       };
//     })
//   },
//   onClose() {
//     this.setData({
//       show: !this.data.show,
//     });
//   },
//   onSelect(event) {

//   },
//   onChange(e) {
//     this.setData({
//       value: e.detail
//     })
//   },

//   onLoad: function(options) {
//     this.data.type = options.type;
//     if (options.type == 2) {
//       this.data.order_id = options.id;
//       this.data.pay_type = options.pay_type;
//     } else {
//       this.data.order_id = options.order_id;
//     };
//     this.setData({
//       title: options.refund_type
//     })
//   },
// })