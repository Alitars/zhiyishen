import NetworkRequest from '../../../../../template/network.js';
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import copyText from '../../../../../template/copyText.js';
const info = getApp().globalData.sysinfo;
import applyType from "../../../../../template/template.js";
import chooseImgs from "../../../../../template/chooseImgs.js";
import preview from "../../../../../template/preview.js";
import setTime from '../../../../../template/setTime.js';
import route from '../../../../../template/route.js';
import func from '../../../../../template/func.js';
Page({
  data: {
    menu: getApp().globalData.menu.height + getApp().globalData.menu.top,
    icon_Url: getApp().globalData.icon_Url,
    attest: {},
    applicant: '',
    options: {},
    patentnum: '',
    patentname: '',
    patentjg: '',
    book: '',
    blueprint: '',
    show: false,
    checked: false,
    book3: '',
    book4: '',
  },
  onChecked(e) {
    // console.log(e)
    this.setData({
      checked: e.detail
    })
  },
  //申请人
  onapplicant(e) {
    route('pages/user/attest/attest?open=' + true + '&type=' + 222);
  },
  onChange(e) {
    this.setData({
      [e.currentTarget.id]: e.detail.replace(/\s+/g, "")
    })
  },
  onChooseImgs(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 1) {
      chooseImgs('book', this);
    };
    if (id == 2) {
      chooseImgs('blueprint', this);
    };
    if (id == 3) {
      chooseImgs('book3', this);
    };
    if (id == 4) {
      chooseImgs('book4', this);
    };
  },
  notify(res) {
    Notify({
      text: res,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
  },
  toast(res) {
    Toast.loading({
      message: res,
      mask: true,
      zIndex: 2000,
      duration: 0,
    })
  },
  upData() {
    var options = this.data.options;
    var patentnum = this.data.patentnum;
    var patentname = this.data.patentname;
    var patentjg = this.data.patentjg;
    var book = this.data.book;
    var attest = this.data.attest;
    var blueprint = this.data.blueprint;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var checked = this.data.checked;
    var book3 = this.data.book3;
    var book4 = this.data.book4;
    if (!options.id) {
      this.notify('订单错误！');
      return;
    };

    if (!attest.id) {
      this.notify('请添加申请人！');
      return;
    };

    if (patentnum == '' || patentnum.length == 0) {
      this.notify('请输入专利申请号！');
      return;
    };

    if (patentname == '' || patentname.length == 0) {
      this.notify('请输入专利名称！');
      return;
    };

    if (patentjg == '' || patentjg.length == 0) {
      this.notify('请输入代理机构！！');
      return;
    };

    if (blueprint.length == 0 || blueprint == '') {
      this.notify('上传准予变更登记通知书！');
      return;
    };
    if (checked) {
      if (book3.length == 0 || book3 == '') {
        this.notify('请上传上年度企业所得税年度纳税申报表A类封面盖公章！');
        return;
      };
      if (book4.length == 0 || book4 == '') {
        this.notify('请上传上年度企业所得税年度纳税申报表B类封面盖公章！');
        return;
      };
      var is_reduce = 1;
      var book3 = book3 + ',' + book4;
    } else {
      var is_reduce = 2;
      var book3 = '';
    }
    NetworkRequest({
      url: '/patent/changeTransfer',
      data: {
        id: options.id,
        type: attest.ptype,
        buss_id: attest.id,
        type: attest.ptype,
        apply_no: patentnum,
        name: patentname,
        book1: book,
        book2: blueprint,
        agent: patentjg,
        is_reduce: is_reduce,
        book3: book3,
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      this.notify(res.data.msg);
      if (code == 1) {
        prevPage.onEnpush();
        setTime().then(res => {
          wx.navigateBack({
            delta: 1,
          })
        })
      }
    }).catch(err => {})
  },
  isShow() {
    this.setData({
      show: !this.data.show
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.options = options;
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