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
    // show: 'password',
    // time: 60,
    // code: '',
    // phoneNumber: '',
    // number: '',
    // close: false,



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
    text:'',
    short_name: '',

    height: getApp().globalData.sysinfo.screenHeight,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
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
  // mobile: tel,
  // nickName: info.nickName,
  // openId: info.openId,
  // code: ss,
  // avatarUrl: info.avatarUrl,
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
      var logon_smsCode = this.data.logon_smsCode;
      var short_name = this.data.short_name;
      if (short_name.length == 0) {
        this.notify('请输入并选择园区名');
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
          url: '/routinelogin',
          data: {
            mobile: logon_num,
            nickName: arry.nickName,
            openId: arry.openId,
            code: logon_smsCode,
            avatarUrl: arry.avatarUrl,
          },
          method: 'POST',
        }).then(res => {
          console.log(res);
          this.notify(res.data.msg);
          var code = res.data.code;
          if (code == 1) {
            var arry = res.data.data;
            this.notify(res.data.msg);
            getApp().globalData.userid = arry.id;
            getApp().globalData.token = arry.apptoken;
            getApp().globalData.ISAGENT = arry.isagent;
            getApp().globalData.YQNAME = arry.text;
            wx.setStorageSync('token', arry.apptoken);
            wx.setStorageSync('userid', arry.id);
            wx.setStorageSync('YQNAME', arry.text);
            wx.setStorageSync('ISAGENT', arry.isagent);
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
      func.sendma(this.data.logon_num, 5, this).then(res => {
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


  onBack() {
    wx.navigateBack({
      delta: 1,
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
})