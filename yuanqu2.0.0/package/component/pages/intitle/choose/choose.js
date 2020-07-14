import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
const menuInfo = getApp().globalData.menuInfo;
const info = getApp().globalData.sysinfo;
import vioceText from '../../../../../template/vioceText.js';
import setTime from '../../../../../template/setTime.js';
Page({
  data: {
    tabs: [],
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    id: 0,
    result: [],
    SafeButtom: info.statusBarHeight * 4,
    SafeHigh: info.windowHeight,
    menuInfo: menuInfo,
    text: '',
    value: [],
    arry: [],
    groups: [],
    icon_Url: getApp().globalData.icon_Url,
    key: '',
    num: '',
    servername: '',
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
  onChoose(e) {
    var id = e.currentTarget.dataset.id;
    var type = this.data.id;
    var tabs = this.data.tabs;
    var arry = [];
    if (tabs[type].sec[id].isSelect == true) {
      tabs[type].sec[id].isSelect = false;
      for (var i = 0; i < tabs[type].sec.length; i++) {
        arry.push(tabs[type].sec[i].isSelect);
      };
      if (arry.indexOf(true) == -1) {
        tabs[type].isSelect = false;
      } else {
        tabs[type].isSelect = true;
      };
      this.setData({
        tabs: tabs,
      });
    } else {
      tabs[type].sec[id].isSelect = true;
      tabs[type].isSelect = true;
      this.setData({
        tabs: tabs,
      });
    };
    this.onCount();
  },
  onCount() {
    var tabs = this.data.tabs;
    var groups = [];
    for (var i = 0; i < tabs.length; i++) {
      for (var e = 0; e < tabs[i].sec.length; e++) {
        if (tabs[i].sec[e].isSelect == true) {
          groups.push(tabs[i].sec[e].groups);
        };
      };
    };
    this.data.groups = groups;
  },
  onTabs(e) {
    var id = e.currentTarget.dataset.id;
    if (id > 0) {
      wx.pageScrollTo({
        scrollTop: id * (id < 5 ? 0 : 30),
      })
    }
    if (id == this.data.id) {} else {
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      });
      this.animation = animation;
      this.animation.translateY(id * 41).step({
        duration: 300
      });
      this.setData({
        id: id,
        animationData: this.animation.export(),
      });
    };
  },
  onTabs2(e) {
    var id = e;
    if (id == this.data.id) {} else {
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      });
      this.animation = animation;
      this.animation.translateY(id * 41).step({
        duration: 300
      });
      this.setData({
        id: id,
        animationData: this.animation.export(),
      });
    };
    setTime(id * 50).then(res => {
      if (id > 3) {
        wx.pageScrollTo({
          scrollTop: id * 30,
        })
      }
    })
  },
  getData() {
    var tabs = JSON.parse(JSON.stringify(getApp().globalData.tradeArry));
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].isSelect = false;
      for (var s = 0; s < tabs[i].sec.length; s++) {
        tabs[i].sec[s].isSelect = false;
      };
    };
    this.setData({
      tabs: tabs,
    });
  },
  onClick() {
    var groups = this.data.groups;
    var key = this.data.key;
    var num = this.data.num;
    var servername = this.data.servername;
    if (groups.length > 0) {
      var groups = this.data.groups + ',' + key;
      wx.setStorageSync('groups', groups);
      wx.navigateTo({
        url: '/package/component/pages/intitle/check/check?name=' + key + '&num=' + num + '&servername=' + servername,
      });
    } else {
      this.notify('请选择行业！');
    };
  },
  toast() {
    Toast.loading({
      message: '加载中...'
    });
  },
  onBack() {
    wx.navigateBack();
  },
 
  onLoad: function(options) {
    vioceText({
      data: {
        content: '请选择您要注册商标的所属行业',
      },
    }).then(res => {})
    this.data.key = options.name;
    this.data.num = options.num;
    this.data.servername = options.servername;
    this.getData();
  },
  onUnload: function() {
 
  },
  onPullDownRefresh: function() {
    this.getData(this.data.key);
  },
})