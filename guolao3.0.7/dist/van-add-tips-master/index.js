import setTime from '../../template/setTime.js';
Component({
  properties: {
    text: {
      type: String,
      value: '点击「添加小程序」，下次访问更便捷'
    },
    duration: {
      type: Number,
      value: 20
    }
  },
  data: {
    SHOW_TOP: false,
    menu: getApp().globalData.menu,
    text: '点击「添加小程序」，下次访问更便捷',
  },
  ready: function() {
    var cache = wx.getStorageSync('tost');
    if (!cache) {
      var cache = 0
    };
    if (cache > 5) {
      return
    };
    this.setData({
      SHOW_TOP: true
    });
    setTime(4000).then(res => {
      this.setData({
        text: '点击「发送给朋友」，好友也能一起用',
      });
    });
    var time = setTimeout(() => {
      this.setData({
        SHOW_TOP: false
      });
      wx.setStorageSync('tost', cache + 1);
      clearTimeout(time);
    }, this.data.duration * 1000);
  },
  methods: {},
})