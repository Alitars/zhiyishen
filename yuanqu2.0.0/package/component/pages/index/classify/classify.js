// import applyType from '../../../../../template/template.js';
import applyType from '../../../../../template/template';
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
import canonical from '../../../../../template/canonical.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    top: wx.getSystemInfoSync()['statusBarHeight'] + 44,
    AllClassArry: [],
    SearchArry: [],
    value: '',
    isblack: true,
  },
  onChange(event) {
    this.setData({
      value: event.detail
    })
  },
  onHandle(event) {
    var arry = event;
    var list = [];
    var name = [];
    var len = arry.length;
    for (var i = 0; i < len; i++) {
      list[i] = {
        'name': arry[i].name,
        'firstIndex': i,
        'id': arry[i].id,
        'num': arry[i].num,
        'pid': arry[i].pid,
        'sec': [],
      };
      name[i] = {
        'id': list[i].id,
        'name': list[i].name,
      };
      if (typeof (name[i].id) == 'number') {
        name[i].id = JSON.stringify(list[i].id);
      };
      if (name[i].id.length == 1) {
        name[i].id = '0' + list[i].id + '类' + ' ';
      } else {
        name[i].id = list[i].id + '类' + ' ';
      };
      for (var s = 0; s < arry[i].twoCate.length; s++) {
        list[i].sec[s] = {
          'name': arry[i].twoCate[s].name,
          'firstIndex': i,
          'twoIndex': s,
          'id': arry[i].twoCate[s].id,
          'num': arry[i].twoCate[s].num,
          'pid': arry[i].twoCate[s].pid,
          'third': [],
        };
        for (var c = 0; c < arry[i].twoCate[s].three_cate.length; c++) {
          list[i].sec[s].third[c] = {
            'name': arry[i].twoCate[s].three_cate[c].name,
            'id': arry[i].twoCate[s].three_cate[c].id,
            'num': arry[i].twoCate[s].three_cate[c].num,
            'pid': arry[i].twoCate[s].three_cate[c].pid,
            'firstIndex': i,
            'twoIndex': s,
            'threeIndex': c,
          };
        };
      };
    };
    // console.log(name);
    this.setData({
      list: name
    });
    wx.hideLoading();
    getApp().globalData.AllClassArry = JSON.parse(JSON.stringify(list));
  },
  onSearch(event) {
    // console.log(event);
    wx.showLoading({
      title: '查询中...',
      mask: true
    });
    var str = event.detail.replace(/\s+/g, "");
    var AllClassArry = JSON.parse(JSON.stringify(getApp().globalData.AllClassArry));
    var strlen = str.length;
    var arrylen = AllClassArry.length;
    var arry = [];
    for (var i = 0; i < str.length; i++) {
      var char = str.slice(i, i + 1);
      for (var s = 0; s < arrylen; s++) {
        if (!AllClassArry[s].isSelect) {
          AllClassArry[s].isSelect = false;
        };
        for (var c = 0; c < AllClassArry[s].sec.length; c++) {
          if (!AllClassArry[s].sec[c].isSelect) {
            AllClassArry[s].sec[c].isSelect = false;
          };
          for (var x = 0; x < AllClassArry[s].sec[c].third.length; x++) {
            if (!AllClassArry[s].sec[c].third[x].isSelect) {
              AllClassArry[s].sec[c].third[x].isSelect = false;
            };
            if (AllClassArry[s].sec[c].third[x].name.indexOf(char) > -1) {
              if (arry.indexOf(AllClassArry[i]) == -1) {
                arry.push(AllClassArry[s].sec[c].third[x]);
                AllClassArry[s].isSelect = true;
                AllClassArry[s].sec[c].isSelect = true;
                AllClassArry[s].sec[c].third[x].isSelect = true;
                var text = AllClassArry[s].sec[c].third[x].text;
                AllClassArry[s].sec[c].third[x].text = text == undefined ? [] : text;
                for (var m = 0; m < AllClassArry[s].sec[c].third[x].name.length; m++) {
                  var obj = AllClassArry[s].sec[c].third[x].text[m];
                  AllClassArry[s].sec[c].third[x].text[m] = obj == undefined ? {} : obj;
                  AllClassArry[s].sec[c].third[x].text[m].str = AllClassArry[s].sec[c].third[x].name.slice(m, m + 1);
                  var isEquality = (AllClassArry[s].sec[c].third[x].text[m].str == char ? true : false);
                  var color = AllClassArry[s].sec[c].third[x].text[m].color;
                  if (isEquality == true) {
                    AllClassArry[s].sec[c].third[x].text[m].color = '#FF0000';
                  } else {
                    if (color !== '#FF0000') {
                      AllClassArry[s].sec[c].third[x].text[m].color = '#333';
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
    if (arry.length > 0) {
      for (var s = AllClassArry.length - 1; s >= 0; s--) {
        if (AllClassArry[s].isSelect == false) {
          // console.log(AllClassArry[s]);
          AllClassArry.splice(s, 1);
        } else {
          for (var c = AllClassArry[s].sec.length - 1; c >= 0; c--) {
            if (AllClassArry[s].sec[c].isSelect == false) {
              AllClassArry[s].sec.splice(c, 1);
            } else {
              for (var x = AllClassArry[s].sec[c].third.length - 1; x >= 0; x--) {
                AllClassArry[s].sec[c].third[x].name = '';
                AllClassArry[s].sec[c].third[x].pid = '';
                if (AllClassArry[s].sec[c].third[x].isSelect == false) {
                  AllClassArry[s].sec[c].third.splice(x, 1);
                };
              };
            }

          };
        }
      };
      // console.log(AllClassArry, '2');
      this.data.isblack = false;
      this.onDt(AllClassArry);
    } else {
      Toast('暂无数据');
    };
    wx.hideLoading();
  },
  onDt(event) {
    var arry = event;
    var isblack = this.data.isblack;
    for (var i = 0; i < arry.length; i++) {
      arry[i].isSelect = false;
      arry[i].firstIndex = i;
      if (typeof (arry[i].id) == 'number') {
        arry[i].id = JSON.stringify(arry[i].id);
      };
      if (arry[i].id.length == 1) {
        arry[i].id = '0' + arry[i].id + '类' + ' ';
      } else {
        arry[i].id = arry[i].id + '类' + ' ';
      };
      for (var s = 0; s < arry[i].sec.length; s++) {
        arry[i].sec[s].isSelect = false;
        arry[i].sec[s].firstIndex = i;
        arry[i].sec[s].twoIndex = s;
        if (isblack == true) {
          for (var c = 0; c < arry[i].sec[s].third.length; c++) {
            arry[i].sec[s].third[c].text = [];
            for (var m = 0; m < arry[i].sec[s].third[c].name.length; m++) {
              arry[i].sec[s].third[c].text[m] = {};
              arry[i].sec[s].third[c].text[m].str = arry[i].sec[s].third[c].name.slice(m, m + 1);
              arry[i].sec[s].third[c].text[m].color = '#333';
            };
          };
        };
      };
    }
   getApp().globalData.CopyAllClassArry = arry;
    wx.navigateTo({
      url: '/package/component/pages/index/classify/dt/dt',
    })
    wx.hideLoading();
  },
  getData() {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
    NetworkRequest({
      url: '/brandCategory',
      data: {},
    }).then((res) => {
      if (res.data.code == 1) {
        var arry = res.data.data;
        getApp().globalData.CopyAllClassArry = JSON.parse(JSON.stringify(res.data.data));
        this.onHandle(arry);
      }
    })
  },
  onDetail(event) {
    var id = event.currentTarget.dataset.id;
    var list = [JSON.parse(JSON.stringify(getApp().globalData.AllClassArry[id]))];
    console.log(list);
    this.data.isblack = true;
    this.onDt(list);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})