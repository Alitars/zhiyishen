const main_Url = getApp().globalData.main_Url;
import Toast from '../../dist/toast/toast';
import Notify from '../../dist/notify/notify';
import NetworkRequest from '../../template/network.js';
import removeStorage from '../../template/removeStorage.js';
import func from '../../template/func.js';
import setTime from '../../template/setTime.js';
import animation from '../../template/animation.js';
Page({
  data: {
    userBtn: [{
      url: '/pages/user/attest/attest',
      images: '/images/icon1.png',
      text: '我的认证'
    },
    // {
    //   url: '/pages/user/coupon/coupon',
    //   images: '/images/icon2.png',
    //   text: '我的优惠券'
    // }, 
    {
      url: '/pages/user/bill/bill',
      images: '/images/icon3.png',
      text: '我的发票'
    }, {
      url: '',
      images: '/images/icon4.png',
      text: '我的客服'
    }, {
      url: '/pages/user/about_us/about_us',
      images: '/images/icon5.png',
      text: '关于知昇'
    }, {
      url: '/package/component1/pages/user/transfer_accounts/transfer_accounts',
      images: '/images/zhuangzhangxinxi.png',
      text: '银行转账信息',
    }, {
      url: '/pages/user/feedback/feedback',
      images: '/images/icon6.png',
      text: '意见反馈'
    },{
      url: '修改地址',
      images: '/images/icon1.png',
      text: '邮寄地址'
    }],
    listBtn: [{
      id: 0,
      images: '/images/p5.png',
      text: '全部订单'
    }, {
      id: 1,
      images: '/images/p1.png',
      text: '待付款'
    }, {
      id: 2,
      images: '/images/p2.png',
      text: '待处理'
    }, {
      id: 3,
      images: '/images/p3.png',
      text: '已完成'
    }, ],
    info: [],
    icon_Url: getApp().globalData.icon_Url,
    attest: '',
    in_server1: '',
    unpaid1: '',
    in_server2: '',
    unpaid2: '',
    show: false,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    active: 0,
    showActionsheet: false,
    groups: [{
      text: '代理人',
      value: 0
    }, {
      text: '普通用户',
      value: 1
    }, ],
    index: 1,
    err: true,
    remark: '',
    isClick: false,
    arry: [],
    list: {},
    user_type: 1,
    check_type: 0,
    IsShow: false,
    sliderBtn: ['商标订单', '专利订单', '版权订单'],
    animationData: '',
  },
  // 代理人中心
  toAgent(){
    var userid = wx.getStorageSync('userid');
    if (userid.length == 0) {
      
      return
    };
    wx.navigateTo({
      url: '/package/component1/pages/user/toAgent/toAgent',
    })
  },
  onColor() {
    // wx.navigateTo({
    //   url: '/package/component2/pages/patent_book/analysis/analysis',
    // })
    // return;
    func.colorCreate({
      'gradient': true,
      'number': 1000,
    }).then((res) => {
      this.setData({
        color: res,
      })
    })
  },
  onSwiper(e) {
    // console.log(e);
    var id = e.detail.current;
    var win = getApp().globalData.sysinfo.screenWidth;
    this.setData({
      active: id,
    });
    animation(id * win / 4)
  },
  onChangeSlider(e) {
    var id = e.currentTarget.dataset.id;
    var win = getApp().globalData.sysinfo.screenWidth;
    animation(id * win / 4);
    this.setData({
      active: id
    })
  },
  // 跳转签到页
  toSignIn(){
    if(this.data.flag){
      wx.navigateTo({
        url: '/package/component1/pages/user/signIn/signIn',
      })
    }
  },
  onDraw(e) {
    var id = e.currentTarget.dataset.id;
    var active = this.data.active;
    if (active == 0) {
      var url = "/pages/user/my_order/my_order?id=" + id
    };
    if (active == 1) {
      var url = "/pages/user/my_patent/my_patent?id=" + id
    };
    if (active == 2) {
      var url = "/pages/user/my_copyright/my_copyright?id=" + id
    };
    wx.navigateTo({
      url: url
    })
  },
  onShareDt() {
    var mobile = this.data.info.mobile;
    if (!mobile) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 3000,
      });
      return
    };
    wx.navigateTo({
      url: '/package/component1/pages/user/canvas/canvas',
    })
  },
  onWeb() {
    wx.navigateTo({
      url: '/package/component1/pages/user/web_view_news/web_view_news',
    })
  },
  onVip() {
    var userid_l = wx.getStorageSync('userid');
    var token_l = wx.getStorageSync('token');
    if (userid_l.length == 0 || token_l.length == 0 || userid_l == '' || token_l == '' || userid_l == null || token_l == null) {
          wx.navigateTo({
            url: '/pages/user/log_on/log_on',
          })
    } else {
      var user_type = this.data.user_type;
      if (user_type == 1) {
        wx.navigateTo({
          url: '/package/component1/pages/user/member/member',
        })
      } else if(user_type == 2){
        wx.showToast({
          title: '当前是代理人',
          icon: 'none',
          duration: 5000,
        })
      }else{
        wx.showToast({
          title: '您已开通白银会员',
          icon: 'none',
          duration: 5000,
        })
      }
    }
  },
  onoImg() {
    var mobile = this.data.info.mobile;
    if (!mobile) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 3000,
      });
      return
    };
    this.onUpimg()
  },
  onChange(e) {
    this.setData({
      active: e.detail.index
    })
  },
  goDt(e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    var userid = wx.getStorageSync('userid');
    if (userid.length == 0) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 5000,
      });
      return
    };
    if(id == '修改地址'){
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.address']) {
            wx.chooseAddress({
              success(res) {
                var consignee = res.userName;
                var mobile = res.telNumber;
                var province = res.provinceName;
                var city = res.cityName;
                var area = res.countyName;
                var address = res.detailInfo;
                NetworkRequest({
                  url: '/shippingAddress/addShippAddress',
                  data: {
                    user_id: userid,
                    token: token,
                    consignee: consignee,
                    mobile: mobile,
                    province: province,
                    city: city,
                    area: res.countyName,
                    address: address,
                    is_default: 2,
                  },
                  method: 'POST',
                }).then(res => {
                  Notify({
                    text: res.data.msg,
                    duration: 3000,
                    selector: '#custom-selector',
                    backgroundColor: '#f44',
                    color: '#fff',
                  })
                }).catch(err => {})
              }
            })
          } else {
            if (res.authSetting['scope.address'] == false) {
              wx.openSetting({
                success(res) {}
              })
            } else {
              wx.chooseAddress({
                success(res) {
                  var consignee = res.userName;
                  var mobile = res.telNumber;
                  var province = res.provinceName;
                  var city = res.cityName;
                  var area = res.countyName;
                  var address = res.detailInfo;
                  NetworkRequest({
                    url: '/shippingAddress/addShippAddress',
                    data: {
                      user_id: userid,
                      token: token,
                      consignee: consignee,
                      mobile: mobile,
                      province: province,
                      city: city,
                      area: res.countyName,
                      address: address,
                      is_default: 2,
                    },
                    method: 'POST',
                  }).then(res => {
                    Notify({
                      text: res.data.msg,
                      duration: 3000,
                      selector: '#custom-selector',
                      backgroundColor: '#f44',
                      color: '#fff',
                    })
                  }).catch(err => {})
                }
              })
            }
          }
        }
      })
    }else{
      wx.navigateTo({
        url: id,
      })
    }
  },
  onRegister(e) {
    wx.navigateTo({
      url: '/pages/user/log_on/log_on',
    })
  },
  notifySuccessful(res) {
    Notify({
      text: res,
      duration: 1500,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
  },
  toast() {
    Toast.loading({
      message: '上传中...',
      duration: 0,
    })
  },
  makePhone() {
    wx.makePhoneCall({
      phoneNumber: '4006302718',
    })
  },
  onAgent() {
    var userid = wx.getStorageSync('userid');
    if (userid.length == 0) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 5000,
      });
      return
    };
    var isClick = this.data.isClick;
    var arry = this.data.arry;
    if (!isClick) {
      wx.navigateTo({
        url: '/pages/user/means/agent/agent',
      })
    };
    if (arry) {
      this.data.list = {
        user_type: arry.user_type,
        business_license: arry.business_license,
        identity_card: arry.identity_card,
        check_type: arry.check_type,
        business_type: arry.business_type,
      };
      if (isClick) {
        wx.navigateTo({
          url: '/pages/user/means/agent/agent',
        })
      }
    } else {
      this.notifySuccessful('错误！')
    }
  },
  toPatent(){
    wx.navigateTo({
      url: '/package/component2/pages/patent_book/designCenter/designCenter',
    })
  },
  getZiliao() {
    var userArry = wx.getStorageSync('userArry');
    if (userArry) {
      this.setData({
        info: userArry
      });
    };
    NetworkRequest({
      url: '/usercenter',
      data: {},
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        if (arry.head_img) {
          if (arry.head_img.indexOf('//') == -1) {
            arry.head_img = this.data.icon_Url + arry.head_img
          }
        };
        this.data.arry = arry;
        wx.setStorageSync('userArry', arry);
        var user_type = arry.user_type;
        wx.setStorageSync('user_type', user_type);
        var check_type = arry.check_type;
        var remark = arry.remark ? arry.remark : '暂无';
        var IsShow = arry.user_type == undefined ? false : true;
        this.setData({
          IsShow: IsShow
        });
        if (user_type == 2) {
          var text = '代理人'
        } else {
          var text = '普通用户'
        };
        if (check_type == 0) {
          var status = '';
          var isClick = false
        };
        if (check_type == 1) {
          var status = '（待审核）';
          var isClick = true
        };
        if (check_type == 2) {
          var status = '';
          var isClick = false
        };
        if (check_type == 3) {
          var status = '（审核不通过）';
          var isClick = true
        };
        var groups = [{
          text: user_type == 1 ? '代理人' : text + status,
          value: 0
        }, {
          text: user_type == 2 ? '普通用户' : text + status,
          value: 1
        }, ];
        this.setData({
          err: check_type == 3 ? false : true,
          remark: check_type == 3 ? '审核不通过原因：' + remark : '',
          groups: groups,
          index: user_type == 2 ? 0 : 1,
          isClick: isClick,
          user_type: user_type,
          check_type: check_type,
          info: arry,
          show: true
        });
        var id = 1;
        if (res.data.data) {
          this.setData({
            [('in_server' + id)]: arry.in_server,
            [('unpaid' + id)]: arry.unpaid,
          })
        } else {
          this.setData({
            [('in_server' + id)]: 0,
            [('unpaid' + id)]: 0,
          })
        }
      };
      if (code == 2) {
        wx.removeStorageSync('userArry');
        wx.showToast({
          title: '登录失效，请重新登录',
          icon: 'none',
          duration: 3000,
        });
        this.setData({
          info: [],
          attest: '',
          dot: [],
          in_server1: '',
          unpaid1: '',
          show: false,
          check_type: 0,
        });
        wx.showToast({
          title: '登录失效，请重新登录',
          icon: 'none',
          duration: 3000,
        })
      }
    }).catch(err => {});
    wx.stopPullDownRefresh()
  },
  onSet(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      wx.navigateTo({
        url: '/pages/user/means/means',
      })
    } else {
      wx.navigateTo({
        url: '/pages/user/news/news',
      })
    }
  },
  notifySuccessful(res) {
    Notify({
      text: res,
      duration: 1500,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
  },
  onClick() {
    wx.navigateTo({
      url: '/pages/user/means/means',
    })
  },
  getAttest() {
    NetworkRequest({
      url: '/usercenter/attestationlst',
      data: {},
      method: 'POST',
    }).then(res => {
      // console.log(res);
      var attest = res.data.msg;
      if (res.data.code == 1) {
        this.setData({
          attest: attest,
        })
      }
    })
  },
  onChooseImg() {
    var _this = this;
    var url = _this.data.info.head_img;
    wx.showActionSheet({
      itemList: ['上传', '查看'],
      success(res) {
        // console.log(res.tapIndex);
        if (res.tapIndex == 1) {
          wx.previewImage({
            url: url,
            urls: [url],
          })
        } else {
          _this.onUpimg()
        }
      },
    })
  },
  onUpimg() {
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (res => {
        this.toast();
        const tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: main_Url + '/usercenter/upload_head',
          filePath: tempFilePaths[0],
          name: 'pic',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {
            user_id: userid,
            token: token,
          },
          success: (res => {
            this.notifySuccessful('上传成功');
            this.getZiliao()
          }),
          fail: (err => {
            this.notifySuccessful(err.err.errMsg)
          }),
          complete: (ss => {
            Toast.clear()
          }),
        })
      }),
    })
  },
  getDot() {
    NetworkRequest({
      url: '/patent/orderList',
      data: {
        page: 0,
        status: ''
      },
      method: 'POST',
    }).then(res => {
      var id = 2;
      if (res.data.data) {
        this.setData({
          [('in_server' + id)]: res.data.data.service_num,
          [('unpaid' + id)]: res.data.data.noPay_num,
        })
      } else {
        this.setData({
          [('in_server' + id)]: 0,
          [('unpaid' + id)]: 0,
        })
      }
    });
    NetworkRequest({
      url: '/copyRight/orderList',
      data: {
        page: 1,
        status: 1,
      },
      method: 'POST',
    }).then((res) => {
      var id = 3;
      if (res.data.data) {
        this.setData({
          [('in_server' + id)]: res.data.data.service_num,
          [('unpaid' + id)]: res.data.data.noPay_num,
        })
      } else {
        this.setData({
          [('in_server' + id)]: 0,
          [('unpaid' + id)]: 0,
        })
      }
    })
  },
  getData() {},
  onShop() {
    wx.navigateTo({
      url: '/pages/user/shop/shop',
    })
  },
  toReport(){
    wx.navigateTo({
      url: '/package/component2/pages/patent_book/designCenter/designCenter',
    })
  },
  tocoupon(){
    var userid = wx.getStorageSync('userid');
    if (userid.length == 0) {
      return
    };
    wx.navigateTo({
      url: '/pages/user/coupon/coupon',
    })
  },
  toIntegral(){
    var userid = wx.getStorageSync('userid');
    if (userid.length == 0) {
    
      return
    };
    wx.navigateTo({
      url: '/package/component1/pages/user/integral/integral',
    })
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
  },
  onShow: function () {
    if (!getApp().globalData.userid){
      this.setData({
        flag:false
      })
    }else{
      this.setData({
        flag:true
      })
    }
    this.getAttest();
    this.getDot();
    this.getZiliao();
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    if (_this.route == 'pages/user/user') {
      removeStorage();
      wx.showTabBar()
    }
  },
  onHide: function () {},
  onShareAppMessage: function () {
    return {
      title: '知昇(上海)人工智能科技有限公司，智能商标注册。',
      path: '/pages/user/user?mobile='+this.data.info.mobile
    }
  }
})