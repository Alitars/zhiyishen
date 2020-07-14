import Toast from '../../../../dist/toast/toast';
import Notify from '../../../../dist/notify/notify';
import NetworkRequest from '../../../../template/network.js';
import Dialog from '../../../../dist/dialog/dialog';
import setTime from '../../../../template/setTime.js';
Page({
  data: {
    arry: [],
    open: false,
    onPay: false,
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    height: getApp().globalData.menu.height + getApp().globalData.menu.top,
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1,
    })
  },
  // onCreat()
  onChoose(e) {
    var id = e.currentTarget.dataset.id;
    var invoice_type = e.currentTarget.dataset.type;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    PrePage.data.id = id;
    PrePage.data.invoice_type = invoice_type;
    PrePage.onCreat();
    wx.navigateBack({
      delta: 1,
    })
  },
  onClick() {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    PrePage.setData({
      invoice_id: '',
      name: '',
      value:''
    });
    wx.navigateBack({
      delta: 1,
    })
  },
  onPay(e) {
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    PrePage.setData({
      invoice_id: id,
      name: name,
      value:name,
    });
    wx.navigateBack({
      delta: 1,
    })
  },
  onAdd() {
    wx.navigateTo({
      url: '/pages/user/bill/s_bill/s_bill',
    })
  },
  getData() {
    this.toast('加载中...');
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/usercenter/myinvoices',
      data: {
        user_id: userid,
        token: token,
        page: 0,
      },
    }).then(res => {
      var list = res.data.data;
      // var arry = [];
      if (list.length == 0) {
        var pages = getCurrentPages();
        var PrePage = pages[pages.length - 2];
        PrePage.setData({
          invoice_id: '',
          name: '',
        });
      }
      var code = res.data.code;
      if (code == 1) {
        this.setData({
          arry: res.data.data
        });
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
    })
  },
  onSet(e) {
    var id = e.currentTarget.dataset.id;
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/usercenter/checkedinvoices',
      data: {
        id: id,
        token: token,
        user_id: userid,
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      this.notify(res.data.msg);
      if (code == 1) {
        this.getData();
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
  onEdit(e) {
    var id = e.currentTarget.dataset.id;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var route = PrePage.route;
    if (route == 'package/component/pages/services/pay/pay') {
      PrePage.setData({
        invoice_id: '',
        name: '',
      });
    };
    wx.navigateTo({
      url: '/pages/user/bill/edit/edit?id=' + id,
    })
  },
  onDelet(e) {
    var id = e.currentTarget.dataset.id;
    var id = e.currentTarget.dataset.id;
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    Dialog.confirm({
      title: '提示',
      message: '是否删除该发票！',
      zIndex: 1000
    }).then(() => {
      // on confirm
      NetworkRequest({
        url: '/usercenter/delinvoices',
        data: {
          id: id,
          token: token,
          user_id: userid,
        },
      }).then(res => {
        var code = res.data.code;
        this.notify(res.data.msg);
        if (code == 1) {
          this.getData();
        };
        // if (code == 2) {
        //   setTime().then(res => {
        //     wx.navigateTo({
        //       url: '/pages/user/log_on/log_on',
        //     })
        //   });
        // };
        Toast.clear();
        wx.stopPullDownRefresh();
      }).catch(err => {
        Toast.clear();
        wx.stopPullDownRefresh();
        
      })
    }).catch(() => {
      // on cancel
    });
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
  toast(e) {
    Toast.loading({
      message: e,
      duration: 0,
    });
  },
  onLoad: function(options) {
    if (options.open) {
      this.setData({
        open: options.open,
      })
    }
    if (options.onPay) {
      this.setData({
        onPay: options.onPay,
      })
    }
  },
  onShow: function() {
    this.getData();
  },
  onPullDownRefresh: function() {
    this.getData();
  },
})