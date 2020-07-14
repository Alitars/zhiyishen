import NetworkRequest from '../../../../../template/network.js';
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
const info = getApp().globalData.sysinfo;
const main_Url = getApp().globalData.main_Url;
import chooseImgs from '../../../../../template/chooseImgs.js';
import setTime from '../../../../../template/setTime.js';
Page({
  data: {
    type: '-1',
    brand_register_img: '',
    brand_bailment_img: '',
    brand_certificate: '',
    makeover_prove: '',
    click_type: '',
    order_id: '',
    SafeButtom: info.statusBarHeight * 4,
    icon_Url: getApp().globalData.icon_Url,
    gai_licensee: '',
  },
  onUpImg() {
    chooseImgs('gai_licensee');
  },
  onUpload(e) {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var token = wx.getStorageSync('token');
    var type = this.data.type;
    var brand_register_img = this.data.brand_register_img;
    var brand_bailment_img = this.data.brand_bailment_img;
    var brand_certificate = this.data.brand_certificate;
    var makeover_prove = this.data.makeover_prove;
    var click_type = this.data.click_type;
    var order_id = this.data.order_id;
    var gai_licensee = this.data.gai_licensee;
    if (gai_licensee == undefined) {
      var gai_licensee = ''
    };
    if (gai_licensee == null) {
      var gai_licensee = ''
    };
    if (brand_certificate == undefined) {
      var brand_certificate = '';
    };
    if (brand_certificate == undefined) {
      var brand_certificate = ''
    }
    if (brand_register_img == null) {
      var brand_register_img = ''
    }
    if (brand_register_img == undefined) {
      var brand_register_img = ''
    }
    if (brand_bailment_img == undefined) {
      var brand_bailment_img = ''
    }
    if (brand_bailment_img == null) {
      var brand_bailment_img = ''
    }
    if (type == 0) {
      if (brand_bailment_img.length == 0 || brand_bailment_img == '') {
        Toast('请上传申请书第一页！');
        return;
      }
      if (brand_certificate.length == 0 || brand_bailment_img == '') {
        Toast('请上传申请书第二页！');
        return;
      }
      if (brand_register_img.length == 0 || brand_register_img == '') {
        Toast('请上传委托书！');
        return;
      }
      var ss = brand_bailment_img += ',';
      ss += brand_certificate;
      this.toast('提交中...');
      NetworkRequest({
        url: '/BrandUpload/uploadFileSeal',
        data: {
          click_type: click_type,
          order_id: order_id,
          brand_bailment_img: brand_register_img,
          brand_register_img: ss,
          token: token,
        },
      }).then(res => {
        var code = res.data.code;
        Toast.clear();
        if (code == 1) {
          this.notify('提交成功！');
          setTime().then(res => {
            wx.navigateBack({
              delta: 1,
            });
          });
        };
      }).catch(err => {
        Toast.clear();
        this.notify("提交失败！");
      })

    };
    if (type == 2) {
      if (brand_register_img.length == 0) {
        Toast('请上传申请书！');
        return;
      }
      if (brand_bailment_img.length == 0) {
        Toast('请上传委托书！');
        return;
      }
      if (brand_certificate.length == 0) {
        Toast('请上传受让委托书！');
        return;
      }
      if (makeover_prove.length == 0) {
        Toast('转让证明！');
        return;
      }
      this.toast('提交中...');
      NetworkRequest({
        url: '/BrandUpload/uploadFileSeal',
        data: {
          click_type: click_type,
          order_id: order_id,
          brand_register_img: brand_register_img,
          brand_bailment_img: brand_bailment_img,
          brand_certificate: brand_certificate,
          makeover_prove: makeover_prove,
          token: token,
          gai_licensee:''
        },
      }).then(res => {
        var code = res.data.code;
        Toast.clear();
        if (code == 1) {
          this.notify('提交成功！');
          setTime().then(res => {
            wx.navigateBack({
              delta: 1,
            });
          });
        };
      }).catch(err => {
        Toast.clear();
        this.notify("提交失败！");
      })
    };
    if (type == 1 || type == 3 || type == 4 || type == 5 || type == 6) {
      if (brand_bailment_img.length == 0) {
        if (type == 1 || type == 3 || type == 5 || type == 6) {
          Toast('请上传申请书！');
        }
        if (type == 4) {
          Toast('请上传备案表！');
        }
        return;
      }
      if (brand_bailment_img.length == 0) {
        if (type == 0) {
          Toast('请上传申请书！');
        }
      }
      if (brand_register_img.length == 0) {
        if (type == 3) {
          Toast('请上传委托书！');
          return;
        }
      };
      if (gai_licensee.length == 0) {
        if (type == 4) {
          Toast('请上传被许可委托书！')
          return;
        }
      };
      this.toast('提交中...');
      NetworkRequest({
        url: '/BrandUpload/uploadFileSeal',
        data: {
          click_type: click_type,
          order_id: order_id,
          brand_register_img: brand_register_img,
          brand_bailment_img: brand_bailment_img,
          makeover_prove: '',
          token: token,
          gai_licensee: gai_licensee,
        },
      }).then(res => {
        var code = res.data.code;
        Toast.clear();
        if (code == 1) {
          PrePage.onEnpush()
          this.notify('提交成功！');
          setTime().then(res => {
            wx.navigateBack({
              delta: 1,
            });
          });

        } else {
          this.notify("提交失败！");
        }
      }).catch(err => {
        Toast.clear();
        this.notify("提交失败！");
      })
    };
  },


  onChooseImgs(e) {
    var id = e.currentTarget.dataset.id;
    var icon_url = this.data.icon_Url;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (res => {
        var url = res.tempFilePaths[0];
        this.toast('上传中...');
        wx.uploadFile({
          url: main_Url + '/BrandUpload/brandUploadFile',
          filePath: url,
          name: 'url_img',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {

          },
          success: (res => {
            if (typeof (res.data) == 'string') {
              var list = JSON.parse(res.data);
            } else {
              var list = res.data;
            };
            var imgUrls = list.filepath
            var code = list.code;
            if (code == 1) {
              if (id == 1) {
                this.setData({
                  brand_register_img: imgUrls,
                })
              };
              if (id == 2) {
                this.setData({
                  brand_bailment_img: imgUrls,
                })
              };
              if (id == 3) {
                this.setData({
                  brand_certificate: imgUrls,
                })
              };
              if (id == 4) {
                this.setData({
                  makeover_prove: imgUrls,
                })
              };
            }
            this.notify('上传成功！');
          }),
          fail: (res => {
            this.notify('上传失败！');
          }),
          complete: (ess => {
            Toast.clear();
          }),
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
      duration: 1000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
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
      var arry = res.data.data;
      var code = res.data.code;
      var icon_Url = this.data.icon_Url;
      if (code == 1) {
        if (this.data.type == 0) {
          this.setData({
            brand_register_img: arry.brand_bailment_img,
            brand_bailment_img: arry.brand_register_img.split(',')[0],
            brand_certificate: arry.brand_register_img.split(',')[1],
            makeover_prove: arry.makeover_prove,
            gai_licensee: arry.gai_licensee,
          })
        } else {
          this.setData({
            brand_register_img: arry.brand_register_img,
            brand_bailment_img: arry.brand_bailment_img,
            brand_certificate: arry.brand_certificate,
            makeover_prove: arry.makeover_prove,
            gai_licensee: arry.gai_licensee
          })
        }
      } else {

      }
      Toast.clear();
    }).catch(err => {
      
      Toast.clear();
    })
  },
  onLoad: function(options) {
    this.setData({
      type: options.type,
      order_id: options.order_id,
      click_type: options.click_type
    })
    this.getData(options.order_id);
  },
})