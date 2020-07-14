export default function setTime(hour) {
  return new Promise((resolve, reject) => {
    var time = setTimeout((res) => {
      resolve('res');
      reject('err');
      clearTimeout(time);
    }, hour || 1500);
  });
}