import onToken from './onToken.js';
import NetworkRequest from './network.js';
export default function remove() {
  wx.setStorageSync('is_design', 2);
  wx.removeStorageSync('groups');
  wx.setStorageSync('backType', 1);
  wx.removeStorageSync('applyType');
  wx.setStorageSync('order_back_type', 1);
  wx.removeStorageSync('brand_type');
  wx.removeStorageSync('options');
  var isVoice = wx.getStorageSync('isVoice');
  if (isVoice.length == 0) {
    wx.setStorageSync('isVoice', true)
  } else {
    wx.setStorageSync('isVoice', isVoice)
  }
  var userid = wx.getStorageSync('userid');
  var token = wx.getStorageSync('token');
  getApp().globalData.arry = [];
  getApp().globalData.list = [];
  getApp().globalData.title = [];
  getApp().globalData.recommentArry = [];
}