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
    if(this.data.plan !== '外观设计方案'){
      if(this.data.product == ''){
        Toast('请输入产品的名称');
        return;
      }
    wx.setStorageSync('product', this.data.product)
    }
    wx.setStorageSync('Patent_name', this.data.value)
    func.saveData({
      'id': func.voiceText().id,
      'data': this.data
    }).then(() => {
      func.isSue({
        'id': func.voiceText().id + 1,
      }).then(() => {
        var style = wx.getStorageSync('plan')
        if(style =='外观设计方案'){
          wx.navigateTo({
            url: '/package/component2/pages/patent_book/selectsj/selectsj',
          })
        }else{
          wx.navigateTo({
            url: '/package/component2/pages/patent_book/select/select',
          })
        }
      })
    })
  },
  onInput(event) {
    // console.log(event)
    canonical(event.detail.value)
  },
  onInput1(e){
    console.log(e)
    this.setData({
      product:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var vioce = wx.getStorageSync('voiceArry')
    // console.log(vioce)
    var plan = wx.getStorageSync('plan')
    vioceText({
      data: {
        content: plan=="外观设计方案"? '请输入使用外观设计的产品名称':'请输入发明创造的名称以及产品名称',
        // content: plan=="外观设计方案"? '请输入使用外观设计的产品名称':func.voiceText().text,
      },
    })
    // func.upDate(func.voiceText().id);
    // var Question = wx.getStorageSync('Question');
    // for (var i = 0; i < Question.length; i++) {
    //   Question[i].id = i+1
    // }
    // wx.setStorageSync('Question', Question)
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
  onSaveData(){
    func.saveData({
      'id': this.data.Id,
      'data': this.data
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //页面返回校准
    var plan = wx.getStorageSync('plan')
    this.setData({
      plan:plan
    })
    if(this.data.value!=''){
      this.setData({
        value: '',
        product:''
      })
    }
    if (this.data.Id !== '') {
      if (func.voiceText().id !== this.data.Id) {
        func.isSue({
          'id': wx.getStorageSync('Question')[0].lastId,
        }).then(() => {
          // func.upDate(func.voiceText().id);
        })
      }
    }
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