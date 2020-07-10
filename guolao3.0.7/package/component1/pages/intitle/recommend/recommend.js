const main_Url = getApp().globalData.main_Url;
const info = getApp().globalData.sysinfo;
import Dialog from '../../../../../dist/dialog/dialog';
import Toast from '../../../../../dist/toast/toast';
import applyType from '../../../../../template/template.js';
import Notify from '../../../../../dist/notify/notify';
import calculate from '../../../../../template/calculate.js';
import select from '../../../../../template/select.js';
import addshop from '../../../../../template/addshop.js';
import update from '../../../../../template/update.js';
import func from '../../../../../template/func.js';
Page({

  data: {
    SafeButtom: info.statusBarHeight * 4,
    menuInfo: getApp().globalData.menuInfo.height + getApp().globalData.menuInfo.top,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    height: getApp().globalData.menuInfo.height + getApp().globalData.menuInfo.top,
    radio: '1',
    show: '',
    ch: "",
    arry: [],
    list: [],
    delet: true,
    checked: false,
    firstIndex: '',
    name: '',
    listIndex: '',
    sscore: [],
    imgUrls: '',
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1,
    })
  },
  onDustbin(e) {
    func.onDustbin(e, this.data.arry).then(res => {
      calculate(res).then(res => {
        this.setData({
          arry: res.arry,
          checked: res.checked,
        })
      })
    });
  },
  onClose(e) {
    this.setData({
      show: !this.data.show,
    });
  },
  onSimilar(e) {
    var group = e.currentTarget.dataset.group;
    var first = e.currentTarget.dataset.first;
    var firstnum = this.data.arry[first].num;
    var text = this.data.name;
    wx.navigateTo({
      url: '/package/component1/pages/services/similar_mark/similar_mark?name=' + text + '&group=' + group + '&firstnum=' + firstnum,
    })
  },
  onHead() {
    getApp().globalData.arry = this.data.arry;
    wx.navigateTo({
      url: '/package/component1/pages/services/broad_heading_two/broad_heading_two?name=' + this.data.name,
    });
  },

  addSmall(e) {
    var arry = this.data.arry;
    var index = e.currentTarget.dataset.index;
    var numtwo = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var first = e.currentTarget.dataset.first;
    var two = e.currentTarget.dataset.two;
    var num = arry[first].num;
    wx.navigateTo({
      url: '/package/component1/pages/services/increas/increas?num=' + num + '&name=' + name + '&first=' + first + '&two=' + two + '&numtwo=' + numtwo + '&index=' + index + '&key=' + this.data.name,
    });
  },

  onDeleteArry() {
    func.deletArry(this.data.arry).then(res => {
      this.onRecord(res);
    })
  },


  onChange(event) {
    select(event).then(res => {
      getApp().globalData.recommendType = 1;
      calculate(res).then(ss => {
        this.setData({
          arry: ss.arry,
          checked: ss.checked,
        })
      })
    })
  },


  onRecord(arry) {
    getApp().globalData.recommendType = 1;
    calculate(arry).then(res => {
      this.setData({
        arry: res.arry,
        checked: res.checked,
      })
    })
  },




  onDelet(e) {
    this.setData({
      delet: !this.data.delet,
    });
  },

  onDeletBtn(e) {
    var type = e.currentTarget.dataset.id;
    func.delet(this.data.arry, type).then(res => {
      this.onRecord(res);
    })
  },

  onSure(e) {
    var firstIndex = this.data.firstIndex;
    var id = this.data.ch;
    this.setData({
      ["arry[" + firstIndex + "].listIndex"]: id,
      show: !this.data.show,
    });
    this.onPrice(this.data.arry);
  },
  onAddZu(e) {
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var index = e.currentTarget.dataset.index;
    var keywords = this.data.name;
    wx.navigateTo({
      url: '/package/component1/pages/services/result/result?id=' + id + '&name=' + name + '&keywords=' + keywords + '&index=' + index,
    });
  },
  notify(e) {
    Notify({
      text: e,
      duration: 2000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      zIndex: 300,
    });
  },


  toast() {
    Toast.loading({
      mask: true,
      message: '添加中...',
      duration: 0,
    });
  },
  onAddShop() {
    addshop()
  },
  onStatus() {
    var arry = this.data.arry;
    for (var i = 0; i < arry.length; i++) {
      arry[i].checked = false;
      for (var s = 0; s < arry[i].sec.length; s++) {
        arry[i].sec[s].checked = false;
      };
    };
    this.setData({
      arry: arry,
      checked: false,
    })
  },
  onLoad: function(options) {
    // Toast.loading({
    //   mask: true,
    //   message: '加载中...',
    //   duration: 1500,
    //   zIndex: 1000,
    // });
    var arry = getApp().globalData.recommentArry;
    this.data.imgUrls = options.imgUrls;
    this.data.name = options.name;
    this.data.list = getApp().globalData.list;
    update({
      arry,
      data: "arry"
    })
  },
  onShow: function() {
    wx.removeStorageSync('dalei');
  },
  onHide: function() {

  },
})