import Toast from '../dist/toast/toast';
import Notify from '../dist/notify/notify';
import setTime from "./setTime";
// import route from "./route.js";
const isCesi = getApp().globalData.isCesi;
wx.setNavigationBarTitle({
  // title: getApp().globalData.YQNAME ? getApp().globalData.YQNAME + '经济开发区' : '园区系统',
  title: getApp().globalData.YQNAME ? ( getApp().globalData.YQNAME == '羚跑家园' ? getApp().globalData.YQNAME + '知识产权':getApp().globalData.YQNAME + '经济开发区') : '园区系统',
});
export default function NetworkRequest(res) {
  return new Promise((resolve, reject) => {
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    var route = pages[pages.length - 1].route;
    var userid_l = wx.getStorageSync('userid');
    var token_l = wx.getStorageSync('token');
    if (userid_l.length == 0 || token_l.length == 0 || userid_l == '' || token_l == '' || userid_l == null || token_l == null) {
      if (route !== 'pages/user/log_on/bound/bound' && route !== 'pages/index/index' && route !== 'pages/services/services' && route !== 'pages/user/log_on/apple_id/apple_id' && route !== 'pages/knowledge/knowledge' && route !== 'pages/user/user' && route !== 'pages/user/log_on/log_on' && route !== 'pages/shops/shops' && route !== 'pages/user/shop/shop' && route !== 'pages/user/log_on/bind/bind' && route !== 'pages/user/log_on/register/register' && route !== 'pages/user/log_on/forget/forget' && route !== 'pages/user/means/means/field/field' && route !== 'package/component/pages/knowledge/admin/admin') {
        console.log(route);
        wx.showToast({
          title: '登录失效，请重新登录',
          icon: 'none',
          duration: 5000,
        });
        var time = Math.floor(Math.random() * (1000 - 300)) + Math.floor(Math.random() * (1000 - 300)) + Math.floor(Math.random() * (1000 - 300)) + Math.floor(Math.random() * (1000 - 300)) + 2000;
        setTime(time).then(s => {
          var pages = getCurrentPages();
          var arry = [];
          for (var i = 0; i < pages.length; i++) {
            arry.push(pages[i].route)
          };
          if (arry.indexOf('pages/user/log_on/log_on') == -1) {
            wx.navigateTo({
              url: '/pages/user/log_on/log_on',
            })
          }
        })
      }
    };
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
          var obj1 = res.data;
          obj1.user_id = getApp().globalData.userid;
          obj1.token = getApp().globalData.token;
          obj1.park_name = getApp().globalData.YQNAME;
          var obj2 = {
            channelroad: 4,
          };
          var obj3 = {
            ...obj1,
            ...obj2
          };
          var u1 = getApp().globalData.main_Url + res.url;
          wx.request({
            url: getApp().globalData.main_Url + res.url,
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
              if (res.data.code == 0 && res.data.msg !== '未认证') {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 4000,
                })
              }
              if (res.statusCode !== 200) {
                wx.hideLoading();
                wx.showToast({
                  title: 'fail： statusCode：' + +res.statusCode,
                  icon: 'none',
                  duration: 5000,
                })
                resolve(res);

              } else {
                resolve(res);
                if (res.data.code == 2 && res.data.msg == '请先登录') {
                  wx.removeStorageSync('userid');
                  wx.removeStorageSync('token');
                  wx.removeStorageSync('ISAGENT');
                  getApp().globalData.userid = "";
                  getApp().globalData.token = "";
                  if (route !== 'pages/index/index' && route !== 'pages/services/services' && route !== 'pages/user/log_on/apple_id/apple_id' && route !== 'pages/knowledge/knowledge' && route !== 'pages/user/user' && route !== 'pages/user/log_on/log_on' && route !== 'pages/shops/shops' && route !== 'pages/user/shop/shop' && route !== 'pages/user/log_on/bind/bind' && route !== 'pages/user/log_on/register/register' && route !== 'pages/user/log_on/forget/forget' && route !== 'pages/user/means/means/field/field' && route !== 'package/component/pages/knowledge/admin/admin') {
                    wx.showToast({
                      title: '登录失效，请重新登录',
                      icon: 'none',
                      duration: 4000,
                    })
                  }
                };
              }
            }),
            fail: (err => {
              Toast.clear();
              wx.stopPullDownRefresh();
              if (err.errMsg == 'request:fail timeout') {
                var toast = '网络已超时，请稍后重试哦~'
              } else {
                var toast = err.errMsg
              };
              wx.showToast({
                title: toast,
                icon: 'none',
                duration: 3000,
              });
              Notify({
                text: toast,
                duration: 3000,
                selector: '#custom-selector',
                backgroundColor: '#f44',
                color: '#fff',
              });
              reject(err);
              wx.hideLoading()
            }),
          })
        }
      })
    })
  })
}