export default function remove() {
  wx.removeStorageSync('description')
  wx.removeStorageSync('ic')
  wx.removeStorageSync('industry')
  wx.removeStorageSync('keywords')
  wx.removeStorageSync('designdemo')
  wx.removeStorageSync('product')
  wx.removeStorageSync('area')
  wx.removeStorageSync('Patent_name')
  wx.removeStorageSync('type')
  wx.removeStorageSync('plan')
}