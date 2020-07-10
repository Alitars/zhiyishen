//平移动画
export default function animated(res) {
  "use strict";
  var pages = getCurrentPages(),
    _this = pages[pages.length - 1],
    animat = wx.createAnimation({
      duration: 1e3,
      timingFunction: "ease"
    });
  _this.animation = animat, 0 == res ? _this.animation.translateX(0).step({
    duration: 300
  }) : _this.animation.translateX(res).step({
    duration: 300
  }), _this.setData({
    animationData: _this.animation.export()
  });
}