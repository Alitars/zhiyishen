// tui jian setData
import Toast from '../dist/toast/toast';
export default function update(res) {
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  wx.showLoading({
    title: '加载中...',
    duration: 1500,
    mask: true
  });
  var data = res.arry;
  var len = data.length;
  data.sort(function (x, y) {
    return x.num - y.num
  });
  for (var i = 0; i < len; i++) {
    data[i].sec.sort(function (x, y) {
      return x.num - y.num
    });
    for (var s = 0; s < data[i].sec.length; s++) {
      data[i].sec[s].checked = false;
      data[i].firstIndex = i;
      data[i].sec[s].firstIndex = i;
      data[i].sec[s].twoIndex = s;
    };
  };
  var timer = setInterval(function () {
    if (len == _this.data[res.data].length) {
      clearInterval(timer);
      Toast.clear();
      return
    } else {
      var arry = _this.data[res.data];
      var newLen = arry.length;
      var list = data.slice(newLen, 2 + newLen);
      _this.setData({
        [res.data]: arry.concat(list)
      })
    }
  }, 200)
}