import WxCanvas from '../dist/ec-canvas/wx-canvas';
import * as echarts from '../dist/ec-canvas/echarts';
import setTime from './template/../setTime';
let chart = null;
export default function initChart(event) {
  return new Promise((resolve, reject) => {
    // console.log(event);
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    var option = event.option;
    var setStr = event.setStr;
    _this.setData({
      [setStr + 'Show']: false,
    });
    var initChart = function (canvas, width, height, dpr) {
      chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      canvas.setChart(chart);
      chart.setOption(option);
      return chart;
    };
    setTime(10).then(() => {
      _this.setData({
        [setStr + 'Show']: true
      })
    });
    setTime(20).then(() => {
      _this.setData({
        [setStr]: {
          onInit: initChart,
        }
      });
      resolve(initChart);
    });
  });
}