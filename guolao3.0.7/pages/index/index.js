import Toast from '../../dist/toast/toast';
import Notify from '../../dist/notify/notify';
import vioceText from '../../template/vioceText.js';
import NetworkRequest from '../../template/network.js';
import applyType from '../../template/template.js';
import Dialog from '../../dist/dialog/dialog';
import viocenavigation from '../../template/viocenavigation.js';
import recoder from '../../template/recorder.js';
import logoCheck from '../../template/logon.js';
import nav from '../../template/skip.js';
import removeStorage from '../../template/removeStorage.js';
import selectQuery from '../../template/selectQuery.js';
import func from '../../template/func.js';
import setTime from '../../template/setTime.js';
import canonical from '../../template/canonical.js';
import clickrepeat from '../../template/clickrepeat.js';

var innerAudioContext = getApp().globalData.innerAudioContext;
const animation = wx.createAnimation({
  duration: 400,
  timingFunction: 'ease-in-out',
});
Page({
  data: {
    search: '',
    imgUrls: [],
    icon_Url: getApp().globalData.icon_Url,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    cate: [],
    hot: [],
    navBtn: '',
    current: '0',
    SafeHigh: '',
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
    top: '',
    isShow: false,
    transparent: 0.1,
    value: '',
    isShowTusiF: true,
    notice: false,
    notice_text: '',
    slider_down: false,
    info: [],
    menber: false,
    total: 0,
    memberId: '',
    listBtn: [{
      imgUrls: 'https://admin.iguolao.com/public/uploads/20200507161721266.png',
    }, {
      imgUrls: 'https://admin.iguolao.com/public/uploads/20200507162359992.png',
    }, {
      imgUrls: 'https://admin.iguolao.com/public/uploads/20200507162926518.png',
    }, {
      imgUrls: 'https://admin.iguolao.com/public/uploads/20200509153447851.png',
    }, ],
    showLogin: false,
    value: '',
    newsurl: '',
    multiArray: [],
    multiIndex: [0, 0],
    ServerArry: [],
    swiperArry: [{
      imga: 'https://admin.iguolao.com/public/uploads/20200611134422367.png',
      imgb: 'https://admin.iguolao.com/public/uploads/20200611095841372.png',
      imgc: 'https://admin.iguolao.com/public/uploads/20200703174834634.png',
      imgd: 'https://admin.iguolao.com/public/uploads/20200611134645174.png',
      ida: 1,
      idb: 2,
      idc: 7,
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
    }],
    currentz: 0,
  },
  bindMultiPickerChange: function (e) {
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
          arry[s].condition = '';
          arry[s].policy = arry[s].policy.slice(0, 50);
          arry[s].url = ''
        };
        this.setData({
          ["newArry[" + multiIndex[0] + "].news"]: arry,
          multiIndex: multiIndex
        })
      }
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var arry = JSON.parse(JSON.stringify(this.data.newArry));
    var xcolumn = arry[0].county;
    this.setData({
      multiArray: [this.data.multiArray[0], xcolumn]
    })
  },
  onSeverm(e) {
    if (!getApp().globalData.userid) {
      Toast('请登录')
      wx.navigateTo({
        url: '/pages/user/log_on/log_on',
      });
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
  },
  onServerDt(e) {
    if (!getApp().globalData.userid) {
      Toast('请登录');
      wx.navigateTo({
        url: '/pages/user/log_on/log_on',
      });
      return;
    };
    var id = e.currentTarget.dataset.id;
    var id = typeof (id) == 'string' ? JSON.parse(id) : id;
    var uid = e.currentTarget.dataset.uid;
    var t = e.currentTarget.dataset.t;
    if (id <= 3) {
      wx.navigateTo({
        url: "/package/component1/pages/services/dt/dt?id=" + uid + '&title=' + t + '&open=' + true + '&key=' + t,
      });
      wx.setStorageSync('from', 1)
    }
    if (id > 3) {
      wx.navigateTo({
        url: "/package/component1/pages/services/dt/dt?id=" + uid + '&title=' + t + '&open=' + true + '&key=' + t,
      });
      wx.setStorageSync('from', 1)
    }
  },
  onSevers(e) {
    if (!getApp().globalData.userid) {
      Toast('请登录');
      wx.navigateTo({
        url: '/pages/user/log_on/log_on',
      });
      return;
    };
    var index = e.currentTarget.dataset.id;
    var index = typeof (index) == 'string' ? JSON.parse(index) : index;
    if (index < 3) {
      wx.setStorageSync('suoyin', index + 1);
      wx.switchTab({
        url: '/pages/services/services',
      })
    }
    if (index == 3) {
      selectQuery('info').then((res) => {
        console.log(res);
        wx.pageScrollTo({
          scrollTop: res[0].top - 80,
        })
      })
    }
  },

  changeModel(){
    this.setData({
      modelShow:true
    })
  },
  toDaili(){
    if (!getApp().globalData.userid) {
      Toast('请先登录')
      if(this.data.phone){
        wx.navigateTo({
          url: '/pages/user/log_on/log_on?mobile='+options.mobile,
        });
      }else{
        wx.navigateTo({
          url: '/pages/user/log_on/log_on',
        });
      }
      return;
    }else{
      this.setData({
        modelShow:true
      })
      wx.navigateTo({
        url: '/package/component1/pages/user/activitytwo/activitytwo',
      })
    }
  },
  onTool(e) {
    var id = e.currentTarget.dataset.id;
    if (!getApp().globalData.userid) {
      Toast('请登录');
      wx.navigateTo({
        url: '/pages/user/log_on/log_on',
      });
      return;
    };
    if (id == 1) {
      wx.navigateTo({
        url: "/package/component1/pages/services/name/name",
      });
      wx.setStorageSync('from', 1)
    };
    if (id == 2 || id == 4) {
      var attest = this.data.attest;
      if (attest == 4 || attest == 2) {
        var url = (id == 4 ? '/package/component1/pages/index/brand_name/brand_name' : '/package/component1/pages/intitle/bename/bename');
        wx.navigateTo({
          url: url,
        })
      } else {

        var arry = wx.getStorageSync('userArry')
        var auth = arry.auth
        console.log(auth)
        var url = (id == 4 ? '/package/component1/pages/index/brand_name/brand_name' : '/package/component1/pages/intitle/bename/bename');
        if(auth == 2||auth ==3){
          wx.setStorageSync('attest', 0);
          wx.navigateTo({
            url: url,
          })
        }else{
          wx.showModal({
            title: '企业认证',
            content: '认证可查看更多诗词商标名称,是否立即认证?',
            confirmColor: "#f96006",
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
        
      }
    };
    if (id == 3) {
      wx.switchTab({
        url: '/pages/admin/admin',
      })
    };
    if (id == 5) {
      wx.navigateTo({
        url: '/package/component1/pages/knowledge/business_name/business_name',
      })
    };
    if (id == 6) {
      wx.navigateTo({
        url: '/package/component1/pages/index/classify/classify',
      })
    }
    if(id== 7){
      // Toast('敬请期待')
      func.resetQuest({
        'clearData': false
      }).then(() => {
        func.isSue({
          'id': 10,
        }).then(() => {
          wx.navigateTo({
            url: '/package/component2/pages/analyze/patent_analyze/patent_analyze',
          })
        })
      })
    }
  },
  onxie() {
    func.resetQuest({
      'clearData': false
    }).then(() => {
      func.isSue({
        'id': 1,
      }).then(() => {
        wx.navigateTo({
          url: '/package/component2/pages/patent_book/composeName/composeName?name=compose',
        })
      })
    })
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
            arry[i].good[s].price = JSON.parse(arry[i].good[s].price)
          };
          if (typeof (arry[i].good[s].service_price) == 'string') {
            arry[i].good[s].service_price = JSON.parse(arry[i].good[s].service_price)
          };
          arry[i].good[s].total = (arry[i].good[s].price + arry[i].good[s].service_price).toFixed(2);
          arry[i].good[s].titles = JSON.parse(JSON.stringify(arry[i].good[s].title));
          arry[i].good[s].title = arry[i].good[s].title.slice(0, 4)
        }
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
          arry[i].news[s].condition = '';
          arry[i].news[s].policy = arry[i].news[s].policy.slice(0, 50);
          arry[i].news[s].url = ''
        }
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
    Toast('申报请联系客服');
    return;
    this.data.newsurl = this.data.newArry[0].news[index].url;
    // console.log(this.data.newsurl);
    wx.navigateTo({
      url: '/package/component1/pages/user/web_view_news/web_view_news',
    })
  },
  onClosemenber() {
    this.setData({
      menber: false
    })
  },
  onPublic(e) {
    // console.log(e, 'sdsdsdsdonPublic')
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
              confirmColor: '#f96509',
              success: (res => {
                if (res.confirm == true) {
                  wx.navigateTo({
                    url: '/package/component1/pages/services/same_similar/same_similar?text=' + value + "&imgUrls=" + img,
                  })
                } else {
                  wx.navigateTo({
                    url: '/package/component1/pages/services/trade/trade?text=' + value + "&imgUrls=" + img + "&id=" + 1,
                  })
                }
              })
            })
          } else {
            wx.navigateTo({
              url: '/package/component1/pages/services/trade/trade?text=' + value + "&imgUrls=" + img + "&id=" + 1,
            })
          }
        })
      })
    })
  },
  onBar(event) {
    this.setData({
      active: event.detail
    })
  },
  makePhone() {
    wx.makePhoneCall({
      phoneNumber: '4006302718',
    })
  },
  recodeClick() {
    recoder('start')
  },
  notify(res) {},
  recodeStop() {
    this.setData({
      showVoice: true,
    });
    recoder('stop').then(res => {
      this.viocenavigation(res.data.data)
    })
  },
  viocenavigation(res) {
    viocenavigation(res).then(res => {
      // console.log(res, 'nav')
    }).catch(err => {})
  },
  onViceNav(e) {
    // console.log(e);
    var url = e.currentTarget.dataset.url;
    var id = e.currentTarget.dataset.id;
    nav(url, id)
  },
  onSkip(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 0) {
      wx.navigateTo({
        url: "/package/component1/pages/services/dt/dt?id=" + 1 + '&title=商标注册',
      });
      wx.setStorageSync('from', 1)
    };
    if (id == 1) {
      wx.navigateTo({
        url: '/package/component1/pages/index/brand_name/brand_name',
      })
    };
    if (id == 2) {
      var attest = this.data.attest;
      if (attest == 2 || attest == 3) {
        wx.navigateTo({
          url: '/package/component1/pages/intitle/bename/bename',
        })
      } else {
        wx.showModal({
          title: '企业认证',
          content: '认证可查看更多诗词商标名称,是否立即认证?',
          confirmColor: "#f96006",
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
                url: '/package/component1/pages/intitle/bename/bename',
              })
            }
          })
        })
      }
    };
    if (id == 3) {
      if (getApp().globalData.isCesi) {
        wx.navigateTo({
          url: '/package/component1/pages/knowledge/business_name/business_name',
        })
      } else {
        Toast('敬请期待！')
      }
    }
  },
  onMiniprogram(e) {
    var userid = wx.getStorageSync('userid');
    var url = e.currentTarget.dataset.id;
    if (url == 'appid') {
      wx.navigateTo({
        url: '/package/component1/pages/index/miniprogram_dt/miniprogram_dt',
      })
    };
    if (url == 'member') {
      if (userid.length == 0) {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 5000,
        });
        return;
      };
      if (this.data.info.length == 0) {
        wx.showToast({
          title: '请稍后',
          icon: 'none',
          duration: 5000,
        });
        this.getUser();
        return
      };
      var user_type = this.data.info.user_type;
      if (user_type == 1) {
        wx.navigateTo({
          url: '/package/component1/pages/user/copy_member/copy_member',
        })
      } else {
        wx.showToast({
          title: '您已开通白银会员',
          icon: 'none',
          duration: 5000,
        })
      }
    };
    if (url == 'agent') {
      wx.navigateTo({
        url: '/package/component1/pages/index/agent_dt/agent_dt',
      })
    };
    if (url == 'schoolOpen') {
      wx.navigateTo({
        url: '/package/component1/pages/index/schoolOpen/schoolOpen',
      })
    };
    if (url == 'baiwanrl') {
      wx.navigateTo({
        url: '/package/component1/pages/index/award/award'
      })
    };
    if (!url) {
      wx.switchTab({
        url: '/pages/services/services',
      })
    }
  },

  onTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  onInput(e) {
    this.setData({
      search: e.detail.value,
    });
    if (this.data.search.length > 0) {
      this.setData({
        exhibit: false,
      })
    }
  },

  onShop(e) {
    wx.navigateTo({
      url: '/pages/user/shop/shop',
    })
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
  onSwiper(e) {
    this.setData({
      current: e.detail.current,
    })
  },
  onSwiperz(e) {
    this.setData({
      currentz: e.detail.current,
    })
  },
  delet() {
    this.setData({
      search: '',
      exhibit: true,
    })
  },
  onNews() {
    wx.navigateTo({
      url: '/pages/user/news/news',
    })
  },
  onClose() {
    var show = this.data.show;
    if (show) {
      setTime(show ? 1 : 20).then(ss => {
        wx.showTabBar({
          aniamtion: true
        })
      })
    } else {
      wx.hideTabBar({
        aniamtion: true
      })
    }
    setTime(show ? 20 : 1).then(ss => {
      if (!show) {
        vioceText({
          data: {
            content: 'Hi!我是您的AI知识产权代理人--小果，请问您需要什么帮助？',
          },
        }).then(res => {})
      } else {
        this.animat(0);
        innerAudioContext.stop();
        this.setData({
          pause: false,
          slider_down: false
        })
      };
      this.setData({
        text: '',
        wenben: '',
        list: [],
        hide: false,
        into: '',
        show: !this.data.show,
        slider_down: false
      })
    })
  },
  getInfo() {
    var info = getApp().globalData.menu;
    var SafeHigh = info.bottom * 2;
    if (SafeHigh > 120) {
      this.setData({
        SafeHigh: 140,
        SafeButtom: info.statusBarHeight * 4,
      })
    } else {
      this.setData({
        SafeHigh: SafeHigh,
        SafeButtom: info.statusBarHeight * 4,
      })
    }
  },
  getData() {
    var indexArry = wx.getStorageSync('indexArry');
    // console.log(indexArry, typeof (indexArry), 'eerere');
    if (typeof (indexArry) == 'object') {
      this.setData({
        imgUrls: indexArry.banner,
        cate: indexArry.cate,
        hot: indexArry.hot,
        navBtn: indexArry.ma,
      })
    } else {
      var indexArry = [];
    };
    // return;
    NetworkRequest({
      url: '/index',
      data: {},
    }).then(res => {
      wx.stopPullDownRefresh()
      var arry = res.data.data;
      if (arry) {
        for (var i = 0; i < arry.hot.length; i++) {
          arry.hot[i].total = (JSON.parse(arry.hot[i].price) + JSON.parse(arry.hot[i].service_price)).toFixed(2);
          // arry
        };
        for (var i = 0; i < arry.banner.length; i++) {
          arry.banner[i].color = indexArry.banner[i].color ? indexArry.banner[i].color : [];
          arry.banner[i].pic = this.data.icon_Url + arry.banner[i].pic;
          this.setData({
            ['imgUrls[' + i + '].pic']: arry.banner[i].pic,
          })
          //取色 onClolor()
          this.onColor({
            'url': arry.banner[i].pic,
            'i': i
          }).then((res) => {
            arry.banner[res.i].color = res.color;
            this.setData({
              ['imgUrls[' + res.i + '].color']: res.color
            });
            wx.setStorageSync('indexArry', arry);
          })
        };
        this.setData({
          imgUrls: arry.banner,
          cate: arry.cate,
          hot: arry.hot,
          navBtn: arry.ma,
        });
      };
      // Toast.clear();
    }).catch(err => {
      // Toast.clear();
      wx.stopPullDownRefresh()
    })
  },
  onColor(event) {
    //canvas2d
    return new Promise((resolve, reject) => {
      var query = wx.createSelectorQuery();
      var dpr = getApp().globalData.dpr;
      query.select('#canvas-img').fields({
        node: true,
        size: true
      }).exec((res) => {
        //可能报错
        if (res[0] == null || res[0].node == null) {
          return;
        };
        var canvas = res[0].node;
        var ctx = canvas.getContext('2d');
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        var img = canvas.createImage();
        wx.downloadFile({
          url: event.url,
          success: ((x) => {
            img.src = x.tempFilePath;
            img.onload = (e) => {
              ctx.drawImage(img, 20, 20, 710, 240);
              var imageData = ctx.getImageData(21, 25, 709, 5).data;
              var color = [];
              for (var i = 0; i < 2; i++) {
                var R = imageData[i == 0 ? 100 : 2800];
                var G = imageData[i == 0 ? 101 : 2801];
                var B = imageData[i == 0 ? 102 : 2802];
                color.push("rgba(" + R + "," + G + "," + B + ")");
              };
              var color = [color[0], color[color.length - 1]];
              resolve({
                'color': color,
                'i': event.i
              });
            };
          }),
          fail: ((err) => {
            // console.log(err);
          })
        });
      });
    });
  },

  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    })
  },

  notify(res) {},

  onInputAi() {
    innerAudioContext.stop();
    this.setData({
      hide: !this.data.hide,
      into: '',
      list: [],
      wenben: '',
      slider_down: false
    })
  },
  onBlur(e) {},
  animat(e) {
    this.setData({
      slider_down: true
    })
  },

  onInto(e) {
    var value = e.detail.value.replace(/\s+/g, "");
    this.setData({
      into: value
    });
    if (value.length == 0) {
      this.setData({
        slider_down: false,
        list: [],
        wenben: '',
      })
    }
  },

  onSendText() {
    this.setData({
      wenben: this.data.into,
    });
    this.animat();
    this.viocenavigation(this.data.into)
  },
  onDt(e) {
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    // console.log(title, 'title');
    wx.setStorageSync('title', title);
    wx.navigateTo({
      url: "/package/component1/pages/services/dt/dt?id=" + id + '&open=' + true + '&key=' + title,
    })
  },

  onSuoyin(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 3) {
      selectQuery('info').then((res) => {
        wx.pageScrollTo({
          scrollTop: res[0].top - 80,
        })
      });
      return;
    };
    wx.setStorageSync('suoyin', id + 1);
    wx.switchTab({
      url: '/pages/services/services',
    })
  },

  onNotice() {
    NetworkRequest({
      url: '/winnerList',
      data: {},
    }).then(res => {
      if (res.data.code == 1) {
        var arry = res.data.data;
        if (arry.length > 0) {
          var text = [];
          for (var i = 0; i < arry.length; i++) {
            arry[i].text = '  恭喜用户' + arry[i].mobile + '获得价值' + arry[i].coupon_price + '元优惠券一张  ';
            text.push(arry[i].text)
          };
          var str = text.join("");
          this.setData({
            notice: true,
            notice_text: str,
          })
        }
      } else {
        this.setData({
          notice: false,
          notice_text: '',
        })
      }
    }).catch(err => {
      this.setData({
        notice: false,
        notice_text: '',
      })
    })
  },
  getUser() {
    NetworkRequest({
      url: '/usercenter',
      data: {},
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        var others = arry.auth;
        wx.setStorageSync('user_type', arry.user_type);
        if (arry.head_img) {
          if (arry.head_img.indexOf('//') == -1) {
            arry.head_img = this.data.icon_Url + arry.head_img
          }
        };
        this.setData({
          info: arry,
          attest: others,
        });
        wx.setStorageSync('userArry', arry)
      } else {
        this.setData({
          info: [],
          attest: [],
        })
      }
    }).catch(() => {
      this.setData({
        info: []
      })
    })
  },

  onlingqu(e) {
    return;
    var id = e.currentTarget.dataset.id;
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    NetworkRequest({
      url: '/getCoupon',
      data: {},
      method: 'POST',
    }).then(res => {
      if (res.data.code == 1) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 5000,
          mask: true
        });
        setTime(1000).then(() => {
          this.setData({
            menber: false
          })
        })
      } else {}
    }).catch(err => {})
  },
  onLoad: function (options) {
    // console.log(options, 'index,options');
    // this.onShow();
    
    if (!getApp().globalData.userid) {
      Toast('请先登录')
      if(options.mobile){
        this.setData({
          phone:options.mobile
        })
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
    this.setData({
      modelShow:false
    })
  },
  onShow: function () {
    // logoCheck();
    this.getData();
    this.getInfo();
    this.getNews();
    var show = this.data.show;
    this.setData({
      autoplay: true,
    });
    removeStorage();
    if (!show) {
      wx.showTabBar({
        aniamtion: true
      })
    }
    this.getUser();
    // this.onLoad();
  },
  onReady: function () {
    // this.onLoad()
  },
  onHide: function () {
    this.setData({
      autoplay: false,
    })
  },
  onUnload: function () {
    this.setData({
      autoplay: false,
    });
    innerAudioContext.stop()
  },
  onPullDownRefresh: function () {
    this.onShow();
  },
  onShareAppMessage: function () {
    return {
      title: '知昇(上海)人工智能科技有限公司，智能商标注册。',
      path: '/pages/index/index?mobile='+this.data.info.mobile
    }
  }
})