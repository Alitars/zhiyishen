import Toast from '../../../../dist/toast/toast';
import Notify from '../../../../dist/notify/notify';
import NetworkRequest from '../../../../template/GardenNetwork.js';
import onToken from '../../../../template/onToken.js';
import remove from '../../../../template/remove.js';
import route from '../../../../template/route.js';
import logoCheck from '../../../../template/logon.js';
import Dialog from '../../../../dist/dialog/dialog';
Page({

  data: {
    list: [],
    nowList: {},
  },

  onEdit(e) {
    var index = e.currentTarget.dataset.index;
    this.data.nowList = this.data.list[index];
    route('pages/user/commission_agent/set_price/set_price');
  },
  getData() {
    this.toast();
    NetworkRequest({
      url: '/yqgoodslist',
      data: {
        text: wx.getStorageSync('YQNAME')
      },
      method: 'POST',
    }).then(res => {
      if (res.data.code == 1) {
        var arry = res.data.data;
        for (var i = 0; i < arry.length; i++) {
          if (arry[i].first_garden_little == null || arry[i].first_garden_little == undefined) {
            arry[i].first_garden_little = ""
          }
        }
        this.setData({
          list: arry
        })
      }
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
    this.getData();
  },
})