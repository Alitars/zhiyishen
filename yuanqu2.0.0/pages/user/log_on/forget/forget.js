import Notify from '../../../../dist/notify/notify';
const main_Url = getApp().globalData.main_Url;
import icon from '../../../../template/template.js';
import NetworkRequest from '../../../../template/GardenNetwork';
import setTime from '../../../../template/setTime.js';
import onToken from '../../../../template/onToken.js';
Page({
  data: {
    show: 'password',
    code: '',
    phoneNumber: '',
    time: 60,
    show: false,
    display: false,
    password: '',
    re_pass: '',
    check: false,
    icon: icon.icon,
    exhibit: '',
    hide: '',
  },
  onRepass(e) {
    this.setData({
      re_pass: e.detail,
    });
  },
  onPass(e) {
    this.setData({
      password: e.detail,
    });
  },
  onClickIcon(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      this.setData({
        exhibit: !this.data.exhibit,
      });
    };
    if (id == 2) {
      this.setData({
        hide: !this.data.hide,
      });
    };
  },
  onPhone(e) {
    this.setData({
      phoneNumber: e.detail,
    });
    var tel = this.data.phoneNumber;
    var txt = /^\d{11}$/;
    if (!txt.test(tel) && e.detail.length == 11) {
      this.notifyErro("请输入正确手机号");
    };
  },
  countDown() {
    var timer = setInterval(() => {
      var time = this.data.time;
      if (time > 1) {
        this.setData({
          time: time - 1,
        })
      } else {
        clearInterval(timer);
        this.setData({
          time: 60,
          code: '',
          check: false,
        });
      };
    }, 1000);
  },
  onYzm(e) {
    this.setData({
      code: e.detail,
    })
    var id = e.detail;
    if (id.length == 6) {
      this.setData({
        display: true,
      });
    } else {
      this.setData({
        display: false,
      });
    };
  },
  getMa() {
    var phone = this.data.phoneNumber;
    var code = this.data.code;
    NetworkRequest({
      url: '/login/checkcodes',
      data: {
        phone: phone,
        code: code,
      },
      method: 'POST',
    }).then(res => { }).catch(err => { })
  },
  getVerification() {
    var phone = this.data.phoneNumber;
    NetworkRequest({
      url: '/register/sendcode',
      data: {
        phone: phone,
        type: 2,
      },
    }).then(res => {
      var code = res.data.code;
      this.setData({
        type: code,
      });
      if (code == 1) {
        this.notify('验证码' + res.data.msg);
        this.countDown();
      };
      if (code == 0) {
        this.notifyMa('验证码' + res.data.msg);
      };
    }).catch(err => { })
  },
  onSend() {
    this.setData({
      check: true,
    });
    var tel = this.data.phoneNumber;
    var checked = this.data.checked;
    var txt = /^\d{11}$/;
    if (txt.test(tel)) {
      this.getVerification();
    } else {
      this.notify("请输入正确手机号");
    };
  },
  xiaoyan() {
    var phone = this.data.phoneNumber;
    var code = this.data.code;
    NetworkRequest({
      url: '/login/checkcodes',
      data: {
        phone: phone,
        code: code,
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        this.setData({
          show: true,
        })
      };
      if (code == 0) {
        this.notify(res.data.msg);
        this.setData({
          show: false,
        })
      };
    }).catch(err => { })
  },
  notify(res) {
    Notify({
      text: res,
      duration: 1000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },
  notifyErro() {
    Notify({
      text: '请输入正确手机号!',
      duration: 1000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },
  notifyok(res) {
    Notify({
      text: res,
      duration: 1000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },
  getPassword() {
    var phone = this.data.phoneNumber;
    var password = this.data.password;
    var re_pass = this.data.re_pass;
    NetworkRequest({
      url: '/login/changepass',
      data: {
        phone: phone,
        password: password,
        re_pass: re_pass,
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        this.notifyok(res.data.msg + '，请重新登陆');
        onToken();
        setTime(1000).then(res => {
          wx.navigateBack({
            delta: 2,
          })
        })
      };
      if (code == 0) {
        this.notifyok(res.data.msg);
      };
    }).catch(err => { })
  },
  onLoad: function (options) {
    if (options.tab) {
      wx.setNavigationBarTitle({
        title: '修改密码',
      })
    }
  },
})