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
    text: '',
    hour: '',
    arry: [],
    list: [],
    key: '',
    name: '',
    percent: 0,
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
    for (var i = 0; i < arry.length; i++) {
      var sl = 0;
      var sscore = [];
      arry[i].list = list;
      arry[i].number = 0;
      arry[i].checked = false;
      for (var s = 0; s < arry[i].sec.length; s++) {
        arry[i].sec[s].checked = false;
        arry[i].firstIndex = i;
        arry[i].sec[s].firstIndex = i;
        arry[i].sec[s].twoIndex = s;
        sl += arry[i].sec[s].third.length;
        sscore.push(arry[i].sec[s].sscore);
        if (arry[i].sec[s].third) {} else {
          arry[i].sec[s].third = [];
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
    progress();
    getApp().globalData.arry = arry;
    var time = setInterval(() => {
      if (this.data.percent < 80 || this.data.percent < 90) {
        progress();
      } else {
        if (arry.length > 0) {
          this.setData({
            percent: 100
          })
          clearInterval(time)
          if(this.data.toImg){
            wx.redirectTo({
              url: '/package/component/pages/services/recommend/recommend?name=' + this.data.toName + '&imgUrls=' + this.data.toImg,
            })
          }else{
            wx.redirectTo({
              url: '/package/component/pages/services/recommend/recommend?name=' + name + '&imgUrls=' + this.data.imgUrls,
            })
          }
          
        }
      }
    }, 1000)
  },
  getData(id, keywords, type) {
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/shopCar/anotherList',
      data: {
        id: id,
        keywords: keywords,
        token: token,
        type: type,
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      var arry = res.data.data;
      if (arry.length > 0) {
        this.onRecord(arry);
      } else {
        Dialog.alert({
          title: '提示',
          message: '暂无数据!',
        }).then(() => {
          wx.navigateBack({
            delta: 1,
          })
        });
        // wx.redirectTo({
        //   url: '/package/component1/pages/services/check_fail/check_fail?text=' + text + '&key=' + this.data.key + '&name=' + this.data.name + '&imgUrls=' + this.data.imgUrls,
        // });
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
  },
  getShare(shareId,brand){
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/brandDetect',
      data: {
        share_id: shareId,
        brand_name: brand,
        token: token,
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      var arry = res.data.data;
      if (arry.length > 0) {
        this.onRecord(arry);
      } else {
        Dialog.alert({
          title: '提示',
          message: '暂无数据!',
        }).then(() => {
          wx.navigateBack({
            delta: 1,
          })
        });
        // wx.redirectTo({
        //   url: '/package/component1/pages/services/check_fail/check_fail?text=' + text + '&key=' + this.data.key + '&name=' + this.data.name + '&imgUrls=' + this.data.imgUrls,
        // });
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
  },
  getType() {
    paydetail()
  },

  onLoad: function (options) {
    console.log(options)
    vioceText({
      data: {
        content: '小果正在为您检测推荐类别,请稍后',
      },
    }).then(res => {})
    progress()
    if(options.shareId){
      this.setData({
        toName:options.brandname,
        toImg:options.imgUrl
      })
      this.getShare(options.shareId,options.brandname)
    }else{

      this.getData(options.id, options.keywords, options.type);
    }
    this.data.name = options.keywords;
    this.data.imgUrls = options.imgUrls;
    this.getType();
  },
  onUnload: function () {},
})