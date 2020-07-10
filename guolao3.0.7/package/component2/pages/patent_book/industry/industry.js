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
    value:'',
    industryBox:[{
      isSelect: false,
      text: 'A部-人类生活必需',
      num:'A'
    },
    {
      isSelect: false,
      text: 'B部-作业；运输',
      num:'B'
    }, {
      isSelect: false,
      text: 'C部-化学；冶金',
      num:'C'
    }, {
      isSelect: false,
      text: 'D部-纺织；造纸',
      num:'D'
    },
    {
      isSelect: false,
      text: 'E部-固定建筑物',
      num:'E'
    },
    {
      isSelect: false,
      text: 'F部-机械工程；照明；加热；武器；爆破',
      num:'F'
    },{
      isSelect: false,
      text: 'G部-物理',
      num:'G'
    },{
      isSelect: false,
      text: 'H部-电学',
      num:'H'
    },
    // {
    //   isSelect: false,
    //   text: '其他',
    // }
  ]
  },
  onBack() {
    // this.onSaveData();
    setTime(50).then(() => {
      wx.navigateBack();
    })
  },
  // onSaveData() {
  //   func.saveData({
  //     'id': this.data.Id,
  //     'data': this.data
  //   })
  // },
  onClick() {
    var industryBox = this.data.industryBox;
    var isSelect = false;
    var plan = wx.getStorageSync('plan')
    for (var i = 0; i < industryBox.length; i++) {
      if (industryBox[i].isSelect == true) {
        var isSelect = true;
        break;
      };
    };
    if (isSelect == true) {
      
      if(plan == '外观设计方案'){
        wx.navigateTo({
          url: '/package/component2/pages/patent_book/upload_photo/upload_photo',
        })
      }else{
        wx.navigateTo({
          url: '/package/component2/pages/patent_book/analysis/analysis',
        })
      }
      
    } else {
      Toast('请先选择');
    };
  },
  onChangeText(e) {
    this.setData({
      value:''
    })
    wx.setStorageSync('ic', e.currentTarget.dataset.num)
    wx.setStorageSync('industry', e.currentTarget.dataset.name)
    var id = e.currentTarget.dataset.id;
    var industryBox = JSON.parse(JSON.stringify(this.data.industryBox));
    for (var i = 0; i < industryBox.length; i++) {
      if (i == id) {
        industryBox[i].isSelect = industryBox[id].isSelect == true ? false : true
      } else {
        industryBox[i].isSelect = false;
      };
    };
    this.setData({
      industryBox: industryBox,
    });
  },
  onInput(event) {
    this.setData({
      value: event.detail.value.replace(/\s+/g, "")
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vioceText({
      data: {
        content: '请选择您的行业',
      },
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
    // var id = func.voiceText().id;
    // func.upDate(id);
    // if (func.voiceText().id == 1) {
    this.setData({
      value:''
    })
    // var Question = wx.getStorageSync('Question');
    // for (var i = 0; i < Question.length; i++) {
    //   if (Question[i].id == id) {
    //     if (JSON.stringify(Question[i].data) == '{}') {
    //       this.setData({
    //         industryBox: arry
    //       })
    //       return;
    //     }
    //     break;
    //   }
    // }
    //页面返回校准
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