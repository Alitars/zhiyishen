import Toast from '../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../template/network.js';
import http from '../../../../../template/networktest.js';
import func from '../../../../../template/func.js';
import recoderTS from '../../../../../template/recorder.js';
import selectQuery from '../../../../../template/selectQuery.js';
import canonical from '../../../../../template/canonical.js';
// import setEcharts from '../../../../component1/pages/template/setEcharts'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    index:1,//当前页
    size:6,
    key:''
  },
  toDetail(e){
    var type = e.currentTarget.dataset.type
    var id= e.currentTarget.dataset.id
    var state = e.currentTarget.dataset.state
    if(state == 1){
      if(type == '外观专利'){
        wx.navigateTo({
          url:'/package/component2/pages/patent_book/designPatent/designPatent?id='+id
        })
      }else{
        wx.navigateTo({
          url:'/package/component2/pages/patent_book/analysis/analysis?id=' +id
        })
      }
    }
  },
  getNext(){
    wx.showLoading({
      title:'加载中'
    })
    var num = this.data.index
    var that =this
    num =that.data.index + 1 - 0
    NetworkRequest({
      url:'/patent/getMethod',
      data:{
        index:num,
        size:this.data.size,
        keyword:this.data.key,
        return_url:'http://47.99.214.190:8000/get_user_task'
      },
    }).then((res)=>{
      wx.hideLoading({})
      that.setData({
        index: num
      })
      var obj = JSON.parse(res.data.data)
      var id = obj.id;
      var name = obj.patent_name;
      var type = obj.patent_type;
      var state = obj.state;
      var arr = []
      for(var i = 0;i<id.length&&i<name.length&&i<type.length&&i<state.length;i++){
        arr.push({name:name[i],id:id[i],type:type[i],state:state[i]})
      }
      var newarr = this.data.arrlist.concat(arr)
      that.setData({
        arrlist:newarr
      })
    })
  },
  onClick(){
    this.setData({
      index:1
    })
    wx.showLoading({
      title:'加载中'
    })
    NetworkRequest({
      url:'/patent/getMethod',
      data:{
        index:this.data.index,
        size:this.data.size,
        keyword:this.data.key,
        return_url:'http://47.99.214.190:8000/get_user_task'
      },
    }).then((res)=>{
      var obj = JSON.parse(res.data.data)
      wx.hideLoading({})
      var id = obj.id;
      var name = obj.patent_name;
      var type = obj.patent_type;
      var state = obj.state;
      var arr = []
      for(var i = 0;i<id.length&&i<name.length&&i<type.length&&i<state.length;i++){
        arr.push({name:name[i],id:id[i],type:type[i],state:state[i]})
      }
      this.setData({
        arrlist:arr
      })
    })
  },
  onChange(e){
    this.setData({
      key: e.detail,
    });
  },
  onSearch(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'加载中'
    })
    NetworkRequest({
      url:'/patent/getMethod',
      data:{
        index:this.data.index,
        size:this.data.size,
        keyword:this.data.key,
        return_url:'http://47.99.214.190:8000/get_user_task'
      },
    }).then((res)=>{
      var obj = JSON.parse(res.data.data)
      wx.hideLoading({})
      var id = obj.id;
      var name = obj.patent_name;
      var type =obj.patent_type;
      var state = obj.state;
      var arr = []
      for(var i = 0;i<id.length&&i<name.length&&i<type.length&&i<state.length;i++){
        arr.push({name:name[i],id:id[i],type:type[i],state:state[i]})
      }
      this.setData({
        arrlist:arr
      })
    })
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
    
  },
// 这个后台返回的怎么把他变成[{name:运动鞋,id:'071542c0-dcb0-429c-bc45-707e71558950',type:'外观专利'}......]
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
    this.getNext()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})