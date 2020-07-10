"use strict";
var navigationArry = [{
    title: "首页",
    type: "2",
    url: "/pages/index/index",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标取名",
    type: "1",
    url: "/package/component1/pages/intitle/bename/bename",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标设计",
    type: "1",
    url: "/package/component1/pages/index/brand_name/brand_name",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标检索分析",
    type: "1",
    url: "/pages/index/search/search",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "网站公告",
    type: "1",
    url: "",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "合作伙伴",
    type: "1",
    url: "",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "注册",
    type: "1",
    url: "/pages/user/log_on/register/register",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "登录",
    type: "1",
    url: "/pages/user/log_on/log_on",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "退出",
    type: "3",
    url: "/",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "忘记密码",
    type: "1",
    url: "/pages/user/log_on/forget/forget",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "关于我们",
    type: "1",
    url: "/pages/user/about_us/about_us",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "新闻中心",
    type: "1",
    url: "/pages/user/news/news",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "帮助中心",
    type: "1",
    url: "",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "使用教程",
    type: "1",
    url: "",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "人才招聘",
    type: "1",
    url: "",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "联系我们",
    type: "4",
    url: "/",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "建议反馈",
    type: "1",
    url: "/pages/user/feedback/feedback",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "购物车",
    type: "1",
    url: "/pages/user/shop/shop",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "用户中心个人资料",
    type: "1",
    url: "/pages/user/means/means",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "密码修改",
    type: "1",
    url: "/pages/user/log_on/forget/forget?tab" + !0,
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "手机号码变更",
    type: "1",
    url: "/pages/user/means/means/field/field?id=2",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "邮箱变更",
    type: "1",
    url: "/pages/user/means/means/field/field?id=3",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "开票申请",
    type: "1",
    url: "/pages/user/bill/bill",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "开票记录",
    type: "1",
    url: "/pages/user/bill/r_bill/r_bill",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "开票信息管理",
    type: "1",
    url: "/pages/user/bill/g_bill/g_bill",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "我的消息",
    type: "1",
    url: "/pages/user/news/news",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "我的优惠券",
    type: "1",
    url: "/pages/user/coupon/coupon",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "个人认证",
    type: "1",
    url: "/pages/user/attest/apply/apply?open=" + !0,
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "企业认证",
    type: "1",
    url: "/pages/user/attest/apply/apply",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "收货地址",
    type: "5",
    url: "gl://addresslist",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "新增收货地址",
    type: "5",
    url: "gl://addresslist",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "全部订单",
    type: "1",
    url: "/pages/user/my_order/my_order?id=0&index=0&open=" + !0,
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标订单",
    type: "1",
    url: "/pages/user/my_order/my_order?id=51&index=1&open=" + !0,
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "专利订单",
    type: "1",
    url: "/pages/user/my_order/my_order?id=50&index=2&open=" + !0,
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "版权订单",
    type: "1",
    url: "/pages/user/my_order/my_order?id=49&index=4&open=" + !0,
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "待付订单",
    type: "1",
    url: "/pages/user/my_order/my_order?id=1",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "服务中订单",
    type: "1",
    url: "/pages/user/my_order/my_order?id=2",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "已完成订单",
    type: "1",
    url: "/pages/user/my_order/my_order?id=3",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "退款订单",
    type: "1",
    url: "",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标注册",
    type: "1",
    url: "/package/component1/pages/services/dt/dt?id=1&title=商标注册",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标续展",
    type: "1",
    url: "/package/component1/pages/services/dt/dt?id=2&title=商标信息业务&open=true&key=商标续展",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标变更",
    type: "1",
    url: "/package/component1/pages/services/dt/dt?id=2&title=商标信息业务&open=true&key=商标变更",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标转让",
    type: "1",
    url: "/package/component1/pages/services/dt/dt?id=2&title=商标信息业务&open=true&key=商标转让",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标许可备案",
    type: "1",
    url: "/package/component1/pages/services/dt/dt?id=2&title=商标信息业务&open=true&key=商标许可备案",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "补发商标证书",
    type: "1",
    url: "/package/component1/pages/services/dt/dt?id=2&title=商标信息业务&open=true&key=补发商标证书",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标驳回复审",
    type: "1",
    url: "/package/component1/pages/services/dt/dt?id=3&title=商标信息业务&open=true&key=商标驳回复审",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标异议申请",
    type: "1",
    url: "/package/component1/pages/services/dt/dt?id=4&title=商标信息业务&open=true&key=商标异议申请",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标异议答辩",
    type: "1",
    url: "/package/component1/pages/services/dt/dt?id=4&title=商标信息业务&open=true&key=商标异议答辩",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标无效宣告",
    type: "1",
    url: "gl://productdetails",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标无效宣告答辩",
    type: "1",
    url: "gl://productdetails",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "商标撤三申请",
    type: "1",
    url: "/package/component1/pages/services/dt/dt?id=5&title=商标信息业务&open=true&key=商标撤三申请",
    icon: "/public/uploads/20190617171307342.png"
  }, {
    title: "撤销三年不使用&答辩",
    type: "1",
    url: "/package/component1/pages/services/dt/dt?id=5&title=商标信息业务&open=true&key=商标撤三答辩",
    icon: "/public/uploads/20190617171307342.png"
  }],
  name = ["首页", "商标取名", "商标设计", "商标检索分析", "注册", "登录", "退出", "忘记密码", "关于我们", "联系我们", "建议反馈", "购物车", "用户中心个人资料", "密码修改", "手机号码变更", "邮箱变更", "开票申请", "开票记录", "开票信息管理", "我的消息", "我的优惠券", "个人认证", "企业认证", "新增收货地址", "全部订单", "商标订单", "专利订单", "版权订单", "待付订单", "服务中订单", "已完成订单", "退款订单", "商标注册", "商标续展", "商标变更", "商标转让", "商标许可备案", "补发商标证书", "商标驳回复审", "商标异议申请", "商标异议答辩", "商标无效宣告", "商标无效宣告答辩", "商标撤三申请", "撤销三年不使用&答辩"],
  imgUrls = "https://admin.iguolao.com/public/uploads/20200403145750343.png",
  applyType = [{
    id: 1,
    name: "01类 化学原料",
    isSelect: !1
  }, {
    id: 2,
    name: "02类 颜料油漆",
    isSelect: !1
  }, {
    id: 3,
    name: "03类 日化用品",
    isSelect: !1
  }, {
    id: 4,
    name: "04类 燃料油脂",
    isSelect: !1
  }, {
    id: 5,
    name: "05类 医药",
    isSelect: !1
  }, {
    id: 6,
    name: "06类 金属材料",
    isSelect: !1
  }, {
    id: 7,
    name: "07类 机械设备",
    isSelect: !1
  }, {
    id: 8,
    name: "08类 手工器械",
    isSelect: !1
  }, {
    id: 9,
    name: "09类 科学仪器",
    isSelect: !1
  }, {
    id: 10,
    name: "10类 医疗器械",
    isSelect: !1
  }, {
    id: 11,
    name: "11类 灯具空调",
    isSelect: !1
  }, {
    id: 12,
    name: "12类 运输工具",
    isSelect: !1
  }, {
    id: 13,
    name: "13类 军火烟火",
    isSelect: !1
  }, {
    id: 14,
    name: "14类 珠宝钟表",
    isSelect: !1
  }, {
    id: 15,
    name: "15类 乐器",
    isSelect: !1
  }, {
    id: 16,
    name: "16类 办公用品",
    isSelect: !1
  }, {
    id: 17,
    name: "17类 橡胶制品",
    isSelect: !1
  }, {
    id: 18,
    name: "18类 皮革皮具",
    isSelect: !1
  }, {
    id: 19,
    name: "19类 建筑材料",
    isSelect: !1
  }, {
    id: 20,
    name: "20类 家具",
    isSelect: !1
  }, {
    id: 21,
    name: "21类 厨房洁具",
    isSelect: !1
  }, {
    id: 22,
    name: "22类 绳网袋蓬",
    isSelect: !1
  }, {
    id: 23,
    name: "23类 纱线丝",
    isSelect: !1
  }, {
    id: 24,
    name: "24类 布料床单",
    isSelect: !1
  }, {
    id: 25,
    name: "25类 服装鞋帽",
    isSelect: !1
  }, {
    id: 26,
    name: "26类 钮扣拉链",
    isSelect: !1
  }, {
    id: 27,
    name: "27类 地毯席垫",
    isSelect: !1
  }, {
    id: 28,
    name: "28类 健身器材",
    isSelect: !1
  }, {
    id: 29,
    name: "29类 食品",
    isSelect: !1
  }, {
    id: 30,
    name: "30类 方便食品",
    isSelect: !1
  }, {
    id: 31,
    name: "31类 农林生鲜",
    isSelect: !1
  }, {
    id: 32,
    name: "32类 啤酒饮料",
    isSelect: !1
  }, {
    id: 33,
    name: "33类 酒",
    isSelect: !1
  }, {
    id: 34,
    name: "34类 烟草烟具",
    isSelect: !1
  }, {
    id: 35,
    name: "35类 广告销售",
    isSelect: !1
  }, {
    id: 36,
    name: "36类 金融物管",
    isSelect: !1
  }, {
    id: 37,
    name: "37类 建筑修理",
    isSelect: !1
  }, {
    id: 38,
    name: "38类 通讯服务",
    isSelect: !1
  }, {
    id: 39,
    name: "39类 运输贮藏",
    isSelect: !1
  }, {
    id: 40,
    name: "40类 材料加工",
    isSelect: !1
  }, {
    id: 41,
    name: "41类 教育娱乐",
    isSelect: !1
  }, {
    id: 42,
    name: "42类 科技服务",
    isSelect: !1
  }, {
    id: 43,
    name: "43类 餐饮住宿",
    isSelect: !1
  }, {
    id: 44,
    name: "44类 医疗园艺",
    isSelect: !1
  }, {
    id: 45,
    name: "45类 社会服务",
    isSelect: !1
  }],
  contrast = [{
    id: "01",
    name: "01类 化学原料",
    isSelect: !1
  }, {
    id: "02",
    name: "02类 颜料油漆",
    isSelect: !1
  }, {
    id: "03",
    name: "03类 日化用品",
    isSelect: !1
  }, {
    id: "04",
    name: "04类 燃料油脂",
    isSelect: !1
  }, {
    id: "05",
    name: "05类 医药",
    isSelect: !1
  }, {
    id: "06",
    name: "06类 金属材料",
    isSelect: !1
  }, {
    id: "07",
    name: "07类 机械设备",
    isSelect: !1
  }, {
    id: "08",
    name: "08类 手工器械",
    isSelect: !1
  }, {
    id: "09",
    name: "09类 科学仪器",
    isSelect: !1
  }, {
    id: "10",
    name: "10类 医疗器械",
    isSelect: !1
  }, {
    id: "11",
    name: "11类 灯具空调",
    isSelect: !1
  }, {
    id: "12",
    name: "12类 运输工具",
    isSelect: !1
  }, {
    id: "13",
    name: "13类 军火烟火",
    isSelect: !1
  }, {
    id: "14",
    name: "14类 珠宝钟表",
    isSelect: !1
  }, {
    id: "15",
    name: "15类 乐器",
    isSelect: !1
  }, {
    id: "16",
    name: "16类 办公用品",
    isSelect: !1
  }, {
    id: "17",
    name: "17类 橡胶制品",
    isSelect: !1
  }, {
    id: "18",
    name: "18类 皮革皮具",
    isSelect: !1
  }, {
    id: "19",
    name: "19类 建筑材料",
    isSelect: !1
  }, {
    id: "20",
    name: "20类 家具",
    isSelect: !1
  }, {
    id: "21",
    name: "21类 厨房洁具",
    isSelect: !1
  }, {
    id: "22",
    name: "22类 绳网袋蓬",
    isSelect: !1
  }, {
    id: "23",
    name: "23类 纱线丝",
    isSelect: !1
  }, {
    id: "24",
    name: "24类 布料床单",
    isSelect: !1
  }, {
    id: "25",
    name: "25类 服装鞋帽",
    isSelect: !1
  }, {
    id: "26",
    name: "26类 钮扣拉链",
    isSelect: !1
  }, {
    id: "27",
    name: "27类 地毯席垫",
    isSelect: !1
  }, {
    id: "28",
    name: "28类 健身器材",
    isSelect: !1
  }, {
    id: "29",
    name: "29类 食品",
    isSelect: !1
  }, {
    id: "30",
    name: "30类 方便食品",
    isSelect: !1
  }, {
    id: "31",
    name: "31类 农林生鲜",
    isSelect: !1
  }, {
    id: "32",
    name: "32类 啤酒饮料",
    isSelect: !1
  }, {
    id: "33",
    name: "33类 酒",
    isSelect: !1
  }, {
    id: "34",
    name: "34类 烟草烟具",
    isSelect: !1
  }, {
    id: "35",
    name: "35类 广告销售",
    isSelect: !1
  }, {
    id: "36",
    name: "36类 金融物管",
    isSelect: !1
  }, {
    id: "37",
    name: "37类 建筑修理",
    isSelect: !1
  }, {
    id: "38",
    name: "38类 通讯服务",
    isSelect: !1
  }, {
    id: "39",
    name: "39类 运输贮藏",
    isSelect: !1
  }, {
    id: "40",
    name: "40类 材料加工",
    isSelect: !1
  }, {
    id: "41",
    name: "41类 教育娱乐",
    isSelect: !1
  }, {
    id: "42",
    name: "42类 科技服务",
    isSelect: !1
  }, {
    id: "43",
    name: "43类 餐饮住宿",
    isSelect: !1
  }, {
    id: "44",
    name: "44类 医疗园艺",
    isSelect: !1
  }, {
    id: "45",
    name: "45类 社会服务",
    isSelect: !1
  }],
  contents = [{
    url: "pages/index/index",
    text: "首页"
  }, {
    url: "pages/index/search/search",
    text: "搜索"
  }, {
    url: "pages/index/search/dt/dt",
    text: "搜素详情"
  }, {
    url: "pages/index/search/common/common",
    text: "搜素详情的详情"
  }, {
    url: "pages/services/services",
    text: "服务分类"
  }, {
    url: "pages/knowledge/knowledge",
    text: "知产管理"
  }, {
    url: "pages/knowledge/saas/saas",
    text: ""
  }, {
    url: "pages/knowledge/extension/extension",
    text: ""
  }, {
    url: "pages/knowledge/trademark/trademark",
    text: "知产管理全部商标"
  }, {
    url: "pages/knowledge/patent/patent",
    text: ""
  }, {
    url: "pages/user/user",
    text: "个人中心"
  }, {
    url: "pages/user/means/means",
    text: "设置"
  }, {
    url: "pages/user/means/means/field/field",
    text: "设置修改"
  }, {
    url: "pages/user/about_us/about_us",
    text: "关于我们"
  }, {
    url: "pages/user/feedback/feedback",
    text: "意见反馈"
  }, {
    url: "pages/user/attest/apply/apply",
    text: "申请认证"
  }, {
    url: "pages/user/attest/apply/search/search",
    text: "申请企业认证搜索"
  }, {
    url: "pages/user/news/news",
    text: "个人消息"
  }, {
    url: "pages/user/news/dt/dt",
    text: "个人消息详情"
  }, {
    url: "pages/user/log_on/register/register",
    text: "知依昇账号注册"
  }, {
    url: "pages/user/log_on/forget/forget",
    text: "忘记密码"
  }, {
    url: "pages/user/log_on/log_on",
    text: "登录"
  }, {
    url: "pages/user/log_on/apple_id/apple_id",
    text: "微信登录绑定手机号"
  }, {
    url: "pages/user/log_on/bind/bind",
    text: "绑定手机号"
  }, {
    url: "pages/user/coupon/coupon",
    text: "优惠券"
  }, {
    url: "pages/user/attest/dt/dt",
    text: "认证详情"
  }, {
    url: "pages/user/attest/attest",
    text: "认证列表"
  }, {
    url: "pages/user/attest/success/success",
    text: "认证成功"
  }, {
    url: "pages/user/attest/edit/edit",
    text: "认证编辑"
  }, {
    url: "pages/user/bill/edit/edit",
    text: "发票编辑"
  }, {
    url: "pages/user/shop/shop",
    text: "购物车"
  }, {
    url: "pages/user/shop/dt/dt",
    text: "购物车详情"
  }, {
    url: "pages/user/shop/refund/refund",
    text: "用户退款"
  }, {
    url: "pages/user/my_order/my_order",
    text: "我的订单"
  }, {
    url: "pages/user/my_order/merg/merg",
    text: "申请订合同"
  }, {
    url: "pages/user/my_order/dt/dt",
    text: "订单详情"
  }, {
    url: "pages/user/my_order/order_progress/order_progress",
    text: "订单进度"
  }, {
    url: "pages/user/bill/bill",
    text: "发票"
  }, {
    url: "pages/user/bill/s_bill/s_bill",
    text: "申请发票"
  }, {
    url: "pages/user/bill/apply/apply",
    text: "发票发票列表"
  }, {
    url: "pages/user/bill/g_bill/g_bill",
    text: "开票信息管理"
  }, {
    url: "pages/user/bill/r_bill/r_bill",
    text: "开票记录"
  }, {
    url: "pages/user/bill/r_bill/dt/dt",
    text: "发票详情"
  }, {
    url: "pages/user/address/address",
    text: "地址"
  }, {
    url: "pages/user/shop/result/result",
    text: ""
  }, {
    url: "package/component1/pages/intitle/bename/bename",
    text: "商标取名选择"
  }, {
    url: "package/component1/pages/intitle/brand_name/brand_name",
    text: "商标取名输入行业"
  }, {
    url: "package/component1/pages/intitle/choose/choose",
    text: "商标取名行业选择"
  }, {
    url: "package/component1/pages/intitle/check/check",
    text: "商标取名检测"
  }, {
    url: "package/component1/pages/intitle/terms/terms",
    text: "商标取名输入字词"
  }, {
    url: "package/component1/pages/intitle/recommend/recommend",
    text: "商标取名推荐"
  }, {
    url: "package/component1/pages/intitle/create_finish/create_finish",
    text: "商标取名完成"
  }, {
    url: "package/component1/pages/intitle/createDt/createDt",
    text: "商标取名详情"
  }, {
    url: "package/component1/pages/index/brand_name/brand_name",
    text: "商标设计输入品牌名称"
  }, {
    url: "package/component1/pages/index/plate/plate",
    text: "商标设计输入产品或服务名称"
  }, {
    url: "package/component1/pages/index/choose/choose",
    text: "商标设计行业选择"
  }, {
    url: "package/component1/pages/index/check/check",
    text: "商标设计检测"
  }, {
    url: "package/component1/pages/index/create_finish/create_finish",
    text: "商标设计完成"
  }, {
    url: "package/component1/pages/index/createDt/createDt",
    text: "商标设计详情"
  }, {
    url: "package/component1/pages/services/dt/dt",
    text: "服务分类详情"
  }, {
    url: "package/component1/pages/services/pay/pay",
    text: "支付"
  }, {
    url: "package/component1/pages/services/coupon/coupon",
    text: "支付选择优惠券"
  }, {
    url: "package/component1/pages/services/choose/choose",
    text: "商标注册选择行业"
  }, {
    url: "package/component1/pages/services/result/result",
    text: ""
  }, {
    url: "package/component1/pages/services/trade/trade",
    text: "商标注册输入产品名称服务行业"
  }, {
    url: "package/component1/pages/services/name/name",
    text: "商标注册输入名称"
  }, {
    url: "package/component1/pages/services/check/check",
    text: "商标注册检测"
  }, {
    url: "package/component1/pages/services/check_fail/check_fail",
    text: "商标注册检测失败"
  }, {
    url: "package/component1/pages/services/recommend/recommend",
    text: "商标注册推荐"
  }, {
    url: "package/component1/pages/services/broad_heading/broad_heading",
    text: ""
  }, {
    url: "package/component1/pages/services/broad_heading_two/broad_heading_two",
    text: "商标注册增加类别"
  }, {
    url: "package/component1/pages/services/add_small_two/add_small_two",
    text: "增加三类"
  }, {
    url: "package/component1/pages/services/add_small/add_small",
    text: ""
  }, {
    url: "package/component1/pages/material/send_by_post/send_by_post",
    text: "邮寄"
  }, {
    url: "package/component1/pages/material/recheck/recheck",
    text: "确认正文"
  }, {
    url: "package/component1/pages/material/Up_ziliao/Up_ziliao",
    text: "提交资料"
  }, {
    url: "package/component1/pages/material/revise_Up_ziliao/revise_Up_ziliao",
    text: "重新提交资料"
  }, {
    url: "package/component1/pages/material/Upload_file/Upload_file",
    text: "上传资料"
  }, {
    url: "package/component1/pages/index/agreement/agreement",
    text: "服务协议"
  }, {
    url: "package/component1/pages/index/clause/clause",
    text: "隐私条款"
  }, {
    url: "package/component1/pages/index/recommend/recommend",
    text: "商标设计推荐"
  }, {
    url: "package/component1/pages/services/similar_mark/similar_mark",
    text: "相似推荐"
  }, {
    url: "package/component1/pages/services/increas/increas",
    text: "增加组别"
  }],
  indexArry = {
    "cate": [{
      "cate_name": "商标服务",
      "id": 51,
      "icon": "http://51guolao.yiqibnb.com/public/images/1.png",
      "scheme": "gl://main/1?id=51"
    }, {
      "cate_name": "专利服务",
      "id": 49,
      "icon": "http://51guolao.yiqibnb.com/public/images/3.png",
      "scheme": "gl://main/1?id=49"
    }, {
      "cate_name": "版权服务",
      "id": 50,
      "icon": "http://51guolao.yiqibnb.com/public/images/2.png",
      "scheme": "gl://main/1?id=50"
    }],
    "banner": [{
      "id": 38,
      "pic": "https://admin.iguolao.com/public/searching/20200609110137984.png",
      "created_at": "2020-06-09 11:04:24",
      "updated_at": "2020-06-09 11:04:24",
      "url": "baiwanrl",
      "title": "百万让利",
      "status": 1,
      "sort": 10,
      "type": 4,
      "desc": null,
      "color": ["rgba(2,171,161)", "rgba(0,28,47)"]
    }, {
      "id": 36,
      "pic": "https://admin.iguolao.com/public/searching/20200609104740285.png",
      "created_at": "2020-06-09 10:49:25",
      "updated_at": "2020-06-09 10:49:25",
      "url": "agent",
      "title": "LMA代理人",
      "status": 1,
      "sort": 5,
      "type": 4,
      "desc": null,
      "color": ["rgba(38,186,249)", "rgba(0,29,62)"]
    }, {
      "id": 35,
      "pic": "https://admin.iguolao.com/public/searching/20200609104755778.png",
      "created_at": "2020-06-09 10:49:32",
      "updated_at": "2020-06-09 10:49:32",
      "url": "member",
      "title": "小程序白银会员banner",
      "status": 1,
      "sort": 4,
      "type": 4,
      "desc": null,
      "color": ["rgba(0,1,1)", "rgba(0,4,7)"]
    }, {
      "id": 26,
      "pic": "https://admin.iguolao.com/public/searching/20200609104831551.png",
      "created_at": "2020-06-09 10:49:34",
      "updated_at": "2020-06-09 10:49:34",
      "url": null,
      "title": "banner",
      "status": 1,
      "sort": 3,
      "type": 4,
      "desc": null,
      "color": ["rgba(0,1,3)", "rgba(0,5,7)"]
    }, {
      "id": 23,
      "pic": "https://admin.iguolao.com/public/searching/20200609104811837.png",
      "created_at": "2020-06-09 10:49:38",
      "updated_at": "2020-06-09 10:49:38",
      "url": null,
      "title": "test",
      "status": 1,
      "sort": 2,
      "type": 4,
      "desc": null,
      "color": ["rgba(255,129,22)", "rgba(255,129,22)"]
    }, {
      "id": 37,
      "pic": "https://admin.iguolao.com/public/searching/20200609105031898.png",
      "created_at": "2020-06-09 10:50:40",
      "updated_at": "2020-06-09 10:50:40",
      "url": null,
      "title": "AI赋能",
      "status": 1,
      "sort": 0,
      "type": 4,
      "desc": null,
      "color": ["rgba(0,25,31)", "rgba(0,64,84)"]
    }],
    "hot": [{
      "id": 27,
      "title": "商标续展",
      "price": "450.00",
      "pic": "/public/uploads/20191022142450329.png",
      "desc": "希望继续保有原商标\r\n须在商标有效期满前提出申请",
      "cate_id": 51,
      "pid": 2,
      "icon": "/public/uploads/20191022142450565.png",
      "service_price": "430.00",
      "agency_price": "550.00",
      "total": "880.00"
    }, {
      "id": 28,
      "title": "商标撤三申请",
      "price": "0.00",
      "pic": "/public/uploads/20191022140515938.png",
      "desc": "撤销他人三年不使用商标\r\n扫除障碍",
      "cate_id": 51,
      "pid": 5,
      "icon": "/public/uploads/20191022140515275.png",
      "service_price": "1880.00",
      "agency_price": "800.00",
      "total": "1880.00"
    }, {
      "id": 41,
      "title": "商标变更",
      "price": "0.00",
      "pic": "/public/uploads/20191022142421577.png",
      "desc": "变更注册人名义，登记地址等注册事项，防止纠纷",
      "cate_id": 51,
      "pid": 2,
      "icon": "/public/uploads/20191022142421117.png",
      "service_price": "350.00",
      "agency_price": "100.00",
      "total": "350.00"
    }, {
      "id": 42,
      "title": "商标转让",
      "price": "450.00",
      "pic": "/public/uploads/20191022142408724.png",
      "desc": "转让商标（改变商标权属）\r\n办理手续确保有效",
      "cate_id": 51,
      "pid": 2,
      "icon": "/public/uploads/20191022142408278.png",
      "service_price": "330.00",
      "agency_price": "550.00",
      "total": "780.00"
    }, {
      "id": 45,
      "title": "商标驳回复审",
      "price": "750.00",
      "pic": "/public/uploads/20191022142310314.png",
      "desc": "商标初审未通过，可以向商评委提交复议，再次争取",
      "cate_id": 51,
      "pid": 3,
      "icon": "/public/uploads/20191022142310858.png",
      "service_price": "2530.00",
      "agency_price": "2000.00",
      "total": "3280.00"
    }, {
      "id": 46,
      "title": "商标异议申请",
      "price": "500.00",
      "pic": "/public/uploads/20191022142250245.png",
      "desc": "他人申请注册的商标\r\n公告期可提出异议，防止注册",
      "cate_id": 51,
      "pid": 4,
      "icon": "/public/uploads/20191022142250132.png",
      "service_price": "2580.00",
      "agency_price": "2000.00",
      "total": "3080.00"
    }, {
      "id": 47,
      "title": "商标撤三答辩",
      "price": "0.00",
      "pic": "/public/uploads/20191022140534623.png",
      "desc": "商标被他人申请撤销后\r\n及时提交答辩申请以保留商标的使用权",
      "cate_id": 51,
      "pid": 5,
      "icon": "/public/uploads/20191022140534513.png",
      "service_price": "2580.00",
      "agency_price": "2000.00",
      "total": "2580.00"
    }],
    "ma": [{
      "id": 22,
      "pic": "/public/searching/20191022150945912.png",
      "created_at": "2019-11-01 10:06:02",
      "updated_at": "2019-11-01 10:06:02",
      "url": "gl://productdetails?pid=1",
      "title": "AI商标注册",
      "status": 0,
      "sort": 4,
      "type": 3,
      "desc": null
    }, {
      "id": 21,
      "pic": "/public/searching/20191022150953678.png",
      "created_at": "2020-01-14 09:37:49",
      "updated_at": "2020-01-14 09:37:49",
      "url": "gl://design",
      "title": "Logo设计",
      "status": 0,
      "sort": 3,
      "type": 3,
      "desc": null
    }, {
      "id": 19,
      "pic": "/public/searching/20191022151005154.png",
      "created_at": "2019-10-22 15:10:05",
      "updated_at": "2019-10-22 15:10:05",
      "url": "gl://naming",
      "title": "商标取名",
      "status": 0,
      "sort": 2,
      "type": 3,
      "desc": null
    }, {
      "id": 20,
      "pic": "/public/searching/20191022151014313.png",
      "created_at": "2019-10-22 15:10:15",
      "updated_at": "2019-10-22 15:10:15",
      "url": null,
      "title": "专利撰写",
      "status": 0,
      "sort": 1,
      "type": 3,
      "desc": null
    }]
  },
  voiceArry = [{
    text: "请输入您要申请的商标名称",
    url: "/public/xf/1579222076872.mp3"
  }, {
    text: "Hi!我是您的AI知识产权代理人--小果,请输入您的产品名称或服务行业",
    url: "/public/xf/1579222093575.mp3"
  }, {
    text: "小果正在为您检测推荐类别,请稍后",
    url: "/public/xf/1579222100420.mp3"
  }, {
    text: "Hi!我是您的AI知识产权代理人--小果，请问您需要什么帮助？",
    url: "/public/xf/1579222608754.mp3"
  }, {
    text: "Hi!我是小果，请问您理想中的商标是几个字？",
    url: "/public/xf/1579222661465.mp3"
  }, {
    text: "您想要名称中含有哪些字或者词呢？",
    url: "/public/xf/1579222667856.mp3"
  }, {
    text: "小果正在为您进行商标取名,请稍后",
    url: "/public/xf/1579222689659.mp3"
  }, {
    text: "Hi!我是小果，请问您的品牌名称是？",
    url: "/public/xf/1579222702943.mp3"
  }, {
    text: "小果正在为您Logo设计，请稍后",
    url: "/public/xf/1579222718441.mp3"
  }, {
    text: "请描述现有技术的优点与缺点：",
    url: "/public/xf/1585791434348.mp3"
  }, {
    text: "您的产品或技术是属于什么领域的?",
    url: "/public/xf/1585795498483.mp3"
  }, {
    text: "您是针对现有产品结构的哪些问题进行改进的?",
    url: "/public/xf/1585795510938.mp3"
  }, {
    text: "若图中含有芯片，请告知芯片型号",
    url: "/public/xf/1585795517803.mp3"
  }, {
    text: "请输入发明创造的名称:",
    url: "/public/xf/1589276432768.mp3"
  }, {
    text: "请输入您的产品名称或服务行业",
    url: "/public/xf/1589277249732.mp3"
  }, {
    text: "请问您理想中的商标是几个字？",
    url: "/public/xf/1589764759893.mp3"
  }, {
    text: "请选择您的设计要点",
    url: "/public/xf/1590394912560.mp3"
  }, {
    text: "设计特别说明：给出事例（非必填项）",
    url: "/public/xf/1590398932941.mp3"
  }, {
    text: "通过产品结构图纸中的主要零部件及连接关系，描述该结构的工作原理，如需帮助请点击示例查看",
    url: "/public/xf/1590459776442.mp3"
  }, {
    url: "/public/xf/1590459989246.mp3"
  }, {
    text: "请上传产品图片",
    url: "/public/xf/1590473025898.mp3"
  }, {
    text: "通过电路图中主要功能模块及连接关系，描述该结构的工作原理，如需帮助请点击示例查看",
    url: "/public/xf/1590482923213.mp3"
  }, {
    text: "通过流程图、时序图或算法公式等，描述其工作原理；如需帮助请点击示例查看",
    url: "/public/xf/1590482926793.mp3"
  }, {
    text: "通过集成电路布图设计描述其层级设计以及层级间的连接关系，描述其工作原理；如需帮助请点击示例查看",
    url: "/public/xf/1590482932507.mp3"
  }, {
    text: "请结合上述主要零部价，描述该结构的工作原理",
    url: "/public/xf/1590482937327.mp3"
  }, {
    text: "通过所述产品配比配方、化学方程式、生产流程和工艺等，描述其工作原理；如需帮助请点击示例查看",
    url: "/public/xf/1590484576799.mp3"
  }, {
    text: "您的专利正在检测中，请稍后去个人中心的专利分析报告中查看专利检测结果",
    url: "/public/xf/1590486513943.mp3"
  }, {
    text: "请选择您的专利类型",
    url: "/public/xf/1590560393355.mp3"
  }, {
    text: "请输入发明创造的名称",
    url: "/public/xf/1590642852390.mp3"
  },{
    text: "请输入发明创造的名称以及产品名称",
    url: "/public/xf/1592358120686.mp3"
  },{
    text: "请输入使用外观设计的产品名称", 
    url: "/public/xf/1592358493809.mp3"
  },{
    text: "请确定技术关键词", 
    url: "/public/xf/1592358499868.mp3"
  },{
    text: "请选择您的行业", 
    url: "/public/xf/1592358505911.mp3"
  }],
  Question = [{
    id: 1,
    text: "请选择您的专利类型",
    isPresent: !0,
    data: {},
    url: "package/component2/pages/patent_book/select/select",
    lastId: 1,
    nextId: 1
  }, {
    id: 2,
    text: "设计特别说明：给出事例（非必填项）",
    isPresent: !1,
    data: {},
    nextId: 1,
    lastId: 1,
    url: "package/component2/pages/patent_book/sound/sound"
  }, {
    id: 3,
    text: "通过产品结构图纸中的主要零部件及连接关系，描述该结构的工作原理，如需帮助请点击示例查看",
    isPresent: !1,
    data: {},
    nextId: 1,
    lastId: 1
  }, {
    id: 4,
    text: "通过电路图中主要功能模块及连接关系，描述该结构的工作原理，如需帮助请点击示例查看",
    isPresent: !1,
    data: {},
    nextId: 1,
    lastId: 1
  }, {
    id: 5,
    text: "通过流程图、时序图或算法公式等，描述其工作原理；如需帮助请点击示例查看",
    isPresent: !1,
    data: {},
    nextId: 1,
    lastId: 1
  }, {
    id: 6,
    text: "通过所述产品配比配方、化学方程式、生产流程和工艺等，描述其工作原理；如需帮助请点击示例查看",
    isPresent: !1,
    data: {},
    nextId: 1,
    lastId: 1
  }, {
    id: 7,
    text: "通过集成电路布图设计描述其层级设计以及层级间的连接关系，描述其工作原理；如需帮助请点击示例查看",
    isPresent: !1,
    data: {},
    nextId: 1,
    lastId: 1
  }, {
    id: 8,
    text: "请结合上述主要零部价，描述该结构的工作原理",
    isPresent: !1,
    data: {},
    nextId: 1,
    lastId: 1
  }, {
    id: 9,
    text: "请输入发明创造的名称",
    isPresent: !1,
    data: {},
    nextId: 1,
    lastId: 1
  }, {
    id: 10,
    text: "请选择您的专利类型",
    isPresent: !1,
    data: {},
    nextId: 1,
    lastId: 1
  }, {
    id: 11,
    text: "请输入发明创造的名称",
    isPresent: !1,
    data: {},
    nextId: 1,
    lastId: 1
  }, {
    id: 12,
    text: "您的产品或技术属于什么领域的？",
    isPresent: !1,
    data: {},
    nextId: 1,
    lastId: 1
  }, {
    id: 13,
    text: "请确认技术关键词",
    isPresent: !1,
    data: {},
    nextId: 1,
    lastId: 1
  }, {
    id: 14,
    text: "请上传产品图片",
    isPresent: !1,
    data: {},
    nextId: 1,
    lastId: 1
  }],
  option = {
    grid: {
      show: !1,
      left: 40,
      right: 20,
      bottom: 40,
      top: 15,
      containLabel: !1,
      borderColor: "#fff"
    },
    tooltip: {},
    xAxis: [{
      axisLabel: {
        color: "#999",
        fontSize: 10,
        rotate:0
      },
      axisTick: {
        show: !1
      },
      axisLine: {
        show: !1
      },
      data: []
    }],
    yAxis: [{
      type: "value",
      axisTick: {
        show: !1
      },
      axisLine: {
        show: !1
      },
      axisLabel: {
        color: "#999",
        fontSize: 13
      }
    }],
    series: [{
      type: "bar",
      animation: !0,
      barWidth: 8,
      barBorderRadius: "4",
      data: [],
      label: {
        normal: {
          show: !1,
          position: "inside"
        }
      },
      itemStyle: {
        barCategoryGap: "10%",
        normal: {
          barBorderRadius: [4, 4, 4, 4],
          color: {}
        }
      }
    }]
  },
  otherOption = {
    grid: {
      show: !1,
      left: 40,
      right: 20,
      bottom: 40,
      top: 15,
      containLabel: !1,
      borderColor: "#fff"
    },
    tooltip: {},
    xAxis: [{
      axisLabel: {
        color: "#999",
        fontSize: 10,
        rotate:0
      },
      axisTick: {
        show: !1
      },
      axisLine: {
        show: !1
      },
      data: []
    }],
    yAxis: [{
      type: "value",
      axisTick: {
        show: !1
      },
      axisLine: {
        show: !1
      },
      axisLabel: {
        color: "#999",
        fontSize: 13
      }
    }],
    series: [{
      type: "bar",
      animation: !0,
      barWidth: 8,
      barBorderRadius: "4",
      data: [],
      label: {
        normal: {
          show: !1,
          position: "inside"
        }
      },
      itemStyle: {
        barCategoryGap: "10%",
        normal: {
          barBorderRadius: [4, 4, 4, 4],
          color: {}
        }
      }
    }]
  },
  pie = {
    legend: {
      show: !0,
      data: []
    },
    tooltip: {
      formatter: ""
    },
    series: [{
      type: "pie",
      radius: ["20%", "60%"],
      center: ["50%", "50%"],
      data: [],
      roseType: "angle",
      itemStyle: {
        normal: {
          color: ""
        },
        label: {
          color: "rgba(0, 0, 1)"
        },
        labelLine: {
          lineStyle: {
            color: "rgba(0, 0, 0, 1)"
          },
          smooth: .2,
          length: 10,
          length2: 20
        }
      }
    }, {
      radius: ["20%", "25%"],
      center: ["50%", "50%"],
      type: "pie",
      data: [{
        itemStyle: {
          normal: {
            color: "#2b3942"
          }
        }
      }],
      animation: !1
    }]
  },
  areaList = [],
  yanglei = "https://admin.iguolao.com/public/uploads/20200317164411329.png",
  icon_idCard = "https://admin.iguolao.com/public/uploads/20200401101351443.jpg",
  imageYz = "https://admin.iguolao.com/public/uploads/20200414173234584.jpg",
  signature = "https://admin.iguolao.com/public/uploads/20200426143602310.png";
module.exports = {
  icon: imgUrls,
  applyType: applyType,
  contrast: contrast,
  areaList: areaList,
  navigationArry: navigationArry,
  name: name,
  contents: contents,
  imageYz: imageYz,
  indexArry: indexArry,
  voiceArry: voiceArry,
  yanglei: yanglei,
  icon_idCard: icon_idCard,
  Question: Question,
  option: option,
  pie: pie,
  signature:signature,
  otherOption:otherOption,
};