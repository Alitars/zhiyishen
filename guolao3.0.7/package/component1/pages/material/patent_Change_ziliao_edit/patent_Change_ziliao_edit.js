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
    // console.log(id);
    if (id == 1) {
      chooseImgs('book', this);
    };
    if (id == 2) {
      chooseImgs('blueprint', this);
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
        // is_reduce	是	string	是否申请减免： 1：是 2：否
        // book3
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
  getData(options) {
    NetworkRequest({
      url: '/patent/changeTransferShow',
      data: {
        id: options.id,
        type: options.click_type,
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      var arry = res.data.data;
      // attest: { },
      // applicant: '',
      //   options: { },
      // patentnum: '',
      //   patentname: '',
      //     patentjg: '',
      //       book: '',
      //         blueprint: '',
      if (code == 1) {
        NetworkRequest({
          url: '/patent/getAuthInfo',
          data: {

          },
          method: 'POST',
        }).then(ss => {
          if (ss.data.code == 1) {
            var attest = ss.data.data;
            for (var i = 0; i < attest.length; i++) {
              attest[i].ptype = attest[i].source;
              // attest[i].id = attest[i].id.slice(1, attest[i].id.length);
              if (attest[i].id == arry.buss_id) {
                this.data.attest = attest[i];
                this.setData({
                  applicant: attest[i].name,
                  patentnum: arry.apply_no,
                  patentname: arry.name,
                  patentjg: arry.agent,
                  book: arry.book1,
                  blueprint: arry.book2,
                })
                break;
              }
            }
          }
        }).catch(err => {})
        // this.setData({

        // })
      }

    }).catch(err => {})
    // patent / changeTransferShow
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.options = options;
    this.getData(options);
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
    this.getData(this.data.options);
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