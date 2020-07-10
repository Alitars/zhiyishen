import setEcharts from '../../../../../template/setEcharts';
import option from '../../../../../template/template.js';
import setTime from './../../../../../template/setTime.js';
import NetworkRequest from '../../../../../template/network.js';
import func from '../../../../../template/func';
Page({
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    ecShow: false,
    doubleShow: false,
    year: '',
    ec: {
      onInit: {},
    },
    double: {
      onInit: {}
    },
    record: [],
    title: '',
    options: {},
    record: [],
    AgentName: [],
  },
  onDtails(e) {
    var index = e.currentTarget.dataset.index;
    // var title = this.data.options.title;
    wx.navigateTo({
      url: '/pages/knowledge/trademark/trademark?title=' + true + '&type=' + index,
    })
  },
  onCreat1(event) {
    var xData = [];
    var yData = [];
    var IntCls = event.brandType.IntCls;
    var seriesData = [];
    for (var i = 0; i < IntCls.length; i++) {
      xData.push(IntCls[i].Value);
      xData[i] = typeof (xData[i]) == 'string' ? xData[i] : xData[i];
      yData.push(IntCls[i].Count);
      seriesData[i] = {
        value: yData[i],
        name: '第' + xData[i] + '类'
      }
    }

    var record = [{
      text1: '商标总数',
      text2: event.total,
      id: 0,
    }, {
      text1: '已注册商标',
      text2: event.zc_total,
      id: 1,
    }, {
      text1: '申请中商标',
      text2: event.app_total,
      id: 8,
    }, {
      text1: '续展期中商标',
      text2: event.xz_total,
      id: 7,
    }, {
      text1: '宽展中商标',
      text2: event.k_total,
      id: 9,
    }, {
      text1: '无效商标',
      text2: event.wx_total,
      id: 5,
    }, ];

    // console.log(xData);
    // var record = [{
    //   text1: '商标总数',
    //   text2: event.total,
    // }, {
    //   text1: '已注册商标',
    //   text2: event.zc_total,
    // }, {
    //   text1: '等待实质审查 ',
    //   text2: event.wait_total,
    // }, {
    //   text1: '初审公告',
    //   text2: event.cs_total,
    // }, {
    //   text1: '异议中',
    //   text2: event.yy_total,
    // }, {
    //   text1: '商标无效',
    //   text2: event.wx_total,
    // }, ];
    var list = option.pie;
    var nameData = [];
    this.setData({
      record: record,
      year: xData.length,
      AgentName: event.agent.AgentName,
    });
    // console.log(yData, 'asas')
    list.series[0].data = seriesData;
    var color = [];
    for (var i = 0; i < xData.length; i++) {
      nameData.push('第' + JSON.stringify(xData[i]) + '类' + '：' + yData[i] + '个');
    };

    var color = func.colorCreate({
      'gradient': false,
      'number': xData.length,
    })

    list.legend.data = nameData;
    list.series[0].itemStyle.normal.color = function (params) {
      return color[params.dataIndex]
    };
    list.series[0].itemStyle.label.color = function (params) {
      return color[params.dataIndex]
    };
    list.series[0].itemStyle.labelLine.color = function (params) {
      return color[params.dataIndex]
    };
    list.tooltip.formatter = function (params) {
      return nameData[params.dataIndex]
    };
    setEcharts({
      option: list,
      setStr: 'double'
    })
  },
  onCreat2(event) {
    var xData = [];
    var yData = [];
    var number = event.number;
    var arry = event;
    var list = option.option;
    for (var i in number) {
      yData.push(number[i]);
      // console.log(i)
      xData.push(typeof (i) == 'string' ? i : i)
    };
    list.xAxis[0].data = xData;
    list.series[0].data = yData;

    var colorList = func.colorCreate({
      'gradient': true,
      'number': xData.length,
    });

    var x = [];
    for (var i = 0; i < 30; i++) {
      for (var s = 0; s < colorList.length; s++) {
        if (x.length <= xData.length) {
          x.push(colorList[s])
        }
      }
    };
    
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
    }, setEcharts({
      option: list,
      setStr: 'ec'
    })
  },

  onClick() {
    var total = this.data.record[0].text2;
    function list(data) {
      for (var i = 0; i < data.length; i++) {
        data[i].p = (data[i].Count / total * 100).toFixed(2)
      };
      return data;
    };
    getApp().globalData.arry = list(this.data.AgentName);
    wx.navigateTo({
      url: '/package/component1/pages/knowledge/organization_list/organization_list',
    })
  },
  getData() {
    wx.showLoading({
      title: '加载中...'
    });
    NetworkRequest({
      url: '/assets/index',
      data: {
        company: this.data.options.title,
      },
      method: 'POST',
    }).then((res) => {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      if (res.data.code == '1') {
        this.onCreat1(res.data.data);
        this.onCreat2(res.data.data)
      }
    })
  },
  onLoad: function (options) {
    this.data.options = JSON.parse(JSON.stringify(options));
    this.getData();
    if (options.title.length > 7) {
      options.title = options.title.slice(0, 7) + '...'
    };
    this.setData({
      title: options.title
    })
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    this.getData();
  },
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})