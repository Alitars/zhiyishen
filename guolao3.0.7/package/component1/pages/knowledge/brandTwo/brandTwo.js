// package/component1/pages/knowledge/brand_list/brand_list.js
import selectQuery from '../../../../../template/selectQuery';
import NetworkRequest from '../../../../../template/network.js';
import setTime from '../../../../../template/setTime.js';
import Toast from '../../../../../dist/toast/toast';
// /assets/getTypeList
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    // obj: {},
    name:'',
    // display:false,
    page: 1,
    list: [],
    value: '',
    others: 0,
    display: false
  },
  onDt(t) {
    var a = t.currentTarget.dataset.id,
      e = t.currentTarget.dataset.type,
      i = t.currentTarget.dataset.index,
      s = this.data.list[i];
    wx.setStorageSync("list", s);
    var n = this.data.value;
    wx.navigateTo({
      url: "/pages/index/search/dt/dt?id=" + a + "&type=" + e + "&value=" + n
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
        type: '',
        page: this.data.page,
        len: 10,
        company: this.data.name,
        cate: "patent"

//         sort: asc
// type: 
// page: 1
// len: 10
// cate: patent
// company: 阿里巴巴
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
    // console.log(getApp().globalData.arry);
    this.data.name = getApp().globalData.DataStr;
    // wx.setNavigationBarTitle({
    //   title: getApp().globalData.DataStr,
    // })
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