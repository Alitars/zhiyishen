//up img
import Toast from '../dist/toast/toast';
import Notify from '../dist/notify/notify';
export default function chooseImgs(data) {
  return new Promise((resolve, reject) => {
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (res => {
        // console.log(res,'asddada');
        // if (_this.route == 'package/component1/pages/material/mergedata/mergedata') {
        //   var size = res.tempFiles[0].size / 1024;
        //   if (size <= 300) {
        //     _this.notify('您上传的图片小于300kb,请重新上传');
        //     return
        //   }
        // };
        var url = res.tempFilePaths[0];
        console.log(121321312)

        wx.uploadFile({
          url: getApp().globalData.main_Url + '/BrandUpload/brandUploadFile',
          filePath: url,
          name: 'url_img',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {},
          success: (res => {
            console.log(8975695496789457694857)
            Toast.clear();
            var arry = JSON.parse(res.data);
            wx.hideLoading();
            if (arry.code == 1) {
              var type = _this.data.type;
              resolve(arry.filepath);
              _this.setData({
                [data]: arry.filepath
              });
              _this.notify('上传成功')
            } else {
              _this.notify(arry.msg)
            }
          }),
          fail: (err => {
            Toast.clear();
            if (err.errMsg == 'request:fail timeout') {
              var toast = '网络已超时，请稍后重试哦~'
            } else {
              var toast = err.errMsg
            };
            Notify({
              text: toast,
              duration: 3000,
              selector: '#custom-selector',
              backgroundColor: '#f44',
              color: '#fff',
            });
            wx.hideLoading();
            wx.stopPullDownRefresh()
          })
        })
      })
    })
  })
}