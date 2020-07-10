import NetworkRequest from '../../../../../template/network.js';
import Toast from '../../../../../dist/toast/toast';
import Notify from '../../../../../dist/notify/notify';
const info = getApp().globalData.sysinfo;
import setTime from '../../../../../template/setTime.js';
import chooseImgs from "../../../../../template/chooseImgs.js";
import previewoffice from '../../../../../template/previewoffice.js';
import copyText from '../../../../../template/copyText.js';
Page({
  data: {
    brhifh: info.statusBarHeight * 4,
    checked: true,
    id: '',
    value: '',
    url: getApp().globalData.icon_Url,
    invent_patent_book: '',
    patent_write: '',
    patent_write_two: '',
    look_Already: false,
    status:1,
  },
  onLook(e) {
    var id = e.currentTarget.dataset.id;
    if (id == 2) {
      this.data.look_Already = true;
    };
    // console.log(e);
    var url = e.currentTarget.dataset.url;
    previewoffice(url,this);
  },
  getData(e) {
    NetworkRequest({
      url: '/patent/getSynopsis',
      data: {
        id: e,
      },
      method: "POST",
    }).then(res => {
      var code = res.data.code;
      if (code == 1) {
        this.setData({
          invent_patent_book: res.data.data.invent_patent_book,
          patent_write: res.data.data.patent_write,
        })
      } else {
        this.notify(res.data.msg);
      };
    })
  },

  onChooseImgs() {
    chooseImgs('patent_write_two', this);
  },
  onClick() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var checked = this.data.checked;
    var book = this.data.patent_write_two;
    var look_Already = this.data.look_Already;
    var remark = this.data.value;
    if (checked) {
      if (!look_Already) {
        this.notify('请先查看专利委托书并下载，拍照后上传！');
        return;
      };
      if (book.length == 0) {
        this.notify('请上传委托书！');
        return;
      };
      var remark = '';
    };
    var value = this.data.value;
    var id = this.data.id;
    this.toast()
    NetworkRequest({
      url: '/patent/editInfo',
      data: {
        id: id,
        is_agree: checked ? 1 : 2,
        book: book,
        remark: remark,
      },
      method: 'POST',
    }).then(res => {
      this.notify(res.data.msg)
      var code = res.data.code;
      if (code == 1) {
        prevPage.onEnpush();
        setTime().then(res => {
          wx.navigateBack({
            delta: 1,
          })
        })
      } else {
        this.notify(res.data.msg);
      }
    })
  },

  onInput(e) {
    this.setData({
      value: e.detail
    })
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
    if (event.detail) {
      this.setData({
        value: '',
      })
    }
  },

  toast(e) {
    Toast.loading({
      message: e,
      duration: 0,
    });
  },
  notify(res) {
    Notify({
      text: res,
      duration: 3000,
      selector: '#custom-selector',
      backgroundColor: '#f44',
      color: '#fff',
      zIndex: 300
    })
  },
  onLoad: function(options) {
    this.getData(options.id);
    this.data.id = options.id;
  }, onShow: function () {
    if (this.data.status == 2) {
      copyText(wx.getStorageSync('filePath'), this);
      this.notify('文件链接已复制，您可以粘贴发送至微信或使用浏览器进行下载！');
    }
    setTime(500).then(res => {
      this.data.status = 1
    })
  },
})