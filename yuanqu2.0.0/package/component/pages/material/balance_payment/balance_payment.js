import NetworkRequest from '../../../../../template/network.js';
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import chooseImgs from '../../../../../template/chooseImgs.js';
import setTime from '../../../../../template/setTime.js';
import previewoffice from '../../../../../template/previewoffice.js';
import canonical from '../../../../../template/canonical.js';
import func from '../../../../../template/func.js';
Page({
  data: {
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    order_id: '',
    list: [],
    final_price: '',
    focus: false,
    value: '',
    checked: 1,
  },
  onLook(e) {
    previewoffice(this.data.list.first_notice)
  },

  onChange(e) {
    canonical(e.detail)
  },

  onChecked(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 2) {
      this.setData({
        focus: true,
        checked: id,
      })
    } else {
      this.setData({
        focus: false,
        checked: id,
      })
    }

  },
  onWxpay(list) {
    var checked = this.data.checked;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    wx.requestPayment({
      timeStamp: list.timeStamp,
      nonceStr: list.nonceStr,
      package: list.package,
      signType: list.signType,
      paySign: list.paysign,
      success: (res => {
        // console.log(res);
        this.notify('支付成功！即将返回订单列表！');
        PrePage.onEnpush();
        setTime().then(res => {
          wx.navigateBack({
            delta: 1,
          })
        });
      }),
      fail: (err => {
        // console.log(err);
        this.notify('支付失败！即将返回订单列表！');
        setTime().then(res => {
          wx.navigateBack({
            delta: 1,
          })
        });
      }),
    })
  },


  onClick() {
    var checked = this.data.checked;
    var value = this.data.value;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    if (value.length < 1 && checked == 2) {
      this.notify('请输入正确的汇款公司名称！');
      this.setData({
        focus: true
      });
      return;
    };
    this.toast('支付中...');
    var money = this.data.list.final_price;
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var order_id = this.data.list.id;
    if (!money) {
      this.notify('订单错误！');
      Toast.clear();
      return;
    };

    NetworkRequest({
      url: '/order/finalPay',
      data: {
        user_id: userid,
        order_id: order_id,
        pay_type: (checked == 1 ? 5 : 4),
        token: token,
        final_company: value,
        openid: wx.getStorageSync('openId')
      },
    }).then(res => {
      var code = res.data.code;
      Toast.clear();
      if (code == 1) {
        if (checked == 2) {
          this.notify(res.data.msg);
          PrePage.onEnpush();
          setTime().then(res => {
            wx.navigateBack({
              delta: 1,
            })
          });
        } else {
          this.onWxpay(res.data.data);
        }
      };
      if (code == 2) {
        this.notify(res.data.msg);
        setTime().then(res => {
          wx.navigateBack({
            delta: 1,
          })
        });
      };
      if (code == 0) {
        this.notify(res.data.msg);
      }
    }).catch(err => {
      Toast.clear();
      
    })
  },

  toast(e) {
    Toast.loading({
      mask: true,
      message: e,
      duration: 0,
      zIndex: 200
    });
  },
  notify(res) {
    Notify({
      text: res,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
      zIndex: 200
    })
  },

  onLoad: function (options) {
    var list = JSON.parse(JSON.stringify(getApp().globalData.paymentArry));
    // console.log(list);
    this.setData({
      list: list,
      final_price: list.final_price.toFixed(2),
    })
  },
  onPullDownRefresh: function () {

  },
})