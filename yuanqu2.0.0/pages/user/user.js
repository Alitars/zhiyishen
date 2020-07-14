const main_Url = getApp().globalData.main_Url;
import Toast from '../../dist/toast/toast';
import Notify from '../../dist/notify/notify';
import NetworkRequest from '../../template/network.js';
import CopyrightRequest from '../../template/copyright'
import onToken from '../../template/onToken.js';
import remove from '../../template/remove.js';
import route from '../../template/route.js';
import logoCheck from '../../template/logon.js';
import animated from '../../template/animation.js';
Page({
  data: {
    ISAGENT: 3,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    userBtn: [{
      url: 'pages/user/attest/attest',
      images: '/images/icon1.png',
      text: '我的认证'
    }, {
      url: 'pages/user/commission_agent/commission_agent',
      images: '/images/dailishang.png',
      text: '园区代理商'
    }, {
      url: 'pages/user/bill/bill',
      images: '/images/icon3.png',
      text: '我的发票'
    }, {
      url: 'pages/user/means/means',
      images: '/images/moreset.png',
      text: '更多设置'
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
    // in_server: '',
    // unpaid: '',
    show: false,
    tabbar: {},
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    active: 0,
    animationData: '',
  },
  onGS() {
    wx.navigateTo({
      url: '/package/component/pages/knowledge/business_name/business_name',
    })
  },
  onChangeSlider(e) {
    var id = e.currentTarget.dataset.id;
    // if (id > 0) {
    //   Toast('敬请期待');
    //   return
    // };
    animated(id * 350 / 3);
    this.setData({
      active: id
    })
  },
  onSwiper(e) {
    var id = e.detail.current;
    this.setData({
      active: id,
    });
    animated(id * 350 / 3)
  },
  onRegister() {
    wx.navigateTo({
      url: '/pages/user/log_on/log_on',
    })
  },
  onoImg() {
    var mobile = this.data.info.mobile;
    if (!mobile) {
      wx.showToast({
        title: '登录后查看',
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
  onDraw(e) {
    var id = e.currentTarget.dataset.id;
    // var type = this.data.type;
    // var id = e.currentTarget.dataset.id;
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
  goDt(e) {
    var id = e.currentTarget.dataset.id;
    console.log(getApp().globalData.userid, 'getApp().globalData.userid');
    if (!getApp().globalData.userid) {
      Toast('请登录');
      return
    };
    route(id)
  },
  onRegister(e) {
    wx.navigateTo({
      url: '/pages/user/log_on/log_on',
    })
  },
  notifyOk(res) {
    Notify({
      text: res,
      duration: 3000,
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
  getData() {
    var userArry = wx.getStorageSync('userArry');
    if (userArry) {
      info: userArry
    };
    NetworkRequest({
      url: '/usercenter',
      data: {},
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        if (res.data.data.head_img) {
          if (res.data.data.head_img.indexOf('//') == -1) {
            res.data.data.head_img = this.data.icon_Url + res.data.data.head_img
          }
        };
        wx.setStorageSync('userArry', res.data.data);
        var id = 1;
        // console.log(res.data.data.service_num)
        this.setData({
          info: res.data.data,
          show: true,
          [('in_server' + id)]: res.data.data.in_server,
          [('unpaid' + id)]: res.data.data.unpaid,
        })
      }
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
          show: false
        });
        logoCheck(this)
      };
      wx.stopPullDownRefresh()
    })
  },
  makePhone() {
    wx.makePhoneCall({
      phoneNumber: '4006302718',
    })
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
  notifyOk(res) {
    Notify({
      text: res,
      duration: 3000,
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
      var attest = res.data.msg;
      if (res.data.code == 1) {
        this.setData({
          attest: attest,
        })
      }
    }).catch((err) => {
      this.setData({
        attest: ''
      })
    })
  },
  onUpimg() {
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
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
            wx.showToast({
              title: '上传成功',
              icon: 'none',
              duration: 3000,
            });
            if (typeof (res.data) == 'string') {
              var imgUrls = JSON.parse(res.data).data.head_img
            } else {
              var imgUrls = res.data.data.head_img
            };
            this.setData({
              ["info.head_img"]: this.data.icon_Url + imgUrls,
            })
          }),
          fail: (err => {
            wx.showToast({
              title: '上传失败',
              icon: 'none',
              duration: 3000,
            })
          }),
          complete: (ss => {
            Toast.clear()
          }),
        })
      }),
    })
  },
  getDot() {
    // NetworkRequest({
    //   url: '/usercenter',
    //   data: {},
    // }).then(res => {
    //   if (res.data.data) {
    //     var id = 1;
    //     // this.setData({
    //     //   in_server: res.data.data.in_server,
    //     //   unpaid: res.data.data.unpaid,
    //     // })
    //     this.setData({
    //       [('in_server' + id)]: res.data.data.service_num,
    //       [('unpaid' + id)]: res.data.data.noPay_num,
    //     })
    //   }
    // })

    CopyrightRequest({
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
    })
    CopyrightRequest({
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
  goBanck() {
    wx.navigateTo({
      url: '/package/component/pages/user/transfer_accounts/transfer_accounts',
    })
  },
  onLoad: function () {},
  onShow: function () {
    this.setData({
      ISAGENT: (wx.getStorageSync('ISAGENT') ? wx.getStorageSync('ISAGENT') : 3)
    });
    this.getData();
    this.getAttest();
    this.getDot()
  },
})