const info = getApp().globalData.sysinfo;
const main_Url = getApp().globalData.main_Url;
import applyType from '../../../../../template/template.js';
import Toast from '../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../template/network.js';
import Dialog from '../../../../../dist/dialog/dialog';
import Notify from '../../../../../dist/notify/notify';
import paydetail from '../../.././../../template/paydetail.js';
Page({

  data: {
    i: 0,
    SafeButtom: info.statusBarHeight * 4,
    imgUrls: [],
    current: 1,
    show: '',
    swiperError: 0,
    applyType: applyType.applyType,
    form: [],
    ch: 1,
    icon_Url: getApp().globalData.icon_Url,
    list: [],
    current2: 0,
    name: [],
    ss: 0,
    pass: false,
    img: '',
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    formText:[],
    formIndex: 0,
  },

  onFrom(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.setData({
      ch: id,
      ss: index
    })
  },
  onSure() {
    this.setData({
      show: !this.data.show,
    })
    var current = this.data.current;
    var imgUrls = this.data.imgUrls;
    var name = imgUrls[current].title;
    var ch = this.data.ch;
    this.onCreateIcon(name, ch);
  },
  bindPickerChange(e) {
    var value = e.detail.value;
    var id = this.data.form[value].id;
    var current = this.data.current;
    var imgUrls = this.data.imgUrls;
    var name = imgUrls[current].title;
    this.setData({
      ch: id,
      formIndex: value,
    })
    this.onCreateIcon(name,id);
  },
  onChoose(e) {
    // console.log('click');
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var check = e.currentTarget.dataset.check;
    var sec = JSON.parse(JSON.stringify(this.data.name[index].fir[id].sec));
    // console.log(sec)
    if (check) {
      this.setData({
        ["imgUrls[" + index + "].fir[" + id + "].isSelect"]: false,
        ["imgUrls[" + index + "].fir[" + id + "].sec"]: []
      })
    } else {
      this.setData({
        ["imgUrls[" + index + "].fir[" + id + "].isSelect"]: true,
        ["imgUrls[" + index + "].fir[" + id + "].sec"]: sec
      })
    }
    // console.log(this.data.imgUrls);
  },
  onCreateIcon(name, ch) {
    this.toast();
    wx.request({
      url: this.data.icon_Url + '/api/BrandUpload/operationFile',
      data: {
        brand_name: name,
        type: ch,
        channelroad: 4,
        user_id: getApp().globalData.userid,
        token: getApp().globalData.token,
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res => {
        Toast.clear();
        var code = res.data.code;
        if (code == 1) {
          this.setData({
            ["imgUrls[" + this.data.current + "].icon"]: res.data.img
          })
        }
      }),
      fail: (err => {
        Toast.clear();
        
      }),
    })
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
      mask: true,
      zIndex: 1000
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
  onChange(e) {
    var index = e.detail.current;
    var name = JSON.parse(JSON.stringify(this.data.name[index]));
    var imgUrls = JSON.parse(JSON.stringify(this.data.imgUrls[index]));
    if (imgUrls.fir.length > 0) {
      var fir = imgUrls.fir;
      this.setData({
        current: index,
      })
    } else {
      var fir = name.fir;
      for (var i = 0; i < fir.length; i++) {
        fir[i].sec = [];
      };
      this.setData({
        current: index,
        ["imgUrls[" + index + "].fir"]: fir,
      })
    };
  },
  onClick() {
    this.toast();
    var current = this.data.current;
    var logo = this.data.imgUrls[current].title;
    if (this.data.imgUrls[current].icon) {
      this.data.img = this.data.imgUrls[current].icon;
      var arry = JSON.parse(JSON.stringify(getApp().globalData.nameArry))[current].fir;
      this.onRecord(arry);
    } else {
      wx.request({
        url: getApp().globalData.icon_Url + '/api/BrandUpload/operationFile',
        data: {
          brand_name: logo,
          type: 1,
          channelroad: 4,
          user_id: getApp().globalData.userid,
          token: getApp().globalData.token,
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res => {
          var code = res.data.code;
          if (code == 1) {
            this.data.img = res.data.img;
            var arry = JSON.parse(JSON.stringify(getApp().globalData.nameArry))[current].fir;
            this.onRecord(arry);
          }
        }),
      })
    }
  },
  onClose() {
    this.setData({
      show: !this.data.show,
    })
    if (this.data.form.length > 0) {} else {
      this.getFont();
    }
  },
  getFont() {
    NetworkRequest({
      url: '/shopCar/fonts',
      data: {},
      method: 'GET',
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        var formText = [];
        for (var i = 0; i < arry.length; i++) {
          formText.push(arry[i].font_name)
        };
        this.setData({
          form: arry,
          formText: formText,
        })
      } else {
        Toast(res.data.msg);
      };
    })
  },
  getType() {
    paydetail()
  },
  onRecord(arry) {
    var current = this.data.current;
    var logo = this.data.imgUrls[current].title;
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
    getApp().globalData.recommentArry = arry;
    var time = setInterval(() => {
      if (arry.length > 0 && this.data.img.length > 0 && this.data.list.length > 0) {
        clearInterval(time);
        Toast.clear();
        wx.navigateTo({
          url: '/package/component1/pages/intitle/recommend/recommend?name=' + logo + '&imgUrls=' + this.data.img,
        });
      };
    }, 500);
  },
  onLoad: function(options) {
    var index = options.index;
    var arry = JSON.parse(JSON.stringify(getApp().globalData.nameArry));
    var len = arry.length;
    for (var i = 0; i < len; i++) {
      if (index == i) {
        var ss = arry[i].fir.length;
        for (var s = 0; s < ss; s++) {
          arry[i].fir[s].sec = [];
        };
      } else {
        arry[i] = {
          title: arry[i].title,
          mean: arry[i].mean,
          fir: [],
        };
      };
    };
    this.setData({
      imgUrls: arry,
      current: index,
      pass: true
    });
    this.data.name = JSON.parse(JSON.stringify(getApp().globalData.nameArry));
    this.getFont();
    this.getType();
  },
  onShow: function() {
    this.data.img = '';
  },
})