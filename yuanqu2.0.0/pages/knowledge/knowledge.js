import Toast from '../../dist/toast/toast';
import Notify from '../../dist/notify/notify';
import NetworkRequest from '../../template/network.js';
import setTime from '../../template/setTime.js';
Page({
  data: {
    show: false,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    attest: 0,
    id: 0,
    btn: [],
    listBtn: [{
        url: "/pages/knowledge/trademark/trademark?title=",
        images: '/images/rrr.png',
        text: '全部商标'
      }, {
        url: "/pages/knowledge/extension/extension?title=",
        images: '/images/xuzhan.png',
        text: '续展提醒'
      }, {
        url: "/pages/knowledge/saas/saas?title=",
        images: '/images/bbbb.png',
        text: '状态变更提醒'
      },
      {
        url: "/pages/knowledge/saas/saas?title=",
        images: '/images/pppp.png',
        text: '全部专利'
      },
      {},
      {}
    ],
    arryMax: [],
    tabbar: {},
  },
  getNumber(e) {
    this.toast();
    var company = this.data.btn[this.data.id].text;
    NetworkRequest({
      url: '/gettag',
      data: {
        company: company,
      },
    }).then(res => {
      this.setData({
        display: true
      })
      var code = res.data.code;
      if (code == 1) {
        this.data.arryMax = res.data.data.first.warnlist;
        this.setData({
          ["listBtn[0].text"]: '全部商标' + '（' + res.data.data.first.alltotal + '）',
          ["listBtn[1].text"]: '续展提醒' + '（' + res.data.data.first.warntotal + '）',
        })
      } else {
        this.data.arryMax = [];
        this.setData({
          ["listBtn[0].text"]: '全部商标',
          ["listBtn[1].text"]: '续展提醒',
        })
      }
      Toast.clear();
    }).catch(err => {
      this.setData({
        ["listBtn[0].text"]: '全部商标',
        ["listBtn[1].text"]: '续展提醒',
        arryMax: [],
      })
      Toast.clear();
    })
  },
  onChoose(e) {
    // this.setData({
    //   ["btn[" + this.data.id + "].isShow"]: false,
    // });
    var s = this.data.id;
    Toast.loading({
      message: '加载中...',
      duration: 0,
      mask: true,
    });
    var id = e.currentTarget.dataset.id;
    var isShow = this.data.btn[id].isShow;
    // this.data.id = id;
    this.setData({
      ["btn[" + id + "].isShow"]: !isShow,
      id: id,
      ["btn[" + s + "].isShow"]: false,
      show: !this.data.show,
      ["listBtn[0].text"]: '全部商标',
      ["listBtn[1].text"]: '续展提醒',
    })
    this.getNumber();
    // Toast.clear();
  },
  onClose() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
      mask: true,
    });
    this.setData({
      show: !this.data.show
    })
    Toast.clear();
  },
  onChange(e) {
    var url = e.currentTarget.dataset.id;
    if (url == '/pages/knowledge/saas/saas?title=') {
      Toast('敬请期待');
      return;
    }
    var id = this.data.id;
    var btn = this.data.btn;
    if (btn.length == 0) {
      var title = false;
    } else {
      var title = btn[id].text;
    }
    wx.navigateTo({
      url: url + title
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
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
      mask: true,
    });
  },
  getData() {
    var userid = wx.getStorageSync('userid');
    Toast.loading({
      message: '加载中...',
      duration: 0,
      mask: true,
    });
    NetworkRequest({
      url: '/getcompany',
      data: {
        user_id: userid,
      },
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        for (var i = 0; i < arry.length; i++) {
          arry[i] = {
            isShow: false,
            text: arry[i],
          }
        };
        this.setData({
          btn: res.data.data
        })
        this.getNumber();
      }
    }).catch(err => {
      // this.notify('请求失败');
    })
  },
  onBack(){
    wx.navigateBack({
      delta: 1,
    })
  },
  getAttest() {
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    NetworkRequest({
      url: '/usercenter',
      data: {
        user_id: userid,
        token: token,
      },
    }).then(res => {
      var code = res.data.code;
      this.setData({
        attest: code
      })
      if (code == 1 || code == 0) {
        if (res.data.data.auth == 2 || res.data.data.auth == 3) {
          this.getData();
        }
      }
      if (code == 2) {
        // this.notify('登录失效，请登录');
      }
      this.setData({
        attest: res.data.data.auth,
      });
    }).catch(err => {})
  },
  onClick() {
    wx.navigateTo({
      url: '/pages/user/attest/apply/apply',
    })
    this.onClose()
  },
  onLoad: function() {

  },
  onShow: function() {
    this.getAttest();
  },
  onShareAppMessage: function() {}
})