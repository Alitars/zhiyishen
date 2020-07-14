Page({
  data: {
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
  },
  onClick() {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    PrePage.setData({
      checked: true
    })
    wx.navigateBack({
      delta: 1,
    })
  },
})