// pages/user/about_us/about_us.js
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_Url: getApp().globalData.icon_Url,
    modelShow:true,
    btnText:'立即签到',
    icon:'https://admin.iguolao.com/public/uploads/20200629130643433.svg',
    iconNo:'https://admin.iguolao.com/public/uploads/20200629130724727.svg',
    list:[{
      name:'周一',
      flag:false,
      num:'10'
    },{
      name:'周二',
      flag:false,
      num:'10'
    },{
      name:'周三',
      flag:false,
      num:'10'
    },{
      name:'周四',
      flag:false,
      num:'10'
    },{
      name:'周五',
      flag:false,
      num:'10'
    },{
      name:'周六',
      flag:false,
      num:'10'
    },{
      name:'周日',
      flag:false,
      num:'10'
    }],
  },
  toNow(){
    if(this.data.btnText == '今日已签到'){
      return;
    }else{
      this.setData({
        modelShow:false,
      })
      NetworkRequest({
        url:'/signIn',
        data:{},
      }).then(res=>{
        var e = res.data
        console.log(e)
        var con_num = this.data.con_num +1
        var otherNum = this.data.alredy - 1
        this.setData({
          my_integral:e.my_integral,
          score:e.score,
          btnText:'今日已签到',
          con_num:con_num,
          ['list['+ otherNum +'].flag']:true
        })
      })
    }
    
  },
  changeModel(){
    this.setData({
      modelShow:true
    })
  },
  getData(){
    NetworkRequest({
      url:'/signInfo',
      data:{},
      method:'POST'
    }).then(res=>{
      console.log(res.data.data)
      var sign = res.data.data.sign_day
      var  list = this.data.list
      var num = res.data.data.sign_in
      var alredy = res.data.data.w
      for(var i =0;i<list.length||i<num.length;i++){
        console.log(num[i])
        this.setData({
          ['list['+ i +'].num']: num[i]
        })
      }
      for(var i =0;i<sign.length;i++){
        if(sign[i] == 1){
          this.setData({
            [`list[0].flag`]:true
          })
        }else if(sign[i] == 2){
          this.setData({
            [`list[1].flag`]:true
          })
        }else if(sign[i] == 3){
          this.setData({
            [`list[2].flag`]:true
          })
        }else if(sign[i] == 4){
          this.setData({
            [`list[3].flag`]:true
          })
        }else if(sign[i] == 5){
          this.setData({
            [`list[4].flag`]:true
          })
        }else if(sign[i] == 6){
          this.setData({
            [`list[5].flag`]:true
          })
        }else if(sign[i] == 7){
          this.setData({
            [`list[6].flag`]:true
          })
        }
      }
      var otherNum = alredy - 1
      if(list[otherNum].flag == true){
        this.setData({
          btnText:'今日已签到'
        })
      }
      this.setData({
        con_num:res.data.data.con_num,
        my_integral:res.data.data.my_integral,
        alredy:alredy
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