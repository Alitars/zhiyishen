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
import chooseImgs from '../../../../../template/chooseImgs';
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
    imgUrls: '',
  },
  onChooseImgs() {
    chooseImgs('imgUrls').then((res) => {
      Toast('上传成功');
    })
  },
  notify() { },
  onBack() {
    wx.navigateBack();
  },
  onClick() {
    // getApp().globalData.vioceText = '设计特别说明：给出事例（非必填项）';
    if(this.data.imgUrls == ''){
      Toast('请点击上传图片');
    }else{
      if(this.data.compose){
        var list = this.data.list
        list.imgurl = this.data.imgUrls
        var json = JSON.stringify(list)
        wx.navigateTo({
          url: '/package/component2/pages/patent_book/effect/effect?compose='+this.data.compose+'&list='+ json,
        })
      }else{
        wx.navigateTo({
          url: '/package/component2/pages/patent_book/in_the_retrieval/in_the_retrieval?imgUrls='+this.data.imgUrls,
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.compose){
      this.setData({
        compose:options.compose,
        list:JSON.parse(options.list)
      })
      vioceText({
        data: {
          content: '上传产品结构图纸',
        },
      })
    }else{
      vioceText({
        data: {
          content: '请上传产品图片',
        },
      })
    }
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
