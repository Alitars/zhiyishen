const main_Url = getApp().globalData.main_Url;
const time = require("../../../utils/util.js");
import Dialog from '../../../dist/dialog/dialog';
import Notify from '../../../dist/notify/notify';
import contrast from '../../../template/template.js';
import Toast from '../../../dist/toast/toast';
import NetworkRequest from '../../../template/network.js';
import setTime from '../../../template/setTime.js'
import func from '../../../template/func.js';
Page({
  data: {
    active: 0,
    value: '',
    id: 1,
    animationData: '',
    width: '',
    height: '',
    wid: '',
    show: '',
    high: '',
    dateStart: '',
    dateEnd: '',
    dateMax: new Date().getFullYear(),
    SafeButtom: '',
    history: [],
    recode: [],
    arry: [],
    rest: [],
    applyType: contrast.applyType,
    contrast: contrast.contrast,
    applyTypeId: '',
    list: [],
    display: true,
    index: 1,
    size: 10,
    block: true,
    focus: true,
    acid: '',
    page: 1,
    bottom: false
  },
  onSure() {
    var acid = this.data.acid;
    this.setData({
      id: acid,
      list: [],
      index: 1,
      active: acid,
    })
    this.onSearch(1, 10, acid - 1)
    this.onClose();
    this.anima(acid, true);
  },
  setValue(e) {
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    var history = this.data.history;
    var recode = this.data.recode;
    this.setData({
      focus: false,
    })
    setTime(300).then(res => {
      if (type == 1) {
        this.setData({
          value: history[id]
        })
      } else {
        this.setData({
          value: recode[id]
        })
      };
      this.onSearch();
    })
  },
  onClear() {
    this.setData({
      list: [],
      value: '',
      page: 1,
    })
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
  onTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },
  onDelet() {
    Dialog.confirm({
      title: '提示',
      message: '是否删除历史记录'
    }).then(() => {
      wx.setStorageSync('history', []);
      this.setData({
        history: [],
      })
    }).catch(() => { });
  },

  onHistory(e) {
    var history = this.data.history;
    if (history.length == 0) {
      var arry = [];
      arry.push(e);
      this.setData({
        history: arry,
      });
      wx.setStorageSync('history', this.data.history);
    } else {
      if (history.indexOf(e) == -1) {
        history.push(e)
      };
      this.setData({
        history: history,
      });
      wx.setStorageSync('history', this.data.history);
    };
  },
  onCheck(e) {
    var id = e.currentTarget.dataset.id;
    var check = this.data.applyType.slice(0, this.data.applyType.length);
    if (check[id].isSelect == false) {
      check[id].isSelect = true;
      this.setData({
        applyType: check,
      });
    } else {
      check[id].isSelect = false;
      this.setData({
        applyType: check,
      });
    };
    this.onId();
  },
  //检索id
  onId() {
    var check = this.data.applyType.slice(0, this.data.applyType.length);
    var arry = [];
    for (var i = 0; i < check.length; i++) {
      if (check[i].isSelect == true) {
        arry.push(JSON.parse(check[i].id))
      };
    };
    var id = arry.join(',');
    this.setData({
      applyTypeId: id,
    });
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
    if (!e.detail) {
      this.setData({
        list: [],
        value: '',
        page: 1,
      })
    };
  },
  onRest() {
    var check = this.data.applyType.slice(0, this.data.applyType.length);
    for (var i = 0; i < check.length; i++) {
      if (check[i].isSelect == true) {
        check[i].isSelect = false;
      };
    };
    this.setData({
      applyType: check,
      applyTypeId: '',
    })
  },
  onClose() {
    this.setData({
      show: !this.data.show,
    })
  },

  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },
  anima(e, check) {
    var wid = this.data.wid;
    var mg = wid / 100 * 20;
    if (!check) {
      var id = e.currentTarget.dataset.id;
    } else {
      var id = e;
    }
    if (id == 0) {
      this.setData({
        id: 1,
        list: [],
        index: 1,
        page: 1,
      });
      this.onSearch(1, 10, 1);
    };
    if (id == 1) {
      this.setData({
        id: 2,
        list: [],
        index: 1,
        page: 1,
      });
      this.onSearch(1, 10, 2);
    };
    if (id == 2) {
      this.setData({
        id: 3,
        list: [],
        index: 1,
        page: 1,
      });
      this.onSearch(1, 10, 3);
    };
    if (id == 3) {
      this.setData({
        id: 4,
        list: [],
        index: 1,
        page: 1,
      });
      this.onSearch(1, 10, 4);
    };
    if (id == 4) {
      this.data.acid = this.data.id - 1;
      this.onClose();
      this.setData({
        id: 4,
        list: [],
        index: 1,
        page: 1,
      });
    };
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });
    this.animation = animation;
    animation.translateX(id * mg).step(({
      duration: 300,
    }));
    this.setData({
      animationData: this.animation.export(),
    });
  },
  getInfo() {
    var info = getApp().globalData.sysinfo;
    this.setData({
      wid: info.windowWidth,
      high: info.screenHeight,
      SafeButtom: info.statusBarHeight,
    });
  },
  getData() {
    this.getHotData();
    this.getInfo();
  },
  bindDateChange(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      this.setData({
        dateStart: e.detail.value,
      });
    };
    if (id == 2) {
      this.setData({
        dateEnd: e.detail.value,
      });
    };
  },
  onSearch(index, size, e) {
    var bottom = this.data.bottom;
    if (bottom === false) {
      this.setData({
        list: []
      });
    };
    this.setData({
      display: false,
    });
    if (!index || !size) {
      var index = 1;
      var size = 10;
    };
    if (e) {
      var type = e;
    } else {
      var type = this.data.id;
    };
    var dateStart = this.data.dateStart;
    var dateEnd = this.data.dateEnd;
    var value = this.data.value;
    var display = this.data.display;
    if (!value) {
      this.notify('请先输入');
      return;
    } else {
      this.onHistory(value);
    };
    if (!dateStart || !dateEnd) {
      var time = '';
    } else {
      var time = dateStart + '至' + dateEnd;
    };
    if (!this.data.applyTypeId) {
      var cate_id = '';
    } else {
      var cate_id = this.data.applyTypeId;
    };
    if (display) {
      this.toast();
    };
    NetworkRequest({
      url: '/getdata',
      data: {
        type: type,
        date: time,
        cate_id: cate_id,
        keywords: value,
        index: bottom ? index : 1,
        size: size,
        status: '',
      },
    }).then(res => {
      var arry = res.data.data;
      if (bottom) {
        var contrast = this.data.contrast;
        var length = this.data.list.length;
        if (arry.length > 0) {
          for (var c = 0; c < arry.length; c++) {
            for (var s = 0; s < contrast.length; s++) {
              if (arry[c].IntCls == contrast[s].id) {
                arry[c].genre = contrast[s].name;
              };
            };
            var index = length + c;
            this.setData({
              ["list[" + index + "]"]: arry[c],
            })
          };
          this.data.page++;
        };
      } else {
        var contrast = this.data.contrast;
        var length = this.data.list.length;
        if (arry.length > 0) {
          for (var c = 0; c < arry.length; c++) {
            for (var s = 0; s < contrast.length; s++) {
              if (arry[c].IntCls == contrast[s].id) {
                arry[c].genre = contrast[s].name;
              };
            };
          };
          this.setData({
            list: arry
          })
          this.data.page = 1;
        }
      }
      Toast.clear();
      this.setData({
        display: true,
      });
      Toast.clear();
      this.data.bottom = false
    }).catch(err => {
      Toast.clear();
      this.notify("请求失败");
    })
  },
  getHotData() {
    var hotArry = wx.getStorageSync('hotArry');
    if (hotArry) {
      this.setData({
        recode: hotArry,
        history: wx.getStorageSync('history'),
      })
    };
    NetworkRequest({
      url: '/searchhot',
      data: {},
    }).then(res => {
      this.setData({
        recode: res.data.data,
      });
      wx.setStorageSync('hotArry', res.data.data);
    })
  },
  notify(e) {
    Notify({
      text: e,
      duration: 1000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    });
  },
  onDt(e) {
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    var list = this.data.list[index];
    wx.setStorageSync("list", list);
    var value = this.data.value;
    wx.navigateTo({
      url: '/pages/index/search/dt/dt?id=' + id + "&type=" + type + "&value=" + value,
    });
  },
  onClick(e) {
    if (e.detail.index) {
      Toast('敬请期待');
    } else {
      Toast.clear();
    }
  },
  onLoad: function (options) {
    this.getData();
    this.setData({
      value: options.id,
    });
  },
  onReachBottom: function () {
    this.data.bottom = true;
    var page = this.data.page;
    var size = this.data.size;
    var id = this.data.id;
    this.data.index = page;
    this.onSearch(page, size, id);
  },
})