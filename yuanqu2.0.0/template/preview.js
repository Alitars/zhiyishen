//浏览图片
export default function preview(imgUrls, imgArry) {
  wx.previewImage({
    current: imgUrls,
    urls: imgArry,
  })
}