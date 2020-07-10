import Toast from '../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../template/network.js';
import vioceText from '../../../../../template/vioceText.js';
import Notify from '../../../../../dist/notify/notify';
import setTime from '../../../../../template/setTime.js';
Page({
  data: {
    tabs: [],
    id: 0,
    result: [],
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    SafeHigh: getApp().globalData.sysinfo.windowHeight,
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    menu: getApp().globalData.menu,
    text: '',
    value: [],
    arry: [],
    groups: [],
    icon_Url: getApp().globalData.icon_Url,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    key: '',
    name: '',
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
  getData(e) {
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
    var name = this.data.name;
    if (groups.length > 0) {
      var groups = this.data.groups + ',' + name;
      wx.setStorageSync('groups', groups);
      wx.navigateTo({
        url: '/package/component1/pages/index/check/check?key=' + key + '&text=' + name,
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
  onShowText() {
    var that = this;
    var story = "请选择您要注册商标的所属行业";
    var i = 0;
    var time = setInterval(function() {
      var text = story.substring(0, i);
      i++;
      that.setData({
        text: text
      });
      if (text.length == story.length) {
        clearInterval(time);
      }
    }, 90);
  },


  onLoad: function(options) {
    this.data.key = options.key;
    this.data.name = options.text;
    this.getData();
    vioceText({
      data: {
        content: '请选择您要注册商标的所属行业',
        that: this
      },
    }).then(res => {})
  },


  onUnload: function() {},
  onPullDownRefresh: function() {
    this.getData(this.data.key);
  },
})