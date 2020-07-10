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
    active: 0,
    value: '',
    Id: '',
    top_num: 0,
  },
  onChangeText(event) {
    this.setData({
      value: event.detail,
    })

    selectQuery('field').then((res) => {
      this.setData({
        top_num: res[0].height
      })
    })
  },
  onBack() {
    this.onSaveData();
    setTime(50).then(() => {
      wx.navigateBack();
    })
  },
  onClick() {
    var value = this.data.value;
    console.log(func.voiceText().id);
    var  id = func.voiceText().id;
    if (value == '') {
      Toast('请先做简单描述');
      return;
    };
    wx.setStorageSync('description', this.data.value)
    func.saveData({
      'id': id,
      'data': this.data
    }).then(() => {
      func.isSue({
        'id': 13,
      }).then(() => {
        wx.navigateTo({
          url: '/package/component2/pages/patent_book/antistop/antistop',
        })
        // if(id==3){
        //   wx.navigateTo({
        //     url: '/package/component2/pages/patent_book/antistop/antistop',
        //   })
        // }else{
        //   wx.navigateTo({
        //     url: '/package/component2/pages/patent_book/sound/sound',
        //   })
        // }
      })
    })
  },
  onSlider(e) {
    var win = getApp().globalData.sysinfo.screenWidth;
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      Toast('敬请期待');
      return;
    };
    this.setData({
      active: id,
    });
    animation(id * win / 2);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vioceText({
      data: {
        content: func.voiceText().text,
      },
    })
    func.upDate(func.voiceText().id);
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
    this.setData({
      value:'' 
    })
    if (this.data.Id !== '') {
      if (func.voiceText().id !== this.data.Id) {
        func.isSue({
          'id': wx.getStorageSync('Question')[0].lastId,
        }).then(() => {
          // func.upDate(func.voiceText().id);
        })
      }
    }
    if(wx.getStorageInfoSync('description')){
      wx.removeStorageSync('description')
    }
  },
  onSaveData() {
    func.saveData({
      'id': this.data.Id,
      'data': this.data
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.onSaveData();
  },

  /**
   * 生命周期函数--监听页面卸载
   */

  onUnload: function () {
    this.onSaveData();
    
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