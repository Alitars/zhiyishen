export default function onToken() {
  // wx.clearStorageSync();
  wx.removeStorageSync('token');
  wx.removeStorageSync('userid');
  getApp().globalData.userid = "";
  getApp().globalData.token = "";
  getApp().globalData.ISAGENT = "";
  getApp().globalData.YQNAME = "";
}