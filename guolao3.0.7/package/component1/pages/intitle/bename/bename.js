import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
const menuInfo = getApp().globalData.menuInfo;
const info = getApp().globalData.sysinfo;
import vioceText from '../../../../../template/vioceText.js';
Page({
  data: {
    info: info,
    text: '',
    menuInfo: menuInfo,
    SafeButtom: info.statusBarHeight * 4,
    id: 0,
    icon_Url: getApp().globalData.icon_Url,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    arry: [{
        text: '2个字',
        isSelect: false,
        num: 2

      },
      {
        text: '3个字',
        isSelect: false,
        num: 3

      },
      {
        text: '4个字',
        isSelect: false,
        num: 4

      },
      {
        text: '5个字以上',
        isSelect: false,
        num: 5
      },
    ]
  },
  notify(res) {
    Notify({
      text: res,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },

  onChoose(e) {
    var id = e.currentTarget.dataset.id;
    var check = e.currentTarget.dataset.check;
    var arry = this.data.arry;
    if (check) {
      this.setData({
        ["arry[" + id + "].isSelect"]: false
      })
    } else {
      this.setData({
        ["arry[" + id + "].isSelect"]: true
      })
      wx.vibrateShort();
    }
  },
  onClick() {
    var arry = this.data.arry;
    var num = [];
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].isSelect == true) {
        num.push(arry[i].num);
      }
    }
    var num = num.join(',');
    if (num) {
      wx.navigateTo({
        url: '/package/component1/pages/intitle/terms/terms?num=' + num,
      })
    } else {
      this.notify('请先选择！')
    }
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onBack() {
    wx.navigateBack();
  },
  onLoad: function(options) {
    vioceText({
      data: {
        content: '请问您理想中的商标是几个字？',
      },
    }).then(res => {})
  },
  onUnload: function() {

  },
})