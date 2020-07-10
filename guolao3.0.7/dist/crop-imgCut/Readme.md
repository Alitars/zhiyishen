//默认去掉顶部title的可视区域
//识图加裁剪
//如果只需裁剪请自行改造
const screenWidth = getApp().globalData.sysinfo.screenWidth;
const screenHeight = getApp().globalData.sysinfo.screenHeight;
Component({

  behaviors: [],

  properties: {
    // 属性名
    // 简化的定义方式
    //组件显示||隐藏
    show: Boolean,
    //img url 本地类型
    src: String,
  },

  data: {
    //可视区域默认去掉顶部 
    screenWidth: screenWidth,
    screenHeight: screenHeight,
    //canvas的xml大小
    canvasWidth: screenWidth,
    canvasHeight: screenHeight,
    //图片相对可视区域缩放比
    scaleXY: 0,
    //dpr
    dpr: wx.getSystemInfoSync().pixelRatio,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    safeBottom: wx.getSystemInfoSync()['statusBarHeight'] * 2,
    //重置重置canvas 显示 coverview
    rest: false,
    display: false,
    //拖动最小宽度||高度
    minWidth: 50,
    minHeight: 50,
    //拖动最大范围
    maxLeft: 0,
    maxTop: 0,
    maxBottom: 0,
    maxRight: 0,
    //记录下canvas物理大小
    canvasW: 0,
    canvasH: 0,
    //定时器clear
    time: 0,
    timeCut: 0,
    //
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
    //组件显示隐藏
    show: true,
    scale: 1,
    moveX: 0,
    moveY: 0,
    //链接
    src: String,
  }, // 私有数据，可用于模板渲染



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
          reject('err');
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
          });
        })
      }
    },


    onImgCut(event) {
      // 保存||预览
      var isSave = event.isSave;
      //裁剪 获取画板
      wx.showLoading({
        title: '处理中...',
        mask: true,
      });
      var query = this.createSelectorQuery();
      query.select('#canvas-img-two').fields({
        node: true,
        size: true
      }).exec((res) => {
        var canvas = res[0].node
        var ctx = canvas.getContext('2d');
        var width = this.data.xRight - this.data.xLeft;
        var height = this.data.yBottom - this.data.yTop;
        // console.log(width, height)
        wx.canvasToTempFilePath({
          x: this.data.xLeft + this.data.maxLeft,
          y: this.data.yTop + this.data.maxTop,
          width: width,
          height: height,
          destWidth: width * 4,
          destHeight: height * 4,
          canvas: canvas,
          success: ((res => {
            // console.log(res);
            //默认page事件 传入 obj
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
            wx.hideLoading();
          }))
        })
      })
    },





    oncanvas(obj) {
      wx.showLoading({
        title: '正在处理请稍后',
        mask: true,
      })
      //api  canvas2d
      //本地图片
      var imgUrls = obj.imgUrls;
      //有无坐标
      var c = obj.coordinate ? obj.coordinate : '';
      wx.showLoading({
        title: '加载中',
      });
      //重置下画板
      this.setData({
        rest: false,
        scale: 1,
      });
      this.data.time = setTimeout(() => {
        this.setData({
          rest: true
        });
        // return
        var url = imgUrls;
        //page使用wx.createSelectorQuery()||组件使用this.createSelectorQuery()
        var query = this.createSelectorQuery();
        //dpr 像素: screenWidth*dpr
        var dpr = wx.getSystemInfoSync().pixelRatio;
        // var _this = this
        query.select('#canvas-img').fields({
          node: true,
          size: true,
        }).exec((res) => {
          //// console.log(this)
          var canvas = res[0].node
          var ctx = canvas.getContext('2d');
          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          var canvasW = res[0].width * dpr;
          var canvasH = res[0].height * dpr;
          this.data.canvasH = canvasH;
          this.data.canvasW = canvasW;
          var img = canvas.createImage();
          //img info
          wx.getImageInfo({
            src: url,
            success: ((xx) => {
              img.src = xx.path;
              var width = xx.width;
              var height = xx.height;
              //计算缩放 取宽比||高比 
              //左留宽度60px  高上下留出(statusBarHeight * 8 * 2)px
              var x = 200;
              var scaleXY = (canvasW - x) / width <= (canvasH - this.data.statusBarHeight * 8 * 2) / height ? (canvasW - x) / width : (canvasH - this.data.statusBarHeight * 8 * 2) / height;
              //// console.log(width*)
              ctx.scale(scaleXY, scaleXY);
              // //console.log(scaleXY, 'scaleXY');
              //img绘制原点计算 
              var left = (canvasW - width * scaleXY) / scaleXY / 2;
              var top = (canvasH - height * scaleXY) / scaleXY / 2;
              //算出最大裁剪范围转换 px 
              //   上
              //左 img 右
              //   下
              var marginX = (screenWidth - (width / dpr * scaleXY)) / 2;
              var marginY = (screenHeight - (height / dpr * scaleXY)) / 2;
              //// console.log(marginX, 'marginX', marginY, 'marginY', left, 'left', top, 'top', scaleXY, 'scaleXY', width / scaleXY, 'width/scaleXY', canvasW, 'canvasW', canvasH, 'canvasH', width, 'width', height, 'height');
              img.onload = (e) => {
                //画图 当前窗口+坐标点
                ctx.drawImage(img, left, top, width, height);
                // console.log(canvas);
                //只裁剪？无坐标？
                if (c !== '') {
                  //画坐标
                  ctx.moveTo(c[0][0] + left, c[0][1] + top);
                  ctx.lineTo(c[1][0] + left, c[1][1] + top);
                  ctx.lineTo(c[3][0] + left, c[3][1] + top);
                  ctx.lineTo(c[2][0] + left, c[2][1] + top);
                  ctx.closePath();
                  //划线框宽度适配 
                  var lineWidth = parseInt(scaleXY) == 0 || parseInt(scaleXY) == 1 ? 2 : 1;
                  ctx.lineWidth = lineWidth;
                  ctx.setLineDash([5]);
                  ctx.strokeStyle = "#ff6800"
                  ctx.stroke();
                };
                // console.log('imgOK');

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
              });

            })
          })
        });
        wx.hideLoading();
        clearTimeout(this.data.time);
      }, 20)
    },



    oncanvasCut(obj) {
      //一样
      var imgUrls = obj.imgUrls;
      this.data.timeCut = setTimeout(() => {
        var url = imgUrls;
        var query = this.createSelectorQuery();
        var dpr = wx.getSystemInfoSync().pixelRatio;
        query.select('#canvas-img-two').fields({
          node: true,
          size: true
        }).exec((res) => {
          var canvas = res[0].node
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
                ctx.drawImage(img, left, top, width, height);

              };
            })
          })
        });
        clearTimeout(this.data.timeCut)
      }, 20)
    },


    onSure() {
      this.onImgCut({
        'isSave': true
      });
    },
    onlook() {
      this.onImgCut({
        'isSave': false
      });
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
          })
          this.getData(imgUrls);
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
      })

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
          });
        },
        fail: ((err) => {

        })
      })
    },

  }

})