const main_Url = getApp().globalData.main_Url;
import NetworkRequest from '../../../template/network.js';
import Toast from '../../../dist/toast/toast';
import Notify from '../../../dist/notify/notify';
import Dialog from '../../../dist/dialog/dialog';
import applyType from '../../../template/template.js';
const userid = wx.getStorageSync('userid');
const token = wx.getStorageSync('token');
import setTime from '../../../template/setTime.js';
import remove from '../../../template/remove.js'
Page({
  data: {
    info: [],
    icon_Url: getApp().globalData.icon_Url,
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    show: "",
    actions: [{
        name: '男'
      },
      {
        name: '女'
      },
    ],
    voiceArry: [],
    openId: '',
    checked: true,
    indexArry: {},
    severArry: [],
    tost: 0,
    isVoice: true,
  },
  onSwitch() {
    var checked = this.data.checked;
    if (checked) {
      this.setData({
        checked: false,
      })
      Toast('已关闭');
      wx.setStorageSync('isVoice', false);
    } else {
      this.setData({
        checked: true,
      })
      Toast('已开启');
      wx.setStorageSync('isVoice', true);
    }
  },
  onClear() {
    Dialog.confirm({
      title: '提示',
      message: '是否清除本地缓存？'
    }).then(() => {
      // wx.clearStorageSync();
      Toast('清除成功');
      wx.removeStorageSync('userArry');
      wx.setStorageSync('token', getApp().globalData.token);
      wx.setStorageSync('userid', getApp().globalData.userid);
    }).catch(() => {});

  },
  onQuit() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      info: [],
      attest: '',
      in_server: 0,
      unpaid: 0,
      show: false,
    })
    // wx.clearStorageSync();
    wx.removeStorageSync('token');
    wx.removeStorageSync('userid');
    getApp().globalData.arry = [];
    getApp().globalData.list = [];
    getApp().globalData.title = [];
    getApp().globalData.recommentArry = [];
    getApp().globalData.userid = '';
    getApp().globalData.token = '';
    getApp().globalData.ISAGENT = '';
    getApp().globalData.YQNAME = '';
    wx.navigateBack({
      delta: 1,
    })
  },
  onUpimg() {
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
            this.notifyOk('上传成功');
            var imgUrls = JSON.parse(res.data).data.head_img;
            this.setData({
              ["info.head_img"]: this.data.icon_Url + imgUrls,
            })
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];
            prevPage.onShow();
          }),
          fail: (err => {
            this.notifyOk('上传失败')
          }),
          complete: (res => {
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
      wx.openSetting({

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
                //  Toast(res.data.msg);
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
      if (res.data.data.head_img) {
        if (res.data.data.head_img.indexOf('//') == -1) {
          res.data.data.head_img = this.data.icon_Url + res.data.data.head_img
        };
      };
      this.setData({
        info: res.data.data,
      });
    }).catch(err => {})
    wx.stopPullDownRefresh()
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
        this.notifyOk("修改成功");
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.onShow();
        this.setData({
          ["info.sex"]: sex,
        });
      } else {
        this.notifyOk(res.data.msg);
      };
    }).catch(err => {
      this.notifyOk("请求失败");
    })
  },
  onClose() {
    this.setData({
      show: !this.data.show
    });
  },
  onSelect(event) {
    if (event.detail.name == "男") {
      this.onSex(0);
    } else {
      this.onSex(1);
    };
    this.onClose();
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
    });
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.onShow();
  },
})