import selectQuery from '../../../../../template/selectQuery';
import NetworkRequest from '../../../../../template/network.js';
import setTime from '../../../../../template/setTime.js';
import Toast from '../../../../../dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    type: 0,
    page: 1,
    list: [],
    value: '',
    index: 0,
    brand: 0,
    display: true
  },
  onChange(e) {
    this.setData({
      value: e.detail
    })
  },
  onClick(e){
    // var name = e.cu
    // console.log(e);
    var name = e.currentTarget.dataset.name;
    //找个全局用
    getApp().globalData.DataStr = name;
    wx.navigateTo({
      url: '/package/component1/pages/knowledge/organization_list/brand/brand',
    })
  },
  onClick1(e){
    var name = e.currentTarget.dataset.name;
    //找个全局用
    getApp().globalData.DataStr = name;
    wx.navigateTo({
      url: '/package/component1/pages/knowledge/brandTwo/brandTwo',
    })
  },
  onSearch() {
    var value = this.data.value.replace(/\s+/g, "");
    // console.log(value);
    if (value == '') {
      Toast('请输入企业名称');
      return;
    };
    wx.showLoading({
      title: '搜索中...',
    });
    NetworkRequest({
      url: '/assets/companyList',
      data: {
        sort: 'asc',
        page: 1,
        len: 100000,
        company: value
      }
    }).then((res) => {
      if (res.data.code == 1) {
        if (res.data.data.data.length > 0) {
          this.setData({
            page: 1,
            list: res.data.data.data
          })
        } else {
          this.setData({
            page: 1,
            list: []
          })
          Toast('暂无结果');
        };
      } else {
        this.setData({
          page: 1,
          list: []
        })
        Toast(res.data.msg)
      }
    })
  },

  onPageScroll(e) {
    selectQuery('fixed').then((res) => {
      if (res[0].top < 0 && this.data.show == true) {
        this.setData({
          show: false
        })
      } else {
        if (res[0].top > 0 && this.data.show == false) {
          this.setData({
            show: true
          })
        }
      }
    })
  },
  getData() {
    //本地懒加载 
    if (this.data.display == true) {
      this.setData({
        display: false
      });
      if (this.data.list.length >= 500) {
        this.setData({
          list: [],
        })
        Toast('已为您更新当前：第' + this.data.page + 1 + '页');
      };
      var len = this.data.list.length;
      var index = this.data.index;
      var arry = JSON.parse(JSON.stringify(getApp().globalData.arry)).slice(index, index + 10);
      if (arry.length > 0) {
        for (var c = 0; c < arry.length; c++) {
          var index = len + c;
          this.setData({
            ["list[" + index + "]"]: arry[c],
          })
          this.data.index += 1
        };
        this.setData({
          display: true
        })
      };
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      brand: getApp().globalData.arry.length,
    });
    this.getData()
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
    this.data.index = 0;
    this.setData({
      list: []
    })
    this.getData();
    setTime(1000).then(()=>{
      wx.stopPullDownRefresh();
    })
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