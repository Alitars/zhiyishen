import NetworkRequest from '../../../../../template/network.js';
import setTime from '../../../../../template/setTime';
Page({
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    total_price: 0,
    src: '',
  },
  onBack() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  onServer() {
    wx.switchTab({
      url: '/pages/user/user',
    })
  },
  getData() {
    wx.showLoading({
      title: '加载中...',
      icon: 'none'
    });
    NetworkRequest({
      url: '/remainPrice',
      data: {},
      method: 'POST'
    }).then((res) => {
      if (res.data.code == 1) {
        wx.showLoading({
          title: '加载中...',
          icon: 'none'
        });
        if (typeof (res.data.total_price) == 'number') {
          var str = JSON.stringify(res.data.total_price)
        } else {
          if (typeof (res.data.total_price) == 'string') {
            var str = JSON.parse(res.data.total_price)
          } else {
            wx.showToast({
              title: 'fail' + res.data.total_price,
              icon: 'none',
              duration: 5000,
            })
          }
        };
        if (str == '0' || str == '0.00') {
          this.setData({
            total_price: 0
          })
          return;
        };
        var num = JSON.parse(str);
        var c = str.length + 10;
        var x = parseInt(num / c);
        wx.downloadFile({
          url: 'https://admin.iguolao.com/public/uploads/20200522152319924.jpg',
          success: ((event) => {
            if (!this.data.src) {
              this.setData({
                src: event.tempFilePath
              });
            };
            wx.hideLoading();
            setTime(500).then(() => {
              for (var s = 0; s < c + 2; s++) {
                var m = s * x;
                var data = m < num ? m : num;
                this.time({
                  's': s == 0 ? 1 : s + 1,
                  'data': data
                })
              }
            })
          }),
        })
      }
    })
  },
  time(event) {
    setTime(event.s * 100).then(() => {
      this.setData({
        total_price: event.data
      })
    })
  },
  onLoad: function (options) {
    this.getData()
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    this.getData()
  },
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})