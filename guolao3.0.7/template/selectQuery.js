//xml节点信息
export default function selectQuery(id) {
  return new Promise((resolve, reject) => {
    var query = wx.createSelectorQuery();
    query.select('#' + id).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(res => {
      resolve(res);
      reject('err');
    })
  })
}