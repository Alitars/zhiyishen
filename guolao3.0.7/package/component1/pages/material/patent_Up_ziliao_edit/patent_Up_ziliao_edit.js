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
    checked: true,
    blueprint: '',
    book: '',
    icon_Url: getApp().globalData.icon_Url,
    firstname: '',
    idcard: '',
    name: '',
    phone: '',
    mail: '',
    othername: '',
    applicant: '',
    assignee: '',
    ptype: '',
    applicant_sign: '',
    assignee_sign: '',
    isTogether: false,
    checked1: false,
    checked2: false,
    options: {},
    list: [],
    income1: '',
    income2: '',
    show: false,
    is_com: false,
    common_id: '',
    chooseId: [],
    apply_id: '',
    arryBack_up: [],
  },
  //申请人
  onapplicant(e) {
    route('pages/user/attest/attest?open=' + true + '&type=' + 77);
  },

  onassignee(e) {
    route('pages/user/attest/attest?open=' + true + '&type=' + 88);
  },

  onSameapplicant() {
    route('pages/user/attest/attest?open=' + true + '&type=' + 99);
  },
  onChange(e) {
    this.setData({
      [e.currentTarget.id]: e.detail
    })
  },

  onClick(e) {
    // console.log(this.data);
    this.upDtata();
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
    if (id == 3) {
      chooseImgs('income1', this);
    };
    if (id == 4) {
      chooseImgs('income2', this);
    }
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
  upDtata() {
    var userid = wx.getStorageSync('userid');
    var token = wx.getStorageSync('token');
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var id = this.data.options.id;
    var type = this.data.ptype;
    var applicant = this.data.applicant;
    var good_name = this.data.options.click_type;
    var buss_id = this.data.apply_id;
    var list = this.data.list;
    var ss = [];
    var invent_name = this.data.firstname;
    var invent_card = this.data.idcard;
    var t_name = this.data.name;
    var invent_names = this.data.othername;
    var mail = this.data.mail;
    var tel = this.data.phone;
    var book1 = this.data.book;
    var book2 = this.data.blueprint;
    var img = [];
    img.push(this.data.income1);
    img.push(this.data.income2);
    if (this.data.checked2) {
      var is_reduce = 1;
    } else {
      var is_reduce = 2;
    };
    for (var i = 0; i < list.length; i++) {
      ss.push(list[i].id);
    };
    if (ss.length > 0) {
      var co_buss = ss.join(',');
    } else {
      var co_buss = '';
    };
    if (id.length == 0) {
      this.notify('订单错误!');
      return;
    };
    if (applicant == '') {
      this.notify('请添加申请人!');
      return;
    };
    if (invent_name.length == 0 || invent_name == '') {
      this.notify('请输入第一发明人!');
      return;
    };

    if (func.iDCard(invent_card).isPass) {
      this.notify(func.iDCard(invent_card).err);
      return;
    };

    if (t_name.length == 0 || t_name == '') {
      this.notify('请输入技术联系人!');
      return;
    };

    if (func.mobile(tel).isPass) {
      this.notify(func.mobile(tel).err);
      return;
    };

    if (func.mail(mail).isPass) {
      this.notify(func.mail(mail).err);
      return;
    };
    if (book1.length == 0 || book1 == '') {
      this.notify('请上传技术交底书！');
      return;
    };
    if (book2.length == 0 || book2 == '') {
      this.notify('请上传CAD图纸！');
      return;
    };
    var checked2 = this.data.checked2;
    if (checked2) {
      var img = [];
      if (type == 1) {
        if (this.data.income1.length == 0 || this.data.income1 == '') {
          this.notify('请上传个人收入证明盖单位公章！');
          return;
        } else {
          img.push(this.data.income1);
        }
      } else {
        if (this.data.income1.length == 0 || this.data.income1 == '') {
          this.notify('请上传上年度企业所得税年度纳税申报表A类盖公章！');
          return;
        } else {
          img.push(this.data.income1);
        };
        if (this.data.income2.length == 0 || this.data.income2 == '') {
          this.notify('请上传上年度企业所得税年度纳税申报表A类封面盖公章！');
          return;
        } else {
          img.push(this.data.income2);
        }
      }
    }
    var book3 = img.join(',');
    this.toast();
    NetworkRequest({
      url: '/patent/subInfo',
      data: {
        user_id: userid,
        token: token,
        id: id,
        type: type,
        good_name: good_name,
        buss_id: buss_id,
        co_buss: co_buss,
        t_name: t_name,
        invent_name: invent_name,
        invent_card: invent_card,
        tel: tel,
        email: mail,
        book1: book1,
        book2: book2,
        is_reduce: is_reduce,
        invent_names: invent_names,
        book3: book3,
        common_id: this.data.common_id,
        apply_no: '',
        name: this.data.options.click_type,
        agent: '',
      },
      method: 'POST',
    }).then(res => {
      Toast.clear();
      var code = res.data.code;
      if (code == 1) {
        prevPage.onEnpush();
        this.notify(res.data.msg);
        setTime().then(res => {
          wx.navigateBack({
            delta: 1,
          })
        })
      }
    }).catch(err => {
      Toast.clear();
      this.notify('请求出错！')
    })
  },

  onChecked(e) {
    var id = e.currentTarget.dataset.id;
    var checked = this.data['checked' + id];
    var isTogether = this.data.isTogether;
    var ptype = this.data.ptype;
    if (checked) {
      var checked = false;
      if (id == 1) {
        var isTogether = false;
      };
    } else {
      if (id == 2) {
        if (ptype == '' || ptype.length == 0) {
          this.notify('请先添加申请人！');
          return;
        }
      };
      if (id == 1) {
        var isTogether = true;
      };
      var checked = true;
    };
    this.setData({
      ['checked' + id]: checked,
      isTogether: isTogether
    })
  },
  onChooeorder() {
    var is_com = this.data.is_com;
    if (is_com == false) {
      this.notify('错误！');
      return;
    };
    this.toast();
    var arry = this.data.options;
    NetworkRequest({
      url: '/patent/getCommonOrder',
      data: {
        id: arry.id,
        type: arry.click_type
      },
      method: 'POST',
    }).then(res => {
      Toast.clear();
      // console.log(res, 'asasasas');
      var code = res.data.code;
      if (code == 1) {
        var is_com = res.data.data.is_com;
        if (is_com == 0) {
          getApp().globalData.arry = res.data.data.order_ids;
          route('package/component1/pages/material/patent_Choose_order/patent_Choose_order');
        } else {
          this.notify(res.data.msg);
        }
      }
    })
  },
  onDelet(e) {
    var index = e.currentTarget.dataset.index;
    var arry = JSON.parse(JSON.stringify(this.data.list));
    arry.splice(index, 1);
    this.setData({
      list: arry
    })
  },

  getData() {
    NetworkRequest({
      url: '/patent/subInfoShow',
      data: {
        id: this.data.options.id,
        type: this.data.options.click_type,
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        this.data.arryBack_up = JSON.parse(JSON.stringify(arry));
        var auth_info = arry.auth_info;
        var is_reduce = arry.is_reduce;
        var co_bussS = arry.co_bussS;
        var list = [];
        if (arry.common_id !== null && arry.common_id !== undefined && arry.common_id.length > 0) {
          var is_com = false;
          var common_id = arry.common_id;
        } else {
          var is_com = true;
          var common_id = '';
        };
        for (var i = 0; i < auth_info.length; i++) {
          if (auth_info[i].id == arry.buss_id && auth_info[i].type == arry.type) {
            var ptype = auth_info[i].type;
            if (auth_info[i].type == 1) {
              var applicant = auth_info[i].chinese_name;
            } else {
              var applicant = auth_info[i].company_name;
            };
            var apply_id = auth_info[i].id;
            var sign = auth_info[i].id + auth_info[i].type;
          };
          if (co_bussS.length > 0) {
            for (var s = 0; s < co_bussS.length; s++) {
              if (co_bussS[s] == auth_info[i].id) {
                if (list.length < co_bussS.length) {
                  auth_info[i].sign = auth_info[i].id + auth_info[i].type;
                  list.push(auth_info[i]);
                };
              };
            };
          };
        };
        if (is_reduce == 1) {
          var book3 = arry.book3.split(',');
          if (book3.length == 1) {
            var checked = true;
            var income1 = book3[0];
            var income2 = '';
          } else {
            var checked = true;
            var income1 = book3[0];
            var income2 = book3[1];
          };
        } else {
          var income1 = '';
          var income2 = '';
          var checked = false;
        }
        var book3 = arry.book3;
        // console.log(sign);
        this.setData({
          firstname: arry.invent_name,
          idcard: arry.invent_card,
          name: arry.t_name,
          phone: arry.tel,
          mail: arry.email,
          othername: arry.invent_names,
          book: arry.book1,
          blueprint: arry.book2,
          income1: income1,
          income2: income2,
          checked2: checked,
          ptype: ptype,
          applicant: applicant,
          apply_id: apply_id,
          list: list,
          applicant_sign: sign,
          is_com: is_com,
          common_id: common_id,
        })
      }
    }).catch(err => {})
    // 参数名	必选	类型	说明
    // user_id	是	int	用户 id
    // id	是	int	订单 id(单个)
    // type
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
    // console.log(options);
    this.data.options = options;
    this.getData();
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
    // console.log(this.data.list);
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
    this.getData();
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