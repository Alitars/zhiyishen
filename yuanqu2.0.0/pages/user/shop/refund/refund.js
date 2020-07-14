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
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
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
      url: "/order/refundApply",
      data: {
        order_id: order_id,
        refund_type: refund_type,
        refund_account: refund_account,
        refund_explain: refund_explain,
        user_id: userid,
        token: token,
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
      this.notify('提交失败！');
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

  onLoad: function(options) {
    this.data.order_id = options.order_id;
    this.setData({
      title: options.refund_type
    })
  },
})