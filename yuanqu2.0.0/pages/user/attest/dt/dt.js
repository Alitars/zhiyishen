import NetworkRequest from '../../../../template/network.js';
import Toast from '../../../../dist/toast/toast';
const icon_Url = getApp().globalData.icon_Url;
const main_Url = getApp().globalData.main_Url;
Page({


  data: {
    ptype: 1,
    arry: [],
    columns1: ['国内个人', '港澳个人', '台湾个人', '国外个人', ],
    columns2: ['个体工商户', '国内企业', '港澳企业', '台湾企业', '国外企业', ],
    show: '',
    type: '',
    id: '',
    icon_Url: getApp().globalData.icon_Url,
  },


  toast(e) {
    Toast.loading({
      message: e,
      duration: 0,
    });
  },

  getDt(id, ptype) {
    var token = wx.getStorageSync('token');
    var userid = wx.getStorageSync('userid');
    this.toast('加载中...');
    if (ptype == 1) {
      NetworkRequest({
        url: '/authentication/editauth',
        data: {
          token: token,
          user_id: userid,
          id: id,
        },
      }).then(res => {
        var arry = res.data.data;
        // if (arry) {
        //   if (arry.contact_address_pro == '' || arry.contact_address_pro == null || arry.contact_address_pro == undefined) {
        //     arry.contact_address_pro = arry.contact_address_city
        //   };
        //   if (arry.contact_address_city == '' || arry.contact_address_city == null || arry.contact_address_city == undefined) {
        //     arry.contact_address_city = arry.contact_address_pro
        //   };
        // };
        this.setData({
          arry: arry,
          type: arry.type,
        })
        Toast.clear();
        wx.stopPullDownRefresh();
      }).catch(err => {
        Toast.clear();
        wx.stopPullDownRefresh();
      })
    };
    if (ptype == 2) {
      NetworkRequest({
        url: '/authentication/editbusiness',
        data: {
          token: token,
          user_id: userid,
          id: id,
        },
      }).then(res => {
        var arry = res.data.data;
        // if (arry) {
        //   if (arry.contact_address_pro == '' || arry.contact_address_pro == null || arry.contact_address_pro == undefined) {
        //     arry.contact_address_pro = arry.contact_address_city
        //   };
        //   if (arry.contact_address_city == '' || arry.contact_address_city == null || arry.contact_address_city == undefined) {
        //     arry.contact_address_city = arry.contact_address_pro
        //   };
        // };
        this.setData({
          arry: arry,
          type: arry.type,
        })
        Toast.clear();
        wx.stopPullDownRefresh();
      }).catch(err => {
        Toast.clear();
        wx.stopPullDownRefresh();
      })
    }
  },

  onLoad: function(options) {
    this.getDt(options.id, options.ptype);
    this.setData({
      ptype: options.ptype,
      id: options.id,
    })
  },


  onPullDownRefresh: function() {
    this.getDt(this.data.id, this.data.ptype);
  },

})