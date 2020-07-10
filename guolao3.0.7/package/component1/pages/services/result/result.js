const main_Url = getApp().globalData.main_Url;
const info = getApp().globalData.sysinfo;
import Notify from '../../../../../dist/notify/notify';
import Toast from '../../../../../dist/toast/toast';
import applyType from '../../../../../template/template.js';
import NetworkRequest from '../../../../../template/network.js';
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
  },
  onClick() {
    var list = this.data.list;
    var hash = this.data.arry.sec;
    var index = this.data.index;
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var block = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].third.length > 0) {
        for (var s = 0; s < list[i].third.length; s++) {
          if (list[i].third[s].isSelect == true) {
            if (block.indexOf(list[i]) == -1) {
              block.push(list[i])
            };
          };
        };
      };
    };
    for (var c = block.length - 1; c >= 0; c--) {
      for (var m = block[c].third.length - 1; m >= 0; m--) {
        if (block[c].third[m].isSelect == false) {
          block[c].third.splice(m, 1)
        };
      };
    };
    var aa = [];
    for (var s = 0; s < block.length; s++) {
      aa.push(block[s].num)
    };
    for (var i = hash.length - 1; i >= 0; i--) {
      if (aa.indexOf(hash[i].num) == -1) {
        block.unshift(hash[i])
      };
    };
    for (var i = 0; i < hash.length; i++) {
      for (var s = 0; s < block.length; s++) {
        if (block[s].num == hash[i].num) {
          block[s].sscore = hash[i].sscore;
          block[s].checked = hash[i].checked;
        };
      };
    };
    PrePage.setData({
      ["arry[" + index + "].checked"]: false,
    });
    PrePage.data.arry[index].sec = block;
    PrePage.onRecord(PrePage.data.arry);
    wx.navigateBack()
  },
  onSelect(e) {
    var first = e.currentTarget.dataset.first;
    var two = e.currentTarget.dataset.two;
    var name = e.currentTarget.dataset.name;
    var recode = this.data.arry;
    var block = [];
    var arry = this.data.list;
    if (arry[first].third[two].isSelect == false) {
      var check = true
    } else {
      var check = false;
    };
    this.setData({
      ["list[" + first + "].third[" + two + "].isSelect"]: check,
    });
    if (check == false) {
      for (var i = 0; i < recode.sec.length; i++) {
        for (var s = 0; s < recode.sec[i].third.length; s++) {
          if (recode.sec[i].third[s].name == name) {
            recode.sec[i].third.splice(s, 1);
          };
        };
      };
    };
  },
  onSearch(e) {
    this.toast();
    var text = e.detail.replace(/\s+/g, '');
    var num = this.data.num;
    var keywords = this.data.keywords;
    if (text.length > 0) {
      this.getSearch(text, num, keywords)
    } else {
      Toast.clear();
      this.notify('请先输入组别名称！')
    }
  },
  onChange(e) {
    var value = e.detail.replace(/\s+/g, '');
    this.setData({
      value: value,
    })
  },
  getSearch(text, num, keywords) {
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
      if (arry) {
        for (var n = 0; n < arry.sec.length; n++) {
          for (var c = 0; c < arry.sec[n].third.length; c++) {
            arry.sec[n].third[c].isSelect = false
          };
        };
        this.onSize(arry)
      } else {
        Toast.clear();
        this.notify(res.data.msg)
      };
    }).catch(err => {
      
    })
  },
  onSize(arry) {
    var list = this.data.list;
    var block = arry.sec;
    var shuzu = this.data.arry.sec;
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
    this.setData({
      list: block,
    });
    Toast.clear()
  },
  onShuju(third, index) {
    var arry = this.data.list;
    var block = this.data.arry;
    var newBlock = [];
    for (var i = 0; i < block.sec.length; i++) {
      for (var c = 0; c < block.sec[i].third.length; c++) {
        newBlock.push(block.sec[i].third[c].name)
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
    if (arry[index].show == false) {
      arry[index].show = true
    };
    this.setData({
      list: arry,
    });
  },
  onFold(e) {
    var arry = this.data.list;
    var num = e.currentTarget.dataset.num;
    var index = e.currentTarget.dataset.id;
    if (arry[index].show == false && arry[index].third.length == 0) {
      this.getThree(num, index)
    } else {
      if (arry[index].show == true) {
        this.setData({
          ["list[" + index + "].show"]: false,
        })
      } else {
        this.setData({
          ["list[" + index + "].show"]: true,
        });
      };
    };
  },
  getThree(e, index) {
    this.toast();
    NetworkRequest({
      url: '/recommthird',
      data: {
        num: e,
      },
    }).then(res => {
      var third = res.data.data;
      if (third) {
        this.onShuju(third, index)
      } else {
        this.notify(res.data.msg)
      };
      Toast.clear()
    }).catch(err => {
      
    })
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
    Toast.clear()
  },
  getData(e, key) {
    this.toast();
    NetworkRequest({
      url: '/recommsecond',
      data: {
        num: e,
        keywords: key,
      },
    }).then(res => {
      var list = res.data.data;
      if (list.length > 0) {
        this.onRecode(list)
      } else {
        Toast.clear();
        this.notify(res.data.msg)
      };
    }).catch(err => {
      
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
      duration: 1500,
      selector: '#custom-selector',
      backgroundColor: '#f44'
    });
  },
  onLoad: function(options) {
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var arry = PrePage.data.arry[options.index];
    this.getData(options.id, options.name);
    this.data.keywords = options.keywords;
    this.setData({
      num: options.id,
      name: options.name,
      arry: arry,
      index: options.index,
    });
  }
})