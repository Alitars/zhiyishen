//tui jian progress
import setTime from './setTime.js';
export default function progress() {
  var time = setInterval(function() {
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    var percent = _this.data.percent;
    var time = Math.ceil(Math.random() * 150);
    if (time < 20) {
      var time = 100;
    };
    setTime(time || 100).then(res => {
      var num = Math.floor(Math.random() * 10 + 1);
      if (percent <= 99) {
        if (percent == _this.data.percent) {
          if (num < 4) {
            if ((_this.data.percent + num) <= 99) {
              _this.setData({
                percent: percent + num
              })
            }
          }
        }
      } else {
        clearInterval(time);
      }
    })
  }, Math.ceil(Math.random() * 150) || 100);
}