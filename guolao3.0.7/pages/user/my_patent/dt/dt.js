import NetworkRequest from '../../../../template/network.js';
import Toast from '../../../../dist/toast/toast';
import Notify from '../../../../dist/notify/notify';
import applyType from '../../../../template/template.js';
import copyText from '../../../../template/copyText.js';
import setTime from '../../../../template/setTime.js';
import previewoffice from '../../../../template/previewoffice.js';
Page({

  data: {
    icon_Url: getApp().globalData.icon_Url,
    url: getApp().globalData.dm_Url,
    id: 0,
    arry: [],
    applyType: applyType.applyType,
    click_type: '',
    height: getApp().globalData.menu.height + getApp().globalData.menu.top,
    status: 1,
  },
  //退款
  onRefund(e) {
    var list = this.data.arry.orderList;
    // console.log(list);
    var id = list.id;
    var refund_type = list.pay_typeName;
    var pay_type = list.pay_type;
    var order_id = list.order_id;
    wx.navigateTo({
      url: '/pages/user/shop/refund/refund?id=' + id + '&refund_type=' + refund_type + '&type=' + 2 + '&pay_type=' + pay_type + '&order_id=' + order_id,
    })
  },

  //预览
  onLook(e) {
    var url = e.currentTarget.dataset.url;
    previewoffice(url, this);
  },

  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },
  notify(e) {
    Notify({
      text: e,
      duration: 5000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },
  getDt(e) {
    this.toast();
    var token = wx.getStorageSync('token');
    var userid = wx.getStorageSync('userid');
    NetworkRequest({
      url: '/patent/orderDetail',
      data: {
        token: token,
        user_id: userid,
        id: e,
      },
      method: 'POST',
    }).then(res => {
      var list = res.data.data;
      var code = res.data.code;
      if (code == 1) {
        if (JSON.parse(list.orderList.real_total) && !list.orderList.real_total == '0.00') {
          list.orderList.real_total = JSON.parse(list.orderList.real_total).toFixed(2);
        } else {
          list.orderList.real_total = list.orderList.real_total.toFixed(2);
        };
        if (JSON.parse(list.orderList.coupon) && !list.orderList.coupon == '0.00') {
          list.orderList.coupon = JSON.parse(list.orderList.coupon).toFixed(2);
        } else {
          list.orderList.coupon = list.orderList.coupon.toFixed(2);
        };
        if (JSON.parse(list.orderList.total_price) && !list.orderList.total_price == '0.00') {
          list.orderList.total_price = JSON.parse(list.orderList.total_price).toFixed(2);
        } else {
          list.orderList.total_price = list.orderList.total_price.toFixed(2);
        };
        for (var i = 0; i < list.recommend.length; i++) {
          list.recommend[i].total = (JSON.parse(list.recommend[i].price) + JSON.parse(list.recommend[i].service_price)).toFixed(2)
        }
        this.setData({
          arry: list,
        })
      }
      wx.stopPullDownRefresh();
      Toast.clear();
    }).catch(err => {
      Toast.clear();
      this.notify('请求失败！');
      wx.stopPullDownRefresh();
    })
  },
  onType(e) {
    var brand_upload = this.data.arry.brand_upload;
    if (brand_upload) {
      if (brand_upload.three_brand) {
        wx.setStorageSync('arry', brand_upload.three_brand);
        wx.navigateTo({
          url: '/pages/user/my_order/order_progress/order_progress?type=' + 0,
        })
      }
    } else {
      Toast('暂无商品类别！')
    }
  },
  onGuanlian(e) {
    var relevanceOrder = this.data.arry.relevanceOrder;
    if (relevanceOrder.length == 0 || !relevanceOrder) {
      Toast('暂无关联订单！')
    } else {
      wx.setStorageSync('arry', this.data.arry.relevanceOrder);
      wx.navigateTo({
        url: '/pages/user/my_order/order_progress/order_progress?type=' + 1,
      })
    }
  },
  onProgress(e) {
    wx.setStorageSync('arry', this.data.arry.orderStatus);
    wx.navigateTo({
      url: '/pages/user/my_order/order_progress/order_progress?type=' + 2,
    })
  },
  onDt(e) {
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    wx.setStorageSync('title', title);
    wx.navigateTo({
      url: "/package/component1/pages/services/dt/dt?id=" + id + '&open=' + true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      click_type: options.click_type
    })
    if (options.id) {
      this.getDt(options.id);
      this.data.id = options.id;
    } else {
      this.getDt(this.data.id);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.status == 2) {
      copyText(wx.getStorageSync('filePath'), this);
      this.notify('文件链接已复制，您可以粘贴发送至微信或使用浏览器进行下载！');
    }
    setTime(500).then(res => {
      this.data.status = 1
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getDt(this.data.id);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})