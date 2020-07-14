//func
import Dialog from '../dist/dialog/dialog';
import Toast from '../dist/toast/toast';
import Notify from '../dist/notify/notify';
import NetworkRequest from './network.js';

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
      arry.recommend[i].total = (JSON.parse(arry.recommend[i].price) + JSON.parse(arry.recommend[i].service_price)).toFixed(2)
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
          message: '是否删除该商品？',
          zIndex: 2000,
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

var shareWx = function (data) {
  return new Promise((resolve, reject) => {
    // console.log(data);
    var arry = JSON.parse(JSON.stringify(data));
    for (var i = arry.length - 1; i >= 0; i--) {
      arry[i] = {
        'name': arry[i].name,
        'checked': arry[i].checked == true ? true : false,
        'num': arry[i].num,
        'sec': arry[i].sec,
        'isSelect': false,
      };
      for (var m = arry[i].sec.length - 1; m >= 0; m--) {
        arry[i].sec[m] = {
          'name': arry[i].sec[m].name,
          'checked': arry[i].sec[m].checked == true ? true : false,
          'num': arry[i].sec[m].num,
          'third': arry[i].sec[m].third,
        };
        if (arry[i].sec[m].checked == false) {
          arry[i].sec.splice(m, 1);
        };
        if (arry[i].sec.length == 0) {
          arry.splice(i, 1);
        };
      };
    };
    resolve(arry);
  })
};

//行业 推荐  自选
var onTrade = function (res) {
  return new Promise((resolve, reject) => {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    })
    NetworkRequest({
      url: '/registercateall',
      data: {
        text: res,
      },
      method: 'POST'
    }).then(res => {
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
        user_id: getApp().globalData.userid,
        token: getApp().globalData.token,
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
            text: 'Logo生成失败，请重试！',
            duration: 3000,
            selector: '#custom-selector',
            backgroundColor: '#f44',
            color: '#fff',
          })
        };
      }),
      fail: (err => {
        Notify({
          text: '网络请求失败！',
          duration: 3000,
          selector: '#custom-selector',
          backgroundColor: '#f44',
          color: '#fff',
        })
      }),
    })

  })
}

var date_time = function (number) {
  var n = number * 1000;
  var date = new Date(n);
  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return (Y + M + D)
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


// 身份证校验
var iDCard = function (code) {
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  var idCardReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
  var errorMess = "";
  var isPass = true;
  if (!code || !idCardReg.test(code)) {
    errorMess = "您输入的身份证号有误！";
    isPass = true;
    return {
      'err': errorMess,
      'isPass': isPass
    };
  } else if (!city[code.substr(0, 2)]) {
    errorMess = "您输入的身份证地址编码有误！";
    isPass = true;
    return {
      'err': errorMess,
      'isPass': isPass
    };
  } else {
    if (code.length == 18) {
      isPass = false;
      return {
        'err': errorMess,
        'isPass': isPass
      };
    };
  };
};

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
        } else {
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
              } else {
                resolve(false)
              }
            };
            if (code == 2) {
              this.notify('登录失效！请重新登录！');
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
        this.notify('登录失效！请重新登录！');
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
        // console.log(res, 'asasa');
        wx.hideLoading();
        if (typeof (res.data) == 'string') {
          var list = JSON.parse(res.data)
        } else {
          var list = res.data
        };
        var img = list.filepath;
        // console.log([DataStr], img)
        _this.setData({
          [DataStr]: img,
          src: _this.data.src,
          isCut: false,
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




//身份证识别WX OCR
var IdcardOCR = function () {
  return new Promise((resolve, reject) => {
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (e => {
        const tempFilePaths = e.tempFilePaths[0];
        wx.showLoading({
          title: '识别中...',
          mask: true
        });
        wx.uploadFile({
          url: getApp().globalData.main_Url + '/BrandUpload/brandUploadFile',
          filePath: tempFilePaths,
          name: 'url_img',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {},
          success: (s => {
            if (typeof (s.data) == 'string') {
              var list = JSON.parse(s.data);
            } else {
              var list = s.data;
            };
            const pic = list.filepath;
            NetworkRequest({
              url: '/IdCard',
              data: {
                pic: pic,
              },
            }).then(res => {
              // console.log(res);
              wx.hideLoading();
              if (res.data.code == 1) {
                resolve(res.data.data);
              } else {
                reject('fail');
              };
            }).catch(fail => {
              wx.hideLoading();
              reject('fail');
            })
          }),
          fail: (() => {
            wx.hideLoading();
            reject('fail');
          })
        })
      })
    })
  })
}

//营业执照识别WX OCR
var BusinessOCR = function () {
  return new Promise((resolve, reject) => {
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (e => {
        const tempFilePaths = e.tempFilePaths[0];
        wx.showLoading({
          title: '识别中...',
          duration: 15000,
          mask: true,
        });
        wx.uploadFile({
          url: getApp().globalData.main_Url + '/checklicense',
          filePath: tempFilePaths,
          name: 'pic',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {},
          success: ((res) => {
            var list = JSON.parse(res.data);
            var arry = JSON.parse(JSON.stringify(list.data));
            // console.log(arry, 'asdadsdsadasdasdaa');
            if (list.code == 1) {
              wx.showToast({
                title: '识别成功',
                icon: 'none',
                duration: 3000
              })
              arry.errcode == 0;
              arry.tempFilePaths = arry.business_license;
              arry.address = arry.address
              arry.reg_num = arry.reg_num
              arry.enterprise_name = arry.company_name;
              resolve({
                'errcode': 0,
                'tempFilePaths': arry.business_license,
                'enterprise_name': arry.company_name,
                'reg_num':arry.reg_num,
                'address':arry.address
              })
            } else {
              wx.showToast({
                title: list.msg,
                icon: 'none',
                duration: 3000
              })
            };
            wx.hideLoading();
          })
        })
      })
    })
  })
}

//语音播放
var VoicePlay = function (e) {
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  var innerAudioContext = getApp().globalData.innerAudioContext;
  wx.downloadFile({
    url: getApp().globalData.gl_Url + e.vioce_Url,
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

var UpImages = function (obj) {
  return new Promise((resolve, reject) => {
    var url = obj.img;
    var str = obj.str;
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    wx.showLoading({
      title: '上传中...',
      mask: true,
    })
    wx.uploadFile({
      url: getApp().globalData.main_Url + '/BrandUpload/brandUploadFile',
      filePath: url,
      name: 'url_img',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: {

      },
      success: (res => {
        if (typeof (res.data) == 'string') {
          var arry = JSON.parse(res.data);
        } else {
          var arry = res.data;
        };
        if (arry.code == 1) {
          _this.setData({
            [str]: arry.filepath
          })
          resolve(arry.filepath);
        } else {
          Notify({
            text: arry.msg,
            duration: 3000,
            selector: '#custom-selector',
            backgroundColor: '#f44',
            color: '#fff',
          })
        }
        wx.hideLoading();
      }),
      fail: (err => {
        if (err.errMsg == 'request:fail timeout') {
          var toast = '网络已超时，请稍后重试哦~'
        } else {
          var toast = err.errMsg;
        };
        Notify({
          text: toast,
          duration: 3000,
          selector: '#custom-selector',
          backgroundColor: '#f44',
          color: '#fff',
        })
        wx.hideLoading();
      })
    })
  })
}


//拿openid
var getOpenID = function (str) {
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
                  NetworkRequest({
                    url: '/getuserinfo',
                    data: {
                      code: code,
                      encryptedData: encryptedData,
                      iv: iv,
                    },
                  }).then(e => {
                    if (str == 'wx') {
                      resolve(e);
                      return;
                    };
                    if (typeof (e.data.data) == 'string') {
                      var arry = JSON.parse(e.data.data);
                    } else {
                      var arry = e.data.data;
                    };
                    wx.setStorageSync('userInfo', arry);
                    NetworkRequest({
                      url: '/changeopenid',
                      data: {
                        avatarUrl: arry.avatarUrl,
                        city: arry.city,
                        country: arry.country,
                        gender: arry.gender,
                        language: arry.language,
                        nickName: arry.nickName,
                        openId: arry.openId,
                        province: arry.province,
                        unionid: arry.unionId,
                      },
                      method: 'POST'
                    }).then(ss => {
                      resolve(e);
                    })
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
var countDown = function (hours) {
  var hours = hours;
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  var timer = setInterval(() => {
    var time = _this.data.time;
    if (time > 1) {
      _this.setData({
        time: time - 1
      });
    } else {
      clearInterval(timer);
      _this.setData({
        time: hours,
        code: 0,
      })
    };
  }, 1000)
};

//验证码
var sendma = function (num, type) {
  return new Promise((resolve, reject) => {
    var txt = /^\d{11}$/;
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    if (txt.test(num)) {
      NetworkRequest({
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
        if (_this.route !== 'package/component1/pages/user/activity/activity') {
          Notify({
            text: (res.data.code == 1 ? '验证码发送成功' : res.data.msg),
            duration: 3000,
            selector: '#custom-selector',
            backgroundColor: '#f44',
            color: '#fff',
          })
        } else {
          wx.showToast({
            title: (res.data.code == 1 ? '验证码发送成功' : res.data.msg),
            icon: 'none',
            duration: 5000,
          });
        }
      })
    } else {
      Notify({
        text: '请输入正确手机号!',
        duration: 3000,
        selector: '#custom-selector',
        backgroundColor: '#f44',
        color: '#fff',
      })
    }
  })
};


//收集UnionId
var collectUnionId = function () {
  if (wx.getStorageSync('userInfo').unionId == undefined) {
    wx.login({
      success: (res => {
        const code = res.code;
        wx.getSetting({
          success: (ss => {
            if (ss.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (a) {
                  const encryptedData = a.encryptedData;
                  const iv = a.iv;
                  NetworkRequest({
                    url: '/getuserinfo',
                    data: {
                      code: code,
                      encryptedData: encryptedData,
                      iv: iv,
                    },
                  }).then(e => {
                    var arry = e.data.data;
                    if (typeof (arry) == 'string') {
                      var arry = JSON.parse(e.data.data);
                    } else {
                      var arry = e.data.data;
                    };
                    wx.setStorageSync('userInfo', arry);
                    NetworkRequest({
                      url: '/changeopenid',
                      data: {
                        avatarUrl: arry.avatarUrl,
                        city: arry.city,
                        country: arry.country,
                        gender: arry.gender,
                        language: arry.language,
                        nickName: arry.nickName,
                        openId: arry.openId,
                        province: arry.province,
                        unionid: arry.unionId,
                      },
                      method: 'POST'
                    }).then(res => {
                      var code = res.data.code;
                      if (code == 1) {
                        // var arry = res.data.data;
                        // getApp().globalData.userid = arry.id;
                        // getApp().globalData.token = arry.apptoken;
                        // wx.setStorageSync('token', arry.apptoken);
                        // wx.setStorageSync('userid', arry.id);
                        // wx.setStorageSync('phone', arry.mobile);
                      };
                    })
                  })
                }
              })
            }
          })
        })
      })
    })
  };
}

//当前问题
var isSue = function (obj) {
  return new Promise((resolve, reject) => {
    var Question = JSON.parse(JSON.stringify(wx.getStorageSync('Question')));
    var id = obj.id;
    var x = 'x';
    for (var s = 0; s < Question.length; s++) {
      Question[s].nextId = id;
      if (Question[s].isPresent == true) {
        var lastId = Question[s].id;
        // Question[s].lastId = lastId;
        for (var x = 0; x < Question.length; x++) {
          // Question[x].lastId = lastId == 1 ? 0 : lastId;
          Question[x].lastId = lastId;
        };
      };
    };
    // return;
    // console.log(id,'idQues');
    for (var i = 0; i < Question.length; i++) {
      Question[i].isPresent = Question[i].id == id ? true : false;
      // console.log(Question[i].isPresent = Question[i].id == id);
      x = Question[i].id == id ? Question[i].id : '';
    };
    // console.log(x);
    wx.setStorage({
      data: Question,
      key: 'Question',
    }).then((res) => {
      if (res.errMsg == "setStorage:ok") {
        if (x !== 'x') {
          resolve(x);
        } else {
          reject('');
        };
      };
    }).catch((err) => {
      wx.showToast({
        title: '缓存失败',
        icon: 'none',
        duration: 5000,
      })
    })
  })
}

var resetQuest = function (obj) {
  return new Promise((resolve, reject) => {
    var Question = JSON.parse(JSON.stringify(wx.getStorageSync('Question')));
    var clearData = obj.clearData;
    for (var i = 0; i < Question.length; i++) {
      Question[i].lastId = Question[0].id;
      Question[i].nextId = Question[0].id;
      Question[i].isPresent = i == 0 ? true : false;
      if (clearData) {
        Question[i].data = {};
      };
    };
    wx.setStorage({
      data: Question,
      key: 'Question',
    }).then(() => {
      resolve('');
    }).catch((err) => {
      reject(err);
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 5000
      })
    })
  })
}



var voiceText = function () {
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  getApp().globalData.innerAudioContext.stop();
  var Question = JSON.parse(JSON.stringify(wx.getStorageSync('Question')));
  var text = {};
  // console.log(pages, _this, Question)
  for (var i = 0; i < Question.length; i++) {
    if (Question[i].isPresent == true) {
      var text = Question[i];
      if (_this.data.Id == '') {
        _this.data.Id = Question[i].id;
      };
      return text;
      break;
    };
  };
};

var saveData = function (obj) {
  return new Promise((resolve, reject) => {
    // console.log(obj)
    var id = obj.id;
    var data = obj.data;
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    var route = pages[pages.length - 1].route;
    var Question = JSON.parse(JSON.stringify(wx.getStorageSync('Question')));
    for (var i = 0; i < Question.length; i++) {
      if (Question[i].id == id) {
        Question[i].data = data;
        Question[i].url = _this.route;
        wx.setStorage({
          data: Question,
          key: 'Question',
        }).then(() => {
          resolve('');
        }).catch((err) => {
          reject(err);
          wx.showToast({
            title: err,
            icon: 'none',
            duration: 5000
          })
        })
        break;
      };
    };
  })
};

var upDate = function (obj) {
  // console.log(obj)
  var id = obj;
  var Question = JSON.parse(JSON.stringify(wx.getStorageSync('Question')));
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  var data = {};
  for (var i = 0; i < Question.length; i++) {
    if (Question[i].id == id) {
      var data = Question[i].data
      break;
    };
  };
  // question data对象 添加值
  for (let i in data) {
    if (i !== 'Id' && i !== 'height' && i !== '__webviewId__' && i !== 'safeHeight' && i !== 'icon_Url' && i !== 'info' && i !== 'active' && i !== 'SafeButtom' && i !== 'statusBarHeight' && i !== 'time' && i !== 'text' && i !== 'pause') {
      // console.log(i, data[i], 'setData');
      _this.setData({
        [i]: data[i]
      })
    }
  }
}

var colorCreate = function (event) {
  var color = [];
  var gradient = event.gradient;
  var len = event.number;
  //rgba -> 16进制
  function six(color) {
    var values = color
      .replace(/rgba?\(/, '')
      .replace(/\)/, '')
      .replace(/[\s+]/g, '')
      .split(',');
    var a = parseFloat(values[3] || 1),
      r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
      g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
      b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
    return "#" +
      ("0" + r.toString(16)).slice(-2) +
      ("0" + g.toString(16)).slice(-2) +
      ("0" + b.toString(16)).slice(-2);
  };

  function random(num) {
    return Math.floor(Math.random() * (num));
  };

  for (var i = 0; i < len; i++) {
    var R = random(255);
    var G = random(220);
    var B = random(180);
    var colorItem = 'rgb(' + R + ',' + G + ',' + B + ')';
    if (gradient == true) {
      //渐变
      color[i] = {
        'endColor': six('rgb(' + R + ',' + G + ',' + B + ')'),
        'startColor': six('rgb(' + R + ',' + G + ',' + B + ',' + '0' + '.5' + ')'),
      };
    } else {
      //非渐变
      color[i] = six(colorItem);
    };
    // console.log(color[i]);
  };
  return color;
}

module.exports = {
  shopback: shopback,
  delet: delet,
  deletArry: deletArry,
  onTrade: onTrade,
  onDustbin: onDustbin,
  onCreateIcon: onCreateIcon,
  date_time: date_time,
  isHubei: isHubei,
  onHistory: onHistory,
  iDCard: iDCard,
  ImagesUp: ImagesUp,
  IdcardOCR: IdcardOCR,
  BusinessOCR: BusinessOCR,
  VoicePlay: VoicePlay,
  colorImg: colorImg,
  UpImages: UpImages,
  sendma: sendma,
  countDown: countDown,
  getOpenID: getOpenID,
  collectUnionId: collectUnionId,
  shareWx: shareWx,
  isSue: isSue,
  voiceText: voiceText,
  saveData: saveData,
  upDate: upDate,
  resetQuest: resetQuest,
  colorCreate: colorCreate,
};