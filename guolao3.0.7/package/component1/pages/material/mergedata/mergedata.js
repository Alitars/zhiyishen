import NetworkRequest from '../../../../../template/network.js';
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import copyText from '../../../../../template/copyText.js';
const info = getApp().globalData.sysinfo;
import applyType from "../../../../../template/template.js";
import chooseImgs from "../../../../../template/chooseImgs.js";
import preview from "../../../../../template/preview.js";
import setTime from '../../../../../template/setTime.js';
import func from '../../../../../template/func.js';
Page({
  data: {
    SafeButtom: info.statusBarHeight * 4,
    img_business: applyType.imageYz,
    // img_identity: applyType.img_identity,
    order_id: '',
    apply_id: '',
    arry: [],
    icon_Url: getApp().globalData.icon_Url,
    cate_name: '',
    auth_type: '',
    name: '',
    referee: '',
    license_num: '',
    card_address: '',
    imgUrls: '',
    imgUrlsTwo: '',//委托书
    order: [],
    brand_num: '',
    one_cate: '',
    good_name: '',
    show: false,
    form: [],
    ch: -1,
    index: -1,
    checkArry: [{
      title: '商标颜色：',
      one: '黑白注册',
      two: '指定颜色注册',
      checkone: false,
      checktwo: false,
      isBind: false,
    }, {
      title: '共有商标：',
      one: '是',
      two: '否',
      checkone: false,
      checktwo: true,
    }],
    qiye: {},
    qiyeName: '',
    url: '',
    attestType: 0,
    checkThree: false,
    checkFrou: false,
    yanglei: applyType.yanglei,
    // src: '',
    // width: 250, //宽度
    // height: 300, //高度
    // max_width: 400,
    // max_height: 400,
    // disable_rotate: true, //是否禁用旋转
    // disable_ratio: false, //锁定比例
    // limit_move: true, //是否限制移动
    isCut: false,
    formText: [],
    formIndex: 0,
    isPreviewImage: false,
    identity_img: '',
    business_img: '',
    logoImg:'',
  },

  onChooseImgs(e) {
    this.data.isPreviewImage = true;
    var id = e.currentTarget.dataset.id;
    console.log(id)
    if (id == 1) {
      func.BusinessOCR().then((res) => {
        this.setData({
          business_img: res.tempFilePaths,
        })
      })
    };
    if (id == 2) {
      chooseImgs("identity_img");
    };
    if (id == 3) {
      getApp().globalData.DataStr = "arry.brand_update.brand_img"
      wx.chooseImage({
        success: (res => {
          var tempFilePaths = res.tempFilePaths[0];
          //显示组件
          this.setData({
            isCrop: true
          })
          //选择组件
          this.cropper = this.selectComponent("#crop-imgCut");
          // 往组件传选择的本地url
          this.cropper.getData(tempFilePaths);
        })
      })
    };
  },

  onLiulan(e) {
    var url = e.currentTarget.dataset.url;
    // console.log(e);
    wx.previewImage({
      url: url,
      urls: [url],
    });
    this.data.isPreviewImage = true;
  },
  onChooseConpany() {
    wx.navigateTo({
      url: '/pages/user/attest/attest?open=' + true + '&type=' + 101,
    })
  },

  clickcut(e) {
    wx.previewImage({
      current: e.detail.url,
      urls: [e.detail.url]
    })
    this.data.isPreviewImage = true;
  },

  loadimage(e) {
    wx.hideLoading();
  },
  //new cut
  // onCropImgCut(e) {
  //   console.log(e)
  //   this.onImagesUp(e.detail.tempFilePath)
  // },
  onImagesUp(e) {
    // console.log(e)
    var obj = {
      url: e.detail.url,
    };
    func.ImagesUp(obj).then(res => {
      // console.log(res)
      var form = this.data.form;
      for (var i = 0; i < form.length; i++) {
        form[i].iSchoose = false;
      };
      this.setData({
        imgUrlsTwo: res.filepath,
        form: form,
        ch: -1,
        // ['arry.brand_update.brand_img']: res.filepath,
      })
    })
  },
  onAttestType(e) {
    var id = e.target.dataset.id;
    // id为4  是法人申请
    if (id == 3) {
      var checkThree = !this.data.checkThree;
      var checkFrou = this.data.checkThree;
    } else {
      var checkFrou = !this.data.checkFrou;
      var checkThree = this.data.checkFrou;
    }
    this.setData({
      checkThree: checkThree,
      checkFrou: checkFrou
    })
  },
  onChange(e) {
    var checkArry = this.data.checkArry;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    if (index == 1) {
      var isCheck = checkArry[id].checkone;
    } else {
      var isCheck = checkArry[id].checktwo;
    };
    if (index == 1) {
      this.setData({
        ["checkArry[" + id + "].checkone"]: !isCheck,
        ["checkArry[" + id + "].checktwo"]: isCheck,
        ["checkArry[" + 0 + "].isBind"]: true,
      })
    } else {
      this.setData({
        ["checkArry[" + id + "].checkone"]: isCheck,
        ["checkArry[" + id + "].checktwo"]: !isCheck,
        ["checkArry[" + 0 + "].isBind"]: true,
      })
    };
    if (this.data.checkArry[1].checktwo == false) {
      this.setData({
        qiye: {},
        qiyeName: '',
      })
    }
  },
  onBtn(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
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
    })
    this.data.ch = id;
    this.data.index = index;
  },
  chooseIcon() {
    chooseImgs("logoImg");
    // getApp().globalData.DataStr = "arry.brand_update.brand_img"
    // wx.chooseImage({
    //   success: (res => {
    //     // console.log(res)
    //     var tempFilePaths = res.tempFilePaths[0];
    //     // wx.getImageInfo({
    //     //   src: tempFilePaths,
    //     //   success: ((event) => {
    //     //     var info = getApp().globalData.sysinfo;
    //     //     console.log(info)
    //     //     var screenWidth = info.screenWidth - 40;
    //     //     if (event.width > screenWidth) {
    //     //       var width = screenWidth;
    //     //       var height = event.height / (event.width / screenWidth);
    //     //     } else {
    //     //       var width = info.screenWidth - 40;
    //     //       var height = event.height / (event.width / screenWidth);
    //     //     };
    //     // console.log(getApp().globalData.DataStr)
    //     //显示组件
    //     this.setData({
    //       isCrop: true
    //     })
    //     //选择组件
    //     this.cropper = this.selectComponent("#crop-imgCut");
    //     // 往组件传选择的本地url
    //     this.cropper.getData(tempFilePaths);
    //     // wx.chooseImage({
    //     //   count: 1,
    //     //   sizeType: ['compressed'],
    //     //   sourceType: ['camera', 'album'],
    //     //   success: (res => {
    //     //     var imgUrls = res.tempFilePaths[0];
    //     //   })
    //     // })
    //     // this.setData({
    //     //   src: tempFilePaths,
    //     //   width: width, //宽度
    //     //   height: height, //高度
    //     //   max_width: width,
    //     //   max_height: height,
    //     //   isCut: true,
    //     // })
    //     // this.cropper = this.selectComponent("#image-cropper");
    //     // this.cropper.imgReset();
    //     // })
    //     // })
    //   })
    // })
  },

  bindPickerChange(e) {
    var value = e.detail.value;
    var id = this.data.form[value].id;
    this.setData({
      ch: id,
      formIndex: value,
    })
    this.onCreateIcon();
  },

  onCreateIcon() {
    wx.request({
      url: this.data.icon_Url + '/api/BrandUpload/operationFile',
      data: {
        brand_name: this.data.arry.brand_update.brand_name,
        type: this.data.ch,
        channelroad: 4,
        user_id: getApp().globalData.userid,
        token: getApp().globalData.token,
      },
      header: {},
      method: 'POST',
      success: (res => {
        // console.log(res, '2')
        var code = res.data.code;
        if (code == 1) {
          this.setData({
            ["arry.brand_update.brand_img"]: res.data.img,
            // imgUrls: res.data.img,
            fontImg:res.data.img,
            index: this.data.index,
            logoImg:'',
          })
        } else {
          this.notify(res.data.msg);
        };
      }),
      fail: (err => {
        this.notify('图片生成失败');
      }),
    })
  },
  onPreview() {
    if (this.data.logoImg) {
      preview(this.data.icon_Url + this.data.logoImg, [this.data.icon_Url + this.data.logoImg])
    } else {
      preview(this.data.icon_Url + this.data.arry.brand_update.brand_img, [this.data.icon_Url + this.data.arry.brand_update.brand_img])
    }
  },
  isShow(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      this.setData({
        show: !this.data.show
      })
    } else {
      this.onCreateIcon();
      this.setData({
        show: !this.data.show
      })
    }
  },

  onUpload() {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var arry = this.data.arry.dataList;
    var id = [];
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].isSelect == true) {
        id.push(arry[i].order_id)
      }
    }
    var and_order = id.join(',');
    var token = wx.getStorageSync('token');
    var order_id = this.data.order_id;
    var auth_type = this.data.auth_type;
    var apply_id = this.data.apply_id;
    var click_type = this.data.good_name;
    var one_cate = this.data.one_cate;
    var checkArry = this.data.checkArry;
    var qiyeName = this.data.qiyeName;
    // var identity_img = this.data.identity_img;
    var identity_img = '';
    var logoImg = this.data.logoImg
    var business_img = this.data.business_img;
    var imgUrlsTwo = this.data.imgUrlsTwo;
    var attestType = this.data.attestType;
    var checkThree = this.data.checkThree;
    var checkFrou = this.data.checkFrou;
    if (this.data.logoImg) {
      var img = this.data.logoImg;
    } else {
      var img = this.data.fontImg
    };
    if (checkArry[0].checkone == checkArry[0].checktwo) {
      Toast('请先选择商标颜色');
      return;
    } else {
      if (checkArry[0].checkone == true) {
        var brand_color = 1;
      } else {
        var brand_color = 2;
      };
      if (checkArry[1].checkone == true) {
        var is_public = 1;
      } else {
        var is_public = 2;
      };
    };
    if (this.data.checkArry[1].checkone) {
      if (qiyeName.length == 0) {
        Toast('请选择共有企业');
        return;
      } else {
        var public_business = this.data.qiye.id;
      };
    } else {
      var public_business = 0;
    };
    var brand_img = this.data.imgUrls;
    if (apply_id == '' || apply_id.length == 0) {
      Toast('请添加申请人');
      return;
    };
    // var identity_img = this.data.identity_img;
    // var business_img = this.data.business_img;
    if (attestType == 1) {
      if (checkThree == false && checkFrou == false) {
        Toast('请选择企业申请或法人申请');
        return;
      } else {
        var brand_type = checkThree == true ? 1 : 2;
        if (checkFrou == false) {
          if (business_img == '' || business_img.length == 0) {
            Toast('请上传营业执照');
            return;
          };
          // if (identity_img == '' || identity_img.length == 0) {
          //   Toast('请上传身份证复印件');
          //   return;
          // };
        };
      };
    } else {
      var business_img = '';
      var identity_img = '';
      var brand_type = '';
    };
    if (imgUrlsTwo == '' || apply_id.length == 0) {
      Toast('请上传委托书！');
      return;
    };
    NetworkRequest({
      url: '/BrandUpload/submitData',
      data: {
        seal_file: imgUrlsTwo,
        and_order: and_order,
        click_type: click_type,
        order_id: order_id,
        auth_type: auth_type,
        apply_id: apply_id,
        type: 2,
        brand_num: '',
        upload_file: '',
        brand_img: img,
        translated_img: '',
        one_cate: one_cate,
        assignee_id: '',
        assignee_type: '',
        token: token,
        choice: '',
        brand_color: brand_color,
        is_public: is_public,
        public_business: public_business,
        brand_type: brand_type,
        business_img: business_img,
        identity_img: identity_img,
      },
      method: "POST",
    }).then(res => {
      this.notify(res.data.msg);
      var code = res.data.code;
      if (code == 1) {
        if (wx.getStorageSync('order_back_type') == 2) {
          wx.redirectTo({
            url: '/pages/user/my_order/my_order?id=' + 0,
          })
        } else {
          PrePage.setData({
            active: 0,
            arry: [],
            page: 1,
          });
          PrePage.getOrder(PrePage.data.active, PrePage.data.type);
          setTime(1500).then(res => {
            wx.navigateBack({
              delta: 1,
            })
          })
        }
      };
      if (code == 2) {
        setTime(1500).then(res => {
          wx.navigateTo({
            url: '/pages/user/log_on/log_on',
          })
        })
      };
    }).catch(err => {

    })
  },
  onDown() {
    this.getData(this.data.order_id, this.data.good_name);
    var order_id = this.data.order_id;
    var apply_id = this.data.apply_id;
    if (this.data.logoImg) {
      var img = this.data.logoImg;
    } else {
      var img = this.data.fontImg
    };
    if (apply_id == '' || apply_id.length == 0) {
      Toast('请添加申请人');
      return;
    };
    var attestType = this.data.attestType;
    var checkThree = this.data.checkThree;
    var checkFrou = this.data.checkFrou;
    if (attestType == 1) {
      if (checkThree == false && checkFrou == false) {
        Toast('请选择企业申请或法人申请');
        return;
      } else {
        var brand_type = checkThree == true ? 1 : 2;
      };
    } else {
      var brand_type = '';
    };
    // this.toast();
    wx.showLoading({
      title: '下载中...',
    })
    wx.request({
      url: getApp().globalData.wp_Url + '/order/mergerSubmit',
      data: {
        order_id: order_id,
        apply_id: apply_id,
        brand_img: img,
        brand_type: brand_type,
        channelroad: 4,
        user_id: getApp().globalData.userid,
        token: getApp().globalData.token,
      },
      header: {},
      method: 'POST',
      success: (res => {
        wx.hideLoading();
        // Toast.clear();
        if (res.data.code == 1) {
          var url = getApp().globalData.dm_Url + res.data.others;
          this.data.url = url;
          // console.log(wx.env.USER_DATA_PATH)
          // wx.downloadFile({
          //   url: url,
          //   // filePath:wx.env.USER_DATA_PATH + '/' + Date.parse(new Date()) + '.pdf',
          //   success: (res => {
          //     console.log(res)
          //     var filePath = res.tempFilePath
          //     wx.openDocument({
          //       filePath: filePath,
          //       showMenu:true,
          //       success: (res => {
          //         console.log(res)
          //         wx.hideLoading();
          //         // Toast.clear();
          //         this.data.status = 2;
          //       }),
          //       fail: (err => {
          //         wx.hideLoading();
          //         this.data.status = 1;
          //         this.notify('下载失败，请重试');
          //       })
          //     })
          //   })
          // })
          wx.downloadFile({
            url: url,
            filePath: wx.env.USER_DATA_PATH + '/temp.pdf',
            success: function(res) {
              wx.openDocument({
                filePath: res.filePath,
                showMenu:true,
                success: function (res) {
                  console.log('打开文档成功')
                }
              })
            },fail: function(res){
              console.log(res)
            }
          })
        } else {
          wx.hideLoading();
          this.notify(res.data.msg)
        }
      }),
      fail: (err => {
        wx.hideLoading();
      }),
      complete: (ss => {
        // Toast.clear();
      }),
    })
  },
  // 分享委托书
  onShare(){
    var apply_id = this.data.apply_id;
    if (apply_id == '' || apply_id.length == 0) {
      Toast('请添加申请人');
      return;
    };
    var attestType = this.data.attestType;
    var checkThree = this.data.checkThree;
    var checkFrou = this.data.checkFrou;
    if (attestType == 1) {
      if (checkThree == false && checkFrou == false) {
        Toast('请选择企业申请或法人申请');
        return;
      } else {
        var brand_type = checkThree == true ? 1 : 2;
      };
    } else {
      var brand_type = '';
    };
    if(this.data.url == ''||this.data.url== null){
      Toast('请先下载委托书');
      return;
    }else{
      
    }
  },
  onChoose() {
    var order = this.data.order;
    if (order.length > 0) {
      wx.navigateTo({
        url: '/package/component1/pages/material/mergedata/synchro_order/synchro_order',
      })
    } else {
      this.notify('没有可同步提交资料的订单')
    }
  },
  onClick() {
    var arry = this.data.arry;
    this.data.isPreviewImage = true;
    if (arry) {
      wx.navigateTo({
        url: '/package/component1/pages/material/mergedata/dt/dt?order_id=' + arry.order.order_id + "&two_cate=" + arry.brand_update.two_cate + "&three_cate=" + arry.brand_update.three_cate + "&open=" + false,
      })
    } else {

    }
  },
  getData(order_id, good_name) {
    this.toast();
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var ss = applyType.applyType.slice(0, 45);
    NetworkRequest({
      url: '/BrandUpload/uploadDetail',
      data: {
        order_id: order_id,
        good_name: good_name,
        user_id: userid,
        token: token,
      },
      method: 'POST'
    }).then(res => {
      Toast.clear();
      wx.stopPullDownRefresh();
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        var isBind = this.data.checkArry[0].isBind;
        var attestType = this.data.attestType;
        var brand_type = arry.brand_update.brand_type;
        if (isBind == false) {
          var brand_color = arry.brand_update.brand_color;
          var is_public = arry.brand_update.is_public;
          if (is_public == 0 || brand_color == 0) {} else {
            if (brand_color == 1) {
              this.setData({
                ["checkArry[" + 0 + "].checkone"]: true,
                ["checkArry[" + 0 + "].checktwo"]: false,
              })
            } else {
              this.setData({
                ["checkArry[" + 0 + "].checkone"]: false,
                ["checkArry[" + 0 + "].checktwo"]: true,
              })
            };
            if (is_public == 1) {
              this.setData({
                ["checkArry[" + 1 + "].checkone"]: true,
                ["checkArry[" + 1 + "].checktwo"]: false,
              })
            } else {
              this.setData({
                ["checkArry[" + 1 + "].checkone"]: false,
                ["checkArry[" + 1 + "].checktwo"]: true,
              })
            };
          };
        };
        var cate_name = '';
        var order = arry.dataList;
        var n = this.data.order.length;
        for (var i = 0; i < order.length; i++) {
          if (n == 0) {
            order[i].isSelect = true
            arry.dataList[i].isSelect = true
          } else {
            arry.dataList = this.data.order
            var order = this.data.order;
          };
        };
        if (attestType == 0) {
          if (brand_type == 1 || brand_type == 2) {
            this.setData({
              attestType: 1,
              checkThree: brand_type == 1 ? true : false,
              checkFrou: brand_type == 2 ? true : false,
              business_img: brand_type == 2 ? arry.brand_update.business_img : '',
              identity_img: brand_type == 2 ? arry.brand_update.identity_img : '',
            })
          };
        };
        for (var i = 0; i < ss.length; i++) {
          if (arry.brand_update.one_cate == ss[i].id) {
            var cate_name = ss[i].name;
            this.data.one_cate = i;
            break;
          };
        };
        if (this.data.name.length > 0) {
          var newarry = arry.business;
          var s = newarry.length;
          for (var i = 0; i < s; i++) {
            if (this.data.apply_id == newarry[i].id) {
              this.setData({
                referee: newarry[i].referee,
                license_num: newarry[i].license_num,
                card_address: newarry[i].card_address,
              });
              break;
            };
          };
        };
        var qiye = this.data.qiye;
        var qiyeName = this.data.qiyeName;
        if (arry.brand_update.apply_id > 0 && this.data.apply_id == "") {
          var newarry = arry.business;
          var s = newarry.length;
          for (var i = 0; i < s; i++) {
            if (arry.brand_update.apply_id == newarry[i].id) {
              this.setData({
                name: newarry[i].company_name,
                referee: newarry[i].referee,
                license_num: newarry[i].license_num,
                card_address: newarry[i].card_address,
              });
            };
            if (qiyeName.length == 0 && this.data.checkArry[1].checkone) {
              var public_business = arry.brand_update.public_business;
              if (public_business == newarry[i].id) {
                this.setData({
                  qiye: newarry[i],
                  qiyeName: newarry[i].company_name,
                });
              };
            };
          };
          this.setData({
            apply_id: arry.brand_update.apply_id,
            imgUrls: arry.brand_update.brand_bailment_img,
          })
        }
        this.setData({
          arry: arry,
          cate_name: cate_name,
          order: order,
          fontImg:arry.brand_update.brand_img
        });
      };
    }).catch(err => {
      Toast.clear();
      wx.stopPullDownRefresh();
    })
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
      message: '加载中...',
      duration: 0,
    })
  },
  onAttest() {
    wx.navigateTo({
      url: '/pages/user/attest/attest?open=' + true + '&type=' + 11,
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
          formText.push(arry[i].font_name);
          arry[i].iSchoose = false;
        }
        this.setData({
          form: arry,
          formText: formText,
        })
      } else {
        Toast(res.data.msg);
      };
    }).catch(err => {})
  },
  onLoad: function (options) {
    this.data.good_name = options.click_type;
    this.data.order_id = options.order_id;
    this.onForm();
    // this.setData({
    //   isCrop:true
    // })
  },
  onShow: function () {
    if (this.data.isPreviewImage == false) {
      this.getData(this.data.order_id, this.data.good_name);
    } else {
      this.data.isPreviewImage = false;
    };
    wx.setStorageSync('brand_type', 2);
    if (this.data.status == 2) {
      copyText(this.data.url);
      this.notify('文件链接已复制，您可以粘贴发送至微信或使用浏览器进行下载');
    };
    setTime(500).then(res => {
      this.data.status = 1
    });
  },
  onPullDownRefresh: function () {
    this.getData(this.data.order_id, this.data.good_name);
  },
})