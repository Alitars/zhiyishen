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
  tosave(){
    NetworkRequest({
      url:'/patent/answer',
      data:{
        ans1: this.data.list.ans1,
        ans2: this.data.list.ans2,
        ans3: this.data.list.ans3,
        ans4: this.data.list.ans4,
        ans5: this.data.list.ans5,
        ans6: this.data.list.ans6,
        area: this.data.list.area,
        name: this.data.list.name,
        pic1: this.data.list.imgurl,
      },
      method:'POST'
    }).then((res)=>{
      Toast('保存成功')
    })
  },
  tocreate(){
    NetworkRequest({
      url:'/patent/answer',
      data:{
        ans1: this.data.list.ans1,
        ans2: this.data.list.ans2,
        ans3: this.data.list.ans3,
        ans4: this.data.list.ans4,
        ans5: this.data.list.ans5,
        ans6: this.data.list.ans6,
        area: this.data.list.area,
        name: this.data.list.name,
        pic1: this.data.list.imgurl,
      },
      method:'POST'
    }).then((res)=>{
      wx.redirectTo({
        url: '/package/component2/pages/patent_book/composePay/composePay?id='+ res.data.data,
      })
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      compose:options.compose,
      list:JSON.parse(options.list)
    })
    vioceText({
      data: {
        content: '技术交底书会在付款后1-2个工作日撰写完成，撰写完成后可去我的技术交底书中查看',
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