import setEcharts from '../../../../../template/setEcharts';
import option from '../../../../../template/template.js';
import Dialog from '../../../../../dist/dialog/dialog';
import Notify from '../../../../../dist/notify/notify';
import contrast from '../../../../../template/template.js';
import Toast from '../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../template/network.js';
import setTime from '../../../../../template/setTime.js'
import func from '../../../../../template/func.js';
Page({
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    ecShow: false,
    doubleShow: false,
    ec: {
      onInit: {},
    },
    double: {
      onInit: {}
    },
    record: [],
    num: 0,
    AgentName: [],
    year: '',
  },
  onDtails(e) {
    if (!getApp().globalData.userid) {
      Toast('请登录')
      return;
    };

    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/package/component1/pages/knowledge/brand_list/brand_list?type=' + index,
    })
  },
  onCreat(event) {


  },
  onCompanny() {
    if (!getApp().globalData.userid) {
      Toast('请登录')
      return;
    };
    wx.navigateTo({
      url: '/package/component1/pages/knowledge/company_list/company_list',
    })
  },
  getData() {

    // return;
    var list = option.option;
    var start = new Date().getTime();
    wx.showLoading({
      title: '加载中...'
    });
    NetworkRequest({
      url: '/assets/companyList',
      data: {
        company: '',
        sort: 'desc',
      },
    }).then((e) => {
      var arry = e.data.data.data;
      if (e.data.code == 1) {
        this.setData({
          AgentName: arry.length > 0 ? arry.slice(0, 10) : []
        })
      }
    });
    NetworkRequest({
      url: '/assets/index',
      data: {
        company: '',
      },
      method: "POST",
    }).then((res) => {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      var xData = [];
      var yData = [];
      var number = res.data.data.number;
      var arry = res.data.data;
      for (var i in number) {
        yData.push(number[i]);
        xData.push(typeof (i) == 'string' ? JSON.parse(i) : i)
      };
      list.xAxis[0].data = xData;
      list.series[0].data = yData;

      var colorList = func.colorCreate({
        'gradient': true,
        'number': xData.length,
      })

      var x = [];

      for (var i = 0; i < 30; i++) {
        for (var s = 0; s < colorList.length; s++) {
          if (x.length <= xData.length) {
            x.push(colorList[s])
          }
        }
      };
      // 类型：0=>'全部' 1=>'商标已注册',2=>'等待实质审查',3=>'初审公告',4=>'异议中',5=>'商标无效',6=>'驳回复审中' 7=》'续展' 
      // 1=>注册   5=》无效   7=》商标续展  8=》申请中  9=》宽展

      var record = [{
        text1: '商标总数',
        text2: arry.total,
        id: 0,
      }, {
        text1: '已注册商标',
        text2: arry.zc_total,
        id: 1,
      }, {
        text1: '申请中商标',
        text2: arry.app_total,
        id: 8,
      }, {
        text1: '续展期中商标',
        text2: arry.xz_total,
        id: 7,
      }, {
        text1: '宽展中商标',
        text2: arry.k_total,
        id: 9,
      }, {
        text1: '无效商标',
        text2: arry.wx_total,
        id: 5,
      }, ];
      this.setData({
        record: record,
        year: xData.length,
      });
      list.series[0].itemStyle.normal.color = function (params) {
        var colorArry = [];
        colorArry[params.dataIndex] = {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: x[params.dataIndex].endColor
          }, {
            offset: 1,
            color: x[params.dataIndex].startColor
          }],
          global: false
        };
        return colorArry[params.dataIndex]
      }, 
      setEcharts({
        option: list,
        setStr: 'ec'
      })
    }).catch((err) => {})
  },
  onLoad: function () {},
  onReady: function () {},
  onShow: function () {
    this.getData()
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    this.getData()
  },
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})