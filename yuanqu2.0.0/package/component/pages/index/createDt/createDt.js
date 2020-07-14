const info = getApp().globalData.sysinfo;
const main_Url = getApp().globalData.main_Url;
import applyType from '../../../../../template/template.js';
import Toast from '../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../template/network.js';
import Dialog from '../../../../../dist/dialog/dialog';
import Notify from '../../../../../dist/notify/notify';
import paydetail from '../../../../../template/paydetail.js';
Page({
  data: {
    SafeButtom: info.statusBarHeight * 4,
    imgUrls: [],
    current: 0,
    icon_Url: getApp().globalData.icon_Url,
    applyType: applyType.applyType,
    list: [],
    key: '',
    text: '',
    swiperError: 0,
    imgUrlstwo: [],
  },
  onChoose(e) {
    // console.log(this.data.imgUrls);
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var check = e.currentTarget.dataset.check;
    if (check) {
      this.setData({
        ["imgUrls[" + index + "].fir[" + id + "].isSelect"]: false
      })
    } else {
      this.setData({
        ["imgUrls[" + index + "].fir[" + id + "].isSelect"]: true
      })
    }
  },
  onChange(e) {
    var imgUrlstwo = JSON.parse(JSON.stringify(this.data.imgUrlstwo));
    var index = e.detail.current;
    if (this.data.imgUrls[index].fir.length == 0) {
      this.setData({
        current: index,
        ["imgUrls[" + index + "]"]: imgUrlstwo[index]
      })
    } else {
      this.setData({
        current: index,
      })
    }
  },
  onClick() {
    wx.navigateTo({
      url: '/pages/index/search/dt/trade/recommend',
    })
  },
  onadd() {
    this.setData({
      current: this.data.current + 1
    })
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    })
  },
  notify(res) {
    Notify({
      text: res,
      duration: 2000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
  },
  getType() {
    paydetail()
  },

  onClick(e) {
    this.toast();
    var index = e.currentTarget.dataset.id;
    var arry = this.data.imgUrls[index].fir;
    var name = this.data.text;
    var record = this.data.applyType;
    for (var i = 0; i < arry.length; i++) {
      for (var e = 0; e < record.length; e++) {
        if (arry[i].num == record[e].id) {
          arry[i].name = record[e].name;
        };
      };
    };
    var list = this.data.list;
    for (var i = 0; i < arry.length; i++) {
      var sscore = [];
      var sl = 0;
      arry[i].list = list;
      arry[i].number = 0;
      arry[i].checked = false;
      for (var s = 0; s < arry[i].sec.length; s++) {
        arry[i].sec[s].checked = false;
        arry[i].sec[s].sscore = 0;
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
      arry[i].listIndex = 0;
    };
    getApp().globalData.recommentArry = arry;
    wx.navigateTo({
      url: '/package/component/pages/index/recommend/recommend?name=' + this.data.text + '&imgUrls=' + this.data.imgUrls[index].yuan,
    })
    Toast.clear();
  },

  onLoad: function(options) {
    var imgUrls = JSON.parse(JSON.stringify(getApp().globalData.icon));
    var index = options.index;
    var arry = [];
    for (var i = 0; i < imgUrls.length; i++) {
      arry[i] = imgUrls[i];
      for (var s = 0; s < imgUrls[i].fir.length; s++) {
        imgUrls[i].fir[s].isSelect = false;
        imgUrls[i].fir[s].index = i;
        for (var c = 0; c < arry[i].fir[s].sec.length; c++) {
          if (arry[i].fir[s].sec[c].num.length == 3) {
            arry[i].fir[s].sec[c].num = '0' + arry[i].fir[s].sec[c].num;
          };
        };
      };
      for (var s = 0; s < imgUrls[i].fir.length; s++) {
        imgUrls[i].fir.sort(function(x, y) {
          return x.num - y.num;
        });
      };
      if (index == i) {
        var list = JSON.parse(JSON.stringify(arry[i].fir));
        for (var n = 0; n < list.length; n++) {
          list[n].sec = [];
        };
      } else {
        arry[i] = {
          pic: arry[i].pic,
          fir: [],
        };
      };
    };
    this.setData({
      imgUrls: arry,
      current: index
    });
    this.data.key = options.key;
    this.data.text = options.text;
    this.data.imgUrlstwo = JSON.parse(JSON.stringify(imgUrls));
    this.getType();
  },
  onPullDownRefresh: function() {}
})