import NetworkRequest from '../../../../../template/network.js';
Page({
  data: {
    display: false,
    list: [],
    firstnum: '',
    page: 1,
    group: '',
    keywords: '',
  },
  onPageScroll(e) {
    var id = e.scrollTop;
    var block = this.data.block;
    if (id > 600 && block == true) {
      this.setData({
        block: false,
      });
    };
    if (id < 500 && block == false) {
      this.setData({
        block: true,
      });
    };
  },
  onDt(e) {
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    var list = this.data.list[index];
    wx.setStorageSync("list", list);
    var value = this.data.keywords;
    wx.navigateTo({
      url: '/pages/index/search/dt/dt?id=' + id + "&type=" + type + "&value=" + value,
    });
  },
  onTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },
  getData() {
    this.setData({
      display: false,
    })
    NetworkRequest({
      url: '/likeselect',
      data: {
        group: this.data.group,
        cate_id: this.data.firstnum,
        type: 4,
        text: this.data.keywords,
        size: 10,
        index: this.data.page,
      },
    }).then(res => {
      var code = res.data.code;
      var list = this.data.list;
      var arry = res.data.data;
      var code = res.data.code;
      var s = list.length;
      if (code == 1) {
        this.setData({
          display: true,
        });
        for (var c = 0; c < arry.length; c++) {
          var index = s + c;
          this.setData({
            ["list[" + index + "]"]: arry[c],
          });
        };
        if (res.data.data.length > 0) {
          this.data.page++;
        };
      };
    }).catch(err => {});
  },
  onLoad: function(options) {
    this.data.firstnum = options.firstnum;
    console.log(options);
    var group = options.group;
    if (group.length == 3) {
      group = '0' + group
    }
    this.data.group = group;
    this.setData({
      keywords: options.name
    })
    this.getData();
  },
  onReachBottom: function() {
    this.setData({
      display: false,
    })
    this.getData();
  },

})