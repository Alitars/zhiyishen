Page({
  data: {

  },
  onCopyText() {
    wx.setClipboardData({
      data: "公司名称：知升(上海)知识产权代理有限公司；开户行：上海浦东发展银行松江支行；账号：98080078801500002499；",
    })
  },
})