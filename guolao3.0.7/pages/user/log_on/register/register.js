import Notify from '../../../../dist/notify/notify';
const main_Url = getApp().globalData.main_Url;
import Toast from '../../../../dist/toast/toast';
import NetworkRequest from '../../../../template/network.js';
import icon from '../../../../template/template.js';
import setTime from '../../../../template/setTime.js';
Page({
  data: {
    checked: false,
    phoneNumber: '',
    password: '',
    rePassword: '',
    ma: '',
    time: 60,
    id: '',
    done: false,
    icon: icon.icon,
    display: '',
    show: '',
    //邀请码
    Invitation_code: '',
  },
  onClears() {
    this.setData({
      Invitation_code: ''
    })
  },
  onInvitation(e) {
    this.setData({
      Invitation_code: e.detail.replace(/\s+/g, ""),
    });
  },
  onCheck() {
    this.notify('请填写完整数据！阅读并同意服务条款！')
  },
  onyinsi() {
    wx.navigateTo({
      url: '/package/component1/pages/index/clause/clause',
    })
  },
  onxieyi() {
    wx.navigateTo({
      url: '/package/component1/pages/index/agreement/agreement',
    })
  },
  onClickIcon(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      this.setData({
        display: !this.data.display,
      });
    };
    if (id == 2) {
      this.setData({
        show: !this.data.show,
      });
    };
  },
  onChange(event) {
    this.setData({
      checked: event.detail
    });
    this.onDone();
  },
  onPhone(e) {
    this.setData({
      phoneNumber: e.detail,
    });
    if (e.detail.length == 11) {
      this.onSure();
    };
    this.onDone();
  },
  onPassword(e) {
    this.setData({
      password: e.detail,
    });
    this.onDone();
  },
  onMa(e) {
    this.setData({
      ma: e.detail,
    });
    this.onDone();
  },
  rePassword(e) {
    this.setData({
      rePassword: e.detail,
    });
    this.onDone();
  },
  onSure() {
    var tel = this.data.phoneNumber;
    var txt = /^\d{11}$/;
    if (txt.test(tel)) {

    } else {
      this.notify("请输入正确手机号！");
    };
  },
  notify(res) {
    Notify({
      text: res,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
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
          id: '',
        });
      };
    }, 1000);
  },
  onYzm(e) {
    this.setData({
      ma: e.detail,
    });
  },
  onSend() {
    var phoneNumber = this.data.phoneNumber;
    var password = this.data.password;
    var rePassword = this.data.rePassword;
    var ma = this.data.ma;
    var tel = this.data.phoneNumber;
    var txt = /^\d{11}$/;
    if (!txt.test(tel)) {
      this.notify("请输入正确手机号！");
      return;
    };
    if (password == 0) {
      this.notify("请设置登录密码！");
      return;
    };
    if (rePassword == 0) {
      this.notify("请再次输入密码！");
      return;
    };
    if (password !== rePassword) {
      this.notify("2次密码输入不相等！");
      return;
    };
    if (password.length < 5 || rePassword.length < 5) {
      this.notify("密码过于简单！");
      return;
    } else {
      this.getVerification();
      this.countDown();
      this.setData({
        id: '1',
      });
    };
  },

  getVerification() {
    NetworkRequest({
      url: '/register/sendcode',
      data: {
        phone: this.data.phoneNumber,
        type: 1,
      },
    }).then(res => {
      this.notify(res.data.msg);
    }).catch(err => {

    })
  },
  onLogon() {
    var phone = this.data.phoneNumber;
    var code = this.data.ma;
    var password = this.data.password;
    var re_pass = this.data.re_pass;
    var phoneNumber = this.data.phoneNumber;
    var password = this.data.password;
    var rePassword = this.data.rePassword;
    var ma = this.data.ma;
    var tel = this.data.phoneNumber;
    var checked = this.data.checked;
    var txt = /^\d{11}$/;
    if (!txt.test(tel)) {
      this.notify("请输入正确手机号！");
      return;
    };
    if (password == 0) {
      this.notify("请设置登录密码！");
      return;
    };
    if (rePassword == 0) {
      this.notify("请再次输入密码！");
      return;
    };
    if (password !== rePassword) {
      this.notify("2次密码输入不相等！");
      return;
    };
    if (password.length < 5 || rePassword.length < 5) {
      this.notify("密码过于简单！");
      return;
    };
    if (checked == false) {
      this.notify("请阅读并同意《用户服务协议》和《隐私条款》");
      return;
    } else {
      NetworkRequest({
        url: '/register',
        data: {
          phone: phone,
          code: code,
          password: password,
          re_pass: rePassword,
          invitation_code: this.data.Invitation_code,
          type: 7,
          channel: 2,
        },
        method: 'POST',
      }).then(res => {
        var code = res.data.code;
        if (code == 0) {
          this.notify(res.data.msg);
        };
        if (code == 1) {
          this.notify('注册成功！请重新登录！');
          getApp().globalData.userid = res.data.others;
          getApp().globalData.token = res.data.token;
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('userid', res.data.userid);
          wx.setStorageSync('phone', phoneNumber);
          setTime(1000).then(res => {
            wx.navigateBack({
              delta: 1,
            })
          })
        };
      }).catch(err => {

      })
    };
  },
  onDone() {
    var ph = this.data.phoneNumber;
    var pa = this.data.password;
    var re = this.data.rePassword;
    var ma = this.data.ma;
    var ch = this.data.checked;
    if (ph.length == 11 && pa.length > 5 && re.length > 5 && ma.length > 4 && ch == true) {
      this.setData({
        done: true,
      });
    } else {
      this.setData({
        done: false,
      });
    };
  },
  onLoad: function (options) {
    if(options.mobile){
      this.setData({
        optionMobile:options.mobile,
        Invitation_code:options.mobile,
        icon: icon.icon
      })
    }else{
      this.setData({
        optionMobile:'',
        icon: icon.icon,
        Invitation_code:''
      })
    }
  },
})