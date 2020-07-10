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
// import obj from '../../../../component2/pages/template/template';
Page({
  
  data: {
    icon_Url: getApp().globalData.icon_Url,
    info: getApp().globalData.sysinfo,
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    height: getApp().globalData.selectQueryHeight,
    Id: '',
    isShow:false,
    arry: [{
      title: '方案类型',
    }],
    zlArry:{
      title:'专利类型',
      modelShow:false,
    },
    proArry:{
      title:'产品类型',
      modelShow:false,
    },
    zlobj:{ 
      title:'专利类型',
      modelShow:false,
    },
    // lastobj:{
    //   title:'专利类型',
    //   modelShow:false,
    // },
    jsArry:{
      title:'技术类别',
      modelShow:false,
    },
    zlStylesec:[{
      name:'发明专利'
    }],
    zlsec:[{
      name: '外观专利',
    }],
    proSec:[{
      name:'无形状结构产品'
    },{
      name:'有形状结构产品'
    }],
    jsSec:[{
      name:'方法技术',
    },{
      name:'产品技术'
    }],
    // lastsec:[{
    //   name:'发明专利',
    // },{
    //   name:'实用新型专利'
    // },{
    //   name:'发明&实用新型专利'
    // }],
    idx:Number,//方案类型
    idxzl:Number,//专利类型
    idxjs:Number,//方法技术
    zlidx:Number,
    idxpro:Number,
    lastidx:Number,
    // {
    //   name: '外观设计方案',
    // }, 
    sec: [
    
    {
      name: '技术方案',
    }],
    top_num:0,
  },
  onBack() {
    this.onSaveData();
    setTime(50).then(()=>{
      wx.navigateBack();
    })
  },
  onSaveData(){
    func.saveData({
      'id': this.data.Id,
      'data': this.data
    })
  },
  onClick(){
    func.saveData({
      'id': func.voiceText().id,
      'data': this.data
    }).then(() => {
    func.isSue({
      'id': 11,
    }).then(() => {
      wx.navigateTo({
        url: '/package/component2/pages/patent_book/input_invent/input_invent',
      })
    })
  })
  },
  onChoose(event) {
    this.setData({
      idx : event.currentTarget.dataset.index
    })
    if(event.currentTarget.dataset.name =='外观设计方案'){
      this.setData({
        [`zlArry.modelShow`]:true,
        [`jsArry.modelShow`]:false,
        [`zlobj.modelShow`]:false,
        [`proArry.modelShow`]:false,
        isShow:false,
        idxjs:Number,
        zlidx:Number,
        // [`lastobj.modelShow`]:false,
        lastidx:Number,
      })
      wx.setStorageSync('plan','外观专利')
    }else if(event.currentTarget.dataset.name =='技术方案'){
      this.setData({
        [`zlArry.modelShow`]:false,
        [`jsArry.modelShow`]:true,
        idxzl:Number,
        isShow:false,
        // [`lastobj.modelShow`]:false,
        lastidx:Number,
      })
      wx.setStorageSync('plan','发明专利')
    }
  },
  onChoosezl(e){
    this.setData({
      idxzl : e.currentTarget.dataset.index
    })
    if(e.currentTarget.dataset.name =='外观专利'){
      this.setData({
        isShow:true
      })
    }
    console.log(e.currentTarget.dataset.name)
    wx.setStorageSync('type',e.currentTarget.dataset.name )
  },
  onChoosejs(e){
    this.setData({
      idxjs : e.currentTarget.dataset.index
    })
    if(e.currentTarget.dataset.name =='方法技术'){
      wx.setStorageSync('type1',1)
      wx.setStorageSync('type2','')
      this.setData({
        // [`zlobj.modelShow`]:true,
        [`proArry.modelShow`]:false,
        isShow:true,
        idxpro:Number,
        // zlidx:Number,
        // [`lastobj.modelShow`]:false,
        // lastidx:Number,
      })
    }else if(e.currentTarget.dataset.name =='产品技术'){
      wx.setStorageSync('type1',2)
      this.setData({
        [`zlobj.modelShow`]:false,
        zlidx:Number,
        isShow:false,
        [`proArry.modelShow`]:true,
        // [`lastobj.modelShow`]:false,
        lastidx:Number,
      })
    }
  },
  // choose(e){
  //   this.setData({
  //     zlidx : e.currentTarget.dataset.index
  //   })
  //   if(e.currentTarget.dataset.name =='发明专利'){
  //     this.setData({
  //       isShow:true
  //     })
  //     wx.setStorageSync('type',e.currentTarget.dataset.name )
  //   }
  // },
  onChoosepro(e){
    this.setData({
      idxpro:e.currentTarget.dataset.index
    })
    if(e.currentTarget.dataset.name == "无形状结构产品"){
      wx.setStorageSync('type2',1)
      this.setData({
        // [`lastobj.modelShow`]:false,
        [`zlobj.modelShow`]: true,
        lastidx:Number,
        isShow:true
      })
    }else if(e.currentTarget.dataset.name == "有形状结构产品"){
      wx.setStorageSync('type2',2)
      this.setData({
        // [`lastobj.modelShow`]:true,
        [`zlobj.modelShow`]: false,
        isShow:true,
        zlidx:Number,
      })
    }
    
  },
  // chooselast(e){
  //   this.setData({
  //     lastidx:e.currentTarget.dataset.index,
  //     isShow:true
  //   })
  //   wx.setStorageSync('type', e.currentTarget.dataset.name)
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vioceText({
      data: {
        content:  func.voiceText().text,
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
      idx:Number,
      idxzl:Number,
      idxjs:Number,
      zlidx:Number,
      idxpro:Number,
      lastidx:Number,
      [`lastobj.modelShow`]:false,
      [`zlobj.modelShow`]:false,
      [`proArry.modelShow`]:false,
      [`zlArry.modelShow`]:false,
      [`jsArry.modelShow`]:false,
      isShow : false,
    })
   //页面返回校准
   if (this.data.Id !== '') {
     console.log(this.data.Id,func.voiceText().id)
    if (func.voiceText().id !== this.data.Id) {
      func.isSue({
        'id': wx.getStorageSync('Question')[0].lastId,
      }).then(()=>{
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