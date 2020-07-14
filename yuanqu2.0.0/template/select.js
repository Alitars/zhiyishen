export default function select(event) {
  return new Promise((resolve, reject) => {
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    if (event) {
      var id = event.currentTarget.dataset.id;
      var index = event.currentTarget.dataset.index;
      var twoIndex = event.currentTarget.dataset.two;
      var firstIndex = event.currentTarget.dataset.first;
    };
    var arry = JSON.parse(JSON.stringify(_this.data.arry));
    if (id == 1) {
      var list = arry[index];
      if (list.checked == false) {
        list.checked = true;
        for (var s = 0; s < list.sec.length; s++) {
          list.sec[s].checked = true;
        };
        arry[index] = list
      } else {
        for (var s = 0; s < list.sec.length; s++) {
          list.sec[s].checked = false
        };
        list.checked = false;
        _this.setData({
          checked: false,
        });
        arry[index] = list
      };
    };
    if (id == 2) {
      var list = arry[firstIndex];
      if (list.sec.length == 1) {
        if (list.sec[twoIndex].checked == false) {
          list.sec[twoIndex].checked = true;
          list.checked = true;
          arry[firstIndex] = list
        } else {
          list.sec[twoIndex].checked = false;
          list.checked = false;
          arry[firstIndex] = list
        };
      } else {
        if (list.sec[twoIndex].checked == false) {
          list.sec[twoIndex].checked = true;
          var block = [];
          for (var c = 0; c < list.sec.length; c++) {
            block.push(list.sec[c].checked);
          };
          if (block.indexOf(true) >= 0 & block.indexOf(false) == -1) {
            list.checked = true
          } else {
            list.checked = false
          };
          arry[firstIndex] = list
        } else {
          list.sec[twoIndex].checked = false;
          list.checked = false;
          arry[firstIndex] = list
        };
      };
    };
    if (id == 3) {
      if (_this.data.checked == false) {
        for (var i = 0; i < arry.length; i++) {
          arry[i].checked = true;
          if (arry[i].sec.length > 0) {
            for (var s = 0; s < arry[i].sec.length; s++) {
              arry[i].sec[s].checked = true
            };
          };
        };
        _this.setData({
          checked: true,
        });
      } else {
        for (var i = 0; i < arry.length; i++) {
          arry[i].checked = false;
          if (arry[i].sec.length > 0) {
            for (var s = 0; s < arry[i].sec.length; s++) {
              arry[i].sec[s].checked = false
            };
          };
        };
        _this.setData({
          checked: false,
        });
      };
    };
    resolve(arry)
  })
}