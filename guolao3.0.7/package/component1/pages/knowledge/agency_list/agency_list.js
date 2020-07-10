// package/component1/pages/knowledge/brand_list/brand_list.js
import selectQuery from '../../../../../template/selectQuery';
import NetworkRequest from '../../../../../template/network.js';
import setTime from '../../../../../template/setTime.js';
import Toast from '../../../../../dist/toast/toast';
const record = [{
  text: '商标总数',
  id: 0,
}, {
  text: '已注册商标',
  id: 1,
}, {
  text: '申请中商标',
  id: 8,
}, {
  text: '续展期中商标',
  id: 7,
}, {
  text: '宽展中商标',
  id: 9,
}, {
  text: '无效商标',
  id: 5,
}, ];

function title(obj) {
  var arry = obj.record;
  var index = obj.type;
  for (var i = 0; i < arry.length; i++) {
    if (arry[i].id == index) {
      return arry[i].text;
      break;
    };
  };
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    obj: {},
    // display:false,
    page: 1,
    list: [],
    value: '',
    others: 0,
    display: false,
    type: 0,
    mame:'',
  },

  onDt(t) {
    var i = t.currentTarget.dataset.index;
    wx.showLoading({
      title: '加载中...',
    })
    NetworkRequest({
      url: '/getdata',
      data: {
        type: 4,
        keywords: this.data.list[i].RegId,
        cate_id: this.data.list[i].IntCls,
        size: 10,
        index: 1
      }
    }).then((res) => {
      if (res.data.code == 1) {
        res.data.data[0].genre = res.data.data[0].IntCls.length == 1 ? '0' + res.data.data[0].IntCls + '类' : res.data.data[0].IntCls + '类';
        wx.setStorageSync("list", res.data.data[0]);
        wx.navigateTo({
          url: "/pages/index/search/dt/dt?id=" + this.data.list[i].RegId + "&type=" + this.data.list[i].IntCls
        })
      }
    })
  },

  onPageScroll(e) {
    selectQuery('fixed').then((res) => {
      // console.log(res[0])
      if (res[0].top < 0 && this.data.show == true) {
        // console.log('false')
        this.setData({
          show: false
        })
      } else {
        if (res[0].top > 0 && this.data.show == false) {
          // console.log('true')
          this.setData({
            show: true
          })
        }
      }
    })
  },
  getData() {
    this.setData({
      display: false
    })
    if (this.data.list.length >= 500) {
      this.setData({
        list: [],
      })
      Toast('已为您更新当前：第' + this.data.page + 1 + '页');
    };
    NetworkRequest({
      url: '/assets/getTypeList',
      data: {
        sort: 'asc',
        type: this.data.type,
        page: this.data.page,
        len: 10,
        company: this.data.obj.name,
      },
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var len = this.data.list.length;
        var arry = res.data.data;
        this.setData({
          others: res.data.others
        })
        if (arry.length > 0) {
          for (var c = 0; c < arry.length; c++) {
            var index = len + c;
            this.setData({
              ["list[" + index + "]"]: arry[c],
            })
          };
          this.data.page = this.data.page + 1
        };
        this.setData({
          display: true
        })
      } else {
        this.setData({
          display: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.data.obj = getApp().globalData.arry;
    this.data.type = options.type;
    wx.setNavigationBarTitle({
      title: getApp().globalData.arry.name,
    })
    this.setData({
      name: title({
        'record': record,
        'type': options.type
      })
    })
    this.getData();
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
    this.data.page = 1;
    this.setData({
      list: []
    })
    this.getData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})