//选择图片
import Toast from '../dist/toast/toast';
import Notify from '../dist/notify/notify';
export default function chooseImgs(data) {
  return new Promise((resolve, reject) => {
    var pages = getCurrentPages();
    var _this = pages[pages.length - 1];
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res => {
        // if (_this.route == 'package/component/pages/material/mergedata/mergedata' && data !== 'identity_img') {
        //   var size = res.tempFiles[0].size / 1024;
        //   // console.log(size)
        //   if (size <= 300) {
        //     _this.notify('您上传的图片小于300kb,请重新上传');
        //     return;
        //   };
        // };
        var url = res.tempFilePaths[0];
        Toast.loading({
          message: '上传中...',
          duration: 0,
        })
        wx.uploadFile({
          url: getApp().globalData.main_Url + '/BrandUpload/brandUploadFile',
          filePath: url,
          name: 'url_img',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {

          },
          success: (res => {
            Toast.clear();
            var type =  _this.data.type;
            if (JSON.parse(res.data)) {
              var list = JSON.parse(res.data);
            } else {
              var list = res.data;
            };
            resolve(list.filepath);
            _this.setData({
              [data]: list.filepath
            })
            _this.notify('上传成功');
          }),
          fail: (err => {
            // reject(err);
            Toast.clear();
            _this.notify('上传失败');
          })
        })
      })
    })
  })
}