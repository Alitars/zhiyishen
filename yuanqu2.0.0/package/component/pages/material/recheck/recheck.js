import NetworkRequest from '../../../../../template/network.js';
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import setTime from '../../../../../template/setTime.js';
const info = getApp().globalData.sysinfo;
Page({
  data: {
    SafeButtom: info.statusBarHeight * 4,
    checked: true,
    order_id: '',
    value: '',
    click_type: '',
    file: '',
    url: getApp().globalData.icon_Url,
  },
  getData(e) {
    this.toast('加载中...');
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/BrandUpload/applyUploadFile',
      data: {
        order_id: e,
        token: token,
      },
      method: "POST",
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        this.data.file = res.data.data.brand_certificate
      }
      if (code == 2) {
        this.notify('登录失效，请重新登录！');
        setTime(2000).then(res => {
          wx.navigateTo({
            url: '/pages/user/log_on/log_on',
          })
        })
      };
      Toast.clear();
    }).catch(err => {
      Toast.clear();
      
    })
  },
  onClick() {
    var checked = this.data.checked;
    var value = this.data.value;
    var order_id = this.data.order_id;
    var click_type = this.data.click_type;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var pass = false;
    if (checked) {
      var pass = true;
      var agree = 1;
    } else {
      if (value.length > 0) {
        var pass = true;
        var agree = 2;
      } else {
        var pass = false;
        this.notify('请输入修改意见！')
        return;
      }
    }
    var edit_opinion = value;
    if (pass) {
      this.toast()
      NetworkRequest({
        url: '/BrandUpload/composeNote',
        data: {
          order_id: order_id,
          click_type: click_type,
          is_agree: agree,
          edit_opinion: edit_opinion,
          token: wx.getStorageSync('token')
        },
      }).then(res => {
        this.notify(res.data.msg)
        var code = res.data.code;
        if (code == 1) {
          PrePage.onEnpush();
          setTime().then(res => {
            wx.navigateBack({
              delta: 1,
            })
          })
        }
        if (code == 2) {
          setTime().then(res => {
            wx.navigateTo({
              url: '/pages/user/log_on/log_on',
            })
          })
        };
        Toast.clear();

      }).catch(err => {
        Toast.clear();
        
      })
    }
  },

  onInput(e) {
    this.setData({
      value: e.detail
    })
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
    if (event.detail) {
      this.setData({
        value: '',
      })
    }
  },
  onLook(e) {
    var url = this.data.file;
    this.toast();
    var ss = this.data.url + url;
    wx.downloadFile({
      url: this.data.url + url,
      success: (res => {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: (res => {
            Toast.clear();
          }),
          fail: (err => {
            wx.downloadFile({
              url: getApp().globalData.icon_Url + url,
              success: (res => {
                const filePath = res.tempFilePath
                wx.openDocument({
                  filePath: filePath,
                  success: (res => {
                    Toast.clear();
                  }),
                  fail: (err => {
                    wx.previewImage({
                      current: getApp().globalData.icon_Url + url,
                      urls: [getApp().globalData.icon_Url + url],
                      success: (res => {
                        Toast.clear();
                      }),
                      fail: (err => {
                        Toast.clear();
                        this.notify('打开失败！')
                      }),
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  },
  toast(e) {
    Toast.loading({
      mask: true,
      message: e,
      duration: 0,
      zIndex: 200
    });
  },
  notify(res) {
    Notify({
      text: res,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
      zIndex: 300
    })
  },
  onLoad: function(options) {
    this.getData(options.order_id);
    this.data.type = options.type;
    this.data.order_id = options.order_id;
    this.setData({
      click_type: options.click_type
    })

  },
})