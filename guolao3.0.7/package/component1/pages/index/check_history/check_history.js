const main_Url = getApp().globalData.main_Url;
import vioceText from '../../../../../template/vioceText.js';
import applyType from '../../../../../template/template.js';
import NetworkRequest from '../../../../../template/network.js';
import Dialog from '../../../../../dist/dialog/dialog';
import progress from '../../../../../template/progress.js';
import paydetail from '../../../../../template/paydetail.js';
Page({
  data: {
    e: 1,
    text: ' ',
    hour: '',
    arry: [],
    list: [],
    key: '',
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
  getType() {
    paydetail()
  },
  getIcon(key, text, type) {
    NetworkRequest({
      url: '/getpicall',
      data: {
        name: key,
        servername: text,
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
            keywords: key,
            type: type,
          },
          method: 'POST',
        }).then(res => {
          var code = res.data.code;
          var list = res.data.data;
          if (list.length > 0) {
            getApp().globalData.historyArryIcon = list;
            for (var s = 0; s < arry.length; s++) {
              arry[s].fir = list
            };
            getApp().globalData.icon = arry;
            var time = setInterval(() => {
              if (this.data.percent < 80 || this.data.percent < 90) {
                progress()
              } else {
                if (arry.length > 0 && this.data.list.length > 0) {
                  this.setData({
                    percent: 100
                  })
                  clearInterval(time)
                  wx.redirectTo({
                    url: '/package/component1/pages/index/create_finish_history/create_finish_history?key=' + this.data.key + '&text=' + this.data.name,
                  })
                }
              }
            }, 1000)
          } else {
            Dialog.alert({
              title: '提示',
              message: '暂无数据!',
            }).then(() => {
              wx.navigateBack({
                delta: 1,
              })
            });
          };
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
        message: err.errMsg,
      }).then(() => {
        wx.navigateBack({
          delta: 1,
        })
      });
    })
  },
  onLoad: function (options) {
    progress()
    this.getIcon(options.key, options.text, options.type);
    this.data.key = options.key;
    this.data.name = options.text;
    this.getType();
    this.data.imgUrls = options.imgUrls;
    vioceText({
      data: {
        content: '小果正在为您Logo设计，请稍后',
      },
    }).then(res => {})
  },
  onUnload: function () {

  },

})