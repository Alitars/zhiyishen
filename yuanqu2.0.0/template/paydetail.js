//商品价格请求 this.data.list //  getApp().globalData.list 
import NetworkRequest from './GardenNetwork.js';
export default function paydetail() {
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  var token = wx.getStorageSync('token');
  if (token.length>0) {
    NetworkRequest({
      url: '/goods/paydetail',
      data: {
        // token: token,
        text: wx.getStorageSync('YQNAME'),
      },
      method: 'GET',
    }).then(res => {
      // console.log(res,'价格');
      var code = res.data.code;
      var list = res.data.data;
      var arry = [];
      if (code == 1) {
        for (var i = 0; i < list.length; i++) {
          arry[i] = {
            price: JSON.parse(list[0].little_price),
            service_price: JSON.parse(list[0].price),
            total: JSON.parse(list[0].price),
            title: list[i].title,
            cost: "0.00",
            bigprice: "0.00",
            instance: "0.00",
          }
        };
        _this.data.list = arry;
        getApp().globalData.list = arry;
      } else {
        if (userid.length == 0 || token.length == 0 || userid == '' || token == '' || userid == null || token == null || userid.length == 0 || userid == undefined || token == undefined || ISAGENT == null || ISAGENT == undefined || ISAGENT.length == 0 || ISAGENT == '' || YQNAME == null || YQNAME == undefined || YQNAME.length == 0 || YQNAME == '') {
          return;
        }
        wx.showToast({
          title: '请求失败,请重试!',
          icon: 'none',
          duration: 5000,
        });
      };
    })
  };
}