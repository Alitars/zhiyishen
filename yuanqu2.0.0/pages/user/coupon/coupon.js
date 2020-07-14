const main_Url = getApp().globalData.main_Url;
const time = require("../../../utils/util.js");
import Notify from '../../../dist/notify/notify';
import Toast from '../../../dist/toast/toast';
import NetworkRequest from '../../../template/network.js';
Page({
  data: {
    active: 0,
    noUsed: [],
    haveUsed: [],
    overDue: [],
    id: 1,
    icon_Url: getApp().globalData.icon_Url,
  },
  onChange(event) {
    var id = event.detail.index + 1;
    this.setData({
      id: id,
    });
    this.getData(id)
  },
  notify(res) {
    Notify({
      text: res,
      duration: 1000,
      selector: '#custom-selector',
      backgroundColor: '#f44'
    })
  },
  getData() {
    this.toast();
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var id = this.data.id;
    NetworkRequest({
      url: '/usercenter/packet',
      data: {
        user_id: userid,
        type: id,
        token: token,
      },
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        for (var i = 0; i < arry.length; i++) {
          arry[i]['start'] = time.formatTime(arry[i].start, 'Y/M/D');
          arry[i]['end'] = time.formatTime(arry[i].end, 'Y/M/D')
        }
        if (id == 1) {
          this.setData({
            noUsed: arry,
          })
        };
        if (id == 2) {
          this.setData({
            haveUsed: arry,
          })
        };
        if (id == 3) {
          this.setData({
            overDue: arry,
          })
        }
      };
      if (code == 0 || code == 2) {
        this.notify(res.data.msg)
      };
      Toast.clear();
    }).catch(err => {
      Toast.clear();
      this.notify('网络请求失败')
    });
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },
  onLoad: function(options) {
    this.getData();
  },
})