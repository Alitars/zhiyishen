import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
import setTime from '../../../../../template/setTime';
import func from '../../../../../template/func.js';
import vioceText from '../../../../../template/vioceText.js';
import animation from '../../../../../template/animation.js';
import canonical from '../../../../../template/canonical';
import recoderTS from '../../../../../template/recorder.js';
import selectQuery from '../../../../../template/selectQuery.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_Url: getApp().globalData.icon_Url,
    info: getApp().globalData.sysinfo,
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    height: getApp().globalData.selectQueryHeight,
    Id: '',
    value: '',
    product:'',
  },
  onBack() {
    setTime(50).then(() => {
      wx.navigateBack();
    })
  },
  onClick() {
    if (this.data.value == '') {
      Toast('请输入发明创造的名称');
      return;
    };
    var list = {}
    list.name = this.data.value
    var json = JSON.stringify(list)
    wx.navigateTo({
      url: '/package/component2/pages/patent_book/select/select?compose='+this.data.compose +'&list='+ json,
    })
  },
  onInput(e) {
    // console.log(event)
    this.setData({
      value:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      compose:options.name
    })
    vioceText({
      data: {
        content: '请输入发明创造的名称',
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var info = this.data.info;
    selectQuery('box').then((res) => {
      selectQuery('btn').then((event) => {
        var height = res[0].height + event[0].height;
        getApp().globalData.selectQueryHeight = info.screenHeight - height - info.statusBarHeight;
        this.setData({
          height: info.screenHeight - height - info.statusBarHeight
        })
      })
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})