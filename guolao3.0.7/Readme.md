import NetworkRequest from '../../template/network.js';
NetworkRequest({
  data: {

  },
}).then(res => {

}).catch(err => { })
sdfsfddsfd
15050868275
left,#2fa5fc,#277cfb


import setTime from '../../../template/setTime.js';
setTime().then(res=>{
})
  filter: grayscale(100%); 
   -webkit-filter: grayscale(100%);
申田经济开发区
123456
面包
账号
维强:



kaifang.mao@51guolao.com.cn
menuInfo
SafeButtom
safeHeight
维强:
Zs123456


yongsheng.weixin@51guolao.com.cn 开放平台

维强:
mp.weixin.qq.com

维强:
商户号1560763501

维强:
wxa6a5a6c3bb2019f5

西跃:
wx136b9b05752a428d

维强:
wxa6a5a6c3bb2019f5
wx16a1ced5f98e9ec0

园区账号
wx85e5ecd08d4f4840
维强:
d2276724af0fd1330ebf4483fb833d14

维强:
17702108117 

维强:
振华经济园区



测试WX
w1028011

AppID(小程序ID)wx136b9b05752a428d
AppSecret(小程序密钥)754ccf72068f690b421f5b1b25d0c499复制

后台
admin
admin888

13554984234
123456







园区
yuanquchengxu@51guolao.com.cn




13162542312
  654321
定义一个测试函数，将待测函数作为参数传入
function test(func){
 
 var start = new Date().getTime();//起始时间
 
 func();//执行待测函数
 
 var end = new Date().getTime();//接受时间
 
 return (end - start)+"ms";//返回函数执行需要时间
 
}
gl_Url

        // if (index == 1) {
    //   this.setData({
    //     ["checkArry[" + id + "].checkone"]: !isCheck,
    //   });
    //   if (id == 0 && isCheck == true) {
    //     this.setData({
    //       ["checkArry[" + id + "].checktwo"]: false,
    //     })
    //   } else {
    //     this.setData({
    //       ["checkArry[" + id + "].checktwo"]: isCheck,
    //     })
    //   };
    // } else {
    //   if (id == 0 && isCheck == true) {
    //     this.setData({
    //       ["checkArry[" + id + "].checkone"]: !isCheck,
    //       ["checkArry[" + id + "].checktwo"]: false,
    //     });
    //   } else {
    //     this.setData({
    //       ["checkArry[" + id + "].checkone"]: isCheck,
    //       ["checkArry[" + id + "].checktwo"]: !isCheck
    //     });
    //   };
    // };






    const info = getApp().globalData.sysinfo;
const main_Url = getApp().globalData.main_Url;
import applyType from '../../../../../template/template.js';
import Toast from '../../../../../dist/toast/toast';
import NetworkRequest from '../../../../../template/network.js';
import Dialog from '../../../../../dist/dialog/dialog';
import Notify from '../../../../../dist/notify/notify';
import paydetail from '../../.././../../template/paydetail.js';
Page({

  data: {
    i: 0,
    SafeButtom: info.statusBarHeight * 4,
    imgUrls: [],
    current: 1,
    show: '',
    swiperError: 0,
    applyType: applyType.applyType,
    form: [],
    ch: 1,
    icon_Url: getApp().globalData.icon_Url,
    list: [],
    current2: 0,
    name: [],
    ss: 0,
    pass: false,
    img: '',
  },
  onFrom(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.setData({
      ch: id,
      ss: index
    })
  },
  onSure() {
    this.setData({
      show: !this.data.show,
    })
    var current = this.data.current;
    var imgUrls = this.data.imgUrls;
    var name = imgUrls[current].title;
    var ch = this.data.ch;
    this.onCreateIcon(name, ch);
  },
  onChoose(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var check = e.currentTarget.dataset.check;
    var sec = JSON.parse(JSON.stringify(this.data.name[index].fir[id].sec));
    if (check) {
      this.setData({
        ["imgUrls[" + index + "].fir[" + id + "].isSelect"]: false,
        ["imgUrls[" + index + "].fir[" + id + "].sec"]: []
      })
    } else {
      this.setData({
        ["imgUrls[" + index + "].fir[" + id + "].isSelect"]: true,
        ["imgUrls[" + index + "].fir[" + id + "].sec"]: sec
      })
    }
  },
  onCreateIcon(name, ch) {
    this.toast();
    wx.request({
      url: this.data.icon_Url + '/api/BrandUpload/operationFile',
      data: {
        brand_name: name,
        type: ch,
        channelroad: 4,
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res => {
        Toast.clear();
        var code = res.data.code;
        if (code == 1) {
          this.setData({
            ["imgUrls[" + this.data.current + "].icon"]: res.data.img
          })
        }
      }),
      fail: (err => {
        Toast.clear();
        
      }),
    })
  },
  toast() {
    Toast.loading({
      message: '加载中...',
      duration: 0,
      mask: true,
      zIndex:1000
    })
  },
  notify(res) {
    Notify({
      text: res,
      duration: 2000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
    })
  },
  onChange(e) {
    var index = e.detail.current;
    var name = JSON.parse(JSON.stringify(this.data.name[index]));
    var imgUrls = JSON.parse(JSON.stringify(this.data.imgUrls[index]));
    if (imgUrls.fir.length > 0) {
      var fir = imgUrls.fir;
      this.setData({
        current: index,
      })
    } else {
      var fir = name.fir;
      for (var i = 0; i < fir.length; i++) {
        fir[i].sec = [];
      };
      this.setData({
        current: index,
        ["imgUrls[" + index + "].fir"]: fir,
      })
    };
  },
  onClick() {
    this.getData();
    // this.toast();
    // var imgUrls = JSON.parse(JSON.stringify(this.data.imgUrls));
    // var name = JSON.parse(JSON.stringify(this.data.name));
    var current = this.data.current;
    // imgUrls[current].fir = name[current].fir;
    var logo = this.data.imgUrls[current].title;
    // var list = this.data.list;
    // if (list.length == 0) {
    //   this.getType();
    // };
    if (this.data.imgUrls[current].icon) {
      this.data.img = this.data.imgUrls[current].icon;
      //   var img = imgUrls[current].icon;
      //   var arry = imgUrls[current].fir;
      //   var record = this.data.applyType;
      //   for (var i = 0; i < arry.length; i++) {
      //     for (var e = 0; e < record.length; e++) {
      //       if (arry[i].num == record[e].id) {
      //         arry[i].name = record[e].name;
      //         break;
      //       };
      //     };
      //   };
      //   var list = this.data.list;
      //   for (var i = 0; i < arry.length; i++) {
      //     var sscore = [];
      //     var sl = 0;
      //     arry[i].list = list;
      //     arry[i].number = 0;
      //     arry[i].checked = false;
      //     for (var s = 0; s < arry[i].sec.length; s++) {
      //       arry[i].sec[s].checked = false;
      //       arry[i].firstIndex = i;
      //       arry[i].sec[s].firstIndex = i;
      //       arry[i].sec[s].twoIndex = s;
      //       sl += arry[i].sec[s].third.length;
      //       sscore.push(arry[i].sec[s].sscore);
      //       if (arry[i].sec[s].third) {} else {
      //         arry[i].sec[s].third = [];
      //       };
      //     };
      //     arry[i].isSelect = sl;
      //     arry[i].sscore = sscore;
      //   };
      //   for (var i = 0; i < arry.length; i++) {
      //     if (arry[i].sscore.length > 0) {
      //       var min = Math.min.apply(null, arry[i].sscore);
      //       if (min < 4) {
      //         arry[i].listIndex = 1;
      //         if (min < 3) {
      //           arry[i].listIndex = 0;
      //         };
      //       } else {
      //         arry[i].listIndex = 2;
      //       };
      //     };
      //   };
      // getApp().globalData.recommentArry = arry;
      // wx.navigateTo({
      //   url: '/package/component1/pages/intitle/recommend/recommend?name=' + logo + '&imgUrls=' + img,
      // })
      // Toast.clear();
    } else {
      wx.request({
        url: getApp().globalData.icon_Url + '/api/BrandUpload/operationFile',
        data: {
          brand_name: logo,
          type: 1,
          channelroad: 4,
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res => {
          var code = res.data.code;
          if (code == 1) {
            // var img = res.data.img;
            this.data.img = res.data.img;
            // var arry = imgUrls[current].fir;
            // var record = this.data.applyType;
            // for (var i = 0; i < arry.length; i++) {
            //   for (var e = 0; e < record.length; e++) {
            //     if (arry[i].num == record[e].id) {
            //       arry[i].name = record[e].name;
            //     };
            //   };
            // };
            // var list = this.data.list;
            // for (var i = 0; i < arry.length; i++) {
            //   var sscore = [];
            //   var sl = 0;
            //   arry[i].list = list;
            //   arry[i].number = 0;
            //   arry[i].checked = false;
            //   for (var s = 0; s < arry[i].sec.length; s++) {
            //     arry[i].sec[s].checked = false;
            //     arry[i].firstIndex = i;
            //     arry[i].sec[s].firstIndex = i;
            //     arry[i].sec[s].twoIndex = s;
            //     sl += arry[i].sec[s].third.length;
            //     sscore.push(arry[i].sec[s].sscore);
            //     if (arry[i].sec[s].third) {} else {
            //       arry[i].sec[s].third = [];
            //     };
            //   };
            //   arry[i].isSelect = sl;
            //   arry[i].sscore = sscore;
            // };
            // for (var i = 0; i < arry.length; i++) {
            //   if (arry[i].sscore.length > 0) {
            //     var min = Math.min.apply(null, arry[i].sscore);
            //     if (min < 4) {
            //       arry[i].listIndex = 1;
            //       if (min < 3) {
            //         arry[i].listIndex = 0;
            //       };
            //     } else {
            //       arry[i].listIndex = 2;
            //     };
            //   };
            // };
            // getApp().globalData.recommentArry = arry;
            // wx.navigateTo({
            //   url: '/package/component1/pages/intitle/recommend/recommend?name=' + logo + '&imgUrls=' + img,
            // })
            // Toast.clear();
          }
        }),
        // fail: (err => {
        //   Toast.clear();
        //   
        // }),
      })
    }
  },
  onClose() {
    this.setData({
      show: !this.data.show,
    })
    if (this.data.form.length > 0) {} else {
      this.getFont();
    }
  },
  getFont() {
    NetworkRequest({
      url: '/shopCar/fonts',
      data: {},
      method: 'GET',
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        var arry = res.data.data;
        this.setData({
          form: arry,
        })
      } else {
        Toast(res.data.msg);
      };
    })
  },
  getType() {
    paydetail()
  },
  getData(key, text) {
    this.toast();
    var options = wx.getStorageSync('options');
    // console.log(options);
    NetworkRequest({
      url: '/voiceselect',
      data: {
        keywords: options.servername,
        text: options.name,
        groups: wx.getStorageSync('groups'),
      },
      method: 'POST',
    }).then(res => {
      var code = res.data.code;
      var arry = res.data.data;
      if (arry.length > 0) {
        this.onRecord(arry);
      } else {

      };
    }).catch(err => {
      Dialog.alert({
        title: '提示',
        message: '请求出错！'
      }).then(() => {
        wx.navigateBack({
          delta: 1,
        })
      });
    })
  },
  onRecord(arry) {
    var current = this.data.current;
    var logo = this.data.imgUrls[current].title;
    // var name = this.data.name;
    var record = applyType.applyType;
    for (var i = 0; i < arry.length; i++) {
      for (var e = 0; e < record.length; e++) {
        if (arry[i].num == record[e].id) {
          arry[i].name = record[e].name;
        };
      };
    };
    var list = this.data.list;
    for (var i = 0; i < arry.length; i++) {
      var sl = 0;
      var sscore = [];
      arry[i].list = list;
      arry[i].number = 0;
      arry[i].checked = false;
      for (var s = 0; s < arry[i].sec.length; s++) {
        arry[i].sec[s].checked = false;
        arry[i].firstIndex = i;
        arry[i].sec[s].firstIndex = i;
        arry[i].sec[s].twoIndex = s;
        sl += arry[i].sec[s].third.length;
        sscore.push(arry[i].sec[s].sscore);
        if (arry[i].sec[s].third) {} else {
          arry[i].sec[s].third = [];
        };
      };
      arry[i].isSelect = sl;
      arry[i].sscore = sscore;
    };
    for (var i = 0; i < arry.length; i++) {
      if (arry[i].sscore.length > 0) {
        var min = Math.min.apply(null, arry[i].sscore);
        if (min < 4) {
          arry[i].listIndex = 1;
          if (min < 3) {
            arry[i].listIndex = 0;
          };
        } else {
          arry[i].listIndex = 2;
        };
      };
    };
    getApp().globalData.recommentArry = arry;
    // var options = wx.getStorageSync('options');
    // console.log(arry);
    // progress(this);
    var time = setInterval(() => {
      // if (this.data.percent < 80 || this.data.percent < 90) {
      // progress(this);
      // } else {
      if (arry.length > 0 && this.data.img.length > 0) {
        clearInterval(time);
        // this.setData({
        //   percent: 100
        // })
        wx.navigateTo({
          url: '/package/component1/pages/intitle/recommend/recommend?name=' + logo + '&imgUrls=' + this.data.img,
        })
      }
      // }
    }, 500)
  },
  onLoad: function(options) {
    var index = options.index;
    var arry = JSON.parse(JSON.stringify(getApp().globalData.nameArry));
    var len = arry.length;
    for (var i = 0; i < len; i++) {
      if (index == i) {
        var ss = arry[i].fir.length;
        for (var s = 0; s < ss; s++) {
          arry[i].fir[s].sec = [];
        };
      } else {
        arry[i] = {
          title: arry[i].title,
          mean: arry[i].mean,
          fir: [],
        };
      };
    };
    this.setData({
      imgUrls: arry,
      current: index,
      pass: true
    });
    this.data.name = JSON.parse(JSON.stringify(getApp().globalData.nameArry));
    this.getFont();
    this.getType();
  },
  onShow: function() {
    this.data.img = '';
  },
})













<!-- 商标注册 -->
<view class="body" hidden="{{ type==1?false:true }}">
  <van-transition show="{{ popup }}" name="slide-down" custom-class="block">
    <view class="ti-box">
      <image class="ti-img" src="/package/component1/images/!!!!.png"></image>
      <text class="ti-text">{{ display }}</text>
    </view>
  </van-transition>
  <view class="card">
    <van-cell title="申请人（中文）" border="{{ false }}" />
    <van-field value="{{  name?name:'请添加'  }}" disabled is-link bindtap='onAttest' />
    <!-- 商标注册 -->
    <view class="list-box fiexd">
      <view class="first">同个商标的资料同步提交</view>
      <view class="checked-box">
        <van-switch checked="{{ checked }}" size='20px' active-color="#6fe457" inactive-color="#999999" bind:change="onCheck" />
      </view>
    </view>
  </view>
  <view class="b_list_btn" style="height:{{ SafeButtom }}rpx">
    <view class="a_box" bindtap="onClick">提交</view>
  </view>
</view>

<!-- 商标撤三申请 -->
<view class="body" hidden="{{ type==2?false:true }}">
  <van-transition show="{{ display }}" name="slide-down" custom-class="block">
    <view class="ti-box">
      <image class="ti-img" src="/package/component1/images/!!!!.png"></image>
      <text class="ti-text">{{ display }}</text>
    </view>
  </van-transition>
  <view class="card">
    <van-cell title="申请人（中文）" border="{{ false }}" />
    <van-field value="{{  name?name:'请添加'  }}" disabled is-link bindtap='onAttest' />
    <van-cell title="注册号" border="{{ false }}" />
    <van-field value="{{ value }}" placeholder="{{ brand_num?brand_num:'请输入' }}" maxlength='20' clickable type="number" bind:change="onChange" />
    <van-cell title="商标类别" border="{{ false }}" />
    <van-field value="{{ category?category:'请添加' }}" disabled is-link bindtap='onClose' />
  </view>
  <view class="b_list_btn" style="height:{{ SafeButtom }}rpx">
    <view class="a_box" bindtap="onClick">提交</view>
  </view>
</view>

<!-- 补发商标证书 -->
<view class="body" hidden="{{ type==4?false:true }}">
  <van-transition show="{{ display }}" name="slide-down" custom-class="block">
    <view class="ti-box">
      <image class="ti-img" src="/package/component1/images/!!!!.png"></image>
      <text class="ti-text">{{ display }}</text>
    </view>
  </van-transition>
  <view class="card">
    <van-cell title="申请人（中文）" border="{{ false }}" />
    <van-field value="{{  name?name:'请添加'  }}" disabled is-link bindtap='onAttest' />
    <van-cell title="注册号" border="{{ false }}" />
    <van-field value="{{ value }}" placeholder="{{ brand_num?brand_num:'请输入' }}" maxlength='20' clickable type="number" bind:change="onChange" />
    <van-cell title="商标类别" border="{{ false }}" />
    <van-field value="{{ category?category:'请添加' }}" disabled is-link bindtap='onClose' />
  </view>
  <view class="b_list_btn" style="height:{{ SafeButtom }}rpx">
    <view class="a_box" bindtap="onClick">提交</view>
  </view>
</view>

<!-- 商标许可备案 -->
<view class="body" hidden="{{ type==5?false:true }}">
  <van-transition show="{{ display }}" name="slide-down" custom-class="block">
    <view class="ti-box">
      <image class="ti-img" src="/package/component1/images/!!!!.png"></image>
      <text class="ti-text">{{ display }}</text>
    </view>
  </van-transition>
  <view class="card">
    <van-cell title="许可人（中文）" border="{{ false }}" />
    <van-field value="{{  xuke?xuke:'请添加'  }}" data-id='1' disabled is-link bindtap='onXuke' />
    <van-cell title="被许可人（中文）" border="{{ false }}" />
    <van-field value="{{  beixuke?beixuke:'请添加'  }}" data-id='2' disabled is-link bindtap='onXuke' />
    <van-cell title="注册号" border="{{ false }}" />
    <van-field value="{{ value }}" placeholder="{{ brand_num?brand_num:'请输入' }}" maxlength='20' clickable type="number" bind:change="onChange" />
    <van-cell title="商标类别" border="{{ false }}" />
    <van-field value="{{ category?category:'请添加' }}" disabled is-link bindtap='onClose' />

    <view class="up_card">
      <view class="title">
        <text>商标许可合同/协议 </text>
        <text> 合同模板可去PC端下载</text>
      </view>
      <view class="up-box">
        <view class="up-img center" data-id="2" bindtap="onChooseImgs">
          <image class="up-img-image" src="/images/up.png" mode="widthFix" hidden="{{ upload_file }}"></image>
          <image class="max-img" hidden="{{ !upload_file }}" src="{{ icon_Url+upload_file }}" hidden="{{ !upload_file }}"></image>
          <text class="up-t" hidden="{{ upload_file }}">上传</text>
        </view>
      </view>
    </view>
  </view>
  <view class="b_list_btn" style="height:{{ SafeButtom }}rpx">
    <view class="a_box" bindtap="onClick">提交</view>
  </view>
</view>
<!-- 商标转让 -->
<view class="body" hidden="{{ type==6?false:true }}">
  <van-transition show="{{ display }}" name="slide-down" custom-class="block">
    <view class="ti-box">
      <image class="ti-img" src="/package/component1/images/!!!!.png"></image>
      <text class="ti-text">{{ display }}</text>
    </view>
  </van-transition>
  <view class="card">

    <van-cell title="转让人（中文）" border="{{ false }}" />
    <van-field value="{{  zhuanrangren?zhuanrangren:'请添加'  }}" data-id='1' disabled is-link bindtap='onZhuanRang' />
    <van-cell title="受让人（中文）" border="{{ false }}" />
    <van-field value="{{  shourangren?shourangren:'请添加'  }}" data-id='2' disabled is-link bindtap='onZhuanRang' />

    <van-cell title="注册号" border="{{ false }}" />
    <van-field value="{{ value }}" placeholder="{{ brand_num?brand_num:'请输入' }}" maxlength='20' clickable type="number" bind:change="onChange" />
    <van-cell title="商标类别" border="{{ false }}" />
    <van-field value="{{ category?category:'请添加' }}" disabled is-link bindtap='onClose' />



  </view>
  <view class="b_list_btn" style="height:{{ SafeButtom }}rpx">
    <view class="a_box" bindtap="onClick">提交</view>
  </view>
</view>
<!-- 商标变更 -->
<view class="body" hidden="{{ type==7?false:true }}">
  <van-transition show="{{ display }}" name="slide-down" custom-class="block">
    <view class="ti-box">
      <image class="ti-img" src="/package/component1/images/!!!!.png"></image>
      <text class="ti-text">{{ display }}</text>
    </view>
  </van-transition>
  <view class="card">
    <van-cell title="申请人（中文）" border="{{ false }}" />
    <van-field value="{{  name?name:'请添加'  }}" disabled is-link bindtap='onAttest' />
    <van-cell title="注册号" border="{{ false }}" />
    <van-field value="{{ value }}" placeholder="{{ brand_num?brand_num:'请输入' }}" maxlength='20' clickable type="number" bind:change="onChange" />
    <!-- <van-cell title="商标类别" border="{{ false }}" />
    <van-field value="{{ category?category:'请添加' }}" disabled is-link bindtap='onClose' /> -->
    <view class="up_card">
      <view class="title">
        <text>予以变更登记说明书</text>
        <text/>
      </view>
      <view class="up-box">
        <view class="up-img center" data-id="2" bindtap="onChooseImgs">
          <image class="up-img-image" src="/images/up.png" mode="widthFix" hidden="{{ upload_file }}"></image>
          <image class="max-img" hidden="{{ !upload_file }}" src="{{ icon_Url+upload_file }}" hidden="{{ !upload_file }}"></image>
          <text class="up-t" hidden="{{ upload_file }}">上传</text>
        </view>
      </view>
    </view>
    <view class="up_card">
      <view class="title">
        <text>变更后营业执照</text>
        <text/>
      </view>
      <view class="up-box">
        <view class="up-img center" data-id="1" bindtap="onChooseImgs">
          <image class="up-img-image" src="/images/up.png" mode="widthFix" hidden="{{ brand_img }}"></image>
          <image class="max-img" hidden="{{ !brand_img }}" src="{{ icon_Url+brand_img }}" hidden="{{ !brand_img }}"></image>
          <text class="up-t" hidden="{{ brand_img }}">上传</text>
        </view>
      </view>
    </view>
    <view class="up_card">
      <view class="title">
        <text>变更后营业执照中文翻译件</text>
        <text/>
      </view>
      <view class="up-box">
        <view class="up-img center" data-id="3" bindtap="onChooseImgs">
          <image class="up-img-image" src="/images/up.png" mode="widthFix" hidden="{{ translated_img }}"></image>
          <image class="max-img" hidden="{{ !translated_img }}" src="{{ icon_Url+translated_img}}" hidden="{{ !translated_img }}"></image>
          <text class="up-t" hidden="{{ translated_img }}">上传</text>
        </view>
      </view>
    </view>
  </view>
  <view class="b_list_btn" style="height:{{ SafeButtom }}rpx">
    <view class="a_box" bindtap="onClick">提交</view>
  </view>
</view>


<!-- 商标续展 -->
<view class="body" hidden="{{ type==8?false:true }}">
  <van-transition show="{{ display }}" name="slide-down" custom-class="block">
    <view class="ti-box">
      <image class="ti-img" src="/package/component1/images/!!!!.png"></image>
      <text class="ti-text">{{ display }}</text>
    </view>
  </van-transition>
  <view class="card">
    <van-cell title="申请人（中文）" border="{{ false }}" />
    <van-field value="{{  name?name:'请添加'  }}" disabled is-link bindtap='onAttest' />
    <van-cell title="注册号" border="{{ false }}" />
    <van-field value="{{ value }}" placeholder="{{ brand_num?brand_num:'请输入' }}" maxlength='20' clickable type="number" bind:change="onChange" />
    <van-cell title="商标类别" border="{{ false }}" />
    <van-field value="{{ category?category:'请添加' }}" disabled is-link bindtap='onClose' />



  </view>
  <view class="b_list_btn" style="height:{{ SafeButtom }}rpx">
    <view class="a_box" bindtap="onClick">提交</view>
  </view>
</view>

<van-toast id="van-toast" />
<van-notify id="custom-selector" />
<van-popup show="{{ show }}" position="bottom" bind:close="onClose">
  <van-picker show-toolbar title="请选择" columns="{{ columns }}" bind:cancel="onCancel" bind:confirm="onConfirm" />
<<<<<<< HEAD
</van-popup>







<view class="container {{show?'bg_body':''}}">
  <view class="custom_none center" hidden="{{ !isShow }}" style="padding-top:{{statusBarHeight}}px;background: rgba(255, 255, 255, {{ transparent }})">
    <view class="search-box al_center" style="width:{{ menu.right - menu.width - 30 }}px;height:{{ 60 }}rpx;border-radius:{{ menu.height/2 }}px" bindtap="goSearch">
      <image class="seach_img2" src="/images/search.png" mode="widthFix"></image>
      <text>请输入商标名称/申请人/注册号</text>
    </view>
  </view>
  <view class="list_t_b" style="height:{{bgheight1+bgheight2+menu.bottom-10}}px;">
    <view style="height:{{menu.bottom}}px;"></view>
    <van-transition show="{{ current+1 }}" custom-class="block">
      <view class="bg_box" style="height:{{menu.bottom*2+340}}rpx;">
        <image class="bg_img" src="{{main_Url+imgUrls[current].pic}}"></image>
      </view>
    </van-transition>
    <view id="search" />
    <view class="top_box" hidden="{{ isShow }}" id="input">
      <view class="top_btn" bindtap="makePhone">
        <image src="/images/invalid.png" mode="widthFix"></image>
      </view>
      <view class="top_search" bindtap="goSearch">
        <input value="{{search}}" disabled confirm-type="search" type="text" placeholder="请输入商标名称/申请人/注册号" placeholder-style="color:#999;" maxlength='20' bindinput="onInput" bindconfirm="onSearch" selection-start="5"></input>
        <image class="seach_img" src="/images/search.png" mode="widthFix"></image>
      </view>
      <view class="top_btn_three" bindtap="onNews">
        <image src="/images/xi.png" mode="widthFix"></image>
      </view>
      <view class="top_btn" bindtap="onShop">
        <image src="/images/shop.png" mode="widthFix"></image>
      </view>
    </view>
    <swiper id="swiper" class="swiper_box" indicator-dots="true" indicator-color="rgba(0, 0, 0, .3)" indicator-active-color="#fff" circular="true" autoplay="{{ autoplay }}" display-multiple-items="1" bindchange="onSwiper">
      <block wx:for="{{imgUrls}}" wx:key='index'>
        <swiper-item>
          <image class="swiper_img" src="{{main_Url+item.pic}}"></image>
        </swiper-item>
      </block>
    </swiper>
  </view>
  <view class="nav_box" wx:for="{{cate}}" wx:key='index'>
    <view class="btn_box" data-id="{{ index }}" bindtap="onSuoyin">
      <image src="{{item.icon}}"></image>
      <text>{{item.cate_name}}</text>
    </view>
  </view>
  <view class="logo">
    <image src="/images/indexlogo.png" mode="widthFix"></image>
  </view>
  <view class="input-box">
    <van-field value="{{ value }}" id="value" custom-style="width: 514rpx;height: 80rpx;background: #fff;border-radius: 8rpx;" center clearable placeholder="请输入您要检测的商标名称" border="{{ false }}" use-button-slot bind:change="onChange"></van-field>
    <button class="search-jc" bindtap="onCheck">检测</button>
  </view>
  <view class="center wh100">
    <image class="ai_img" src="/images/ai.png" />
  </view>
  <view class="center  yy_box" bindtap="onClose">
    <image src="{{ icon_Url+'/public/images/yuyin.png' }}" mode="widthFix"></image>
  </view>
  <view class="center wh100">
    <image class="ai_img" src="/images/ai3.png" mode="widthFix" />
  </view>
  <view class="list_jq_box" wx:for="{{ navBtn }}" wx:key='index'>
    <view class="jq_box" hover-class="hoverStyle" data-id="{{index}}" bindtap="onSkip">
      <text>{{item.title}}</text>
      <image src="{{ main_Url+item.pic }}" mode="widthFix"></image>
    </view>
  </view>
  <view class="center wh100">
    <image class="ai_img" src="/images/ai4.png" mode="widthFix" />
  </view>
  <block wx:for="{{ hot }}" wx:key='index'>
    <van-transition show="{{ item.id }}" name="fade-up" custom-class="block">
      <view class="wh100 center list_dt_box" data-id="{{ item.pid }}" data-title="{{ item.title }}" bindtap="onDt">
        <view class="list_dt">
          <view class="l_box center">
            <image class="list_dt_img" hidden="{{ !item.pic }}" lazy-load="true" src="{{main_Url+item.pic}}" mode="aspectFit"></image>
            <image class="list_dt_img img-no" hidden="{{ item.pic }}" lazy-load="true" src="/images/noImg.png" mode="aspectFit"></image>
          </view>
          <view class="r_box jc_center">
            <text class="t1 van-ellipsis">{{item.title?item.title:''}}</text>
            <text class="t2 van-multi-ellipsis--l2">{{item.desc?item.desc:''}}</text>
            <text class="t3">￥{{item.total?item.total:''}}</text>
            <button class="tap_btn" data-id="{{ item.id }}">去办理</button>
          </view>
        </view>
      </view>
    </van-transition>
  </block>
</view>
<van-overlay show="{{ show }}">
  <view class="popup_top" catchtouchmove="true" hidden="{{ !show }}">
    <view class="list_t_box" style="height:{{ SafeHigh/2+10 }}px" hidden="{{scale<1.7?true:''}}">
      <view class="icon_box" bindtap="onClose">
        <image src="/images/xxx.png"></image>
      </view>
    </view>
    <view class="guo_box" hidden="{{scale<1.7?true:false}}">
      <view class="girl_box" hidden="{{ wenben }}">
        <image src="{{  icon_Url+'/public/images/guo.png' }}" mode="widthFix"></image>
      </view>
      <view class="girl_box" hidden="{{ wenben }}">
        <image src="{{  icon_Url+'/public/images/guo.png' }}" mode="widthFix"></image>
      </view>
      <view class="w_s_box f_c">
        <van-transition show="{{ !wenben }}" custom-class="block">
          <text class="wenben">{{text}}</text>
        </van-transition>
      </view>
    </view>
    <view class="list_t_box" style="height:{{ SafeHigh/2 +20 }}px" hidden="{{scale<1.7?'':true}}">
      <view class="icon_box" bindtap="onClose">
        <image style="margin-top:20rpx;" src="/images/xxx.png"></image>
      </view>
    </view>
    <scroll-view class="v_t" style="bottom:5%;height: 400px" scroll-y="true" hidden="{{scale<1.7?true:''}}" animation="{{ animationData }}">
      <block wx:for="{{ list }}" wx:key='x'>
        <view class="cell-box-list al_center" data-id="{{ item.type }}" wx:if="{{ list[0].icon.length>0 }}" data-url="{{ item.url }}" bindtap="onViceNav">
          <image class="imgs-first" src="{{ icon_Url + item.icon }}"></image>
          <text>{{item.title}}</text>
          <image class="imgs-two" src="/images/l_arrow.png"></image>
        </view>
      </block>
      <view wx:if="{{ list[0].icon.length==0 }}">{{list[0].title}}</view>
    </scroll-view>
    <view class="vioce-wenben">
      <text>{{wenben}}</text>
    </view>
    <view class="b_box_v al_center">
      <view class="b_gn" bindtap="onInputAi">
        <image src="/images/{{ hide?'voice':'gn' }}.png"></image>
      </view>
      <view hidden="{{ !hide }}" class="ai_input_box">
        <input value="{{ into }}" confirm-type="send" type="text" focus="{{ hide?true:false }}" placeholder="请输入" maxlength="50" placeholder-style="color:#999;" bindinput="onInto" bindconfirm='onSendText' />
        <view bindtap="onSendText">发送</view>
      </view>
      <view class="b_voice" bindtouchstart="recodeClick" bindtouchend="recodeStop" hidden="{{ hide }}">
        <image src="/images/voice.png"></image>
        <view class="ripple"></view>
        <view class="ripple {{animationStatus?'rippleAnimation1':''}}"></view>
        <view class="ripple {{animationStatus?'rippleAnimation2':''}}"></view>
        <view class="ripple {{animationStatus?'rippleAnimation3':''}}"></view>
      </view>
    </view>
  </view>
</van-overlay>
<van-transition show="{{ !display }}" custom-class="block">
  <view class="go_top center" bindtap="onTop">
    <image src="/images/top.png"></image>
  </view>
</van-transition>
<view hidden="{{ show }}">
  <tabbar tabbar="{{tabbar}}"></tabbar>
</view>
<van-add-tips duration="10" />
<van-toast id="van-toast" />
<!-- <van-notify id="custom-selector" safe-area-inset-top/> -->
<van-dialog id="van-dialog" />
=======
</van-popup>


//         if (a > 0) {
//           if (a - 10 > 0) {
//             var c = a - 10;
//             if (listIndex == 1) {
//               arry[i].list[listIndex].cost = (JSON.parse(arry[i].list[listIndex].price) + c * 30).toFixed(2);
//               arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total) + c * 30).toFixed(2);
//               arry[i].list[listIndex].instance = ((JSON.parse(arry[i].list[listIndex].total) + c * 30) - (JSON.parse(arry[i].list[listIndex].price) + c * 30)).toFixed(2)
//             } else {
//               arry[i].list[listIndex].cost = (JSON.parse(arry[i].list[listIndex].total) + c * 50).toFixed(2);
//               arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total) + c * 50).toFixed(2);
//               arry[i].list[listIndex].instance = "0.00"
//             }
//           } else {
//             if (listIndex == 1) {
//               arry[i].list[listIndex].cost = (JSON.parse(arry[i].list[listIndex].price)).toFixed(2);
//               arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total)).toFixed(2);
//               arry[i].list[listIndex].instance = (JSON.parse(arry[i].list[listIndex].total) - JSON.parse(arry[i].list[listIndex].price)).toFixed(2)
//             } else {
//               arry[i].list[listIndex].cost = (JSON.parse(arry[i].list[listIndex].total)).toFixed(2);
//               arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total)).toFixed(2);
//               arry[i].list[listIndex].instance = "0.00"
//             }
//           }
//         } else {
//           arry[i].list[listIndex].cost = "0.00";
//           arry[i].list[listIndex].bigprice = "0.00";
//           arry[i].list[listIndex].instance = '0.00'
//         }
//       } else {
//         if (listIndex == 2) {
//           if (a > 0) {
//             if (a - 10 > 0) {
//               var c = a - 10;
//               arry[i].list[listIndex].cost = "0.00";
//               arry[i].list[listIndex].instance = (JSON.parse(arry[i].list[listIndex].total) + c * 50).toFixed(2);
//               arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total) + c * 50).toFixed(2)
//             } else {
//               arry[i].list[listIndex].cost = "0.00";
//               arry[i].list[listIndex].bigprice = (JSON.parse(arry[i].list[listIndex].total)).toFixed(2);
//               arry[i].list[listIndex].instance = (JSON.parse(arry[i].list[listIndex].total)).toFixed(2)
//             }
//           } else {
//             arry[i].list[listIndex].cost = "0.00";
//             arry[i].list[listIndex].instance = "0.00";
//             arry[i].list[listIndex].bigprice = "0.00"
//           }
//         }
//       };

search.js
// const main_Url = getApp().globalData.main_Url;
// const time = require("../../../utils/util.js");
// import Dialog from '../../../dist/dialog/dialog';
// import Notify from '../../../dist/notify/notify';
// import contrast from '../../../template/template.js';
// import Toast from '../../../dist/toast/toast';
// import NetworkRequest from '../../../template/network.js';
// import setTime from '../../../template/setTime.js'
// import func from '../../../template/func.js';
// Page({
//   data: {
//     active: 0,
//     value: '',
//     id: 1,
//     animationData: '',
//     width: '',
//     height: '',
//     wid: '',
//     show: '',
//     SafeHigh: '',
//     dateStart: '',
//     dateEnd: '',
//     dateMax: new Date().getFullYear(),
//     SafeButtom: '',
//     history: [],
//     recode: [],
//     arry: [],
//     rest: [],
//     applyType: contrast.applyType,
//     contrast: contrast.contrast,
//     applyTypeId: '',
//     list: [],
//     display: true,
//     index: 1,
//     size: 10,
//     block: true,
//     focus: true,
//     acid: '',
//     page: 1,
//     bottom: false
//   },
//   onSure() {
//     var acid = this.data.acid;
//     this.setData({
//       id: acid,
//       list: [],
//       index: 1,
//       active: acid,
//     })
//     this.onSearch(1, 10, acid - 1)
//     this.onClose();
//     this.anima(acid, true);
//   },
//   setValue(e) {
//     var id = e.currentTarget.dataset.id;
//     var type = e.currentTarget.dataset.type;
//     var history = this.data.history;
//     var recode = this.data.recode;
//     this.setData({
//       focus: false,
//     })
//     setTime(300).then(res => {
//       if (type == 1) {
//         this.setData({
//           value: history[id]
//         })
//       } else {
//         this.setData({
//           value: recode[id]
//         })
//       };
//       this.onSearch();
//     })
//   },
//   onClear() {
//     this.setData({
//       list: [],
//       value: '',
//       page: 1,
//     })
//   },
//   onPageScroll(e) {
//     var id = e.scrollTop;
//     var block = this.data.block;
//     if (id > 600 && block == true) {
//       this.setData({
//         block: false,
//       });
//     };
//     if (id < 500 && block == false) {
//       this.setData({
//         block: true,
//       });
//     };
//   },
//   onTop() {
//     wx.pageScrollTo({
//       scrollTop: 0,
//     });
//   },
//   onDelet() {
//     Dialog.confirm({
//       title: '提示',
//       message: '是否删除历史记录'
//     }).then(() => {
//       wx.setStorageSync('history', []);
//       this.setData({
//         history: [],
//       })
//     }).catch(() => {});
//   },

//   onHistory(e) {
//     var history = this.data.history;
//     if (history.length == 0) {
//       var arry = [];
//       arry.push(e);
//       this.setData({
//         history: arry,
//       });
//       wx.setStorageSync('history', this.data.history);
//     } else {
//       if (history.indexOf(e) == -1) {
//         history.push(e)
//       };
//       this.setData({
//         history: history,
//       });
//       wx.setStorageSync('history', this.data.history);
//     };
//   },
//   onCheck(e) {
//     var id = e.currentTarget.dataset.id;
//     var check = this.data.applyType.slice(0, this.data.applyType.length);
//     if (check[id].isSelect == false) {
//       check[id].isSelect = true;
//       this.setData({
//         applyType: check,
//       });
//     } else {
//       check[id].isSelect = false;
//       this.setData({
//         applyType: check,
//       });
//     };
//     this.onId();
//   },
//   //检索id
//   onId() {
//     var check = this.data.applyType.slice(0, this.data.applyType.length);
//     var arry = [];
//     for (var i = 0; i < check.length; i++) {
//       if (check[i].isSelect == true) {
//         arry.push(JSON.parse(check[i].id))
//       };
//     };
//     var id = arry.join(',');
//     this.setData({
//       applyTypeId: id,
//     });
//   },
//   onChange(e) {
//     this.setData({
//       value: e.detail,
//     });
//     if (!e.detail) {
//       this.setData({
//         list: [],
//         value: '',
//         page: 1,
//       })
//     };
//   },
//   onRest() {
//     var check = this.data.applyType.slice(0, this.data.applyType.length);
//     for (var i = 0; i < check.length; i++) {
//       if (check[i].isSelect == true) {
//         check[i].isSelect = false;
//       };
//     };
//     this.setData({
//       applyType: check,
//       applyTypeId: '',
//     })
//   },
//   onClose() {
//     this.setData({
//       show: !this.data.show,
//     })
//   },

//   toast() {
//     Toast.loading({
//       message: '加载中...',
//       duration: 0,
//     });
//   },
//   anima(e, check) {
//     var wid = this.data.wid;
//     var mg = wid / 100 * 20;
//     if (!check) {
//       var id = e.currentTarget.dataset.id;
//     } else {
//       var id = e;
//     }
//     if (id == 0) {
//       this.setData({
//         id: 1,
//         list: [],
//         index: 1,
//         page: 1,
//       });
//       this.onSearch(1, 10, 1);
//     };
//     if (id == 1) {
//       this.setData({
//         id: 2,
//         list: [],
//         index: 1,
//         page: 1,
//       });
//       this.onSearch(1, 10, 2);
//     };
//     if (id == 2) {
//       this.setData({
//         id: 3,
//         list: [],
//         index: 1,
//         page: 1,
//       });
//       this.onSearch(1, 10, 3);
//     };
//     if (id == 3) {
//       this.setData({
//         id: 4,
//         list: [],
//         index: 1,
//         page: 1,
//       });
//       this.onSearch(1, 10, 4);
//     };
//     if (id == 4) {
//       this.data.acid = this.data.id - 1;
//       this.onClose();
//       this.setData({
//         id: 4,
//         list: [],
//         index: 1,
//         page: 1,
//       });
//     };
//     var animation = wx.createAnimation({
//       duration: 1000,
//       timingFunction: 'ease',
//     });
//     this.animation = animation;
//     animation.translateX(id * mg).step(({
//       duration: 300,
//     }));
//     this.setData({
//       animationData: this.animation.export(),
//     });
//   },
//   getInfo() {
//     var info = getApp().globalData.sysinfo;
//     this.setData({
//       wid: info.windowWidth,
//       SafeHigh: info.screenHeight,
//       SafeButtom: info.statusBarHeight,
//     });
//   },
//   getData() {
//     this.getHotData();
//     this.getInfo();
//   },
//   bindDateChange(e) {
//     var id = e.currentTarget.dataset.id;
//     if (id == 1) {
//       this.setData({
//         dateStart: e.detail.value,
//       });
//     };
//     if (id == 2) {
//       this.setData({
//         dateEnd: e.detail.value,
//       });
//     };
//   },
//   onSearch(index, size, e) {
//     var beId = this.data.id;
//     var bottom = this.data.bottom;
//     if (bottom === false) {
//       this.setData({
//         list: []
//       });
//     };
//     this.setData({
//       display: false,
//     });
//     if (!index || !size) {
//       var index = 1;
//       var size = 10;
//     };
//     if (e) {
//       var type = e;
//     } else {
//       var type = this.data.id;
//     };
//     var dateStart = this.data.dateStart;
//     var dateEnd = this.data.dateEnd;
//     var value = this.data.value;
//     var display = this.data.display;
//     if (!value) {
//       this.notify('请先输入！');
//       return;
//     } else {
//       this.onHistory(value);
//     };
//     if (!dateStart || !dateEnd) {
//       var time = '';
//     } else {
//       var time = dateStart + '至' + dateEnd;
//     };
//     if (!this.data.applyTypeId) {
//       var cate_id = '';
//     } else {
//       var cate_id = this.data.applyTypeId;
//     };
//     if (display) {
//       this.toast();
//     };

//     if (beId == 2) {
//       NetworkRequest({
//         url: '/likeselect',
//         data: {
//           type: '',
//           text: value,
//           group: '',
//           cate_id: '',
//           keywords: '',
//           index: '',
//           size: '',
//         },
//       }).then(ss => {
//         if (ss.data.code !== '1') {
//           this.notify(ss.data.msg);
//           return;
//         } else {
//           NetworkRequest({
//             url: '/getdata',
//             data: {
//               type: type,
//               date: time,
//               cate_id: cate_id,
//               keywords: ss.data.data,
//               index: bottom ? index : 1,
//               size: size,
//               status: '',
//             },
//           }).then(res => {
//             // if (res.data.code !== '1' && beId !== 4) {
//             //   this.notify(res.data.msg)
//             // };
//             var arry = res.data.data;
//             var nowId = this.data.id;
//             if (beId !== nowId) {
//               return;
//             };
//             if (bottom) {
//               var contrast = this.data.contrast;
//               var length = this.data.list.length;
//               if (arry.length > 0) {
//                 for (var c = 0; c < arry.length; c++) {
//                   for (var s = 0; s < contrast.length; s++) {
//                     if (arry[c].IntCls == contrast[s].id) {
//                       arry[c].genre = contrast[s].name;
//                     };
//                   };
//                   var index = length + c;
//                   this.setData({
//                     ["list[" + index + "]"]: arry[c],
//                   })
//                 };
//                 this.data.page++;
//               };
//             } else {
//               var contrast = this.data.contrast;
//               var length = this.data.list.length;
//               if (arry.length > 0) {
//                 for (var c = 0; c < arry.length; c++) {
//                   for (var s = 0; s < contrast.length; s++) {
//                     if (arry[c].IntCls == contrast[s].id) {
//                       arry[c].genre = contrast[s].name;
//                     };
//                   };
//                 };
//                 this.setData({
//                   list: arry
//                 })
//                 this.data.page = 1;
//               }
//             }
//             Toast.clear();
//             this.setData({
//               display: true,
//             });
//             Toast.clear();
//             this.data.bottom = false
//           }).catch(err => {
//             Toast.clear();
//             this.notify("请求失败！");
//           });
//         }
//       });
//     } else {
//       NetworkRequest({
//         url: '/getdata',
//         data: {
//           type: type,
//           date: time,
//           cate_id: cate_id,
//           keywords: value,
//           index: bottom ? index : 1,
//           size: size,
//           status: '',
//         },
//       }).then(res => {
//         // if (res.data.code !== '1' && beId !== 4) {
//         //   this.notify(res.data.msg)
//         // };
//         var arry = res.data.data;
//         var nowId = this.data.id;
//         if (beId !== nowId) {
//           return;
//         };
//         if (bottom) {
//           var contrast = this.data.contrast;
//           var length = this.data.list.length;
//           if (arry.length > 0) {
//             for (var c = 0; c < arry.length; c++) {
//               for (var s = 0; s < contrast.length; s++) {
//                 if (arry[c].IntCls == contrast[s].id) {
//                   arry[c].genre = contrast[s].name;
//                 };
//               };
//               var index = length + c;
//               this.setData({
//                 ["list[" + index + "]"]: arry[c],
//               })
//             };
//             this.data.page++;
//           };
//         } else {
//           var contrast = this.data.contrast;
//           var length = this.data.list.length;
//           if (arry.length > 0) {
//             for (var c = 0; c < arry.length; c++) {
//               for (var s = 0; s < contrast.length; s++) {
//                 if (arry[c].IntCls == contrast[s].id) {
//                   arry[c].genre = contrast[s].name;
//                 };
//               };
//             };
//             this.setData({
//               list: arry
//             })
//             this.data.page = 1;
//           }
//         }
//         Toast.clear();
//         this.setData({
//           display: true,
//         });
//         Toast.clear();
//         this.data.bottom = false
//       }).catch(err => {
//         Toast.clear();
//         this.notify("请求失败！");
//       });
//     }
//   },
//   getHotData() {
//     var hotArry = wx.getStorageSync('hotArry');
//     if (hotArry) {
//       this.setData({
//         recode: hotArry,
//         history: wx.getStorageSync('history'),
//       })
//     };
//     NetworkRequest({
//       url: '/searchhot',
//       data: {},
//     }).then(res => {
//       this.setData({
//         recode: res.data.data,
//       });
//       wx.setStorageSync('hotArry', res.data.data);
//     })
//   },
//   notify(e) {
//     Notify({
//       text: e,
//       duration: 1000,
//       selector: '#custom-selector',
//       backgroundColor: '#f44',
//       color: '#fff',
//     });
//   },
//   onDt(e) {
//     var id = e.currentTarget.dataset.id;
//     var type = e.currentTarget.dataset.type;
//     var index = e.currentTarget.dataset.index;
//     var list = this.data.list[index];
//     wx.setStorageSync("list", list);
//     var value = this.data.value;
//     wx.navigateTo({
//       url: '/pages/index/search/dt/dt?id=' + id + "&type=" + type + "&value=" + value,
//     });
//   },
//   onClick(e) {
//     if (e.detail.index) {
//       Toast('敬请期待！');
//     } else {
//       Toast.clear();
//     }
//   },
//   onLoad: function(options) {
//     this.getData();
//     this.setData({
//       value: options.id,
//     });
//   },
//   onReachBottom: function() {
//     this.data.bottom = true;
//     var page = this.data.page;
//     var size = this.data.size;
//     var id = this.data.id;
//     this.data.index = page;
//     this.onSearch(page, size, id);
//   },
// })


>>>>>>> 49ec8b841be3a4c03a9b97bb4cf5902c23c7ac1f