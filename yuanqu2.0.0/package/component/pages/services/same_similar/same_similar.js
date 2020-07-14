import vioceText from '../../../../../template/vioceText.js';
import Notify from '../../../../..//dist/notify/notify';
import Toast from '../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../template/network.js';
import clickrepeat from '../../../../../template/clickrepeat.js';
import applyType from '../../../../../template/template.js';
import setTime from '../../../../../template/setTime.js';
import selectQuery from '../../../../../template/selectQuery.js';
Page({
  data: {
    info: getApp().globalData.sysinfo,
    menu: getApp().globalData.menu,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    icon_Url: getApp().globalData.icon_Url,
    check: false,
    arry: [],
    three_brand: [],
    name: '',
    keywords: '',
    imgUrls: '',
    top: '',
    id: 1,
    scrollHeight: ''
  },
  onSlider(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    this.onGetData(id);
  },
  onGetData(event) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    NetworkRequest({
      url: '/shopCar/historyOrder',
      data: {
        type: event,
      },
    }).then(res => {
      Toast.clear();
      var code = res.data.code;
      if (code == 1) {
        if (res.data.data.length > 0) {
          var arry = res.data.data;
          for (var i = 0; i < arry.length; i++) {
            arry[i].isSelect = false;
            if (arry[i].brand_img == 'undefined') {
              arry[i].brand_img = ""
            }
            for (var s = 0; s < applyType.applyType.length; s++) {
              if (arry[i].one_cate == applyType.applyType[s].id) {
                arry[i].cate_name = applyType.applyType[s].name;
              }
            }
          }
          this.setData({
            arry: arry,
            id: event,
            check: false,
          })
        } else {
          this.showToast({
            text: '暂无数据',
            time: 5000
          })
        }
      };
      wx.hideLoading({
        complete: (res) => {},
      })
    }).catch(err => {
      wx.hideLoading({
        complete: (res) => {},
      })
    })
  },
  onSelect(e) {
    var id = e.currentTarget.dataset.id;
    var arry = this.data.arry;
    var s = arry[id].one_cate;
    var one_cate = [];
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].isSelect == true) {
        one_cate.push(arry[i].one_cate);
      };
    };
    if (one_cate.indexOf(s) > -1 && arry[id].isSelect == false) {
      this.showToast({
        text: '你已经选择了第' + arry[id].one_cate + '大类，请不要重复选择',
        time: 5000
      })
      return;
    };
    if (arry[id].isSelect) {
      this.setData({
        ["arry[" + id + "].isSelect"]: false
      })
    } else {
      this.setData({
        ["arry[" + id + "].isSelect"]: true
      })
    }
    this.onCheck();
  },


  onDelethistory() {
    var arry = this.data.arry;
    var id = [];
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].isSelect) {
        id.push(arry[i].id);
      };
    };
    if (arry.length == 0 || id.length == 0) {
      this.showToast({
        text: '请先选择订单',
        time: 5000
      })
      return;
    };
    if (id.length == arry.length) {
      wx.showModal({
        title: '提示',
        content: '删除所有订单需要重新办理',
        confirmColor: "#f96509",
        confirmText: '确认删除',
        cancelText: '取消',
        success: (res => {
          if (res.confirm) {
            this.onDeleSure(id);
          } else if (res.cancel) {
            return;
          }
        })
      })
    } else {
      this.onDeleSure(id);
    }
  },

  onDeleSure(id) {
    var up_id = id.join(',');
    NetworkRequest({
      url: '/shopCar/delHistoryOrder',
      data: {
        up_id: up_id
      },
    }).then(res => {
      var pages = getCurrentPages();
      var PrePage = pages[pages.length - 3];
      PrePage.onHistory();
      this.onHistory();
      this.notify(res.data.msg);
    })
  },
  onHistory() {
    NetworkRequest({
      url: '/shopCar/historyOrder',
      data: {},
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        for (var i = 0; i < arry.length; i++) {
          arry[i].isSelect = false;
          if (arry[i].brand_img == 'undefined') {
            arry[i].brand_img = ""
          }
          for (var s = 0; s < applyType.applyType.length; s++) {
            if (arry[i].one_cate == applyType.applyType[s].id) {
              arry[i].cate_name = applyType.applyType[s].name;
            }
          }
        }
        this.setData({
          arry: arry
        })
        if (arry.length == 0) {
          this.showToast({
            text: '暂无历史订单！请重新办理！',
            time: 5000
          });
          setTime(2000).then(res => {
            wx.navigateBack({
              delta: 2,
            })
          })
          return;
        }
      };

    }).catch(err => {

    })
  },

  showToast(event) {
    wx.showToast({
      title: event.text,
      icon: 'none',
      duration: event.time,
    })
  },

  onCheck() {
    var arry = this.data.arry;
    var ss = [];
    var check = false;
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].isSelect) {
        var check = true
      }
    }
    this.setData({
      check: check
    })
  },


  onClick() {
    var type = this.data.id;
    if (this.data.check) {
      var keywords = this.data.keywords;
      var imgUrls = this.data.imgUrls;
      var arry = this.data.arry;
      var ss = [];
      for (var i = 0; i < arry.length; i++) {
        if (arry[i].isSelect) {
          ss.push(arry[i].id);
        }
      };
      var id = ss.join(',');
      wx.navigateTo({
        url: "/package/component/pages/services/hs_check/hs_check?keywords=" + keywords + "&imgUrls=" + imgUrls + "&id=" + id + '&type=' + type,
      })
    } else {
      this.showToast({
        text: '请先选择订单',
        time: 5000
      })
    }
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
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },
  onBack() {
    wx.navigateBack();
  },
  onLook(e) {
    var id = e.currentTarget.dataset.id;
    var arry = this.data.arry;
    this.data.three_brand = arry[id].three_brand;
    this.data.name = arry[id].cate_name;
    wx.navigateTo({
      url: '/package/component/pages/material/mergedata/dt/dt?open=' + true,
    })
  },
  onLoad: function (options) {
    this.data.keywords = options.text;
    this.data.imgUrls = options.imgUrls;
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    vioceText({
      data: {
        content: '请选择要注册同类别的商标：',
      },
    }).then(res => {})
    selectQuery('similar').then(res => {
      this.setData({
        top: res[0].top - 20
      })
    })
    selectQuery('bottom').then(res => {
      this.setData({
        scrollHeight: getApp().globalData.sysinfo.screenHeight - res[0].height - 260
      })
    })
  },
  onShow: function () {
    if (this.data.id == 1 && this.data.check == false) {
      this.onGetData(1);
    };
  },
  onUnload: function () {

  },
})