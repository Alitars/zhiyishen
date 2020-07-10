const main_Url = getApp().globalData.main_Url;
import NetworkRequest from '../../../template/network.js';
import Toast from '../../../dist/toast/toast';
import Notify from '../../../dist/notify/notify';
import Dialog from '../../../dist/dialog/dialog';
import applyType from '../../../template/template.js';
const userid = wx.getStorageSync('userid');
const token = wx.getStorageSync('token');
import setTime from '../../../template/setTime.js';
Page({
  data: {
    info: [],
    icon_Url: getApp().globalData.icon_Url,
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    show: "",
    actions: [{
      text: '男',
      value: 0
    }, {
      text: '女',
      value: 1
    }, ],
    voiceArry: [],
    openId: '',
    checked: true,
    indexArry: {},
    severArry: [],
    tost: 0,
    isVoice: true,
    showActionsheet: false,
    groups: [{
        text: '代理人',
        value: 0
      },
      {
        text: '普通用户',
        value: 1
      },
    ],
    index: 1,
    err: true,
    remark: '',
    isClick: false,
    arry: [],
    list: {},
    user_type:1,
    check_type:0,
  },

  onSwitch() {
    var checked = this.data.checked;
    if (checked) {
      this.setData({
        checked: false,
      });
      Toast('已关闭');
      wx.setStorageSync('isVoice', false);
    } else {
      this.setData({
        checked: true,
      });
      Toast('已开启');
      wx.setStorageSync('isVoice', true);
    }
  },
  onClear() {
    Dialog.confirm({
      title: '提示',
      message: '是否清除本地缓存？'
    }).then(() => {
      // wx.clearStorage();
      // wx.removeStorageSync('key')
      wx.removeStorageSync('userArry');
      wx.removeStorageSync('userid');
      wx.removeStorageSync('token');
      Toast('清除成功');
      wx.setStorageSync('token', getApp().globalData.token);
      wx.setStorageSync('userid', getApp().globalData.userid);
    }).catch(() => {});
  },

  btnClick(e) {
    var index = e.detail.index;
    if (index == 0) {
      wx.navigateTo({
        url: '/pages/user/means/agent/agent',
      })
    } else {

    };
    this.setData({
      showActionsheet: false,
    })
  },
  onQuit() {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    this.data.voiceArry = wx.getStorageSync('voiceArry');
    this.data.openId = wx.getStorageSync('openId');
    this.data.indexArry = wx.getStorageSync('indexArry');
    this.data.severArry = wx.getStorageSync('severArry');
    this.data.tost = wx.getStorageSync('tost');
    this.data.isVoice = wx.getStorageSync('isVoice');
    getApp().globalData.userid = "";
    getApp().globalData.token = "";
    // wx.removeStorageSync();
    wx.removeStorageSync('userArry');
    wx.removeStorageSync('userid');
    wx.removeStorageSync('token');
    PrePage.setData({
      info: [],
      attest: '',
      in_server: 0,
      unpaid: 0,
      show: false,
      groups: [{
        text: '代理人',
        value: 0
      },
      {
        text: '普通用户',
        value: 1
      },
      ],
      index: 1,
      err: true,
      remark: '',
      isClick: false,
      arry: [],
      list: {},
      user_type: 1,
      check_type: 0,
    });
    wx.setStorageSync('applyType', applyType.applyType);
    wx.setStorageSync('voiceArry', this.data.voiceArry);
    wx.setStorageSync('openId', this.data.openId);
    wx.setStorageSync('indexArry', this.data.indexArry);
    wx.setStorageSync('severArry', this.data.severArry);
    wx.setStorageSync('tost', this.data.tost);
    wx.setStorageSync('isVoice', this.data.isVoice);
    wx.navigateBack({
      delta: 1,
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
            this.notifySuccessful('上传成功！');
            var imgUrls = JSON.parse(res.data).data.head_img
            this.setData({
              ["info.head_img"]: this.data.icon_Url + imgUrls,
            })
            var pages = getCurrentPages();
            var PrePage = pages[pages.length - 2];
            PrePage.onShow();
          }),
          fail: (err => {
            this.notifySuccessful('上传失败！')
          }),
          complete: (ss => {
            Toast.clear()
          }),
        })
      }),
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
      wx.openSetting({})
    } else {
      wx.navigateTo({
        url: '/pages/user/news/news',
      })
    }
  },
  notifySuccessful(res) {
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
    });
  },
  onAdress() {
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
  },
  getData() {
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/usercenter',
      data: {
        user_id: userid,
        token: token,
      },
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        if (res.data.data.head_img) {
          if (res.data.data.head_img.indexOf('//') == -1) {
            res.data.data.head_img = this.data.icon_Url + res.data.data.head_img
          };
        };
        // var arry = res.data.data;
        // this.data.arry = arry;
        // var user_type = arry.user_type;
        // var check_type = arry.check_type;
        // var remark = arry.remark;
        // if (user_type == 2) {
        //   var text = '代理人';
        //   // var isClick = false;
        // } else {
        //   var text = '普通用户';
        //   // var isClick = true;
        // };
        // if (check_type == 0) {
        //   var status = '';
        //   var isClick = false;
        // };
        // if (check_type == 1) {
        //   var status = '（待审核）';
        //   var isClick = true;
        // };
        // if (check_type == 2) {
        //   var status = '';
        //   var isClick = false;
        // };
        // if (check_type == 3) {
        //   var status = '（审核不通过）';
        //   var isClick = true;
        // };
        // var groups = [{
        //     text: user_type == 1 ? '代理人' : text + status,
        //     value: 0
        //   },
        //   {
        //     text: user_type == 2 ? '普通用户' : text + status,
        //     value: 1
        //   },
        // ];
        this.setData({
          info: res.data.data,
          // err: check_type == 3 ? false : true,
          // remark: check_type == 3 ? '审核不通过原因：' + remark : '',
          // groups: groups,
          // index: user_type == 2 ? 0 : 1,
          // isClick: isClick,
          // user_type:user_type,
          // check_type: check_type,
        });
      };

      if (code == 2) {
        // this.notifySuccessful('登录失效，请重新登录！');
        setTime(2000).then(res => {
          wx.navigateBack({
            complete: (res) => {},
            delta: 1,
            fail: (res) => {},
            success: (res) => {},
          })
          // wx.redirectTo({
          //   url: '/pages/user/log_on/log_on',
          // })
        })
      }
    }).catch(err => {});
    wx.stopPullDownRefresh()
  },
  onAgent() {
    var isClick = this.data.isClick;
    var arry = this.data.arry;
    if (!isClick && arry.check_type !== 2) {
      // this.setData({
      //   showActionsheet: true,
      // });
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
      this.notifySuccessful('错误！');
    };
  },
  onSex(sex) {
    NetworkRequest({
      url: '/usercenter/changesex',
      data: {
        user_id: userid,
        sex: sex,
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        this.notifySuccessful("修改成功");
        this.setData({
          ["info.sex"]: sex,
        });
      } else {
        this.notifySuccessful(res.data.msg);
      };
    }).catch(err => {
    })
  },
  onClose() {
    this.setData({
      show: true
    });
  },
  btnClickSix(e) {
    this.onSelect(e.detail.value);
  },
  onSelect(event) {
    this.onSex(event);
    this.setData({
      show: false
    });
  },
  onChange(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/user/means/means/field/field?id=' + id,
    })
  },
  onResetting() {
    wx.navigateTo({
      url: '/pages/user/log_on/forget/forget?tab=' + true,
    });
  },
  onShow: function() {
    this.getData();
    this.setData({
      checked: wx.getStorageSync('isVoice')
    })
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    PrePage.onShow();
  },
  onPullDownRefresh: function() {
    this.getData();
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    PrePage.onShow();
  },

})