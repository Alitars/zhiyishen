/**
 * 大转盘指针
 * @author qiao
 * @version 2017/12/30
 */
function Circle(x, y, radius, wheel) {
  this.x = x;
  this.y = y;
  this.width = 0;
  this.height = 0;
  this.radius = radius;
  this.rotation = 0;
  this.img = null;
  this.scaleX = 1;
  this.scaleY = 1;
  this.inputEvent = false;
  this.onInputDown = null;
  this.wheel = wheel;
}

Circle.prototype.draw = function (context) {
  // 保存
  context.save();
  // 移动到圆心
  context.translate(this.x, this.y);
  // 旋转
  context.rotate(this.rotation);
  // 缩放
  // context.scale(this.scaleX, this.scaleY);

  if (this.img) {
    var imgX = -this.width / 2;
    var imgY = -this.height / 2;
    context.drawImage(this.img, imgX, imgY);
  }

  // 指针
  context.beginPath()
  context.setFillStyle('#FA6248')
  context.moveTo(0, (this.radius +60) * -1);
  context.lineTo(-25, -30);
  context.lineTo(25, -30);
  context.fill()

  // 圆盘
  context.beginPath()
  context.setFillStyle('#FB8D76')
  context.arc(0, -50, this.radius-8, 0, 2 * Math.PI)
  context.fill()

  // 文字
  context.setFontSize(16)
  context.setFillStyle('#ffffff')
  context.setTextAlign("center");
  context.fillText('抽奖', 0,-35)
  context.fillText('立即', 0,-55)

  var r = this.wheel.radius;
  // 跑马灯外框  F6D000  FFA200
  context.beginPath()
  context.setLineWidth(15);
  context.setStrokeStyle("#FC5A46")
  context.arc(0, -50, r + 20, 0, 2 * Math.PI)
  context.stroke()

  // 跑马灯内框 F6D000
  context.beginPath()
  context.setLineWidth(10);
  context.setStrokeStyle("#E74B44")
  context.arc(0, -50, r + 8, 0, 2 * Math.PI)
  context.stroke()

  // 跑马灯灯  
 
  for (var i = 0; i < 32; i++) {
    context.beginPath()
    context.setFillStyle(i % 2 == 0 ?  "#ffffff" : "#FFF7AF")
    context.arc(r + 10, 0, 4, 0, 2 * Math.PI)
    context.fill()
    context.translate(-10,-1);
    context.rotate((360 / 32) * Math.PI / 180);
  }
  // 还原
  context.restore();
};

Circle.prototype.scale = function (x, y) {
  this.scaleX = x;
  this.scaleY = y;
};

Circle.prototype.contains = function (obj) {
  return Circle.contains(this, obj.x, obj.y);
};

Circle.contains = function (a, x, y) {
  //  Check if x/y are within the bounds first
  var x = x;
  var y = y+50
  if (a.radius > 0 && x >= a.left && x <= a.right && y >= a.top && y<= a.bottom) {
    var dx = (a.x - x) * (a.x - x);
    var dy = (a.y - y) * (a.y - y);

    return (dx + dy) <= (a.radius * a.radius);
  }
  else {
    return false;
  }
};

Object.defineProperty(Circle.prototype, "left", {
  get: function () {
    return this.x - this.radius;
  },

  set: function (value) {
    if (value > this.x) {
      this.radius = 0;
    }
    else {
      this.radius = this.x - value;
    }
  }
});

Object.defineProperty(Circle.prototype, "right", {

  get: function () {
    return this.x + this.radius;
  },

  set: function (value) {
    if (value < this.x) {
      this.radius = 0;
    }
    else {
      this.radius = value - this.x;
    }
  }
});

Object.defineProperty(Circle.prototype, "top", {
  get: function () {
    return this.y - this.radius;
  },

  set: function (value) {
    if (value > this.y) {
      this.radius = 0;
    }
    else {
      this.radius = this.y - value;
    }
  }
});

Object.defineProperty(Circle.prototype, "bottom", {
  get: function () {
    return this.y + this.radius;
  },
  set: function (value) {
    if (value < this.y) {
      this.radius = 0;
    }
    else {
      this.radius = value - this.y;
    }
  }
});

module.exports = Circle;