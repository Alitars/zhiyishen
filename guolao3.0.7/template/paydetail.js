// shop price //  this.data.list //  getApp().globalData.list 
import NetworkRequest from './network.js';
export default function paydetail() {
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  NetworkRequest({
    url: '/goods/paydetail',
    data: {},
    method: 'GET',
  }).then(res => {
    var code = res.data.code;
    var list = res.data.data;
    var arry = [];
    if (code == 1) {
      for (var i = 0; i < list.length; i++) {
        arry[i] = {
          price: list[i].price,
          service_price: list[i].service_price,
          total: (JSON.parse(list[i].price) + JSON.parse(list[i].service_price)).toFixed(2),
          title: list[i].title,
          is_agency: list[i].is_agency == 1 ? true : false,
          smallClass: JSON.parse(list[i].agency_little_price),
          cost: "0.00",
          bigprice: "0.00",
          instance: "0.00",
        }
      };
      _this.data.list = arry;
      getApp().globalData.list = arry;
    } else {
      wx.showToast({
        title: '请求失败',
        icon: 'none',
        duration: 1500,
      });
    };
  }).catch(err => {})
}