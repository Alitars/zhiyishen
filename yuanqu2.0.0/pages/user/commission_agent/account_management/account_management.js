import Toast from '../../../../dist/toast/toast';
import Notify from '../../../../dist/notify/notify';
import NetworkRequest from '../../../../template/GardenNetwork.js';
import onToken from '../../../../template/onToken.js';
import remove from '../../../../template/remove.js';
import route from '../../../../template/route.js';
import logoCheck from '../../../../template/logon.js';
import Dialog from '../../../../dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isShow: true,
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4 + 10,
    checked: false,
    count: 0,
    index: '',
    type: false
  },
  onDt(e) {
    var index = e.currentTarget.dataset.index;
    this.data.index = index;
    this.data.type = true;
    wx.navigateTo({
      url: '/pages/user/commission_agent/account_edit/account_edit'
    })
  },
  onClick() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  onEdit() {
    this.data.type = false;
    wx.navigateTo({
      url: '/pages/user/commission_agent/account_edit/account_edit'
    })
  },
  onChange(e) {
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var arry = JSON.parse(JSON.stringify(this.data.list));
    var checked = (id == 1 ? arry[index].checked : this.data.checked);
    var s = true;
    if (id == 1) {
      arry[index].checked = !checked;
    };
    for (var i = 0; i < arry.length; i++) {
      if (id == 1) {
        if (arry[i].checked == false) {
          var s = false
        }
      } else {
        arry[i].checked = !checked;
      }
    };
    this.setData({
      list: arry,
      checked: (id == 1 ? s : !checked),
    })
  },
  onDelet() {
    var arry = JSON.parse(JSON.stringify(this.data.list));
    if (arry.length == 0) {
      this.notify('请先添加园区子账号');
      return;
    } else {
      var isChooseId = [];
      for (var i = 0; i < arry.length; i++) {
        if (arry[i].checked == true) {
          isChooseId.push(arry[i].id);
        };
      };
      if (isChooseId.length > 0) {
       var id =  isChooseId.join(',');
        console.log(id);
        // return;
        Dialog.confirm({
          title: '提示',
          message: '确定删除该账号'
        }).then(() => {
          // on confirm
          this.toast();
          NetworkRequest({
            url: '/delltask',
            data: {
              u_id: id,
            },
          }).then(res => {
            if (res.data.code = 1) {
              this.notify(res.data.msg);
              this.setData({
                isShow: true
              })
            };
            this.getData();
          }).catch(err => {})
        }).catch(() => {
          // on cancel
        });
      } else {
        this.notify('请先选择您要删除的园区子账号');
        return;
      }
    }
  },
  getData() {
    this.toast();
    NetworkRequest({
      url: '/tasklist',
      data: {},
    }).then(res => {
      console.log(res);
      var arry = res.data.data
      for (var i = 0; i < arry.length; i++) {
        arry[i].firstStr = arry[i].name.slice(0, 1);
        arry[i].checked = false;
      };
      this.setData({
        list: arry,
        checked: false
      })
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
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log(getApp().globalData.sysinfo.statusBarHeight * 4);
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