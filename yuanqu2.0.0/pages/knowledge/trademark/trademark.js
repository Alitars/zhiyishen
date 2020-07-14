import Toast from '../../../dist/toast/toast';
import Notify from '../../../dist/notify/notify';
import NetworkRequest from '../../../template/network.js';
Page({
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    auth_type: '',
    title: '',
    apply_id: '',
    list: [],
    display: false,
    page: 1,
    attest: 2,
    arry: [],
    count: 0,
  },

  onClick() {
    wx.navigateTo({
      url: '/pages/user/attest/apply/apply',
    })
  },
  onDt(e) {
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    var list = this.data.list[index];
    wx.setStorageSync("list", list);
    var value = this.data.value;
    wx.navigateTo({
      url: '/pages/index/search/dt/dt?id=' + id + "&type=" + type + "&value=" + this.data.title,
    });
  },
  onClick() {
    wx.navigateTo({
      url: "/pages/user/attest/attest?open=" + true + '&type=' + 'zhichan',
    })
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },

  onSeach() {
    var pages = getCurrentPages();
    var _this = pages[pages.length - 2];
    if (_this.route == 'package/component/pages/knowledge/company_details/company_details') {
      var company = _this.data.options.title;
    } else {
      var company = '';
    }
    this.setData({
      display: false
    })
    if (this.data.list.length >= 500) {
      this.setData({
        list: []
      })
      Toast('已更新')
    }
    NetworkRequest({
      // url: '/getdata',
      url: '/assets/getTypeList',
      data: {
        type: this.data.type,
        company: company,
        // date: '',
        // cate_id: '',
        // status: '',
        // keywords: this.data.title,
        page: this.data.page,
        size: 10,
        // user_id	是	int	用户 id
        // type	是	string	类型： 1=>'商标已注册',2=>'等待实质审查',3=>'初审公告',4=>'异议中',5=>'商标无效',6=>'驳回复审中'
        // company	否	string	公司名称
        // park_name	否	string	园区名
        // name	否	string	商标名称
        // no	否	string	注册号
      },
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        // this.
        var lh = this.data.list.length;
        var arry = res.data.data;
        this.setData({

        })
        if (arry.length > 0) {
          this.data.page = this.data.page + 1
        }
        for (var c = 0; c < arry.length; c++) {
          var index = lh + c;
          this.setData({
            ["list[" + index + "]"]: arry[c],
            count: this.data.page == 2 ? res.data.others : this.data.count,
          })
        };
      }
      wx.stopPullDownRefresh();
      this.setData({
        display: true
      })
    }).catch(err => {
      this.setData({
        display: true
      })
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
  getAttest() {
    NetworkRequest({
      url: '/usercenter',
      data: {},
    }).then(res => {
      var code = res.data.code;
      this.setData({
        attest: code
      })
      if (code == 2) {
        // this.notify('登录失效，请登录');
      }
      if (this.data.attest == res.data.data.auth) {} else {
        this.setData({
          attest: res.data.data.auth,
        });
      }
    }).catch(err => {})
  },
  onLoad: function (options) {
    if (options.title == false) {} else {
      this.setData({
        title: options.title,
        type: options.type,
      })
      this.onSeach(options.type);
    }
    this.getAttest();
  },
  onPullDownRefresh: function () {
    this.data.page = 1;
    if (this.data.title) {
      this.onSeach();
    }
    this.getAttest();
  },
  onReachBottom: function () {
    if (this.data.title) {
      this.onSeach();
    }
  },
})