import setEcharts from '../../template/setEcharts.js';
import option from '../../template/template.js';
import setTime from './../../../../../template/setTime.js';
import NetworkRequest from '../../../../../template/network.js';
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
    console.log(xData);
    var record = [{
      text1: '商标总数',
      text2: event.total,
    }, {
      text1: '已注册商标',
      text2: event.zc_total,
    }, {
      text1: '等待实质审查 ',
      text2: event.wait_total,
    }, {
      text1: '初审公告',
      text2: event.cs_total,
    }, {
      text1: '异议中',
      text2: event.yy_total,
    }, {
      text1: '商标无效',
      text2: event.wx_total,
    }, ];
    var list = option.pie;
    var nameData = [];
    this.setData({
      record: record,
      year: xData.length,
      AgentName: event.agent.AgentName,
    });
    console.log(yData, 'asas')
    list.series[0].data = seriesData;
    var color = [];
    for (var i = 0; i < xData.length; i++) {
      var R = Math.floor(Math.random() * (255 - 0));
      var G = Math.floor(Math.random() * (255 - 0));
      var B = Math.floor(Math.random() * (255 - 0));
      var colorItem = 'rgb(' + R + ',' + G + ',' + B + ')';
      color[i] = colorItem;
      nameData.push('第' + JSON.stringify(xData[i]) + '类' + '：' + yData[i] + '个');
    };
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
      console.log(i)
      xData.push(typeof (i) == 'string' ? i : i)
    };
    list.xAxis[0].data = xData;
    list.series[0].data = yData;
    var colorList = [{
      startColor: '#fe9b86',
      endColor: '#f15887',
    }, {
      startColor: '#2dc9eb',
      endColor: '#14d2b8',
    }, {
      startColor: '#4048ef',
      endColor: '#5a7bef',
    }, {
      startColor: '#DBBBA6',
      endColor: '#FF7F27',
    }, {
      startColor: '#D6B1D6',
      endColor: '#A349A4',
    }, ];
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