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
    user_id: 0,
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
    code_num: '',
    code_sms: '',
    codeSrue: false,
    text: '',
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
  onClick() {
    var show = this.data.show;
    wx.setStorageSync('userid', this.data.user_id);
    wx.setStorageSync('token', 'arry.apptoken');
    getApp().globalData.userid = this.data.user_id;
    getApp().globalData.token = 'arry.apptoken';
    var short_name = this.data.short_name;
    if (short_name.length == 0) {
      this.notify('请输入并选择园区名');
      return
    };
    if (this.data.text.length > 0 && this.data.short_name.length > 0) {
      func.getOpenID().then(event => {
        var arry = JSON.parse(event.data.data);
        getApp().globalData.userInfo = arry;
        wx.setStorageSync('userInfo', arry);
        wx.setStorageSync('openId', arry.openId);
        NetworkRequest({
          url: '/login/bindParkName',
          data: {
            user_id: this.data.user_id,
            yqtype: this.data.uid,
          },
          method: 'POST',
        }).then(res => {
          console.log(res);
          this.notify(res.data.msg);
          var code = res.data.code;
          if (code == 1) {
            var arry = res.data.data;
            this.notify(res.data.msg);
            getApp().globalData.userid = arry.user_id;
            getApp().globalData.token = arry.token;
            getApp().globalData.ISAGENT = arry.isagent;
            getApp().globalData.YQNAME = arry.text;
            wx.setStorageSync('phone', arry.phone);
            wx.setStorageSync('token', arry.token);
            wx.setStorageSync('userid', arry.user_id);
            wx.setStorageSync('YQNAME', arry.text);
            wx.setStorageSync('ISAGENT', arry.isagent);
            var pages = getCurrentPages();
            var _this = pages[pages.length - 3];
            setTime(500).then(() => {
              _this.onShow()
            });
            setTime(1500).then(() => {
              wx.navigateBack({
                delta: 2,
              })
            })
          }
        })
      })
    } else {
      this.notify('请先搜索并选择您所在的园区')
    }
  },
  onChoose(e) {
    var id = e.currentTarget.dataset.id;
    var uid = this.data.searchArry[id].id;
    var text = this.data.searchArry[id].park_name;
    var short_name = this.data.searchArry[id].short_name;
    getApp().globalData.YQNAME = short_name;
    this.setData({
      text: text,
      short_name: short_name,
      value: text,
      uid: uid,
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
        });
        func.countDown(60, this)
      })
    } else if (id == 2) {
      func.sendma(this.data.logon_num, 5, this).then(res => {
        this.setData({
          code: res.data.code
        });
        func.countDown(60, this)
      })
    } else if (id == 3) {
      func.sendma(this.data.wx_num, 1, this).then(res => {
        this.setData({
          code: res.data.code
        });
        func.countDown(60, this)
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
  onLoad: function () {
    var pages = getCurrentPages();
    var _this = pages[pages.length - 2];
    console.log(_this.data.user_id, 'asdadadada');
    this.setData({
      user_id: _this.data.user_id
    })
  },
})