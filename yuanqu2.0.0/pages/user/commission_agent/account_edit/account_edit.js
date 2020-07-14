import Toast from '../../../../dist/toast/toast';
import Notify from '../../../../dist/notify/notify';
import NetworkRequest from '../../../../template/GardenNetwork.js';
import onToken from '../../../../template/onToken.js';
import remove from '../../../../template/remove.js';
import route from '../../../../template/route.js';
import logoCheck from '../../../../template/logon.js';
import Dialog from '../../../../dist/dialog/dialog';
import setTime from '../../../../template/setTime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4 + 10,
    name: '',
    mobile: '',
    passworld1: '',
    passworld2: '',
    type: false,
    id: '',
  },
  onchange(e) {
    var id = e.currentTarget.id;
    var value = e.detail;
    this.setData({
      [id]: value
    })
  },
  onSave() {
    var type = this.data.type;
    var id = this.data.id;
    console.log((type == false || type == 'false' ? '/addtask' : '/updatetask'));
    var name = this.data.name;
    var mobile = this.data.mobile;
    var passworld1 = this.data.passworld1;
    var passworld2 = this.data.passworld2;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var txt = /^\d{11}$/;
    if (name.length == 0) {
      this.notify('请先输入子代理名称');
      return;
    };
    if (!txt.test(mobile)) {
      this.notify('请输入正确的手机号');
      return;
    };
    if (passworld1 == '' || passworld1.length < 6) {
      this.notify('密码长度不应小于6位');
      return;
    };
    if (passworld1 !== passworld2) {
      this.notify('两次输入的密码不相等')
      return;
    };
    NetworkRequest({
      url: (type == false || type == 'false' ? '/addtask' : '/updatetask'),
      data: {
        name: name,
        mobile: mobile,
        u_id: (type == false || type == 'false' ? '' : id),
        password: passworld1,
        rpass: passworld2,
      },
      method: "POST",
    }).then(res => {
      this.notify(res.data.msg);
      prevPage.onLoad();
      if (res.data.code == 1) {
        setTime().then(ss => {
          wx.navigateBack({
            delta: 1,
          })
        })
      }
    }).catch(err => {})
  },
  notify(e) {
    Notify({
      text: e,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var data = prevPage.data;
    this.data.type = data.type;
    if (data.type) {
      console.log(data.list[data.index]);
      var list = JSON.parse(JSON.stringify(data.list[data.index]));
      this.setData({
        name: list.name,
        mobile: list.mobile,
        id: list.id
      })
    };

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})