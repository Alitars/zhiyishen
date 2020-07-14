//平移动画
export default function animated(res) {
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  var animat = wx.createAnimation({
    duration: 1000,
    timingFunction: 'ease',
  });
  _this.animation = animat
  if (res == 0) {
    _this.animation.translateX(0).step({
      duration: 300,
    })
  } else {
    _this.animation.translateX(res).step({
      duration: 300,
    })
  };
  _this.setData({
    animationData: _this.animation.export()
  })
}