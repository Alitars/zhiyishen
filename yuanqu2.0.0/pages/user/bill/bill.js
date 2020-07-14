Page({
  data: {
    listBtn: [{
      url: '/pages/user/bill/apply/apply',
      images: '/images/f1.png',
      text: '发票申请'
    }, {
      url: '/pages/user/bill/r_bill/r_bill',
      images: '/images/f2.png',
      text: '开票记录'
    }, {
      url: '/pages/user/bill/g_bill/g_bill',
      images: '/images/f3.png',
      text: '开票信息管理'
    }],
  },
  onChange(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: id,
    })
  },
})