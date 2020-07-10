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
    CheckBox:[{
      isSelect: false,
      text: '形状',
    },
    {
      isSelect: false,
      text: '图案',
    }, {
      isSelect: false,
      text: '形状+色彩',
    }, {
      isSelect: false,
      text: '图案+色彩',
    },
    {
      isSelect: false,
      text: '形状+图案',
    },
    {
      isSelect: false,
      text: '形状+图案+色彩',
    },
    ] ,
    Id: '',
  },
  onBack() {
    // this.onSaveData();
    setTime(50).then(()=>{
      wx.navigateBack();
    })
  },
  // onSaveData(){
  //   func.saveData({
  //     'id': this.data.Id,
  //     'data': this.data
  //   })
  // },
  onClick() {
    var CheckBox = this.data.CheckBox;
    var isSelect = false;
    for (var i = 0; i < CheckBox.length; i++) {
      if (CheckBox[i].isSelect == true) {
        var isSelect = true;
        break;
      };
    };
    if (isSelect == true) {
      // func.saveData({
      //   'id': func.voiceText().id,
      //   'data': this.data
      // }).then(() => {
      //   func.isSue({
      //     'id': 2
      //   }).then(() => {
          wx.navigateTo({
            url: '/package/component2/pages/patent_book/example/example',
          })
      //   })
      // })
    } else {
      Toast('请先选择');
    };
  },
  onChangeText(e) {
    var id = e.currentTarget.dataset.id;
    var area = e.currentTarget.dataset.name
    wx.setStorageSync('area', area)
    var CheckBox = JSON.parse(JSON.stringify(this.data.CheckBox));
    for (var i = 0; i < CheckBox.length; i++) {
      if (i == id) {
        CheckBox[i].isSelect = CheckBox[id].isSelect == true ? false : true
      } else {
        CheckBox[i].isSelect = false;
      };
    };
    this.setData({
      CheckBox: CheckBox,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var id = func.voiceText().id;
    vioceText({
      data: {
        content:  '请选择您的设计要点',
      },
    })
    // func.upDate(id);
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
    //页面返回校准
    // console.log(this.data.Id)
    // if (this.data.Id !== '') {
    //   if (func.voiceText().id !== this.data.Id) {
    //     func.isSue({
    //       'id': wx.getStorageSync('Question')[0].lastId,
    //     }).then(() => {
    //       // func.upDate(func.voiceText().id);
    //     })
    //   }
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this.onSaveData();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // this.onSaveData();
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