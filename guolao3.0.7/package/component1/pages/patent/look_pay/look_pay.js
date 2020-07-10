import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
import animated from '../../../../../template/animation.js';
import setTime from '../../../../../template/setTime.js';
import Dialog from '../../../../../dist/dialog/dialog';
import route from '../../../../../template/route.js';
import previewoffice from '../../../../../template/previewoffice.js';
import canonical from '../../../../../template/canonical.js';
import sigh from '../../../../../template/template.js';
import copyText from '../../../../../template/copyText.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apply_fee: 0.00,
    patent_advice: '',
    patent_bill: '',
    options: {},
    brhifh: getApp().globalData.sysinfo.statusBarHeight * 4,
    checked: true,
    id: 1,
    focus: false,
    value: '',
    icon: getApp().globalData.icon_Url + sigh.sigh,
    code: 0,
    trial_fee: 0.00,
    total: 0.00,
    status: 1,
  },
  onChecked(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      var focus = false;
    } else {
      var focus = true;
    };
    this.setData({
      id: id,
      focus: focus,
    })
  },
  onChange(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      this.setData({
        checked: !this.data.checked
      })
    } else {
      canonical(e.detail, this);
      // this.setData({
      //   value: e.detail
      // })
    };
  },
  _onClick() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var code = this.data.code;
    var options = this.data.options;
    if (code == 1 ? false : true) {
      this.notify('错误，请重新操作，或下拉刷新下！');
      return;
    };
    NetworkRequest({
      url: '/patent/agentPay',
      data: {
        id: options.id,
        type: 0,
        company_name: '',
        openid: wx.getStorageSync('openId'),
      },
      method: 'POST',
    }).then(res => {
      Toast.clear();
      this.notify(res.data.msg);
      if (code == 1) {
        prevPage.onEnpush();
        setTime().then(ss => {
          wx.navigateBack({
            delta: 1,
          })
        })
      }
    })
  },
  onClick() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var code = this.data.code;
    var options = this.data.options;
    var value = this.data.value;
    var id = this.data.id;
    var apply_fee = this.data.apply_fee;
    if (code == 1 ? false : true) {
      this.notify('错误，请重新操作，或下拉刷新下！');
      return;
    };
    if (id == 2) {
      if (value.length == 0) {
        this.notify('请输入汇款公司名称！');
        return;
      };
    };
    //1 WX 2 YH
    // console.log(options.num);
    NetworkRequest({
      url: (options.num == 1 ? '/patent/agentPay' : '/patent/payRegisterInfo'),
      data: {
        id: options.id,
        type: id == 1 ? 5 : 4,
        company_name: id == 1 ? '' : value,
        openid: wx.getStorageSync('openId'),
      },
      method: 'POST',
    }).then(res => {
      Toast.clear();
      // this.notify(res.data.msg);
      if (code == 1) {
        if (id == 1) {
          this.onWxPay(res.data.data);
        } else {
          this.notify(res.data.msg);
          prevPage.onEnpush();
          setTime().then(ss => {
            wx.navigateBack({
              delta: 1,
            })
          })
        }
      }
    })
  },



  onLook(e) {
    var id = e.currentTarget.dataset.id;
    var url = e.currentTarget.dataset.url;
    previewoffice(url, this);
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    });
  },
  notify(e) {
    Notify({
      text: e,
      duration: 5000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      zIndex: 200
    });
  },
  getData(e) {
    this.toast();
    var token = wx.getStorageSync('token');
    var userid = wx.getStorageSync('userid');
    NetworkRequest({
      url: '/patent/getNotices',
      data: {
        id: e
      },
      method: 'POST',
    }).then(res => {
      Toast.clear();
      wx.stopPullDownRefresh();
      var code = res.data.code;
      this.data.code = code;
      if (code == 1) {
        var arry = res.data.data;
        this.setData({
          apply_fee: arry.apply_fee,
          patent_advice: arry.patent_advice,
          patent_bill: arry.patent_bill,
          trial_fee: arry.trial_fee,
          total: ((JSON.parse(arry.apply_fee) ? JSON.parse(arry.apply_fee) : arry.apply_fee) + (JSON.parse(arry.trial_fee) ? JSON.parse(arry.trial_fee) : arry.trial_fee)).toFixed(2),
        })
      }
    }).catch(err => {
      wx.stopPullDownRefresh();
      Toast.clear();
    })

  },
  onWxPay(list) {
    wx.requestPayment({
      timeStamp: list.timeStamp,
      nonceStr: list.nonceStr,
      package: list.package,
      signType: list.signType,
      paySign: list.paysign,
      success: (res => {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        prevPage.onEnpush();
        setTime().then(ss => {
          wx.navigateBack({
            delta: 1,
          })
        })
      }),
      fail: (err => {
        this.notify('支付失败！');
      }),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.options = options;
    this.getData(options.id);
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
    if (this.data.status == 2) {
      copyText(wx.getStorageSync('filePath'), this);
      this.notify('文件链接已复制，您可以粘贴发送至微信或使用浏览器进行下载！');
    }
    setTime(500).then(res => {
      this.data.status = 1
    })
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
    this.getData(this.data.options.id);
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