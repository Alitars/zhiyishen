import setTime from './setTime.js';
export default function route(url) {
  setTime(url == "pages/user/log_on/log_on" ? 1500 : 50).then(res => {
    if (url == "pages/user/log_on/log_on") {
      var pages = getCurrentPages();
      var arry = [];
      for (var i = 0; i < pages.length; i++) {
        arry.push(pages[i].route);
      };
      if (arry.indexOf(url) == -1 || arry[arry.length - 1] !== url) {
        wx.navigateTo({
          url: '/' + url,
        })
      }
    } else {
      wx.navigateTo({
        url: '/' + url,
      })
    }
  })
}