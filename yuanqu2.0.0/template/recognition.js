// 微信同声传译插件
export default function recoder(isShow) {
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  wx.setInnerAudioOption({
    obeyMuteSwitch: false,
    mixWithOther: false,
  })
  return new Promise((resolve, reject) => {
    // const plugin = requirePlugin("WechatSI");
    // const manager = plugin.getRecordRecognitionManager();
    var manager = getApp().globalData.manager;
    const open = false;
    wx.authorize({
      scope: 'scope.record',
      success() {
        const open = true;
        manager.onRecognize();
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
          manager.onStop = function(res) {
            var arry = {
              data: {
                data: res.result
              }
            }
            resolve(arry)
          }
        }
      },
      fail() {
        wx.showModal({
          title: '提示',
          content: '请授权语音功能',
          showCancel: true,
          confirmText: "去授权",
          confirmColor: "#f96006",
          success: (res=> {
            if (res.confirm) {
              wx.openSetting({})
            }
          })
        })
      }
    })
  })
}