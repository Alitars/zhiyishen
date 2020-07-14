//recommend计算
import Toast from '../dist/toast/toast';
import applyType from './template.js';
export default function calculate(res) {
  return new Promise((resolve, reject) => {
    var arry = JSON.parse(JSON.stringify(res));
    var len = arry.length;
    var newarry = res.slice(0, len);
    var list = JSON.parse(JSON.stringify(getApp().globalData.list));
    var name = JSON.parse(JSON.stringify(applyType.applyType));
    var type = getApp().globalData.recommendType;
    var blr = [];
    arry.sort(function(x, y) {
      return x.num - y.num
    });
    for (var i = 0; i < len; i++) {
      arry[i].sec.sort(function(x, y) {
        return x.num - y.num;
      });
      var sl = 0;
      arry[i].firstIndex = i;
      if (arry[i].list.length == 0 || arry[i].list == []) {
        arry[i].list = list
      };
      var sscore = [];
      var a = 0;
      var sscoretwo = [];
      var checkArry = [];
      for (var e = 0; e < name.length; e++) {
        if (arry[i].num == name[e].id) {
          arry[i].name = name[e].name
        }
      };
      for (var c = 0; c < arry[i].sec.length; c++) {
        if (type == 2) {
          arry[i].sec[c].sscore = 0;
        };
        if (arry[i].checked == true) {
          arry[i].sec[c].checked = true
        };
        checkArry.push(arry[i].sec[c].checked);
        sscoretwo.push(arry[i].sec[c].sscore);
        if (arry[i].sec[c].checked == true) {
          a += arry[i].sec[c].third.length;
          sscore.push(arry[i].sec[c].sscore);
          arry[i].sec[c].checked = true
        } else {
          arry[i].sec[c].checked = false
        }
        arry[i].sec[c].firstIndex = i;
        arry[i].sec[c].twoIndex = c;
        sl += arry[i].sec[c].third.length
      };
      if (checkArry.indexOf(false) == -1) {
        arry[i].checked = true
      } else {
        arry[i].checked = false
      };
      var listIndex = 0;
      arry[i].listIndex = listIndex;
      arry[i].number = a;
      arry[i].isSelect = sl;
      var listIndex = arry[i].listIndex;
      var a = arry[i].number;
      if (listIndex == 0 || listIndex == 1) {
        if (a > 0) {
          if (a - 10 > 0) {
            var c = a - 10;
            if (listIndex == 1) {
              arry[i].list[listIndex].cost = (JSON.parse(arry[i].list[listIndex].price) + c * 30).toFixed(2);
              arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total) + c * 50).toFixed(2);
              arry[i].list[listIndex].instance = ((JSON.parse(arry[i].list[listIndex].total) + c * 50) - (JSON.parse(arry[i].list[listIndex].price) + c * 30)).toFixed(2)
            } else {
              arry[i].list[listIndex].cost = (JSON.parse(arry[i].list[listIndex].total) + c * list[listIndex].price).toFixed(2);
              arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total) + c * list[listIndex].price).toFixed(2);
              arry[i].list[listIndex].instance = "0.00"
            }
          } else {
            if (listIndex == 1) {
              arry[i].list[listIndex].cost = (JSON.parse(arry[i].list[listIndex].price)).toFixed(2);
              arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total)).toFixed(2);
              arry[i].list[listIndex].instance = (JSON.parse(arry[i].list[listIndex].total) - JSON.parse(arry[i].list[listIndex].price)).toFixed(2)
            } else {
              arry[i].list[listIndex].cost = (JSON.parse(arry[i].list[listIndex].total)).toFixed(2);
              arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total)).toFixed(2);
              arry[i].list[listIndex].instance = "0.00"
            }
          }
        } else {
          arry[i].list[listIndex].cost = "0.00";
          arry[i].list[listIndex].bigprice = "0.00";
          arry[i].list[listIndex].instance = '0.00'
        }
      } else {
        if (listIndex == 2) {
          if (a > 0) {
            if (a - 10 > 0) {
              var c = a - 10;
              arry[i].list[listIndex].cost = "0.00";
              arry[i].list[listIndex].instance = (JSON.parse(arry[i].list[listIndex].total) + c * 50).toFixed(2);
              arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total) + c * 50).toFixed(2)
            } else {
              arry[i].list[listIndex].cost = "0.00";
              arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total)).toFixed(2);
              arry[i].list[listIndex].instance = (JSON.parse(arry[i].list[listIndex].total)).toFixed(2)
            }
          } else {
            arry[i].list[listIndex].cost = "0.00";
            arry[i].list[listIndex].instance = "0.00";
            arry[i].list[listIndex].bigprice = "0.00"
          }
        }
      };
      blr.push(arry[i].checked);
    };
    if (blr.length > 0) {
      if (blr.indexOf(false) == -1) {
        var checked = true
      } else {
        var checked = false
      }
    } else {
      var checked = false
    };
    resolve({
      'arry': arry,
      'checked': checked,
    });
    reject('err');
  })
}