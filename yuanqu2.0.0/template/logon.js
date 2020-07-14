//判断登录
import Dialog from '../dist/dialog/dialog';
import onToken from "./onToken.js";
import NetworkRequest from './network.js';
export default function logoCheck(that) {
  var userid = wx.getStorageSync('userid');
  var token = wx.getStorageSync('token');
  var YQNAME = wx.getStorageSync('YQNAME');
  var ISAGENT = wx.getStorageSync('ISAGENT');
  var pages = getCurrentPages();
  var route = pages[pages.length - 1].route;
  NetworkRequest({
    url: '/usercenter',
    data: {
      user_id: getApp().globalData.userid,
      token: getApp().globalData.token,
    },
  }).then(res => {
    if (res.data.code == 2) {
      onToken()
    }
  });
  if (userid.length == 0 || token.length == 0 || userid == '' || token == '' || userid == null || token == null || userid.length == 0 || userid == undefined || token == undefined || ISAGENT == null || ISAGENT == undefined || ISAGENT.length == 0 || ISAGENT == '' || YQNAME == null || YQNAME == undefined || YQNAME.length == 0 || YQNAME == '') {
    onToken();
    console.log(route,'sdsuihdisyduis');
    if (route == 'pages/index/index' || route == 'pages/services/services' || route == 'pages/user/shop/shop' || route == 'pages/user/user' || route == 'pages/index/index' && route == 'pages/user/log_on/apple_id/apple_id' && route == 'pages/shop/shop' && route == 'pages/knowledge/knowledge' && route == 'pages/user/user' && route == 'pages/user/log_on/log_on' && route == 'pages/shops/shops' && route == 'pages/shop/shop' && route == 'pages/user/log_on/bind/bind' && route == 'pages/user/log_on/register/register' && route == 'pages/user/log_on/forget/forget' && route == 'pages/user/means/means/field/field') {
      // return;
    } else {
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
  }
  that.setData({
    titlename: getApp().globalData.YQNAME ? ( getApp().globalData.YQNAME == '羚跑家园' ? getApp().globalData.YQNAME + '知识产权':getApp().globalData.YQNAME + '经济开发区') : '园区系统',
  })
}