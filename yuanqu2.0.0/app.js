const isCesi = false;
const main_Url = isCesi ? "http://51guolao.yiqibnb.com/app" : "https://admin.iguolao.com/app";
const yq_Url = isCesi ? "http://admin.zhishengai.com/app" : "https://admin.zhishengai.com/app";
const icon_Url = isCesi ? "http://51guolao.yiqibnb.com" : "https://admin.iguolao.com";
const wp_Url = isCesi ? "https://wp-test.iguolao.com/app" : "https://wp.iguolao.com/app";
const dm_Url = isCesi ? "https://wp-test.iguolao.com" : "https://wp.iguolao.com";
const admin_Url = 'https://admin.iguolao.com/app';
const vioce_Url = "https://wp.iguolao.com/app";
const guo_url = "https://wp.iguolao.com";
import arry from './template/template.js';

// wx  https://developers.weixin.qq.com/miniprogram/dev/extended/service/translator.html //
const plugin = requirePlugin("WechatSI");
const manager = plugin.getRecordRecognitionManager();
//全局音频管理
const innerAudioContext = wx.createInnerAudioContext();
//录音管理
const recorderManager = wx.getRecorderManager();
App({
  onLaunch: function () {
    wx.onNetworkStatusChange(function (res) {
      if (res.isConnected == false) {
        wx.showToast({
          title: '网络似乎已断开，请检查网络后重试哦~',
          icon: 'none',
          duration: 5000000,
        })
      } else {
        wx.hideToast()
      }
    });
    this.globalData.menuInfo = wx.getMenuButtonBoundingClientRect();
    this.globalData.menu = this.globalData.menuInfo;
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var YQNAME = wx.getStorageSync('YQNAME');
    var ISAGENT = wx.getStorageSync('ISAGENT');
    this.globalData.userid = userid;
    this.globalData.token = token;
    this.globalData.ISAGENT = ISAGENT;
    this.globalData.YQNAME = YQNAME;
    wx.getSystemInfo({
      success: (res => {
        if (res.system.indexOf('iOS') > -1) {
          this.globalData.isIos = true
        } else {
          this.globalData.isIos = false
        };
        this.globalData.sysinfo = res;
        this.globalData.systemInfo = res;
      })
    })
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {})
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        showCancel: false,
        content: '新版本已经准备好，点击确定重启更新~',
        confirmColor: "#2fa5fc",
        success: (res => {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        })
      })
    })
    updateManager.onUpdateFailed(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false,
        confirmColor: "#2fa5fc",
      })
    })
    wx.setStorageSync('indexArry', arry.indexArry);
    var voiceArry = wx.getStorageSync('voiceArry');
    if (voiceArry.length == 0 || voiceArry == undefined || voiceArry == null || !voiceArry) {
      wx.setStorageSync('vioceArry', arry.voiceArry);
    };
    wx.setBackgroundTextStyle({
      textStyle: 'dark'
    });
    wx.setBackgroundColor({
      backgroundColor: '#f4f4f4',
    });
    wx.setKeepScreenOn({
      keepScreenOn: true
    });
    // 打开调试
    // wx.setEnableDebug({
    //   enableDebug: false,
    // });
  },
  //监控脚本错误
  // onError: function (err) {
  //   setTimeout(function () {
  //     wx.showToast({
  //       title: '这是个错误：' + err.slice(0, 200),
  //       icon: 'none',
  //       duration: 10000,
  //       mask: true
  //     })
  //   }, 2000)
  // },
  globalData: {
    userInfo: null,
    openId: null,
    menuInfo: [],
    sysinfo: [],
    main_Url: main_Url,
    wp_Url: wp_Url,
    yq_Url: yq_Url,
    userid: '',
    token: '',
    icon_Url: icon_Url,
    dm_Url: dm_Url,
    vioce_Url: vioce_Url,
    guo_url: guo_url,
    isCesi: isCesi,
    arry: [],
    title: [],
    list: [],
    stop: false,
    icon: [],
    iconArry: [],
    isIos: true,
    menu: [],
    recommentArry: [],
    groups: [],
    nameArry: [],
    tradeArry: [],
    recommendType: 1,
    ISAGENT: '',
    YQNAME: '',
    user_name: '',
    password: '',
    StartDta: {},
    historyArryIcon: [],
    DataStr: '',
    ProblemData: [],
    time: '',
    innerAudioContext: innerAudioContext,
    manager: manager,
    recorderManager: recorderManager,
    admin_Url: admin_Url,
    //全类
    AllClassArry:[],
    CopyAllClassArry:[],
  }
})