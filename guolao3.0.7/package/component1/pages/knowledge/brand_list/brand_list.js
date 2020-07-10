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
    type: 0,
    page: 1,
    list: [],
    value: '',
    name: '',
    brand: 0,
    display: false
  },
  onChange(e) {
    this.setData({
      value: e.detail
    })
  },
  onClick(e) {
    var list = this.data.list;
    var index = e.currentTarget.dataset.index;
    var num = list[index].num;
    getApp().globalData.arry = list[index];
    if (num) {
      wx.navigateTo({
        url: '/package/component1/pages/knowledge/agency_list/agency_list?type=' + this.data.type,
      })
    } else {
      Toast('暂无商标')
    };
  },
  onSearch() {
    var value = this.data.value.replace(/\s+/g, "");
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
        type: this.data.type,
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
  getData(event) {
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
      url: '/assets/companyList',
      data: {
        sort: 'asc',
        type: event,
        page: this.data.page,
        len: 15
      },
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var len = this.data.list.length;
        var arry = res.data.data.data;
        if (arry.length > 0) {
          this.setData({
            brand: res.data.data.count
          })
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
    this.data.type = options.type;
    wx.setNavigationBarTitle({
      title: title({
        'record': record,
        'type': options.type
      }),
    })
    this.setData({
      name: title({
        'record': record,
        'type': options.type
      })
    })
    this.getData(options.type)
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
    this.getData(this.data.type);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData(this.data.type);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})