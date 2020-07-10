import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_Url: getApp().globalData.icon_Url,
    ruleList:[
      {
        btn:'去签到',
      },
      {
        btn:'去认证',
      },
      {
        btn:'去下单',
      },
      {
        btn:'去推荐',
      },
      {
        btn:'去看看',
      }
    ]
  },
  // 点击按钮判断跳转哪个页面
  toNext(e){
    var id = e.currentTarget.dataset.id
    if(id == 1){
      // 去签到
      wx.navigateTo({
        url: '../signIn/signIn',
      })
    }
    if(id == 2){
      // 去认证
      wx.navigateTo({
        url: '/pages/user/attest/attest',
      })
    }
    if(id == 3){
      // 跳转商品购买下单
      wx.switchTab({
        url: '/pages/services/services',
      })
    }
    if(id == 4){
      // 推荐代理人
      // wx.navigateTo({
      //   url: '../signIn/signIn',
      // })
    }
    if(id == 5){
      // 晋级代理人
      wx.navigateTo({
        url: '/package/component1/pages/user/toAgent/toAgent',
      })
    }
  },
  // 跳转积分明细
  toNumDetail(){
    wx.navigateTo({
      url: '../numDetail/numDetail',
    })
  },
  // 跳转抽奖
  tolucky(){
    wx.navigateTo({
      url: '../lucky/lucky',
    })
  },
  getData(){
    NetworkRequest({
      url:'/myIntegral',
      data:{}
    }).then(res=>{
      var myintegral = res.data.myintegral
      var list = res.data.data
      var rule = this.data.ruleList
      for(var i = 0;i<list.length&&i<rule.length;i++){
        list[i].btn = rule[i].btn
      }

      this.setData({
        list:list,
        myintegral:myintegral,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getData()
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