import Dialog from '../dist/dialog/dialog';
import Toast from '../dist/toast/toast';
import NetworkRequest from './network.js';
import Notify from '../dist/notify/notify';
import yqquest from './GardenNetwork.js';
import setTime from './setTime.js';
var shopback = function (arry) {
  var arry = JSON.parse(JSON.stringify(arry));
  return new Promise((resolve, reject) => {
    for (var i = 0; i < arry.shopCarList.length; i++) {
      if (JSON.parse(arry.shopCarList[i].price) || !arry.shopCarList[i].price == '0.00') {
        arry.shopCarList[i].price = JSON.parse(arry.shopCarList[i].price).toFixed(2);
      } else {
        arry.shopCarList[i].price = arry.shopCarList[i].price.toFixed(2);
      };
      arry.shopCarList[i].isSelect = false;
    };
    for (var i = 0; i < arry.recommend.length; i++) {
      arry.recommend[i].total = JSON.parse(arry.recommend[i].price).toFixed(2);
      // arry.recommend[i].total = (JSON.parse(arry.recommend[i].price) + JSON.parse(arry.recommend[i].service_price)).toFixed(2)
    };
    resolve(arry);
  })
};

var delet = function (arry, type) {
  var arry = JSON.parse(JSON.stringify(arry));
  return new Promise((resolve, reject) => {
    for (var i = arry.length - 1; i >= 0; i--) {
      for (var e = arry[i].sec.length - 1; e >= 0; e--) {
        for (var s = arry[i].sec[e].third.length - 1; s >= 0; s--) {
          if (arry[i].sec[e].third[s].id == type) {
            if (arry[i].sec[e].third.length <= 1) {
              arry[i].sec.splice(e, 1);
              if (arry[i].sec.length == 0) {
                arry.splice(i, 1)
              };
            } else {
              arry[i].sec[e].third.splice(s, 1);
            };
          };
        };
      };
    };
    resolve(arry);
  })
};


//拿openid
var getOpenID = function () {
  return new Promise((resolve, reject) => {
    Toast.loading({
      message: '登录中...',
      duration: 0,
      zIndex: 1001,
    });
    wx.login({
      success: (ss => {
        var code = ss.code;
        // console.log(code);
        wx.getSetting({
          success: (res => {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: (res => {
                  var encryptedData = res.encryptedData;
                  var iv = res.iv;
                  Toast.loading({
                    message: '登录中...',
                    duration: 0,
                    zIndex: 1001,
                  });
                  yqquest({
                    url: '/getuserinfo',
                    data: {
                      code: code,
                      encryptedData: encryptedData,
                      iv: iv,
                    },
                  }).then(e => {
                    // console.log(res,'openid')
                    resolve(e);
                  })
                })
              })
            }
          })
        })
      })
    })
  })
};

//倒计时
var countDown = function (hours, that) {
  var hours = hours;
  var timer = setInterval(() => {
    var time = that.data.time;
    if (time > 1) {
      that.setData({
        time: time - 1
      });
    } else {
      clearInterval(timer);
      that.setData({
        time: hours,
        code: 0,
      })
    };
  }, 1000)
};

//验证码
var sendma = function (num, type, that) {
  return new Promise((resolve, reject) => {
    var txt = /^\d{11}$/;
    if (txt.test(num)) {
      yqquest({
        url: '/register/sendcode',
        data: {
          phone: num,
          type: type
        },
      }).then(res => {
        if (res.data.code == 1) {
          resolve(res);
          // console.log(res)
        };
        Notify({
          text: (res.data.code == 1 ? '验证码发送成功' : res.data.msg),
          duration: 3000,
          selector: '#custom-selector',
          backgroundColor: '#f44',
          color: '#fff',
        })
      })
    } else {
      Notify({
        text: '请输入正确手机号',
        duration: 3000,
        selector: '#custom-selector',
        backgroundColor: '#f44',
        color: '#fff',
      })
    }
  })
};
var date_time = function (number) {
  var n = number * 1000;
  var date = new Date(n);
  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return (Y + M + D)
}

var deletArry = function (arry) {
  var arry = JSON.parse(JSON.stringify(arry));
  return new Promise((resolve, reject) => {
    var list = [];
    if (arry.length > 0) {
      for (var i = 0; i < arry.length; i++) {
        list.push(arry[i].checked);
        for (var s = 0; s < arry[i].sec.length; s++) {
          list.push(arry[i].sec[s].checked);
        };
      };
      if (list.indexOf(true) == -1) {
        Toast('请先选择商品');
      } else {
        Dialog.confirm({
          title: '提示',
          message: '是否删除该商品？'
        }).then(() => {
          for (var i = arry.length - 1; i >= 0; i--) {
            for (var m = arry[i].sec.length - 1; m >= 0; m--) {
              if (arry[i].sec[m].checked == true) {
                arry[i].sec.splice(m, 1);
              };
              if (arry[i].sec.length == 0) {
                arry.splice(i, 1);
              };
            };
          };
          resolve(arry);
        });
      };
    };
  });
};

//行业 推荐  自选
var onTrade = function (res) {
  return new Promise((resolve, reject) => {
    NetworkRequest({
      url: '/registercateall',
      data: {
        text: res,
      },
      method: 'POST'
    }).then(res => {
      // console.log(res, 'res');
      resolve(res);
    }).catch(err => {
      reject('err');
    })
  })
};


var onDustbin = function (e, arry) {
  var id = e.currentTarget.dataset.id;
  var arry = JSON.parse(JSON.stringify(arry));
  return new Promise((resolve, reject) => {
    if (id == 1) {
      var firstindex = e.currentTarget.dataset.first;
      arry.splice(firstindex, 1);
    } else {
      var firstindex = e.currentTarget.dataset.first;
      var twoindex = e.currentTarget.dataset.two;
      arry[firstindex].sec.splice(twoindex, 1);
      if (arry[firstindex].sec.length == 0) {
        arry.splice(firstindex, 1);
      };
    };
    resolve(arry);
    reject('err');
  })
};

//生成Logo
var onCreateIcon = function (key, num) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: getApp().globalData.icon_Url + '/api/BrandUpload/operationFile',
      data: {
        brand_name: key,
        type: num,
        channelroad: 4,
      },
      header: {},
      method: 'POST',
      success: (res => {
        Toast.clear();
        var code = res.data.code;
        if (code == 1) {
          resolve(res);
        } else {
          Notify({
            text: 'Logo生成失败，请重试',
            duration: 3000,
            selector: '#custom-selector',
            backgroundColor: '#f44',
            color: '#fff',
          })
        };
      }),
      fail: (err => {
        Notify({
          text: '网络请求失败',
          duration: 3000,
          selector: '#custom-selector',
          backgroundColor: '#f44',
          color: '#fff',
        })
      }),
    })

  })
}

//语音播放
var VoicePlay = function (e) {
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  var innerAudioContext = getApp().globalData.innerAudioContext;
  wx.downloadFile({
    url: getApp().globalData.guo_url + e.vioce_Url,
    header: {},
    success: (res => {
      if (e.nownRoute == _this.route) {
        innerAudioContext.autoplay = true;
        innerAudioContext.play();
        innerAudioContext.src = res.tempFilePath;
      };
    }),
  });
}

var onHistory = function () {
  return new Promise((resolve, reject) => {
    // resolve(true)
    Toast.loading({
      message: '加载中...',
      duration: 0,
    })
    NetworkRequest({
      url: '/shopCar/historyOrder',
      data: {
        type: 1,
      },
    }).then(res => {
      Toast.clear();
      var code = res.data.code;
      if (code == 1) {
        if (res.data.data.length > 0) {
          resolve(true)
          // getApp().globalData.arry = res.data.data;
        } else {
          // resolve(false)
          NetworkRequest({
            url: '/shopCar/historyOrder',
            data: {
              type: 2,
            },
          }).then(res => {
            Toast.clear();
            var code = res.data.code;
            if (code == 1) {
              if (res.data.data.length > 0) {
                resolve(true)
                // getApp().globalData.arry = res.data.data;
              } else {
                resolve(false)
              }
            };
            if (code == 2) {
              this.notify('登录失效！请重新登录');
              setTime().then(res => {
                route('pages/user/log_on/log_on');
              })
            }
          }).catch(err => {
            resolve(false)
            Toast.clear();
            return;
          })
        }
      };
      if (code == 2) {
        this.notify('登录失效！请重新登录');
        setTime().then(res => {
          route('pages/user/log_on/log_on');
        })
      }
    }).catch(err => {
      resolve(false)
      Toast.clear();
      return;
    })
  })
}

//黑白图片 
var colorImg = function (e) {
  return new Promise((resolve, reject) => {
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    var url = e.url;
    var DataStr = getApp().globalData.DataStr;
    wx.showLoading({
      title: '上传中...',
      mask: true
    });
    wx.uploadFile({
      url: getApp().globalData.main_Url + '/BrandUpload/colorImage',
      filePath: url,
      name: 'url_img',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: {},
      success: (res => {
        wx.hideLoading();
        var list = JSON.parse(res.data);
        var img = list.filepath;
        _this.data[DataStr + 'heibai'] = img.heibai;
        _this.data[DataStr + 'yuantu'] = img.yuantu;
        var _id = _this.data[DataStr + '_id'];
        _this.setData({
          [DataStr]: _id == 1 ? img.yuantu : img.heibai,
          src: _this.data.src,
          isCut: false,
          width: 300, //宽度
          height: 300, //高度
          max_width: 300,
          max_height: 300,
        });
        resolve(img)
      }),
      fail: (err => {
        reject('err');
        wx.hideLoading();
        wx.showToast({
          title: err.errMsg,
          icon: 'none',
          duration: 3000,
        })
      })
    })
  })
}

var isHubei = function () {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        code: 1,
      }
    })
  })
}

// 图片裁剪上传
var ImagesUp = function (e) {
  return new Promise((resolve, reject) => {
    var url = e.url;
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    var DataStr = getApp().globalData.DataStr;
    wx.showLoading({
      title: '上传中...',
      mask: true
    });
    wx.uploadFile({
      url: getApp().globalData.main_Url + '/BrandUpload/brandUploadFile',
      filePath: url,
      name: 'url_img',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: {},
      success: (res => {
        wx.hideLoading();
        if (typeof (res.data) == 'string') {
          var list = JSON.parse(res.data)
        } else {
          var list = res.data
        };
        var img = list.filepath;
        _this.setData({
          [DataStr]: img,
          src: _this.data.src,
          isCut: false,
          width: 300, //宽度
          height: 300, //高度
          max_width: 300,
          max_height: 300,
        });
        resolve(list)
      }),
      fail: (err => {
        reject('err');
        wx.hideLoading();
        wx.showToast({
          title: err.errMsg,
          icon: 'none',
          duration: 3000,
        })
      })
    })
  })
}


//颜色生成
var colorList = function () {
  return new Promise((resolve, reject) => {
    var color = [];
    for (var i = 0; i < data.length; i++) {
      var R = Math.floor(Math.random() * (255 - 0));
      var G = Math.floor(Math.random() * (255 - 0));
      var B = Math.floor(Math.random() * (255 - 0));
      var colorItem = 'rgb(' + R + ',' + G + ',' + B + ')';
      color.push(colorItem);
    };
    resolve(color)
  })
};

//showLoadding
var showLoading = function (event) {
  wx.showLoading({
    title: event.title,
    duration: event.time,
  })
};


module.exports = {
  shopback: shopback,
  delet: delet,
  deletArry: deletArry,
  onTrade: onTrade,
  onDustbin: onDustbin,
  getOpenID: getOpenID,
  countDown: countDown,
  sendma: sendma,
  onCreateIcon: onCreateIcon,
  VoicePlay: VoicePlay,
  colorImg: colorImg,
  onHistory: onHistory,
  isHubei: isHubei,
  ImagesUp: ImagesUp,
  colorList: colorList,
  showLoading: showLoading,
  date_time:date_time
};