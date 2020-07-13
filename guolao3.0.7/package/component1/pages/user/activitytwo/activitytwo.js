Page({
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    height: getApp().globalData.menu.height + getApp().globalData.menu.top,
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4 < 100 ? 0 : getApp().globalData.sysinfo.statusBarHeight * 4,
    imgUrls:'',
    
  },
  onUser() {
    wx.switchTab({
      url: '/pages/user/user',
    })
  },
  onBack(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  onLoad: function (options) {
    wx.downloadFile({
      // url: 'https://admin.iguolao.com/public/uploads/20200423170451162.jpg',
      url:'https://admin.iguolao.com/public/uploads/20200710185608693.jpg',
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
    if (!getApp().globalData.userid) {
      if(options.mobile){
        wx.navigateTo({
          url: '/pages/user/log_on/log_on?mobile='+options.mobile,
        });
      }else{
        wx.navigateTo({
          url: '/pages/user/log_on/log_on',
        });
      }
      return;
    };
    this.setData({
      phone:wx.getStorageSync('phone')
    })
  },
  onshow(){
   
  },
  onShareAppMessage: function () {
    return {
      title: '知昇(上海)人工智能科技有限公司，智能商标注册。',
      path: '/package/component1/pages/index/agent_dt/agent_dt?mobile='+this.data.phone
    }
  }
})