import Toast from '../../../../dist/toast/toast';
import Notify from '../../../../dist/notify/notify';
import NetworkRequest from '../../../../template/network.js';
import areaList from '../../../../template/template.js';
import setTime from '../../../../template/setTime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked1: true,
    checked2: false,
    icon: {
      normal: '',
      active: '',
      SafeButtom: '',
      disabled: true,
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
    this.toast('提交中...');
    var arry = e.detail.value;
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var companny = this.data.companny;
    // var address = arry.address;
    var addressxx = arry.addressxx;
    var bank = arry.bank;
    var banknumber = arry.banknumber;
    var phone = arry.phone;
    // var recive_address = this.data.recive_address;
    // var recive_address_city = this.data.recive_address_city;
    // var recive_address_area = this.data.recive_address_area;
    var recive_address = '';
    var recive_address_city = '';
    var recive_address_area = '';
    var shuihao = arry.shuihao;
    var checked1 = this.data.checked1;
    var checked2 = this.data.checked2;
    var banknumber = arry.banknumber;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
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
          status: 2,
          content: '',
          created_at: '',
          updated_at: '',
          id: '',
        },
        method: 'POST',
      }).then(res => {
        var code = res.data.code;
        if (code == 1) {
          this.notify(res.data.msg);
          PrePage.getData();
          setTime().then(res => {
            wx.navigateBack({
              delta: 1,
            })
          });
        } else {};
        if (code == 2) {
          this.notify(res.data.msg);
          setTime().then(res => {
            wx.navigateTo({
              url: '/pages/user/log_on/log_on',
            })
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
          status: 2,
          content: '',
          created_at: '',
          updated_at: '',
          id: '',
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
          PrePage.getData();
          setTime().then(res => {
            wx.navigateTo({
              url: '/pages/user/log_on/log_on',
            })
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
      recive_address: list[0].name,
      recive_address_city: list[1].name,
      recive_address_area: list[2].name,
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
})