import NetworkRequest from '../../../../template/network.js';
import Toast from '../../../../dist/toast/toast';
import Notify from '../../../../dist/notify/notify';
import Dialog from '../../../../dist/dialog/dialog';
import setTime from '../../../../template/setTime.js';
import chooseImgs from "../../../../template/chooseImgs.js";
import func from "../../../../template/func.js";
import copyText from "../../../../template/copyText.js";
import imageYz from '../../../../template/template.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    icon_Url: getApp().globalData.icon_Url,
    icon_yanglei: imageYz.imageYz,
    icon_idCard: imageYz.icon_idCard,
    imgUrls1: '',
    imgUrls2: '',
    imgUrls3: '',
    active: 0,
    list: {},
    err: true,
    remark: '',
    business_type: 0,
    checked: false,
    check_type: false,
    username: '',
    CardID2: '',
    bsname: '',
    CardID3: '',
    agree_cart: '',
  },
  onYanglei(e) {
    var id = e.currentTarget.dataset.type;
    var url = id == 1 ? this.data.icon_yanglei : this.data.icon_idCard;
    wx.previewImage({
      current: url,
      urls: [url],
    })
  },
  onIdCard(e) {
    var id = e.currentTarget.dataset.id;
    const img = e.detail.image_path;
    const CardID = e.detail.id.text;
    func.UpImages({
      'img': img,
      'str': id == 2 ? 'imgUrls2' : 'imgUrls3'
    });
    this.setData({
      [id == 2 ? 'CardID2' : 'CardID3']: CardID,
    })
  },
  onDown() {
    var agree_cart = this.data.agree_cart;
    var url = getApp().globalData.dm_Url + agree_cart;
    copyText(url);
    this.notify('合同链接已复制，请前去浏览器下载！');
  },
  onClicks(e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      ['CardID' + id]: e.detail.replace(/\s+/g, ""),
      bsname: id == 1 ? e.detail : this.data.bsname,
    })
  },
  onUsername(e) {
    this.setData({
      username: e.detail
    })
  },
  onReadys() {
    var url = getApp().globalData.dm_Url + '/public/materials/licenserecord/知依昇平台代理人入驻协议.pdf';
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
    wx.downloadFile({
      url: url,
      success: (res => {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: (res => {
            Toast.clear();
          })
        })
      }),
      fail: (err => {
        Toast.clear();
        Toast(err.errMsg);
      })
    })
  },
  onChange() {
    this.setData({
      checked: !this.data.checked
    })
  },
  onClick(event) {
    this.setData({
      active: event.detail.index
    })
  },
  onChooseImgs(e) {
    var id = e.currentTarget.dataset.id;
    // console.log(id);
    if (id == 4 || id == 5) {
      if (id == 4) {
        var current = this.data.icon_Url + this.data.list.business_license;
      } else {
        var current = this.data.icon_Url + this.data.list.identity_card;
      };
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: [current] // 需要预览的图片http链接列表
      });
    } else {
      if (id == 2 || id == 3) {
        var Str = 'imgUrls' + id;
        func.IdcardOCR().then(res => {
          // this.notify('识别成功');
          this.setData({
            [Str]: res.img,
            ['CardID' + id]: res.id ? res.id.replace(/\s+/g, "") : '',
          });
        }).catch(err => {
          // this.notify('请上传清晰身份证正面照');
        }); 
      } else {
        var Str = 'imgUrls' + id;
        func.BusinessOCR().then(res => {
          if (res.errcode == 0) {
            this.notify('识别成功');
            this.setData({
              [Str]: res.tempFilePaths,
              bsname: res.enterprise_name,
            })
          } else {
            this.setData({
              [Str]: res.tempFilePaths,
            })
          }
          wx.hideLoading();
        }).catch(err => {
          wx.hideLoading();
        })
      }
    };
  },
  notify(res) {
    Notify({
      text: res,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
  },
  toast() {
    Toast.loading({
      message: '上传中...',
      duration: 0,
    });
  },
  upData() {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var company_name = this.data.bsname;
    var username = this.data.username;
    var checked = this.data.checked;
    var check_type = this.data.check_type;
    var active = this.data.active;
    var imgUrls1 = this.data.imgUrls1;
    var imgUrls2 = this.data.imgUrls2;
    var imgUrls3 = this.data.imgUrls3;
    if (!username.replace(/\s+/g, "")) {
      this.notify('请填写昵称！');
      return;
    };
    if (active == 0) {
      var business_license = imgUrls1;
      var identity_card = imgUrls2;
      var identity_num = this.data.CardID2;
      if (!business_license) {
        this.notify('请上传营业执照!');
        return;
      };
      if (!company_name) {
        this.notify('请填写企业名称！');
        return;
      };
      if (!identity_card) {
        this.notify('请上传法人身份证！');
        return;
      };
      if (!identity_num) {
        this.notify('请填写法人身份证号！');
        return;
      };
    } else {
      var identity_num = this.data.CardID3;
      var business_license = '';
      var identity_card = imgUrls3;
      if (!identity_card) {
        this.notify('请上传个人身份证！');
        return;
      };
      if (!identity_num) {
        this.notify('请填写个人身份证号！');
        return;
      };
    };
    if (check_type == false) {
      if (checked == false) {
        this.notify('请阅读并同意知依昇平台代理人入驻协议!');
        return;
      };
    };
    NetworkRequest({
      url: '/usercenter/changinfo',
      data: {
        business_license: business_license,
        business_type: active == 0 ? 1 : 2,
        identity_card: identity_card,
        user_type: 2,
        name: username,
        company_name: company_name,
        identity_num: identity_num,
      },
      method: "POST"
    }).then(res => {
      var code = res.data.code;
      this.notify(res.data.msg);
      if (code == 1) {
        PrePage.getData();
        setTime().then(s => {
          wx.navigateBack({
            delta: 1,
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var info = PrePage.data.info;
    var list = PrePage.data.list;
    var err = PrePage.data.err;
    var remark = PrePage.data.remark;
    var check_type = list.check_type;
    if (check_type == 0) {
      this.setData({
        username: info.nickname ? info.nickname : info.mobile,
      });
    } else {
      this.setData({
        username: info.name,
        CardID2: info.identity_num,
        CardID3: info.identity_num,
        bsname: info.company_name,
        agree_cart: info.agree_cart,
      });
    };
    this.setData({
      check_type: check_type == 0 ? false : true,
    });
    var business_type = list.business_type;
    var user_type = list.user_type;
    if (user_type == 1) {
      this.setData({
        imgUrls1: '',
        imgUrls2: '',
        imgUrls3: '',
        active: 0,
        show: false,
        err: err,
        remark: remark,
        business_type: business_type,
      });
      return;
    };
    if (business_type == 0) {
      var active = 0;
    };
    if (business_type == 1) {
      var active = 0;
    };
    if (business_type == 2) {
      var active = 1;
    };
    if (list.business_type == 1) {
      this.setData({
        imgUrls1: list.business_license,
        imgUrls2: list.identity_card,
        imgUrls3: '',
        active: active,
        err: err,
        remark: remark,
        business_type: business_type,
      })
    } else {
      this.setData({
        imgUrls1: '',
        imgUrls2: '',
        imgUrls3: active == 0 ? '' : list.identity_card,
        active: active,
        err: err,
        remark: remark,
        business_type: business_type,
      })
    };
    if (check_type == 0) {
      var show = false;
    };
    if (check_type == 1) {
      var show = true;
    };
    if (check_type == 2) {
      var show = true;
    };
    if (check_type == 3) {
      var show = false;
    };
    this.setData({
      list: list,
      show: show,
      err: err,
      remark: remark,
      business_type: business_type,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})