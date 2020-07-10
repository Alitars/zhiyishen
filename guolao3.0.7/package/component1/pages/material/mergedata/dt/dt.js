const main_Url = getApp().globalData.main_Url;
const info = getApp().globalData.sysinfo;
import Notify from '../../../../../../dist/notify/notify';
import Toast from '../../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../../template/network.js';
import selectQuery from '../../../../../../template/selectQuery.js';
import setTime from '../../../../../../template/setTime.js';
Page({
  data: {
    activeNames: [],
    SafeButtom: info.statusBarHeight * 4,
    list: [],
    num: '',
    name: '',
    firstIndex: '',
    twoIndex: '',
    display: true,
    value: '',
    keywords: '',
    arry: [],
    len: '',
    index: '',
    title: [],
    numtwo: '',
    key: '',
    pass: false,
    options: {},
    ss: 0,
    show: false,
    newArry: [],
    open: false,
    value: '',
    newList: [],
  },
  onRetrieval(e) {
    var value = e.detail.replace(/\s+/g, "");
    if (!value) {
      this.setData({
        newList: [],
      })
      return;
    };
    var list = JSON.parse(JSON.stringify(this.data.list));
    var len = list.length;
    var newList = [];
    var m = value.length;
    for (var i = 0; i < len; i++) {
      var s = list[i].third.length;
      for (var n = 0; n < m; n++) {
        var str = value.slice(n, n + 1);
        for (var c = 0; c < s; c++) {
          if (list[i].third[c].name.indexOf(str) >= 0) {
            var x = newList.length;
            if (newList.indexOf(list[i].third[c]) == -1) {
              newList.push(list[i].third[c]);
            };
          };
        };
      };
    };
    if (newList.length > 0) {
      this.setData({
        newList: newList,
      });
      wx.hideToast({});
    } else {
      wx.showToast({
        title: '暂无数据',
        icon: 'none',
        duration: 1500,
      })
    };
  },
  onSelect(e) {
    var first = e.currentTarget.dataset.first;
    var two = e.currentTarget.dataset.two;
    var len = this.data.len;
    var arry = this.data.list.slice(0, this.data.list.length);
    var num = 0;
    for (var i = 0; i < arry.length; i++) {
      for (var s = 0; s < arry[i].third.length; s++) {
        if (arry[i].third[s].isSelect) {
          num++;
        };
      };
    };
    var check = arry[first].third[two].isSelect;
    if (num < len) {
      var pass = true;
    };
    if (num == len) {
      if (check) {
        var pass = true;
      } else {
        var pass = false;
      }
    }
    if (pass) {
      if (check) {
        var check = false
      } else {
        var check = true;
      };
      arry[first].third[two].isSelect = check;
      this.setData({
        ["list[" + first + "].third[" + two + "].isSelect"]: check,
      });
      this.onChecknum(arry);
    } else {
      this.notify('商品数量已满！');
    }
    var newList = this.data.newList;
    if (newList.length>0 && pass) {
      var index = e.currentTarget.dataset.index;
      var isSelect = newList[index].isSelect;
      this.setData({
        ['newList[' + index + '].isSelect']: !isSelect,
      });
    };
  },
  onChecknum(arry) {
    var ss = 0;
    for (var i = 0; i < arry.length; i++) {
      var len = 0;
      for (var s = 0; s < arry[i].third.length; s++) {
        if (arry[i].third[s].isSelect == true) {
          len++;
          ss++;
        }
      }
      this.setData({
        ["list[" + i + "].isSelect"]: len,
      })
    }
    this.setData({
      sum: ss,
    })
  },
  onChange() {
    var show = this.data.show;
    var arry = this.data.list;
    var newArry = [];
    if (!show) {
      for (var i = 0; i < arry.length; i++) {
        for (var s = 0; s < arry[i].third.length; s++) {
          if (arry[i].third[s].isSelect) {
            newArry.push(arry[i].third[s]);
          }
        }
      }
    };
    this.setData({
      show: !this.data.show,
      newArry: newArry
    })
  },
  onCheck(e) {
    var first = e.currentTarget.dataset.first;
    var two = e.currentTarget.dataset.two;
    var index = e.currentTarget.dataset.index;
    var arry = this.data.newArry;
    var list = this.data.list;
    var check = arry[index].isSelect;
    if (check) {
      var check = false;
    } else {
      var check = true;
    }
    list[first].third[two].isSelect = check;
    this.onChecknum(list);
    this.setData({
      ["newArry[" + index + "].isSelect"]: check,
      ["list[" + first + "].third[" + two + "].isSelect"]: check
    })
  },

  onFold(e) {
    var arry = this.data.list;
    var index = e.currentTarget.dataset.id;
    if (arry[index].show == true) {
      this.setData({
        ["list[" + index + "].show"]: false,
      })
      setTime(10).then(res => {
        wx.pageScrollTo({
          scrollTop: 60,
        })
      })
    } else {
      this.setData({
        ["list[" + index + "].show"]: true,
      });
      setTime(10).then(res => {
        selectQuery('the-id' + index).then(res => {
          wx.pageScrollTo({
            scrollTop: res[0].top + res[1].scrollTop,
          })
        })
      })
    };
  },

  onPageScroll(e) {
    var id = e.scrollTop;
    var display = this.data.display;
    if (id > 600 && display == true) {
      this.setData({
        display: false,
      })
    };
    if (id < 500 && display == false) {
      this.setData({
        display: true,
      })
    }
  },
  onTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  getData(e) {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var arry = PrePage.data.arry.twocateAll;
    var threenum = PrePage.data.arry.brand_update.three_array;
    var len = threenum.length;
    var sum = threenum.length;
    if (len <= 10) {
      var len = 10
    };
    var click_type = PrePage.data.arry.order.click_type;
    if (click_type == "普通商标注册") {
      var index = 1;
    };
    if (click_type == "三星商标注册") {
      var index = 2;
    };
    if (click_type == "四星商标注册") {
      var index = 2;
    };
    for (var i = arry.length - 1; i >= 0; i--) {
      arry[i].isShow = false;
      var ss = 0;
      for (var n = arry[i].third.length - 1; n >= 0; n--) {
        arry[i].third[n].firstIndex = i;
        arry[i].third[n].twoIndex = n;
        for (var c = threenum.length - 1; c >= 0; c--) {
          arry[i].third[n].isSelect = false;
          if (arry[i].third[n].id == threenum[c]) {
            ss++;
            arry[i].third[n].isSelect = true;
            break;
          };
        };
      };
      arry[i].isSelect = ss;
      if (ss > 0) {
        arry[i].isShow = true;
      } else {
        if (index == 2) {
          arry.splice(i, 1);
        };
      };
    };
    if (e.open == 'true') {
      this.setData({
        name: PrePage.data.name,
        three_brand: PrePage.data.three_brand,
        list: arry,
        len: len,
        sum: sum,
      })
    } else {
      this.setData({
        name: PrePage.data.cate_name,
        three_brand: PrePage.data.arry.brand_update.three_brand,
        list: arry,
        len: len,
        sum: sum,
      })
    };
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },
  notify(e) {
    Notify({
      text: e,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44'
    });
  },

  onUp() {
    this.toast();
    var options = this.data.options;
    var order_id = options.order_id;
    var token = wx.getStorageSync('token');
    var list = this.data.list;
    var len = this.data.len;
    var str1 = [];
    var str2 = [];
    for (var i = 0; i < list.length; i++) {
      for (var s = 0; s < list[i].third.length; s++) {
        if (list[i].third[s].isSelect) {
          str1.push(list[i].num);
          str2.push(list[i].third[s].id);
        }
      }
    }
    if (len <= 10) {

    } else {
      if (len !== str2.length) {
        this.notify('商品数不足' + len + '个！');
        Toast.clear();
        return;
      }
    }
    var two_cate = str1.join(',');
    var three_cate = str2.join(',');
    NetworkRequest({
      url: '/BrandUpload/editCategory',
      data: {
        order_id: order_id,
        two_cate: two_cate,
        three_cate: three_cate,
        token: token,
      },
      method: 'POST',
    }).then(res => {
      Toast.clear();
      var code = res.data.code;
      this.notify(res.data.msg);
      if (code = 1) {
        setTime(1500).then(res => {
          wx.navigateBack({
            delta: 1,
          })
        })
      }
    }).catch(err => {
      Toast.clear();
      this.notify('提交失败！');
    })
  },
  onLoad: function (options) {
    this.data.options = options;
    if (options.open == 'true') {
      var pages = getCurrentPages();
      var PrePage = pages[pages.length - 2];
      this.setData({
        name: PrePage.data.name,
        three_brand: PrePage.data.three_brand,
        open: true
      })
    } else {
      this.getData(options);
      this.setData({
        open: false
      })
    }

  }
})