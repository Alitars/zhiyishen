const screenWidth = getApp().globalData.sysinfo.screenWidth;
const screenHeight = getApp().globalData.sysinfo.screenHeight;
Component({
  behaviors: [],
  properties: {
    show: Boolean,
    src: String,
  },
  data: {
    screenWidth: screenWidth,
    screenHeight: screenHeight,
    canvasWidth: screenWidth,
    canvasHeight: screenHeight,
    scaleXY: 0,
    dpr: wx.getSystemInfoSync().pixelRatio,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    safeBottom: wx.getSystemInfoSync()['statusBarHeight'] * 2,
    rest: false,
    display: false,
    minWidth: 50,
    minHeight: 50,
    maxLeft: 0,
    maxTop: 0,
    maxBottom: 0,
    maxRight: 0,
    canvasW: 0,
    canvasH: 0,
    time: 0,
    timeCut: 0,
    xTop: 0,
    yTop: 0,
    xBottom: 0,
    yBottom: 0,
    xLeft: 0,
    yLeft: 0,
    xRight: 0,
    yRight: 0,
    x: 0,
    y: 0,
    cropUrl: String,
    show: true,
    scale: 1,
    moveX: 0,
    moveY: 0,
    src: String,
  },
  methods: {
    onClose() {
      this.setData({
        show: false
      })
    },
    select(id) {
      return new Promise((resolve, reject) => {
        var query = this.createSelectorQuery();
        query.select('#' + id).boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(res => {
          resolve(res);
          reject('err')
        })
      })
    },
    onBottomXY(event) {
      if (event.detail.source == 'touch') {
        this.select('bottom').then((res) => {
          var num = res[0].bottom - this.data.maxTop - 5;
          var min = num - this.data.yTop;
          this.setData({
            yBottom: min >= 60 ? num : 60
          })
        })
      }
    },
    onLeftXY(event) {
      if (event.detail.source == 'touch') {
        this.select('left').then((res) => {
          var num = res[0].left - this.data.maxLeft + 5;
          var min = this.data.xRight - num;
          this.setData({
            xLeft: min >= 60 ? num : this.data.safeWidth - 60,
          })
        })
      }
    },
    onTopXY(event) {
      if (event.detail.source == 'touch') {
        this.select('top').then((res) => {
          var num = res[0].top - this.data.maxTop + 5;
          var min = this.data.yBottom - num;
          this.setData({
            yTop: min >= 60 ? num : this.data.yBottom - 60
          })
        })
      }
    },
    onRightXY(event) {
      if (event.detail.source == 'touch') {
        this.select('right').then((res) => {
          var R = res[0].right - this.data.maxRight - 5;
          this.setData({
            xRight: R >= 60 ? R : 60,
          })
        })
      }
    },
    onImgCut(event) {
      var isSave = event.isSave;
      wx.showLoading({
        title: '处理中...',
        mask: true,
      });
      var query = this.createSelectorQuery();
      query.select('#canvas-img-two').fields({
        node: true,
        size: true
      }).exec((res) => {
        var canvas = res[0].node;
        var ctx = canvas.getContext('2d');
        var width = this.data.xRight - this.data.xLeft;
        var height = this.data.yBottom - this.data.yTop;
        wx.canvasToTempFilePath({
          x: this.data.xLeft + this.data.maxLeft,
          y: this.data.yTop + this.data.maxTop,
          width: width,
          height: height,
          destWidth: width * 4,
          destHeight: height * 4,
          canvas: canvas,
          success: ((res => {
            // 
              // var path = res.tempFilePath;
              // var formatImage = path.split(".")[(path.split(".")).length - 1];
              // console.log("图片格式" + formatImage)
              // if (formatImage != "png" && formatImage != "jpg" && formatImage != "jpeg") {
              //   return wx.showToast({
              //     title: '只能上传.png、.jpg、.jpep 格式',
              //     icon: 'none',
              //     image: '',
              //     duration: 2000,
              //     mask: true,
              //   })
              // }
            // 
            var obj = {
              'url': res.tempFilePath
            };
            if (isSave) {
              this.triggerEvent('run', obj);
              this.setData({
                show: false
              })
            } else {
              wx.previewImage({
                url: res.tempFilePath,
                urls: [res.tempFilePath],
              })
            }
            wx.hideLoading()
          }))
        })
      })
    },
    oncanvas(obj) {
      wx.showLoading({
        title: '正在处理请稍后',
        mask: true,
      });
      var imgUrls = obj.imgUrls;
      var c = obj.coordinate ? obj.coordinate : '';
      wx.showLoading({
        title: '加载中',
      });
      this.setData({
        rest: false,
        scale: 1,
      });
      this.data.time = setTimeout(() => {
        this.setData({
          rest: true
        });
        var url = imgUrls;
        var query = this.createSelectorQuery();
        var dpr = wx.getSystemInfoSync().pixelRatio;
        query.select('#canvas-img').fields({
          node: true,
          size: true,
        }).exec((res) => {
          var canvas = res[0].node;
          var ctx = canvas.getContext('2d');
          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          var canvasW = res[0].width * dpr;
          var canvasH = res[0].height * dpr;
          this.data.canvasH = canvasH;
          this.data.canvasW = canvasW;
          var img = canvas.createImage();
          wx.getImageInfo({
            src: url,
            success: ((xx) => {
              img.src = xx.path;
              var width = xx.width;
              var height = xx.height;
              var x = 200;
              var scaleXY = (canvasW - x) / width <= (canvasH - this.data.statusBarHeight * 8 * 2) / height ? (canvasW - x) / width : (canvasH - this.data.statusBarHeight * 8 * 2) / height;
              ctx.scale(scaleXY, scaleXY);
              var left = (canvasW - width * scaleXY) / scaleXY / 2;
              var top = (canvasH - height * scaleXY) / scaleXY / 2;
              var marginX = (screenWidth - (width / dpr * scaleXY)) / 2;
              var marginY = (screenHeight - (height / dpr * scaleXY)) / 2;
              img.onload = (e) => {
                ctx.drawImage(img, left, top, width, height);
                if (c !== '') {
                  ctx.moveTo(c[0][0] + left, c[0][1] + top);
                  ctx.lineTo(c[1][0] + left, c[1][1] + top);
                  ctx.lineTo(c[3][0] + left, c[3][1] + top);
                  ctx.lineTo(c[2][0] + left, c[2][1] + top);
                  ctx.closePath();
                  var lineWidth = parseInt(scaleXY) == 0 || parseInt(scaleXY) == 1 ? 2 : 1;
                  ctx.lineWidth = lineWidth;
                  ctx.setLineDash([5]);
                  ctx.strokeStyle = "#ff6800";
                  ctx.stroke()
                }
              };
              this.setData({
                display: false,
                scaleXY: scaleXY,
                maxLeft: marginX,
                maxTop: marginY,
                maxBottom: marginY,
                maxRight: marginX,
                xBottom: 0,
                yBottom: screenHeight - marginY - marginY,
                xLeft: 0,
                yLeft: 0,
                xRight: screenWidth - marginX - marginX,
                yRight: 0,
                xTop: 0,
                yTop: 0,
                safeWidth: screenWidth - marginX - marginX,
                safeHeight: screenHeight - marginY - marginY,
              })
            })
          })
        });
        wx.hideLoading();
        clearTimeout(this.data.time)
      }, 20)
    },
    oncanvasCut(obj) {
      var imgUrls = obj.imgUrls;
      this.data.timeCut = setTimeout(() => {
        var url = imgUrls;
        var query = this.createSelectorQuery();
        var dpr = wx.getSystemInfoSync().pixelRatio;
        query.select('#canvas-img-two').fields({
          node: true,
          size: true
        }).exec((res) => {
          var canvas = res[0].node;
          var ctx = canvas.getContext('2d');
          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          var canvasW = res[0].width * dpr;
          var canvasH = res[0].height * dpr;
          var img = canvas.createImage();
          wx.getImageInfo({
            src: url,
            success: ((xx) => {
              img.src = xx.path;
              var width = xx.width;
              var height = xx.height;
              var x = 200;
              var scaleXY = (canvasW - x) / width <= (canvasH - this.data.statusBarHeight * 8 * 2) / height ? (canvasW - x) / width : (canvasH - this.data.statusBarHeight * 8 * 2) / height;
              ctx.scale(scaleXY, scaleXY);
              var left = (canvasW - width * scaleXY) / scaleXY / 2;
              var top = (canvasH - height * scaleXY) / scaleXY / 2;
              var marginX = (screenWidth - (width / dpr * scaleXY)) / 2;
              var marginY = (screenHeight - (height / dpr * scaleXY)) / 2;
              img.onload = (e) => {
                ctx.drawImage(img, left, top, width, height)
              }
            })
          })
        });
        clearTimeout(this.data.timeCut)
      }, 20)
    },
    onSure() {
      this.onImgCut({
        'isSave': true
      })
    },
    onlook() {
      this.onImgCut({
        'isSave': false
      })
    },
    onUpImgs() {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera', 'album'],
        success: (res => {
          var imgUrls = res.tempFilePaths[0];
          this.setData({
            rest: false,
            scale: 1,
            display: true
          });
          this.getData(imgUrls)
        })
      })
    },
    onScaleadd() {
      if (this.data.scale < 2) {
        this.setData({
          scale: this.data.scale + 0.1
        })
      }
    },
    onminish() {
      if (this.data.scale >= 0.5) {
        this.setData({
          scale: this.data.scale - 0.1
        })
      }
    },
    getData(str) {
      wx.showLoading({
        title: '识别中...',
        mask: true,
      });
      wx.uploadFile({
        url: getApp().globalData.main_Url + '/tailorImage',
        filePath: str,
        name: 'url_img',
        header: {
          'content-type': 'multipart/form-data'
        },
        formData: {},
        success: (res) => {
          this.oncanvas({
            'imgUrls': str,
            'coordinate': JSON.parse(res.data).corners
          });
          this.oncanvasCut({
            'imgUrls': str,
          })
        },
        fail: ((err) => {})
      })
    },
  }
})