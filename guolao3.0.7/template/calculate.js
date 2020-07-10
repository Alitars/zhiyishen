//tui jian 
import Toast from '../dist/toast/toast';
import applyType from './template.js';
export default function calculate(res) {
  return new Promise((resolve, reject) => {
    var arry = JSON.parse(JSON.stringify(res)),
      len = arry.length,
      newarry = res.slice(0, len),
      list = JSON.parse(JSON.stringify(getApp().globalData.list)),
      name = JSON.parse(JSON.stringify(applyType.applyType)),
      type = getApp().globalData.recommendType,
      blr = [];
    arry.sort(function (i, r) {
      return i.num - r.num
    });
    for (var i = 0; i < len; i++) {
      arry[i].sec.sort(function (i, r) {
        return i.num - r.num
      });
      var sl = 0;
      arry[i].firstIndex = i, 0 != arry[i].list.length && arry[i].list != [] || (arry[i].list = list);
      for (var sscore = [], a = 0, sscoretwo = [], checkArry = [], e = 0; e < name.length; e++) arry[i].num == name[e].id && (arry[i].name = name[e].name);
      for (var c = 0; c < arry[i].sec.length; c++) {
        var xxx = arry[i].sec[c].sscore;
        void 0 != xxx && null != xxx || (arry[i].sec[c].sscore = 0), 2 == type && (arry[i].sec[c].sscore = 0), 1 == arry[i].checked && (arry[i].sec[c].checked = !0), checkArry.push(arry[i].sec[c].checked), sscoretwo.push(arry[i].sec[c].sscore), 1 == arry[i].sec[c].checked ? (a += arry[i].sec[c].third.length, sscore.push(arry[i].sec[c].sscore), arry[i].sec[c].checked = !0) : arry[i].sec[c].checked = !1, arry[i].sec[c].firstIndex = i, arry[i].sec[c].twoIndex = c, sl += arry[i].sec[c].third.length
      }
      if (-1 == checkArry.indexOf(!1) ? arry[i].checked = !0 : arry[i].checked = !1, sscore.length > 0) {
        var min = Math.min.apply(null, sscore);
        if (4 == min) var listIndex = 2;
        if (min < 4) var listIndex = 1;
        if (min < 3) var listIndex = 0;
        arry[i].sscore = sscore
      } else {
        var min = Math.min.apply(null, sscoretwo);
        if (4 == min) var listIndex = 2;
        if (min < 4) var listIndex = 1;
        if (min < 3) var listIndex = 0;
        arry[i].sscore = sscoretwo
      }
      var is_agency = list[0].is_agency;
      arry[i].listIndex = 1 == is_agency ? 0 : listIndex, arry[i].number = a, arry[i].isSelect = sl;
      var listIndex = arry[i].listIndex,
        a = arry[i].number;
      if (0 == listIndex || 1 == listIndex)
        if (a > 0)
          if (a - 10 > 0) {
            var c = a - 10;
            1 == listIndex ? (arry[i].list[listIndex].cost = (JSON.parse(arry[i].list[listIndex].price) + c * list[listIndex].smallClass).toFixed(2), arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total) + c * list[0].smallClass).toFixed(2), arry[i].list[listIndex].instance = (JSON.parse(arry[i].list[listIndex].total) + c * list[0].smallClass - (JSON.parse(arry[i].list[listIndex].price) + c * list[listIndex].smallClass)).toFixed(2)) : (arry[i].list[listIndex].cost = (JSON.parse(arry[i].list[listIndex].total) + c * list[listIndex].smallClass).toFixed(2), arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total) + c * list[listIndex].smallClass).toFixed(2), arry[i].list[listIndex].instance = "0.00")
          } else 1 == listIndex ? (arry[i].list[listIndex].cost = JSON.parse(arry[i].list[listIndex].price).toFixed(2), arry[i].list[listIndex].bigprice = JSON.parse(arry[i].list[listIndex].total).toFixed(2), arry[i].list[listIndex].instance = (JSON.parse(arry[i].list[listIndex].total) - JSON.parse(arry[i].list[listIndex].price)).toFixed(2)) : (arry[i].list[listIndex].cost = JSON.parse(arry[i].list[listIndex].total).toFixed(2), arry[i].list[listIndex].bigprice = JSON.parse(arry[i].list[listIndex].total).toFixed(2), arry[i].list[listIndex].instance = "0.00");
      else arry[i].list[listIndex].cost = "0.00", arry[i].list[listIndex].bigprice = "0.00", arry[i].list[listIndex].instance = "0.00";
      else if (2 == listIndex)
        if (a > 0)
          if (a - 10 > 0) {
            var c = a - 10;
            arry[i].list[listIndex].cost = "0.00", arry[i].list[listIndex].instance = (JSON.parse(arry[i].list[listIndex].total) + c * list[listIndex].smallClass).toFixed(2), arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total) + c * list[listIndex].smallClass).toFixed(2)
          } else arry[i].list[listIndex].cost = "0.00", arry[i].list[listIndex].bigprice = JSON.parse(arry[i].list[listIndex].total).toFixed(2), arry[i].list[listIndex].instance = JSON.parse(arry[i].list[listIndex].total).toFixed(2);
      else arry[i].list[listIndex].cost = "0.00", arry[i].list[listIndex].instance = "0.00", arry[i].list[listIndex].bigprice = "0.00";
      blr.push(arry[i].checked)
    }
    if (blr.length > 0)
      if (-1 == blr.indexOf(!1)) var checked = !0;
      else var checked = !1;
    else var checked = !1;
    resolve({
      'arry': arry,
      'checked': checked,
    });
    reject('err')
  })
}