import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
import animated from '../../../../../template/animation.js';
import setTime from '../../../../../template/setTime.js';
import Dialog from '../../../../../dist/dialog/dialog';
import route from '../../../../../template/route.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    win: getApp().globalData.sysinfo.windowWidth,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    height: getApp().globalData.menu.height + getApp().globalData.menu.top,
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    animationData: '',
    page: 1,
    len:8,
    status:Number,
    display: true,
    list:[]
  },
 
  onBack() {
    wx.switchTab({
      url: '/pages/user/user',
    })
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },
  anima(e) {
    var current = e.currentTarget.dataset.id;
    if (current == this.data.active) {
      return;
    };
    animated(current * this.data.win / 100 * 25);
    this.setData({
      active: current,
      list: [],
      page: 1,
    })
    setTime(100).then(res => {
      this.getData(current);
    })
  },
  // 获取列表数据
  getData(e){
    this.setData({
      display: false,
    });
    if(e != 0 && e!= 3){
      this.setData({
        status: e,
      })
    }else if(e == 3){
      this.setData({
        status: 4,
      })
    }else if(e == 0){
      this.setData({
        status: Number,
      })
    }
    NetworkRequest({
      url:'/patent/answerList',
      data:{
        page:this.data.page,
        len:this.data.len,
        status:this.data.status
      },
      method:'POST'
    }).then((res)=>{
      var clist = res.data.data.data
      console.log(clist)
      if(clist.length == 0){
        wx.showToast({
          title: '暂无更多数据',
          icon:'none',
          duration: 2000
        })
        setTime(100).then(res => {
          this.setData({
            display: true
          });
        })
        return
      }
      this.setData({
        list: this.data.list.concat(clist)
      })
      this.data.page++;
      setTime(100).then(res => {
        this.setData({
          display: true
        });
      })
    }).catch(err => {
      setTime(100).then(res => {
        this.setData({
          display: true
        });
      })
    })
  },
  // 跳转详情页
  toDetail(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/package/component2/pages/patent_book/composeDetail/composeDetail?id='+ e.currentTarget.dataset.id,
    })
  },
  // 取消订单
  cancelOrder(e){
    this.setData({
      page:1
    })
    NetworkRequest({
      url:'/patent/ansEditStaus',
      data:{
        id:e.currentTarget.dataset.id,
        status:-1,
      },
      method:'POST'
    }).then((res)=>{
      if(res.data.code == 1){
        this.setData({
          list:[]
        })
        this.getData(this.data.active);
      }else{
        Toast(res.data.msg);
      }
    })
  },
  onLoad: function (options) {
    // if (options.id) {
    //   var id = JSON.parse(options.id);
    //   var s = getApp().globalData.sysinfo.windowWidth;
    //   animated(id * s / 100 * 25);
    //   this.getData(id);
    //   this.setData({
    //     active: id
    //   });
    // } else {}
      this.getData(0);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
    this.setData({
      list: [],
      page: 1,
    })
    this.getData(this.data.active);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData(this.data.active);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})