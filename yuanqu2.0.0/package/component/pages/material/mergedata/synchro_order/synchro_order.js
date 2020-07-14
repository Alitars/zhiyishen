const info = getApp().globalData.sysinfo;
Page({
  data: {
    SafeButtom: info.statusBarHeight * 4,
    order: [],
    icon_Url: getApp().globalData.icon_Url,
    checked: false
  },
  onBack() {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    PrePage.setData({
      order: this.data.order,
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  onCecked(e) {
    var id = e.currentTarget.dataset.id;
    var order = this.data.order;
    for (var i = 0; i < order.length; i++) {
      if (id == order[i].id) {
        if (order[i].isSelect) {
          this.setData({
            ["order[" + i + "].isSelect"]: false
          })
        } else {
          this.setData({
            ["order[" + i + "].isSelect"]: true
          })
        }
        break;
      }
    }
    this.onChange();
  },
  onChooseAll() {
    var order = this.data.order;
    var checked = this.data.checked;
    for (var i = 0; i < order.length; i++) {
      if (checked) {
        order[i].isSelect = false
      } else {
        order[i].isSelect = true
      }
    }
    if (checked) {
      var checked = false
    } else {
      var checked = true
    }
    this.setData({
      order: order,
      checked: checked
    })
  },
  onChange() {
    var order = this.data.order;
    var ss = [];
    for (var i = 0; i < order.length; i++) {
      ss.push(order[i].isSelect)
    }
    if (ss.indexOf(false) >= 0) {
      var checked = false
    } else {
      var checked = true
    }
    this.setData({
      checked: checked
    })
  },
  onLoad: function(options) {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    this.setData({
      order: PrePage.data.order
    })
  },
  onShow: function() {
    this.onChange();
  },
})