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
      url:'/package/component1/pages/knowledge/tradePatent/tradePatent?type=' + index + '&title='+ this.data.title,
    })
  },
  onCreat1(event) {
    var xData = [];
    var yData = [];
    var IntCls = event.data;
    var seriesData = [];
    for (var i = 0; i < IntCls.length; i++) {
      xData.push(IntCls[i].source_name);
      xData[i] = typeof (xData[i]) == 'string' ? xData[i] : xData[i];
      yData.push(IntCls[i].num);
      seriesData[i] = {
        value: yData[i],
        name: IntCls[i].source_name
      }
    }
    
    var list = option.pie;
    var nameData = [];
    // console.log(yData, 'asas')
    list.series[0].data = seriesData;
    var color = [];
    for (var i = 0; i < xData.length; i++) {
      nameData.push(JSON.stringify(xData[i]) + '：' + yData[i] + '个');
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
    var record = [{
      text1: '专利总数',
      text2: event.total,
      id: 0,
    }, {
      text1: '已授权专利',
      text2: event.y_total,
      id: 1,
    }, {
      text1: '等待实质审查',
      text2: event.d_total,
      id: 4,
    }, {
      text1: '无权专利',
      text2: event.w_total,
      id: 2,
    },];
    
    var xData = [];
    var yData = [];
    var number = event.year;
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
    this.setData({
      record: record,
      year: xData.length,
      AgentName: event.agent,
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
        cate: "patent"
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