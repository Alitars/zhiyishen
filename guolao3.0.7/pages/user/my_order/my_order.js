import NetworkRequest from '../../../template/network.js';
import Toast from '../../../dist/toast/toast';
import Notify from '../../../dist/notify/notify';
import Dialog from '../../../dist/dialog/dialog';
import setTime from '../../../template/setTime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    height: getApp().globalData.menu.height + getApp().globalData.menu.top,
    active: 0,
    show: '',
    id: 0,
    arry: [],
    icon_Url: getApp().globalData.icon_Url,
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    display: true,
    page: 1,
    type: 0,
    index: '',
    btn: [{
        id: 51,
        text: '全部类型'
      },
      {
        id: 51,
        text: '商标订单'
      },
      {
        id: 50,
        text: '专利订单'
      },
      {
        id: 49,
        text: '版权订单'
      },
    ],
    o_id: '',
    contractCheck: false,
    contractnum: 0,
    paynum: 0,
    payCheck: false,
  },
  onChooseAll(e) {
    var id = e.currentTarget.dataset.id;
    var arry = this.data.arry.slice(0, this.data.arry.length);
    if (id == 1) {
      //全选合同


    } else {
      //全选付款
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
  onBack() {
    if (wx.getStorageSync('order_back_type') == 2) {
      wx.switchTab({
        url: '/pages/index/index',
        success: (res => {
          wx.setStorageSync('order_back_type', 1);
        }),
      })
    } else {
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  //合同
  onContract() {
    var arry = this.data.arry;
    var id = [];
    var o_id = [];
    var pss = false;
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].isSelect == true) {
        var pass = true;
        id.push(arry[i].id);
        o_id.push(arry[i].order_id);
      }
    }
    if (pass) {
      wx.navigateTo({
        url: '/pages/user/my_order/merg/merg?id=' + id + '&o_id=' + o_id,
      })
    } else {
      this.notify('请先选择订单');
    }
  },

  onPay() {
    Toast.loading({
      message: '结算中...',
      duration: 0,
    });
    var arry = this.data.arry;
    var shop_id = [];
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].isSelect == true) {
        shop_id.push(arry[i].id);
      };
    };
    var id = shop_id.join(',');
    if (id.length == 0) {
      Toast.clear();
      this.notify('请先选择订单');
    } else {
      wx.setStorageSync('id', id);
      wx.setStorageSync('idtype', 1);
      wx.navigateTo({
        url: '/package/component1/pages/services/pay/pay',
        success: (res => {
          Toast.clear();
        }),
      })
    };

  },


  onChange(event) {
    var id = event.detail.index;
    var active = this.data.active;
    if (id !== active) {
      this.setData({
        active: id,
        page: 1,
        arry: [],
        contractCheck: false,
        contractnum: 0,
        paynum: 0,
        payCheck: false,
      })
      this.toast();
      this.getOrder(id, 51);
    }
  },
  delete() {
    var arry = this.data.arry;
    for (var i = 0; i < arry.length; i++) {
      var arry = this.data.arry;
      NetworkRequest({
        url: '/order/cancelOrder',
        data: {
          order_id: arry[i].id,
          g_pid: 51,
        },
      }).then(res => {
        var code = res.data.code;
        if (code == 1) {
          var active = this.data.active;
          var num = 0;
          var len = arry.length;
          for (var i = 0; i < arry.length; i++) {
            if (arry[i].id == e) {
              arry[i].isShow = true;
              arry[i].isSelect = false;
              this.setData({
                ["arry[" + i + "].isShow"]: true,
                ["arry[" + i + "].isSelect"]: false,
              })
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
        };
        Toast(res.data.msg)
      }).catch(err => {})
    }
  },

  onDelete(e) {
    Dialog.confirm({
      title: '提示',
      message: '是否取消该订单！',
      zIndex: 1000,
    }).then(() => {
      var arry = this.data.arry;
      NetworkRequest({
        url: '/order/cancelOrder',
        data: {
          id: e,
          g_pid: 51,
        },
      }).then(res => {
        var code = res.data.code;
        var active = this.data.active;
        var num = 0;
        var len = arry.length;
        var num2 = 0;
        if (code == 1) {
          for (var i = 0; i < arry.length; i++) {
            if (arry[i].id == e) {
              arry[i].isShow = true;
              arry[i].isSelect = false;
              this.setData({
                ["arry[" + i + "].isShow"]: true,
                ["arry[" + i + "].isSelect"]: false,
              })
            };
            if (arry[i].isSelect == true && active == 1 && arry[i].isShow == false) {
              num++;
            };
            if (arry[i].isSelect == false && active == 1 && arry[i].isShow == true) {
              num2++
            };
          };
          if (active == 1) {
            // console.log(num, len);
            this.setData({
              paynum: num,
              payCheck: num == len - num2 && num !== 0 ? true : false,
            })
          };
        };
        Toast(res.data.msg)
      }).catch(err => {})
    }).catch(() => {});
  },
  toast() {
    wx.showLoading({
      title: '加载中...',
      duration: 0,
      mask: true
    })
  },
  // onClick
  onClose() {
    this.setData({
      show: !this.data.show,
    });
  },
  onChoose(e) {
    var index = e.currentTarget.dataset.id;
    var id = e.currentTarget.dataset.type;
    this.setData({
      type: id,
      id: index,
      arry: [],
      page: 1,
    });
    this.onClose();
    this.toast();
    this.getOrder(this.data.active, this.data.type);
  },
  getOrder(status, type) {
    var active_one = status;
    var page = this.data.page;
    NetworkRequest({
      url: '/order/orderList',
      data: {
        status: status,
        type: type,
        page: this.data.page,
      },
    }).then(res => {
      Toast.clear();
      wx.stopPullDownRefresh();
      var code = res.data.code;
      var list = res.data.data.dataList;
      var s = this.data.arry.length;
      this.setData({
        display: true
      });
      var active_two = this.data.active;
      var payCheck = this.data.payCheck;
      var contractCheck = this.data.contractCheck;
      var num = 0;
      if (code == 1) {
        for (var c = 0; c < list.length; c++) {
          if (active_two == 1) {
            list[c].isSelect = payCheck ? true : false;
            if (list[c].isSelect) {
              num++
            };
          } else {
            list[c].isSelect = contractCheck ? true : false;
          }
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
          }
          if (active_one == active_two) {
            this.setData({
              ["arry[" + index + "]"]: list[c],
            })
          }
        };
        if (list.length > 0 && active_one == active_two) {
          this.data.page++;
          if (active_two == 1) {
            this.setData({
              paynum: this.data.paynum + num
            })
          }
        };
      };
    }).catch(err => {
      Toast.clear();
      wx.stopPullDownRefresh();

    })
  },
  onFist(e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.arry[index];
    var order_id = list.order_id;
    if (list.good_name == '商标注册') {
      var click_type = list.good_name;
    } else {
      var click_type = list.click_type;
    }
    wx.navigateTo({
      url: '/pages/user/my_order/dt/dt?id=' + order_id + '&click_type=' + click_type,
    })
  },

  //待财务确认提交资料
  onSubmitZiliao(e) {
    var index = e.currentTarget.dataset.index;
    this.data.index = index;
    var list = this.data.arry[index];
    var id = list.id;
    var order_id = list.order_id;
    this.data.o_id = id;
    var good_name = list.good_name;
    if (list.good_name == '商标注册') {
      var click_type = list.good_name;
      var link = 'gl://submitzhuce?edit=0';
    } else {
      var click_type = list.click_type;
      if (click_type == '商标异议答辩') {
        var link = 'gl://submityiyidabian?edit=0';
      };
      if (click_type == '商标异议申请') {
        var link = 'gl://submityiyi?edit=0';
      };
      if (click_type == '商标撤三答辩') {
        var link = 'gl://submitchesandabian?edit=0';
      };
      if (click_type == '商标撤三申请') {
        var link = 'gl://submitchesanshenqing?edit=0';
      };
      if (click_type == '补发商标证书') {
        var link = 'gl://submitbufazhucezheng?edit=0';
      };
      if (click_type == '商标许可备案') {
        var link = 'gl://submitxukebeian?edit=0';
      };
      if (click_type == '商标转让') {
        var link = 'gl://submitzhuanrang?edit=0';
      };
      if (click_type == '商标变更') {
        var link = 'gl://submitbiangeng?edit=0';
      };
      if (click_type == '商标续展') {
        var link = 'gl://submitxuzhan?edit=0';
      };
      if (click_type == '商标宽展') {
        var link = 'gl://submitkuanzhan?edit=0';
      };
      if (click_type == '商标驳回复审') {
        var link = 'gl://submitbohuifusheng?edit=0';
      };
    };
    var apply_id = list.apply_id;
    var one_cate = list.one_cate;
    var brand_num = list.brand_num;
    //提交资料 商标注册
    if (link == 'gl://submitzhuce?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/mergedata/mergedata?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 1,
      })
    };

    //提交资料 商标撤三答辩
    if (link == 'gl://submitchesandabian?edit=0') {
      Toast('请去PC端提交资料！');
    };
    //提交资料 商标撤三申请
    if (link == 'gl://submitchesanshenqing?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Up_ziliao/Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 2,
      })
    };
    //提交资料 商标异议答辩
    if (link == 'gl://submityiyidabian?edit=0') {
      Toast('请去PC端提交资料！')
    };
    //提交资料 商标异议申请
    if (link == 'gl://submityiyi?edit=0') {
      Toast('请去PC端提交资料！');
    };
    //提交资料 商标驳回复审
    if (link == 'gl://submitbohuifusheng?edit=0') {
      Toast('请去PC端提交资料！')
    };
    //提交资料 补发商标证书
    if (link == 'gl://submitbufazhucezheng?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Up_ziliao/Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 4,
      })
    };
    //提交资料 商标转让
    if (link == 'gl://submitzhuanrang?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Up_ziliao/Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 6,
      })
    };
    //提交资料 商标变更
    if (link == 'gl://submitbiangeng?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Up_ziliao/Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 7,
      })
    };
    //提交资料 商标续展
    if (link == 'gl://submitxuzhan?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Up_ziliao/Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 8,
      })
    }
    // 提交资料 商标宽展
    if (link == 'gl://submitkuanzhan?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Up_ziliao/Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 9,
      })
    }
    //提交资料 商标许可备案
    if (link == 'gl://submitxukebeian?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Up_ziliao/Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 5,
      })
    };
  },



  onLeft(e) {
    var index = e.currentTarget.dataset.index;
    this.data.index = index;
    var list = this.data.arry[index];
    var link = list.left_status[1];
    var id = list.id;
    var order_id = list.order_id;
    this.data.o_id = id;
    var good_name = list.good_name;
    if (list.good_name == '商标注册') {
      var click_type = list.good_name;
    } else {
      var click_type = list.click_type;
    }
    var apply_id = list.apply_id;
    var one_cate = list.one_cate;
    var brand_num = list.brand_num;
    //详情
    if (link == 'gl://orderdetail') {
      wx.navigateTo({
        url: '/pages/user/my_order/dt/dt?id=' + order_id + '&click_type=' + click_type,
      })
    };
    //取消订单
    if (link == 'gl://ordercancel') {
      this.onDelete(id);
    };
    //提交资料 商标注册
    if (link == 'gl://submitzhuce?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/mergedata/mergedata?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 1,
      })
      // Toast('您已提交过资料！')
    };
    //提交资料 商标撤三答辩
    if (link == 'gl://submitchesandabian?edit=0') {
      Toast('请去PC端提交资料');
    };
    //提交资料 商标撤三申请
    if (link == 'gl://submitchesanshenqing?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Up_ziliao/Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 2,
      })
    };
    //提交资料 商标异议答辩
    if (link == 'gl://submityiyidabian?edit=0') {
      Toast('请去PC端提交资料')
    };
    //提交资料 商标异议申请
    if (link == 'gl://submityiyi?edit=0') {
      Toast('请去PC端提交资料');
    };
    //提交资料 商标驳回复审
    if (link == 'gl://submitbohuifusheng?edit=0') {
      Toast('请去PC端提交资料')
    };
    //提交资料 补发商标证书
    if (link == 'gl://submitbufazhucezheng?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Up_ziliao/Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 4,
      })
    };
    //修改资料 商标驳回复审
    if (link == 'gl://submitbohuifusheng?edit=1') {
      Toast('请去PC端修改资料')
    };
    //修改资料 商标异议申请
    if (link == 'gl://submityiyi?edit=1') {
      Toast('请去PC端修改资料')
    };
    //修改资料 商标异议答辩
    if (link == 'gl://submitchesandabian?edit=1') {
      Toast('请去PC端修改资料')
    };
    //修改资料  商标撤三答辩
    if (link == 'gl://submityiyidabian?edit=1') {
      Toast('请去PC端修改资料')
    };
    //提交资料 商标许可备案
    if (link == 'gl://submitxukebeian?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Up_ziliao/Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 5,
      })
    };
    //提交资料 商标转让
    if (link == 'gl://submitzhuanrang?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Up_ziliao/Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 6,
      })
    };
    //提交资料 商标变更
    if (link == 'gl://submitbiangeng?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Up_ziliao/Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 7,
      })
    };
    //提交资料 商标续展
    if (link == 'gl://submitxuzhan?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Up_ziliao/Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 8,
      })
    }
    if (link == 'gl://submitkuanzhan?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Up_ziliao/Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 9,
      })
    }
    //商标注册 修改资料
    if (link == 'gl://submitzhuce?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/mergedata/mergedata?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 1,
      })
    }

    //商标撤三申请 修改资料
    if (link == 'gl://submitchesanshenqing?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 2,
      })
    }
    //商标许可备案 修改资料
    if (link == 'gl://submitxukebeian?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 5,
      })
    }
    //商标变更 修改资料
    if (link == 'gl://submitbiangeng?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 7,
      })
    }
    //商标续展 修改资料
    if (link == 'gl://submitxuzhan?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 8,
      })
    }
    if (link == 'gl://submitkuanzhan?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 9,
      })
    }
    //商标转让 修改资料
    if (link == 'gl://submitzhuanrang?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 6,
      })
    }
    //补发商标注册证  修改资料
    // gl://submitbufazhucezheng?edit=1
    if (link == 'gl://submitbufazhucezheng?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 4,
      })
    }

    //查看正文  商标异议申请
    if (link == 'gl://checkobjectionyiyi?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/recheck/recheck?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 0,
      })
    }
    // 查看正文 商标异议答辩
    if (link == 'gl://checkobjectionreplysbyy?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/recheck/recheck?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 1,
      })
    }
    // 查看正文 商标撤三答辩
    if (link == 'gl://checkchesanreply?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/recheck/recheck?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 2,
      })
    }
    //正文不同意 商标撤三答辩
    if (link == 'gl://checkchesanreply?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/recheck/recheck?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 2,
      })
    }
    //查看正文 商标驳回复审
    if (link == 'gl://checkreviewbohuifushen') {
      wx.navigateTo({
        url: '/package/component1/pages/material/recheck/recheck?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 3,
      })
    }

    //商标异议答辩 正文不同意
    if (link == 'gl://checkobjectionreplysbyy?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/recheck/recheck?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 2,
      })
    }
    // 商标异议申请 正文不同意
    if (link == 'gl://checkobjectionyiyi?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/recheck/recheck?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 0,
      })
    }

    //尾款支付
    if (link == 'gl://payendzhuce') {
      getApp().globalData.paymentArry = list;
      wx.navigateTo({
        url: '/package/component1/pages/material/balance_payment/balance_payment',
      })
    }

    // 确认收货
    if (link == 'gl://ordershouhuo') {
      Dialog.confirm({
        title: '提示',
        message: '确认收货？'
      }).then(() => {
        // on confirm
        this.toast();
        NetworkRequest({
          url: '/order/comfirmreceipt',
          data: {
            order_id: order_id,
          },
        }).then(res => {
          var code = res.data.code;
          Toast.clear();
          this.notify(res.data.msg);
          if (code == 1) {
            this.onEnpush();
          };
          if (code == 2) {
            this.notifySuccessful('登录失效，请重新登录');
            setTime(2000).then(res => {
              wx.navigateTo({
                url: '/pages/user/log_on/log_on',
              })
            })
          }
        }).catch(err => {
          Toast.clear();
        })
      }).catch(() => {
        // on cancel
      });
    }
  },


  onRight(e) {
    var index = e.currentTarget.dataset.index;
    this.data.index = index;
    var list = this.data.arry[index];
    var link = list.right_status[1];
    var id = list.id;
    var order_id = list.order_id;
    this.data.o_id = id;
    var good_name = list.good_name;
    if (list.good_name == '商标注册') {
      var click_type = list.good_name;

    } else {
      var click_type = list.click_type;
    }
    var apply_id = list.apply_id;
    var one_cate = list.one_cate;
    var brand_num = list.brand_num;
    //详情
    if (link == 'gl://orderdetail') {
      wx.navigateTo({
        url: '/pages/user/my_order/dt/dt?id=' + order_id + "&click_type=" + click_type,
      })
    };
    //取消订单
    if (link == 'gl://ordercancel') {
      this.onDelete(id);
    }

    //上传盖章资料 商标注册
    if (link == 'gl://sealzhuce?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 0 + '&click_type=' + click_type,
      })
    }
    gl: //sealxuzhan?edit=0

      //上传盖章资料 商标变更
      if (link == 'gl://sealbiangeng?edit=0') {
        wx.navigateTo({
          url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 1 + '&click_type=' + click_type,
        })
      }


    //上传盖章资料 商标转让
    if (link == 'gl://sealzhuanrang?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 2 + '&click_type=' + click_type,
      })
    }

    //上传盖章资料 商标许可备案
    if (link == 'gl://sealxukebeian?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 4 + '&click_type=' + click_type,
      })
    }

    //上传盖章资料 商标续展
    if (link == 'gl://sealxuzhan?edit=0'&& click_type=='商标续展') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 3 + '&click_type=' + click_type,
      })
    }
    if (link == 'gl://sealxuzhan?edit=0'&& click_type=='商标宽展') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 8 + '&click_type=' + click_type,
      })
    }
    //上传盖章资料 商标撤三申请   
    if (link == 'gl://sealchesanshenqing?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 6 + '&click_type=' + click_type,
      })
    }
    // 上传盖章资料  补发商标注册证申请书
    if (link == 'gl://sealbufazhucezheng?edit=0') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 5 + '&click_type=' + click_type,
      })
    }

    //修改盖章资料 商标注册
    if (link == 'gl://sealzhuce?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 0 + '&click_type=' + click_type,
      })
    }
    gl: //sealxuzhan?edit=0

      //修改盖章资料 商标变更
      if (link == 'gl://sealbiangeng?edit=1') {
        wx.navigateTo({
          url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 1 + '&click_type=' + click_type,
        })
      }


    //修改盖章资料 商标转让
    if (link == 'gl://sealzhuanrang?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 2 + '&click_type=' + click_type,
      })
    }

    //修改盖章资料 商标许可备案
    if (link == 'gl://sealxukebeian?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 4 + '&click_type=' + click_type,
      })
    }

    //修改盖章资料 商标续展
    if (link == 'gl://sealxuzhan?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 3 + '&click_type=' + click_type,
      })
    }
    //修改盖章资料 商标撤三申请
    if (link == 'gl://sealchesanshenqing?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 6 + '&click_type=' + click_type,
      })
    }
    // 修改盖章资料  补发商标注册证申请书
    if (link == 'gl://sealbufazhucezheng?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/Upload_file/Upload_file?order_id=' + order_id + '&type=' + 5 + '&click_type=' + click_type,
      })
    }

    //下载并邮寄  商标驳回复审
    if (link == 'gl://mailsealbohuifushen') {
      wx.navigateTo({
        url: '/package/component1/pages/material/send_by_post/send_by_post?id=' + 1,
      })
    }

    //邮寄盖章资料 商标异议申请
    if (link == 'gl://mailsealsbyiyi') {
      wx.navigateTo({
        url: '/package/component1/pages/material/send_by_post/send_by_post?id=' + 2,
      })
    }
    //邮寄盖章资料 商标异议答辩
    if (link == 'gl://mailsealyiyidabian') {
      wx.navigateTo({
        url: '/package/component1/pages/material/send_by_post/send_by_post?id=' + 3,
      })
    }

    //邮寄盖章资料 商标撤三申请
    if (link == 'gl://mailsealchesanshenqing') {
      wx.navigateTo({
        url: '/package/component1/pages/material/send_by_post/send_by_post?id=' + 4,
      })
    }


    //邮寄盖章资料 商标撤三答辩
    if (link == 'gl://mailsealchesan') {
      wx.navigateTo({
        url: '/package/component1/pages/material/send_by_post/send_by_post?id=' + 5,
      })
    }

    //付款
    if (link == 'gl://pay') {
      wx.setStorageSync('id', id);
      wx.setStorageSync('idtype', 1);
      wx.navigateTo({
        url: '/package/component1/pages/services/pay/pay?open=' + true,
      })
    }

    //修改资料 商标驳回复审
    if (link == 'gl://submitbohuifusheng?edit=1') {
      Toast('请去PC端修改资料')
    };
    //修改资料 商标异议申请
    if (link == 'gl://submityiyi?edit=1') {
      Toast('请去PC端修改资料')
    };
    //修改资料 商标异议答辩
    if (link == 'gl://submitchesandabian?edit=1') {
      Toast('请去PC端修改资料')
    };
    //修改资料  商标撤三答辩
    if (link == 'gl://submityiyidabian?edit=1') {
      Toast('请去PC端修改资料')
    };
    //尾款支付
    if (link == 'gl://payendzhuce') {
      getApp().globalData.paymentArry = list;
      wx.navigateTo({
        url: '/package/component1/pages/material/balance_payment/balance_payment',
      })
    }
    // 确认收货
    if (link == 'gl://ordershouhuo') {
      Dialog.confirm({
        title: '提示',
        message: '确认收货？',
        zIndex: 1000,
      }).then(() => {
        // on confirm
        this.toast();
        NetworkRequest({
          url: '/order/comfirmreceipt',
          data: {
            order_id: order_id,
          },
        }).then(res => {
          var code = res.data.code;
          Toast.clear();
          this.notify(res.data.msg);
          if (code == 1) {
            this.onEnpush();
          };
          if (code == 2) {
            this.notifySuccessful('登录失效，请重新登录');
            setTime(2000).then(res => {
              wx.navigateTo({
                url: '/pages/user/log_on/log_on',
              })
            })
          }
        }).catch(err => {
          Toast.clear();
        })
      }).catch(() => {
        // on cancel
      });
    }

    //商标注册 修改资料
    if (link == 'gl://submitzhuce?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/mergedata/mergedata?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 1,
      })
    }
    //商标撤三申请 修改资料
    if (link == 'gl://submitchesanshenqing?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 2,
      })
    }
    //商标许可备案 修改资料
    if (link == 'gl://submitxukebeian?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 5,
      })
    }
    //商标变更 修改资料
    if (link == 'gl://submitbiangeng?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 7,
      })
    }
    //商标续展 修改资料
    if (link == 'gl://submitxuzhan?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 8,
      })
    }
    if (link == 'gl://submitkuanzhan?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 9,
      })
    }
    //商标转让 修改资料
    if (link == 'gl://submitzhuanrang?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 6,
      })
    }
    //补发商标注册证  修改资料
    if (link == 'gl://submitbufazhucezheng?edit=1') {
      wx.navigateTo({
        url: '/package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao?apply_id=' + apply_id + '&click_type=' + click_type + '&order_id=' + order_id + '&one_cate=' + one_cate + '&type=' + 4,
      })
    }
  },


  onCecked(e) {
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
  onEnpush() {
    var o_id = this.data.o_id;
    var arry = this.data.arry;
    var index = this.data.index;
    NetworkRequest({
      url: '/order/orderLocate',
      data: {
        o_id: o_id,
      },
      method: "POST",
    }).then(res => {
      var code = res.data.code;
      var list = res.data.data;
      if (code == 1) {
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
          if (typeof (list.total_price) == 'string') {
            list.total_price = JSON.parse(list.total_price).toFixed(2);
          } else {
            list.total_price = list.total_price.toFixed(2);
          };
          this.setData({
            ["arry[" + index + "]"]: list,
          })
        }
      }
    }).catch(err => {})
  },
  notify(event) {
    wx.showToast({
      title: event,
      duration: 4000,
      mask: true,
      icon: 'none'
    })
    // Notify({
    //   text: res,
    //   duration: 3000,
    //   selector: '#custom-selector',
    //   backgroundColor: '#f44',
    //   color: '#fff',
    //   zIndex: 200,
    // })
  },
  onLoad: function (options) {
    if (options.open) {
      var index = options.index;
      var id = options.id;
      this.setData({
        type: id,
        id: index,
        arry: [],
      });
      this.getOrder(this.data.status, id);
      this.toast();
    } else {
      var id = options.id;
      this.getOrder(id, this.data.type);
      this.setData({
        active: id
      });
      this.toast();
    };
  },
  onShow() {
    wx.setStorageSync('brand_type', 1);
  },
  onReady: function () {},
  onUnload: function () {
    this.data.page = 1
  },
  onPullDownRefresh: function () {
    this.setData({
      display: false,
      arry: [],
      page: 1,
      contractCheck: false,
      contractnum: 0,
      paynum: 0,
      payCheck: false,
    });
    this.getOrder(this.data.active, this.data.type)
  },
  onReachBottom: function () {
    this.setData({
      display: false,
    });
    this.getOrder(this.data.active, this.data.type, 0);
  },
})