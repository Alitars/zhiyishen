Page({
  data: {
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4 < 100 ? 0 : getApp().globalData.sysinfo.statusBarHeight * 4,
    imgUrls:''
  },
  onUser() {
    wx.switchTab({
      url: '/pages/user/user',
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中...',
    })
    wx.downloadFile({
      url: 'https://admin.iguolao.com/public/uploads/20200423170451162.jpg',
      success: ((res) => {
        // console.log(res)
        this.setData({
          imgUrls:res.tempFilePath
        })
        wx.hideLoading({
          // complete: (res) => {},
        })
      })
    })
  }
})