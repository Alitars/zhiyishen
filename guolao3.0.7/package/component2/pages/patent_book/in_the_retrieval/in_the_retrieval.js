import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
import http from '../../../../../template/networktest';
import setTime from '../../../../../template/setTime';
import func from '../../../../../template/func.js';
import vioceText from '../../../../../template/vioceText.js';
import animation from '../../../../../template/animation.js';
import canonical from '../../../../../template/canonical';
import recoderTS from '../../../../../template/recorder.js';
import selectQuery from '../../../../../template/selectQuery.js';
import remove from '../../../../../template/remove.js'
var animat = wx.createAnimation({
  duration: 800,
  timingFunction: 'linear',
});
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
    height: 0,
    animationData: "",
    left: 0,
    hide: false,
  },
  onBack() {
    setTime(50).then(()=>{
      wx.navigateBack();
    })
  },
  animat() {
    if (this.data.hide == true) {
      return;
    };
    var left = this.data.left;
    setTime(450).then(() => {
      animation(left == 0 ? 120 : 0);
      this.data.left = left == 0 ? 120 : 0;
      this.animat();
    })
  },
  tohome(){
    remove()
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  toreport(){
    remove()
    wx.switchTab({
      url: '/pages/user/user',
    })
    // wx.navigateTo({
    //   url: '/package/component2/pages/patent_book/designCenter/designCenter',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      url:options.imgUrls
    })
    vioceText({
      data: {
        content: '您的专利正在检测中，请稍后去个人中心的专利分析报告中查看专利检测结果',
      },
    })
    
    http({
      url:'/commit_search_patent_img',
      data:{
       description:wx.getStorageSync('designdemo'),
       ic: '',
       key_words: wx.getStorageSync('keywords'),
       patent_name: wx.getStorageSync('Patent_name'),
       patent_type: wx.getStorageSync('type'),
       product: wx.getStorageSync('Patent_name'),
       test: 0,
       upload_img_path: this.data.url,
      },
      method:'POST'
    }).then((res)=>{
        NetworkRequest({
          url:'/patent/analyAdd',
          data:{
            area:wx.getStorageSync('area'),
            content:wx.getStorageSync('designdemo'),//设计说明
            form:'',
            imgs:this.data.url,
            industry:'',//行业
            key_word:wx.getStorageSync('keywords'),
            name:wx.getStorageSync('Patent_name'),//发明创造的名字
            no:res.data.id,//人工智能的id
            plan:wx.getStorageSync('plan'),//外观设计方案
            product:wx.getStorageSync('Patent_name'),
            type:wx.getStorageSync('type'),
          },
          method:'POST'
        }).then((e)=>{
          // console.log(e)
        })
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
    this.data.hide = false;
    this.animat();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.data.hide = true;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.data.hide = true;
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