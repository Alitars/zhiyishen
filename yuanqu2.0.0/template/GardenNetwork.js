import Toast from '../dist/toast/toast';
import Notify from '../dist/notify/notify';
import onToken from "./onToken.js";
const isCesi = getApp().globalData.isCesi;
export default function NetworkRequest(res) {
  return new Promise((resolve, reject) => {
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    var route = pages[pages.length - 1].route;
    wx.getNetworkType({
      success: (ss => {
        if (ss.networkType == "none") {
          wx.showToast({
            title: '网络似乎已断开，请检查网络后重试哦~',
            icon: 'none',
            duration: 5000000,
          });
          wx.stopPullDownRefresh();
          Toast.clear();
          return
        } else {
          wx.hideToast();
          var obj1 = res.data;
          obj1.user_id = getApp().globalData.userid;
          obj1.token = getApp().globalData.token;
          obj1.park_name = obj1.park_name ? obj1.park_name : getApp().globalData.YQNAME;
          obj1.text = obj1.text ? obj1.text : getApp().globalData.YQNAME;
          var obj2 = {
            channelroad: 4,
          };
          var obj3 = {
            ...obj1,
            ...obj2
          };
          wx.setNavigationBarTitle({
            // title: getApp().globalData.YQNAME ? getApp().globalData.YQNAME + '经济开发区' : '园区系统',
            title: getApp().globalData.YQNAME ? ( getApp().globalData.YQNAME == '羚跑家园' ? getApp().globalData.YQNAME + '知识产权':getApp().globalData.YQNAME + '经济开发区') : '园区系统',
          });
          var u1 = getApp().globalData.yq_Url + res.url;
          wx.request({
            url: getApp().globalData.yq_Url + res.url,
            data: obj3 || {},
            header: {},
            method: res.method || 'GET',
            success: (res => {
              if (isCesi) {
                console.log(u1);
                console.log(obj3);
                console.log(res)
              };
              Toast.clear();
              if (res.statusCode !== 200) {
                wx.hideLoading();
                wx.showToast({
                  title: 'fail： statusCode：' + +res.statusCode,
                  icon: 'none',
                  duration: 5000,
                });
                resolve(res);
                if (res.data.code == 2 && res.data.msg == '请先登录') {
                  wx.removeStorageSync('userid');
                  wx.removeStorageSync('token');
                  getApp().globalData.userid = "";
                  getApp().globalData.token = ""
                };
                var userid = wx.getStorageSync('userid');
                var token = wx.getStorageSync('token');
                var YQNAME = wx.getStorageSync('YQNAME');
                var ISAGENT = wx.getStorageSync('ISAGENT');
                if (userid.length == 0 || token.length == 0 || userid == '' || token == '' || userid == null || token == null || userid.length == 0 || userid == undefined || token == undefined || ISAGENT == null || ISAGENT == undefined || ISAGENT.length == 0 || ISAGENT == '' || YQNAME == null || YQNAME == undefined || YQNAME.length == 0 || YQNAME == '') {
                  if (route == 'pages/index/index' || route == 'pages/services/services' || route == 'pages/user/shop/shop' || route == 'pages/user/user' || route == 'pages/index/index' || route == 'pages/user/log_on/apple_id/apple_id' || route == 'pages/shop/shop' || route == 'pages/knowledge/knowledge' || route == 'pages/user/user' || route == 'pages/user/log_on/log_on' || route == 'pages/user/log_on/bond/bond' || route == 'pages/shops/shops' || route == 'pages/shop/shop' || route == 'pages/user/log_on/bind/bind' || route == 'pages/user/log_on/register/register' || route == 'pages/user/log_on/forget/forget' || route == 'pages/user/means/means/field/field') { } else {
                    wx.showModal({
                      title: '提示',
                      content: '您还没有登录',
                      confirmColor: "#277cfb",
                      confirmText: '去登录',
                      cancelText: '暂不登录',
                      success: (res => {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '/pages/user/log_on/log_on',
                          })
                        }
                      })
                    })
                  }
                  return
                }
                Notify({
                  text: '错误： statusCode：' + +res.statusCode,
                  duration: 5000,
                  selector: '#custom-selector',
                  backgroundColor: '#f44',
                  color: '#fff',
                })
              } else {
                resolve(res);
                if (res.data.code == 0 || res.data.code == '0' || !res.data.data) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 4000,
                  })
                }
              };
              wx.stopPullDownRefresh()
            }),
            fail: (err => {
              if (err.errMsg == 'request:fail timeout') {
                var toast = '网络已超时，请稍后重试哦~'
              } else {
                var toast = err.errMsg
              };
              Notify({
                text: toast,
                duration: 3000,
                selector: '#custom-selector',
                backgroundColor: '#f44',
                color: '#fff',
              });
              Toast.clear();
              wx.stopPullDownRefresh()
            }),
          })
        }
      })
    })
  })
}