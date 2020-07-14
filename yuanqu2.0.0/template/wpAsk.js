export default function wpquest(res) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: getApp().globalData.wp_Url + res.url,
      data: res.data || {},
      header: {},
      method: res.method || 'GET',
      success: resolve,
      fail: reject,
    })
  })
}