import NetworkRequest from './network.js';
import Toast from '../dist/toast/toast';
import Notify from '../dist/notify/notify';
import applyType from './template.js';
import copyText from './copyText.js';
import setTime from './setTime.js';
export default function previewoffice(url) {
  Toast.loading({
    message: '加载中...',
    duration: 0,
  });
  wx.downloadFile({
    url: getApp().globalData.dm_Url + url,
    success: (res => {
      var filePath = res.tempFilePath
      wx.openDocument({
        filePath: filePath,
        success: (res => {
          Toast.clear();
          wx.setStorageSync('filePath', getApp().globalData.dm_Url + url);
        }),
        fail: (err => {
          Toast.clear();
          wx.downloadFile({
            url: getApp().globalData.icon_Url + url,
            success: (res => {
              var filePath = res.tempFilePath
              wx.openDocument({
                filePath: filePath,
                success: (res => {
                  Toast.clear();
                  wx.setStorageSync('filePath', getApp().globalData.icon_Url + url);
                }),
                fail: (err => {
                  wx.previewImage({
                    current: getApp().globalData.icon_Url + url,
                    urls: [getApp().globalData.icon_Url + url],
                    success: (res => {
                      Toast.clear();
                      wx.setStorageSync('filePath', getApp().globalData.icon_Url + url);
                    }),
                    fail: (err => {
                      Toast.clear();
                      Notify({
                        text: '打开失败！',
                        duration: 3000,
                        selector: '#custom-selector',
                        backgroundColor: '#f44',
                        color: '#fff',
                      })
                    }),
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}