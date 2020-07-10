import Dialog from '../../../../dist/dialog/dialog';
import NetworkRequest from '../../../../template/network.js';
import Toast from '../../../../dist/toast/toast';
import Notify from '../../../../dist/notify/notify';
const icon_Url = getApp().globalData.icon_Url;
const main_Url = getApp().globalData.main_Url;
import setTime from '../../../../template/setTime.js';
import areaList from '../../../../template/template.js';
import func from '../../../../template/func.js';
Page({
  data: {
    ptype: 1,
    arry: [],
    columns1: ['国内个人', '港澳个人', '台湾个人', '国外个人', ],
    columns2: ['个体工商户', '国内企业', '港澳企业', '台湾企业', '国外企业', ],
    show: '',
    type: '',
    id: '',
    icon_Url: getApp().globalData.icon_Url,
    areaList: areaList.areaList,
    img: false,
    address: '',
    person: '',
    reg_num: '',
    message: '',
    contactAdress: [],
  },
  onAdress() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  onConfirmAdress(e) {
    this.setData({
      contactAdress: e.detail.values,
      isShow: false,
      img: true,
    })
  },
  onCancelAdress() {
    this.setData({
      isShow: false
    })
  },
  onDetailAdress(e) {
    this.setData({
      message: e.detail.value
    })
  },
  formSubmit(e) {
    // console.log(e.detail.value);
    if (this.data.img ? true : false || e.detail.value.names ? true : false || e.detail.value.phoneNumber ? true : false || e.detail.value.car_num ? true : false || e.detail.value.message ? true : false) {
      var address = this.data.address;
      var person = this.data.person;
      var reg_num = this.data.reg_num;
      var arry = this.data.arry;
      var pages = getCurrentPages();
      // var contactAdress = this.data.contactAdress;
      // if (contactAdress.length > 0) {
      //   var contact_address_pro = contactAdress[0].name;
      //   var contact_address_city = contactAdress[1].name;
      //   var contact_address_area = contactAdress[2].name;
      // } else {
      //   var contact_address_pro = arry.contact_address_pro;
      //   var contact_address_city = arry.contact_address_city;
      //   var contact_address_area = arry.contact_address_area;
      // };
      // if (contact_address_pro == contact_address_city) {
      //   var contact_address_pro = '';
      // };
      var PrePage = pages[pages.length - 2];
      if (arry.pic) {
        var pic = arry.pic;
      } else {
        var pic = '';
      };
      if (arry.pic_reverse) {
        var pic_reverse = arry.pic_reverse;
      } else {
        var pic_reverse = '';
      };
      if (arry.business_license) {
        var business_license = arry.business_license;
      } else {
        var business_license = '';
      };
      if (arry.english_license) {
        var english_license = arry.english_license;
      } else {
        var english_license = '';
      };
      if (arry.idcard_img) {
        var idcard_img = arry.idcard_img;
      } else {
        var idcard_img = '';
      };
      if (arry.idcard_img_reverse) {
        var idcard_img_reverse = arry.idcard_img_reverse;
      } else {
        var idcard_img_reverse = '';
      };
      if (arry.english_img) {
        var english_img = arry.english_img;
      } else {
        var english_img = '';
      };
      var id = arry.id;
      var type = this.data.type;
      var ptype = this.data.ptype;
      var token = wx.getStorageSync('token');
      var userid = wx.getStorageSync('userid');
      var txt = /^\d{11}$/;
      if (e.detail.value.phoneNumber) {
        if (!txt.test(e.detail.value.phoneNumber)) {
          Toast('请输入正确的手机号！')
          return;
        }
      };
      if (e.detail.value.phoneNumber) {
        var mobile = e.detail.value.phoneNumber
      } else {
        var mobile = arry.mobile;
      };
      if (e.detail.value.message) {
        var idcard_address = e.detail.value.message;
      } else {
        var idcard_address = arry.add_detail_address;
      };
      if (ptype == 1) {
        if (e.detail.value.names) {
          var chinese_name = e.detail.value.names;
        } else {
          var chinese_name = arry.chinese_name;
        };
        if (e.detail.value.car_num) {
          var car_num = e.detail.value.car_num;
          if (func.iDCard(car_num).isPass) {
            Toast(func.iDCard(car_num).err);
            return;
          };
        } else {
          var car_num = arry.car_num;
        };
        if (type == 0 || type == 1 || type == 2) {
          NetworkRequest({
            url: '/authentication/updateauth',
            data: {
              id: id,
              chinese_name: chinese_name,
              mobile: mobile,
              idcard_img: idcard_img,
              idcard_img_reverse: idcard_img_reverse,
              car_num: type !== 0 ? '' : car_num,
              // idcard_address:idcard_address,
              idcard_address: idcard_address,
              // contact_address_pro: contact_address_pro,
              // contact_address_city: contact_address_city,
              // contact_address_area: contact_address_area,
              // add_detail_address: add_detail_address,
            },
            method: 'POST',
          }).then(res => {
            var code = res.data.code;
            Toast.clear();
            this.notify(res.data.msg);
            if (code == 1) {
              PrePage.getData();
              setTime().then(res => {
                wx.navigateBack();
              })
            };
          }).catch(err => {
            Toast.clear();

          })
        };
        if (type == 3) {
          NetworkRequest({
            url: '/authentication/updateauth',
            data: {
              id: id,
              english_img: english_img,
              chinese_name: chinese_name,
              mobile: mobile,
              idcard_img: idcard_img,
              idcard_img_reverse: idcard_img_reverse,
              idcard_address: idcard_address,
              // contact_address_pro: contact_address_pro,
              // contact_address_city: contact_address_city,
              // contact_address_area: contact_address_area,
              // add_detail_address: add_detail_address,
            },
            method: 'POST',
          }).then(res => {
            var code = res.data.code;
            Toast.clear();
            this.notify(res.data.msg);
            if (code == 1) {
              PrePage.getData();
              setTime().then(res => {
                wx.navigateBack();
              })
            };
          }).catch(err => {
            Toast.clear();

          })
        };
      };
      if (ptype == 2) {
        if (e.detail.value.names) {
          var company_name = e.detail.value.names;
        } else {
          var company_name = arry.company_name;
        };
        if (e.detail.value.car_num) {
          var car_num = e.detail.value.car_num;
          if (func.iDCard(car_num).isPass) {
            Toast(func.iDCard(car_num).err);
            return;
          };
        } else {
          var car_num = arry.idcard_num;
        };
        if (type == 1) {
          NetworkRequest({
            url: '/authentication/updatebusiness',
            data: {
              id: id,
              company_name: company_name,
              mobile: mobile,
              pic: pic,
              pic_reverse: pic_reverse,
              business_license: business_license,
              idcard_num: car_num,
              // contact_address_pro: contact_address_pro,
              // contact_address_city: contact_address_city,
              // contact_address_area: contact_address_area,
              // add_detail_address: add_detail_address,
            },
            method: 'POST',
          }).then(res => {
            var code = res.data.code;
            Toast.clear();
            this.notify(res.data.msg);
            if (code == 1) {
              PrePage.getData();
              setTime().then(res => {
                wx.navigateBack();
              })
            };
          }).catch(err => {
            Toast.clear();

          })
        };
        if (type == 2 || type == 4 || type == 3) {
          NetworkRequest({
            url: '/authentication/updatebusiness',
            data: {
              id: id,
              company_name: company_name,
              mobile: mobile,
              business_license: business_license,
              address: address,
              person: person,
              reg_num: reg_num,
              // contact_address_pro: contact_address_pro,
              // contact_address_city: contact_address_city,
              // contact_address_area: contact_address_area,
              // add_detail_address: add_detail_address,
            },
            method: 'POST',
          }).then(res => {
            var code = res.data.code;
            Toast.clear();
            this.notify(res.data.msg);
            if (code == 1) {
              PrePage.getData();
              setTime().then(res => {
                wx.navigateBack();
              })
            };
          }).catch(err => {
            Toast.clear();

          })
        };
        if (type == 5) {
          NetworkRequest({
            url: '/authentication/updatebusiness',
            data: {
              id: id,
              company_name: company_name,
              mobile: mobile,
              business_license: business_license,
              english_license: english_license,
              // contact_address_pro: contact_address_pro,
              // contact_address_city: contact_address_city,
              // contact_address_area: contact_address_area,
              // add_detail_address: add_detail_address,
            },
            method: 'POST',
          }).then(res => {
            var code = res.data.code;
            Toast.clear();
            this.notify(res.data.msg);
            if (code == 1) {
              PrePage.getData();
              setTime().then(res => {
                wx.navigateBack();
              })
            };
          }).catch(err => {
            Toast.clear();

          })
        };
      };
    } else {
      Toast('请先编辑！');
    };
  },

  onUp(e) {
    var id = e.currentTarget.dataset.id;
    var icon_url = this.data.icon_Url;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (res => {
        if (id == 3) {
          Toast.loading({
            message: '识别中...',
            duration: 0,
          });
          wx.uploadFile({
            url: main_Url + '/checklicense',
            filePath: res.tempFilePaths[0],
            name: 'pic',
            header: {
              'content-type': 'multipart/form-data'
            },
            formData: {},
            success: (res => {
              Toast.clear();
              var arry = JSON.parse(res.data);
              if (arry.others == 1) {
                this.setData({
                  ['arry.business_license']: arry.data.business_license,
                  img: true,
                });
                this.notify("上传成功！");
                this.data.address = arry.data.address;
                this.data.person = arry.data.person;
                this.data.reg_num = arry.data.reg_num;
              } else {
                Toast.clear();
                this.notify("您上传的营业执照无法识别，请重新上传！");
                this.data.address = '';
                this.data.person = '';
                this.data.reg_num = '';
              }
            })
          })
        } else {
          var url = res.tempFilePaths[0];
          this.toast('请稍后...');
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
              if (typeof (res.data) == 'string') {
                var list = JSON.parse(res.data);
              } else {
                var list = res.data;
              };
              var imgUrls = list.filepath
              var code = list.code;
              if (code == 1) {
                this.setData({
                  img: true,
                });
                if (id == 1) {
                  this.setData({
                    ['arry.pic_reverse']: imgUrls,
                  })
                };
                if (id == 2) {
                  this.setData({
                    ['arry.pic']: imgUrls,
                  })
                };

                if (id == 4) {
                  this.setData({
                    ['arry.business_license']: imgUrls,
                  })
                };
                if (id == 5) {
                  this.setData({
                    ['arry.idcard_img']: imgUrls,
                  })
                };
                if (id == 6) {
                  this.setData({
                    ['arry.idcard_img_reverse']: imgUrls,
                  })
                };
                if (id == 7) {
                  this.setData({
                    ['arry.english_img']: imgUrls,
                  })
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
        }

      })
    })
  },
  toast(e) {
    Toast.loading({
      message: e,
      duration: 0,
    });
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
  getDt(id, ptype) {
    var token = wx.getStorageSync('token');
    var userid = wx.getStorageSync('userid');
    this.toast('加载中...');
    if (ptype == 1) {
      NetworkRequest({
        url: '/authentication/editauth',
        data: {
          token: token,
          user_id: userid,
          id: id,
        },
      }).then(res => {
        var arry = res.data.data;
        // if (arry) {
        //   if (arry.contact_address_pro == '' || arry.contact_address_pro == null || arry.contact_address_pro==undefined) {
        //     arry.contact_address_pro = arry.contact_address_city
        //   };
        //   if (arry.contact_address_city == '' || arry.contact_address_city == null || arry.contact_address_city == undefined) {
        //     arry.contact_address_city = arry.contact_address_pro
        //   };
        // };
        this.setData({
          arry: arry,
          type: arry.type,
        })
        Toast.clear();
        wx.stopPullDownRefresh();
      }).catch(err => {
        Toast.clear();
        wx.stopPullDownRefresh();
      })
    };
    if (ptype == 2) {
      NetworkRequest({
        url: '/authentication/editbusiness',
        data: {
          token: token,
          user_id: userid,
          id: id,
        },
      }).then(res => {
        var arry = res.data.data;
        // if (arry) {
        //   if (arry.contact_address_pro == '' || arry.contact_address_pro == null || arry.contact_address_pro == undefined) {
        //     arry.contact_address_pro = arry.contact_address_city
        //   };
        //   if (arry.contact_address_city == '' || arry.contact_address_city == null || arry.contact_address_city == undefined) {
        //     arry.contact_address_city = arry.contact_address_pro
        //   };
        // };
        this.setData({
          arry: arry,
          type: arry.type,
        })
        Toast.clear();
        wx.stopPullDownRefresh();
      }).catch(err => {
        Toast.clear();
        wx.stopPullDownRefresh();
      })
    }
  },
  onLoad: function (options) {
    this.getDt(options.id, options.ptype);
    this.setData({
      ptype: options.ptype,
      id: options.id,
    })
  },
  onPullDownRefresh: function () {
    this.getDt(this.data.id, this.data.ptype);
  },
})