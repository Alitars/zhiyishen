import Toast from '../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../template/network.js';
import applyType from '../../../../../template/template.js';
import util from '../../../../../utils/time.js';
const time = parseInt(new Date().getTime() / 1000);
import setTime from '../../../../../template/setTime.js';
import route from '../../../../../template/route.js';
Page({
  data: {
    SafeHigh: getApp().globalData.sysinfo.windowHeight,
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    checked: 2,
    focus:true,
    value:''
  },
  // 获取数据
  getData(){
    NetworkRequest({
      url:'/patent/answerDetail',
      data:{
        id:this.data.id
      },
      method:'POST'
    }).then((res)=>{
      var orderId = res.data.data.order_id
      var name = res.data.data.name
      var price = res.data.data.price
      this.setData({
        orderId,
        name,
        price
      })
    })
  },
  // 切换 支付方式
  onChecked(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 2) {
      this.setData({
        focus: true,
        checked: id,
      })
    } else {
      this.setData({
        focus: false,
        checked: id,
      })
    }

  },
  // 保存value
  onChange(e){
    this.setData({
      value :e.detail
    })
  },
  // 付钱
  onPay(){
    var checked = this.data.checked;
    if (checked == 0) {
      this.notify('请先选择您的支付方式');
      return;
    };
    var openid = wx.getStorageSync('openId')
    var pages = getCurrentPages();
    var PrePage = pages[pages.length - 2];
    var id = this.data.checked;
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var order_id = this.data.id;
    // 非空校验
    if (id == 2) {
      if (!this.data.value.replace(/\s+/g, "")) {
        this.notify('请填写正确的汇款公司名称');
        this.setData({
          focus: true,
        })
        return;
      };
    };
    wx.showLoading({
      title: '支付中...',
      mask: true,
      duration: 10000,
    })
    // 请求付款接口
    NetworkRequest({
      url: '/patent/answerPay',
      data: {
        openid:openid,
        id: order_id,//订单id
        pay_type: id == 2 ? 4 : 5,//付款类型
        company_name: id == 2 ? this.data.value : '',//如果是银行转账传入银行值
      },
      method: 'POST',
    }).then((res) => {
      this.onStopLoading();
      console.log(res)
      if (res.data.code == 1) {
        if (id == 2) {
          //转账
          this.notify('待线下付款成功，即将返回订单列表');
            setTime(4000).then(() => {
              wx.redirectTo({
                url: '/package/component2/pages/patent_book/composeList/composeList',
              })
            });
        };
        if (id == 1) {
          this.onWxpay(res.data.data);
        }
      } else {
        this.onStopLoading();
        this.notify(res.data.msg);
      }
    }).catch(err => {
      this.onStopLoading();
      this.notify('请求失败，请重试');
    })
  },
  // 调起微信支付
  onWxpay(list) {
    var pages = getCurrentPages();
    wx.requestPayment({
      timeStamp: list.timeStamp,
      nonceStr: list.nonceStr,
      package: list.package,
      signType: list.signType,
      paySign: list.paysign,
      success: (res => {
        wx.redirectTo({
          url: '/package/component2/pages/patent_book/composeList/composeList',
        })
      }),
      fail: (err => {
        var error = err.errMsg == 'requestPayment:fail cancel' ? '已取消支付' : err.errMsg.slice(0, 100);
        this.notify(error);
        // ,'即将跳转订单列表'
        // return;
        // var pages = getCurrentPages();
        // var nownRoute = pages[pages.length - 2].route;
        // setTime().then(res => {
        //   if (idtype == 1) {
        //     if (nownRoute == 'pages/user/my_order/my_order') {
        //       wx.navigateBack({
        //         delta: 1,
        //       })
        //     } else {
        //       wx.redirectTo({
        //         url: '/pages/user/my_order/my_order?id=' + 1,
        //       })
        //     }
        //   }
        //   if (idtype == 2) {
        //     if (nownRoute == 'pages/user/my_patent/my_patent') {
        //       wx.navigateBack({
        //         delta: 1,
        //       })
        //     } else {
        //       wx.redirectTo({
        //         url: "/pages/user/my_patent/my_patent?id=" + 1,
        //       });
        //     };
        //   };
        //   if (idtype == 3) {
        //     if (nownRoute == 'pages/user/my_copyright/my_copyright') {
        //       wx.navigateBack({
        //         delta: 1,
        //       })
        //     } else {
        //       wx.redirectTo({
        //         url: "/pages/user/my_copyright/my_copyright?id=" + 1,
        //       });
        //     };
        //   }
        // });
      }),
    })
  },
  notify(event) {
    wx.showToast({
      title: event,
      icon: 'none',
      duration: 5000,
      mask: true
    })
  },
  onStopLoading() {
    wx.hideLoading({
      complete: (res) => {},
    })
  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.getData()
  },
  onShow: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
})