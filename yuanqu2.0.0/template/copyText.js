//copy text
export default function copyText(url) {
  var pages = getCurrentPages();
  var _this = pages[pages.length - 1];
  wx.setClipboardData({
    data: '#知昇(上海)人工智能科技有限公司# 请戳链接>>' + url,
    success: (res => {
      wx.getClipboardData({
        success: (res => {
          _this.data.status = 2
        })
      })
    })
  })
}