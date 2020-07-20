import NetworkRequest from './network.js';
export default function removeStorage() {
  wx.setStorageSync('is_design', 2);
  wx.removeStorageSync('groups');
  wx.setStorageSync('backType', 1);
  wx.removeStorageSync('applyType');
  wx.removeStorageSync('isShowTusiF');
  wx.setStorageSync('order_back_type', 1);
  wx.removeStorageSync('brand_type');
  wx.removeStorageSync('options');
  var isVoice = wx.getStorageSync('isVoice');
  if (isVoice.length == 0) {
    wx.setStorageSync('isVoice', true);
  } else {
    wx.setStorageSync('isVoice', isVoice);
  };
  getApp().globalData.arry = [];
  // getApp().globalData.list = [];
  getApp().globalData.title = [];
  getApp().globalData.historyArryIcon = [];
  getApp().globalData.recommentArry = [];
  NetworkRequest({
    url: '/usercenter',
    data: {},
  }).then(res => {
    if (res.data.code == 2) {
      wx.removeStorageSync('userid');
      wx.removeStorageSync('token');
      getApp().globalData.userid = "";
      getApp().globalData.token = "";
      
    };
  });
}