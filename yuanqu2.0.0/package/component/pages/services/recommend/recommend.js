const main_Url = getApp().globalData.main_Url;
import Dialog from '../../../../../dist/dialog/dialog';
import Toast from '../../../../../dist/toast/toast';
import applyType from '../../../../../template/template.js';
import Notify from '../../../../../dist/notify/notify';
import calculate from '../../../../../template/calculate.js';
import select from '../../../../../template/select.js';
import addshop from '../../../../../template/addshop.js';
import update from '../../../../../template/update.js';
import setTime from '../../../../../template/setTime.js';
import func from '../../../../../template/func.js';
Page({
  data: {
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    menu: getApp().globalData.menu.height + getApp().globalData.menu.top,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    height: getApp().globalData.menu.height + getApp().globalData.menu.top,
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
  onClickLeft() {
    var id = wx.getStorageSync('from');
    if (this.data.arry.length == 0) {
      wx.navigateBack({
        delta: 4,
      })
      return;
    };
    Dialog.confirm({
      title: '提示',
      message: '是否保存类别到购物车！',
      zIndex: 2000,
    }).then(() => {
      var arry = this.data.arry;
      var bl = [];
      for (var i = 0; i < arry.length; i++) {
        bl.push(arry[i].checked);
        for (var s = 0; s < arry[i].sec.length; s++) {
          bl.push(arry[i].sec[s].checked);
        }
      };
      if (bl.indexOf(true) > -1) {
        Toast.loading({
          mask: true,
          message: '添加中...',
          duration: 0,
        });
        var userid = wx.getStorageSync('userid');
        var token = wx.getStorageSync('token');
        var brand_img = this.data.imgUrls;
        var brand_name = this.data.name;
        var one_cate = [];
        var two_cate = [];
        var star_cate = [];
        var three_cate = [];
        var click_type = [];
        for (var i = 0; i < arry.length; i++) {
          var arr_i = [];
          var str_i = [];
          var star_i = [];
          var listIndex = arry[i].listIndex;
          for (var j = 0; j < arry[i].sec.length; j++) {
            if (arry[i].sec[j].third.length > 0 && arry[i].sec[j].checked == true) {
              if (one_cate.indexOf(arry[i].num) == -1) {
                one_cate.push(arry[i].num) ;
                click_type.push(arry[i].list[listIndex].title) ;
              };
              arr_i.push(arry[i].sec[j].num);
              star_i.push(arry[i].sec[j].sscore);
              for (var m = 0; m < arry[i].sec[j].third.length; m++) {
                str_i.push(arry[i].sec[j].third[m].id) ;
              };
            };
          };
          if (arr_i.length != 0) {
            two_cate.push(arr_i);
          };
          if (star_i.length != 0) {
            star_cate.push(star_i);
          };
          if (str_i.length != 0) {
            three_cate.push(str_i);
          };
        };
        one_cate = one_cate.join(',')  ;
        click_type = click_type.join(',');
        var str1 = '';
        var str2 = '';
        var star_str = '';
        for (var i = 0; i < two_cate.length; i++) {
          for (var j = 0; j < two_cate[i].length; j++) {
            str1 += two_cate[i][j] + ',';
          };
          str1 = str1.substring(0, str1.length - 1);
          str1 += '|';
        };
        for (var i = 0; i < three_cate.length; i++) {
          for (var j = 0; j < three_cate[i].length; j++) {
            str2 += three_cate[i][j] + ',';
          };
          str2 = str2.substring(0, str2.length - 1);
          str2 += '|';
        };
        for (var i = 0; i < star_cate.length; i++) {
          for (var j = 0; j < star_cate[i].length; j++) {
            star_str += star_cate[i][j] + ',';
          };
          star_str = star_str.substring(0, star_str.length - 1);
          star_str += '|';
        };
        str1 = str1.substring(0, str1.length - 1);
        str2 = str2.substring(0, str2.length - 1);
        star_str = star_str.substring(0, star_str.length - 1);
        if (three_cate.length == 0) {
          return false;
        };
        if (str2.length > 0) {
          wx.request({
            url: main_Url + '/shopCar/registerAddShopCar',
            data: {
              user_id: userid,
              token: token,
              one_cate: one_cate,
              two_cate: str1,
              three_cate: str2,
              click_type: click_type,
              brand_img: brand_img,
              brand_name: brand_name,
              recommend_rate: star_str,
              shop_id: '',
              channelroad: 4,
              user_id: getApp().globalData.userid,
              token: getApp().globalData.token,

            },
            header: {},
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (res => {
              var code = res.data.code;
              if (code == 0) {
                Toast.clear();
                this.onStatus();
                this.notify(res.data.msg);
              };
              if (code == 1) {
                Toast.clear();
                this.notify(res.data.msg);
                wx.setStorageSync('backType', 2);
                setTime(1000).then(res => {
                  wx.reLaunch({
                    url: '/pages/user/shop/shop',
                  })
                });
              };
              if (code == 2) {
                Toast.clear();
                setTime().then(res => {
                  wx.navigateTo({
                    url: '/pages/user/log_on/log_on',
                  })
                });
              };
            }),
            fail: (res => {
              Toast.clear();
            }),
          })
        }
      } else {
        this.notify('请先选择！')
      }
    }).catch(() => {
      if (id == 2) {
        wx.navigateBack({
          delta: 4,
        })
      } else {
        wx.navigateBack({
          delta: 3,
        })
      }
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
  onClose(e) {
    this.setData({
      show: !this.data.show,
    });
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
    var arry = getApp().globalData.arry;
    this.data.imgUrls = options.imgUrls;
    this.data.name = options.name;
    this.data.list = getApp().globalData.list;
    update({
      arry,
      data: "arry"
    })
  },
  onReady: function() {},
  onShow: function() {
    wx.removeStorageSync('dalei');
  },
  onHide: function() {

  },
  onUnload: function() {
    wx.removeStorageSync('groups')
  },
})