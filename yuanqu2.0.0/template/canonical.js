//data value  input 
export default function canonical(res) {
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  if (res) {
    var Route = pages[pages.length - 1].route;
    var value = res.replace(/\s+/g, "");
    // var value = res.replace(/[\ |\s*|\？|\|\…|\‘|\’|\；|\【|\】|\·|\/|\、|\|\。|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\<|\.|\>|\/|\?]/g, "").replace(/[0-9]+/g, "");
    if (Route == 'package/component/pages/intitle/terms/terms' || Route == 'package/component/pages/intitle/brand_name/brand_name') {
      // var str = value.replace(/[a-zA-Z]+/g, "");
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