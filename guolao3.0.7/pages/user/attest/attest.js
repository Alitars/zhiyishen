import Dialog from '../../../dist/dialog/dialog';
import NetworkRequest from '../../../template/network.js';
import Toast from '../../../dist/toast/toast';
import Notify from '../../../dist/notify/notify';
const info = getApp().globalData.sysinfo;
import setTime from '../../../template/setTime.js';
Page({
  data: {
    SafeHigh: info.windowHeight,
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    arry: [],
    SafeHigh: '',
    isDelete: false,
    lastX: 0,
    lastY: 0,
    index: 0,
    open: false,
    type: '',
  },
  //导入历史商标
  onHistory(e) {
    console.log(e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    // return;
    wx.showLoading({
      title: '导入中...',
      mask: true,
    })
    NetworkRequest({
      url: '/businessBrand',
      data: {
        b_id: id,
      },
    }).then(res => {
      // console.log(res, '导入');
      this.notify(res.data.msg);
      wx.hideLoading({
        complete: (res) => {},
      })
    }).catch(err => {})
  },
  onTap2(event) {
    var index = event.currentTarget.dataset.index;
    this.setData({
      ["arry[" + index + "].isDelete"]: false,
    })
  },
  onTap(event) {
    var index = event.currentTarget.dataset.index;
    var currentX = event.touches[0].pageX;
    var tx = currentX - this.data.lastX;
    if (tx < 0)
      this.setData({
        ["arry[" + index + "].isDelete"]: true,
      })
    else if (tx > 0)
      this.setData({
        ["arry[" + index + "].isDelete"]: false,
      })
    this.data.lastX = currentX;
    this.data.index = index;
  },
  onBack() {
    wx.navigateBack({
      delta: 1,
    })
  },
  onClick() {
    wx.navigateTo({
      url: '/pages/user/attest/apply/apply'
    })
  },
  onChange(e) {
    var type = e.currentTarget.dataset.type;
    var ptype = e.currentTarget.dataset.ptype;
    var id = e.currentTarget.dataset.id;
    var token = wx.getStorageSync('token');
    var userid = wx.getStorageSync('userid');
    var list = this.data.arry;
    if (type == 1) {
      wx.navigateTo({
        url: '/pages/user/attest/edit/edit?id=' + id + '&ptype=' + ptype,
      })
    }
    if (type == 2) {
      wx.navigateTo({
        url: '/pages/user/attest/dt/dt?id=' + id + '&ptype=' + ptype,
      })
    }
    if (type == 3) {
      // 删除
      if (ptype == 1) {
        // 个人
        Dialog.confirm({
          title: '提示',
          message: '是否删除该认证！',
          zIndex: 1000,
        }).then(() => {
          // on confirm
          NetworkRequest({
            url: '/authentication/delauth',
            data: {
              id: id,
              token: token,
              user_id: userid
            },
          }).then(res => {
            var code = res.data.code;
            if (code == 1) {
              for (var i = 0; i < list.length; i++) {
                if (list[i].id == id) {
                  this.setData({
                    ["arry[" + i + "].isShow"]: true,
                  });
                };
              };
            };
            Toast(res.data.msg);
          }).catch(err => {})

        }).catch(() => {
          // on cancel
          for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) {
              this.setData({
                ["arry[" + i + "].isDelete"]: false,
              });
            };
          };
        });
      };
      if (ptype == 2) {
        // 企业
        Dialog.confirm({
          title: '提示',
          message: '是否删除该认证！',
          zIndex: 1000,
        }).then(() => {
          NetworkRequest({
            url: '/authentication/delbusiness',
            data: {
              id: id,
              token: token,
              user_id: userid
            },
          }).then(res => {
            var code = res.data.code;
            if (code == 1) {
              for (var i = 0; i < list.length; i++) {
                if (list[i].id == id) {
                  this.setData({
                    ["arry[" + i + "].isShow"]: true,
                  });
                };
              };
            };
            Toast(res.data.msg);
          }).catch(err => {})
        }).catch(() => {
          for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) {
              this.setData({
                ["arry[" + i + "].isDelete"]: false,
              });
            };
          };
        });
      };
    };
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },
  notify(res) {
    Notify({
      text: res,
      duration: 5000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
      zIndex: 300,
    })
  },
  getData() {
    var that = this;
    that.toast();
    var token = wx.getStorageSync('token');
    var userid = wx.getStorageSync('userid');
    NetworkRequest({
      url: '/authentication/allauthentication',
      data: {
        user_id: userid,
        token: token,
      },
    }).then(res => {
      var code = res.data.code;
      var arry = res.data.data;
      Toast.clear();
      if (code == 1) {
        for (var i = 0; i < arry.length; i++) {
          arry[i].isDelete = false;
          arry[i].isShow = false;
          arry[i].firstStr = arry[i].chinese_name ? arry[i].chinese_name.slice(0, 1) : arry[i].company_name.slice(0, 1);
        };
        that.setData({
          arry: arry,
        });
        Toast.clear();
        wx.stopPullDownRefresh();
      };
      if (code == 2) {
        // this.notify('登录失效，请重新登录！');
        setTime().then(res => {
          wx.navigateTo({
            url: '/pages/user/log_on/log_on',
          })
        })
      };
    }).catch(err => {
      Toast.clear();
      wx.stopPullDownRefresh();
    })
  },

  onZiliao(e) {
    var index = e.currentTarget.dataset.index;
    var type = this.data.type;
    var list = this.data.arry[index];
    var status = list.status;
    var ptype = list.ptype;
    var brand_type = wx.getStorageSync('brand_type');
    if (list.ptype == 1) {
      var name = list.chinese_name;
    } else {
      var name = list.company_name;
    };
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];


    if (type == 101) {
      var name = PrePage.data.name;
      if (name == '') {
        if (ptype == 2) {
          PrePage.setData({
            qiye: list,
            qiyeName: list.company_name,
          })
        } else {
          Toast('请选择企业认证！');
          return;
        }
      } else {
        if (ptype == 2) {
          var newName = list.company_name
          if (newName == name) {
            Toast('共有企业不能与申请人相同！');
            return;
          } else {
            PrePage.setData({
              qiye: list,
              qiyeName: list.company_name,
            })
          }
        } else {
          Toast('请选择企业认证！');
          return;
        }
      }
      wx.navigateBack({
        delta: 1,
      })
    };




    if (type == 11 || type == 'merg') {
      var pass = true;
    }

    if (type == 'zhichan') {
      var entrust = PrePage.data.entrust;
      if (entrust) {
        if (entrust == name) {
          var pass = false;
        } else {
          var pass = true;
        };
      } else {
        var pass = true
      }
    };
    if (type == 22) {
      var shourangren = PrePage.data.shourangren;
      if (shourangren) {
        if (shourangren == name) {
          var pass = false;
        } else {
          var pass = true;
        };
      } else {
        var pass = true
      }
    };
    if (type == 33) {
      var zhuanrangren = PrePage.data.zhuanrangren;
      if (zhuanrangren) {
        if (zhuanrangren == name) {
          var pass = false;
        } else {
          var pass = true;
        };
      } else {
        var pass = true
      }
    };
    if (type == 55) {
      var xuke = PrePage.data.xuke;
      if (xuke) {
        if (xuke == name) {
          var pass = false;
        } else {
          var pass = true;
        };
      } else {
        var pass = true
      }
    };
    if (type == 44) {
      var beixuke = PrePage.data.beixuke;
      if (beixuke) {
        if (beixuke == name) {
          var pass = false;
        } else {
          var pass = true;
        };
      } else {
        var pass = true
      }
    };
    if (ptype == 2 || brand_type == 1) {
      if (type == 'zhichan') {

        if (status == 2) {
          if (pass) {
            if (type == 'zhichan') {
              PrePage.setData({
                auth_type: list.ptype,
                title: name,
                apply_id: list.id,
                page: 1,
              });
            };
            PrePage.setData({
              list: []
            })
            PrePage.onSeach();
            wx.navigateBack();
          } else {
            Toast('不能重复选择该认证！');
          }
        } else {
          Toast('不能选择未审核的认证！');
        }
      } else {
        if (status !== 3) {
          if (pass) {
            if (type == 11) {
              var sqName = PrePage.data.name;
              var qiyeName = PrePage.data.qiyeName;
              if (qiyeName == name) {
                Toast('申请人不能与共有企业相同！');
                return;
              } else {
                PrePage.setData({
                  auth_type: list.ptype,
                  name: name,
                  apply_id: list.id,
                  attestType: list.type,
                });
              }
            };
            if (type == 22) {
              PrePage.setData({
                auth_type: list.ptype,
                zhuanrangren: name,
                apply_id: list.id,
              });
            };
            if (type == 33) {
              PrePage.setData({
                assignee_type: list.ptype,
                shourangren: name,
                assignee_id: list.id,
              });
            };
            if (type == 44) {
              PrePage.setData({
                auth_type: list.ptype,
                xuke: name,
                apply_id: list.id,
              });
            };
            if (type == 55) {
              PrePage.setData({
                assignee_type: list.ptype,
                beixuke: name,
                assignee_id: list.id,
              });
            };
            if (type == 'merg') {
              PrePage.setData({
                auth_type: list.ptype,
                entrust: name,
                apply_id: list.id,
              });
            };
            wx.navigateBack();
          } else {
            Toast('不能重复选择该认证！');
          }
        } else {
          Toast('不能选择未通过的认证！');
        }
      }
    } else {
      Toast('请选择企业认证！');
    }
  },
  onLoad: function (options) {
    this.getData();
    if (options.open) {
      this.setData({
        open: options.open,
        type: options.type,
      })
    }
  },
  onPullDownRefresh: function () {
    this.getData();
  },
})