const main_Url = getApp().globalData.main_Url;
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
const userid = wx.getStorageSync('userid');
const token = wx.getStorageSync('token');
import setTime from '../../../../../template/setTime.js';
Page({
  data: {
    id: '',
    name: ['修改昵称', "修改手机号", "绑定邮箱", "修改密码"],
    value: '',
    display: '',
    code: '',
    phoneNumber: '',
    number: '',
    time: 60,
    show: false
  },
  onCheck() {},
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
  notifyErro() {
    Notify({
      text: '请输入正确手机号!',
      duration: 2000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
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
  notifyMa(res) {
    Notify({
      text: '短信验证码' + res + '',
      duration: 2000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },
  onCheck() {
    var phoneNumber = this.data.phoneNumber;
    var number = this.data.number;
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/usercenter/changephone',
      data: {
        phone: phoneNumber,
        type: 3,
        user_id: userid,
        code: number,
        token: token
      },
      method: "POST"
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        this.setData({
          show: !this.data.show
        })
        this.notify(res.data.msg);
        setTime().then(res => {
          wx.navigateBack({
            delta: 1,
          })
        })
      } else {
        this.notify(res.data.msg)
      }
    }).catch(err => {
      this.notify('请求失败')
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
  onClose() {
    this.setData({
      show: !this.data.show
    })
  },
  getVerification() {
    NetworkRequest({
      url: '/register/sendcode',
      data: {
        phone: this.data.phoneNumber,
        type: 3,
      },
    }).then(res => {
      var code = res.data.code;
      this.notifyMa(res.data.msg);
      if (code == 1) {
        this.countDown();
        this.setData({
          code: code
        })
      }
    }).catch(err => {})
  },
  onChange(e) {
    this.setData({
      value: e.detail
    });
  },
  onSave() {
    var value = this.data.value;
    if (value.length < 1) {
      this.notify("请至少输入1个字符");
      return;
    }
    this.toast();
    NetworkRequest({
      url: '/usercenter/changenickname',
      data: {
        user_id: userid,
        nickname: value,
      },
      method: 'POST',
    }).then(res => {
      Toast.clear();
      var code = res.data.code;
      if (code == 1) {
        this.notify("修改成功");
        setTime().then(res => {
          wx.navigateBack();
        })
      } else {
        this.notify(res.data.msg);
      };
    }).catch(err => {
      Toast.clear();
    })
  },
  toast() {
    Toast.loading({
      message: '提交中...',
      duration: 0,
    });
  },
  notify(res) {
    Notify({
      text: res,
      duration: 1500,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },
  onEmai() {
    var value = this.data.value;
    var emailReg = /^\d{11}$/;
    if (!emailReg.test(value)) {
      this.notify("请输入正确邮箱");
    } else {
      NetworkRequest({
        url: '/usercenter/sendemailaddress',
        data: {
          user_id: userid,
          email: value,
          token: token,
        },
        method: 'POST',
      }).then(res => {
        var code = res.data.code;
        if (code == 1) {
          Notify({
            text: '提交成功!链接已发送至邮箱,请到邮箱点击链接进行绑定!',
            duration: 3000,
            selector: '#custom-selector',
            backgroundColor: '#f44',
            color: '#fff',
          });
          this.setData({
            display: !this.data.display,
          });
          setTime(3000).then(res => {
            wx.navigateBack({
              delta: 1,
            })
          })
        } else {
          this.notify(res.data.msg);
        };
      }).catch(err => {
        this.notify('请求失败');
      })
    };
  },
  onLoad: function(options) {
    var id = options.id;
    this.setData({
      id: id
    });
    wx.setNavigationBarTitle({
      title: this.data.name[id - 1],
    });
  },
})