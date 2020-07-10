import Toast from '../../../dist/toast/toast';
import Notify from '../../../dist/notify/notify';
import NetworkRequest from '../../../template/network.js';
const record=[{text:'商标总数',id:0,},{text:'已注册商标',id:1,},{text:'申请中商标',id:8,},{text:'续展期中商标',id:7,},{text:'宽展中商标',id:9,},{text:'无效商标',id:5,},];
function title(obj) {
  var arry = obj.record;
  var index = obj.type;
  for (var i = 0; i < arry.length; i++) {
    if (arry[i].id == index) {
      return arry[i].text;
      break;
    };
  };
};
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
    name: '',
  },

  onClick() {
    wx.navigateTo({
      url: '/pages/user/attest/apply/apply',
    })
  },
  onDt(e) {
    // var id = e.currentTarget.dataset.id;
    // var type = e.currentTarget.dataset.type;
    // var index = e.currentTarget.dataset.index;
    // var list = this.data.list[index];
    // wx.setStorageSync("list", list);
    // var value = this.data.value;
    // wx.navigateTo({
    //   url: '/pages/index/search/dt/dt?id=' + id + "&type=" + type + "&value=" + this.data.title,
    // });
    var i = e.currentTarget.dataset.index;
    wx.showLoading({
      title: '加载中...',
    })
    NetworkRequest({
      url: '/getdata',
      data: {
        type: 4,
        keywords: this.data.list[i].RegId,
        cate_id: this.data.list[i].IntCls,
        size: 10,
        index: 1
      }
    }).then((res) => {
      if (res.data.code == 1) {
        res.data.data[0].genre = res.data.data[0].IntCls.length == 1 ? '0' + res.data.data[0].IntCls + '类' : res.data.data[0].IntCls + '类';
        wx.setStorageSync("list", res.data.data[0]);
        wx.navigateTo({
          url: "/pages/index/search/dt/dt?id=" + this.data.list[i].RegId + "&type=" + this.data.list[i].IntCls
        })
      }
    })
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
    if (_this.route == 'package/component1/pages/knowledge/company_details/company_details') {
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
        page: this.data.page,
        size: 10,
      },
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var lh = this.data.list.length;
        var arry = res.data.data;
        if (arry.length > 0) {
          this.data.page = this.data.page + 1
        };
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
    wx.setNavigationBarTitle({
      title: title({
        'record': record,
        'type': options.type
      }),
    })
    this.setData({
      name: title({
        'record': record,
        'type': options.type
      })
    })
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