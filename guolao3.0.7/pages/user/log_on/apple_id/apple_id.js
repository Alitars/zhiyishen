import Notify from '../../../../dist/notify/notify';
import icon from '../../../../template/template.js';
const main_Url = getApp().globalData.main_Url;
import Toast from '../../../../dist/toast/toast';
import NetworkRequest from '../../../../template/network.js';
import setTime from '../../../../template/setTime.js';
Page({

  data: {
    active: 0,
    SafeButtom: '',
    id: '',
    show: 'password',
    icon: 'closed-eye',
    phoneNumber: '',
    number: '',
    code: '',
    time: 60,
    close: false,
    password: '',
    openEye: false,
  },
  tiaokuan() {
    wx.navigateTo({
      url: '/package/component1/pages/index/clause/clause',
    })
  },
  onxieyi() {
    wx.navigateTo({
      url: '/package/component1/pages/index/agreement/agreement',
    })
  },

  countDown() {
    var that = this;
    var ss = setInterval(function () {
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
  tiaokuan() {
    wx.navigateTo({
      url: '/package/component1/pages/index/clause/clause',
    })
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

  getVerification() {
    NetworkRequest({
      url: '/register/sendcode',
      data: {
        phone: this.data.phoneNumber,
        type: 5
      },
    }).then(res => {
      var code = res.data.code;
      this.setData({
        type: code,
        code: code,
      });
      if (code == 1) {
        this.notifyMa(res.data.msg);
        this.countDown();
      };
      if (code == 0) {
        this.notifyMa(res.data.msg);
      };
    }).catch(err => { })
  },

  onLog() {
    var tel = this.data.phoneNumber;
    var info = getApp().globalData.userInfo;
    var ss = this.data.number;
    NetworkRequest({
      url: '/routinelogin',
      data: {
        mobile: tel,
        nickName: info.nickName,
        openId: info.openId,
        code: ss,
        avatarUrl: info.avatarUrl,
        invitation_code:this.data.optionMobile
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      // this.notifySuccessful(res.data.msg);
      Notify({
        text: res.data.msg,
        duration: 3000,
        selector: '#custom-selector',
        backgroundColor: '#f44',
        color: '#fff',
      });
      if (code == 1) {
        getApp().globalData.userid = res.data.data.id;
        getApp().globalData.token = res.data.data.apptoken;
        wx.setStorageSync('token', res.data.data.apptoken);
        wx.setStorageSync('userid', res.data.data.id);
        wx.setStorageSync('phone', res.data.data.mobile);
        var pages = getCurrentPages();
        var PrePage = pages[pages.length - 3];
        PrePage.onShow();
        setTime().then(res => {
          wx.navigateBack({
            delta: 2,
          })
        })
      }
    })
  },
  onPhone(e) {
    this.setData({
      phoneNumber: e.detail,
    });
  },
  onYzm(e) {
    this.setData({
      number: e.detail,
    });
  },
  onChange(event) {
    var id = event.detail.index;
  },
  onLogin(e) {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res => {
              getApp().globalData.userInfo = res.userInfo;
              var info = res.userInfo;
            }),
          });
        };
      },
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
  notifyMa(res) {
    Notify({
      text:  res + '！',
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
  onZuce() {
    wx.navigateTo({
      url: '/pages/user/log_on/register/register',
    })
  },
  onNav() {
    wx.navigateTo({
      url: '/pages/user/log_on/forget/forget',
    })
  },

  getLogin() {
    var phone = this.data.phoneNumber;
    var password = this.data.password;
    NetworkRequest({
      url: '/login',
      data: {
        phone: phone,
        password: password,
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        this.notify(res.data.msg);
        getApp().globalData.userid = res.data.data.others;
        getApp().globalData.token = res.data.data.token;
        wx.setStorageSync('token', res.data.data.token);
        wx.setStorageSync('userid', res.data.data.user_id);
        wx.setStorageSync('phone', phone);
        setTime().then(res => {
          wx.navigateBack({
            delta: 2,
          })
        });
      };
      if (code == 0) {
        this.notify(res.data.msg);
      };
    }).catch(err => { })
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
  onLoad:function(options){
    if(options.mobile){
      this.setData({
        optionMobile:options.mobile
      })
    }else{
      this.setData({
        optionMobile:'',
      })
    }
  }
})