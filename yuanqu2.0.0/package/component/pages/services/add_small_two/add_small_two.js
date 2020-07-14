const main_Url = getApp().globalData.main_Url;
const info = getApp().globalData.sysinfo;
import Notify from '../../../../../dist/notify/notify';
import Toast from '../../../../../dist/toast/toast';
import applyType from '../../../../../template/template.js';
import NetworkRequest from '../../../../../template/network.js';
import selectQuery from '../../../../../template/selectQuery.js';
import setTime from '../../../../../template/setTime.js';
import canonical from '../../../../../template/canonical.js';
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
    index: '',
    title: [],
    applyType: applyType.applyType,
    pass: false,
    first: 0,
    nameStr: [],
  },
  onClick() {
    if (this.data.pass == true) {
      var arry = JSON.parse(JSON.stringify(this.data.arry));
      var applyType = JSON.parse(JSON.stringify(this.data.applyType));
      var list = JSON.parse(JSON.stringify(this.data.list));
      var num = this.data.num;
      for (var i = list.length - 1; i >= 0; i--) {
        var a = [];
        for (var n = 0; n < list[i].third.length; n++) {
          a.push(list[i].third[n].isSelect);
        };
        if (list[i].third.length > 0 && a.indexOf(true) >= 0) {
          for (var s = list[i].third.length - 1; s >= 0; s--) {
            if (list[i].third[s].isSelect == false) {
              list[i].third.splice(s, 1)
            }
          }
        } else {
          list.splice(i, 1)
        }
      }
      if (list.length > 0) {
        var a = [];
        for (var i = 0; i < arry.length; i++) {
          a.push(arry[i].num)
        }
        if (a.indexOf(num) == -1) {
          var ss = {
            num: num,
            name: applyType[num - 1].name,
            sec: [],
            list: [],
            primary: 2,
            number: 0,
            checked: true,
            sscore: [],
          }
          arry.push(ss)
        }
        for (var i = 0; i < arry.length; i++) {
          if (arry[i].num == num) {
            var block = arry[i];
            var index = i;
          }
        };
        var newarry = block.sec;
        if (newarry) {
          var ff = [];
          for (var m = 0; m < newarry.length; m++) {
            ff.push(newarry[m].num)
          }
          for (var i = 0; i < list.length; i++) {
            if (ff.indexOf(list[i].num) >= 0) {
              newarry[ff.indexOf(list[i].num)].third = list[i].third
            } else {
              newarry.push(list[i])
            }
          }
          block.sec = newarry;
          arry[index] = block;
        } else {
          newarry.push(list);
          block.sec = newarry;
          arry[index] = block;
        }
        var pages = getCurrentPages();
        var PrePage = pages[pages.length - 2];
        PrePage.data.arry = arry;
        PrePage.onSelect();
        wx.navigateBack({
          delta: 1,
        })
      } else {
        wx.navigateBack({
          delta: 1,
        })
      }
    }
  },
  onSelect(e) {
    var first = e.currentTarget.dataset.first;
    this.data.first = first;
    var two = e.currentTarget.dataset.two;
    var name = e.currentTarget.dataset.name;
    var arry = this.data.list;
    // console.log(arry);
    // var nameStr = this.data.nameStr;
    if (arry[first].third[two].isSelect == false) {
      var check = true
    } else {
      var check = false;
    };

    // if (check == true) {
    //   console.log(two, first, typeof (two));
    //   for (var s = 0; s < arry.length; s++) {
    //     for (var x = 0; x < arry[s].third.length; x++) {
    //       if (name == arry[s].third[x].name && arry[s].third[x].isSelect == true) {
    //         Toast('已选择该项,请勿重复添加');
    //         return;
    //       } else {
    //         for (var c = 0; c < nameStr.length; c++) {
    //           if (nameStr[c].name == name && arry[first].third[two].isSelect == false && nameStr[c].num !== arry[first].num) {
    //             Toast('已选择该项,请勿重复添加');
    //             return;
    //           };
    //         };
    //       };
    //     };
    //   };
    // };

    this.setData({
      ["list[" + first + "].third[" + two + "].isSelect"]: check,
    });
    this.onChecknum();
    return;

  },
  onChecknum() {
    var arry = this.data.list;
    var first = this.data.first;
    for (var i = 0; i < arry.length; i++) {
      var len = 0;
      for (var s = 0; s < arry[i].third.length; s++) {
        if (arry[i].third[s].isSelect == true) {
          len++;
        }
      }
      if (len > 0) {
        this.setData({
          ["list[" + i + "].isSelect"]: len
        })
      }
      if (i == first) {
        this.setData({
          ["list[" + i + "].isSelect"]: len
        })
      }
    }
  },
  onSearch(e) {
    this.toast();
    var text = e.detail.replace(/\s+/g, '');
    var num = this.data.num;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 3];
    var keywords = PrePage.data.name;
    if (text.length > 0) {
      this.getSearch(text, num, keywords)
    } else {
      Toast.clear();
      this.notify('请先输入组别名称！')
    }
  },
  onChange(e) {
    // var value = e.detail.replace(/\s+/g, '');
    // this.setData({
    //   value: value,
    // })
    canonical(e.detail);
  },
  getSearch(text, num, keywords) {
    this.toast();
    NetworkRequest({
      url: '/voicesearch',
      data: {
        text: text,
        num: num,
        keywords: keywords,
      },
      method: 'POST',
    }).then(res => {
      var arry = res.data.data;
      var code = res.data.code;
      if (code == 1) {
        for (var n = 0; n < arry.sec.length; n++) {
          for (var c = 0; c < arry.sec[n].third.length; c++) {
            arry.sec[n].third[c].isSelect = false
          };
        };
        this.onSize(arry)
      } else {
        Toast.clear();
        this.notify('暂无数据');
      };
    }).catch(err => {

    })
  },
  onSize(arry) {
    var list = this.data.list;
    var block = arry.sec;
    var ss = this.data.arry;
    for (var m = 0; m < ss.length; m++) {
      if (ss[m].num == this.data.num) {
        var shuzu = ss[m].sec
        break;
      }
    }
    for (var i = 0; i < list.length; i++) {
      for (var n = 0; n < block.length; n++) {
        if (list[i].num == block[n].num) {
          block[n].show = list[i].show;
          for (var s = 0; s < list[i].third.length; s++) {
            for (var x = 0; x < block[n].third.length; x++) {
              if (list[i].third[s].name == block[n].third[x].name) {
                block[n].third[x].isSelect = list[i].third[s].isSelect
              };
            };
          };
        };
      };
    };
    if (shuzu) {
      if (block.length > shuzu.length) {
        for (var m = 0; m < shuzu.length; m++) {
          for (var z = 0; z < shuzu[m].third.length; z++) {
            for (var t = 0; t < block.length; t++) {
              for (var b = 0; b < block[t].third.length; b++) {
                block[t].third[b].twoIndex = b;
                block[t].third[b].firstIndex = t;
                if (block[t].third[b].name == shuzu[m].third[z].name) {
                  block[t].third[b].isSelect = true
                };
              };
            };
          };
        };
      } else {
        for (var t = 0; t < block.length; t++) {
          for (var b = 0; b < block[t].third.length; b++) {
            for (var m = 0; m < shuzu.length; m++) {
              for (var z = 0; z < shuzu[m].third.length; z++) {

                block[t].third[b].twoIndex = b;
                block[t].third[b].firstIndex = t;
                if (block[t].third[b].name == shuzu[m].third[z].name) {
                  block[t].third[b].isSelect = true
                };
              };
            };
          };
        };
      }
    }

    for (var s = 0; s < block.length; s++) {
      for (var i = 0; i < block[s].third.length; i++) {
        block[s].third[i].twoIndex = i;
        block[s].third[i].firstIndex = s;
      }
    }

    this.setData({
      list: block,
    });
    this.onChecknum();
    Toast.clear();
    this.data.pass = true;
  },
  onShuju(third) {
    var index = this.data.index;
    var arry = this.data.list;
    var block = this.data.arry;
    var newBlock = [];
    for (var s = 0; s < block.length; s++) {
      for (var i = 0; i < block[s].sec.length; i++) {
        for (var c = 0; c < block[s].sec[i].third.length; c++) {
          newBlock.push(block[s].sec[i].third[c].name)
        };
      };
    };
    for (var n = 0; n < third.length; n++) {
      if (newBlock.indexOf(third[n].name) >= 0) {
        third[n].isSelect = true
      } else {
        third[n].isSelect = false
      };
      third[n].firstIndex = index;
      third[n].twoIndex = n;
      arry[index].third.push(third[n])
    };
    if (arry[index].show == false || !arry[index].show) {
      arry[index].show = true
    };
    this.setData({
      list: arry,
    });
    this.onChecknum();
    Toast.clear();
    this.data.pass = true;
    setTime(10).then(res => {
      selectQuery('the-id' + index).then(res => {
        wx.pageScrollTo({
          scrollTop: res[0].top + res[1].scrollTop,
        })
      })
    })
  },
  onFold(e) {
    var arry = this.data.list;
    var num = e.currentTarget.dataset.num;
    var index = e.currentTarget.dataset.id;
    this.data.index = index;
    if (arry[index].third.length == 0) {
      this.data.pass = false;
      this.getThree(num)
    } else {
      if (arry[index].show == true) {
        this.setData({
          ["list[" + index + "].show"]: false,
        })
        setTime(10).then(res => {
          selectQuery('the-id' + index).then(res => {
            wx.pageScrollTo({
              scrollTop: 60,
            })
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
    };
  },
  getThree(e) {
    var index = this.data.index;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 3];
    var keywords = PrePage.data.name;
    this.toast();
    NetworkRequest({
      url: '/recommthird',
      data: {
        num: e,
        keywords: keywords,
      },
    }).then(res => {
      var third = res.data.data;
      if (third) {
        this.onShuju(third)
      } else {
        this.notify('暂无数据')
      };
      Toast.clear()
      this.data.pass = true;
    }).catch(err => {})
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
  onRecode(arry) {
    for (var i = 0; i < arry.length; i++) {
      arry[i].show = false
    };
    this.setData({
      list: arry,
    });
    this.onChecknum();
    Toast.clear()
  },
  getData(e, n) {
    this.toast();
    NetworkRequest({
      url: '/recommsecond',
      data: {
        num: e,
        keywords: n
      },
    }).then(res => {
      this.setData({
        list: res.data.data,
        name: applyType.applyType[e - 1].name,
      })
      if (this.data.value) {
        var pages = getCurrentPages();
        var PrePage = pages[pages.length - 3];
        var keywords = PrePage.data.name;
        this.getSearch(this.data.value, this.data.num, keywords);
      } else {
        Toast.clear();
      }
    }).catch(err => {
      Toast.clear();
    })

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
  onLoad: function (options) {
    this.getData(options.num, options.name);
    this.data.num = options.num;
    this.data.name = options.name;
    this.data.arry = getApp().globalData.arry;
    var pages = getCurrentPages();
    var _this = pages[pages.length - 3];
    var list = JSON.parse(JSON.stringify(_this.data.arry));
    // var nameStr = [];
    // for (var i = 0; i < list.length; i++) {
    //   for (var s = 0; s < list[i].sec.length; s++) {
    //     for (var x = 0; x < list[i].sec[s].third.length; x++) {
    //       nameStr.push({
    //         num: list[i].sec[s].num,
    //         name: list[i].sec[s].third[x].name
    //       })
    //     }
    //   }
    // }
    // this.data.nameStr = nameStr;
    // console.log(nameStr);
    if (options.value) {
      this.setData({
        value: options.value
      })
    }
  }
})