const main_Url = getApp().globalData.main_Url;
const userid = wx.getStorageSync('userid');
import Toast from '../../../dist/toast/toast';
import Notify from '../../../dist/notify/notify';
import NetworkRequest from '../../../template/network.js';
import setTime from '../../../template/setTime.js';
Page({
  data: {
    value: '',
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    })
  },
  notify(res) {
    Notify({
      text: res,
      duration: 1000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
  },
  onSubmit() {
    var value = this.data.value;
    if(value.length==0){
      this.notify('请先输入');
    }else{
      Toast.loading({
        message: '提交中...',
        duration: 1000,
      });
      NetworkRequest({
        url: '/complaint',
        data: {
          content: value,
          user_id: userid
        },
        method: 'POST',
      }).then(res => {
        var code = res.data.code;
        if (code == '1') {
          setTime(2000).then(res => {
            this.notify(res.data.msg)
          });
          setTime(3000).then(res => {
            wx.navigateBack()
          });
        };
      }).catch(err => { })
    }
  },
})