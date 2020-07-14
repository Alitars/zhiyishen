const info = getApp().globalData.sysinfo;
import NetworkRequest from '../../../../../template/network.js';
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
const main_Url = getApp().globalData.main_Url;
import applyType from "../../../../../template/template.js";
import setTime from '../../../../../template/setTime.js';
Page({
  data: {
    SafeButtom: info.statusBarHeight * 4,
    click_type: '',
    order_id: '',
    auth_type: '',
    apply_id: '',
    type: 1,
    // one_cate: '',
    brand_num: '',
    upload_file: '',
    brand_img: '',
    translated_img: '',
    assignee_id: '',
    assignee_type: '',
    name: '',
    icon_Url: getApp().globalData.icon_Url,
    columns: [],
    show: false,
    // category: '',
    display: '',
    popup: false,
    zhuanrangren: '',
    shourangren: '',
    xuke: '',
    beixuke: '',
    applyType: applyType.applyType,
    arry: [],
    checked: true,
    reason: '',
    formIndex: 0,
    formText: ['企业名义变更', '企业地址变更', '企业名义地址变更']
  },
  onYanglei(e) {
    var id = e.currentTarget.dataset.type;
    var url = id == 1 ? this.data.icon_yanglei : this.data.img_enTrust;
    wx.previewImage({
      current: url,
      urls: [url],
    })
  },
  bindPickerChange(e) {
    var value = e.detail.value;
    // var id = this.data.form[value].id;
    this.setData({
      // ch: id,
      formIndex: value,
    })
    // this.onCreateIcon();
  },
  onTextarea(e) {
    console.log(e.detail);
    this.setData({
      reason: e.detail
    })
  },
  onCheck() {
    var checked = this.data.checked;
    if (checked) {
      this.setData({
        checked: false
      })
    } else {
      this.setData({
        checked: true
      })
    }
  },
  onUpData() {
    var token = wx.getStorageSync('token');
    var order_id = this.data.order_id;
    var auth_type = this.data.auth_type;
    var apply_id = this.data.apply_id;
    var click_type = this.data.click_type;
    // var one_cate = this.data.one_cate;
    var brand_num = this.data.brand_num;
    var assignee_id = this.data.assignee_id;
    var assignee_type = this.data.assignee_type;
    var upload_file = this.data.upload_file;
    var brand_img = this.data.brand_img;
    var translated_img = this.data.translated_img;
    var type = (typeof (this.data.type) == 'string' ? JSON.parse(this.data.type) : this.data.type);
    var change_type = (typeof (this.data.formIndex) == 'string' ? JSON.parse(this.data.formIndex) : this.data.formIndex) + 1;
    if (type !== 7) {
      var change_type = '';
    };
    if (type == 2) {
      var reason = this.data.reason;
      if (!reason.replace(/\s+/g, "")) {
        Toast('请输入撤三理由!');
        return;
      };
    };
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    if (click_type == '商标注册') {
      if (this.data.checked) {
        var choice = 1
      } else {
        var choice = 0
      }
    } else {
      var choice = 0
    }
    NetworkRequest({
      url: '/BrandUpload/submitData',
      data: {
        click_type: click_type,
        order_id: order_id,
        auth_type: auth_type,
        apply_id: apply_id,
        type: 2,
        brand_num: brand_num,
        upload_file: upload_file,
        brand_img: brand_img,
        translated_img: translated_img,
        // one_cate: one_cate,
        assignee_id: assignee_id,
        assignee_type: assignee_type,
        token: token,
        choice: choice,
        revoking_reson: reason,
        change_type: change_type,
      },
      method: "POST",
    }).then(res => {
      var code = res.data.code;
      this.setData({
        popup: true,
        display: res.data.msg,
      })
      if (code == 1) {
        PrePage.onEnpush();
        setTime().then(res => {
          wx.navigateBack({
            delta: 1,
          })
        })
      }
    }).catch(err => {})
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
            var type = this.data.type;
            if (typeof (res.data) == 'string') {
              var list = JSON.parse(res.data);
            } else {
              var list = res.data;
            };
            var imgUrls = list.filepath
            var code = list.code;
            if (code == 1) {
              if (id == 2) {
                this.setData({
                  upload_file: imgUrls,
                });
              };
              if (id == 1) {
                this.setData({
                  brand_img: imgUrls,
                });
              };
              if (id == 3) {
                this.setData({
                  translated_img: imgUrls,
                });
              };
            }
            this.notify('上传成功！');
          }),
          fail: (err => {
            this.notify('上传失败！');
          }),
          complete: (res => {
            Toast.clear();
          }),
        })
      })
    })
  },
  onChange(e) {
    this.setData({
      brand_num: e.detail,
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
  onClick() {
    this.onUpData();
  },
  // onClose() {
  //   this.setData({
  //     show: !this.data.show
  //   })
  // },
  //xukeren
  onXuke(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      wx.navigateTo({
        url: '/pages/user/attest/attest?open=' + true + '&type=' + 44,
      })
    } else {
      wx.navigateTo({
        url: '/pages/user/attest/attest?open=' + true + '&type=' + 55,
      })
    }
  },
  //转让人选择
  onZhuanRang(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      wx.navigateTo({
        url: '/pages/user/attest/attest?open=' + true + '&type=' + 22,
      })
    } else {
      wx.navigateTo({
        url: '/pages/user/attest/attest?open=' + true + '&type=' + 33,
      })
    }
  },
  // onConfirm(event) {
  //   var category = this.data.columns[event.detail.index];
  //   this.setData({
  //     category: category,
  //     one_cate: event.detail.index + 1,
  //   });
  //   this.onClose();
  // },

  // onCancel() {
  //   this.onClose();
  // },

  onAttest() {
    wx.navigateTo({
      url: '/pages/user/attest/attest?open=' + true + '&type=' + 11,
    })
  },
  getData(order_id, click_type) {
    this.toast('加载中...');
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/BrandUpload/uploadDetail',
      data: {
        token: token,
        order_id: order_id,
        click_type: click_type,
      },
      method: 'POST',
    }).then(res => {
      var list = res.data.data;
      var code = res.data.code;
      // var type = applyType.applyType[JSON.parse(list.brand_update.one_cate) - 1].name;
      var brand_type = wx.getStorageSync('brand_type');
      for (var i = 0; i < list.authentication.length; i++) {
        if (list.brand_update.apply_id == list.authentication[i].id) {
          var name = list.authentication[i].chinese_name;
          var zhuanrangren = list.authentication[i].chinese_name;
          var xuke = list.authentication[i].chinese_name;
        };
        if (list.brand_update.assignee_id == list.authentication[i].id) {
          var shourangren = list.authentication[i].chinese_name;
          var beixuke = list.authentication[i].chinese_name;
        }
      };
      for (var i = 0; i < list.business.length; i++) {
        if (list.brand_update.apply_id == list.business[i].id) {
          if (!name) {
            var name = list.business[i].company_name;
          }
          if (!zhuanrangren) {
            var zhuanrangren = list.business[i].company_name;
          }
          if (!xuke) {
            var xuke = list.business[i].company_name;
          }
        };
        if (list.brand_update.assignee_id == list.business[i].id) {
          if (!shourangren) {
            var shourangren = list.business[i].company_name;
          }
          if (!beixuke) {
            var beixuke = list.business[i].company_name;
          }

        }
      }
      if (code == 1) {
        this.setData({
          arry: list.brand_update,
          // category: type,
          // one_cate: JSON.parse(list.brand_update.one_cate),
          brand_num: list.brand_update.brand_num,
          name: name,
          upload_file: list.brand_update.upload_file,
          brand_img: list.brand_update.change_img,
          translated_img: list.brand_update.translated_img,
          zhuanrangren: zhuanrangren,
          shourangren: shourangren,
          assignee_id: list.brand_update.assignee_id,
          assignee_type: list.brand_update.assignee_type,
          auth_type: list.brand_update.auth_type,
          xuke: xuke,
          beixuke: beixuke,
          reason: list.brand_update.revoking_reson ? list.brand_update.revoking_reson : '',
          formIndex: this.data.type == 7 ? (list.brand_update.change_type ? list.brand_update.change_type : 1) - 1 : 0,
        })
      };
      if (code == 2) {
        this.notify(res.data.msg);
        setTime().then(res => {
          wx.navigateTo({
            url: '/pages/user/log_on/log_on',
          });
        });
      };
      Toast.clear();
    }).catch(err => {
      Toast.clear();
    })
  },
  onLoad: function (options) {
    this.getData(options.order_id, options.click_type);
    var list = applyType.applyType;
    var ss = [];
    for (var i = 0; i < list.length; i++) {
      ss.push(list[i].name)
    };
    this.setData({
      apply_id: options.apply_id,
      order_id: options.order_id,
      // one_cate: options.one_cate,
      type: options.type,
      click_type: options.click_type,
      columns: ss,
    })
  },
})