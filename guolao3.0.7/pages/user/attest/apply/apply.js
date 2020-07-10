import Toast from '../../../../dist/toast/toast';
import NetworkRequest from '../../../../template/network.js';
import Notify from '../../../../dist/notify/notify';
const main_Url = getApp().globalData.main_Url;
const icon_Url = getApp().globalData.icon_Url;
import imageYz from '../../../../template/template.js';
import areaList from '../../../../template/template.js';
import setTime from '../../../../template/setTime.js';
import func from '../../../../template/func.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    columns: ['国内企业', '个体工商户', '台湾企业', '港澳企业', '国外企业', '国内个人', '台湾个人', '港澳个人', '国外个人'],
    columnsOne: ['国内企业', '个体工商户', '台湾企业', '港澳企业', '国外企业'],
    columnsTwo: ['国内个人', '台湾个人', '港澳个人', '国外个人'],
    show: '',
    imgUrls: [],
    imgUrlsTwo: [],
    imgUrlsTree: [],
    imgUrlsFour: [],
    index: 0,
    animationData: '',
    width: '',
    name: '',
    companny: '',
    phoneNmuber: '',
    current: 0,
    icon_Url: icon_Url,
    main_Url: main_Url,
    //template.js->img->public
    icon_yanglei: imageYz.imageYz,
    icon_idCard: imageYz.icon_idCard,
    signature: imageYz.signature,
    address: '',
    person: '',
    reg_num: '',
    areaList: areaList.areaList,
    isShow: false,
    idcard: '',
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    message: '',
    // contactAdress: [],
  },
  // id 和 index  id=1?'企业认证':'个人认证'  id==1&&index==1 '个体工商户'


  onAdress() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  onConfirmAdress(e) {
    // console.log(e);
    this.setData({
      contactAdress: e.detail.values,
      isShow: false,
    })
  },
  onCancelAdress() {
    this.setData({
      isShow: false
    })
  },
  // onDetailAdress
  onDetailAdress(e) {
    this.setData({
      message: e.detail.value
    })
  },
  onSearch() {
    wx.navigateTo({
      url: '/pages/user/attest/apply/search/search',
    })
  },
  clearData() {
    this.setData({
      imgUrls: [],
      imgUrlsTwo: [],
      imgUrlsTree: [],
      imgUrlsFour: [],
      companny: '',
      phoneNmuber: '',
      name: '',
      idcard: '',
    })
  },
  onBack() {
    wx.navigateBack()
  },
  onClick(e) {
    var id = e.currentTarget.dataset.id;
    if (this.data.id == id) {} else {
      this.setData({
        id: id,
      })
      this.rotate();
      this.clearData();
    }
  },
  onInput(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      this.setData({
        name: e.detail.value
      })
    };
    if (id == 2) {
      this.setData({
        companny: e.detail.value
      })
    };
    if (id == 3) {
      this.setData({
        phoneNmuber: e.detail.value
      })
    };
    if (id == 4) {
      this.setData({
        idcard: e.detail.value
      })
    };
  },
  toast() {
    Toast.loading({
      // mask: true,
      message: '提交中...',
      duration: 0,
    });
  },
  toastUp() {
    Toast.loading({
      // mask: true,
      message: '请稍后...',
      duration: 0,
    });
  },
  //sumbmit
  formSubmit: function (e) {
    var id = this.data.id;
    var arry = e.detail.value;
    var name = arry.name;
    var companny = this.data.companny;
    var phoneNmuber = arry.phoneNmuber;
    var imgUrls = this.data.imgUrls;
    var imgUrlsTwo = this.data.imgUrlsTwo;
    var imgUrlsTree = this.data.imgUrlsTree;
    var imgUrlsFour = this.data.imgUrlsFour;
    var idcard = this.data.idcard;
    var current = this.data.current;
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var type = this.data.index;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var txt = /^\d{11}$/;
    var address = this.data.address;
    var person = this.data.person;
    var reg_num = this.data.reg_num;
    // var contactAdress = this.data.contactAdress;
    // if (contactAdress.length > 0) {
    // var contact_address_pro = contactAdress[0].name;
    // var contact_address_city = contactAdress[1].name;
    // var contact_address_area = contactAdress[2].name;
    // };
    // if (contact_address_pro == contact_address_city) {
    //   var contact_address_pro = '';
    // };
    // var add_detail_address = this.data.message;
    var add_detail_address = '';
    var contact_address_pro = '';
    var contact_address_city = '';
    var contact_address_area = '';
    if (id == 1) {
      if (companny == "" || companny.length == 0) {
        Toast('请填写企业全称！');
        return;
      }
    };
    if (id == 2) {
      if (name == "" || name.length == 0) {
        Toast('请填写姓名！');
        return;
      }
    };
    if (!txt.test(phoneNmuber)) {
      Toast('请输入正确的手机号！')
      return;
    };
    // if (contactAdress.length == 0) {
    //   Toast('请选择省市区！');
    //   setTime(500).then(res => {
    //     this.setData({
    //       isShow: true
    //     })
    //   })
    //   return;
    // };
    // if (add_detail_address.length == 0) {
    //   Toast('请填写详细地址');
    //   return;
    // }
    if (id == 1) {
      if (type == 0) {
        if (!imgUrls.length) {
          Toast('请上传营业执照！')
          return;
        } else {
          this.toast();
          NetworkRequest({
            url: '/authentication/addbusiness',
            data: {
              type: 2,
              user_id: userid,
              token: token,
              company_name: companny,
              mobile: phoneNmuber,
              business_license: imgUrls[0],
              address: address,
              person: person,
              reg_num: reg_num,
              contact_address_pro: contact_address_pro,
              contact_address_city: contact_address_city,
              contact_address_area: contact_address_area,
              add_detail_address: add_detail_address,
            },
            method: 'POST',
          }).then(res => {
            if (res.data.code == '1') {
              this.notify("提交成功！");
              PrePage.getData();
              setTime(1000).then(res => {
                wx.redirectTo({
                  url: '/pages/user/attest/success/success',
                })
              })
            } else {
              this.notify(res.data.msg);
            };
            Toast.clear();
          }).catch(err => {
            Toast.clear();
          })
        }
      };
      if (type == 1) {
        if (func.iDCard(idcard).isPass) {
          Toast(func.iDCard(idcard).err);
          return;
        };
        // if (!imgUrlsTwo.length || !imgUrlsTree.length) {
        //   Toast('请上传法人身份证照片！')
        //   return;
        // };
        if (!imgUrlsTwo.length) {
          Toast('请上传法人身份证照片！')
          return;
        };
        if (!imgUrls.length) {
          Toast('请上传营业执照！')
          return;
        } else {
          this.toast();
          NetworkRequest({
            url: '/authentication/addbusiness',
            data: {
              type: 1,
              user_id: userid,
              token: token,
              company_name: companny,
              mobile: phoneNmuber,
              pic: imgUrlsTwo[0],
              pic_reverse: '',
              // pic: '',
              // pic_reverse: imgUrlsTree[0],
              business_license: imgUrls[0],
              address: address,
              person: person,
              idcard_num: idcard,
              reg_num: reg_num,
              contact_address_pro: contact_address_pro,
              contact_address_city: contact_address_city,
              contact_address_area: contact_address_area,
              add_detail_address: add_detail_address,
            },
            method: 'POST',
          }).then(res => {
            if (res.data.code == '1') {
              this.notify("提交成功！");
              PrePage.getData();
              setTime().then(res => {
                wx.redirectTo({
                  url: '/pages/user/attest/success/success',
                })
              })
            } else {
              this.notify(res.data.msg);
            };
            Toast.clear();
          }).catch(err => {
            Toast.clear();
          })
        }
      };
      if (type == 2) {
        if (!imgUrls.length) {
          Toast('请上传营业执照！')
          return;
        } else {
          this.toast();
          NetworkRequest({
            url: '/authentication/addbusiness',
            data: {
              type: 4,
              user_id: userid,
              token: token,
              company_name: companny,
              mobile: phoneNmuber,
              business_license: imgUrls[0],
              address: address,
              person: person,
              reg_num: reg_num,
              contact_address_pro: contact_address_pro,
              contact_address_city: contact_address_city,
              contact_address_area: contact_address_area,
              add_detail_address: add_detail_address,
            },
            method: 'POST',
          }).then(res => {
            if (res.data.code == '1') {
              PrePage.getData();
              this.notify("提交成功！");
              setTime().then(res => {
                wx.redirectTo({
                  url: '/pages/user/attest/success/success',
                })
              })
            } else {
              this.notify(res.data.msg);
            };
            Toast.clear();
          }).catch(err => {
            Toast.clear();
          })
        }
      };
      if (type == 3) {
        if (!imgUrls.length) {
          Toast('请上传营业执照！')
          return;
        } else {
          this.toast();
          NetworkRequest({
            url: '/authentication/addbusiness',
            data: {
              type: 3,
              user_id: userid,
              token: token,
              company_name: companny,
              mobile: phoneNmuber,
              business_license: imgUrls[0],
              address: address,
              person: person,
              reg_num: reg_num,
              contact_address_pro: contact_address_pro,
              contact_address_city: contact_address_city,
              contact_address_area: contact_address_area,
              add_detail_address: add_detail_address,
            },
            method: 'POST',
          }).then(res => {
            if (res.data.code == '1') {
              this.notify("提交成功！");
              PrePage.getData();
              setTime().then(res => {
                wx.redirectTo({
                  url: '/pages/user/attest/success/success',
                })
              })
            } else {
              this.notify(res.data.msg);
            };
            Toast.clear();
          }).catch(err => {
            Toast.clear();
          })
        }
      };
      if (type == 4) {
        if (!imgUrls.length) {
          Toast('请上传营业执照！')
          return;
        };
        if (!imgUrlsFour.length) {
          Toast('请上传营业执照中英文翻译件！')
          return;
        } else {
          this.toast();
          NetworkRequest({
            url: '/authentication/addbusiness',
            data: {
              type: 5,
              user_id: userid,
              token: token,
              company_name: companny,
              mobile: phoneNmuber,
              business_license: imgUrls[0],
              english_license: imgUrlsFour[0],
              address: address,
              person: person,
              reg_num: reg_num,
              contact_address_pro: contact_address_pro,
              contact_address_city: contact_address_city,
              contact_address_area: contact_address_area,
              add_detail_address: add_detail_address,
            },
            method: 'POST',
          }).then(res => {
            if (res.data.code == '1') {
              this.notify("提交成功！");
              PrePage.getData();
              setTime().then(res => {
                wx.redirectTo({
                  url: '/pages/user/attest/success/success',
                })
              })
            } else {
              this.notify(res.data.msg);
            };
            Toast.clear();
          }).catch(err => {
            Toast.clear();
          })
        }
      };
    };
    if (id == 2) {
      if (current == 0) {
        if (func.iDCard(idcard).isPass) {
          Toast(func.iDCard(idcard).err);
          return;
        };
        var message = this.data.message;
        if (!message.replace(/\s+/g, "")) {
          Toast('请填写详细地址!')
          return;
        }
        if (!imgUrlsTree.length) {
          Toast('请上传身份证照片！')
          // if (!imgUrlsTwo.length || !imgUrlsTree.length) {
          //   Toast('请上传身份证照片！')
        } else {
          var index = 0;
          this.toast();
          NetworkRequest({
            url: '/authentication/addauth',
            data: {
              type: index,
              user_id: userid,
              token: token,
              chinese_name: name,
              mobile: phoneNmuber,
              idcard_img: imgUrlsTree[0],
              idcard_img_reverse: '',
              car_num: idcard,
              contact_address_pro: contact_address_pro,
              contact_address_city: contact_address_city,
              contact_address_area: contact_address_area,
              idcard_address: message,
              add_detail_address: add_detail_address,
            },
            method: 'POST',
          }).then(res => {
            if (res.data.code == '1') {
              this.notify("提交成功！");
              PrePage.getData();
              setTime().then(res => {
                wx.redirectTo({
                  url: '/pages/user/attest/success/success',
                })
              })
            } else {
              this.notify(res.data.msg);
            };
            Toast.clear();
          }).catch(err => {
            Toast.clear();
          })
        }
      };
      if (current == 1) {
        if (!imgUrlsTwo.length || !imgUrlsTree.length) {
          Toast('请上传护照照片！')
        } else {
          var index = 2;
          this.toast();
          NetworkRequest({
            url: '/authentication/addauth',
            data: {
              type: index,
              user_id: userid,
              token: token,
              chinese_name: name,
              mobile: phoneNmuber,
              idcard_img: imgUrlsTwo[0],
              idcard_img_reverse: imgUrlsTree[0],
              contact_address_pro: contact_address_pro,
              contact_address_city: contact_address_city,
              contact_address_area: contact_address_area,
              idcard_address: message,
              add_detail_address: add_detail_address,
            },
            method: 'POST',
          }).then(res => {
            if (res.data.code == '1') {
              this.notify("提交成功！");
              PrePage.getData();
              setTime().then(res => {
                wx.redirectTo({
                  url: '/pages/user/attest/success/success',
                })
              })
            } else {
              this.notify(res.data.msg);
            };
            Toast.clear();
          }).catch(err => {
            Toast.clear();
          })
        }
      };
      if (current == 2) {
        if (!imgUrlsTwo.length || !imgUrlsTree.length) {
          Toast('请上传护照照片！')
        } else {
          var index = 1;
          this.toast();
          NetworkRequest({
            url: '/authentication/addauth',
            data: {
              type: index,
              user_id: userid,
              token: token,
              chinese_name: name,
              mobile: phoneNmuber,
              idcard_img: imgUrlsTwo[0],
              idcard_img_reverse: imgUrlsTree[0],
              contact_address_pro: contact_address_pro,
              contact_address_city: contact_address_city,
              contact_address_area: contact_address_area,
              add_detail_address: add_detail_address,
              idcard_address: message,
            },
            method: 'POST',
          }).then(res => {
            if (res.data.code == '1') {
              this.notify("提交成功！");
              PrePage.getData();
              setTime().then(res => {
                wx.redirectTo({
                  url: '/pages/user/attest/success/success',
                })
              })
            } else {
              this.notify(res.data.msg);
            };
            Toast.clear();
          }).catch(err => {
            Toast.clear();
          })
        }
      };
      if (current == 3) {
        if (!imgUrlsTwo.length || !imgUrlsTree.length) {
          Toast('请上传护照照片！')
          return;
        };
        if (!imgUrls.length) {
          Toast('请上传护照中文翻译件照片！')
          return;
        } else {
          var index = 3;
          this.toast();
          NetworkRequest({
            url: '/authentication/addauth',
            data: {
              type: index,
              user_id: userid,
              token: token,
              chinese_name: name,
              mobile: phoneNmuber,
              idcard_img: imgUrlsTwo[0],
              idcard_img_reverse: imgUrlsTree[0],
              english_img: imgUrls[0],
              contact_address_pro: contact_address_pro,
              contact_address_city: contact_address_city,
              contact_address_area: contact_address_area,
              add_detail_address: add_detail_address,
              idcard_address: message,
            },
            method: 'POST',
          }).then(res => {
            if (res.data.code == '1') {
              this.notify("提交成功！");
              PrePage.getData();
              setTime().then(res => {
                wx.redirectTo({
                  url: '/pages/user/attest/success/success',
                })
              })
            } else {
              this.notify(res.data.msg);
            };
            Toast.clear();
          }).catch(err => {
            Toast.clear();
          })
        }
      }
    }
  },


  onClose() {
    this.setData({
      show: !this.data.show
    });
  },
  onConfirm(event) {
    if (this.data.id == 2) {
      this.setData({
        current: event.detail.index
      })
    } else {
      this.setData({
        value: event.detail.value,
        index: event.detail.index
      })
    };
    this.onClose();
    this.clearData();
  },
  onCancel() {
    this.onClose();
  },
  // up image
  onChoose(e) {
    var type = e.currentTarget.dataset.type;
    const token = wx.getStorageSync('token');
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (res => {
        // var size = (res.tempFiles[0].size/1024/1024).toFixed(4)+'MB'
        // console.log(size);
        // return;
        var img = res.tempFilePaths;
        if (type == 1) {
          Toast.loading({
            message: '识别中...',
            duration: 0,
          });
          if (this.data.id == 1) {
            wx.uploadFile({
              url: main_Url + '/checklicense',
              filePath: img[0],
              name: 'pic',
              header: {
                'content-type': 'multipart/form-data'
              },
              formData: {},
              success: (res => {
                // console.log(res);
                Toast.clear();
                var arry = JSON.parse(res.data);
                if (arry.others == 1) {
                  arry.data = arry.data;
                  var imgUrls = [];
                  imgUrls.push(arry.data.business_license);
                  this.setData({
                    imgUrls: imgUrls
                  });
                  this.notify("上传成功！");
                  this.data.address = arry.data.address;
                  this.data.person = arry.data.person;
                  this.data.reg_num = arry.data.reg_num;
                } else {
                  Toast.clear();
                  // this.notify('请上传图片格式为:png,jpeg,jpg');
                  this.notify("您上传的营业执照无法识别，请重新上传！");
                  this.data.address = '';
                  this.data.person = '';
                  this.data.reg_num = '';
                }
              })
            })
          } else {
            this.toastUp();
            wx.uploadFile({
              url: main_Url + '/authentication/upload_card',
              filePath: img[0],
              name: 'pic',
              header: {
                'content-type': 'multipart/form-data'
              },
              formData: {
                token: token,
              },
              success: (res => {
                var arry = JSON.parse(res.data);
                if (arry.code == 1) {
                  arry.data = arry.data;
                  var imgUrls = [];
                  imgUrls.push(arry.data);
                  this.setData({
                    imgUrls: imgUrls
                  });
                  Toast.clear();
                  this.notify("上传成功！");
                } else {
                  Toast.clear();
                  this.notify("上传失败！");
                }
              })
            })
          }

        };
        if (type == 2) {
          this.toastUp();
          wx.uploadFile({
            url: main_Url + '/authentication/upload_card',
            filePath: img[0],
            name: 'pic',
            header: {
              'content-type': 'multipart/form-data'
            },
            formData: {
              token: token,
            },
            success: (res => {
              var arry = JSON.parse(res.data);
              if (arry.code == 1) {
                arry.data = arry.data;
                var imgUrlsTwo = [];
                imgUrlsTwo.push(arry.data);
                this.setData({
                  imgUrlsTwo: imgUrlsTwo
                });
                Toast.clear();
                this.notify("上传成功！");
              } else {
                Toast.clear();
                this.notify("上传失败！");
              }
            })
          })
        }
        if (type == 3) {
          this.toastUp();
          wx.uploadFile({
            url: main_Url + '/authentication/upload_card',
            filePath: img[0],
            name: 'pic',
            header: {
              'content-type': 'multipart/form-data'
            },
            formData: {
              token: token,
            },
            success: (res => {
              var arry = JSON.parse(res.data);
              if (arry.code == 1) {
                arry.data = arry.data;
                var imgUrlsTree = [];
                imgUrlsTree.push(arry.data);
                this.setData({
                  imgUrlsTree: imgUrlsTree
                });
                Toast.clear();
                this.notify("上传成功！");
              } else {
                Toast.clear();
                this.notify("上传失败！");
              }
            })
          })
        };
        if (type == 4) {
          this.toastUp();
          wx.uploadFile({
            url: main_Url + '/authentication/upload_card',
            filePath: img[0],
            name: 'pic',
            header: {
              'content-type': 'multipart/form-data'
            },
            formData: {
              token: token,
            },
            success: (res => {
              var arry = JSON.parse(res.data);
              if (arry.code == 1) {
                arry.data = arry.data;
                var imgUrlsFour = [];
                imgUrlsFour.push(arry.data);
                this.setData({
                  imgUrlsFour: imgUrlsFour
                });
                Toast.clear();
                this.notify("上传成功！");
              } else {
                Toast.clear();
                this.notify("上传失败！");
              }
            })
          })
        }
      }),
    })
  },
  // previewImage 
  preview(e) {
    var type = e.currentTarget.dataset.type;
    var imgUrls = this.data.imgUrls;
    var imgUrlsTwo = this.data.imgUrlsTwo;
    var imgUrlsTree = this.data.imgUrlsTree;
    var imgUrlsFour = this.data.imgUrlsFour;
    var icon_Url = this.data.icon_Url;
    if (type == 1) {
      wx.previewImage({
        current: icon_Url + imgUrls[0],
        urls: [icon_Url + imgUrls[0]],
      })
    };
    if (type == 2) {
      wx.previewImage({
        current: icon_Url + imgUrlsTwo[0],
        urls: [icon_Url + imgUrlsTwo[0]],
      })
    };
    if (type == 3) {
      wx.previewImage({
        current: icon_Url + imgUrlsTree[0],
        urls: [icon_Url + imgUrlsTree[0]],
      })
    };
    if (type == 4) {
      wx.previewImage({
        current: icon_Url + imgUrlsFour[0],
        urls: [icon_Url + imgUrlsFour[0]],
      })
    }
  },
  onYanglei(e) {
    var id = e.currentTarget.dataset.type;
    var url = id == 1 ? this.data.icon_yanglei : this.data.icon_idCard;
    if (this.data.id == 1 && this.data.index == 1) {
      var url = this.data.signature
    };
    wx.previewImage({
      current: url,
      urls: [url],
    })
  },
  //delet img
  deletImg(e) {
    var imgUrls = this.data.imgUrls;
    var type = e.currentTarget.dataset.type;
    var imgUrlsTwo = this.data.imgUrlsTwo;
    var imgUrlsTree = this.data.imgUrlsTree;
    var imgUrlsFour = this.data.imgUrlsFour;
    if (type == 1) {
      this.setData({
        imgUrls: []
      })
    };
    if (type == 2) {
      this.setData({
        imgUrlsTwo: []
      })
    };
    if (type == 3) {
      this.setData({
        imgUrlsTree: []
      })
    };
    if (type == 4) {
      this.setData({
        imgUrlsFour: []
      })
    }
  },
  getInfo() {
    var width = getApp().globalData.sysinfo.windowWidth
    this.setData({
      width: (width - width / 100 * 5) / 2
    })
  },
  //notify 
  notify(res) {
    Notify({
      text: res,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44'
    });
  },
  //动画
  rotate: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });
    this.animation = animation;
    var id = this.data.id;
    var width = this.data.width;
    if (id == 1) {
      this.animation.translateX(0).step({
        duration: 300,
      })
    } else {
      this.animation.translateX(width).step({
        duration: 300,
      })
    };
    this.setData({
      animationData: this.animation.export()
    })
  },

  //申请个人认证
  getUpData() {
    var token = wx.getStorageSync('token');
    var userid = wx.getStorageSync('userid');
    NetworkRequest({
      urls: '/authentication/addauth',
      data: {
        user_id: userid,
        token: token,
        chinese_name: chinese_name,
        mobile: mobile,
      },
      method: 'POST',
    }).then(res => {

    }).catch(err => {})
  },
  onLoad: function (options) {
    this.getInfo()
    if (options.open) {
      this.setData({
        id: 2
      })
      this.rotate();
      this.clearData();
    }
  },
})