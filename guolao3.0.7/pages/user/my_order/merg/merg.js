import Toast from '../../../../dist/toast/toast';
import Notify from '../../../../dist/notify/notify';
import NetworkRequest from '../../../../template/network.js';
import wpquest from '../../../../template/wpAsk.js';
import canonical from '../../../../template/canonical.js';
import setTime from '../../../../template/setTime.js';
import previewoffice from '../../../../template/previewoffice.js';
import copyText from '../../../../template/copyText.js';
Page({
  data: {
    entrust: '',
    auth_type: '',
    apply_id: '',
    value: '',
    phone: '',
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    id: [],
    o_id: [],
    ready: false,
  },
  onClick() {
    wx.navigateTo({
      url: '/pages/user/attest/attest?open=' + true + '&type=' + 'merg',
    })
  },
  onChange(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      canonical(e.detail);
    } else {
      this.setData({
        phone: e.detail
      })
    }
  },
  onSubmit() {
    var entrust = this.data.entrust;
    var name = this.data.value;
    var phone = this.data.phone;
    var auth_type = this.data.auth_type;
    var apply_id = this.data.apply_id;
    var id = this.data.id;
    var o_id = this.data.o_id;
    var txt = /^\d{11}$/;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    if (!entrust) {
      this.notify('请选择委托人！');
      return;
    }
    if (!name) {
      this.notify('请填写联系人！');
      return;
    }
    if (!txt.test(phone)) {
      this.notify('请填写正确手机号！');
      return;
    }
    this.toast();
    wpquest({
      url: '/order/orderContract',
      data: {
        user_id: wx.getStorageSync('userid'),
        id: id,
        auth_type: auth_type,
        apply_id: apply_id,
        linkman: name,
        mobile: phone,
        order_id: o_id,
        token: wx.getStorageSync('token'),
        email_address: ''
      },
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        this.notify('合同生成成功，即将为您打开合同！');
        this.data.ready = true;
        var url = res.data.data;
        PrePage.setData({
          arry: [],
          page: 1,
        })
        PrePage.getOrder(PrePage.data.active, PrePage.data.type);
        setTime(2000).then(res => {
          previewoffice(url);
        })
      };
      Toast.clear();
    }).catch(err => {
      Toast.clear();
      
    })
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
  toast() {
    Toast.loading({
      message: '提交中...',
      duration: 0,
    });
  },
  onLoad: function (options) {
    this.data.id = options.id;
    this.data.o_id = options.o_id;
  },
  onShow: function () {
    var ready = this.data.ready;
    if (ready) {
      this.data.ready = false;
      var url = wx.getStorageSync('filePath');
      copyText(url);
      this.notify('文件链接已复制，您可以粘贴发送至微信或使用浏览器进行下载！');
    } else {
      wx.removeStorageSync('filePath');
    };
  },
})