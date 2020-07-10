import applyType from '../../../../../../template/template';
import Toast from '../../../../../../dist/toast/toast';
import Notify from '../../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../../template/network.js';
import canonical from '../../../../../../template/canonical.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top: wx.getSystemInfoSync()['statusBarHeight'] + 44,
    AllClassArry: [],
    value: '',
  },
  onChange(event) {
    this.setData({
      value: event.detail
    })
  },
  onSearch(event) {
    wx.showLoading({
      title: '查询中...',
      mask: true
    });
    var str = event.detail.replace(/\s+/g, "");
    var AllClassArry = JSON.parse(JSON.stringify(getApp().globalData.AllClassArry));
       //字符检索||次搜索
    // var strlen = str.length;
    var strlen = 1;
    var arrylen = AllClassArry.length;
    var arry = [];
    for (var i = 0; i < str.length; i++) {
      var char = str.slice(i, i + 1);
      // var char = str.slice(0, i + 1);
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
            // if (AllClassArry[s].sec[c].third[x].name.indexOf(char) > -1) {
            var indexStr = AllClassArry[s].sec[c].third[x].name.indexOf(str);
            if (indexStr > -1) {
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
                  for (var xx = 0; xx < str.length; xx++) {
                    if (!AllClassArry[s].sec[c].third[x].text[m].color || AllClassArry[s].sec[c].third[x].text[m].color == '#333') {
                      AllClassArry[s].sec[c].third[x].text[m].color = (m == indexStr + xx) ? '#FF0000' : '#333';
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
    // var strlen = str.length;
    // var arrylen = AllClassArry.length;
    // var arry = [];
    // for (var i = 0; i < str.length; i++) {
    //   var char = str.slice(i, i + 1);
    //   console.log(char);
    //   for (var s = 0; s < arrylen; s++) {
    //     if (!AllClassArry[s].isSelect) {
    //       AllClassArry[s].isSelect = false;
    //     };
    //     for (var c = 0; c < AllClassArry[s].sec.length; c++) {
    //       if (!AllClassArry[s].sec[c].isSelect) {
    //         AllClassArry[s].sec[c].isSelect = false;
    //       };
    //       for (var x = 0; x < AllClassArry[s].sec[c].third.length; x++) {
    //         if (!AllClassArry[s].sec[c].third[x].isSelect) {
    //           AllClassArry[s].sec[c].third[x].isSelect = false;
    //         };
    //         if (AllClassArry[s].sec[c].third[x].name.indexOf(char) > -1) {
    //           if (arry.indexOf(AllClassArry[i]) == -1) {
    //             arry.push(AllClassArry[s].sec[c].third[x]);
    //             AllClassArry[s].isSelect = true;
    //             AllClassArry[s].sec[c].isSelect = true;
    //             AllClassArry[s].sec[c].third[x].isSelect = true;
    //             var text = AllClassArry[s].sec[c].third[x].text;
    //             AllClassArry[s].sec[c].third[x].text = text == undefined ? [] : text;
    //             for (var m = 0; m < AllClassArry[s].sec[c].third[x].name.length; m++) {
    //               var obj = AllClassArry[s].sec[c].third[x].text[m];
    //               AllClassArry[s].sec[c].third[x].text[m] = obj == undefined ? {} : obj;
    //               AllClassArry[s].sec[c].third[x].text[m].str = AllClassArry[s].sec[c].third[x].name.slice(m, m + 1);
    //               var isEquality = (AllClassArry[s].sec[c].third[x].text[m].str == char ? true : false);
    //               var color = AllClassArry[s].sec[c].third[x].text[m].color;
    //               if (isEquality == true) {
    //                 AllClassArry[s].sec[c].third[x].text[m].color = '#FF0000';
    //               } else {
    //                 if (color !== '#FF0000') {
    //                   AllClassArry[s].sec[c].third[x].text[m].color = '#333';
    //                 };
    //               };
    //             };
    //           };
    //         };
    //       };
    //     };
    //   };
    // };
    if (arry.length > 0) {
      for (var s = AllClassArry.length - 1; s >= 0; s--) {
        if (AllClassArry[s].isSelect == false) {
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
            };

          };
        }
      };
      // console.log(AllClassArry, '2');
      this.onDt(AllClassArry);
    } else {
      Toast('暂无数据');
    };
    wx.hideLoading();
  },
  onDt(event) {
    var arry = event;
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
      }
    }
    getApp().globalData.CopyAllClassArry = JSON.parse(JSON.stringify(arry));
    for (var i = 0; i < arry.length; i++) {
      for (var s = 0; s < arry[i].sec.length; s++) {
        arry[i].sec[s].third = [];
      };
    };
    this.setData({
      AllClassArry: arry
    })
    wx.hideLoading();
  },
  onflod(event) {
    var id = event.currentTarget.dataset.id;
    var f = event.currentTarget.dataset.f;
    var arry = JSON.parse(JSON.stringify(getApp().globalData.CopyAllClassArry));
    if (id == 2) {
      var t = event.currentTarget.dataset.t;
      var isSelect = this.data.AllClassArry[f].sec[t].isSelect;
      this.setData({
        ["AllClassArry[" + f + "].sec[" + t + "].isSelect"]: !isSelect,
        ["AllClassArry[" + f + "].sec[" + t + "].third"]: isSelect == false ? arry[f].sec[t].third : []
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arry = JSON.parse(JSON.stringify(getApp().globalData.CopyAllClassArry));
    for (var i = 0; i < arry.length; i++) {
      for (var s = 0; s < arry[i].sec.length; s++) {
        arry[i].sec[s].third = [];
      }
    }
    this.setData({
      AllClassArry: arry
    })
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