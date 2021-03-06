const main_Url = getApp().globalData.main_Url;
import applyType from '../../../../../template/template.js';
import NetworkRequest from '../../../../../template/network.js';
import Dialog from '../../../../../dist/dialog/dialog';
import vioceText from '../../../../../template/vioceText.js';
import progress from '../../../../../template/progress.js';
import paydetail from '../../../../../template/paydetail.js';
import setTime from '../../../../../template/setTime.js';
Page({

  data: {
    e: 1,
    text: ' ',
    hour: '',
    arry: [],
    list: [],
    //行业
    key: '',
    //产品名
    name: '',
    percent: 1,
    setTime: '',
    start: '',
    store: [],
    block: [],
    version: '',
    imgUrls: '',
    icon_Url: getApp().globalData.icon_Url,
  },

  onRecord(arry) {
    var name = this.data.name;
    var record = applyType.applyType;
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
    var time = setInterval(() => {
      if (this.data.percent < 80 || this.data.percent < 90) {
        progress();
      } else {
        if (arry.length > 0 && this.data.list.length > 0) {
          this.setData({
            percent: 100,
          });
          clearInterval(time);
          wx.redirectTo({
            url: '/package/component1/pages/intitle/create_finish_history/create_finish_history',
          })
        }
      }
    }, 1000)
  },
  getData(e) {
    this.data.name = e.name;
    var type = e.type;
    NetworkRequest({
      url: '/recommends',
      data: {
        long: e.num,
        name: e.name,
        servername: e.servername,
        page: 1,
        size: 10,
        user_id: wx.getStorageSync('userid'),
        groups: wx.getStorageSync('groups'),
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        var history = getApp().globalData.arry;
        var three_cate = [];
        for (var i = 0; i < history.length; i++) {
          three_cate.push(history[i].id);
        };
        var id = three_cate.join(',');
        NetworkRequest({
          url: '/shopCar/anotherList',
          data: {
            id: id,
            keywords: e.name,
            type: type,
          },
          method: 'POST',
        }).then(res => {
          var code = res.data.code;
          var list = res.data.data;
          if (list.length > 0) {
            for (var s = 0; s < arry.length; s++) {
              arry[s].fir = list
            };
            this.onRecord(arry)
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
        })
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
      Dialog.alert({
        title: '提示',
        message: '请求出错！'
      }).then(() => {
        wx.navigateBack({
          delta: 1,
        })
      });
    })
  },
  getType() {
    paydetail()
  },

  onLoad: function (options) {
    this.getData(options);
    wx.setStorageSync('options', options);
    progress();
    vioceText({
      data: {
        content: '小果正在为您进行商标取名,请稍后',
        that: this
      },
    }).then(res => {})
    this.getType();
  },
  onUnload: function () {

  },
})