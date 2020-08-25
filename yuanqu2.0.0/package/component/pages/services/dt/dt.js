import Toast from '../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../template/network.js';
import Notify from '../../../../../dist/notify/notify';
import Dialog from '../../../../../dist/dialog/dialog';
const info = getApp().globalData.sysinfo;
import setTime from '../../../../../template/setTime.js';
import route from '../../../../../template/route.js';
import func from '../../../../../template/func.js';
import GardenNetwork from '../../../../../template/GardenNetwork';
import CopyrightRequest from '../../../../../template/copyright'
Page({
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    show: '',
    block: '',
    icon_Url: getApp().globalData.icon_Url,
    history: null,
    popup: [{
      icon: '/package/component/images/pp1.png',
      itxt: '专业',
      txt: '人工智能大数据精确比对智能算法精准分析审查规则'
    }, {
      icon: '/package/component/images/pp2.png',
      itxt: '省心',
      txt: '小果AI极速为您商标取名，Logo设计，在线撰写技术交底书'
    }, {
      icon: '/package/component/images/pp3.png',
      itxt: '保障',
      txt: '企业风险转嫁---0风险商标注册，商标注册成功后再收费SaaS系统全面监控更新实时状态'
    }],
    arry: [],
    high: info.windowHeight,
    brhifh: info.statusBarHeight * 4,
    display: '',
    main_Url: getApp().globalData.icon_Url,
    showId: '',
    type: 0,
    count: 1,
    total: '',
    title: '',
    id: 0,
    code: 1,
    key: '',
    mold: '',
  },
  // 分享
  onBack(){
    wx.switchTab({
      url: '/pages/services/services',
    })
  },
  onCloseWX(){
    this.setData({
      transX: !this.data.transX
    })
  },
  onShare() {
    var arry = this.data.arry;
    
  },
  //
  onShop() {
    wx.navigateTo({
      url: '/pages/user/shop/shop',
    })
  },
  onBlock() {
    this.setData({
      block: !this.data.block,
      count: 1,
      total: this.data.arry[this.data.type].total
    })
  },
  onBalance() {
    var mold = this.data.mold;
    wx.setStorageSync('idtype', mold);
    Toast.loading({
      message: '结算中...',
      duration: 0,
    });
    this.setData({
      block: !this.data.block,
    });
    var good_name = this.data.title;
    var arry = this.data.arry;
    var type = this.data.type;
    var e = this.data.arry[type].id;
    var click_type = arry[type].title;
    var count = this.data.count;
    wx.setStorageSync('click_type', click_type);
    var good_type = arry[type].cate_id;
    var good_name = wx.getStorageSync('good_name');
    if (typeof (arry[type].total) == 'string') {
      var price = count * JSON.parse(arry[type].total)
    } else {
      var price = count * arry[type].total
    };
    if (mold == 1) {
      NetworkRequest({
        url: '/order/buyNow',
        data: {
          good_name: good_name,
          count: count,
          price: price,
          click_type: click_type,
          good_type: good_type,
          g_pid: 51,
        },
      }).then(res => {
        var id = res.data.data;
        var code = res.data.code;
        if (code == 1) {
          wx.setStorageSync('id', id);
          wx.navigateTo({
            url: '/package/component/pages/services/pay/pay',
          })
        }
      })
    };
    if (mold == 2) {
      var type = this.data.type;
      var count = this.data.count;
      var arry = this.data.arry;
      var name = arry[type].title;
      var total = this.data.total;
      var good_id = arry[type].id;
      CopyrightRequest({
        url: '/patent/addCart',
        data: {
          count: count,
          price: total,
          click_type: name,
          good_id: good_id,
        },
        method: 'POST',
      }).then(res => {
        var code = res.data.code;
        if (code == 1) {
          var shopList = res.data.data.shopCarList;
          var shopId = [];
          for (var i = 0; i < shopList.length; i++) {
            shopId.push(shopList[i].id)
          };
          var id = shopId.join(',');
          CopyrightRequest({
            url: '/shopCar/shopSettlement',
            data: {
              shop_id: id,
              id: id,
              g_pid: (mold == 1 ? 51 : 49),
            },
            method: 'POST',
          }).then(res => {
            if (code == 1) {
              var id = res.data.data;
              wx.setStorageSync('id', id);
              wx.setStorageSync('idtype', mold);
              wx.navigateTo({
                url: '/package/component/pages/services/pay/pay',
                success: (res => {
                  wx.setStorageSync('idtype', mold)
                }),
              })
            } else {
              this.notify(res.data.msg)
            }
          })
        }
      })
    };
    if (mold == 3) {
      var type = this.data.type;
      var count = this.data.count;
      var arry = this.data.arry;
      var name = arry[type].title;
      var total = this.data.total;
      var good_id = arry[type].id;
      CopyrightRequest({
        url: '/copyRight/addCart',
        data: {
          count: count,
          price: total,
          click_type: name,
          good_id: good_id,
        },
        method: 'POST',
      }).then((res) => {
        if (res.data.code !== '1') {
          Toast(res.data.msg);
          return;
        };
        var shopCarList = res.data.data.shopCarList;
        var shopCarListId = [];
        for (var i = 0; i < shopCarList.length; i++) {
          shopCarListId.push(shopCarList[i].id);
        };
        var id = shopCarListId.join(',');
        CopyrightRequest({
          url: '/copyRight/cTOrder',
          data: {
            id: id,
          },
          method: 'POST',
        }).then((res) => {
          var code = res.data.code;
          if (code == 1) {
            var id = res.data.data;
            wx.setStorageSync('id', id);
            wx.setStorageSync('idtype', mold);
            wx.navigateTo({
              url: '/package/component/pages/services/pay/pay',
              success: (res => {
                wx.setStorageSync('idtype', mold)
              }),
            })
          } else {
            this.notify(res.data.msg);
          }
        })
      })
    };
  },
  onAddShopCar() {
    wx.showLoading({
      title: '提交中...',
      duration: 0,
    })
    var mold = this.data.mold;
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var count = this.data.count;
    var arry = this.data.arry;
    var type = this.data.type;
    var name = arry[type].title;
    var total = this.data.total;
    var good_id = this.data.arry[this.data.type].id;
    if (mold == 1) {
      var title = this.data.title;
      NetworkRequest({
        url: '/shopCar/addShopCar',
        data: {
          user_id: userid,
          token: token,
          count: count,
          price: total,
          click_type: name,
          good_id: title,
        },
      }).then(res => {
        var code = res.data.code;
        if (code == 2) {}
        if (code == 1) {
          Toast.clear();
          this.notify(res.data.msg);
          this.onAddshop()
        }
        Toast.clear()
      }).catch(err => {
        Toast.clear()
      })
    };
    if (mold == 2) {
      CopyrightRequest({
        url: '/patent/addCart',
        data: {
          user_id: userid,
          token: token,
          good_id: good_id,
          count: count,
          price: total,
          click_type: name,
        },
        method: "POST",
      }).then(res => {
        var code = res.data.code;
        if (code == 2) {}
        if (code == 1) {
          Toast.clear();
          this.notify('添加成功');
          this.onAddshop()
        }
        Toast.clear()
      }).catch(err => {
        Toast.clear()
      })
    };
    if (mold == 3) {
      CopyrightRequest({
        url: '/copyRight/addCart',
        data: {
          good_id: good_id,
          count: count,
          click_type: name,
          price: total,
        },
        method: "POST",
      }).then((res) => {
        var code = res.data.code;
        if (code == 1) {
          Toast.clear();
          this.notify('添加成功');
          this.onAddshop()
        }
        Toast.clear()
      })
    }
  },
  notify(res) {
    Notify({
      text: res,
      duration: 1500,
      selector: '#custom-selector',
      backgroundColor: '#f44',
    })
  },
  toast() {
    wx.showLoading({
      title: '加载中',
      duration: 0,
    })
  },
  onClose() {
    this.setData({
      show: !this.data.show,
    })
  },
  onAddshop() {
    this.setData({
      display: !this.data.display,
      count: 1,
      total: this.data.arry[this.data.type].total
    })
  },
  onChoose(e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      id: id,
    })
  },
  onType(e) {
    var type = e.currentTarget.dataset.type;
    var arry = this.data.arry;
    var total = typeof (arry[type].p_price) == 'string' ? JSON.parse(arry[type].p_price) : arry[type].p_price;
    this.setData({
      type: type,
      total: total.toFixed(2),
    });
    wx.vibrateShort();
  },
  onChange(e) {
    // if (this.data.mold == 3) {
    //   return;
    // };
    var type = this.data.type;
    var arry = this.data.arry;
    var total = typeof (arry[type].p_price) == 'string' ? JSON.parse(arry[type].p_price) : arry[type].p_price;
    var count = e.detail;
    var total = total * count;
    this.setData({
      count: e.detail,
      total: total.toFixed(2),
    });
    wx.vibrateShort()
  },
  onBuy(e) {
    wx.navigateTo({
      url: '/package/component/pages/services/pay/pay',
    })
  },

  getData(id) {
    this.toast();
    GardenNetwork({
      url: '/goods/detail',
      data: {
        id: id,
      },
    }).then(res => {
      var arry = res.data.data;
      var code = res.data.code;
      var title = [];
      if (arry) {
        for (var i = 0; i < arry.length; i++) {
          // console.log();
          arry[i].total = typeof (arry[i].p_price) == 'string' ? JSON.parse(arry[i].p_price) : arry[i].p_price;
          arry[i].total.toFixed(2);
          if (arry[i].title) {
            title.push(arry[i].title)
          }
        };
        for (var s = 0; s < title.length; s++) {
          if (title[s].indexOf('商标') > -1) {
            var mold = 1
          };
          if (title[s].indexOf('专利') > -1) {
            var mold = 2
          };
          if (title[s].indexOf('著作权') > -1) {
            var mold = 3
          };
          if (title[s].indexOf('发明驳回复审') > -1 || title[s].indexOf('实用新型驳回复审') > -1 || title[s].indexOf('外观设计驳回复审') > -1) {
            var mold = 2
          }
        };
        this.setData({
          mold: mold
        });
        var total =  JSON.parse(arry[0].p_price);
        if (this.data.key.length > 0) {
          for (var i = 0; i < arry.length; i++) {
            if (arry[i].title == this.data.key) {
              var type = i;
              var total = JSON.parse(arry[type].p_price);
              this.setData({
                type: type,
                total: total.toFixed(2),
              });
              break
            }
          }
        };
        if (arry[0].id == 39) {
          wx.setStorageSync('from', 2)
        };
        this.setData({
          arry: arry,
          showId: arry[0].id,
          total: total.toFixed(2),
        });
        Toast.clear();
        wx.hideToast();
        wx.stopPullDownRefresh()
      };
      if (code == 2) {}
    }).catch(err => {
      wx.stopPullDownRefresh();
      Toast.clear()
    })
  },
  onCheck() {
    func.onHistory().then(tr => {
      var isShowTusiF = wx.getStorageSync('isShowTusiF');
      if (!isShowTusiF) {
        func.isHubei().then(ss => {
          if (ss.data.code == 0 || ss.data.code == '0') {
            wx.showModal({
              title: '温馨提示',
              content: '湖北省企业请先进行企业认证，可获取一张优惠券298元，是否立即认证？',
              showCancel: true,
              cancelText: '否',
              cancelColor: '',
              confirmText: '是',
              confirmColor: '#f96006',
              success: (res => {
                if (res.confirm == true) {
                  wx.setStorageSync('isShowTusiF', res.confirm);
                  wx.navigateTo({
                    url: '/pages/user/attest/apply/apply',
                  })
                } else {
                  this.historyTusi(tr)
                }
              })
            })
          } else {
            this.historyTusi(tr)
          }
        })
      } else {
        this.historyTusi(tr)
      }
    })
  },
  historyTusi(tr) {
    if (tr == true) {
      wx.showModal({
        title: '温馨提示',
        content: '您要注册的商标类别是否同历史商标相同？',
        showCancel: true,
        cancelText: '否',
        cancelColor: '',
        confirmText: '是',
        confirmColor: '#f96006',
        success: (res => {
          if (res.confirm == true) {
            wx.navigateTo({
              url: "/package/component/pages/services/hs_name/hs_name",
            })
          } else {
            wx.navigateTo({
              url: '/package/component/pages/services/name/name',
            })
          }
        })
      })
    } else {
      if (tr == false) {
        wx.navigateTo({
          url: '/package/component/pages/services/name/name',
        })
      }
    }
  },

  onLoad: function (options) {
    console.log(options);
    this.getData(options.id);
    this.data.title = options.title;
    // this.data.key = wx.getStorageSync('title');
    this.data.id = options.id;
    if (options.open=='true') {
      this.data.key = options.key;
      this.data.key = wx.getStorageSync('title');
    }else{
      this.data.key = wx.getStorageSync('title');
    };
  },
  onPullDownRefresh: function () {
    this.getData(this.data.id)
  },
  onShareAppMessage: function (res) {
    return{
      title:'业务详情',
      path:'/package/component/pages/services/dt/dt?id='+this.data.id + '&title='+this.data.title
    }
  },
  onShow: function () {},
})