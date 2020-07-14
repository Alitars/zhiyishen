import route from '../../../template/route.js'
Page({
  data: {
    btn: [{
      url: 'pages/user/commission_agent/account_management/account_management',
      img: '/images/zhgl.png',
      text: '帐号管理'
    }, {
        url: 'pages/user/commission_agent/order_list/order_list',
      img: '/images/dlsdd.png',
      text: '代理商订单'
    }, {
        url: 'pages/user/commission_agent/commodity_management/commodity_management',
      img: '/images/spgl.png',
      text: '商品管理'
    }],
  },
  onClick(e) {
    var url = e.currentTarget.dataset.url;
    route(url);
  },
})