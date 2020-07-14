//首页语音跳转
import setTime from './select.js';
export default function nav(navUrl, type, that) {
  if (navUrl) {
    if (type == 1) {
      wx.navigateTo({
        url: navUrl,
      })
    }
    if (type == 2) {
      wx.switchTab({
        url: navUrl,
      })
    }
    if (type == 3) {
      that.onClose();
    }
    if (type == 1 || type == 2) {
      setTime(1000).then(res => {
        that.onClose();
      })
    }
    if (type == 4) {
      wx.hideTabBar();
      wx.makePhoneCall({
        phoneNumber: '4006302718',
        success: (res => {
          setTime(1000).then(res => {
            that.onClose();
          })
        }),
        fail: (res => {
          wx.hideTabBar();
        })
      })
    }
    if (type == 5) {
      setTime(1000).then(ss => {
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
                  wx.request({
                    url: getApp().globalData.main_Url + '/shippingAddress/addShippAddress',
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
                    header: {},
                    method: 'POST',
                    dataType: 'json',
                    responseType: 'text',
                    success: (res => {
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000,
                      })
                    }),
                  })
                }
              })
            } else {
              if (res.authSetting['scope.address'] == false) {
                wx.openSetting({
                  success(res) { }
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
                    wx.request({
                      url: getApp().globalData.main_Url + '/shippingAddress/addShippAddress',
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
                      header: {},
                      method: 'POST',
                      dataType: 'json',
                      responseType: 'text',
                      success: (res => {
                        wx.showToast({
                          title: res.data.msg,
                          icon: 'none',
                          duration: 2000,
                        })
                      }),
                    })
                  }
                })
              }
            }
          }
        })
        setTime(1000).then(res => {
          that.onClose();
        })
      })
    }
  }
}