// preview img
export default function preview(imgUrls, imgArry) {
  wx.previewImage({
    current: imgUrls,
    urls: imgArry,
  })
}