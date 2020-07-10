import Toast from '../../../dist/toast/toast';
import Notify from '../../../dist/notify/notify';
import NetworkRequest from '../../../template/network.js';
import animated from '../../../template/animation.js';
import setTime from '../../../template/setTime.js';
import Dialog from '../../../dist/dialog/dialog';
import route from '../../../template/route.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    win: getApp().globalData.sysinfo.windowWidth,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    height: getApp().globalData.menu.height + getApp().globalData.menu.top,
    icon_Url: getApp().globalData.icon_Url,
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    animationData: '',
    arry: [],
    page: 1,
    display: true,
    index: '',
    order_id: '',
    paynum: 0,
    payCheck: false,
  },
  onChooseAll(e) {
    var id = e.currentTarget.dataset.id;
    // console.log(id);
    var arry = this.data.arry.slice(0, this.data.arry.length);
    if (id == 1) {
      //全选合同


    } else {
      //全选付款
      // var order = [];
      var payCheck = this.data.payCheck;
      var num = 0;
      for (var i = 0; i < arry.length; i++) {
        if (arry[i].isShow == false) {
          arry[i].isSelect = payCheck == true ? false : true;
          if (arry[i].isSelect) {
            num++
          }
        }
      };
      if (num == 0 && payCheck == false) {
        Toast('暂无订单');
      };
      this.setData({
        paynum: num,
        payCheck: num == 0 ? false : true,
        arry: arry,
      })
    }



  },
  //批量delet
  delete() {
    var arry = this.data.arry;
    for (var i = 0; i < arry.length; i++) {
      NetworkRequest({
        url: '/order/cancelOrder',
        data: {
          id: arry[i].id,
          type: arry[i].click_type,
          status: -1,
          g_pid: 49,
        },
      }).then(res => {})
    }
  },
  //pay
  onPay() {
    Toast.loading({
      message: '结算中...',
      duration: 0,
    });
    var arry = this.data.arry;
    // console.log(arry.map(x=>x.id))
    var shop_id = [];
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].isSelect == true) {
        shop_id.push(arry[i].id);
      };
    };
    var id = shop_id.join(',');
    // var id = arry.map(x => {
    //   if (x.isSelect == true) {
    //     return x.id;
    //   }else{
    //     return '';
    //   };
    // })
    // console.log(id, 'id?');
    // return;
    if (id.length == 0) {
      Toast.clear();
      this.notify('请先选择订单');
    } else {
      wx.setStorageSync('id', id);
      wx.setStorageSync('idtype', 2);
      wx.navigateTo({
        url: '/package/component1/pages/services/pay/pay',
        success: (res => {
          Toast.clear();
        }),
      })
    };
  },
  // 选择
  onCecked(e) {
    // var id = e.currentTarget.dataset.id;
    // var arry = this.data.arry;
    // for (var i = 0; i < arry.length; i++) {
    //   if (arry[i].id == id) {
    //     if (arry[i].isSelect == true) {
    //       this.setData({
    //         ["arry[" + i + "].isSelect"]: false,
    //       });
    //     } else {
    //       this.setData({
    //         ["arry[" + i + "].isSelect"]: true,
    //       });
    //     };
    //   };
    // };
    var id = e.currentTarget.dataset.id;
    var active = this.data.active;
    var arry = this.data.arry;
    var len = arry.length;
    // console.log(len)
    var num = 0;
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].id == id) {
        if (arry[i].isSelect == true) {
          arry[i].isSelect = false;
          this.setData({
            ["arry[" + i + "].isSelect"]: false,
          });
        } else {
          arry[i].isSelect = true;
          this.setData({
            ["arry[" + i + "].isSelect"]: true,
          });
        };
      };
      if (arry[i].isSelect) {
        num++;
      }
    };
    if (active == 1) {
      this.setData({
        paynum: num,
        payCheck: len == num ? true : false,
      })
    } else {
      this.setData({
        contractnum: num,
        contractCheck: len == num ? true : false,
      })
    }
  },
  // 生成合同
  onContract() {
    var arry = this.data.arry;
    var id = [];
    var o_id = [];
    var pass = false;
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].isSelect == true) {
        var pass = true;
        id.push(arry[i].id);
        o_id.push(arry[i].order_id);
      }
    }
    if (pass) {
      // console.log(id, o_id);
      wx.navigateTo({
        url: '/pages/user/my_order/merg/merg?id=' + id + '&o_id=' + o_id,
      })
    } else {
      this.notify('请先选择订单');
    }
  },
  // onEnpush() {},
  onBack() {
    wx.navigateBack({
      delta: 1,
    })
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
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
      zIndex: 200,
    })
  },
  anima(e) {
    var current = e.currentTarget.dataset.id;
    if (current == this.data.active) {
      return;
    };
    animated(current * this.data.win / 100 * 25);
    this.setData({
      active: current,
      arry: [],
      page: 1,
      paynum: 0,
      payCheck: false,
    })
    setTime(100).then(res => {
      this.getData(current);
    })
  },
  onFist(e) {
    var index = e.currentTarget.dataset.index;
    this.data.index = index;
    var list = this.data.arry[index];
    var id = list.id;
    var order_id = list.order_id;
    this.data.order_id = order_id;
    this.data.o_id = id;
    var good_name = list.good_name;
    var click_type = list.click_type;
    var apply_id = list.apply_id;
    var brand_num = list.brand_num;
    //详情
    wx.navigateTo({
      url: '/pages/user/my_patent/dt/dt?id=' + id + '&click_type=' + click_type,
    })
  },
  onLeft(e) {
    var index = e.currentTarget.dataset.index;
    this.data.index = index;
    var list = this.data.arry[index];
    var link = list.left_status[1];
    var id = list.id;
    var order_id = list.order_id;
    this.data.order_id = order_id;
    this.data.o_id = id;
    var good_name = list.good_name;
    var click_type = list.click_type;
    var one_cate = list.one_cate;
    var brand_num = list.brand_num;
    // console.log('left', click_type, link);
    // 取消订单
    if (link == 'gl://ordercancel') {
      this.onCancel(id, click_type);
    };
    //详情
    if (link == 'gl://orderdetail') {
      wx.navigateTo({
        url: '/pages/user/my_patent/dt/dt?id=' + id + '&click_type=' + click_type,
      })
    };
    // 去付款
    if (link == 'gl://pay') {
      wx.setStorageSync('id', id);
      wx.setStorageSync('idtype', 2);
      wx.navigateTo({
        url: '/package/component1/pages/services/pay/pay?open=' + true,
      })
    };
    //实用新型专利申请提交资料
    if (link == 'gl://submitzhuce?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/patent_Up_ziliao/patent_Up_ziliao?click_type=' + click_type + '&order_id=' + order_id + '&type=' + 4 + '&id=' + id,
      })
    }
    //专利变更申请提交资料
    if (link == 'gl://submitchange?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/patent_Change_ziliao/patent_Change_ziliao?click_type=' + click_type + '&order_id=' + order_id + '&type=' + 4 + '&id=' + id,
      })
    }
    //专利变更申请提交资料
    if (link == 'gl://submitchanges?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/patent_Change_ziliao_edit/patent_Change_ziliao_edit?click_type=' + click_type + '&order_id=' + order_id + '&type=' + 4 + '&id=' + id,
      })
    }
    //专利转让申请提交资料
    if (link == 'gl://submitmove?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/patent_transfer_ziliao/patent_transfer_ziliao?click_type=' + click_type + '&order_id=' + order_id + '&type=' + 4 + '&id=' + id,
      })
    }
    // 专利转让申请修改资料
    if (link == 'gl://submitmoves?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/patent_transfer_ziliao_edit/patent_transfer_ziliao_edit?click_type=' + click_type + '&order_id=' + order_id + '&type=' + 4 + '&id=' + id,
      })
    }

    //查看缴费第一次
    if (link == 'gl://getNotices') {
      route('package/component1/pages/patent/look_pay/look_pay?click_type=' + click_type + '&order_id=' + order_id + '&type=' + 4 + '&id=' + id + '&num=' + 1);
    }
    //实用新型专利申请修改资料
    if (link == 'gl://submitpatent?edit=1') {
      route('package/component1/pages/material/patent_Up_ziliao_edit/patent_Up_ziliao_edit?click_type=' + click_type + '&order_id=' + order_id + '&type=' + 4 + '&id=' + id, );
    };
    //实用新型专利申请 确认材料
    if (link == 'gl://getSynopsis') {
      route('package/component1/pages/patent/confirmation_material_first/confirmation_material_first?click_type=' + click_type + '&order_id=' + order_id + '&type=' + 4 + '&id=' + id);
    };
    //发明专利申请
    if (link == 'gl://submitpatent?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/patent_Up_ziliao/patent_Up_ziliao?click_type=' + click_type + '&order_id=' + order_id + '&type=' + 4 + '&id=' + id,
      })
    };
    //发明专利申请第二次确认材料
    if (link == 'gl://getOpinion') {
      wx.navigateTo({
        url: '/package/component1/pages/patent/makings/makings?click_type=' + click_type + '&order_id=' + order_id + '&type=' + 4 + '&id=' + id,
      })
    };
    //查看缴费第二次
    if (link == 'gl://payRegisterInfo') {
      // console.log('asasass')
      wx.navigateTo({
        url: '/package/component1/pages/patent/look_pay/look_pay?click_type=' + click_type + '&order_id=' + order_id + '&type=' + 4 + '&id=' + id + '&num=' + 2
      })
    };
    //确认收货

    if (link == 'gl://ordershouhuo') {
      Dialog.confirm({
        title: '提示',
        message: '确认收货？'
      }).then(() => {
        // on confirm
        this.toast();
        NetworkRequest({
          url: '/patent/orderEnd',
          data: {
            id: id,
            type: click_type,
            status: '',
          },
          method: "POST"
        }).then(res => {
          var code = res.data.code;
          if (code == 1) {
            this.onEnpush();
            this.notify('已收货');
          };
        })
      })
    }




  },

  onRight(e) {
    var index = e.currentTarget.dataset.index;
    this.data.index = index;
    var list = this.data.arry[index];
    var link = list.right_status[1];
    var id = list.id;
    var order_id = list.order_id;
    this.data.order_id = order_id;
    this.data.o_id = id;
    var good_name = list.good_name;
    var click_type = list.click_type;
    var brand_num = list.brand_num;
    //详情
    if (link == 'gl://orderdetail') {
      wx.navigateTo({
        url: '/pages/user/my_patent/dt/dt?id=' + id + '&click_type=' + click_type,
      })
    };
    //取消订单
    if (link == 'gl://ordercancel') {
      this.onCancel(id, click_type);
    };
    // 去付款
    if (link == 'gl://pay' || link == 'gl://orderPay') {
      wx.setStorageSync('id', id);
      wx.setStorageSync('idtype', 2);
      wx.navigateTo({
        url: '/package/component1/pages/services/pay/pay?open=' + true,
      })
    };
    //实用新型专利申请提交资料
    if (link == 'gl://submitzhuce?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/patent_Up_ziliao/patent_Up_ziliao?click_type=' + click_type + '&order_id=' + order_id + '&type=' + 4 + '&id=' + id,
      })
    }
    //查看缴费第一次
    if (link == 'gl://getNotices') {
      route('package/component1/pages/patent/look_pay/look_pay?click_type=' + click_type + '&order_id=' + order_id + '&type=' + 4 + '&id=' + id + '&num=' + 1);
    }
    //实用新型专利申请修改资料
    if (link == 'gl://submitpatent?edit=1') {
      route('package/component1/pages/material/patent_Up_ziliao_edit/patent_Up_ziliao_edit?click_type=' + click_type + '&order_id=' + order_id + '&type=' + 4 + '&id=' + id);
    }
  },

  onCancel(id, click_type) {
    var arry = JSON.parse(JSON.stringify(this.data.arry));
    var active = this.data.active;
    Dialog.confirm({
      title: '提示',
      message: '是否取消该订单！',
      zIndex: 1000,
    }).then(() => {
      var token = wx.getStorageSync('token');
      var userid = wx.getStorageSync('userid');
      NetworkRequest({
        url: '/order/cancelOrder',
        data: {
          id: id,
          token: token,
          user_id: userid,
          type: click_type,
          status: -1,
          g_pid: 49,
        },
      }).then(res => {
        var code = res.data.code;
        if (code == 1) {
          var active = this.data.active;
          var num = 0;
          var len = arry.length;
          for (var i = 0; i < len; i++) {
            if (arry[i].id == id) {
              arry[i].isShow = true;
              arry[i].isSelect = false;
              this.setData({
                ["arry[" + i + "].isShow"]: true,
              });
            };
            if (arry[i].isSelect == true && active == 1 && arry[i].isShow == false) {
              num++;
            };
          };
          if (active == 1) {
            this.setData({
              paynum: num,
              payCheck: num == len - 1 ? true : false
            })
          };
          Toast('取消订单成功');
        } else {
          Toast(res.data.msg);
        };
      }).catch(err => {})
    }).catch(() => {});
  },

  onEnpush() {
    var arry = JSON.parse(JSON.stringify(this.data.arry));
    var index = this.data.index;
    var token = wx.getStorageSync('token');
    var userid = wx.getStorageSync('userid');
    var order_id = this.data.order_id;
    NetworkRequest({
      url: '/patent/getOrderStatus',
      data: {
        user_id: userid,
        order_id: order_id,
        token: token,
      },
      method: "POST",
    }).then(res => {
      var code = res.data.code;
      var list = res.data.data.dataList[0];
      if (code == 1) {
        list.apply_name = list.company_name ? list.company_name : '';
        list.apply_name = list.apply_name ? list.company_name : list.chinese_name;
        list.apply_name = list.apply_name ? list.company_name : '';
        if (list.left_status) {
          list.left_status = list.left_status.split(',')
        };
        if (list.right_status) {
          list.right_status = list.right_status.split(',')
        };
        list.isShow = false;
        if (JSON.parse(list.total_price) == 0 || list.total_price == '0.00') {
          list.total_price = '0.00'
          this.setData({
            ["arry[" + index + "]"]: list,
          })
        } else {
          if (JSON.parse(list.total_price)) {
            list.total_price = JSON.parse(list.total_price).toFixed(2);
          } else {
            list.total_price = list.total_price.toFixed(2);
          };
          this.setData({
            ["arry[" + index + "]"]: list,
          })
        }
      }
    })
  },

  getData(e) {
    var active_one = e;
    var id = e;
    // console.log(id);
    // var token = wx.getStorageSync('token');
    // var userid = wx.getStorageSync('userid');
    this.setData({
      display: false,
    });
    NetworkRequest({
      url: '/patent/orderList',
      data: {
        // user_id: userid,
        page: this.data.page,
        patent_name: '',
        patent_name: '',
        good_type: '',
        order_no: '',
        patent_no: '',
        status: id,
        // token: token,
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      var active_two = this.data.active;
      // paynum: 0,
      // payCheck: false,
      var paynum = 0;
      if (code == 1) {
        var payCheck = this.data.payCheck;
        var list = res.data.data.dataList;
        var s = this.data.arry.length;
        if (list.length > 0) {
          for (var c = 0; c < list.length; c++) {
            list[c].apply_name = list[c].company_name ? list[c].company_name : '';
            list[c].apply_name = list[c].apply_name ? list[c].company_name : list[c].chinese_name;
            list[c].apply_name = list[c].apply_name ? list[c].company_name : '';
            if (payCheck == true) {
              list[c].isSelect = true;
            } else {
              list[c].isSelect = false;
            };
            if (list[c].isSelect == true) {
              paynum++
            };
            var index = s + c;
            if (list[c].left_status) {
              list[c].left_status = list[c].left_status.split(',')
            };
            if (list[c].right_status) {
              list[c].right_status = list[c].right_status.split(',')
            };
            list[c].isShow = false;
            if (JSON.parse(list[c].total_price) == 0 || list[c].total_price == '0.00') {
              list[c].total_price = '0.00'
            } else {
              if (JSON.parse(list[c].total_price)) {
                list[c].total_price = JSON.parse(list[c].total_price).toFixed(2);
              } else {
                list[c].total_price = list[c].total_price.toFixed(2);
              };
            };
            if (active_one == active_two) {
              this.setData({
                ["arry[" + index + "]"]: list[c]
              })
            }

          };
          this.setData({
            paynum: paynum + this.data.paynum
          })
          this.data.page++;
        };
      };
      setTime(100).then(res => {
        this.setData({
          display: true
        });
      })
    }).catch(err => {
      setTime(100).then(res => {
        this.setData({
          display: true
        });
      })
    })
  },
  onLoad: function (options) {
    if (options.id) {
      var id = JSON.parse(options.id);
      var s = getApp().globalData.sysinfo.windowWidth;
      animated(id * s / 100 * 25);
      this.getData(id);
      this.setData({
        active: id
      });
    } else {
      this.getData(0);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
    this.setData({
      arry: [],
      page: 1,
      paynum: 0,
      payCheck: false,
    })
    this.getData(this.data.active);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData(this.data.active);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})