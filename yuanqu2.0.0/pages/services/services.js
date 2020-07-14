// import Toast from '../../dist/toast/toast';
// import NetworkRequest from '../../template/network.js';
// import yqquest from '../../template/GardenNetwork.js'; 
// import Dialog from '../../dist/dialog/dialog';
// import remove from '../../template/remove.js';
// import setInter from '../../template/setInter.js';
// import setTime from '../../template/setTime.js';
// import voiceArry from '../../template/update.js';
// import logoCheck from '../../template/logon.js';
// Page({
//   data: {
//     items: [],
//     id: 0,
//     animationData: '',
//     icon_Url: getApp().globalData.icon_Url,
//     search: '',
//     attest: 0,
//     tabbar: {},
//     statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
//   },
//   makePhone() {
//     wx.makePhoneCall({
//       phoneNumber: '4006302718',
//     })
//   },

//   onChoose(e) {
//     if (wx.getStorageSync('suoyin')) {
//       this.setData({
//         id: e,
//       });
//       this.trans();
//     } else {
//       var id = e.currentTarget.dataset.id;
//       if (id == this.data.id) {} else {
//         this.setData({
//           id: e.currentTarget.dataset.id,
//         });
//         this.trans();
//       };
//     }
//   },
//   goSearch() {
//     wx.navigateTo({
//       url: '/pages/index/search/search',
//     });
//   },
//   onSearch(e) {
//     var search = this.data.search;
//     wx.navigateTo({
//       url: '/pages/index/search/search?id=' + search,
//     });
//   },
//   delet() {
//     this.setData({
//       search: ''
//     });
//   },
//   onInput(e) {
//     var value = e.detail.value;
//     this.setData({
//       search: value,
//     });
//   },
//   toast() {
//     Toast.loading({
//       message: '加载中...',
//       duration: 0,
//     });
//   },
//   onShop(e) {
//     wx.navigateTo({
//       url: '/pages/user/shop/shop',
//     });
//   },
//   onNews() {
//     wx.navigateTo({
//       url: '/pages/user/news/news',
//     });
//   },
//   onClick(e) {
//     var id = e.currentTarget.dataset.id;
//     var title = e.currentTarget.dataset.title;
//     if (id == 55) {
//       wx.navigateTo({
//         url: '/package/component/pages/index/brand_name/brand_name',
//       })
//     };
//     if (id == 54) {
//       var attest = this.data.attest;
//       if (attest == 2 || attest == 3) {
//         wx.navigateTo({
//           url: '/package/component/pages/intitle/bename/bename',
//         });
//       } else {
//         wx.showModal({
//           title: '企业认证',
//           content: '认证可查看更多诗词商标名称,是否立即认证?',
//           confirmColor: "#277cfb",
//           confirmText: '去认证',
//           cancelText: '忽略',
//           success: (res => {
//             if (res.confirm) {
//               wx.navigateTo({
//                 url: '/pages/user/attest/apply/apply',
//               })
//             } else if (res.cancel) {
//               wx.navigateTo({
//                 url: '/package/component/pages/intitle/bename/bename',
//               })
//             }
//           })
//         })
//       }
//     }
//     if (id !== 55 && id !== 54) {
//       wx.navigateTo({
//         url: "/package/component/pages/services/dt/dt?id=" + id + "&title=" + title,
//       });
//       wx.setStorageSync('backType', 2)
//     }
//   },
//   trans() {
//     wx.removeStorageSync('suoyin')
//     var id = this.data.id;
//     var items = this.data.items;
//     var ishow = (items ? false : items[id].animation);
//     var animation = wx.createAnimation({
//       duration: 1000,
//       timingFunction: 'ease',
//     });
//     this.animation = animation;
//     this.animation.translateY(id * 61).step({
//       duration: 300
//     });
//     this.setData({
//       animationData: this.animation.export(),
//       ["arry[" + id + "].animation"]: true
//     });
//     setTime(500).then(res => {
//       this.setData({
//         ["arry[" + id + "].animation"]: false
//       })
//     })
//   },
//   getAttest() {
//     var userid = wx.getStorageSync('userid');
//     var token = wx.getStorageSync('token');
//     NetworkRequest({
//       url: '/usercenter',
//       data: {
//         user_id: userid,
//         token: token,
//       },
//     }).then(res => {
//       var others = res.data.data.auth;
//       this.setData({
//         attest: others,
//       });
//     }).catch(err => {})
//   },
//   getData() {
//     // import NetworkRequest from '../../template/GardenNetwork.js';
//     var severArry = wx.getStorageSync('severArry');
//     if (severArry) {
//       this.setData({
//         items: severArry,
//       })
//     };
//     this.toast();
//     yqquest({
//       url: '/goods/all',
//       data: {
//         text: getApp().globalData.YQNAME
//       },
//     }).then(res => {
//       var arry = res.data.data[0];
//       if (arry) {
//         this.setData({
//           items: arry,
//         });
//         wx.setStorageSync('severArry', arry);
//       };
//       Toast.clear();
//       wx.stopPullDownRefresh();
//     }).catch(err => {
//       Toast.clear();
//       wx.stopPullDownRefresh();
//     });
//   },
//   onLoad: function(options) {

//   },
//   onShow: function() {
//     this.getData();
//     this.getAttest();
//     if (wx.getStorageSync('suoyin')) {
//       this.onChoose(wx.getStorageSync('suoyin') - 1)
//     }
//     remove();
//     logoCheck(this);
//     wx.setStorageSync('voiceArry', voiceArry.voiceArry);
//   },
//   onPullDownRefresh: function() {
//     this.onLoad();
//   },
// })
import Toast from '../../dist/toast/toast';
import NetworkRequest from '../../template/network.js';
import Dialog from '../../dist/dialog/dialog';
// import removeStorage from '../../template/removeStorage.js';
import setInter from '../../template/setInter.js';
import setTime from '../../template/setTime.js';
import func from '../../template/func.js';
Page({
  data: {
    items: [],
    id: 0,
    animationData: '',
    main_Url: getApp().globalData.icon_Url,
    search: '',
    attest: 0,
    animationData2: '',
  },
  makePhone() {
    wx.makePhoneCall({
      phoneNumber: '4006302718',
    })
  },
  onChoose(e) {
    if (wx.getStorageSync('suoyin')) {
      this.setData({
        id: e,
      });
      this.trans()
    } else {
      var id = e.currentTarget.dataset.id;
      if (id == this.data.id) {} else {
        this.setData({
          id: e.currentTarget.dataset.id,
        });
        this.trans()
      }
    }
  },
  goSearch() {
    wx.navigateTo({
      url: '/pages/index/search/search',
    })
  },
  onSearch(e) {
    var search = this.data.search;
    wx.navigateTo({
      url: '/pages/index/search/search?id=' + search,
    })
  },
  delet() {
    this.setData({
      search: ''
    })
  },
  onInput(e) {
    var value = e.detail.value;
    this.setData({
      search: value,
    })
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    })
  },
  onShop(e) {
    wx.navigateTo({
      url: '/pages/user/shop/shop',
    })
  },
  onNews() {
    wx.navigateTo({
      url: '/pages/user/news/news',
    })
  },
  onClick(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    if (!getApp().globalData.userid) {
      Toast('请登录')
      return;
    };
    if (id == 55) {
      wx.navigateTo({
        url: '/package/component/pages/index/brand_name/brand_name',
      })
    };
    if (id == 54) {
      var attest = this.data.attest;
      if (attest == 2 || attest == 3) {
        wx.navigateTo({
          url: '/package/component/pages/intitle/bename/bename',
        })
      } else {
        wx.showModal({
          title: '企业认证',
          content: '认证可查看更多诗词商标名称,是否立即认证?',
          confirmColor: "#2d9afb",
          confirmText: '去认证',
          cancelText: '忽略',
          success: (res => {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/user/attest/apply/apply',
              })
            } else if (res.cancel) {
              wx.navigateTo({
                url: '/package/component/pages/intitle/bename/bename',
              })
            }
          })
        })
      }
    }
    if (id !== 55 && id !== 54) {
      if (id == 1) {
        func.onHistory().then((e) => {
          if (e) {
            wx.showModal({
              title: '温馨提示',
              content: '您要注册的商标类别是否同历史商标相同？',
              showCancel: true,
              cancelText: '否',
              cancelColor: '',
              confirmText: '是',
              confirmColor: '#2d9afb',
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
            wx.navigateTo({
              url: "/package/component/pages/services/name/name",
            });
          }
        })
      } else {
        wx.navigateTo({
          url: "/package/component/pages/services/dt/dt?id=" + id + "&title=" + title,
        });
      }
      wx.setStorageSync('backType', 2)
    }
  },
  trans() {
    wx.removeStorageSync('suoyin');
    var id = this.data.id;
    var items = this.data.items;
    var ishow = (items ? false : items[id].animation);
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });
    this.animation = animation;
    this.animation.translateY(id * 61).step({
      duration: 300
    });
    this.setData({
      animationData: this.animation.export(),
      ["arry[" + id + "].animation"]: true
    });
    wx.vibrateShort()
  },
  getAttest() {
    NetworkRequest({
      url: '/usercenter',
      data: {},
    }).then(res => {
      var others = res.data.data.auth;
      this.setData({
        attest: others,
      })
    }).catch(err => {})
  },
  getData() {
    var severArry = wx.getStorageSync('severArry');
    if (severArry) {
      this.setData({
        items: severArry,
      })
    };
    this.toast();
    NetworkRequest({
      // url: '/goods/goodsList',
      url: '/goods/all',
      data: {},
      method: "POST"
    }).then(res => {
      var arry = res.data.data;
      if (arry) {
        for (var i = 0; i < arry.length; i++) {
          arry[i].animation = false
        }
        this.setData({
          items: arry,
        });
        wx.setStorageSync('severArry', arry)
      };
      Toast.clear();
      wx.stopPullDownRefresh()
    }).catch(err => {
      Toast.clear();
      wx.stopPullDownRefresh()
    })
  },
  onLoad: function (options) {
    this.getData()
  },
  onShow: function () {
    this.getAttest();
    if (wx.getStorageSync('suoyin')) {
      this.onChoose(wx.getStorageSync('suoyin') - 1)
    };
    wx.showTabBar({})
  },
  onPullDownRefresh: function () {
    this.onLoad()
  },
})