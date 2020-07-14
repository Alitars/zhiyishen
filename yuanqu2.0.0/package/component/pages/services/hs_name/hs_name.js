import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
const menuInfo = getApp().globalData.menuInfo;
const info = getApp().globalData.sysinfo;
import vioceText from '../../../../../template/vioceText.js';
import recoder from '../../../../../template/recorder.js';
import canonical from '../../../../../template/canonical.js';
import clickrepeat from '../../../../../template/clickrepeat.js';
import setTime from '../../../../../template/setTime.js';
import animation from '../../../../../template/animation.js';
import chooseImgs from '../../../../../template/chooseImgs.js';
import func from '../../../../../template/func.js';
Page({
  data: {
    show: '',
    text: '',
    groups: '',
    SafeButtom: info.statusBarHeight * 4,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    SafeHigh: info.windowHeight,
    info: info,
    menuInfo: menuInfo,
    value: '',
    imgUrls: '',
    imgUrlsTwo: '',
    icon_Url: getApp().globalData.icon_Url,
    url: getApp().globalData.icon_Url,
    ch: 1,
    arry: [],
    create: "",
    animationStatus: false,
    display: false,
    slider: '',
    isSelect: 0,
    btn: [{
      text: '文字商标',
    }, {
      text: '图形商标',
    }],
    keys: '',
    animationData: '',
    active: 0,
    src: '',
    width: 250, //宽度
    height: 300, //高度
    max_width: 400,
    max_height: 400,
    disable_rotate: true, //是否禁用旋转
    disable_ratio: false, //锁定比例
    limit_move: true, //是否限制移动
    isCut: false,
    imgUrls_id: 1,
    imgUrlsTwo_id: 1,
    imgUrlsyuantu: '',
    imgUrlsheibai: '',
    imgUrlsTwoyuantu: '',
    imgUrlsTwoheibai: '',
    formIndex: 0,
    formText: [],
  },
  _onSelect(e) {
    var id = e.currentTarget.dataset.id;
    var isSelect = this.data.isSelect;
    var Str = isSelect == 0 ? 'imgUrls' : 'imgUrlsTwo';
    var _id = this.data[Str + '_id'];
    if (this.data[Str + 'yuantu'] == '' || this.data[Str + 'heibai'] == '') {
      Toast('请先上传图片！')
      return;
    };
    if (id !== _id) {
      this.setData({
        [Str + '_id']: id,
        [Str]: id == 1 ? this.data[Str + 'yuantu'] : this.data[Str + 'heibai'],
      })
    }
  },
  onBlock() {
    this.setData({
      display: true
    })
  },

  onBtn(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      isSelect: index,
    })
  },
  onClick(e) {
    var id = e.currentTarget.dataset.id;
    var key = this.data.keys
    var text = this.data.value;
    func.onHistory().then(back => {
      if (id == 1 || id == 2) {
        clickrepeat(text, this).then(res => {
          var groups = this.data.groups + ',' + text;
          wx.setStorageSync('groups', groups);
          if (id == 1) {
            wx.navigateTo({
              url: '/package/component/pages/services/same_similar/same_similar?text=' + text + "&imgUrls=" + this.data.create + "&id=" + id + '&key=' + key,
            });
          };
          if (id == 2) {
            wx.navigateTo({
              url: '/package/component/pages/services/same_similar/same_similar?text=' + text + "&imgUrls=" + this.data.imgUrls + "&id=" + id + '&key=' + key,
            });
          };
        })
      } else {
        if (id == 3) {
          var groups = this.data.groups + ',';
          wx.setStorageSync('groups', groups);
          wx.navigateTo({
            url: '/package/component/pages/services/same_similar/same_similar?text=' + '' + "&imgUrls=" + this.data.imgUrlsTwo + "&id=" + id + '&key=' + key,
          })
        }
      }
    });
  },
  notify(res) {
    Notify({
      text: res,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    })
  },
  onVioce() {
    recoder('start')
  },

  onStop() {
    recoder('stop').then(res => {
      canonical(res.data.data);
      if (res.data.data.length > 0) {
        func.onCreateIcon(this.data.value, this.data.ch).then(s => {
          var code = s.data.code;
          if (code == 1) {
            this.setData({
              create: s.data.img,
              value: this.data.value,
              isSelect: 0,
            })
          } else {
            this.notify(s.data.msg);
          };
        })
      }
    })
  },
  onSlider(e) {
    var win = getApp().globalData.sysinfo.screenWidth;
    var id = e.currentTarget.dataset.id;
    this.setData({
      slider: id,
      active: id,
    });
    animation(id * win / 2);
  },

  onClose(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 2) {
      this.onCreateIcon();
      this.setData({
        show: !this.data.show,
      });
    } else {
      this.setData({
        show: !this.data.show,
      });
    }
  },

  //picker
  bindPickerChange(e) {
    var value = e.detail.value;
    var id = this.data.form[value].id;
    this.setData({
      ch: id,
      formIndex: value,
    })
    this.onCreateIcon();
  },

  onCreateIcon(e) {
    if (e) {
      canonical(e.detail.value);
    };
    if (this.data.isSelect == 0 && this.data.value.length > 0) {
      this.toast();
      wx.request({
        url: this.data.url + '/api/BrandUpload/operationFile',
        data: {
          brand_name: this.data.value,
          type: this.data.ch,
          channelroad: 4,
          user_id: getApp().globalData.userid,
          token: getApp().globalData.token,
        },
        header: {},
        method: 'POST',
        success: (res => {
          console.log(res);
          Toast.clear();
          var code = res.data.code;
          if (code == 1) {
            this.setData({
              create: res.data.img,
            })
          } else {
            this.notify('fail' + ' ' + 'statusCode：' + res.statusCode);
          };
        }),
        fail: (err => {
          Toast.clear();
          this.notify('图片生成失败！');
        }),
      })
    };
    if (this.data.value.length == 0) {
      this.setData({
        create: '',
      })
    }
  },
  onChange(e) {
    canonical(e.detail);
    if (this.data.value.length == 0) {
      this.setData({
        create: '',
      })
    }
  },
  onClear(e) {
    this.setData({
      create: '',
    })
  },
  onChoose(e) {
    var id = e.currentTarget.dataset.id;
    var form = this.data.form
    for (var i = 0; i < form.length; i++) {
      if (form[i].id == id) {
        form[i].iSchoose = true;
      } else {
        form[i].iSchoose = false;
      }
    };
    this.setData({
      form: form,
      ch: id,
    })
  },
  clickcut(e) {
    wx.previewImage({
      current: e.detail.url,
      urls: [e.detail.url]
    })
  },

  loadimage(e) {
    wx.hideLoading();
  },

  onImagesUp(e) {
    var obj = {
      url: e.detail.url,
    };
    func.colorImg(obj)
  },

  onChooseImg(e) {
    var isSelect = this.data.isSelect;
    if (isSelect == 0) {
      getApp().globalData.DataStr = 'imgUrls';
    } else {
      getApp().globalData.DataStr = 'imgUrlsTwo';
    };
    wx.chooseImage({
      success: (res => {
        console.log(res)
        var tempFilePaths = res.tempFilePaths[0];
        wx.getImageInfo({
          src: tempFilePaths,
          success: ((event) => {
            var info = getApp().globalData.sysinfo;
            console.log(info)
            var screenWidth = info.screenWidth - 40;
            if (event.width > screenWidth) {
              var width = screenWidth;
              var height = event.height / (event.width / screenWidth);
            } else {
              var width = info.screenWidth - 40;
              var height = event.height / (event.width / screenWidth);
            };
            this.setData({
              src: tempFilePaths,
              width: width, //宽度
              height: height, //高度
              max_width: width,
              max_height: height,
              isCut: true,
            })
            this.cropper = this.selectComponent("#image-cropper");
            this.cropper.imgReset();
          })
        })
      })
    })
  },
  onForm() {
    NetworkRequest({
      url: '/shopCar/fonts',
      data: {},
      method: 'GET',
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        var formText = [];
        for (var i = 0; i < arry.length; i++) {
          if (i == 0) {
            arry[i].iSchoose = true;
          } else {
            arry[i].iSchoose = false;
          };
          formText.push(arry[i].font_name);
        };
        this.setData({
          form: arry,
          formText: formText,
          ch: arry[0].id,
        })
      } else {
        Toast(res.data.msg);
      };
    }).catch(err => {})
  },
  isSelect() {
    if (this.data.isSelect == 0) {
      this.setData({
        isSelect: 0
      })
    };
  },
  onBack() {
    wx.navigateBack();
  },
  onLoad: function (options) {
    this.setData({
      isSelect: 0
    })
    vioceText({
      data: {
        content: '请输入您要申请的商标名称',
      },
    }).then(res => {})
    this.onForm();
    var time = setInterval((res) => {
      setTime(30).then(res => {
        this.isSelect();
      })
      setTime(300).then((res) => {
        clearInterval(time);
      })
    }, 10)
  },

  onReady: function () {

  },
  onUnload: function () {

  },
})