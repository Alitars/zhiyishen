import Toast from '../../../../dist/toast/toast';
import Notify from '../../../../dist/notify/notify';
import NetworkRequest from '../../../../template/network.js';
import areaList from '../../../../template/template.js';
import setTime from '../../../../template/setTime.js';
import route from '../../../../template/route.js';
Page({
  data: {
    checked1: true,
    checked2: false,
    icon: {
      normal: '',
      active: '',
      SafeButtom: '',
    },
    areaList: areaList.areaList,
    show: '',
    SafeHigh: getApp().globalData.sysinfo.windowHeight,
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    address: '',
    addressxx: '',
    recive_address_city: '',
    recive_address_area: '',
    recive_address: '',
    id: '',
    list: [],
    companny:'',
  },
  onSearch() {
    wx.navigateTo({
      url: '/pages/user/attest/apply/search/search',
    })
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
  toast(e) {
    Toast.loading({
      message: e,
      duration: 0,
    });
  },
  formSubmit(e) {
    // console.log(e);
    this.toast('提交中...');
    var list = e.detail.value;
    var arry = this.data.list;
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var id = arry.id;
    var status = arry.status;
    // if (list.companny) {
    //   var companny = list.companny;
    // } else {
    //   var companny = arry.company_name;
    // };
    if (this.data.companny) {
      var companny = this.data.companny;
    } else {
      var companny = arry.company_name;
    };
    if (list.address) {
      var address = list.address;
    } else {
      var address = arry.recive_address + arry.recive_address_city + arry.recive_address_area;
    };
    if (list.addressxx) {
      var addressxx = list.addressxx;
    } else {
      var addressxx = arry.detail_address;
    }
    if (list.bank) {
      var bank = list.bank;
    } else {
      var bank = arry.bank;
    };
    if (list.banknumber) {
      var banknumber = list.banknumber;
    } else {
      var banknumber = arry.bank_count;
    };
    if (list.phone) {
      var phone = list.phone;
    } else {
      var phone = arry.mobile;
    };
    // if (list.recive_address) {
    //   var recive_address = list.recive_address;
    // } else {
    //   var recive_address = arry.recive_address;
    // };
    // if (list.recive_address_city) {
    //   var recive_address_city = list.recive_address_city;
    // } else {
    //   var recive_address_city = arry.recive_address_city;
    // };
    // if (list.recive_address_area) {
    //   var recive_address_area = list.recive_address_area;
    // } else {
    //   var recive_address_area = arry.recive_address_area;
    // };
    var recive_address = '';
    var recive_address_city = '';
    var recive_address_area = '';
    if (list.shuihao) {
      var shuihao = list.shuihao;
    } else {
      var shuihao = arry.credit_code;
    };
    var checked1 = this.data.checked1;
    var checked2 = this.data.checked2;
    if (!companny) {
      Toast('请输入公司名称！');
      return;
    };
    if (!shuihao) {
      Toast('请输入税号！');
      return;
    };
    // if (!address) {
    //   Toast('请选择地址！');
    //   return;
    // };
    if (!addressxx) {
      Toast('请输入详细地址！');
      return;
    };
    if (!phone) {
      Toast('请输入电话！');
      return;
    };
    if (checked2 == true) {
      if (!bank) {
        Toast('请输入开户银行！');
        return;
      };
      if (!banknumber) {
        Toast('请输入银行账户！');
        return;
      };
    };
    if (checked1 == true) {
      NetworkRequest({
        url: '/usercenter/editinvoices',
        data: {
          user_id: userid,
          token: token,
          recive_address: recive_address,
          recive_address_city: recive_address_city,
          recive_address_area: recive_address_area,
          company_name: companny,
          credit_code: shuihao,
          address: '',
          mobile: phone,
          bank: bank,
          bank_count: banknumber,
          recive_name: '',
          recive_mobile: '',
          detail_address: addressxx,
          invoice_type: 1,
          status: status,
          content: '',
          created_at: '',
          updated_at: '',
          id: id,
        },
        method: 'POST',
      }).then(res => {
        var code = res.data.code;
        if (code == 1) {
          this.notify(res.data.msg);
          setTime().then(res => {
            wx.navigateBack({
              delta: 1,
            })
          })
        } else {};
        if (code == 2) {
          this.notify(res.data.msg);
          setTime().then(res => {
            route('pages/user/log_on/log_on');
          });
        };
        Toast.clear();
      }).catch(err => {
        Toast.clear();
      })
    } else {
      NetworkRequest({
        url: '/usercenter/editinvoices',
        data: {
          user_id: userid,
          token: token,
          recive_address: recive_address,
          recive_address_city: recive_address_city,
          recive_address_area: recive_address_area,
          company_name: companny,
          credit_code: shuihao,
          address: '',
          mobile: phone,
          bank: bank,
          bank_count: banknumber,
          recive_name: '',
          recive_mobile: '',
          detail_address: addressxx,
          invoice_type: 2,
          status: status,
          content: '',
          created_at: '',
          updated_at: '',
          id: id,
        },
        method: 'POST',
      }).then(res => {
        var code = res.data.code;
        if (code == 1) {
          this.notify(res.data.msg);
          setTime().then(res => {
            wx.navigateBack({
              delta: 1,
            })
          })
        } else {
          wx.stopPullDownRefresh();
        };
        if (code == 2) {
          this.notify(res.data.msg);
          setTime().then(res => {
            route('pages/user/log_on/log_on');
          });
        };
        Toast.clear();
      }).catch(err => {
        Toast.clear();

      })
    }
  },
  onChange(event) {
    var id = event.currentTarget.dataset.id;
    if (id == 1) {
      this.setData({
        checked1: true,
        checked2: false
      })
    } else {
      this.setData({
        checked1: false,
        checked2: true
      });
    }
  },
  onClose() {
    this.setData({
      show: !this.data.show
    })
  },
  onConfirm(e) {
    var list = e.detail.values;
    var a = '';
    for (var i = 0; i < list.length; i++) {
      a += list[i].name;
    }
    this.setData({
      address: a,
    })
    this.onClose();
  },
  onCancel() {
    this.onClose();
  },
  onSubmit() {
    wx.navigateTo({
      url: '/pages/user/bill/s_bill/success/success',
    })
  },
  getData(e) {
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/usercenter/detailinvoices',
      data: {
        id: e,
        token: token,
        user_id: userid,
      },
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        this.setData({
          list: res.data.data,
          recive_address: res.data.data.recive_address,
          recive_address_city: res.data.data.recive_address_city,
          recive_address_area: res.data.data.recive_address_area,
        })
        if (res.data.data.invoice_type == 1) {
          this.setData({
            checked1: true,
            checked2: false,
          });
        } else {
          this.setData({
            checked1: false,
            checked2: true,
          });
        };
      } else {
        this.notify(res.data.msg);
      };
      if (code == 2) {
        setTime().then(res => {
          route('pages/user/log_on/log_on');
        });
      };
      Toast.clear();
      wx.stopPullDownRefresh();
    }).catch(err => {
      Toast.clear();
      wx.stopPullDownRefresh();
    })
  },
  onLoad: function(options) {
    this.getData(options.id);
    this.data.id = options.id;
  },
  onPullDownRefresh: function() {
    this.getData(this.data.id);
  },
})