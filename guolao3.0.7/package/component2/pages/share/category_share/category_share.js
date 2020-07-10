// package/component2/pages/share/category_share/category_share.js
const main_Url = getApp().globalData.main_Url;
import http from '../../../../../template/network'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arry: [],
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    icon_Url: getApp().globalData.icon_Url,
    imgUrls: '',
  },
  onClick(event) {
    var arry = JSON.parse(JSON.stringify(getApp().globalData.CopyAllClassArry));
    var index = event.currentTarget.dataset.index;
    var isSelect = this.data.arry[index].isSelect;
    this.setData({
      ["arry[" + index + "].isSelect"]: !isSelect,
      ["arry[" + index + "].sec"]: isSelect == false ? arry[index].sec : []
    })
  },
  getData(){
    http({
      url:'/shareBrand',
      data:{
        one_cate:this.data.one_cate,
        two_cate: this.data.str1,
        three_cate:this.data.str2,
        brand_img:this.data.imgUrls,
        brand_name:this.data.name,
      },
      method:'POST',
    }).then((res)=>{
      console.log(res)
      if(res.data.code == 1){
        this.setData({
          id:res.data.data
        })
      }else{
        wx.showToast({
          title: res.data.msg,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var list = getApp().globalData.CopyAllClassArry
    this.setData({
      list:list
    })
    var arry = JSON.parse(JSON.stringify(getApp().globalData.CopyAllClassArry));
    console.log(arry)
    var pages = getCurrentPages();
    var _this = pages[pages.length - 2];
    // console.log(_this.data);
    for (var i = 0; i < arry.length; i++) {
      arry[i].sec = []
    }
    // 处理list数据
    var list = this.data.list;
    var one_cate = [];
    var two_cate = [];
    var three_cate = [];
      for (var i = 0; i < list.length; i++) {
        var arr_i = [];
        var str_i = [];
        var star_i = [];
        var listIndex = list[i].listIndex;
        for (var j = 0; j < list[i].sec.length; j++) {
          if (list[i].sec[j].third.length > 0) {
            if (one_cate.indexOf(list[i].num) == -1) {
              one_cate.push(list[i].num);
            };
            arr_i.push(list[i].sec[j].num);
            for (var m = 0; m < list[i].sec[j].third.length; m++) {
              str_i.push(list[i].sec[j].third[m].id);
            };
          };
        };
        if (arr_i.length != 0) {
          two_cate.push(arr_i);
        };
        if (str_i.length != 0) {
          three_cate.push(str_i);
        };
      };
      one_cate = one_cate.join(',');
      var str1 = '';
      var str2 = '';
      var star_str = '';
      for (var i = 0; i < two_cate.length; i++) {
        for (var j = 0; j < two_cate[i].length; j++) {
          str1 += two_cate[i][j] + ',';
        };
        str1 = str1.substring(0, str1.length - 1);
        str1 += '|';
      };
      for (var i = 0; i < three_cate.length; i++) {
        for (var j = 0; j < three_cate[i].length; j++) {
          str2 += three_cate[i][j] + ',';
        };
        str2 = str2.substring(0, str2.length - 1);
        str2 += '|';
      };
      str1 = str1.substring(0, str1.length - 1);
      str2 = str2.substring(0, str2.length - 1);
      if (three_cate.length == 0) {
        return false;
      };
      this.setData({
        one_cate:one_cate,
        str1:str1,
        str2:str2,
        arry: arry,
        imgUrls: _this.data.imgUrls,
        name:options.name
      })
      this.getData()
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
  onShareAppMessage: function (res) {
    return{
      title:'类别分享',
      path:'/package/component2/pages/share/shareDetail/shareDetail?id='+this.data.id
    }
  }
})