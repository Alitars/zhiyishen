import setTime from '../../../../../template/setTime.js';
import NetworkRequest from '../../../../../template/network.js';
import Toast from '../../../../../dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 300,
    height: 600,
    canvasClose: true,
    none: true,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    CodeUrl: wx.getStorageSync('CodeUrl'),
    images: '',
    display: true,
  },
  toast(event) {
    Toast(event);
    wx.hideLoading({
      complete: (res) => {},
    })
  },
  onpreImg() {
    wx.showToast({
      title: '长按图片发送好友~',
      icon: 'none',
      duration: 5000,
      mask: true
    })
    setTime(1500).then(() => {
      wx.previewImage({
        url: this.data.images,
        urls: [this.data.images],
      })
    })
  },
  onBack() {
    wx.navigateBack({
      delta: 0,
    })
  },
  onRest() {
    this.setData({
      none: true,
      canvasClose: false,
    })
  },
  onClose() {
    this.onRest();
  },
  onWxcode() {
    var CodeUrl = this.data.CodeUrl;
    wx.showLoading({
      title: '生成中...',
      mask: true,
    })
    this.setData({
      canvasClose: true,
    })
    if (CodeUrl) {
      this.onShareImgs(CodeUrl);
      return;
    };
    NetworkRequest({
      url: '/wxacode',
      data: {
        mobile: wx.getStorageSync('phone'),
      },
    }).then(res => {
      if (res.data.code == 1) {
        // console.log(res, 'asasa')
        var url = getApp().globalData.icon_Url + res.data.data;
        wx.showLoading({
          title: '生成中...',
          mask: true,
        });
        // console.log(url, 'url')
        this.onShareImgs(url);
        this.data.CodeUrl = url;
        wx.setStorageSync('CodeUrl', url);
      } else {
        this.data.CodeUrl = '';
        wx.setStorageSync('CodeUrl', '');
        this.toast(res.data.msg);
        this.onRest();
      };
    }).catch(err => {
      this.data.CodeUrl = '';
      wx.setStorageSync('CodeUrl', '');
      this.toast(err.errMsg);
      this.onRest();
    })
  },
  onShareImgs(url) {
    wx.downloadFile({
      url: url,
      success: ((res) => {
        const maImg = res.tempFilePath;
        this.onCanvas(maImg);
        // console.log(maImg);
      })
    })
    fail: ((err) => {
      this.data.CodeUrl = '';
      wx.setStorageSync('CodeUrl', '');
      this.toast('生成失败，请重试');
      this.onRest();
    })
  },
  onCanvas(maImg) {
    const bgImg = '/package/component1/images/sdsds.jpg';
    const query = wx.createSelectorQuery()
    const dpr = wx.getSystemInfoSync().pixelRatio;
    query.select('#myCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, 300, 600);
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr);
        const img = canvas.createImage();
        const ma = canvas.createImage();
        img.src = bgImg;
        ma.src = maImg;
        img.onload = (e) => {
          ctx.drawImage(img, 0, 0, 300, 600);
          // console.log(e)
        };
        ma.onload = (x) => {
          ctx.drawImage(ma, 115, 425, 70, 70);
          // console.log(x)
        };
        setTime(4000).then(() => {
          wx.canvasToTempFilePath({
            destWidth: 300 * 5,
            destHeight: 600 * 5,
            fileType: 'jpg',
            canvas,
            success: ((res) => {
              const url = res.tempFilePath;
              this.setData({
                images: url,
                canvasClose: false,
              });
              setTime(100).then(() => {
                this.setData({
                  none: false,
                });
                wx.hideLoading();
                setTime(100).then(() => {
                  wx.getSetting({
                    success: ((set) => {
                      if (set.authSetting['scope.writePhotosAlbum'] == false) {
                        wx.showModal({
                          title: '提示',
                          content: '请授权相册权限后操作',
                          showCancel: true,
                          confirmColor: "#f96509",
                          confirmText: "去授权",
                          success(e) {
                            wx.openSetting({
                              success: ((s) => {
                                if (s.authSetting['scope.writePhotosAlbum'] == true) {
                                  wx.saveImageToPhotosAlbum({
                                    filePath: url,
                                    success: ((ss) => {
                                      this.toast('已保存至相册,赶快去分享吧~');
                                    }),
                                    fail: (() => {
                                      this.toast('保存失败');
                                    })
                                  })
                                } else {
                                  this.toast('相册授权失败');
                                }
                              })
                            })
                          }
                        });
                      } else {
                        wx.saveImageToPhotosAlbum({
                          filePath: url,
                          success: (() => {
                            this.toast('已保存至相册,赶快去分享吧~');
                          }),
                          fail: (() => {
                            this.toast('保存失败');
                          })
                        })
                      }
                    })
                  })
                })
              });

            })
          })
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    setTime(500).then(() => {
      wx.hideLoading({});
      this.setData({
        display: false
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})