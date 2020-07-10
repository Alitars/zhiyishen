import NetworkRequest from '../../../../../template/network.js';
const info = getApp().globalData.sysinfo;
import setTime from '../../../../../template/setTime';
import func from '../../../../../template/func.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: info.screenHeight + 40,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    images: "https://admin.iguolao.com/public/uploads/20200417110433175.png",
    display: true,
    moblie: '',
    codes: '',
    scene_num: 0,
    code: 0,
    time: 60,
    invitation_code: 0,
  },

  showToast(event, time) {
    wx.showToast({
      title: event,
      icon: 'none',
      duration: 5000,
      mask: true,
    })
    wx.hideLoading({
      complete: (res) => {},
    })
  },
  onSend() {
    var txt = /^\d{11}$/;
    // console.log(txt.test(this.data.moblie));
    if (txt.test(this.data.moblie)) {
      func.sendma(this.data.moblie, 1).then((res => {
        // console.log(res);
        if (res.data.code == 1) {
          this.setData({
            code: 1,
          });
          func.countDown(60);
        };
      }))
    } else {
      this.showToast('您输入的手机号有误', 5000);
    }
  },
  onClick() {
    wx.showLoading({
      title: '请稍后...',
    })
    var txt = /^\d{11}$/;
    var codes = this.data.codes;
    var moblie = this.data.moblie;
    var invitation_code = this.data.invitation_code;
    if (txt.test(moblie)) {
      if (codes.length !== 6) {
        this.showToast('您输入的验证码有误', 5000);
        return;
      };
      func.getOpenID('').then(res => {
        // console.log(res, 'asasas');
        if (res.data.code == 1) {
          if (typeof (res.data.data) == 'string') {
            var arry = JSON.parse(res.data.data)
          } else {
            var arry = res.data.data;
          };
          this.onRegister({
            openId: arry.openId,
            moblie: moblie,
            code: codes,
            avatarUrl: arry.avatarUrl,
            nickName: arry.nickName,
            invitation_code: invitation_code,
            unionid: arry.unionId ? arry.unionId : '',
          })
        }
      })
    } else {
      this.showToast('您输入的手机号有误', 5000);
    }
  },
  onRegister(event) {
    NetworkRequest({
      url: '/shareRegist',
      data: {
        code: event.code,
        phone: event.moblie,
        invitation_code: event.invitation_code,
        type: 5,
        channel: 2,
        nickName: event.nickName,
        openId: event.openId,
        avatarUrl: event.avatarUrl,
        unionid: event.unionid,
      },
    }).then(res => {
      setTime(1500).then(() => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 5000,
          mask: true,
        })
      });
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        getApp().globalData.userid = arry.id;
        getApp().globalData.token = arry.apptoken;
        wx.setStorageSync('token', arry.apptoken);
        wx.setStorageSync('userid', arry.id);
        wx.setStorageSync('phone', arry.mobile);
        setTime(3000).then(() => {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '进入小程序查看更多信息',
            confirmColor: "#f96509",
            success: (res => {
              if (res.confirm) {
                this.onRest();
              }
            })
          })
        })
      }
    }).catch(err => {})
  },
  onIput(e) {
    var id = e.currentTarget.dataset.id;
    var value = e.detail.value.replace(/\s+/g, "");
    this.setData({
      moblie: id == 1 ? value : this.data.moblie,
      codes: id == 2 ? value : this.data.codes,
    })
  },
  onRest() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  onpreImg() {
    wx.showToast({
      title: '长按图片保存',
      icon: 'none',
      duration: 8000,
    })
    setTime(1000).then(() => {
      wx.previewImage({
        url: 'https://admin.iguolao.com/public/uploads/20200417110433175.png',
        urls: ['https://admin.iguolao.com/public/uploads/20200417110433175.png'],
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '活动已结束',
      confirmColor: "#f96509",
      success: (res => {
        if (res.confirm) {
          this.onRest();
        }
      })
    })
    return;
    if (JSON.stringify(options) == '{}') {
      setTime(2000).then(() => {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '暂无邀请信息,返回首页查看更多信息',
          confirmColor: "#f96509",
          success: (res => {
            if (res.confirm) {
              this.onRest();
            }
          })
        })
      })
    } else {
      this.data.invitation_code = options.scene;
    };
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    setTime(1000).then(() => {
      wx.hideLoading({});
      this.setData({
        display: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})