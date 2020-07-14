//添加到shop
import Toast from '../dist/toast/toast';
import Notify from '../dist/notify/notify';
import setTime from './setTime.js';
import NetworkRequest from './GardenNetwork.js';
const main_Url = getApp().globalData.main_Url;
export default function addshop() {
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  var arry = _this.data.arry;
  var select = [];
  for (var i = 0; i < arry.length; i++) {
    select.push(arry[i].checked);
    for (var s = 0; s < arry[i].sec.length; s++) {
      select.push(arry[i].sec[s].checked);
    };
  };
  if (select.indexOf(true) == -1) {
    _this.notify('请选择商品');
  } else {
    Toast.loading({
      mask: true,
      message: '添加中...',
      duration: 0,
    });
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var brand_img = _this.data.imgUrls;
    var brand_name = _this.data.name;
    var one_cate = [];
    var two_cate = [];
    var star_cate = [];
    var three_cate = [];
    var click_type = [];
    for (var i = 0; i < arry.length; i++) {
      var arr_i = [];
      var str_i = [];
      var star_i = [];
      var listIndex = arry[i].listIndex;
      for (var j = 0; j < arry[i].sec.length; j++) {
        if (arry[i].sec[j].third.length > 0 && arry[i].sec[j].checked == true) {
          if (one_cate.indexOf(arry[i].num) == -1) {
            one_cate.push(arry[i].num) ;
            click_type.push(arry[i].list[listIndex].title) ;
          };
          arr_i.push(arry[i].sec[j].num);
          star_i.push(arry[i].sec[j].sscore);
          for (var m = 0; m < arry[i].sec[j].third.length; m++) {
            str_i.push(arry[i].sec[j].third[m].id) ;
          };
        };
      };
      if (arr_i.length != 0) {
        two_cate.push(arr_i);
      };
      if (star_i.length != 0) {
        star_cate.push(star_i);
      };
      if (str_i.length != 0) {
        three_cate.push(str_i);
      };
    };
    one_cate = one_cate.join(',')  ;
    click_type = click_type.join(',');
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
    for (var i = 0; i < star_cate.length; i++) {
      for (var j = 0; j < star_cate[i].length; j++) {
        star_str += star_cate[i][j] + ',';
      };
      star_str = star_str.substring(0, star_str.length - 1);
      star_str += '|';
    };
    str1 = str1.substring(0, str1.length - 1);
    str2 = str2.substring(0, str2.length - 1);
    star_str = star_str.substring(0, star_str.length - 1);
    var is_design = wx.getStorageSync('is_design');
    if (is_design == 1) {
      var is_design = 1
    } else {
      var is_design = ''
    };
    if (three_cate.length == 0) {
      return false;
    };
    if (str2.length > 0) {
      NetworkRequest({
        url: '/shopCar/registerAddShopCar',
        data: {
          user_id: userid,
          token: token,
          one_cate: one_cate,
          two_cate: str1,
          three_cate: str2,
          click_type: click_type,
          brand_img: brand_img,
          brand_name: brand_name,
          recommend_rate: star_str,
          shop_id: '',
          channelroad: 4,
          is_design: is_design,
          park_name: getApp().globalData.YQNAME,
        },
        method: 'POST',
      }).then(res => {
        if (res.data.code == 1) {
          setTime().then(ss => {
            wx.navigateTo({
              url: '/pages/user/shop/shop?open=' + true,
            })
          })
        }
        Notify({
          text: res.data.msg,
          duration: 3000,
          selector: '#custom-selector',
          backgroundColor: '#f44'
        })
      })
    } else {
      wx.setStorageSync('is_design', 2);
    }
  };
}