const info = getApp().globalData.sysinfo;
const main_Url = getApp().globalData.main_Url;
import Dialog from '../../../../dist/dialog/dialog';
import Toast from '../../../../dist/toast/toast';
import applyType from '../../../../template/template.js';
import Notify from '../../../../dist/notify/notify';
import NetworkRequest from '../../../../template/network.js';
import addshop from '../../../../template/addshop.js';
import setTime from '../../../../template/setTime.js';
import func from '../../../../template/func.js';
import calculate from '../../../../template/calculate.js';
import select from '../../../../template/select.js';
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
    shop_id: '',
    others: '',
    sscore:false,
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1,
    })
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },
  onDustbin(e) {
    var id = e.currentTarget.dataset.id;
    var arry = JSON.parse(JSON.stringify(this.data.arry));
    if (id == 1) {
      var firstindex = e.currentTarget.dataset.first;
      arry.splice(firstindex, 1);
    } else {
      var firstindex = e.currentTarget.dataset.first;
      var twoindex = e.currentTarget.dataset.two;
      arry[firstindex].sec.splice(twoindex, 1);
    };
    calculate(arry).then(res => {
      this.setData({
        arry: res.arry,
        checked: res.checked,
      })
    })
  },
  onSimilar(e) {
    var group = e.currentTarget.dataset.group;
    var first = e.currentTarget.dataset.first;
    var firstnum = this.data.arry[first].num;
    var text = this.data.others;
    wx.navigateTo({
      url: '/package/component1/pages/services/similar_mark/similar_mark?name=' + text + '&group=' + group + '&firstnum=' + firstnum,
    })
  },
  onHead() {
    var arry = this.data.arry;
    wx.navigateTo({
      url: '/package/component1/pages/services/broad_heading_two/broad_heading_two?arry=' + JSON.stringify(arry) + '&name=' + this.data.name,
    });
  },
  // add_more
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
  // onDeletBtn
  onDeleteArry() {
    var arry = JSON.parse(JSON.stringify(this.data.arry));
    var checked = this.data.checked;
    var list = [];
    if (arry.length > 0) {
      for (var i = 0; i < arry.length; i++) {
        list.push(arry[i].checked);
        for (var s = 0; s < arry[i].sec.length; s++) {
          list.push(arry[i].sec[s].checked);
        };
      };
      if (list.indexOf(true) == -1) {
        Toast('请先选择商品！');
      } else {
        Dialog.confirm({
          title: '提示',
          message: '是否删除该商品？'
        }).then(() => {
          for (var c = arry.length - 1; c >= 0; c--) {
            for (var b = arry[c].sec.length - 1; b >= 0; b--) {
              if (arry[c].sec[b].checked == true) {
                arry[c].sec.splice(b, 1);
              };
            };
          };
          // console.log(arry);
          if (this.data.sscore) {
            getApp().globalData.recommendType = 2;
          } else {
            getApp().globalData.recommendType = 1;
          };
          calculate(arry).then(res => {
            this.setData({
              arry: res.arry,
              checked: res.checked,
            })
          })
        })
      };
    };
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
    var sscore = e.currentTarget.dataset.sscore;
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var index = e.currentTarget.dataset.index;
    var keywords = this.data.name;
    if (sscore.indexOf('0') == 0) {
      wx.navigateTo({
        url: '/pages/user/shop/result/result?id=' + id + '&name=' + name + '&keywords=' + keywords + '&index=' + index,
      });
    } else {
      wx.navigateTo({
        url: '/package/component1/pages/services/result/result?id=' + id + '&name=' + name + '&keywords=' + keywords + '&index=' + index,
      });
    }
  },
  notify(e) {
    Notify({
      text: e,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
    });
  },

  onRecord(arry) {
    if (this.data.sscore) {
      getApp().globalData.recommendType = 2;
    } else {
      getApp().globalData.recommendType = 1;
    };
    calculate(arry).then(res => {
      this.setData({
        arry: res.arry,
        checked: res.checked,
      })
    })
  },
  onAddShop() {
    var arry = this.data.arry;
    var select = [];
    for (var i = 0; i < arry.length; i++) {
      for (var s = 0; s < arry[i].sec.length; s++) {
        select.push(arry[i].sec[s].checked);
      };
    };
    if (select.indexOf(true) == -1) {
      this.notify('请选择商品！');
    } else {
      var that = this;
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
      var shop_id = this.data.shop_id;
      NetworkRequest({
        url: '/shopCar/registerAddShopCar',
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
          shop_id: shop_id,
        },
        method: 'POST',
      }).then(res => {
        var code = res.data.code;
        if (code == 1) {
          Toast.clear();
          that.notify(res.data.msg);
          setTime(2000).then(res => {
            wx.navigateBack({
              delta: 1,
            })
          })
        };
      }).catch(err => {
        Toast.clear();
        
      })
    };
  },
  getData(e) {
    this.toast();
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/shopCar/regShopcarDetail',
      data: {
        shop_id: e,
        token: token,
      },
    }).then(res => {
      Toast.clear();
      var code = res.data.code;
      this.data.others = res.data.others;
      Toast.clear();
      if (code == 1) {
        var arry = res.data.data;
        if (arry[0].sec[0].sscore == 0) {
          this.data.sscore = true;
          getApp().globalData.recommendType = 2;
        } else {
          this.data.sscore = false;
          getApp().globalData.recommendType = 1;
        };
        for (var i = 0; i < arry.length; i++) {
          arry[i].checked = true;
          arry[i].list = getApp().globalData.list;
          for (var s = 0; s < arry[i].sec.length; s++) {
            arry[i].sec[s].checked = true;
          };
        };
        calculate(res.data.data).then(ss => {
          this.setData({
            arry: ss.arry,
            checked: ss.checked,
          })
        })
      };
      if (code == 2) {
        setTime(1500).then(res => {
          wx.navigateTo({
            url: '/pages/user/log_on/log_on',
          })
        })
      };
    }).catch(err => {
      Toast.clear();
      
    })
  },
  onStatus() {},
  onLoad: function(options) {
    this.getData(options.id);
    this.data.list = getApp().globalData.list;
    this.data.shop_id = options.id;
  },
  onPullDownRefresh: function() {
    this.getData(this.data.shop_id);
  },
})