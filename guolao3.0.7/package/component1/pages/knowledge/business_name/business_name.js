import NetworkRequest from '../../../../../template/network';
import func from '../../../../../template/func';
import Toast from '../../../../../dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    customItem: [],
    commpany: ['有限公司', '合伙企业'],
    commpanyItem: 0,
    valueOne: '',
    valueTwo: '',
    tradeItem: '',
    trade: [],
    arry: [],
    level: 0,
  },
  //省市区
  bindRegionChange(e) {
    // console.log(e);
    this.setData({
      region: e.detail.value,
    });
  },
  bindPickerCommpany(e) {
    var value = this.data.commpany[e.detail.value];
    this.setData({
      commpanyItem: e.detail.value,
    })
  },
  onInput(e) {
    this.setData({
      [e.currentTarget.dataset.id == 1 ? 'valueOne' : 'valueTwo']: e.detail.value.replace(/\s+/g, "")
    })
  },
  onGS() {
    this.onCheck();
  },
  onCheck() {
    var trade = this.data.trade;
    if (trade.length == 0) {
      Toast('加载失败，请下拉刷新下后重试');
      return;
    };
    var city = this.data.region[1] ? this.data.region[1] : '';
    var valueTwo = this.data.valueTwo ? this.data.valueTwo.replace(/\s+/g, "") : '';
    var tradeItem = this.data.tradeItem;
    if (city == '') {
      Toast('请选择您的注册城市');
      return;
    };
    if (valueTwo == '') {
      Toast('请输入公司名称');
      return;
    };
    if (tradeItem == '') {
      Toast('请选择您的行业类型');
      return;
    };
    wx.showLoading({
      title: '检测中...',
      mask: true,
    })
    NetworkRequest({
      url: '/companyCheckName',
      data: {
        words: valueTwo,
        city: city,
        business_scope: tradeItem,
      },
      method: 'POST',
    }).then((res) => {
      wx.hideLoading();
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        this.data.arry = arry;
        this.data.level = res.data.level;
        if (arry.length > 0) {
          wx.navigateTo({
            url: '/package/component1/pages/knowledge/business_name/dt/dt',
          })
        } else {
          this.data.level = 0;
          this.data.arry = [];
          Toast('暂无数据')
        }
      }
    })
  },
  bindPickerTrade(e) {
    // console.log(e);
    var trade = this.data.trade;
    var index = e.detail.value;
    wx.showToast({
      title: trade[index],
      icon: 'none',
      duration: 3000,
    })
    this.setData({
      tradeItem: trade[index]
    })
  },

  getData() {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    NetworkRequest({
      url: '/industry',
      data: {},
      method: 'POST',
    }).then((res) => {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      if (res.data.code == 1) {
        this.setData({
          trade: res.data.data
        })
      }
    }).catch((err) => {
      wx.stopPullDownRefresh();
      wx.hideLoading();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getData();
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