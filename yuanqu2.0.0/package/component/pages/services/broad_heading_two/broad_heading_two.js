const main_Url = getApp().globalData.main_Url;
const info = getApp().globalData.sysinfo;
import applyType from '../../../../../template/template.js';
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
import canonical from '../../../../../template/canonical.js';
Page({
  data: {
    list: [],
    SafeButtom: info.statusBarHeight * 4,
    value: '',
    newList: [],
    arry: [],
    block: [],
    name: '',
    pass: false,
  },

  onSearch(e) {
    this.toast();
    var text = e.detail;
    this.setData({
      value: text
    })
    var keywords = this.data.name;
    NetworkRequest({
      url: '/bigvoicesearch',
      data: {
        text: text,
        keywords: keywords,
      },
    }).then(res => {
      var code = res.data.code;
      var block = res.data.data;
      var list = this.data.list;
      Toast.clear();
      if (code == 1) {
        var num = [];
        for (var i = 0; i < block.length; i++) {
          num.push(JSON.parse(block[i].num))
        };
        for (var s = list.length - 1; s >= 0; s--) {
          if (num.indexOf(list[s].id) == -1) {
            list.splice(s, 1)
          }
        };
        this.setData({
          list: list
        })
      } else {
        this.notify(res.data.msg);
      }
    }).catch(err => {
      Toast.clear();
    })
  },
  notify(e) {
    Notify({
      text: e,
      duration: 2000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
    });
  },
  toast() {
    Toast.loading({
      mask: false,
      message: '加载中...',
      duration: 0,
    });
  },
  onChange(e) {
    // this.setData({
    //   value: e.detail.replace(/[\ |\s*|\？|\！|\…|\‘|\’|\；|\【|\】|\·|\/|\、|\|\，|\。|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, ""),
    // });
    canonical(e.detail);
    var value = this.data.value;
    if (value.length == 0) {
      this.setData({
        list: wx.getStorageSync('dalei'),
      })
    }
  },
  onChoose(e) {
    var num = e.currentTarget.dataset.index;
    var name = this.data.name;
    getApp().globalData.arry = this.data.arry;
    var value = this.data.value;
    if (value) {
      wx.navigateTo({
        url: '/package/component/pages/services/add_small_two/add_small_two?num=' + num + '&name=' + name + '&value=' + value,
      })
    } else {
      wx.navigateTo({
        url: '/package/component/pages/services/add_small_two/add_small_two?num=' + num + '&name=' + name,
      })
    }
  },
  getType() {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var arry = PrePage.data.arry;
    this.data.block = arry;
    this.data.newList = arry;
    var list = applyType.applyType.slice(0, applyType.applyType.length);
    for (var i = 0; i < list.length; i++) {
      list[i].isSelect = 0
      for (var s = 0; s < arry.length; s++) {
        arry[s].show = false;
        if (list[i].id == arry[s].num) {
          list[i].isSelect = arry[s].isSelect
        }
      }
    }
    this.data.arry = arry;
    wx.setStorageSync('dalei', list);
    this.setData({
      list: list,
    })
  },
  // onRecoder(list, hash) {
  //   var pages = getCurrentPages();
  //   var PrePage = pages[pages.length - 2];
  //   var ss = PrePage.data.arry;
  //   for (var s = 0; s < ss.length; s++) {
  //     for (var a = 0; a < list.length; a++) {
  //       list[a].sec = [];
  //       list[a].sec.third = [];
  //       list[a].list = hash;
  //       list[a].num = JSON.stringify(list[a].id);
  //       list[a].checked = false;
  //       list[a].show = false;
  //       if (list[a].num == ss[s].num) {
  //         list[a].isSelect = true;
  //       };
  //     };
  //   };
  //   this.setData({
  //     list: list,
  //   })
  // },
  onClick() {
    if (this.data.pass == true) {
      var pages = getCurrentPages();
      var PrePage = pages[pages.length - 2];
      var arry = this.data.arry;
      PrePage.onRecord(arry);
      wx.navigateBack();
    }
    this.data.pass = false;
  },
  onSelect() {
    var arry = this.data.arry
    var newList = this.data.newList
    for (var i = 0; i < arry.length; i++) {
      var a = 0;
      for (var s = 0; s < arry[i].sec.length; s++) {
        a += arry[i].sec[s].third.length;
      }
      arry[i].isSelect = a;
    }
    var list = applyType.applyType;
    for (var i = 0; i < list.length; i++) {
      list[i].isSelect = 0
      for (var s = 0; s < arry.length; s++) {
        arry[s].show = false;
        if (list[i].id == arry[s].num) {
          list[i].isSelect = arry[s].isSelect
        }
      }
      for (var c = 0; c < newList.length; c++) {
        if (newList[c].num == list[i].num) {
          newList.isSelect = list[i].isSelect
        }
      }
    }
    this.setData({
      list: list,
      newList: newList,
    })
  },
  onLoad: function(options) {
    this.getType();
    this.data.name = options.name;
    this.data.arry = getApp().globalData.arry;
    this.data.pass = true;
  },
})