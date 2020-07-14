import Toast from '../../dist/toast/toast';
import Notify from '../../dist/notify/notify';
import vioceText from '../../template/vioceText.js';
import NetworkRequest from '../../template/network.js';
import yqquest from '../../template/GardenNetwork.js';
import applyType from '../../template/template.js';
import Dialog from '../../dist/dialog/dialog';
import viocenavigation from '../../template/viocenavigation.js';
import recoder from '../../template/recorder.js';
import logoCheck from '../../template/logon.js';
import nav from '../../template/skip.js';
import remove from '../../template/remove.js';
import setTime from '../../template/setTime.js';
import func from '../../template/func.js';
import route from '../../template/route.js';
import canonical from '../../template/canonical.js';
import clickrepeat from '../../template/clickrepeat.js';
import voiceArry from '../../template/template.js';
import selectQuery from '../../template/selectQuery.js';
const animation = wx.createAnimation({
  duration: 400,
  timingFunction: 'ease-in-out',
});
Page({
  data: {
    search: '',
    imgUrls: [{
      img: 'https://admin.iguolao.com/public/uploads/20200511102040440.png'
    }, {
      img: 'https://admin.iguolao.com/public/uploads/20200511102040440.png'
    }],
    icon_Url: getApp().globalData.icon_Url,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    cate: [],
    hot: [],
    navBtn: '',
    current: '0',
    titlename: '',
    high: '',
    show: '',
    autoplay: '',
    menu: getApp().globalData.menu,
    main_Url: getApp().globalData.icon_Url,
    display: true,
    exhibit: true,
    hide: false,
    animationStatus: false,
    animationData: '',
    text: '',
    into: '',
    swiperError: 0,
    wenben: '',
    attest: 0,
    block: false,
    list: [],
    pause: true,
    active: 0,
    tabbar: {},
    top: '',
    isShow: false,
    transparent: 0.1,
    bgheight1: 0,
    bgheight2: 0,
    sss: false,
    newArry: [],
    btn: [{
      img: '/images/rrr.png',
      text: '商标服务',
      id: 51,
    }, {
      img: '/images/search@3x.png',
      id: 52,
      text: '版权服务',
    }, {
      img: '/images/pppp.png',
      id: 53,
      text: '专利服务',
    }, {
      img: '/images/zf.png',
      id: 54,
      text: '政府项目',
    }],
    listBtn: [{
      imgUrls: 'https://admin.iguolao.com/public/uploads/20200507161721266.png',
    }, {
      imgUrls: 'https://admin.iguolao.com/public/uploads/20200507162359992.png',
    }, {
      imgUrls: 'https://admin.iguolao.com/public/uploads/20200507162926518.png',
    }, {
      imgUrls: 'https://admin.iguolao.com/public/uploads/20200509153447851.png',
    },],
    showLogin: false,
    value: '',
    newsurl: '',
    multiArray: [],
    multiIndex: [0, 0],
    ServerArry: [],
    swiperArry: [
      {
        imga: 'https://admin.iguolao.com/public/uploads/20200509154619832.png',
        imgb: 'https://admin.iguolao.com/public/uploads/20200509154651303.png',
        imgc: 'https://admin.iguolao.com/public/uploads/20200509154805162.png',
        imgd: 'https://admin.iguolao.com/public/uploads/20200509154732387.png',
        ida: 1,
        idb: 2,
        idc: 3,
        idd: 4,
      }, {
        imga: 'https://admin.iguolao.com/public/uploads/20200519171217916.jpg',
        imgb: 'https://admin.iguolao.com/public/uploads/20200519165147247.jpg',
        imgc: 'https://admin.iguolao.com/public/uploads/20200519165446619.jpg',
        imgd: 'https://admin.iguolao.com/public/uploads/20200519171342682.jpg',
        ida: 5,
        idb: 2,
        idc: 3,
        idd: 6,
      }
    ]
  },
  bindMultiPickerChange: function (e) {
    // console.log(e);
    var multiIndex = e.detail.value;
    var newArry = this.data.newArry;
    var city = newArry[multiIndex[0]].city;
    var county = newArry[multiIndex[0]].county[multiIndex[1]];
    NetworkRequest({
      url: '/areaProject',
      data: {
        city: city,
        county: county,
      },
    }).then((res) => {
      if (res.data.code == 1) {
        var arry = res.data.data;
        for (var s = 0; s < arry.length; s++) {
          // arry[s].condition = arry[s].condition.slice(0, 50);
          arry[s].condition = '';
          arry[s].policy = arry[s].policy.slice(0, 50);
          arry[s].url = '';
        };
        this.setData({
          ["newArry[" + multiIndex[0] + "].news"]: arry,
          multiIndex: multiIndex
        })
      }
    })
  },
  // onSwiper(event){



  // },
  bindMultiPickerColumnChange: function (e) {
    var arry = JSON.parse(JSON.stringify(this.data.newArry));
    // console.log(arry, e.detail.value);
    // console.log(e);
    var xcolumn = arry[0].county;
    this.setData({
      multiArray: [this.data.multiArray[0], xcolumn]
    })
  },
  onServerDt(e) {
    if (!getApp().globalData.userid) {
      Toast('请登录')
      return;
    };
    // console.log(e.currentTarget.dataset)
    var id = e.currentTarget.dataset.id;
    var id = typeof (id) == 'string' ? JSON.parse(id) : id;
    // console.log(id);
    var uid = e.currentTarget.dataset.uid;
    var t = e.currentTarget.dataset.t;
    // console.log(uid)
    if (id <= 3) {
      wx.navigateTo({
        url: "/package/component/pages/services/dt/dt?id=" + uid + '&title=' + t + '&open=' + true + '&key=' + t,
      });
      wx.setStorageSync('from', 1);
    }
    if (id > 3) {
      // Toast('敬请期待');
      // return;
      // var uid = e.currentTarget.dataset.uid;
      // var t = e.currentTarget.dataset.t;
      console.log(t)
      wx.setStorageSync('title', t);
      wx.navigateTo({
        url: "/package/component/pages/services/dt/dt?id=" + uid + '&title=' + JSON.stringify(t) + '&open=' + true + '&key=' + t,
      });
      wx.setStorageSync('from', 1);
    };
  },
  onSevers(e) {
    if (!getApp().globalData.userid) {
      Toast('请登录')
      return;
    };
    var index = e.currentTarget.dataset.id;
    var index = typeof (index) == 'string' ? JSON.parse(index) : index;
    // console.log(index);
    if (index < 3) {
      wx.setStorageSync('suoyin', index + 1);
      wx.switchTab({
        url: '/pages/services/services',
      })
    }
    if (index == 3) {
      selectQuery('info').then((res) => {
        // console.log(res);
        wx.pageScrollTo({
          scrollTop: res[0].top - 80,
        })
      })
    }
  },
  onTool(e) {
    var id = e.currentTarget.dataset.id;
    // console.log(id);
    if (!getApp().globalData.userid) {
      Toast('请登录')
      return;
    };
    if (id == 1) {
      wx.navigateTo({
        url: "/package/component/pages/services/name/name",
      });
      wx.setStorageSync('from', 1)
    };
    if (id == 2 || id == 4) {
      var attest = this.data.attest;
      if (attest == 4 || attest == 2) {
        // console.log(id)
        var url = (id == 4 ? '/package/component/pages/index/brand_name/brand_name' : '/package/component/pages/intitle/bename/bename');
        // console.log(url, 'tyyty')
        wx.navigateTo({
          url: url,
        })
      } else {
        var url = (id == 4 ? '/package/component/pages/index/brand_name/brand_name' : '/package/component/pages/intitle/bename/bename');
        wx.showModal({
          title: '企业认证',
          content: '认证可查看更多诗词商标名称,是否立即认证?',
          confirmColor: "#277cfb",
          confirmText: '去认证',
          cancelText: '忽略',
          success: (res => {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/user/attest/apply/apply',
              })
            } else if (res.cancel) {
              wx.setStorageSync('attest', 0);
              wx.navigateTo({
                url: url,
              })
            }
          })
        })
      }
    };
    if (id == 3) {
      wx.switchTab({
        url: '/package/component/pages/knowledge/admin/admin',
      })
    };
    if (id == 5) {
      wx.navigateTo({
        url: '/package/component/pages/knowledge/business_name/business_name',
      })
    };
    if (id == 6) {
      wx.navigateTo({
        url: '/package/component/pages/index/classify/classify',
      })
    }
  },

  getNews() {
    NetworkRequest({
      url: '/goodServer',
      data: {},
    }).then((event) => {
      var arry = event.data.data;
      var userid = wx.getStorageSync('userid');
      for (var i = 0; i < arry.length; i++) {
        for (var s = 0; s < arry[i].good.length; s++) {
          if (typeof (arry[i].good[s].price) == 'string') {
            arry[i].good[s].price = JSON.parse(arry[i].good[s].price);
          };
          // if (typeof (arry[i].good[s].service_price) == 'string') {
          //   arry[i].good[s].service_price = JSON.parse(arry[i].good[s].service_price)
          // };
          // arry[i].good[s].total = (arry[i].good[s].price + arry[i].good[s].service_price).toFixed(2);
          arry[i].good[s].total = (arry[i].good[s].price).toFixed(2);
          arry[i].good[s].titles = JSON.parse(JSON.stringify(arry[i].good[s].title));
          arry[i].good[s].title = arry[i].good[s].title.slice(0, 4);
          if (!userid) {
            arry[i].good[s].total = '***';
          }
        };
      };
      this.setData({
        ServerArry: arry
      })
    });
    NetworkRequest({
      url: '/governmentNews',
      data: {},
    }).then((res) => {
      var arry = JSON.parse(JSON.stringify(res.data.data.recommend));
      var fData = [];
      for (var i = 0; i < arry.length; i++) {
        fData.push(arry[i].city);
        for (var s = 0; s < arry[i].news.length; s++) {
          // arry[i].news[s].condition = arry[i].news[s].condition.slice(0, 50);
          arry[i].news[s].condition = '';
          arry[i].news[s].policy = arry[i].news[s].policy.slice(0, 50);
          arry[i].news[s].url = '';
        };
      };
      this.setData({
        newArry: arry,
        multiArray: [fData, arry[0].county],
        multiIndex: [0, 0],
      })
    })
  },
  onDtnew(e) {
    var index = e.currentTarget.dataset.index;
    Toast('申报请联系客服')
    return;
    this.data.newsurl = this.data.newArry[0].news[index].url;
    console.log(this.data.newsurl);
    wx.navigateTo({
      url: '/package/component/pages/user/web_view_news/web_view_news',
    })
  },
  onListBtn() {
    wx.showToast({
      title: 'url',
      icon: "none"
    })
  },
  onChange(e) {
    canonical(e.detail)
  },
  onCheck() {
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var value = this.data.value;
    if (userid.length == 0 || token.length == 0 || userid == '' || token == '' || userid == null || token == null || userid.length == 0 || userid == undefined || token == undefined) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 3000,
      })
    } else {
      if (value.length == 0) {
        wx.showToast({
          title: '请先输入商标名称',
          icon: 'none',
          duration: 3000,
        });
        return
      };
      this.onClickrepeat(value)
    }
  },
  onClickrepeat(value) {
    clickrepeat(value).then(ss => {
      func.onCreateIcon(value, 1).then(res => {
        var img = res.data.img;
        this.data.isShowTusiF = true;
        func.onHistory().then(ss => {
          if (ss) {
            wx.showModal({
              title: '温馨提示',
              content: '您要注册的商标类别是否同历史商标相同？',
              showCancel: true,
              cancelText: '否',
              cancelColor: '',
              confirmText: '是',
              confirmColor: '#277cfb',
              success: (res => {
                if (res.confirm == true) {
                  wx.navigateTo({
                    url: '/package/component/pages/services/same_similar/same_similar?text=' + value + "&imgUrls=" + img,
                  })
                } else {
                  wx.navigateTo({
                    url: '/package/component/pages/services/trade/trade?text=' + value + "&imgUrls=" + img + "&id=" + 1,
                  })
                }
              })
            })
          } else {
            wx.navigateTo({
              url: '/package/component/pages/services/trade/trade?text=' + value + "&imgUrls=" + img + "&id=" + 1,
            })
          }
        })
      })
    })
  },
  onLogin() {
    wx.navigateTo({
      url: '/pages/user/log_on/log_on?id=' + 1,
    });
    this.setData({
      showLogin: false
    })
  },
  onClose() {
    this.setData({
      showLogin: !this.data.showLogin
    })
  },
  onClick(e) {
    var id = e.currentTarget.dataset.id;
    var url = e.currentTarget.dataset.url;
    var attest = this.data.attest;
    if (id == 51) {
      route(url);
      wx.setStorageSync('from', 1)
    } else if (id == 52) {
      if (attest == 2 || attest == 3) {
        route(url)
      } else {
        wx.showModal({
          title: '企业认证',
          content: '认证可查看更多诗词商标名称,是否立即认证?',
          confirmColor: "#277cfb",
          confirmText: '去认证',
          cancelText: '忽略',
          success: (res => {
            if (res.confirm) {
              route('pages/user/attest/apply/apply')
            } else if (res.cancel) {
              wx.setStorageSync('attest', 0);
              route(url)
            }
          })
        })
      }
    } else if (id == 53) {
      route(url)
    } else if (id == 54) {
      wx.switchTab({
        url: url,
      })
    }
  },
  onBar(event) {
    this.setData({
      active: event.detail
    })
  },
  goSearch() {
    if (!getApp().globalData.userid) {
      Toast('请登录')
      return;
    };
    wx.navigateTo({
      url: '/pages/index/search/search',
    })
  },
  onSwiper(e) {
    this.setData({
      current: e.detail.current,
    })
  },
  getData() {
    this.toast();
    var indexArry = wx.getStorageSync('indexArry');
    if (indexArry) {
      this.setData({
        imgUrls: indexArry.banner,
        cate: indexArry.cate,
        hot: indexArry.hot,
        navBtn: indexArry.ma,
      })
    }
    NetworkRequest({
      url: '/index',
      data: {},
    }).then(res => {
      var arry = res.data.data;
      if (arry) {
        for (var i = 0; i < arry.hot.length; i++) {
          arry.hot[i].total = (JSON.parse(arry.hot[i].price) + JSON.parse(arry.hot[i].service_price)).toFixed(2)
        };
        this.setData({
          imgUrls: arry.banner,
          cate: arry.cate,
          hot: arry.hot,
          navBtn: arry.ma,
        });
        wx.setStorageSync('indexArry', arry)
      };
      Toast.clear();
      wx.stopPullDownRefresh()
    }).catch(err => {
      Toast('网络请求失败');
      Toast.clear();
      wx.stopPullDownRefresh()
    })
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
      zIndex: 400
    })
  },
  onBlur(e) { },
  animat(e) {
    this.animation = animation;
    this.animation.translateY(e * 100).step();
    this.setData({
      animationData: this.animation.export(),
    })
  },
  onInto(e) {
    this.setData({
      into: e.detail.value
    })
  },
  onDt(e) {
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: "/package/component/pages/services/dt/dt?id=" + id + '&open=' + true + '&key=' + title,
    })
  },
  onSuoyin(e) {
    var id = e.currentTarget.dataset.id;
    wx.setStorageSync('suoyin', id + 1);
    wx.switchTab({
      url: '/pages/services/services',
    })
  },
  getAttest() {
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/usercenter',
      data: {
        user_id: userid,
        token: token,
      },
    }).then(res => {
      var others = res.data.data.auth;
      this.setData({
        attest: others,
      })
    }).catch(err => { })
  },
  onGetInfo() {
    wx.showLoading({
      title: '加载中...',
    });
    func.getOpenID().then(res => {
      var arry = JSON.parse(res.data.data);
      getApp().globalData.userInfo = arry;
      wx.setStorageSync('userInfo', arry);
      wx.setStorageSync('openId', arry.openId);
      yqquest({
        url: '/changeopenid',
        data: {
          avatarUrl: arry.avatarUrl,
          city: arry.city,
          country: arry.country,
          gender: arry.gender,
          language: arry.language,
          nickName: arry.nickName,
          openId: arry.openId,
          province: arry.province,
        },
        method: 'POST'
      }).then(res => {
        this.setData({
          showLogin: false
        });
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 5000,
        });
        var code = res.data.code;
        if (code == 0) {
          setTime().then(res => {
            wx.navigateTo({
              url: '/pages/user/log_on/bind/bind',
            })
          })
        };
        if (code == 1) {
          var arry = res.data.data;
          // console.log(arry, '343343');
          getApp().globalData.userid = arry.id;
          getApp().globalData.token = arry.apptoken;
          getApp().globalData.ISAGENT = arry.isagent;
          getApp().globalData.YQNAME = arry.text;
          wx.setStorageSync('token', arry.apptoken);
          wx.setStorageSync('userid', arry.id);
          wx.setStorageSync('YQNAME', arry.text);
          wx.setStorageSync('ISAGENT', arry.isagent);
          wx.setStorageSync('phone', arry.mobile);
          setTime(1500).then(res => {
            this.onShow()
          })
        }
      })
    })
  },
  onLoad: function (options) { },
  onShow: function () {
    this.getNews();
    this.getAttest();
    this.setData({
      autoplay: true,
    });
    remove();
    logoCheck(this);
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var YQNAME = wx.getStorageSync('YQNAME');
    var ISAGENT = wx.getStorageSync('ISAGENT');
    if (userid.length == 0 || token.length == 0 || userid == '' || token == '' || userid == null || token == null || userid.length == 0 || userid == undefined || token == undefined || ISAGENT == null || ISAGENT == undefined || ISAGENT.length == 0 || ISAGENT == '' || YQNAME == null || YQNAME == undefined || YQNAME.length == 0 || YQNAME == '') {
      this.setData({
        showLogin: true
      })
    } else {
      this.setData({
        showLogin: false
      })
    };
    wx.setStorageSync('voiceArry', voiceArry.voiceArry)
  },
  onHide: function () {
    this.setData({
      autoplay: false,
    })
  },
  onUnload: function () {
    this.setData({
      autoplay: false,
    })
  },
  onPullDownRefresh: function () { this.onShow(); },

  onShareAppMessage: function (res) { 
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: getApp().globalData.YQNAME ? ( getApp().globalData.YQNAME == '羚跑家园' ? getApp().globalData.YQNAME + '知识产权':getApp().globalData.YQNAME + '经济开发区') : '园区系统',
      path: '/pages/index/index'
    }
  },
})