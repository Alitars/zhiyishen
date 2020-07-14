const main_Url = getApp().globalData.main_Url;
const info = getApp().globalData.sysinfo;
import Dialog from '../../../../../dist/dialog/dialog';
import Toast from '../../../../../dist/toast/toast';
import applyType from '../../../../../template/template.js';
import Notify from '../../../../../dist/notify/notify';
import select from '../../../../../template/select.js';
import addshop from '../../../../../template/addshop.js';
import update from '../../../../../template/update.js';
import calculate from '../../../../../template/calculate.js';
import func from '../../../../../template/func.js';
Page({
  data: {
    SafeButtom: info.statusBarHeight * 4,
    menuInfo: getApp().globalData.menuInfo.height + getApp().globalData.menuInfo.top,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    height: getApp().globalData.menuInfo.height + getApp().globalData.menuInfo.top,
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
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
  onSimilar(e) {
    var group = e.currentTarget.dataset.group;
    var first = e.currentTarget.dataset.first;
    var firstnum = this.data.arry[first].num;
    var text = this.data.name;
    wx.navigateTo({
      url: '/package/component/pages/services/similar_mark/similar_mark?name=' + text + '&group=' + group + '&firstnum=' + firstnum,
    })
  },
  onHead() {
    getApp().globalData.arry = this.data.arry;
    wx.navigateTo({
      url: '/package/component/pages/services/broad_heading_two/broad_heading_two?name=' + this.data.name,
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
      url: '/package/component/pages/services/increas/increas?num=' + num + '&name=' + name + '&first=' + first + '&two=' + two + '&numtwo=' + numtwo + '&index=' + index + '&key=' + this.data.name,
    });
  },

  onDeleteArry() {
    func.deletArry(this.data.arry).then(res => {
      this.onRecord(res);
    })
  },

  onChange(event) {
    select(event).then(res => {
      getApp().globalData.recommendType = 2;
      calculate(res).then(ss => {
        this.setData({
          arry: ss.arry,
          checked: ss.checked,
        })
      })
    })
  },

  onDeletBtn(e) {
    var type = e.currentTarget.dataset.id;
    func.delet(this.data.arry, type).then(res => {
      this.onRecord(res);
    })
  },

  onAddZu(e) {
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var index = e.currentTarget.dataset.index;
    var keywords = this.data.name;
    wx.navigateTo({
      url: '/package/component/pages/services/result/result?id=' + id + '&name=' + name + '&keywords=' + keywords + '&index=' + index,
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

  onRecord(arry) {
    getApp().globalData.recommendType = 2;
    calculate(arry).then(ss => {
      this.setData({
        arry: ss.arry,
        checked: ss.checked,
      })
    })
  },
  onAddShop() {
    wx.setStorageSync('is_design', 1);
    addshop();
  },
  onClose(e) {
    this.setData({
      show: !this.data.show,
    });
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
  onReady: function() {

  },
  onShow: function() {
    wx.removeStorageSync('dalei');
  },
})