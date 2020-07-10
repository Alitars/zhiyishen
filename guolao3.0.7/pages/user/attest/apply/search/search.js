import NetworkRequest from '../../../../../template/network.js';
import Notify from '../../../../../dist/notify/notify';
import Toast from '../../../../../dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    arry: [],
    type: 1,
  },
  onChange(e) {
    var value = e.detail.replace(/\s/g, '');
    this.setData({
      value: value,
    })
    if (value.length > 0) {
      NetworkRequest({
        url: '/findcom',
        data: {
          company_name: value,
        },
      }).then(res => {
        this.setData({
          value: value,
          arry: res.data.data
        })
      })
    }
  },
  onSearch(e) {
    var id = e.currentTarget.dataset.id;
    var type = this.data.type;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    if (id == 1 && type == 1) {
      var name = this.data.value;
      if (name) {
        PrePage.setData({
          companny: name
        })
        wx.navigateBack({
          delta: 1,
        })
      } else {
        this.notify("请输入！")
      }
    } else {
      var name = this.data.value;
      if (name) {
        PrePage.setData({
          companny: name
        })
        wx.navigateBack({
          delta: 1,
        })
      } else {
        this.notify("请输入！")
      }
    }
  },
  notify(res) {
    Notify({
      text: res,
      duration: 2000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
  },
  toast() {
    Toast.loading({
      message: '请稍后...',
      duration: 0,
    })
  },
  onClick(e) {
    var type = this.data.type;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var name = e.currentTarget.dataset.id;
    if (type == 1) {
      this.toast();
      NetworkRequest({
        url: '/authentication/businessRegist',
        data: {
          company_name: name,
        },
      }).then(res => {
        var code = res.data.code;
        Toast.clear();
        if (code == 1) {
          PrePage.setData({
            companny: name
          });
          wx.navigateBack({
            delta: 1,
          });
        } else {
          this.notify(res.data.msg);
        };
      });
    };
    if (type == 2) {
      this.onBill(name);
    };
  },

  onBill(e) {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    NetworkRequest({
      url: '/authentication/businessTian',
      data: {
        company_name: e
      },
    }).then(res => {
      var arry = res.data.data.result;
      if (arry) {
        PrePage.setData({
          companny: arry.name == null || arry.name == undefined ? '' : arry.name,
          shuihao: arry.taxNumber == null || arry.taxNumber == undefined ? '' : arry.taxNumber,
          addressxx: arry.regLocation == null || arry.regLocation == undefined ? '' : arry.regLocation,
        });
        wx.navigateBack({
          delta: 1,
        })
      } else {
        PrePage.setData({
          companny: e
        });
        wx.navigateBack({
          delta: 1,
        })
      }
    }).catch(err => {})
  },

  onLoad: function() {
    // 企业认证 // 填充发票
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var route = PrePage.route;
    if (route == 'pages/user/attest/apply/apply') {
      this.data.type = 1;
    } else {
      this.data.type = 2;
    };
    // console.log(this.data.type);
  },
})