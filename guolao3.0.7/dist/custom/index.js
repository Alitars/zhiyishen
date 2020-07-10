const app = getApp();
Component({
  properties: {
    tabbar: {
      type: Object,
      value: {
        "color": "#3333333",
        "selectedColor": "#f96006",
        "backgroundColor": "#fff",
        "list": [{
            "pagePath": "/pages/index/index",
            "iconPath": "/images/home2.png",
            "selectedIconPath": "/images/home.png",
            "text": "首页"
          },
          {
            "pagePath": "/pages/services/services",
            "iconPath": "/images/red-product.png",
            "selectedIconPath": "/images/f33.png",
            "text": "服务分类"
          },
          {
            "pagePath": "/pages/knowledge/knowledge",
            "iconPath": "/images/red-shoppingcart.png",
            "selectedIconPath": "/images/red-shoppingcart2.png",
            "text": "知产管理"
          },
          {
            "pagePath": "/pages/shops/shops",
            "iconPath": "/images/gouwu1.png",
            "selectedIconPath": "/images/gouwu2.png",
            "text": "购物车"
          },
          {
            "pagePath": "/pages/user/user",
            "iconPath": "/images/red-mine.png",
            "selectedIconPath": "/images/red-mine2.png",
            "text": "我的"
          }
        ]
      }
    }
  },
  data: {
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight,
  },

  methods: {

  }
})