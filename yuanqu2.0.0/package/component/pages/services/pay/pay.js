import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/GardenNetwork.js';
import applyType from '../../../../../template/template.js';
import util from '../../../../../utils/time.js';
import canonical from '../../../../../template/canonical.js';
const time = parseInt(new Date().getTime() / 1000);
import setTime from '../../../../../template/setTime.js';
import route from '../../../../../template/route.js';
import CopyrightRequest from '../../../../../template/copyright'
Page({
  data: {
    high: getApp().globalData.sysinfo.windowHeight,
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    orderList: [],
    shippAddress: [],
    id: '',
    total: 0,
    applyType: applyType.applyType,
    checked: 1,
    c_id: 0,
    invoice_id: 0,
    name: '',
    coupon_price: 0,
    show: false,
    nhr_pay: 0,
    open: false,
    value: '',
    focus: false,
    idtype: '',
  },
  onChange(e) {
    canonical(e.detail)
  },
  onStopLoading() {
    wx.hideLoading({
      complete: (res) => {},
    })
  },
  onChecked(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 2) {
      this.setData({
        focus: true,
        checked: id,
      })
    } else {
      this.setData({
        focus: false,
        checked: id,
      })
    }
  },
  onAdress() {
    wx.navigateTo({
      url: '/pages/user/address/address',
    })
  },
  onGl() {
    wx.navigateTo({
      url: '/pages/user/bill/g_bill/g_bill?onPay=' + true,
    })
  },
  onCoupon() {
    wx.navigateTo({
      url: '/package/component/pages/services/coupon/coupon?open=' + true,
    })
  },
  onPay() {
    var id = this.data.checked;
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var shippAddress = this.data.shippAddress ? this.data.shippAddress : [];
    var invoice_id = this.data.invoice_id;
    var order_id = this.data.id;
    var c_id = this.data.c_id;
    var total = JSON.parse(this.data.nhr_pay);
    var idtype = wx.getStorageSync('idtype');
    console.log(shippAddress, 'sdsdsd')
    if (shippAddress.length == 0) {
      console.log(shippAddress, 'sdsdsd')
      this.notify("请先添加您的收件地址");
      return
    };
    var said = shippAddress.id;
    if (order_id.length == 0) {
      this.notify("订单信息错误");
      return
    };
    if (id == 2 && total > 0) {
      if (this.data.value.length < 1) {
        this.onStopLoading();
        Toast.clear()
        this.notify('请填写正确的企业名称');
        return
      }
    }
    Toast.loading({
      mask: true,
      message: '支付中...',
      duration: 0,
    });
    if (idtype == 3) {
      CopyrightRequest({
        url: '/copyRight/orderPay',
        data: {
          id: order_id,
          address_id: said,
          type: id == 2 ? 4 : 5,
          invoice_id: invoice_id,
          company_name: id == 2 ? this.data.value : '',
          coupon_id: c_id,
          openid: wx.getStorageSync('openId'),
        },
        method: 'POST',
      }).then((res) => {
        this.onStopLoading();
        if (res.data.code == 1) {
          if (id == 2) {
            this.notify(res.data.msg);
            setTime(4000).then(() => {
              wx.redirectTo({
                url: "/pages/user/my_copyright/my_copyright?id=" + 1,
              })
            })
          };
          if (id == 1) {
            this.onWxpay(res.data.data)
          }
        } else {
          this.onStopLoading();
          this.notify(res.data.msg)
        }
      }).catch(err => {
        this.onStopLoading();
        this.notify('请求失败，请重试')
      })
    } else {
      if (idtype == 2) {
        if (id == 1) {
          if (total == 0) {
            var type = 0;
            CopyrightRequest({
              url: '/patent/orderPay',
              data: {
                user_id: userid,
                token: token,
                type: type,
                c_id: c_id,
                address_id: said,
                invoice_id: invoice_id,
                id: order_id,
                g_pid: (idtype == 1 ? 51 : 49)
              },
              method: 'POST',
            }).then(res => {
              var code = res.data.code;
              Toast.clear();
              if (code == 0) {
                this.notify(res.data.msg)
              }
              if (code == 1) {
                this.notify(res.data.msg);
                this.onNav(this.data.idtype)
              }
            }).catch(err => {
              Toast.clear();
              this.notify('请求失败')
            })
          } else {
            var openId = wx.getStorageSync('openId');
            if (openId) {
              var type = 5;
              CopyrightRequest({
                url: '/patent/orderPay',
                data: {
                  user_id: userid,
                  token: token,
                  type: type,
                  openid: openId,
                  c_id: c_id,
                  address_id: said,
                  invoice_id: invoice_id,
                  id: order_id,
                  g_pid: (idtype == 1 ? 51 : 49)
                },
                method: 'POST',
              }).then(res => {
                var code = res.data.code;
                this.onStopLoading();
                if (code == 1) {
                  this.onWxpay(res.data.data)
                };
                if (code == 2) {
                  this.notify(res.data.msg);
                  setTime().then(res => {
                    // func.route('pages/user/log_on/log_on')
                  })
                };
                if (code == 0) {
                  this.notify(res.data.msg)
                }
              }).catch(err => {
                this.onStopLoading();
                this.notify('请求失败，下拉刷新下重试')
              })
            } else {
              this.notify('请先使用微信登录')
            }
          }
        };
        if (id == 2) {
          if (total == 0) {
            var type = 0;
            var company_transfer = ''
          } else {
            var type = 4;
            var ss = this.data.value;
            if (ss.length < 1 && total > 0) {
              Toast.clear()
              this.notify('请填写正确的企业名称');
              return
            }
            var company_transfer = ss
          };
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          CopyrightRequest({
            url: '/patent/orderPay',
            data: {
              user_id: userid,
              token: token,
              type: type,
              c_id: c_id,
              address_id: said,
              invoice_id: invoice_id,
              id: order_id,
              company_name: company_transfer,
              g_pid: (idtype == 1 ? 51 : 49)
            },
            method: 'POST',
          }).then(res => {
            var code = res.data.code;
            this.onStopLoading();
            if (code == 1) {
              setTime().then(res => {
                if (idtype == 1) {
                  this.onNav(this.data.idtype)
                } else {
                  this.notify('待线下付款成功，即将返回订单列表');
                  var nownRoute = pages[pages.length - 2].route;
                  var PrePage = pages[pages.length - 2];
                  if (nownRoute == 'pages/user/my_patent/my_patent') {
                    PrePage.setData({
                      active: 0,
                      arry: [],
                      page: 1,
                      paynum: 0,
                      payCheck: false,
                    });
                    setTime(100).then(() => {
                      PrePage.getData(PrePage.data.active)
                    });
                    setTime(3000).then(e => {
                      wx.navigateBack({
                        delta: 1,
                      })
                    })
                  } else {
                    this.notify('待线下付款成功，即将跳转订单列表');
                    setTime(3000).then(e => {
                      wx.redirectTo({
                        url: "/pages/user/my_patent/my_patent?id=" + 1,
                      })
                    })
                  }
                }
              })
            };
            if (code == 2) {};
            if (code == 0) {
              this.notify(res.data.msg)
            }
          }).catch(err => {
            this.onStopLoading();
            this.notify('请求失败')
          })
        }
      } else {
        if (id == 1) {
          if (total == 0) {
            var type = 0;
            NetworkRequest({
              url: '/order/offinePayOrder',
              data: {
                user_id: userid,
                token: token,
                type: type,
                c_id: c_id,
                address_id: said,
                invoice_id: invoice_id,
                id: order_id,
                g_pid: 51
              },
              method: 'POST',
            }).then(res => {
              var code = res.data.code;
              Toast.clear();
              if (code == 0) {
                this.notify(res.data.msg)
              }
              if (code == 1) {
                this.notify(res.data.msg);
                this.onNav(this.data.idtype)
              }
            }).catch(err => {
              Toast.clear();
              this.notify('请求失败')
            })
          } else {
            var openId = wx.getStorageSync('openId');
            if (openId) {
              var type = 5;
              NetworkRequest({
                url: '/order/offinePayOrder',
                data: {
                  user_id: userid,
                  token: token,
                  type: type,
                  openid: openId,
                  c_id: c_id,
                  address_id: said,
                  invoice_id: invoice_id,
                  id: order_id,
                  g_pid: (idtype == 1 ? 51 : 49)
                },
                method: 'POST',
              }).then(res => {
                var code = res.data.code;
                this.onStopLoading();
                if (code == 1) {
                  this.onWxpay(res.data.data)
                };
                if (code == 2) {
                  this.notify(res.data.msg);
                  setTime().then(res => {
                    // func.route('pages/user/log_on/log_on')
                  })
                };
                if (code == 0) {
                  this.notify(res.data.msg)
                }
              }).catch(err => {
                this.onStopLoading();
                this.notify('请求失败，下拉刷新下重试')
              })
            } else {
              this.notify('请先使用微信登录')
            }
          }
        };
        if (id == 2) {
          if (total == 0) {
            var type = 0;
            var company_transfer = ''
          } else {
            var type = 4;
            var ss = this.data.value;
            if (ss.length < 5 && total > 0) {
              this.onStopLoading();
              Toast.clear()
              this.notify('请填写正确的企业名称');
              return
            }
            var company_transfer = ss
          };
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          NetworkRequest({
            url: '/order/offinePayOrder',
            data: {
              user_id: userid,
              token: token,
              type: type,
              c_id: c_id,
              address_id: said,
              invoice_id: invoice_id,
              id: order_id,
              company_name: company_transfer,
              g_pid: (idtype == 1 ? 51 : 49)
            },
            method: 'POST',
          }).then(res => {
            var code = res.data.code;
            this.onStopLoading();
            if (code == 1) {
              setTime().then(res => {
                if (idtype == 1) {
                  this.onNav(this.data.idtype)
                } else {
                  this.notify('待线下付款成功，即将返回订单列表');
                  var nownRoute = pages[pages.length - 2].route;
                  var PrePage = pages[pages.length - 2];
                  if (nownRoute == 'pages/user/my_patent/my_patent') {
                    PrePage.setData({
                      active: 0,
                      arry: [],
                      page: 1,
                      paynum: 0,
                      payCheck: false,
                    });
                    setTime(100).then(() => {
                      PrePage.getData(PrePage.data.active)
                    });
                    setTime().then(e => {
                      wx.navigateBack({
                        delta: 1,
                      })
                    })
                  } else {
                    this.notify('待线下付款成功，即将跳转订单列表');
                    setTime(3000).then(e => {
                      wx.redirectTo({
                        url: "/pages/user/my_patent/my_patent?id=" + 1,
                      })
                    })
                  }
                }
              })
            };
            if (code == 2) {};
            if (code == 0) {
              this.notify(res.data.msg)
            }
          }).catch(err => {
            this.onStopLoading();
            this.notify('请求失败')
          })
        }
      }
    }
  },
  onNav(e) {
    if (e == 1) {
      var list = this.data.orderList[0];
      var order_id = list.order_id;
      var checked = this.data.checked;
      var good_name = list.good_name;
      if (list.good_name == '商标注册') {
        var click_type = list.good_name
      } else {
        var click_type = list.click_type
      };
      var one_cate = list.one_cate;
      var apply_id = 0;
      if (click_type == '商标注册' || click_type == '商标撤三申请' || click_type == '补发商标证书' || click_type == '商标许可备案' || click_type == '商标转让' || click_type == '商标变更' || click_type == '商标续展'||click_type == '商标宽展') {
        this.notify(checked == 1 ? '支付成功，即将跳转提交资料' : '待线下付款，即将跳转提交资料');
      } else {
        this.notify(checked == 1 ? '支付成功，即将跳转提交资料' : '待线下付款，请去PC端提交资料，即将跳转订单列表');
      };
      setTime(4000).then(res => {
        wx.setStorageSync('order_back_type', 2);
        if (click_type == '商标注册') {
          wx.redirectTo({
            url: '/package/component/pages/material/mergedata/mergedata?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 1,
          })
        }
        if (click_type == '商标撤三答辩') {
          wx.redirectTo({
            url: '/pages/user/my_order/my_order?id=' + 0,
          })
        };
        if (click_type == '商标撤三申请') {
          wx.redirectTo({
            url: '/package/component/pages/material/pay_ziliao/pay_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 2,
          })
        };
        if (click_type == '商标异议答辩') {
          wx.redirectTo({
            url: '/pages/user/my_order/my_order?id=' + 0,
          })
        };
        if (click_type == '商标异议申请') {
          wx.redirectTo({
            url: '/pages/user/my_order/my_order?id=' + 0,
          })
        };
        if (click_type == '商标驳回复审') {
          wx.redirectTo({
            url: '/pages/user/my_order/my_order?id=' + 0,
          })
        };
        if (click_type == '补发商标证书') {
          wx.redirectTo({
            url: '/package/component/pages/material/pay_ziliao/pay_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 4,
          })
        };
        if (click_type == '商标许可备案') {
          wx.redirectTo({
            url: '/package/component/pages/material/pay_ziliao/pay_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 5,
          })
        };
        if (click_type == '商标转让') {
          wx.redirectTo({
            url: '/package/component/pages/material/pay_ziliao/pay_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 6,
          })
        };
        if (click_type == '商标变更') {
          wx.redirectTo({
            url: '/package/component/pages/material/pay_ziliao/pay_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 7,
          })
        };
        if (click_type == '商标续展') {
          wx.redirectTo({
            url: '/package/component/pages/material/pay_ziliao/pay_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 8,
          })
        }
        if (click_type == '商标宽展') {
          wx.redirectTo({
            url: '/package/component/pages/material/pay_ziliao/pay_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 9,
          })
        }
      })
    };
    if (e == 2) {
      this.notify('即将跳转订单列表');
      setTime(4000).then(() => {
        wx.redirectTo({
          url: '/pages/user/my_patent/my_patent?id=' + 1,
        })
      })
    };
    if (e == 3) {
      this.notify('即将跳转订单列表');
      setTime(4000).then(() => {
        wx.redirectTo({
          url: '/pages/user/my_copyright/my_copyright?id=' + 1,
        })
      })
    }
  },
  onWxpay(list) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    wx.requestPayment({
      timeStamp: list.timeStamp,
      nonceStr: list.nonceStr,
      package: list.package,
      signType: list.signType,
      paySign: list.paysign,
      success: (res => {
        if (this.data.open) {
          PrePage.onEnpush()
        };
        this.onNav(idtype)
      }),
      fail: (err => {
        var error = err.errMsg == 'requestPayment:fail cancel' ? '已取消支付' : err.errMsg.slice(0, 100);
        this.notify(error);
        var pages = getCurrentPages();
        var nownRoute = pages[pages.length - 2].route;
        var idtype = this.data.idtype;
        setTime().then(res => {
          if (idtype == 1) {
            if (nownRoute == 'pages/user/my_order/my_order') {
              wx.navigateBack({
                delta: 1,
              })
            } else {
              wx.redirectTo({
                url: '/pages/user/my_order/my_order?id=' + 1,
              })
            }
          }
          if (idtype == 2) {
            if (nownRoute == 'pages/user/my_patent/my_patent') {
              wx.navigateBack({
                delta: 1,
              })
            } else {
              wx.redirectTo({
                url: "/pages/user/my_patent/my_patent?id=" + 1,
              })
            }
          };
          if (idtype == 3) {
            if (nownRoute == 'pages/user/my_copyright/my_copyright') {
              wx.navigateBack({
                delta: 1,
              })
            } else {
              wx.redirectTo({
                url: "/pages/user/my_copyright/my_copyright?id=" + 1,
              })
            }
          }
        })
      }),
    })
  },
  getAdress() {
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var id = 1;
    NetworkRequest({
      url: '/shippingAddress/shippAddressDetail',
      data: {
        user_id: userid,
        token: token,
      },
    }).then(res => {}).catch(err => {})
  },
  getData(e) {
    this.toast();
    var idtype = wx.getStorageSync('idtype');
    this.data.idtype = idtype;
    var click_type = wx.getStorageSync('click_type');
    this.data.idtype = idtype;
    if (idtype == 3) {
      CopyrightRequest({
        url: '/copyRight/pODetail',
        data: {
          id: e,
          click_type: click_type,
        },
        method: 'POST',
      }).then((res) => {
        var code = res.data.code;
        var arry = res.data.data;
        var orderList = arry.order;
        var total = 0;
        for (var i = 0; i < orderList.length; i++) {
          if (typeof (orderList[i].total_price) == 'string') {
            orderList[i].total_price = JSON.parse(orderList[i].total_price).toFixed(2)
          } else {
            orderList[i].total_price = orderList[i].total_price.toFixed(2)
          }
          if (orderList[i].total_price > 0) {
            if (typeof (orderList[i].total_price) == 'string') {
              total += JSON.parse(orderList[i].total_price)
            } else {
              total += orderList[i].total_price
            }
          }
        };
        if (total == 0) {
          this.setData({
            show: true
          })
        } else {
          this.setData({
            show: false
          })
        };
        var coupon_price = this.data.coupon_price;
        if (coupon_price >= 0 && total >= coupon_price) {
          var nhr_pay = total - coupon_price
        } else {
          var nhr_pay = '0.00'
        }
        console.log(arry.shopAddress,'dsdsds');
        if (code == 1) {
          this.setData({
            orderList: arry.order,
            shippAddress: arry.shopAddress ? (arry.shopAddress[0]?arry.shopAddress[0]:[]) : [],
            total: total.toFixed(2),
            nhr_pay: nhr_pay.toFixed(2),
          })
        };
        if (code == 2) {
          this.notify(res.data.msg);
          setTime().then(res => {
            // func.route('pages/user/log_on/log_on')
          })
        };
        this.onStopLoading();
        wx.stopPullDownRefresh()
      }).catch(err => {
        this.onStopLoading();
        this.notify('请求失败,下拉刷新下');
        wx.stopPullDownRefresh()
      })
    } else {
      if (idtype == 1) {
        NetworkRequest({
          url: '/order/comfirmOrder',
          data: {
            id: e,
            order_id: e,
            click_type:click_type,
            g_pid: (idtype == 1 ? 51 : 49),
            // id	是	int	订单ID
// user_id	是	int	用户 id
// click_type
          },
          method:"POST"
        }).then(res => {
          var code = res.data.code;
          var arry = res.data.data;
          var orderList = arry.order;
          var total = 0;
          for (var i = 0; i < orderList.length; i++) {
            if (typeof (orderList[i].total_price) == 'string') {
              orderList[i].total_price = JSON.parse(orderList[i].total_price).toFixed(2)
            } else {
              orderList[i].total_price = orderList[i].total_price.toFixed(2)
            }
            if (orderList[i].total_price > 0) {
              if (typeof (orderList[i].total_price) == 'string') {
                total += JSON.parse(orderList[i].total_price)
              } else {
                total += orderList[i].total_price
              }
            }
          };
          if (total == 0) {
            this.setData({
              show: true
            })
          } else {
            this.setData({
              show: false
            })
          };
          var coupon_price = this.data.coupon_price;
          if (coupon_price >= 0 && total >= coupon_price) {
            var nhr_pay = total - coupon_price
          } else {
            var nhr_pay = '0.00'
          }
          if (code == 1) {
            this.setData({
              orderList: arry.order,
              // shippAddress: arry.shopAddress,
              shippAddress: arry.shopAddress ? (arry.shopAddress?arry.shopAddress:[]) : [],
              total: total.toFixed(2),
              nhr_pay: nhr_pay.toFixed(2),
            })
          };
          if (code == 2) {
            this.notify(res.data.msg);
            setTime().then(res => {
              // func.route('pages/user/log_on/log_on')
            })
          };
          this.onStopLoading();
          wx.stopPullDownRefresh()
        }).catch(err => {
          this.onStopLoading();
          this.notify('请求失败,下拉刷新下');
          wx.stopPullDownRefresh()
        })
      } else {
        CopyrightRequest({
          url: '/patent/pODetail',
          data: {
            id: e,
            order_id: e,
            g_pid: (idtype == 1 ? 51 : 49),
            click_type:click_type,
          },
          method:"POST"
        }).then(res => {
          var code = res.data.code;
          var arry = res.data.data;
          var orderList = arry.order;
          var total = 0;
          for (var i = 0; i < orderList.length; i++) {
            if (typeof (orderList[i].total_price) == 'string') {
              orderList[i].total_price = JSON.parse(orderList[i].total_price).toFixed(2)
            } else {
              orderList[i].total_price = orderList[i].total_price.toFixed(2)
            }
            if (orderList[i].total_price > 0) {
              if (typeof (orderList[i].total_price) == 'string') {
                total += JSON.parse(orderList[i].total_price)
              } else {
                total += orderList[i].total_price
              }
            }
          };
          if (total == 0) {
            this.setData({
              show: true
            })
          } else {
            this.setData({
              show: false
            })
          };
          var coupon_price = this.data.coupon_price;
          if (coupon_price >= 0 && total >= coupon_price) {
            var nhr_pay = total - coupon_price
          } else {
            var nhr_pay = '0.00'
          }
          if (code == 1) {
            this.setData({
              orderList: arry.order,
              shippAddress: arry.shopAddress ? (arry.shopAddress[0]?arry.shopAddress[0]:[]) : [],
              total: total.toFixed(2),
              nhr_pay: nhr_pay.toFixed(2),
            })
          };
          if (code == 2) {
            this.notify(res.data.msg);
            setTime().then(res => {
              // func.route('pages/user/log_on/log_on')
            })
          };
          this.onStopLoading();
          wx.stopPullDownRefresh()
        }).catch(err => {
          this.onStopLoading();
          this.notify('请求失败,下拉刷新下');
          wx.stopPullDownRefresh()
        })
      }
    }
  },
  toast() {
    Toast.loading({
      mask: true,
      message: '加载中...',
      duration: 0,
    })
  },
  notify(event) {
    wx.showToast({
      title: event,
      icon: 'none',
      duration: 5000,
      mask: true
    })
  },
  onLoad: function (options) {
    this.data.id = wx.getStorageSync('id');
    if (options.open) {
      this.setData({
        open: options.open
      })
    }
  },
  onShow: function () {
    this.getData(this.data.id)
  },
  onUnload: function () {
    wx.removeStorageSync('id')
  },
  onPullDownRefresh: function () {
    this.getData(this.data.id)
  },
})