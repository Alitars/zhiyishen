import Notify from '../../dist/notify/notify';
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';
import NetworkRequest from '../../template/network.js';
import animated from '../../template/animation.js';
import setTime from '../../template/setTime.js';
import paydetail from '../../template/paydetail.js';
import func from '../../template/func.js';
import selectQuery from '../../template/selectQuery.js';
Page({
  data: {
    high: getApp().globalData.sysinfo.windowHeight,
    safeHeight: getApp().globalData.sysinfo.windowHeight - wx.getSystemInfoSync()['statusBarHeight'] - 135,
    url: getApp().globalData.icon_Url,
    list: [],
    id: 1,
    animationData: '',
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    height: getApp().globalData.menu.height + getApp().globalData.menu.top,
    safetop: 0,
  },
  onSwiper(e) {
    var id = e.detail.current + 1;
    if (!this.data[('arry' + id)]) {
      this.getShop(id)
    };
    animated((id - 1) * 180 / 3);
    this.setData({
      id: id
    });
  },
  onSlider(e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      id: id
    });
    if (!this.data[('arry' + id)]) {
      this.getShop(id)
    };
    animated((id - 1) * 180 / 3);
  },
  onDt(e) {
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    wx.setStorageSync('title', title);
    wx.navigateTo({
      url: "/package/component1/pages/services/dt/dt?id=" + id + '&open=' + true,
    })
  },
  onNape(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/user/shop/dt/dt?id=' + id,
      fail: (err => {
        wx.redirectTo({
          url: '/pages/user/shop/dt/dt?id=' + id,
        })
      }),
    })
  },
  
  onBalance() {
    var id = this.data.id;
    if (JSON.stringify(this.data[('arry' + id)]) == '[]') {
      Toast('请先选择订单');
      return
    };
    var arry = this.data[('arry' + id)];
    var shop_id = [];
    for (var i = 0; i < arry.shopCarList.length; i++) {
      if (arry.shopCarList[i].isSelect == true) {
        shop_id.push(arry.shopCarList[i].id)
      }
    };
    var order_id = shop_id.join(',');
    if (id == 3) {
      var url = '/copyRight/cTOrder';
    } else {
      var url = '/shopCar/shopSettlement';
    };
    if (order_id.length == 0) {
      this.notify('请选择商品')
    } else {
      Toast.loading({
        message: '结算中...',
        duration: 0,
      });
      NetworkRequest({
        url: url,
        data: {
          shop_id: order_id,
          id: order_id,
          g_pid: (id == 1 ? 51 : 49),
        },
        method: 'POST',
      }).then(res => {
        var order_id = res.data.data;
        var code = res.data.code;
        if (code == 0) {
          Dialog.alert({
            title: '提示',
            zIndex: 2000,
            message: res.data.msg,
          }).then(() => {})
        };
        if (code == 3) {
          Dialog.confirm({
            title: '企业认证',
            message: res.data.msg,
            confirmButtonText: '是',
            cancelButtonText: '否',
            zIndex: 2000
          }).then(() => {
            wx.navigateTo({
              url: "/pages/user/attest/attest",
            })
          }).catch(() => {})
        }
        if (code == 1) {
          this.getShop(id);
          this.setData({
            [('checked' + id)]: false,
            [('price') + id]: '0.00'
          });
          wx.setStorageSync('id', order_id);
          wx.setStorageSync('idtype', this.data.id);
          wx.navigateTo({
            url: '/package/component1/pages/services/pay/pay',
            success: (result) => {
              wx.setStorageSync('idtype', this.data.id)
            },
          })
        }
        Toast.clear()
      }).catch(err => {
        Toast.clear()
      })
    }
  },
  getType() {
    NetworkRequest({
      url: "/goods/paydetail",
      data: {},
    }).then(res => {
      var code = res.data.code;
      var list = res.data.data;
      if (code == 1) {
        for (var i = 0; i < list.length; i++) {
          list[i].total = JSON.parse(list[i].price) + JSON.parse(list[i].service_price);
          list[i].total = list[i].total.toFixed(2);
          list[i].cost = "0.00";
          list[i].bigprice = "0.00";
          list[i].instance = "0.00"
        };
        this.data.list = list
      } else {}
    }).catch(err => {})
  },
  onDelete() {
    var id = this.data.id;
    if (JSON.stringify(this.data[('arry' + id)]) == '[]') {
      Toast('请先选择订单');
      return
    };
    var arry = this.data['arry' + id];
    var shop_id = [];
    for (var i = 0; i < arry.shopCarList.length; i++) {
      if (arry.shopCarList[i].isSelect == true) {
        shop_id.push(arry.shopCarList[i].id)
      }
    };
    var order_id = shop_id.join(',');
    if (order_id.length == 0) {
      this.notify('请选择商品')
    } else {
      Dialog.confirm({
        title: '提示',
        message: '是否删除该商品！',
        zIndex: 2000
      }).then(() => {
        NetworkRequest({
          url: (id == 3 ? '/copyRight/delCart' : '/shopCar/delShopCar'),
          data: {
            shop_id: order_id,
            id: order_id,
            g_pid: (id == 1 ? 51 : 49),
          },
          method: 'POST',
        }).then(res => {
          var code = res.data.code;
          if (code == 1) {
            this.getShop(id);
            this.setData({
              [('checked' + id)]: false,
            });
            setTime(1000).then(ss => {
              Toast(code == 1 ? '删除成功' : res.data.msg)
            })
          }
        }).catch(err => {})
      }).catch(() => {})
    }
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    })
  },
  onDisplay() {
    var id = this.data.id;
    this.setData({
      [('show' + id)]: !this.data[('show' + id)],
    })
  },
  onPrece() {
    var id = this.data.id;
    var arry = this.data[('arry' + id)];
    var a = 0;
    for (var i = 0; i < arry.shopCarList.length; i++) {
      if (arry.shopCarList[i].isSelect == true) {
        a += JSON.parse(arry.shopCarList[i].price)
      }
    };
    this.setData({
      [('price' + id)]: a.toFixed(2),
    })
  },
  onChooseAll() {
    var id = this.data.id;
    var checked = this.data[('checked' + id)];
    if (JSON.stringify(this.data[('arry' + id)]) == '[]') {
      Toast('请先选择订单');
      return
    };
    var arry = this.data[('arry' + id)];
    if (arry.shopCarList.length > 0) {
      if (checked) {
        for (var i = 0; i < arry.shopCarList.length; i++) {
          arry.shopCarList[i].isSelect = false
        };
        this.setData({
          [('checked' + id)]: false,
          [('arry' + id)]: arry,
        })
      } else {
        for (var i = 0; i < arry.shopCarList.length; i++) {
          arry.shopCarList[i].isSelect = true
        };
        this.setData({
          [('checked' + id)]: true,
          [('arry' + id)]: arry,
        })
      };
      this.onChecked()
    } else {
      Toast('请先添加商品')
    }
  },
  onChange(event) {
    var id = event.currentTarget.dataset.id;
    var arry = this.data[('arry' + this.data.id)];
    if (arry.shopCarList[id].isSelect == false) {
      var checked = true
    } else {
      var checked = false
    };
    this.setData({
      [
        [('arry' + this.data.id)] + ".shopCarList[" + id + "].isSelect"
      ]: checked
    });
    this.onChecked();
    this.onPrece()
  },
  onChecked() {
    var id = this.data.id;
    var arry = this.data[('arry' + id)];
    var block = [];
    for (var i = 0; i < arry.shopCarList.length; i++) {
      block.push(arry.shopCarList[i].isSelect)
    };
    var number = [];
    for (var n = 0; n < block.length; n++) {
      if (block[n] == true) {
        number.push(block[n])
      }
    };
    if (block.indexOf(false) == -1) {
      this.setData({
        [('checked' + id)]: true,
        [('number' + id)]: number.length,
      })
    } else {
      this.setData({
        [('checked' + id)]: false,
        [('number' + id)]: number.length,
      })
    };
    this.onPrece()
  },
  getShop(id) {
    this.toast();
    if (id == 1) {
      var url = '/shopCar/shopCarList';
    };
    if (id == 2) {
      var url = '/patent/getCart';
    };
    if (id == 3) {
      var url = '/copyRight/getCart';
    };
    NetworkRequest({
      url: url,
      data: {
        page: 10,
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        func.shopback(res.data.data).then(res => {
          this.setData({
            [('arry' + id)]: res,
            [('number' + id)]: 0,
            [('checked' + id)]: false,
            [('price' + id)]: '0.00',
            [('show' + id)]: false
          })
        })
      };
      if (code == 2) {
        this.notify(res.data.msg)
      };
      Toast.clear()
    }).catch(err => {
      Toast.clear()
    })
  },
  notify(res) {
    wx.showToast({
      title: res,
      duration: 5000,
      icon: 'none'
    })
  },
  onBack() {
    wx.switchTab({
      url: "/pages/index/index",
    })
  },
  onRefresh(e) {
    var id = e.currentTarget.dataset.id;
    this.getShop(id)
  },
  onClearData() {
      for (var i = 1; i < 4; i++) {
        this.setData({
          ['arry' + i]: [],
          ['checked' + i]: false,
          ['number' + i]: 0,
          ['price' + i]: '0.00',
          ['show' + i]: false,
        })
      };
  },
  onLoad: function (options) {
    if (!getApp().globalData.userid) {
      Toast('请先登录')
      if(options.mobile){
        wx.navigateTo({
          url: '/pages/user/log_on/log_on?mobile='+options.mobile,
        });
      }else{
        wx.navigateTo({
          url: '/pages/user/log_on/log_on',
        });
      }
      return;
    };
    this.onClearData();
  },
  onHide: function () {
    this.onClearData();
  },
  onPullDownRefresh: function () {
    this.getShop(this.data.id);
  },
  onShow: function () {
    var userArry = wx.getStorageSync('userArry');
    if (userArry) {
      this.setData({
        info: userArry
      });
    };
    if (wx.getStorageSync('userid')) {
      paydetail()
    };
    this.getShop(1);
    this.getShop(2);
    this.getShop(3);
  },
  onShareAppMessage: function () {
    return {
      title: '知昇(上海)人工智能科技有限公司，智能商标注册。',
      path: '/pages/shops/shops?mobile='+this.data.info.mobile
    }
  }
})