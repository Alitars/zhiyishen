export default function route(url) {
  var pages = getCurrentPages();
  var arry = [];
  for (var i = 0; i < pages.length; i++) {
    arry.push(pages[i].route);
  };
  if (arry.indexOf(url) == -1) {
    wx.navigateTo({
      url: '/' + url,
    })
  }
}