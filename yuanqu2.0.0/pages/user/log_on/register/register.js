import setTime from '../../../../template/setTime.js';
import Notify from '../../../../dist/notify/notify';
import icon from '../../../../template/template.js';
import Toast from '../../../../dist/toast/toast';
import NetworkRequest from '../../../../template/GardenNetwork.js';
import animation from '../../../../template/animation.js';
import logoCheck from '../../../../template/logon.js';
import selectQuery from '../../../../template/selectQuery.js'
const updateManager = wx.getUpdateManager();
import canonical from '../../../../template/canonical.js';
import func from '../../../../template/func.js';
import route from '../../../../template/route.js';
Page({
  data: {
    height: getApp().globalData.sysinfo.screenHeight,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    show: true,
    which_area: '申田经济开发区',
    menu: getApp().globalData.menu,
    active: 0,
    id: '',
    show: 'password',
    icon: icon.icon,
    time: 60,
    close: false,
    password: getApp().globalData.password,
    openEye: false,
    animationData: '',
    slider: 0,
    value: '',
    searchArry: [],
    code: 0,
    //短信登录
    code_num: '',
    code_sms: '',
    codeSrue: false,
    //账号密码
    account_name: '',
    account_Pass: '',
    isSure: false,
    //注册
    logon_num: "",
    isDone: false,
    logon_password: '',
    logon_repassword: '',
    logon_smsCode: '',
    display1: false,
    display2: false,
    display3: false,
    display4: false,
    display5: false,
    short_name: '',
    text: "",
    //微信登录
    wx_num: '',
    wx_smsCode: '',
    wxSure: false
  },

  onInput(e) {
    canonical(e.detail.value);
    var value = this.data.value;
    if (value.length > 0) {
      NetworkRequest({
        url: "/searchParkName",
        data: {
          keyword: value
        },
      }).then(res => {
        this.setData({
          searchArry: res.data.data
        })
      }).catch(err => {})
    } else {
      getApp().globalData.YQNAME = '';
      this.setData({
        searchArry: [],
        text: '',
        short_name: '',
      })
    }
  },
  onClick() {
    var show = this.data.show;
    if (show) {
      if (this.data.text.length > 0 && this.data.short_name.length > 0) {
        this.setData({
          show: !this.data.show
        })
      } else {
        this.notify('请先搜索并选择您所在的园区')
      }
    } else {
      //注册
      var logon_num = this.data.logon_num;
      var logon_password = this.data.logon_password;
      var logon_repassword = this.data.logon_repassword;
      var logon_smsCode = this.data.logon_smsCode;
      var short_name = this.data.short_name;
      var txt = /^\d{11}$/;
      if (logon_num.length < 11 || !txt.test(logon_num)) {
        this.notify('手机号错误');
        return;
      } else if (short_name.length == 0) {
        this.notify('请输入并选择园区名');
        return;
      } else if (logon_password.length == 0 || logon_repassword.length == 0) {
        this.notify('请设置正确密码');
        return;
      } else if (logon_password !== logon_repassword) {
        this.notify('两次输入密码不相等');
        return;
      } else if (logon_smsCode.length == 0 || logon_smsCode.length < 6) {
        this.notify('验证码错误');
        return;
      };
      func.getOpenID().then(res => {
        var arry = JSON.parse(res.data.data);
        getApp().globalData.userInfo = arry;
        wx.setStorageSync('userInfo', arry);
        wx.setStorageSync('openId', arry.openId);
        NetworkRequest({
          url: '/register',
          data: {
            phone: logon_num,
            code: logon_smsCode,
            password: logon_password,
            re_pass: logon_repassword,
            text: short_name,
            type: 7,
            channel: 2,
          },
          method: 'POST',
        }).then(res => {
          // console.log(res);
          this.notify(res.data.msg);
          var code = res.data.code;
          if (code == 1) {
            var arry = res.data.data;
            this.notify(res.data.msg);
            getApp().globalData.userid = arry.user_id;
            getApp().globalData.token = arry.token;
            getApp().globalData.ISAGENT = 3;
            getApp().globalData.YQNAME = arry.text;
            wx.setStorageSync('token', arry.token);
            wx.setStorageSync('userid', arry.user_id);
            wx.setStorageSync('YQNAME', arry.text);
            wx.setStorageSync('ISAGENT', 3);
            setTime(1500).then(res => {
              wx.navigateBack({
                delta: 2,
              })
            })
          };
        })
      })
    }

  },
  onChoose(e) {
    var id = e.currentTarget.dataset.id;
    var text = this.data.searchArry[id].park_name;
    var short_name = this.data.searchArry[id].short_name;
    getApp().globalData.YQNAME = short_name;
    this.setData({
      text: text,
      short_name: short_name,
      value: text,
    })
  },

  onClickIcon(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    this.setData({
      [('display' + id)]: !this.data[('display' + id)]
    })
  },

  onChange(e) {
    var id = e.currentTarget.id;
    this.setData({
      [id]: e.detail
    })
  },


  onSend(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      func.sendma(this.data.code_num, 5, this).then(res => {
        this.setData({
          code: res.data.code
        })
        func.countDown(60, this);
      })
    } else if (id == 2) {
      func.sendma(this.data.logon_num, 1, this).then(res => {
        this.setData({
          code: res.data.code
        })
        func.countDown(60, this);
      })
    } else if (id == 3) {
      func.sendma(this.data.wx_num, 1, this).then(res => {
        this.setData({
          code: res.data.code
        })
        func.countDown(60, this);
      })
    }
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


  onCheck() {
    this.notify('请填写完整数据阅读并同意服务条款')
  },

  onyinsi() {
    wx.navigateTo({
      url: '/package/component/pages/index/clause/clause',
    })
  },
  onxieyi() {
    wx.navigateTo({
      url: '/package/component/pages/index/agreement/agreement',
    })
  },
  onBack() {
    wx.navigateBack({
      delta: 1,
    })
  },




  onLoad: function(options) {

  },
})