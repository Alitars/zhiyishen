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
    page: 1,
    list: {},
    display: true,
    arry: [],
    icon_Url: getApp().globalData.icon_Url,
  },

  getData() {
    var list = this.data.list;
    this.setData({
      display: false
    })
    NetworkRequest({
      url: '/order/orderPark',
      data: {
        type: 51,
        u_id: list.id,
        park_name: wx.getStorageSync('YQNAME'),
        page: this.data.page
      },
    }).then(res => {
      if (res.data.code == 1) {
        var list = res.data.data.dataList;
        var len = this.data.arry.length;
        for (var i = 0; i < list.length; i++) {
          this.setData({
            ['arry[' + len + i + ']']: list[i],
          })
        }
        this.data.page++
      }
      setTime(500).then(ss => {
        this.setData({
          display: true
        })
      })
    }).catch(err => {})
  },
  onLoad: function(options) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var list = JSON.parse(JSON.stringify(prevPage.data.nowList));
    this.setData({
      list: list
    });
    this.getData(list);
    wx.setNavigationBarTitle({
      title: list.yqname + '园区订单',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      arry: [],
      page: 1
    })
    setTime(50).then(ss => {
      this.getData();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})