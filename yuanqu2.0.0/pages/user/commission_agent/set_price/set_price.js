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

  /**
   * 页面的初始数据
   */
  data: {
    arry: {},
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4 + 10,
    bigprice: '',
    minprice: '',
  },
  onchange(e) {
    var id = e.currentTarget.id;
    var value = e.detail;
    this.setData({
      [id]: value
    })
  },
  onEdit() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var arry = JSON.parse(JSON.stringify(this.data.arry));
    var s = (arry.first_garden_little == "" ? false : true);
    var yqprice = this.data.bigprice;
    var littleprice = this.data.minprice;
    var id = arry.id;
    console.log(JSON.parse(arry.price));
    var price = (JSON.parse(arry.price) ? JSON.parse(arry.price) : arry.price);
    if (yqprice.length == 0 || yqprice == '') {
      this.notify('请先设置商品价格');
      return;
    };
    if (yqprice < price) {
      this.notify('商品价格不能小于' + price + ' ');
      return;
    };
    if (s) {
      if (littleprice.length == 0 || littleprice == '') {
        this.notify('请设置小类价格');
        return;
      };
      if (littleprice < 50) {
        this.notify('小类价格不能小于' + '50')
        return;
      };
    } else {
      var littleprice = "";
    };
    this.toast();
    NetworkRequest({
      url: '/yqupdateprice',
      data: {
        id: id,
        yqprice: yqprice,
        littleprice: littleprice,
        token: getApp().globalData.token
      },
    }).then(res => {
      if (res.data.code == 1) {
        this.notify('修改成功');
        prevPage.onLoad();
        setTime().then(ss => {
          wx.navigateBack({
            delta: 1,
          })
        })
      } else {
        this.notify(res.data.msg);
      };
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
      mask: true,
    })
  },
  getData() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var id = prevPage.data.nowList.id;
    console.log(prevPage.data.nowList)
    NetworkRequest({
      url: '/yqgoodsdetial',
      data: {
        id: id
      },
    }).then(res => {
      if (res.data.code == 1) {
        var list = res.data.data;
        var arry = JSON.parse(JSON.stringify(prevPage.data.nowList));
        var price = (list.price == '0.00' ? 0 : (JSON.parse(list.price) ? JSON.parse(list.price) : list.price));
        var service_price = (list.service_price == '0.00' ? 0 : (JSON.parse(list.service_price) ? JSON.parse(list.service_price) : list.service_price));
        arry.price = (price + service_price).toFixed(2);
        arry.p_price = list.p_price;
        arry.minprice = list.first_garden_little;
        this.setData({
          arry: arry
        })
      }
    }).catch(err => {})
  },
  onLoad: function(options) {
    this.getData();
  },
})