//text voice
import func from './func.js';
import setTime from './setTime.js';
import arry from './template.js';
// console.log(arry);
var innerAudioContext = getApp().globalData.innerAudioContext;
export default function vioceText(res) {
  var ss = wx.getStorageSync('voiceArry');
  if (ss ? false : true) {
    wx.setStorageSync('voiceArry', arry.voiceArry);
  };
  innerAudioContext.pause();
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  var nownRoute = pages[pages.length - 1].route;
  var isVoice = wx.getStorageSync('isVoice');
  var story = res.data.content;
  _this.setData({
    pause: true
  })
  var voiceArry = wx.getStorageSync('voiceArry');
  if (voiceArry.length > 0) {
    for (var i = 0; i < voiceArry.length; i++) {
      if (voiceArry[i].text == story) {
        var open = true;
        var vioce_Url = voiceArry[i].url;
        break;
      } else {
        var open = false;
      }
    }
  } else {
    var voiceArry = [];
    wx.setStorageSync('voiceArry', voiceArry);
    var open = false;
  };
  var i = 0;
  _this.data.time = setInterval(function () {
    var text = story.substring(0, i);
    i++;
    _this.setData({
      text: text
    });
    if (!_this.data.pause) {
      clearInterval(_this.data.time);
    };
    if (text.length == story.length) {
      clearInterval(_this.data.time);
    };
  }, 110)
  return new Promise((resolve, reject) => {
    if (isVoice) {
      if (open) {
        var pages_t = getCurrentPages();
        var nownRoute_t = pages_t[pages_t.length - 1].route;
        // console.log('本地');
        if (nownRoute_t == nownRoute) {
          resolve(vioce_Url);
          func.VoicePlay({
            vioce_Url: vioce_Url,
            nownRoute: nownRoute,
          });
        };
      } else {
        wx.request({
          url: getApp().globalData.vioce_Url + '/tts',
          data: {
            content: story,
            channelroad: 4,
            user_id: getApp().globalData.userid,
            token: getApp().globalData.token,
          },
          header: {},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (res => {
            var ss = res.data.data;
            voiceArry.push({
              text: story,
              url: ss,
            })
            wx.setStorageSync('voiceArry', voiceArry);
            var pages_t = getCurrentPages();
            var nownRoute_t = pages_t[pages_t.length - 1].route;
            if (nownRoute_t == nownRoute) {
              resolve(ss);
              func.VoicePlay({
                vioce_Url: ss,
                nownRoute: nownRoute,
              });
            };
            // console.log('xunfei');
          }),
          fail: reject,
        })
      }
    }
  })
}