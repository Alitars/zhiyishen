import Toast from '../../../../dist/toast/toast';
import Notify from '../../../../dist/notify/notify';
import NetworkRequest from '../../../../template/GardenNetwork.js';
import onToken from '../../../../template/onToken.js';
import remove from '../../../../template/remove.js';
import route from '../../../../template/route.js';
import logoCheck from '../../../../template/logon.js';
import Dialog from '../../../../dist/dialog/dialog';
import setTime from '../../../../template/setTime.js';
Page({

  data: {
    list: [],
    nowList: {},
    page: 1,
    display: false
  },
  onClick(e) {
    var index = e.currentTarget.dataset.index;
    this.data.nowList = this.data.list[index];
    console.log(this.data.nowList);
    wx.navigateTo({
      url: '/pages/user/commission_agent/park_order_list/park_order_list',
    })
  },
  onPhone(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.id,
    })
  },
  onEdit(e) {
    var index = e.currentTarget.dataset.index;
    this.data.nowList = this.data.list[index];
    route('pages/user/commission_agent/set_price/set_price');
  },
  getData() {
    this.setData({
      display: false
    })
    NetworkRequest({
      url: '/order/statisticOrder',
      data: {
        pid: getApp().globalData.userid,
        page: this.data.page
      },
      method: 'POST',
    }).then(res => {
      if (res.data.code == 1) {
        var len = this.data.list.length;
        var arry = res.data.data.user;
        if (arry.length > 0) {
          for (var i = 0; i < arry.length; i++) {
            this.setData({
              ["list[" + len + i + "]"]: arry[i]
            })
          }
          this.data.page++;
        }
      }
      setTime(1000).then(ss => {
        this.setData({
          display: true
        })
      })
    }).catch(err => {})
  },
  notify(e) {
    Notify({
      text: e,
      duration: 3000,
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
  onLoad: function(options) {
    this.getData();
  },
  onPullDownRefresh: function() {
    this.data.page = 1;
    this.setData({
      list: []
    })
    setTime(30).then(ss => {
      this.getData();
    })
  },
})