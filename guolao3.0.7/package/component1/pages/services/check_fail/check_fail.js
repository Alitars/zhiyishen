const info = getApp().globalData.sysinfo;
import applyType from '../../../../../template/template.js';
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
import paydetail from '../../../../../template/paydetail.js';
Page({
  data: {
    SafeHigh: info.windowHeight - info.statusBarHeight - 20,
    value: '',
    text: '',
    list: [],
    key: '',
    imgUrls: '',
    name: '',
  },
  onJiance() {
    var value = this.data.value;
    var key = this.data.key;
    if (value.length > 0) {
      this.getRecode(key, value);
    } else {
      Toast('请输入产品名称！')
    };
  },
  onPhone() {
    wx.makePhoneCall({
      phoneNumber: '4006302718',
    })
  },
  onChange(e) {
    this.setData({
      value: e.detail.replace(/[\ |\s*|\？|\！|\…|\‘|\’|\；|\【|\】|\·|\/|\、|\|\，|\。|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, ""),
    });
  },
  onChoose() {
    var text = this.data.text;
    this.getData(text, wx.getStorageSync('groups'));
  },
  getData(e, a) {
    this.toast();
    NetworkRequest({
      url: '/handrecommed',
      data: {
        text: e,
        groups: a,
      },
    }).then(res => {
      if (res.data.data.length > 0) {
        this.onRecord(res.data.data);
      };
      Toast.clear();
      this.notify(res.data.msg);
    }).catch(err => {
      Toast.clear();
      this.notify(res.data.msg);
    })
  },

  onRecord(arry) {
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
      var sscore = [];
      arry[i].list = list;
      arry[i].checked = false;
      for (var s = 0; s < arry[i].sec.length; s++) {
        arry[i].sec[s].checked = false;
        arry[i].firstIndex = i;
        arry[i].sec[s].firstIndex = i;
        arry[i].sec[s].twoIndex = s;
        sscore.push(arry[i].sec[s].sscore);
        if (arry[i].sec[s].third) {} else {
          arry[i].sec[s].third = [];
        };
      };
      arry[i].sscore = sscore;
    };
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].sscore.length > 0) {
        var min = Math.min.apply(null, arry[i].sscore);
        if (min < 4) {
          arry[i].listIndex = 1;
        } else {
          arry[i].listIndex = 2;
        }
      }
    };
    Toast.clear();
    wx.navigateTo({
      url: '/package/component1/pages/services/recommend/recommend?arry=' + JSON.stringify(arry) + '&list=' + JSON.stringify(list) + '&name=' + this.data.text + '&imgUrls=' + this.data.imgUrls,
    });
  },
  getType() {
    paydetail()
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },
  getRecode(key, text) {
    this.toast();
    NetworkRequest({
      url: '/voiceselect',
      data: {
        keywords: key,
        text: text,
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      if (res.data.data.length > 0) {
        this.onRecord(res.data.data);
      };
      if (res.data.data.length == 0) {
        Toast.clear();
        this.notify(res.data.msg);
      }
    }).catch(err => {
      Toast.clear();
      this.notify(res.data.msg);
    })
  },
  notify(e) {
    Notify({
      text: e,
      duration: 1500,
      selector: '#custom-selector',
      backgroundColor: '#f44'
    });
  },

  onLoad: function(options) {
    this.data.key = options.key;
    this.data.text = options.text;
    this.data.name = options.name;
    this.data.imgUrls = options.imgUrls;
  },
})