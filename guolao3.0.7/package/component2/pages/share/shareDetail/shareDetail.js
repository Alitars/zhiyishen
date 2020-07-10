import canonical from '../../../../../template/canonical.js';
import NetworkRequest from '../../../../../template/network.js';
import Toast from '../../../../../dist/toast/toast';
import func from '../../../../../template/func.js';
import Notify from '../../../../../dist/notify/notify';
import chooseImgs from '../../../../../template/chooseImgs';


const menuInfo = getApp().globalData.menuInfo;
const info = getApp().globalData.sysinfo;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    height: getApp().globalData.menu.height + getApp().globalData.menu.top,
    arry: [],
    safeHeight: getApp().globalData.sysinfo.statusBarHeight * 4,
    icon_Url: getApp().globalData.icon_Url,
    imgUrls: '',
    formIndex: 0,
    formText: [],
    value:'',
    url: getApp().globalData.icon_Url,
    style:[
      {name:'文字商标',show:false},
      {name:'图形商标',show:true}
    ],
    styleText:['文字商标','图形商标',],
    isBlack:false,
    strimg:'',//这个是文字图片
    create:'',
    show:false,
    strShow:false
  },
  changeName(e){
   this.setData({
     value:e.detail.value
   })
  },
  onBack(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  // 获取字体
  onForm() {
    NetworkRequest({
      url: '/shopCar/fonts',
      data: {},
      method: 'GET',
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        var formText = [];
        for (var i = 0; i < arry.length; i++) {
          if (i == 0) {
            arry[i].iSchoose = true;
          } else {
            arry[i].iSchoose = false;
          };
          formText.push(arry[i].font_name);
        };
        this.setData({
          form: arry,
          formText: formText,
          ch: arry[0].id,
        })
      } else {
        Toast(res.data.msg);
      };
    }).catch(err => { })
  },
  onClick(event) {
    var arry = this.data.arry;
    var list = this.data.list
    var index = event.currentTarget.dataset.index;
    var isSelect = this.data.arry[index].isSelect;
    this.setData({
      ["arry[" + index + "].isSelect"]: !isSelect,
      ["arry[" + index + "].sec"]: isSelect == false ? list[index].sec : []
    })
  },
  upWen(){
    console.log(getApp().globalData.CopyAllClassArry)
  },
  bindPickerChange(e) {
    var value = e.detail.value;
    var id = this.data.form[value].id;
    this.setData({
      ch: id,
      formIndex: value,
    })
    this.onCreateIcon();
  },
  // 更改商标类型
  changeStyle(e){
    var value = e.detail.value;
    this.setData({
      styleIndex: value,
    })
    if(this.data.styleIndex == 1){
      this.setData({
        show:false,
        strShow:true
      })
    }else if(this.data.styleIndex == 0){
      this.setData({
        show:true,
        strShow:false,
      })
    }
  },
  // 上传图片
  uploadImg(){
    wx.showLoading({
      title: '上传中',
    })
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (res => {
        var url = res.tempFilePaths[0];
        wx.uploadFile({
          url: getApp().globalData.main_Url + '/BrandUpload/colorImage',
          filePath: url,
          name: 'url_img',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {},
          success: (res => {
            wx.hideLoading({
            })
            var list = JSON.parse(res.data);
            var img = list.filepath;
            this.setData({
              heibai: img.heibai,
              yuantu:img.yuantu,
              create:img.yuantu,
              styleIndex:1,
              show:false,
              strShow:true,
            })
            // this.data[DataStr + 'heibai'] = img.heibai;
            // this.data[DataStr + 'yuantu'] = img.yuantu;
            // var _id = _this.data[DataStr + '_id'];
            // this.setData({
            //   create: _id == 1 ? img.yuantu : img.heibai,
            // });
            // var arry = JSON.parse(res.data);
            // if (arry.code == 1) {
            //   // var type = this.data.type;
            //   this.setData({
            //     create: arry.filepath,
            //     // create-
            //   });
            // }
          }),
          fail: (err => {
            if (err.errMsg == 'request:fail timeout') {
              var toast = '网络已超时，请稍后重试哦~'
            }
          })
        })
      })
    })
  },
  // 切换原图
  toBlack(e){
    var id = e.currentTarget.dataset.id
    var url = this.data.url + this.data.create
    if(id == 0){
      // 这里是原图
      this.setData({
        isBlack:false,
        create:this.data.yuantu 
      })
    }else if(id == 1){
      // 这里是转黑白
      this.setData({
        isBlack:true,
        create:this.data.heibai
      })
    }
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
    })
  },
  onCreateIcon(e) {
    if (e) {
      canonical(e.detail.value);
    };
    if (this.data.value.length > 0) {
    // if (this.data.isSelect == 0 && this.data.value.length > 0) {
      this.toast();
      wx.request({
        url: this.data.url + '/api/BrandUpload/operationFile',
        data: {
          brand_name: this.data.value,
          type: this.data.ch,
          channelroad: 4,
          user_id: getApp().globalData.userid,
          token: getApp().globalData.token,
        },
        header: {},
        method: 'POST',
        success: (res => {
          Toast.clear();
          var code = res.data.code;
          if (code == 1) {
            this.setData({
              strimg: res.data.img,
            })
          } else {
            this.notify('fail' + ' ' + 'statusCode：' + res.statusCode);
          };
        }),
        fail: (err => {
          Toast.clear();
          this.notify('图片生成失败！');
        }),
      })
    };
    if (this.data.value.length == 0) {
      this.setData({
        create: '',
      })
    }
  },
  // 请求数据
  getData(e){
    NetworkRequest({
      url:'/detectionList',
      data:{
        share_id:e
      },
      method:'POST'
    }).then((res)=>{
      var arry = res.data.data
      var brand_name = res.data.s_brand.brand_name
      var brand_img = res.data.s_brand.brand_img
      for (var i = arry.length - 1; i >= 0; i--) {
        arry[i] = {
          'name': arry[i].name,
          'num': arry[i].num,
          'sec': arry[i].sec,
          'isSelect': false,
        };
        for (var m = arry[i].sec.length - 1; m >= 0; m--) {
          arry[i].sec[m] = {
            'name': arry[i].sec[m].name,
            'num': arry[i].sec[m].num,
            'third': arry[i].sec[m].third,
          };
          if (arry[i].sec.length == 0) {
            arry.splice(i, 1);
          };
        };
      };
      var list = JSON.parse(JSON.stringify(arry))

      this.setData({
        arry:arry,
        list:list
      })

      if(brand_name == null||brand_name == ''){
        this.setData({
          styleIndex:1,
          create:brand_img,
          heibai:res.data.s_brand.heibai,
          yuantu:brand_img,
          show:false,
          strShow:true
        })
      }else{
        this.setData({
          styleIndex:0,
          strimg:brand_img,
          value:brand_name,
          show:true,
          strShow:false
        })
      }
    })
  },

  // 检测
  toCheck(){
    wx.setStorageSync('from', 4)
    if(this.data.styleIndex == 0){
      wx.navigateTo({
        url: '/package/component1/pages/services/hs_check/hs_check?brandname='+this.data.value+'&shareId='+this.data.shareId+'&imgUrl='+this.data.strimg,
      })
    }else if(this.data.styleIndex == 1){
      wx.navigateTo({
        url: '/package/component1/pages/services/hs_check/hs_check?brandname=&shareId='+this.data.shareId+'&imgUrl='+this.data.create,
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shareId:options.id
    })
    this.getData(this.data.shareId)
    this.onForm();
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
    var token = wx.getStorageSync('token')
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
  onShareAppMessage: function (res) {
  }
})