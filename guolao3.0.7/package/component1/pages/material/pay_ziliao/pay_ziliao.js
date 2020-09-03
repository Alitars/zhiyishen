const info = getApp().globalData.sysinfo;
import NetworkRequest from '../../../../../template/network.js';
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
const main_Url = getApp().globalData.main_Url;
import applyType from "../../../../../template/template.js";
import setTime from '../../../../../template/setTime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    SafeButtom: info.statusBarHeight * 4,
    img_enTrust: applyType.img_enTrust,
    click_type: '',
    order_id: '',
    auth_type: '',
    apply_id: '',
    type: 1,
    one_cate: '',
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
    category: '',
    display: '',
    popup: false,
    zhuanrangren: '',
    shourangren: '',
    xuke: '',
    beixuke: '',
    checked: true,
    reason: '',
    formIndex: 0,
    formText: ['企业名义变更', '企业地址变更', '企业名义地址变更']
  },
  onTextarea(e) {
    // console.log(e.detail);
    this.setData({
      reason: e.detail
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
  onYanglei(e) {
    var id = e.currentTarget.dataset.type;
    var url = id == 1 ? this.data.icon_yanglei : this.data.img_enTrust;
    wx.previewImage({
      current: url,
      urls: [url],
    })
  },
  onBack() {
    wx.redirectTo({
      url: "/pages/user/my_order/my_order?id=" + 0,
    })
    wx.setStorageSync('order_back_type', 2);
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
    var change_type = (typeof (this.data.formIndex) == 'string' ? JSON.parse(this.data.formIndex) : this.data.formIndex) + 1;
    if (click_type == '商标注册') {
      var ss = 2;
      if (this.data.checked) {
        var choice = 1
      } else {
        var choice = 0
      }
    } else {
      var ss = 1;
      var choice = 0;
    };
    var assignee_type = this.data.assignee_type;
    var upload_file = this.data.upload_file;
    var brand_img = this.data.brand_img;
    var translated_img = this.data.translated_img;
    var type = (typeof (this.data.type) == 'string' ? JSON.parse(this.data.type) : this.data.type);
    if (type == 1) {
      if (apply_id == '' || apply_id.length == 0) {
        Toast('请添加申请人！');
        return;
      };
    };

    if (type == 2) {
      if (apply_id == '' || apply_id.length == 0) {
        Toast('请添加申请人！');
        return;
      };
      if (brand_num == '' || brand_num.length == 0) {
        Toast('请输入注册号！');
        return;
      };
      var reason = this.data.reason;
      if (!reason.replace(/\s+/g, "")) {
        Toast('请输入撤三理由!');
        return;
      };
      // if (one_cate == '' || one_cate.length == 0) {
      //   Toast('请添加商标类别！');
      //   return;
      // };
    };
    if (type == 4) {
      if (apply_id == '' || apply_id.length == 0) {
        Toast('请添加申请人！');
        return;
      };
      if (brand_num == '' || brand_num.length == 0) {
        Toast('请输入注册号！');
        return;
      };
      // if (one_cate == '' || one_cate.length == 0) {
      //   Toast('请添加商标类别！');
      //   return;
      // };
    };
    if (type == 5) {
      if (apply_id == '' || apply_id.length == 0) {
        Toast('请添加许可人！');
        return;
      };
      if (assignee_id == '' || assignee_id.length == 0) {
        Toast('请添加被许可人！');
        return;
      };
      if (brand_num == '' || brand_num.length == 0) {
        Toast('请输入注册号！');
        return;
      };
      // if (one_cate == '' || one_cate.length == 0) {
      //   Toast('请添加商标类别！');
      //   return;
      // };
      if (upload_file == '' || upload_file.length == 0) {
        Toast('请上传商标许可合同！');
        return;
      };
    };
    if (type == 6) {
      if (apply_id == '' || apply_id.length == 0) {
        Toast('请添加转让人！');
        return;
      };
      if (assignee_id == '' || assignee_id.length == 0) {
        Toast('请添加被转让人！');
        return;
      };
      if (brand_num == '' || brand_num.length == 0) {
        Toast('请输入注册号！');
        return;
      };
      // if (one_cate == '' || one_cate.length == 0) {
      //   Toast('请添加商标类别！');
      //   return;
      // };
    };
    if (type == 7) {
      if (apply_id == '' || apply_id.length == 0) {
        Toast('请添加申请人！');
        return;
      };
      if (brand_num == '' || brand_num.length == 0) {
        Toast('请输入注册号！');
        return;
      };
      // if (upload_file == '' || upload_file.length == 0) {
      //   Toast('请上传予以变更登记说明书！');
      //   return;
      // };
      // if (brand_img == '' || brand_img.length == 0) {
      //   Toast('请上传变更后营业执照！');
      //   return;
      // };
      // if (translated_img == '' || translated_img.length == 0) {
      //   Toast('请上传营业执照中文翻译件！');
      //   return;
      // };

    } else {
      var change_type = '';
    };
    if (type == 8) {
      if (apply_id == '' || apply_id.length == 0) {
        Toast('请添加申请人！');
        return;
      };
      if (brand_num == '' || brand_num.length == 0) {
        Toast('请输入注册号！');
        return;
      };
      
      // if (one_cate == '' || one_cate.length == 0) {
      //   Toast('请添加商标类别！');
      //   return;
      // };
    };
    if (type == 9) {
      if (apply_id == '' || apply_id.length == 0) {
        Toast('请添加申请人！');
        return;
      };
      if (brand_num == '' || brand_num.length == 0) {
        Toast('请输入注册号！');
        return;
      };
      // if (one_cate == '' || one_cate.length == 0) {
      //   Toast('请添加商标类别！');
      //   return;
      // };
    };
    NetworkRequest({
      url: '/BrandUpload/submitData',
      data: {
        click_type: click_type,
        order_id: order_id,
        auth_type: auth_type,
        apply_id: apply_id,
        type: ss,
        brand_num: brand_num,
        upload_file: upload_file,
        brand_img: brand_img,
        translated_img: translated_img,
        // one_cate: one_cate,
        assignee_id: assignee_id,
        assignee_type: assignee_type,
        token: token,
        change_type: change_type,
        choice: choice,
        submit_type:2
      },
      method: "POST",
    }).then(res => {
      var code = res.data.code;
      this.setData({
        popup: true,
        display: res.data.msg,
      })
      if (code == 1) {
        setTime(1500).then(res => {
          this.onBack();
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
          complete: (err => {
            Toast.clear();
          }),
        })
      })
    })
  },
  change(){

  },
  onChange(e) {
    this.setData({
      brand_num: e.detail,
    })
  },
  toast(e) {
    Toast.loading({
      message: e,
      duration: 0,
      mask: true,
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
  onClose() {
    this.setData({
      show: !this.data.show
    })
  },
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
  onConfirm(event) {
    var category = this.data.columns[event.detail.index];
    this.setData({
      category: category,
      one_cate: event.detail.index + 1,
    });
    this.onClose();
  },

  onCancel() {
    this.onClose();
  },

  onAttest() {
    wx.navigateTo({
      url: '/pages/user/attest/attest?open=' + true + '&type=' + 11,
    })
  },
  onLoad: function (options) {
    var list = applyType.applyType;
    var ss = [];
    for (var i = 0; i < list.length; i++) {
      ss.push(list[i].name)
    };
    this.setData({
      order_id: options.order_id,
      type: options.type,
      click_type: options.click_type,
      columns: ss,
    })
  },
})