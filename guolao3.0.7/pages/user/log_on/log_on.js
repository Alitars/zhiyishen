import setTime from '../../../template/setTime.js';
import Notify from '../../../dist/notify/notify';
import icon from '../../../template/template.js';
import Toast from '../../../dist/toast/toast';
import NetworkRequest from '../../../template/network.js';
import animation from '../../../template/animation.js';
// import wx.setStorageSync from '../../../template/wx.setStorageSync.js';
import logoCheck from '../../../template/logon.js';
import selectQuery from '../../../template/selectQuery.js'
const updateManager = wx.getUpdateManager();
import canonical from '../../../template/canonical.js';
import func from '../../../template/func.js';
import route from '../../../template/route.js';
// import voiceArry from '../../../template/template.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show2: false,
    show3: false,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    which_area: '申田经济开发区',
    menu: getApp().globalData.menu,
    active: 0,
    height: getApp().globalData.sysinfo.statusBarHeight * 4,
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

    //微信登录
    wx_num: '',
    wx_smsCode: '',
    wxSure: false
  },
  onClose2() {
    route('pages/user/log_on/register/register')
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
    this.notify('请填写完整数据!');
  },


  onSend(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      func.sendma(this.data.code_num, 5).then(res => {
        this.setData({
          code: res.data.code
        })
        func.countDown(60);
      })
    } else if (id == 2) {
      func.sendma(this.data.logon_num, 1).then(res => {
        this.setData({
          code: res.data.code
        })
        func.countDown(60);
      })
    } else if (id == 3) {
      func.sendma(this.data.wx_num, 1).then(res => {
        this.setData({
          code: res.data.code
        })
        func.countDown(60);
      })
    }
  },

  //所有输入框
  onChange(e) {
    var id = e.currentTarget.id;
    this.setData({
      [id]: e.detail
    })
    if (this.data.account_name.length > 2 && this.data.account_Pass.length > 5) {
      this.setData({
        isSure: true
      })
    } else {
      this.setData({
        isSure: false
      })
    };

    if (this.data.code_num.length == 11 && this.data.code_sms.length == 6) {
      this.setData({
        codeSrue: true
      })
    } else {
      this.setData({
        codeSrue: false
      })
    };
    if (this.data.logon_num.length == 11 && this.data.logon_password > 5 && this.data.logon_repassword > 5 && this.data.logon_smsCode.length > 0 && this.data.short_name.length > 0) {
      this.setData({
        isDone: true
      })
    } else {
      this.setData({
        isDone: false
      })
    }
    if (this.data.wx_num.length == 11 && this.data.wx_smsCode > 5 && this.data.short_name.length > 0) {
      this.setData({
        wxSure: true
      })
    } else {
      this.setData({
        wxSure: false
      })
    }
  },



  onChoose(e) {
    var index = e.currentTarget.dataset.index;
    var text = this.data.searchArry[index].park_name;
    var short_name = this.data.searchArry[index].short_name;
    this.setData({
      value: text,
      searchArry: [],
      short_name: short_name,
    })
    if (text.length == 0) {
      this.setData({
        short_name: ''
      })
    }
    if (this.data.logon_num.length == 11 && this.data.logon_password > 5 && this.data.logon_repassword > 5 && this.data.logon_smsCode.length > 0 && this.data.short_name.length > 0) {
      this.setData({
        isDone: true
      })
    } else {
      this.setData({
        isDone: false
      })
    }
    if (this.data.wx_num.length == 11 && this.data.wx_smsCode > 5 && this.data.short_name.length > 0) {
      this.setData({
        wxSure: true
      })
    } else {
      this.setData({
        wxSure: false
      })
    }
    getApp().globalData.YQNAME = short_name;
    wx.setStorageSync('YQNAME', short_name);
    // wx.setStorageSync('key', data)
  },




  //所有验证码切换
  onClickIcon(e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      [('display' + id)]: !this.data[('display' + id)]
    })
  },




  onSeach(e) {
    canonical(e.detail, this);
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
      this.setData({
        searchArry: [],
      })
    }
  },
  onSlider(e) {
    var win = getApp().globalData.sysinfo.screenWidth;
    var id = e.currentTarget.dataset.id;
    this.setData({
      slider: id,
      active: id,
    });
    animation(id * win / 2);
  },
  onClose(e) {
    wx.navigateTo({
      url: '/pages/user/log_on/register/register',
    })
  },



  onLogon(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      func.getOpenID().then(res => {
        var arry = JSON.parse(res.data.data);
        getApp().globalData.userInfo = arry;
        getApp().globalData.openId = arry.openId;
        wx.setStorageSync('userInfo', arry);
        wx.setStorageSync('openId', arry.openId);
        NetworkRequest({
          url: '/login/quicklogin',
          data: {
            phone: this.data.code_num,
            code: this.data.code_sms,
            type: 5,
            channel: 2,
            invitation_code:this.data.optionMobile,
          },
          method: 'POST',
        }).then(res => {
          this.notify(res.data.msg);
          var code = res.data.code;
          if (code == 1) {
            var arry = res.data.data;
            getApp().globalData.userid = arry.user_id;
            getApp().globalData.token = arry.token;
            wx.setStorageSync('token', arry.token);
            wx.setStorageSync('userid', arry.user_id);
            wx.setStorageSync('phone', this.data.code_num);
            setTime(500).then(s => {
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2];
              prevPage.onShow();
            })
            setTime(1500).then(res => {
              wx.navigateBack({
                delta: 1,
              })
            })
          }
        })
      })
    };

    if (id == 2) {
      func.getOpenID().then(res => {
        var arry = JSON.parse(res.data.data);
        getApp().globalData.userInfo = arry;
        wx.setStorageSync('userInfo', arry);
        wx.setStorageSync('openId', arry.openId);
        var account_name = this.data.account_name;
        var account_Pass = this.data.account_Pass;
        if (account_Pass.length < 6) {
          wx.showToast({
            title: '密码有误',
            icon: 'none',
            duration: 3000,
          })
          return;
        };
        NetworkRequest({
          url: '/login',
          data: {
            phone: account_name,
            password: account_Pass,
            invitation_code:this.data.optionMobile,
          },
          method: 'POST'
        }).then(res => {
          this.notify(res.data.msg);
          var code = res.data.code;
          if (code == 1) {
            var arry = res.data.data;
            getApp().globalData.userid = arry.user_id;
            getApp().globalData.token = arry.token;
            wx.setStorageSync('token', arry.token);
            wx.setStorageSync('userid', arry.user_id);
            wx.setStorageSync('phone', account_name);
            setTime(500).then(c => {
              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2];
              prevPage.onShow();
            })
            setTime(1500).then(res => {
              wx.navigateBack({
                delta: 1,
              })
            })
          };
        })
      })
    };


  },


  onClick(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      var url = '/pages/user/log_on/register/register?mobile='+this.data.optionMobile
    } else {
      var url = '/pages/user/log_on/forget/forget'
    }
    wx.navigateTo({
      url: url,
    })
  },


  onGetInfo() {
    func.getOpenID('wx').then(res => {
      var arry = JSON.parse(res.data.data);
      getApp().globalData.userInfo = arry;
      wx.setStorageSync('userInfo', arry);
      wx.setStorageSync('openId', arry.openId);
      NetworkRequest({
        url: '/changeopenid',
        data: {
          avatarUrl: arry.avatarUrl,
          city: arry.city,
          country: arry.country,
          gender: arry.gender,
          language: arry.language,
          nickName: arry.nickName,
          openId: arry.openId,
          province: arry.province,
          unionid: arry.unionId,
          invitation_code:this.data.optionMobile,
        },
        method: 'POST'
      }).then(res => {
        this.notify(res.data.msg);
        var code = res.data.code;
        if (code == 0) {
          setTime().then(res => {
            wx.navigateTo({
              url: '/pages/user/log_on/apple_id/apple_id?mobile='+this.data.optionMobile,
            })
          })
        };
        if (code == 1) {
          var arry = res.data.data;
          getApp().globalData.userid = arry.id;
          getApp().globalData.token = arry.apptoken;
          wx.setStorageSync('token', arry.apptoken);
          wx.setStorageSync('userid', arry.id);
          wx.setStorageSync('phone', arry.mobile);
          setTime(500).then(c => {
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];
            prevPage.onShow();
          })
          setTime(1500).then(res => {
            wx.navigateBack({
              delta: 1,
            })
          })
        };
      })
    })
  },

  onReader(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      var url = '/package/component1/pages/index/agreement/agreement'
    } else {
      var url = '/package/component1/pages/index/clause/clause'
    }
    wx.navigateTo({
      url: url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id ? true : false) {
      var win = getApp().globalData.sysinfo.screenWidth;
      var id = options.id;
      this.setData({
        slider: id,
        active: id,
      });
      animation(id * win / 2);
    }
    if(options.mobile){
      this.setData({
        optionMobile:options.mobile
      })
    }else{
      this.setData({
        optionMobile:'',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.setStorageSync('voiceArry', voiceArry.voiceArry);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})