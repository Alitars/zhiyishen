import Toast from '../dist/toast/toast';
import Notify from '../dist/notify/notify';
import setTime from './setTime.js';
export default function wpquest(res) {
  return new Promise((resolve, reject) => {
    var pages = getCurrentPages();
    var route = pages[pages.length - 1].route;
    var userid_l = wx.getStorageSync('userid');
    var token_l = wx.getStorageSync('token');
    if (userid_l.length == 0 || token_l.length == 0 || userid_l == '' || token_l == '' || userid_l == null || token_l == null) {
      // console.log(route);
      if (route !== 'pages/index/index' && route !== 'pages/services/services' && route !== 'pages/knowledge/knowledge' && route !== 'pages/user/user' && route !== 'pages/user/log_on/log_on') {
        Notify({
          text: '登录失效，请重新登录！',
          duration: 5000,
          selector: '#custom-selector',
          backgroundColor: '#f44',
          color: '#fff',
        });
        var time = Math.floor(Math.random() * (1000 - 300)) + Math.floor(Math.random() * (1000 - 300)) + Math.floor(Math.random() * (1000 - 300)) + Math.floor(Math.random() * (1000 - 300)) + 2000;
        // console.log(time);
        setTime(time).then(s => {
          var pages = getCurrentPages();
          var arry = [];
          for (var i = 0; i < pages.length; i++) {
            arry.push(pages[i].route);
          };
          if (arry.indexOf('pages/user/log_on/log_on') == -1) {
            wx.navigateTo({
              url: '/pages/user/log_on/log_on',
            });
          };
        });
      };
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
          wx.hideToast();
          var obj1 = res.data;
          obj1.user_id = getApp().globalData.userid;
          obj1.token = getApp().globalData.token;
          var obj2 = {
            channelroad: 4,
          };
          var obj3 = {
            ...obj1,
            ...obj2
          };
          // var u1 = getApp().globalData.wp_Url + res.url;
          wx.request({
            url: getApp().globalData.wp_Url + res.url,
            data: obj3 || {},
            header: {},
            method: res.method || 'GET',
            success: (res => {
              // console.log(u1);
              // console.log(obj3);
              // console.log(res);
              Toast.clear();
              if (res.statusCode !== 200) {
                Notify({
                  text: 'fail：' + ' ' + 'statusCode：' + +res.statusCode,
                  duration: 5000,
                  selector: '#custom-selector',
                  backgroundColor: '#f44',
                  color: '#fff',
                })
              } else {
                resolve(res)
              };
              wx.stopPullDownRefresh();
              if (res.data.code == 2) {

              }
            }),
            fail: (err => {
              if (err.errMsg == 'request:fail timeout') {
                var toast = '网络已超时，请稍后重试哦~'
              } else {
                var toast = err.errMsg;
              };
              Notify({
                text: toast,
                duration: 3000,
                selector: '#custom-selector',
                backgroundColor: '#f44',
                color: '#fff',
              })
              Toast.clear();
              wx.stopPullDownRefresh();
            }),
          })
        }
      })
    })
  })
}