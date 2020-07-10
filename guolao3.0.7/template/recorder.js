import Toast from '../dist/toast/toast';
export default function recoder(isShow) {
  var recorderManager = getApp().globalData.recorderManager;
  var innerAudioContext = getApp().globalData.innerAudioContext;
  innerAudioContext.pause();
  if (false) {
    //xun fei 
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    return new Promise((resolve, reject) => {
      var userid = wx.getStorageSync('userid');
      var token = wx.getStorageSync('token');
      const open = false;
      wx.authorize({
        scope: 'scope.record',
        success() {
          const open = true;
          const options = {
            duration: 10000,
            sampleRate: 44100,
            numberOfChannels: 1,
            encodeBitRate: 192000,
            format: 'mp3',
            frameSize: 50
          }
          if (isShow == 'start' && open == true) {
            recorderManager.start(options);
            recorderManager.onStart(() => {});
            _this.setData({
              animationStatus: true,
            });
          }
          if (isShow == 'stop' && open == true) {
            recorderManager.stop();
            _this.setData({
              animationStatus: false,
            });
            recorderManager.onStop((e) => {
              wx.uploadFile({
                url: getApp().globalData.vioce_Url + '/usercenter/upload_head',
                filePath: e.tempFilePath,
                name: 'pic',
                header: {
                  'content-type': 'multipart/form-data'
                },
                formData: {
                  user_id: userid,
                  token: token,
                },
                success: (ss => {
                  var a = JSON.parse(ss.data).data.head_img
                  wx.request({
                    url: getApp().globalData.dm_Url + '/app/iat',
                    data: {
                      path: a,
                    },
                    header: {},
                    method: 'GET',
                    dataType: 'json',
                    responseType: 'text',
                    success: resolve,
                    fail: reject,
                  })
                })
              })
            })
          }
        },
        fail() {
          wx.showModal({
            title: '提示',
            content: '请授权语音功能！',
            showCancel: true,
            confirmText: "去授权",
            confirmColor: "#f96006",
            success: (res => {
              if (res.confirm) {
                wx.openSetting({})
              }
            })
          })
        }
      })
    })
  } else {
    //wx
    var manager = getApp().globalData.manager;
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    return new Promise((resolve, reject) => {
      var open = false;
      wx.authorize({
        scope: 'scope.record',
        success() {
          var open = true;
          if (isShow == 'start' && open == true) {
            manager.start({
              duration: 60000,
              lang: "zh_CN"
            })
            _this.setData({
              animationStatus: true,
            });
          }
          if (isShow == 'stop' && open == true) {
            manager.stop();
            _this.setData({
              animationStatus: false,
            });
            manager.onStop = function (res) {
              var result = res.result;
              resolve({
                data: {
                  data: result ? result.replace(/[\ |\s*|\？|\！|\…|\‘|\’|\；|\【|\】|\·|\/|\、|\|\。|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\<|\.|\>|\/|\?]/g, "").replace(/[0-9]+/g, "") : ''
                }
              });
            }
          }
        },
        fail() {
          wx.showModal({
            title: '提示',
            content: '请授权语音功能！',
            showCancel: true,
            confirmText: "去授权",
            confirmColor: "#f96006",
            success: (res => {
              if (res.confirm) {
                wx.openSetting({})
              }
            })
          })
        }
      })
    })
  }
}