//data value  input 
export default function canonical(res) {
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  if (res) {
    var Route = pages[pages.length - 1].route;
    // var value = res.replace(/\s+/g, "");
    var value = res;
    if (Route == 'package/component1/pages/intitle/terms/terms' || Route == 'package/component1/pages/intitle/brand_name/brand_name') {
      var str = value.replace(/\s+/g, "");
      _this.setData({
        value: str
      })
    } else {
      _this.setData({
        value: value
      })
    }
  } else {
    _this.setData({
      value: ''
    })
  }
}