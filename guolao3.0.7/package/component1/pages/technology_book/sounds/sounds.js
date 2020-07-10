import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
const menuInfo = getApp().globalData.menuInfo;
const info = getApp().globalData.sysinfo;
const recorderManager = getApp().globalData.recorderManager;
import setTime from '../../../../../template/setTime';
import func from '../../../../../template/func.js';
import vioceText from '../../../../../template/vioceText.js';
import animation from '../../../../../template/animation.js';
import canonical from '../../../../../template/canonical';
import recoderTS from '../../../../../template/recorder.js';
const options = {
  duration: 600000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'mp3',
  frameSize: 50
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    icon_Url: getApp().globalData.icon_Url,
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
    animationData: '',
    // slider:0,
    SafeButtom: info.statusBarHeight * 4,
    info: info,
    display: false,
    active: 0,
    value: '',

    animationData: '',
    animationStatus: '',
    isRecorder: false,
    focus: false,
    timer: '',
    isFrist: 1,
    h: '00',
    m: '00',
    s: '00',
    //当前问题id
    Id: 0,
    voiceText: [{
        text: '请输入发明创造的名称:',
      }, {
        text: '您的产品或技术是属于什么领域的?',
      },
      {
        text: '您是针对现有产品结构的哪些问题进行改进的?',
      },
      {
        text: '您的产品或技术是属于什么领域的?',
      },
    ],

    CheckBox: [{
        isSelect: false,
        text: '机械（有产品、有结构的都可归纳此类）',
      },
      {
        isSelect: false,
        text: '电子',
      }, {
        isSelect: false,
        text: '软件系统&控制系统',
      }, {
        isSelect: false,
        text: '化工',
      },
      {
        isSelect: false,
        text: '通讯',
      },
      {
        isSelect: false,
        text: '生物医药',
      },
    ],
  },
  onVioceTS() {
    recoderTS('start')
  },

  onStopTS() {
    recoderTS('stop').then(res => {
      canonical(res.data.data);
    })
  },

  //聚焦
  onBlock() {
    this.setData({
      display: true
    })
  },
  onInput(e) {
    this.setData({
      value: e.detail
    })
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
  toast() {
    Toast.loading({
      message: '上传中...',
      duration: 0,
    })
  },
  onClear() {
    this.setData({
      value: ''
    })
  },
  onChangeText(e) {
    var id = e.currentTarget.dataset.id;
    var CheckBox = JSON.parse(JSON.stringify(this.data.CheckBox));
    for (var i = 0; i < CheckBox.length; i++) {
      if (i == id) {
        CheckBox[i].isSelect = CheckBox[id].isSelect == true ? false : true
      } else {
        CheckBox[i].isSelect = false;
      };
    };
    this.setData({
      CheckBox: CheckBox,
    });
  },

  onClick() {
    var Id = this.data.Id;
    if (Id == 0) {
      if (!this.data.value.replace(/\s+/g, "")) {
        this.notify('请输入发明创造的名称！');
      } else {
        this.onSaveData(Id);
      };
    };
    if (Id == 1) {
      var CheckBox = this.data.CheckBox;
      var chooseArry = [];
      for (var i = 0; i < CheckBox.length; i++) {
        chooseArry.push(CheckBox[i].isSelect);
      };
      if (chooseArry.indexOf(true) >= 0) {
        this.onSaveData(Id);
      } else {
        this.notify('请选择所属领域！')
      };
    };
    if (Id == 2) {
      var active = this.data.active;
      if (active == 0) {
        var value = this.data.value;
        if (!value.replace(/\s+/g, "")) {
          this.notify('描述');
          return;
        } else {
          this.onSaveData(Id);
        }
      }
    };
  },
  onBack() {
    if (this.data.Id == 0) {
      wx.navigateBack();
    } else {
      this.onProblem({
        add: false,
        Id: this.data.Id,
      });
    };
  },
  //更新data
  onUpData(Id) {
    var list = getApp().globalData.ProblemData[Id].data;
    // if (list) {
      var arry = JSON.parse(JSON.stringify(list));
      this.setData({
        text: '',
        display: arry.display,
        active: arry.active,
        value: arry.value,
        isRecorder: arry.isRecorder,
        focus: arry.focus,
        isFrist: 1,
        h: arry.h,
        m: arry.m,
        s: arry.s,
        Id: arry.Id,
        voiceText: arry.voiceText,
        CheckBox: arry.CheckBox,
      })
    // };
  },
  onProblem(event) {
    clearInterval(getApp().globalData.time);
    if (event.add) {
      var Id = event.Id + 1;
    } else {
      var Id = event.Id - 1;
      this.onUpData(Id);
    };
    this.setData({
      Id: Id,
    });
    setTime(20).then(s => {
      this.onVoice(Id);
    })
  },

  onSaveData(Id) {
    var data = this.data;
    var ProblemData = getApp().globalData.ProblemData;
    ProblemData[Id] = {
      data
    };
    // console.log(getApp().globalData.ProblemData);
    this.onProblem({
      add: true,
      Id: Id,
    });
  },

  onVoice(Id) {
    vioceText({
      data: {
        content: this.data.voiceText[Id].text,
      },
    }).then(res => {})
  },
  onStop() {
    recorderManager.stop();
    this.setData({
      isRecorder: false
    })
    Toast('播放')
  },


  onStart() {
    // console.log(recorderManager)
    var isRecorder = !this.data.isRecorder;
    if (isRecorder) {
      if (this.data.isFrist == 1) {
        recorderManager.start(options)
      } else {
        recorderManager.resume();
      }
      this.data.isFrist++
      // this.setData({
      //   isRecorder: isRecorder
      // })
      this.setData({
        isRecorder: isRecorder
      })
    } else {
      recorderManager.pause(() => {
        this.setData({
          isRecorder: isRecorder
        })
        // this.setData({
        //   isRecorder: isRecorder
        // })
        // console.log('recorder pause')
      })
    }
    // this.setData({
    //   isRecorder: isRecorder
    // })

    //监听暂停
    // recorderManager.onPause(() => {
    //   console.log('recorder pause')
    // })
    //监听停止
    // recorderManager.onStop((res) => {
    //   console.log('recorder stop', res)
    //   const { tempFilePath } = res
    // })
    // if (isRecorder) {
    //   this.onTimer();
    // } else {
    //   clearInterval(this.data.timer);
    // };
  },
  // 'shwo'+id
  // this
  // onTimer() {
  //   this.data.timer = setInterval(() => {
  //     var h = this.data.h;
  //     var m = this.data.m;
  //     var s = this.data.s;
  //     if (ns == 60) {
  //       var ns = 0;
  //       var nm = m++;
  //       if (nm == 60) {
  //         var nm = 0;
  //         var nh = h++;
  //       } else {
  //         var nh = h;
  //       }
  //     } else {
  //       var ns = s++;
  //       var nm = m;
  //       var nh = h;
  //     }

  //     this.setData({
  //       h: nh,
  //       m: nm,
  //       s: ns,
  //     })
  //   }, 1000);
  // },
  onSlider(e) {
    var win = getApp().globalData.sysinfo.screenWidth;
    var id = e.currentTarget.dataset.id;
    this.setData({
      // slider: id,
      active: id,
    });
    animation(id * win / 2);
  },

  // onBack() {
  //   var Id = this.data.Id;
  //   if (Id == 0) {
  //     wx.navigateBack();
  //   } else {
  //     this.setData({
  //       Id: Id - 1
  //     })
  //   }
  //   this.onVoice(Id);
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // for (var i = 0; i < 20; i++) {
    //   this.data['show' + i] = false
    // }
    this.onVoice(0)
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