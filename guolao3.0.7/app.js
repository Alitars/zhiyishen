const isCesi = true;
const main_Url = isCesi ? "http://51guolao.yiqibnb.com/app" : "https://admin.iguolao.com/app";
const icon_Url = isCesi ? "http://51guolao.yiqibnb.com" : "https://admin.iguolao.com";
const wp_Url = isCesi ? "http://wp-test.iguolao.com/app" : "https://wp.iguolao.com/app";
const dm_Url = isCesi ? "http://wp-test.iguolao.com" : "https://wp.iguolao.com";
const vioce_Url = "https://wp.iguolao.com/app";
const gl_Url = "https://wp.iguolao.com";
import arry from './template/template.js';

// wx  https://developers.weixin.qq.com/miniprogram/dev/extended/service/translator.html //
const plugin = requirePlugin("WechatSI");
const manager = plugin.getRecordRecognitionManager();
// 全局音频
const innerAudioContext = wx.createInnerAudioContext();
// 全局录音
const recorderManager = wx.getRecorderManager();
//dpr
const dpr = wx.getSystemInfoSync().pixelRatio;
/***
 * 系统信息
 */
const info = {
  getSystem() {
    return wx.getSystemInfoSync();
  },
  getMenu() {
    return wx.getMenuButtonBoundingClientRect();
  }
};
App({
  onLaunch: function (options) {
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
    this.globalData.sysinfo = info.getSystem();
    this.globalData.menuInfo = info.getMenu();
    this.globalData.menu = info.getMenu();
    this.globalData.userid = wx.getStorageSync('userid');
    this.globalData.token = wx.getStorageSync('token');
    this.globalData.isIos = info.getSystem().system.indexOf('iOS') > -1 ? true : false;
    this.globalData.systemInfo = info.getSystem();

    // this.globalData.menuInfo = wx.getMenuButtonBoundingClientRect();
    // this.globalData.menu = this.globalData.menuInfo;
    // this.globalData.userid = wx.getStorageSync('userid');
    // this.globalData.token = wx.getStorageSync('token');
    // wx.getSystemInfo({
    //   success: (res => {
    //     if (res.system.indexOf('iOS') > -1) {
    //       this.globalData.isIos = true
    //     } else {
    //       this.globalData.isIos = false
    //     };
    //     this.globalData.sysinfo = res;
    //     this.globalData.systemInfo = res
    //   })
    // });
    // 更新
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {});
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        showCancel: false, 
        content: '新版本已经准备好了，点击确定重启更新~',
        confirmColor: "#f96509",
        success: (res => {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        })
      })
    });
    updateManager.onUpdateFailed(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false,
        confirmColor: "#f96509",
      })
    });
    if (typeof (wx.getStorageSync('indexArry')) !== 'object') {
      wx.setStorageSync('indexArry', arry.indexArry);
    };
    if (typeof (wx.getStorageSync('Question')) !== 'object' || wx.getStorageSync('Question')[0].lastId == undefined) {
    wx.setStorageSync('Question', arry.Question);
    };
    var voiceArry = wx.getStorageSync('voiceArry');
    if (voiceArry.length == 0 || voiceArry == undefined || voiceArry == null || !voiceArry || voiceArry.length < arry.voiceArry.length) {
      wx.setStorageSync('voiceArry', arry.voiceArry)
    };
    // 测试调试
    if (isCesi) {
      wx.setEnableDebug({
        enableDebug: true,
      })
    };
    manager.onRecognize = function (res) {};
    wx.setBackgroundTextStyle({
      textStyle: 'dark'
    });
    wx.setBackgroundColor({
      backgroundColor: '#f9f9f9',
    });
    wx.setKeepScreenOn({
      keepScreenOn: true
    });
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    recorderManager.onPause(() => {
      console.log('recorder pause')
    });
    recorderManager.onStop((res) => {
      console.log('recorder stop', res);
      const {
        tempFilePath
      } = res;
      innerAudioContext.autoplay = true;
      innerAudioContext.play();
      innerAudioContext.src = res.tempFilePath
    });
    recorderManager.onFrameRecorded((res) => {
      console.log(res);
      const {
        frameBuffer
      } = res;
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    });
    //监听内存不足
    wx.onMemoryWarning(function () {
      if (isCesi) {
        wx.showToast({
          title: 'warning：run out of memory',
          icon: 'none',
          duration: 8000,
        })
      }
    });
  },
  
  // 测试报错
  onError: function (err) {
    if (isCesi) {
      console.log(err);
      wx.showToast({
        title: 'err：' + err.slice(0, 200),
        icon: 'none',
        duration: 10000
      })
    }
  },
  globalData: {
    isCesi: isCesi,
    manager: manager,
    innerAudioContext: innerAudioContext,
    recorderManager: recorderManager,
    userInfo: null,
    openId: null,
    menuInfo: [],
    sysinfo: [],
    main_Url: main_Url,
    wp_Url: wp_Url,
    userid: '',
    token: '',
    icon_Url: icon_Url,
    dm_Url: dm_Url,
    vioce_Url: vioce_Url,
    gl_Url: gl_Url,
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
    StartDta: {},
    historyArryIcon: [],
    DataStr: '',
    ProblemData: [],
    time: '',
    dpr: dpr,
    //全类
    AllClassArry: [],
    CopyAllClassArry: [],
    selectQueryHeight: 0,
    Question: {},
  }
})