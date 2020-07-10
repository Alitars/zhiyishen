export default function setInter(hour, clear) {
  if (clear == true) {
    getApp().globalData.stop = true;
  };
  return new Promise((resolve, reject) => {
    var time = setInterval(function() {
      var stop = getApp().globalData.stop;
      if (stop == true) {
        clearInterval(time);
      } else {
        resolve('res');
        reject('err');
      };
    }, hour || 1000);
  });
}