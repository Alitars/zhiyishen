const main_Url = getApp().globalData.main_Url;
import func from '../../../../../template/func.js';
import Notify from '../../../../../dist/notify/notify';
import Toast from '../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../template/network.js';
Page({
  data: {
    active: 0,
    noUsed: [],
    haveUsed: [],
    overDue: [],
    id: 1,
    icon_Url: getApp().globalData.icon_Url,
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    open: false,
  },
  onChange(event) {
    var id = event.detail.index + 1;
    this.setData({
      id: id,
    });
    this.getData(id)
  },
  notify(res) {
    Notify({
      text: res,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44'
    })
  },
  getData() {
    this.toast();
    var user_type = wx.getStorageSync('user_type');
    var id = this.data.id;
    NetworkRequest({
      url: '/usercenter/packet',
      data: {
        type: id,
        s_coupon: wx.getStorageSync('user_type') == 2 ? 2 : 1,
      },
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        for (var i = 0; i < arry.length; i++) {
          arry[i]['start'] = func.date_time(arry[i].start);
          arry[i]['end'] = func.date_time(arry[i].end);
        }
        if (id == 1) {
          this.setData({
            noUsed: arry,
          })
        };
        if (id == 2) {
          this.setData({
            haveUsed: arry,
          })
        };
        if (id == 3) {
          this.setData({
            overDue: arry,
          })
        }
      };
      if (code == 0 || code == 2) {
        this.notify(res.data.msg)
      };
      Toast.clear();
    }).catch(err => {
      Toast.clear();
    })
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },
  onUsing(e) {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var total = e.currentTarget.dataset.total;
    var id = e.currentTarget.dataset.id;
    var bigTotal = e.currentTarget.dataset.total2;
    var pretotal = JSON.parse(PrePage.data.total);
    if (pretotal < bigTotal) {
      this.notify('订单金额满' + bigTotal + '元可使用此优惠券！');
      return;
    };
    if (price > 0) {
      var show = false;
    } else {
      var price = 0;
      var show = true;
    };
    PrePage.setData({
      c_id: id,
      coupon_price: total,
      show: show,
      isUseCoupon: true
    });
    wx.navigateBack({
      delta: 1,
    });
  },
  onClick() {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    PrePage.setData({
      c_id: '',
      coupon_price: '',
      isUseCoupon: false
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  onLoad: function (options) {
    this.getData();
    if (options.open) {
      this.setData({
        open: options.open
      })
    }
  },
})