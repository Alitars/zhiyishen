import Notify from '../../../../dist/notify/notify';
import NetworkRequest from '../../../../template/network.js';
import Toast from '../../../../dist/toast/toast';
import setTime from '../../../../template/setTime.js';
Page({
  data: {
    adress: [],
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    height: getApp().globalData.menu.height + getApp().globalData.menu.top,
  },
  onBack(){
    wx.navigateBack({
      delta: 1,
    })
  },
  changeAdress(e){
    var adressid = e.currentTarget.dataset.id;
    NetworkRequest({
      url: '/order/orderEditAddress',
      data: {
        address_id: adressid,
        token: wx.getStorageSync('token'),
        user_id: wx.getStorageSync('userid'),
        order_id:this.data.id
      },
    }).then(res=>{
      var pages = getCurrentPages();
      var PrePage = pages[pages.length - 2];
      if(res.data.code == 1){
        PrePage.onPullDownRefresh()
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  // onSet(e) {
  //   this.toast();
  //   var userid = wx.getStorageSync('userid');
  //   var token = wx.getStorageSync('token');
  //   var id = e.currentTarget.dataset.id;
  //   NetworkRequest({
  //     url: '/shippingAddress/defaultShippAddress',
  //     data: {
  //       id: id,
  //       token: token,
  //       user_id: userid,
  //     },
  //   }).then(res => {
  //     var code = res.data.code;
  //     if (code == 1) {
  //       this.getAdress();
  //       Toast.clear();
  //       this.notify(res.data.msg);
  //     }
  //   }).catch(err => {
  //     Toast.clear();
  //   })

  // },
  onAdress() {
    var that = this;
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
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
                that.notify(res.data.msg);
                that.getAdress();
              }).catch(err => { })
            }
          })

        } else {
          if (res.authSetting['scope.address'] == false) {
            wx.openSetting({
              success(res) {


              }
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
                  that.notify(res.data.msg);
                  that.getAdress();
                }).catch(err => { })
              }
            })
          }
        }
      }
    })
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },
  notify(res) {
    Notify({
      text: res,
      duration: 1000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
  },
  getAdress() {
    this.toast();
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/shippingAddress/shippAddressList',
      data: {
        user_id: userid,
        token: token,
      },
    }).then(res => {
      var code = res.data.code;
      var arry = res.data.data;
      if (code == 1) {
        if (arry) {
          this.setData({
            adress: arry,
          })
        } else {
          this.setData({
            adress: [],
          })
        }
      };
      if (code == 2) {
        this.notify(res.data.msg);
        setTime().then(res => {
          wx.navigateTo({
            url: '/pages/user/log_on/log_on',
          })
        });
      };
      Toast.clear();
      wx.stopPullDownRefresh();
    }).catch(err => {
      Toast.clear();
      wx.stopPullDownRefresh();
    })
  },

  onDelet(e) {
    this.toast();
    var id = e.currentTarget.dataset.id;
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/shippingAddress/delShippAddress',
      data: {
        id: id,
        token: token,
      },
    }).then(res => {
      Toast.clear();
      var code = res.data.code;
      if (code == 1) {
        this.getAdress();
      };
      if (code == 2) {
        this.notify(res.data.msg);
        setTime().then(res => {
          wx.navigateTo({
            url: '/pages/user/log_on/log_on',
          })
        });
      };
    }).catch(err => {
      Toast.clear();
    })
  },
  onLoad: function(options) {
    this.setData({
      id:options.id
    })
    this.getAdress();
  },
  onPullDownRefresh: function() {
    this.getAdress();
  },
})