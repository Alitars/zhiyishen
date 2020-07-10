//wei jin ci cha xun
import Toast from '../dist/toast/toast';
import Notify from '../dist/notify/notify';
export default function clickrepeat(key) {
  return new Promise((resolve, reject) => {
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    if (userid.length == 0 || token.length == 0 || userid == '' || token == '' || userid == null || token == null) {
      wx.showModal({
        title: '提示',
        content: '请登录后使用',
        showCancel: true,
        cancelText: '暂不登录',
        cancelColor: '#7d7e80',
        confirmText: '去登录',
        confirmColor: '#f96006',
        success: (res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/user/log_on/log_on',
            })
          } else {
            return
          }
        }),
      })
    } else {
      if (!_this.data.click) {
        _this.data.click = 1
      };
      if (_this.data.click == 1) {
        _this.data.click = 2;
        _this.toast();
        wx.request({
          url: getApp().globalData.main_Url + '/lawselect',
          data: {
            keywords: key,
            user_id: getApp().globalData.userid,
            token: getApp().globalData.token
          },
          header: {},
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: (ss => {
            // console.log(ss,'sdsdsd')
            if (ss.statusCode !== 200) {
              Notify({
                text: 'fail： statusCode：' + +res.statusCode,
                duration: 5000,
                selector: '#custom-selector',
                backgroundColor: '#f44',
                color: '#fff',
              });
              return
            } else {
              wx.stopPullDownRefresh();
              _this.data.click = 1;
              Toast.clear();
              var code = ss.data.data;
              if (code == 0) {
                if (_this.route == 'pages/index/index') {
                  wx.showToast({
                    title: '禁用：' + ss.data.msg,
                    icon: 'none',
                    duration: 3000,
                  })
                } else {
                  _this.notify('禁用：' + ss.data.msg)
                }
              } else {
                resolve(ss)
              }
            }
          }),
          fail: (err => {
            if (err.errMsg == 'request:fail timeout') {
              var toast = '网络已超时，请稍后重试哦~'
            } else {
              var toast = err.errMsg
            };
            _this.data.click = 1;
            Toast.clear();
            _this.notify(toast)
          }),
        })
      }
    }
  })
}