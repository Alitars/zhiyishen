import Notify from '../../../../dist/notify/notify';
const main_Url = getApp().globalData.main_Url;
import NetworkRequest from '../../../../template/network.js';
import setTime from '../../../../template/setTime.js';
Page({
  data: {
    show: 'password',
    time: 60,
    code: '',
    phoneNumber: '',
    number: '',
    close: false,
  },
  countDown() {
    var that = this;
    var ss = setInterval(function() {
      var time = that.data.time;
      if (time > 1) {
        that.setData({
          time: time - 1,
        })
      } else {
        clearInterval(ss);
        that.setData({
          time: 60,
          code: '',
        });
      };
    }, 1000);
  },
  onSend() {
    var code = this.data.code;
    var tel = this.data.phoneNumber
    var txt = /^\d{11}$/;
    if (txt.test(tel)) {
      this.getVerification();
    } else {
      this.notifyErro();
    }
  },
  notifyErro() {
    Notify({
      text: '请输入正确手机号',
      duration: 1000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },
  onClickIcon(e) {
    var id = this.data.id;
    if (id == '') {
      this.setData({
        id: 1,
        show: 'text',
        icon: icon.icon,
        openEye: true,
      });
    } else {
      this.setData({
        id: '',
        show: 'password',
        icon: 'closed-eye',
        openEye: true,
      });
    };
  },
  getVerification() {
    var phone = this.data.phoneNumber;
    NetworkRequest({
      url: '/register/sendcode',
      data: {
        phone: phone,
        type: 5,
      },
    }).then(res => {
      var code = res.data.code;
      this.setData({
        type: code,
        code: code,
      });
      if (code == 1) {
        this.notifyMa( res.data.msg);
        this.countDown();
      };
      if (code == 0) {
        this.notifyMa(res.data.msg);
      };
    }).catch(err => {})
  },
  onPhone(e) {
    this.setData({
      phoneNumber: e.detail,
    });
  },
  notifyMa(res) {
    Notify({
      text:  res + '！',
      duration: 1000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },
  onLog() {
    var number = this.data.number;
    var phoneNumber = this.data.phoneNumber;
    var tel = phoneNumber;
    var txt = /^\d{11}$/;
    if (txt.test(tel)) {
      NetworkRequest({
        url: '/login/quicklogin',
        data: {
          phone: phoneNumber,
          code: number,
          type: 5,
          channel: 2,
        },
        method: 'POST',
      }).then(res => {
        var code = res.data.code;
        if (code == 1) {
          getApp().globalData.userid = res.data.data.others;
          getApp().globalData.token = res.data.data.token;
          wx.setStorageSync('token', res.data.data.token);
          wx.setStorageSync('userid', res.data.data.user_id);
          wx.setStorageSync('phone', phoneNumber);
          setTime(1000).then(res => {
            wx.reLaunch({
              url: '/pages/user/user',
            });
          });
        };
      }).catch(err => {})
    } else {
      // this.notifyErro()
    }
  },
  notifySuccessful(res) {
    Notify({
      text: res,
      duration: 1000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },
  onYzm(e) {
    this.setData({
      number: e.detail,
    });
  },
})