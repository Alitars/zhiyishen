import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
import http from '../../../../../template/networktest.js';
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
    height: 0,
    btn: [],
    value: ''
  },
  onAddBtn() {
    var value = this.data.value;
    var btn = this.data.btn;
    var isPass = true;
    for (var i = 0; i < btn.length; i++) {
      if (btn[i].text == value) {
        var isPass = false;
        break;
      };
    };
    if (value !== '') {
      if (isPass) {
        this.setData({
          ['btn[' + btn.length + ']']: {
            'text': value,
            'isSelect': true,
          }
        });
        Toast('已添加');
      } else {
        Toast('请不要重复添加');
      };
    } else {
      Toast('请输入关键词');
    };
  },
  onChoose(event) {
    var index = event.currentTarget.dataset.index;
    this.setData({
      ['btn[' + index + '].isSelect']: !this.data.btn[index].isSelect
    })
  },
  onInput(event) {
    this.setData({
      value: event.detail.value.replace(/\s+/g, "")
    })
  },
  onBack() {
    wx.navigateBack();
  },
  onClick() {
    // getApp().globalData.vioceText = '设计特别说明：给出事例（非必填项）';
    var list =this.data.btn
    var keywords = []
    for(var i = 0;i<list.length;i++){
      if(list[i].isSelect == true){
        keywords.push(list[i].text)
      }
    }
    var plan = wx.getStorageSync('plan')
    wx.setStorageSync('keywords', keywords.toString())
    if(plan == '外观设计方案'){
      wx.navigateTo({
        url: '/package/component2/pages/patent_book/upload_photo/upload_photo',
      })
    }else{
      wx.navigateTo({
        url: '/package/component2/pages/patent_book/analysis/analysis',
      })
    }
    // wx.navigateTo({
    //   // url: '/package/component2/pages/patent_book/analysis/analysis',
    //   url: '/package/component2/pages/patent_book/industry/industry',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vioceText({
      data: {
        content: '请确定技术关键词',
      },
    })
    var PatentNname = wx.getStorageSync('Patent_name')
    var plan = wx.getStorageSync('plan')
    if(plan == '外观设计方案'){
      var description = wx.getStorageSync('designdemo')
    }else{
      var description = wx.getStorageSync('description')
    }
    wx.showLoading({
      title: '加载中',
    })
    NetworkRequest({
      url:'/patent/postMethod',
      data:{
        text:description+','+PatentNname,
        return_url:'http://47.99.214.190:8000/get_related_words'
      },
      method:'POST'
    }).then((res)=>{
      wx.hideLoading({
        complete: (res) => {},
      })
      // console.log()
      var json = JSON.parse(res.data.data)
      if(json.code == 200){
        var list1 = json.list1
        var list2 = json.list2
        var array=[]
        var array2 = []
        for(var i = 0 ;i<list1.length;i++){
          var btn ={}
          btn.text=list1[i]
          btn.isSelect = true
          array.push(btn)
        }
        if(list2 != []){
          for(var i = 0 ;i<list2.length;i++){
            var btn ={}
            btn.text=list2[i]
            btn.isSelect = false
            array2.push(btn)
          }
        }
        var arr = array.concat(array2)
        this.setData({
          btn:arr
        })
      }else{
        Toast('没有查询到关键词')
      }
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
