//
import navigationArry from './template.js';
const arry = navigationArry.navigationArry;
import name from './template.js';
const userid = wx.getStorageSync('userid');
const token = wx.getStorageSync('token');
export default function viocenavigation(res) {
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  var key = res;
  if (key.length == 0) {
    var key = ''
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: getApp().globalData.main_Url + '/navigation',
      data: {
        keywords: key,
        channelroad: 4,
        user_id: getApp().globalData.userid,
        token: getApp().globalData.token,
      },
      header: {},
      method: 'GET',
      success: (res => {
        // console.log(res)
        var code = res.data.code;
        var list = res.data.data;
        if (code == 1) {
          var ss = [];
          var aa = name.name;
          for (var i = list.length - 1; i >= 0; i--) {
            if (list.length > 1) {
              if (ss.indexOf(list[i].title) == -1 && aa.indexOf(list[i].title) >= 0) {
                ss.push(list[i].title)
              } else {
                list.splice(i, 1)
              }
            }
            for (var s = arry.length - 1; s >= 0; s--) {
              if (list[i].title == arry[s].title) {
                list[i].url = arry[s].url;
                list[i].type = arry[s].type;
              }
            }
          }
        }
        resolve(list);
        _this.setData({
          list: list,
          wenben: key.replace(/[\ |\s*|\？|\！|\…|\‘|\’|\；|\【|\】|\·|\/|\、|\|\，|\。|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "").replace(/[0-9]+/g, "")
        })
        _this.animat(1);
      }),
      fail: (err => {
        reject(err);
      })
    })
  })
}