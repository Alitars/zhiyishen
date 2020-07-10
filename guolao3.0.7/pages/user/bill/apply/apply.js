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
      Toast('请先选择订单');
    }
  },
  onCreat() {
    var arry = this.data.arry;
    wx.showLoading({
      title: '发票生成中',
      duration: 3000,
    });
    var a = [];
    var huiyuan = [];
    var patent_id = [];
    var copyright_id = [];
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].iSelect == true && arry[i].mold == 'brand') {
        a.push(arry[i].order_id);
      };
      if (arry[i].iSelect == true && arry[i].mold == 'level_order') {
        huiyuan.push(arry[i].order_id);
      };
      if (arry[i].iSelect == true && arry[i].mold == 'patent') {
        patent_id.push(arry[i].order_id);
      };
      if (arry[i].iSelect == true && arry[i].mold == 'copyright') {
        copyright_id.push(arry[i].order_id);
      };
    };

    //商标开票
    var order_id = a.join(',');
    //会员开票
    var l_order = huiyuan.join(',');
    var invoice_id = this.data.id;
    var invoice_type = this.data.invoice_type;
    //专利开票
    var patent_id = patent_id.join(',');
    //版权开票
    var copyright_id = copyright_id.join(',');

    var brand = new Promise((resolve, reject) => {
      if (l_order == [] ? true : false) {
        if (order_id == [] ? true : false) {
          resolve(true);
          return;
        };
      } else {
        if (order_id == [] ? true : false) {
          resolve(true);
          return;
        };
      };
      NetworkRequest({
        url: '/invoice/applyInvoice',
        data: {
          order_id: order_id,
          invoice_id: invoice_id,
          invoice_type: invoice_type,
          l_order: l_order,
        },
      }).then(res => {
        resolve(res.data.code == 1 ? true : false);
      })
    })


    var patent = new Promise((resolve, reject) => {
      if (patent_id == [] ? true : false) {
        resolve(true);
        return;
      };
      NetworkRequest({
        url: '/patent/applyIn',
        data: {
          id: patent_id,
          invoice_id: invoice_id,
        },
        method: "POST",
      }).then(res => {
        resolve(res.data.code == 1 ? true : false);
      })
    })

    var copyright = new Promise((resolve, reject) => {
      if (copyright_id == [] ? true : false) {
        resolve(true);
        return;
      };
      NetworkRequest({
        url: '/copyRight/applyIn',
        data: {
          id: copyright_id,
          invoice_id: invoice_id,
        },
        method: "POST",
      }).then(res => {
        resolve(res.data.code == 1 ? true : false);
      })
    })

    Promise.all([brand, patent, copyright]).then((res) => {
      if (res[0] == true && res[1] == true && res[2] == true) {
        // console.log(res);
        Toast('生成发票成功');
        this.getData();
        setTime(1000).then(() => {
          wx.navigateTo({
            url: '/pages/user/bill/r_bill/r_bill',
          })
        })
      }
    })
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
      zIndex: 1000,
    });
  },
  getData() {
    wx.showLoading({
      title: '加载中...',
    });
    //商标
    var brand = new Promise((resolve, reject) => {
      NetworkRequest({
        url: '/invoice/invoiceList',
        data: {},
      }).then(res => {
        if (res.data.data) {
          var order = res.data.data.level_order;
          var list = res.data.data.dataList;
          for (var s = 0; s < order.length; s++) {
            order[i].iSelect = false;
            order[i].mold = 'level_order';
          };
          for (var i = 0; i < list.length; i++) {
            list[i].iSelect = false;
            list[i].mold = 'brand';
          };
          var arry = order.concat(list);
        };
        resolve(arry ? arry : []);
      })
    })
    //专利
    var patent = new Promise((resolve, reject) => {
      NetworkRequest({
        url: '/patent/unInOList',
        data: {},
        method: "POST",
      }).then(res => {
        var arry = res.data.data.data;
        if (arry) {
          for (var i = 0; i < arry.length; i++) {
            arry[i].iSelect = false;
            arry[i].mold = 'patent';
          };
        };
        resolve(arry ? arry : []);
      })
    })
    //版权
    var copyright = new Promise((resolve, reject) => {
      NetworkRequest({
        url: '/copyRight/unInOList',
        data: {},
        method: "POST",
      }).then(res => {
        var arry = res.data.data.data;
        if (arry) {
          for (var i = 0; i < arry.length; i++) {
            arry[i].iSelect = false;
            arry[i].mold = 'copyright';
          };
        };
        resolve(arry ? arry : []);
      })
    })

    //等待返回
    Promise.all([brand, patent, copyright]).then((res) => {
      var arry = res[0].concat(res[1]).concat(res[2]);
      this.setData({
        arry: arry,
        checked: false
      })
    })
  },
  onLoad: function (options) {
    this.getData();
  },
  onPullDownRefresh: function () {
    this.getData();
  },
})