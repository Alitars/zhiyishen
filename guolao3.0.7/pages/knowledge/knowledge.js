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
    }, {
      url: "/pages/knowledge/saas/saas?title=",
      images: '/images/pppp.png',
      text: '全部专利'
    }, {}, {}],
    arryMax: [],
  },
  getNumber(e) {
    this.toast();
    var company = this.data.btn[this.data.id];
    NetworkRequest({
      url: '/gettag',
      data: {
        company: company,
      },
    }).then(res => {
      this.setData({
        display: true
      });
      var code = res.data.code;
      if (code == 1) {
        this.data.arryMax = res.data.data.first.warnlist;
        this.setData({
          ["listBtn[0].text"]: '全部商标（' + res.data.data.first.alltotal + '）',
          ["listBtn[1].text"]: '续展提醒（' + res.data.data.first.warntotal + '）',
        })
      } else {
        this.data.arryMax = [];
        this.setData({
          ["listBtn[0].text"]: '全部商标',
          ["listBtn[1].text"]: '续展提醒',
        })
      }
      Toast.clear()
    }).catch(err => {
      this.setData({
        ["listBtn[0].text"]: '全部商标',
        ["listBtn[1].text"]: '续展提醒',
        arryMax: [],
      });
      Toast.clear()
    })
  },
  onChoose(e) {
    var id = e.currentTarget.dataset.id;
    this.setData({
      id: id,
      show: !this.data.show,
      ["listBtn[0].text"]: '全部商标',
      ["listBtn[1].text"]: '续展提醒',
    });
    this.getNumber()
  },
  onClose() {
    this.setData({
      show: !this.data.show
    })
  },
  onChange(e) {
    var url = e.currentTarget.dataset.id;
    if (url == '/pages/knowledge/saas/saas?title=') {
      Toast('敬请期待！');
      return
    }
    var id = this.data.id;
    var btn = this.data.btn;
    if (btn.length == 0) {
      var title = false
    } else {
      var title = btn[id]
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
    })
  },
  getData() {
    NetworkRequest({
      url: '/getcompany',
      data: {},
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        this.setData({
          btn: res.data.data
        });
        this.getNumber()
      }
      if (code == 2) {
        setTime(2000).then(res => {
          wx.navigateTo({
            url: '/pages/user/log_on/log_on',
          })
        })
      }
    }).catch(err => {})
  },
  getAttest() {
    NetworkRequest({
      url: '/usercenter',
      data: { },
    }).then(res => {
      var code = res.data.code;
      this.setData({
        attest: code
      });
      if (code == 1 || code == 0) {
        if (res.data.data.auth == 2 || res.data.data.auth == 3) {
          this.getData()
        }
      }
      if (code == 2) {}
      this.setData({
        attest: res.data.data.auth,
      })
    }).catch(err => {})
  },
  onClick() {
    wx.navigateTo({
      url: '/pages/user/attest/apply/apply',
    });
    this.onClose()
  },
  onLoad: function () {},
  onShow: function () {
    this.getAttest();
    wx.showTabBar({})
  },
  onShareAppMessage: function () {}
})