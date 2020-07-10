// pages/main/main.js
var utils = require('../../../../../utils/ut.js');
var Animation = require('../../../../../utils/Animation.js');
var Pointer = require('../../../../../utils/Pointer.js');
var Wheel = require('../../../../../utils/Wheel.js');
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    windowHeight: 0,
    wheelImg: 'assets/wheel.png',
    pointImg: 'assets/point.png',
    touch: { x: 0, y: 0, isPressed: false },
    show:false,
  },
  // 跳转中奖记录
  toWin(){
    wx.navigateTo({
      url: '../winDetail/winDetail',
    })
  },
  touchMove: function (event) {

  },

  canvasTouchStart: function (event) {
    var isRun = wx.getStorageSync('isRun')
    if(isRun == false){
      if(this.data.free_draw_num >0){
        console.log('>0')
        var touch = event.changedTouches[0];
        touch.isPressed = true;
        this.getzhuan()
        this.setData({
          touch: touch,
          show:false
        })
      }else{
        if(this.data.show == true){
          if(this.data.my_integral>=this.data.con_integral){
            var touch = event.changedTouches[0];
            touch.isPressed = true;
            this.getzhuan()
            this.setData({
              touch: touch,
              show:true
            })
          }else{
            this.toast('积分不足')
            return
           }
        }else{
          this.toast('本次抽奖消耗积分，请勾选')
          return
        }
      }
    }else{
      this.toast('请勿重复抽奖')
    }
    // var touch = event.changedTouches[0];
    // // console.log(touch)
    // touch.isPressed = true;
    // this.setData({
    //   touch: touch
    // })
  },
  getzhuan(){
    var num
    if(this.data.show == true){
      num = 1
    }else{
      num = 0
    }
    NetworkRequest({
      url:'/drawWin',
      data:{
        is_integral:num
      }
    }).then(res=>{
      if(res.data.code ==0){
        console.log(res.data.msg)
      }else{
        wx.setStorageSync('winkey', res.data.key)
        if(res.data.msg == '再抽一次'){
          this.setData({
            free_draw_num:res.data.dree_num,
            show:false,
            my_integral:res.data.my_integral
          })
        }
        this.setData({
          free_draw_num:res.data.dree_num,
          my_integral:res.data.my_integral

         })
      }
    })
  },
  toast(e){
    wx.showToast({
      title: e,
      icon:'none'
    })
  },
  canvasTouchEnd: function (event) {
    var touch = event.changedTouches[0];
    touch.isPressed = false;
    this.setData({
      touch: touch
    })
  },
  choose(){
    // if(this.data.show == true){
    //   this.setData({
    //     show:false
    //   })
    // }else{
    //   this.setData({
    //     show:true
    //   })
    // }
    if(this.data.free_draw_num>0){
      this.setData({
        show:false
      })
    }else{
      if(this.data.show == true){
        this.setData({
          show:false
        })
      }else{
        this.setData({
          show:true
        })
      }
    }
  },
  getData(){
    NetworkRequest({
      url:'/draw',
      data:{}
    }).then(res=>{
      console.log(res.data.data)
      var list = res.data.data
      var slicePrizes = []
      for(var i = 0;i<list.length;i++){
        slicePrizes.push({text:list[i].name})
      }
      this.setData({
        slicePrizes:slicePrizes,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('isRun')){
      wx.setStorageSync('isRun', false)
    }
    
    var that = this;
    // 把设备的尺寸赋值给画布，以做到全屏效果
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        });
      },
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    NetworkRequest({
      url:'/draw',
      data:{}
    }).then(res=>{
      var list = res.data.data
      var slicePrizes = []
      for(var i = 0;i<list.length;i++){
        slicePrizes.push({text:list[i].name})
      }
      if(res.data.other.free_draw_num>0){
        this.setData({
          show:false
        })
      }else{
        this.setData({
          show:true
        })
      }
      this.setData({
        slicePrizes:slicePrizes,
        con_integral:res.data.other.con_integral,
        free_draw_num:res.data.other.free_draw_num,
        my_integral:res.data.other.my_integral,
      })
      // 大转盘
      var fps = 60;
      var w = this.data.windowWidth;
      var h = this.data.windowHeight;
      var context = wx.createCanvasContext('canvas');
      var wheel = new Wheel(w / 2, h / 2.5, w / 2 - 50, slicePrizes);
      var point = new Pointer(w / 2, h / 2.5, 40, wheel);
      var animation = new Animation(wheel, { w: w, h: h });
      wheel.prizeWidth = 30;
      wheel.prizeHeight = 30;

      // 启用事件
      point.inputEvent = true;
      point.onInputDown = run;
      // 更新动画
      var update = function () {
        // 清空
        context.clearRect(0, 0, w, h);
        // 画转盘
        wheel.draw(context);
        // 画指针
        point.draw(context);
        // 更新数据
        animation.draw(context);
        // 更新数据
        animation.update();
        // 获取手指点击
        // console.log(point)
        var touch = that.data.touch;
        if (point.inputEvent && touch.isPressed && point.onInputDown) {
          // 如果点击到了指针
          if (point.contains(touch)) {
            // 调用点击回调方法
            point.onInputDown();
          }
        }
        // 绘图   
        context.draw()
      };
      setInterval(update, 1000 / fps, 1000 / fps);
      function run() {
        // 避免重复调用
        wx.setStorageSync('isRun', animation.isRun)
        if (animation.isRun) return;
        // 当动画完成时
        animation.onComplete = function (res) {
          wx.setStorageSync('isRun', animation.isRun)
          wx.showToast({
            title: res.text,
            icon:'none',
            duration: 2000,
            mask: true,
          })
        };
        // 开始转
        animation.run();
        // 模拟后台返回数据
        
        setTimeout(function () {
          // 随机一个奖品
          var num = wx.getStorageSync('winkey') - 0
          // 计算奖品角度
          animation.stopTo(num);
        }, 3000);
      }
    })
  },
  onUnload:function(){
    wx.removeStorageSync('winkey')
    wx.removeStorageSync('isRun')
  }
})
