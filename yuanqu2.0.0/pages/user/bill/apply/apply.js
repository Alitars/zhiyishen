import Toast from '../../../../dist/toast/toast';
import Notify from '../../../../dist/notify/notify';
import NetworkRequest from '../../../../template/network.js';
import setTime from '../../../../template/setTime.js';
import route from '../../../../template/route.js';
Page({
  data: {
    checked: false,
    icon_Url: getApp().globalData.icon_Url,
    arry: [],
    id: '',
    invoice_type: '',
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    height: getApp().globalData.menu.height + getApp().globalData.menu.top,
    // display: false,
    // btn: [{
    //   iSelect: true,
    //   text: '商标发票',
    // }, {
    //   iSelect: false,
    //   text: '会员发票'
    // }],
  },
  // onBack() {
  //   wx.navigateBack({
  //     complete: (res) => {},
  //     delta: 1,
  //     fail: (res) => {},
  //     success: (res) => {},
  //   })
  // },
  // onClose() {
  //   this.setData({
  //     display: !this.data.display
  //   })
  // },
  // onBtn(e) {
  //   var index = e.currentTarget.dataset.index;
  //   var btn = JSON.parse(JSON.stringify(this.data.btn));
  //   if (btn[index].iSelect) {
  //     return;
  //   };
  //   for (var i = 0; i < btn.length; i++) {
  //     btn[i].iSelect = !btn[i].iSelect
  //   };
  //   this.setData({
  //     btn: btn
  //   });
  // },

  onClick() {
    wx.navigateBack({
      complete: (res) => {},
      delta: 1,
      fail: (res) => {},
      success: (res) => {},
    })
  },

  onChooseAll() {
    var checked = this.data.checked;
    var arry = this.data.arry;
    if (checked) {
      for (var i = 0; i < arry.length; i++) {
        arry[i].iSelect = false;
      };
      this.setData({
        arry: arry,
        checked: false,
      });
    } else {
      for (var i = 0; i < arry.length; i++) {
        arry[i].iSelect = true;
      };
      this.setData({
        arry: arry,
        checked: true,
      });
    };
  },
  onChoose(e) {
    var id = e.currentTarget.dataset.id;
    var arry = this.data.arry;
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].id == id) {
        if (arry[i].iSelect == true) {
          this.setData({
            ["arry[" + i + "].iSelect"]: false,
          });
        } else {
          var checked = false;
          this.setData({
            ["arry[" + i + "].iSelect"]: true,
          });
        };
      };
    };
    this.onCheck();
  },
  onCheck() {
    var arry = this.data.arry;
    var status = [];
    for (var i = 0; i < arry.length; i++) {
      status.push(arry[i].iSelect)
    };
    if (status.indexOf(false) == -1) {
      this.setData({
        checked: true,
      })
    } else {
      this.setData({
        checked: false,
      })
    }
  },
  notify(res) {
    Notify({
      text: res,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
  },
  onClick() {
    var arry = this.data.arry;
    var a = [];
    for (var i = 0; i < arry.length; i++) {
      a.push(arry[i].iSelect);
    };
    if (arry.length > 0 && a.indexOf(true) >= 0) {
      wx.navigateTo({
        url: '/pages/user/bill/g_bill/g_bill?open=' + true,
      })
    } else {
      Toast('请先选择订单！');
    }
  },
  onCreat() {
    var arry = this.data.arry;
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    Toast.loading({
      message: '发票生成中...',
      duration: 0,
    });
    var a = [];
    var huiyuan = [];
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].iSelect == true && arry[i].type == 1) {
        a.push(arry[i].order_id);
      };
      if (arry[i].iSelect == true && arry[i].type == 2) {
        huiyuan.push(arry[i].order_id);
      };
    };
    var order_id = a.join(',');
    var l_order = huiyuan.join(',');
    var invoice_id = this.data.id;
    var invoice_type = this.data.invoice_type;
    if (order_id||l_order) {
      NetworkRequest({
        url: '/invoice/applyInvoice',
        data: {
          user_id: userid,
          token: token,
          order_id: order_id,
          invoice_id: invoice_id,
          invoice_type: invoice_type,
          l_order: l_order,
        },
      }).then(res => {
        var code = res.data.code;
        Notify({
          text: res.data.msg,
          duration: 5000,
          selector: '#custom-selector',
          backgroundColor: '#f44',
          color: '#fff',
        })
        if (code == 1) {
          this.getData();
          setTime().then(res => {
            route('pages/user/bill/r_bill/r_bill')
          })
        }
        if (code == 2) {
          setTime().then(res => {
            route('pages/user/log_on/log_on');
          });
        };
        Toast.clear();
      }).catch(err => {
        Toast.clear();
      })
    } else {
      Toast('请先选择订单！')
    };
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },
  getData() {
    this.toast();
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/invoice/invoiceList',
      data: {
        user_id: userid,
        token: token,
      },
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        var list = arry.dataList;
        var level_order = arry.level_order;
        var newArry = [];
        for (var i = 0; i < list.length; i++) {
          newArry.push(list[i]);
          newArry[i].iSelect = false;
        };
        for (var c = 0; c < level_order.length; c++) {
          newArry.push(level_order[c]);
          newArry[c].iSelect = false;
        };
        this.setData({
          arry: newArry,
          checked: false,
        });
      };
      if (code == 2) {
        this.notify(res.data.msg);
        setTime().then(res => {
          route('pages/user/log_on/log_on');
        });
      };
      Toast.clear();
      wx.stopPullDownRefresh();
    }).catch(err => {
      Toast.clear();
      wx.stopPullDownRefresh();
    })
  },
  onLoad: function (options) {
    this.getData();
  },
  onPullDownRefresh: function () {
    this.getData();
  },
})