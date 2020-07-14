const menuInfo = getApp().globalData.menuInfo;
const info = getApp().globalData.sysinfo;
import Toast from '../../../../../dist/toast/toast';
import update from '../../../../../template/update.js';
import NetworkRequest from '../../../../../template/network.js';
Page({
  data: {
    menuInfo: menuInfo,
    SafeButtom: info.statusBarHeight * 4,
    SafeHigh: menuInfo.height + menuInfo.top,
    imgUrls: [],
    scale: info.screenHeight / info.screenWidth,
    info: info,
    c: 0,
    name: [],
    list: [],
    page: 2,
    pass: true,
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
      mask: true,
      zIndex: 1000
    })
  },
  onBack() {
    var pages = getCurrentPages();
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].route == 'package/component/pages/intitle/bename/bename') {
        wx.navigateBack({
          delta: i + 1,
        });
        break;
      };
    };
  },
  onIndex() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  onDt(e) {
    var index = e.currentTarget.dataset.id;
    var nameArry = getApp().globalData.nameArry;
    var len = nameArry.length;
    for (var n = 0; n < len; n++) {
      nameArry[n].fir.sort(function(x, y) {
        return x.num - y.num
      });
    };
    getApp().globalData.nameArry = nameArry;
    wx.navigateTo({
      url: '/package/component/pages/intitle/createDt/createDt?index=' + index,
    });
  },
  onRecord(arry) {
    var name = this.data.name;
    var record = wx.getStorageSync('applyType');
    for (var i = 0; i < arry.length; i++) {
      for (var e = 0; e < record.length; e++) {
        if (arry[i].num == record[e].id) {
          arry[i].name = record[e].name;
        };
      };
    };
    var list = this.data.list;
    var title = [];
    for (var i = 0; i < arry.length; i++) {
      var sl = 0;
      title.push(arry[i].title)
      var sscore = [];
      arry[i].list = list;
      arry[i].number = 0;
      arry[i].checked = false;
      for (var n = 0; n < arry[i].fir.length; n++) {
        for (var s = 0; s < arry[i].fir[n].sec.length; s++) {
          if (arry[i].fir[n].sec[s].num.length == 3) {
            arry[i].fir[n].sec[s].num = '0' + arry[i].fir[n].sec[s].num;
          };
          arry[i].fir[n].sec[s].checked = false;
          arry[i].firstIndex = i;
          arry[i].fir[n].isSelect = false;
          arry[i].fir[n].index = i;
          arry[i].fir[n].sec[s].firstIndex = i;
          arry[i].fir[n].sec[s].twoIndex = s;
          sl += arry[i].fir[n].sec[s].third.length;
          sscore.push(arry[i].fir[n].sec[s].sscore);
          if (arry[i].fir[n].sec[s].third) {} else {
            arry[i].fir[n].sec[s].third = [];
          };
        };
      };
      arry[i].isSelect = sl;
      arry[i].sscore = sscore;
    };
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].sscore.length > 0) {
        var min = Math.min.apply(null, arry[i].sscore);
        if (min < 4) {
          arry[i].listIndex = 1;
          if (min < 3) {
            arry[i].listIndex = 0;
          };
        } else {
          arry[i].listIndex = 2;
        };
      };
    };
    getApp().globalData.nameArry = arry;
    getApp().globalData.title = title;
    Toast.clear();
    this.data.pass = true
  },
  onMore() {
    if (this.data.pass) {
      this.data.pass = false;
      this.toast();
      var arry = wx.getStorageSync('options');
      var name = arry.name;
      this.data.name = name;
      var num = arry.num;
      var servername = arry.servername;
      NetworkRequest({
        url: '/recommends',
        data: {
          long: num,
          name: name,
          servername: servername,
          page: this.data.page,
          size: 10,
          user_id: wx.getStorageSync('userid'),
          groups: wx.getStorageSync('groups'),
        },
        method: 'POST',
      }).then(res => {
        var code = res.data.code;
        this.data.pass = true;
        if (code == 1) {
          var arryback = res.data.data;
          var ss = this.data.imgUrls.length
          for (var i = 0; i < arryback.length; i++) {
            this.setData({
              ["imgUrls[" + (ss + i) + "]"]: arryback[i].title
            })
          };
          var arry = getApp().globalData.nameArry.concat(arryback);
          this.onRecord(arry);
          this.data.page++;
        } else {
          Dialog.alert({
            title: '提示',
            message: '输入错误！'
          }).then(() => {
            wx.navigateBack({
              delta: 1,
            })
          });
        }
      }).catch(err => {
        this.data.pass = true;
        Dialog.alert({
          title: '提示',
          message: '请求出错！'
        }).then(() => {
          wx.navigateBack({
            delta: 1,
          })
        });
      })
    }
  },
  onLoad: function(options) {
    this.setData({
      imgUrls: getApp().globalData.title
    })
  },
})