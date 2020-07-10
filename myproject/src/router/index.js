import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router= new Router({
    mode:'history',
    routes: [
        //首页
        {
            path: '/',
            name: 'home',
            component: () =>import('@/components/home/index.vue')
        },
        {
            path: '/govermentList',
            name: 'govermentList',
            component: () =>import('@/components/home/govermentList.vue')
        },
        {
          path: '/govermentDetail',
          name: 'govermentDetail',
          component: () =>import('@/components/home/govermentDetail.vue')
      },
        //商标服务
        {
            path:'/trade',
            component:()=> import('@/components/trade/tradeIndex.vue'),
            children:[{
                path:'/trade',
                component:()=> import('@/components/trade/trade.vue')
            },{
                path:'/tradeDetail',
                component:()=> import('@/components/trade/tradeDetail.vue')
            }
        ]
        },
        // 商标评估报告
        {
          path:'/tradereport',
          component:()=> import('@/components/tradereport/tradereport.vue'),
          meta: {
            needLogin: true // 需要登录
          }
        },
        // 商标分类
        {
          path:'/listtype',
          component:()=> import('@/components/listtype/listtype.vue')
        },
        {
          path:'/listtypedetail',
          component:()=> import('@/components/listtype/listtypedetail.vue')
        },
        {
          path:'/listtypesearch',
          component:()=> import('@/components/listtype/listtypesearch.vue')
        },
        // 代理人活动
        {
          path:'/agencyactive',
          component:()=> import('@/components/agencyactive/agencyactive.vue')
        },
        // app下载
        {
            path:'/load',
            component:()=> import('@/components/common/load.vue')
        },
        // 版权服务
        {
            path:'/copyright',
            component:()=> import('@/components/copyright/copyright.vue')
        },
        //专利服务
        // {
        //     path:'/patent',
        //     component:()=> import('@/components/patent/patent.vue')
        // },
        {
      path: '/patent',
      component: () => import('@/components/patent/patent.vue')
    },
    {
      path: '/patentDetail',
      name: 'patentDetail',
      component: () => import('@/components/patent/patentDetail.vue')
    },
    {
            path:'/like',
            component:()=> import('@/components/common/like.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/checkOrder',
            component:()=> import('@/components/common/checkOrder.vue'),
            meta: {
                needLogin: true // 需要登录
              }
    },
    {
      path: '/checkPatent',
      component: () => import('@/components/common/checkPatent.vue')
    },
    // 版权支付
    {
      path: '/checkCopyright',
      component: () => import('@/components/common/checkCopyright.vue')
    },
        {
            path:'/search',
            name:'search',
            component:()=> import('@/components/common/search.vue')
        },
        {
            path:'/searchdetail',
            name:'searchdetail',
            component:()=> import('@/components/common/searchdetail.vue')
        },
        {
            path:'/searchimg',
            name:'searchimg',
            component:()=> import('@/components/common/searchimg.vue')
        },
        {
            path:'/pay',
            component:()=> import('@/components/common/pay.vue')
        },
        {
            path:'/pickguild',
            component:()=> import('@/components/common/pickguild.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/pickgood',
            component:()=> import('@/components/common/pickgood.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/pickname',
            component:()=> import('@/components/common/pickname.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/pickmore',
            component:()=> import('@/components/common/pickmore.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/picktype',
            component:()=> import('@/components/common/picktype.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
          path:'/agencyimg',
          component:()=> import('@/components/common/agencyimg.vue')
      },
        // 商标取名
        {
            path:'/picksize',
            component:()=> import('@/components/getname/picksize.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/pickword',
            component:()=> import('@/components/getname/pickword.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
          path:'/recome',
          component:()=> import('@/components/common/recome.vue'),
          meta: {
              needLogin: true // 需要登录
            }
      },
        {
            path:'/namemore',
            component:()=> import('@/components/getname/namemore.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/nameguild',
            component:()=> import('@/components/getname/nameguild.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/namegood',
            component:()=> import('@/components/getname/namegood.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/creatname',
            component:()=> import('@/components/getname/creatname.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        // 商标设计
        {
            path:'/designstyle',
            component:()=> import('@/components/design/designstyle.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
          path:'/logoEdit',
          component:()=> import('@/components/design/logoEdit.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/designmore',
            component:()=> import('@/components/design/designmore.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/designbrand',
            component:()=> import('@/components/design/designbrand.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/designelement',
            component:()=> import('@/components/design/designelement.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/designguild',
            component:()=> import('@/components/design/designguild.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/designgood',
            component:()=> import('@/components/design/designgood.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
            path:'/designcreat',
            component:()=> import('@/components/design/designcreat.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        //制定培训
        {
            path:'/custom',
            component:()=>
                import('@/components/custom/custom.vue'),
        },
        //关于我们
        {
          path:'/about',
          component:()=>
              import('@/components/about/about.vue'),
        },
        {
            path:'/link',
            component:()=>
                import('@/components/about/link.vue'),
          },
        //新闻中心
        {
          path:'/news',
          component:()=>
              import('@/components/news/index.vue'),
              children:[{
                path:'/news',
                component:()=>
                    import('@/components/news/news.vue'),
              },{
                path:'/news/newsdetail',
                component:()=>
                    import('@/components/news/newsdetail.vue')
            }]
        },
        //登陆页面
        {
            path:'/login',
            name:'login',
            component:()=>
                import('@/components/login.vue')
        },
        {
            path:'/bindphone',
            name:'bindphone',
            component:()=>
                import('@/components/bindphone.vue')
        },
        //注册页面
        {
            path: '/register',
            component: () =>
                import('@/components/register.vue')
        },
        // 注册协议
        {
            path: '/protocol',
            name:'protocol',
            component: () =>
                import('@/components/protocol.vue')
        },
        // 安全保障
        {
            path: '/keepsafe',
            name:'keepsafe',
            component: () =>
                import('@/components/keepsafe.vue')
        },
         // 隐私条例
         {
            path: '/policy',
            name:'policy',
            component: () =>
                import('@/components/policy.vue')
        },
        // 开通会员
        {
            path:'/memberCenter',
            component:()=> import('@/components/personal/member/memberCenter.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        // 会员支付
        {
            path:'/memberpay',
            component:()=> import('@/components/personal/member/memberpay.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        // 商标监控详情
        {
          path:'/tradecontrolDetail',
            component:()=> import('@/components/control/tradecontrolDetail.vue'),
            meta: {
                needLogin: true // 需要登录
              }
        },
        {
          path:'/companycontrolDetail',
          component:()=> import('@/components/control/companycontrolDetail.vue'),
          meta: {
              needLogin: true // 需要登录
            }
      },
        // 个人中心
        {
            path: '/personal',
            redirect:'/personal/personalInformation',
            meta: {
                needLogin: true // 需要登录
              },
            component: () => import('@/components/personal/personal/personal.vue'),
                children:[
                    {
                        path:'/personal/personalInformation',
                        component:()=>
                            import('@/components/personal/personalInformation/personalInformation.vue'),
                            meta: {
                                needLogin: true // 需要登录
                              }
                    },
                    {
                      path:'/personal/personalData',
                      component:()=>
                        import('@/components/personal/personalInformation/personalData.vue'),
                        meta: {
                          needLogin: true // 需要登录
                        }

                    },
                    {
                      path:'/personal/agency',
                      component:()=>
                        import('@/components/personal/personalInformation/agency.vue'),
                        meta: {
                            needLogin: true // 需要登录
                          }
                    },
                    {
                        path:'/personal/safeCenter',
                        component:()=>
                            import('@/components/personal/safeCenter/safeCenter.vue'),
                            meta: {
                                needLogin: true // 需要登录
                              }
                    },
                    {
                        path:'/personal/personalComfire',
                        component:()=>
                            import('@/components/personal/personalComfire/personalComfireIndex.vue'),
                            children:[
                                {
                                    path:'/personal/personalComfire',
                                    name:'/personal/personalComfire/personalComfire',
                                    component:()=>
                                        import('@/components/personal/personalComfire/personalComfire.vue'),
                                        meta: {
                                            needLogin: true // 需要登录
                                          }
                                },{
                                    path:'/personal/personalForm',
                                    name:'/personal/personalForm',
                                    component:()=>
                                        import('@/components/personal/personalComfire/personalForm.vue'),
                                        meta: {
                                            needLogin: true // 需要登录
                                          }
                                },
                                {
                                  path:'/personal/shippingAddress',
                                  component: () =>
                                    import('@/components/personal/shippingAddress/shippingAddress.vue')
                                },
                                // 专利分析
                                {
                                  path:'/personal/analysisList',
                                  component: () =>
                                    import('@/components/personal/analysisList/analysisList.vue'),
                                    meta: {
                                      needLogin: true // 需要登录
                                    }
                                },
                                // 商标评估报告
                                {
                                  path:'/personal/tradereportList',
                                  component: () =>
                                    import('@/components/personal/analysisList/tradereportList.vue'),
                                    meta: {
                                      needLogin: true // 需要登录
                                    }
                                }
                            ]
                    }
                    ,{
                        path:'/personal/companyComfire',
                        component:()=>
                            import('@/components/personal/companyComfire/companyComfireIndex.vue'),
                            children:[
                                {
                                    path:'/personal/companyComfire',
                                    name:'/personal/companyComfire',
                                    component:()=>
                                        import('@/components/personal/companyComfire/companyComfire.vue'),
                                        meta: {
                                            needLogin: true // 需要登录
                                          }
                                },{
                                    path:'/personal/companyForm',
                                    name:'/personal/companyForm',
                                    component:()=>
                                        import('@/components/personal/companyComfire/companyForm.vue'),
                                        meta: {
                                            needLogin: true // 需要登录
                                          }
                                }
                            ]
                    },
                    {
                        path:'/personal/order',
                        component:()=>
                            import('@/components/personal/order/orderIndex.vue'),
                            children:[{
                                path:'/personal/order',
                                component:()=>
                                        import('@/components/personal/order/order.vue'),
                                        meta: {
                                            needLogin: true // 需要登录
                                          }
                            },{
                                path:'/personal/orderDetail',
                                component:()=>
                                        import('@/components/personal/order/orderDetail.vue'),
                                        meta: {
                                            needLogin: true // 需要登录
                                          }
            },
            {
              path: '/personal/patentDetailed',
              name: 'patentDetailed',
              component: () => import('@/components/personal/order/patentDetailed.vue')
            },
            // 版权订单详情

            {
              path: '/personal/copyrightDetailed',
              name: 'copyrightDetailed',
              component: () => import('@/components/personal/order/copyrightDetailed.vue')
            },
          ]
        },
        {
          path: '/personal/orderPatent',
          component: () =>  import('@/components/personal/order/orderPatent.vue'),
        },
        // 版权订单
        {
          path: '/personal/orderCopyright',
          component: () =>  import('@/components/personal/order/orderCopyright.vue'),
        },
        {
                        path:'/personal/coupon',
                        component:()=>
                            import('@/components/personal/coupon/coupon.vue'),
                            meta: {
                                needLogin: true // 需要登录
                              }
                    },{
                        path:'/personal/buyCart',
                        meta: {
                            needLogin: true // 需要登录
                          },
                        component:()=>
                            import('@/components/personal/buyCart/buyCart.vue')
                    },
        {
          path: '/personal/buyPatent',
          meta: {
            needLogin: true // 需要登录
          },
          component: () =>
          import('@/components/personal/buyCart/buyPatent.vue')
        },
        // 版权购物车
        {
          path: '/personal/buyCopyright',
          meta: {
            needLogin: true // 需要登录
          },
          component: () =>
          import('@/components/personal/buyCart/buyCopyright.vue')
        },
                    // 开票申请
                    {
                        path:'/personal/applyInvoice',
                        component:()=>
                            import('@/components/personal/applyInvoice/applyInvoice.vue'),
                            meta: {
                                needLogin: true // 需要登录
                              }
                    },
                    // 开票记录
                    {
                        path:'/personal/recordList',
                        component:()=>
                            import('@/components/personal/invoiceRecord/recordIndex.vue'),
                            children:[{
                                path:'/personal/recordList',
                                component:()=>
                                        import('@/components/personal/invoiceRecord/recordList.vue'),
                                        meta: {
                                            needLogin: true // 需要登录
                                          }
                            },{
                                path:'/personal/recordDetail',
                                component:()=>
                                        import('@/components/personal/invoiceRecord/recordDetail.vue'),
                                        meta: {
                                            needLogin: true // 需要登录
                                          }
                            }]
                    },
                    // 开票管理
                    {
                        path:'/personal/manageList',
                        component:()=>
                            import('@/components/personal/invoiceManage/manageIndex.vue'),
                            children:[{
                                path:'/personal/manageList',
                                component:()=>
                                        import('@/components/personal/invoiceManage/manageList.vue'),
                                        meta: {
                                            needLogin: true // 需要登录
                                          }
                            },{
                                path:'/personal/manageForm',
                                component:()=>
                                        import('@/components/personal/invoiceManage/manageForm.vue'),
                                        meta: {
                                            needLogin: true // 需要登录
                                          }
                            }]
                    },
                    // 知产管理
                    {
                        path:'/personal/assetsManagement',
                        component:()=>
                            import('@/components/personal/property/assetsManagement.vue'),
                            meta: {
                                needLogin: true // 需要登录
                              },
                    },
                    // 商标监控
                    {
                      path:'/personal/tradeWatch',
                      component:()=>
                          import('@/components/personal/tradeWatch/tradeWatch.vue'),
                          meta: {
                              needLogin: true // 需要登录
                            },
                  },
                    // 总商标个数
                    {
                      path:'/personal/totalTrademarks',
                      component:()=>
                          import('@/components/personal/property/totalTrademarks.vue'),
                          meta: {
                              needLogin: true // 需要登录
                            },
                    },
                    // 公司商标管理
                    {
                        path:'/personal/tradeProperty',
                        component:()=>
                            import('@/components/personal/property/tradeProperty.vue'),
                            meta: {
                                needLogin: true // 需要登录
                              }
                    },
                    // 商标管理
                    {
                        path:'/personal/totalTrademark',
                        component:()=>
                            import('@/components/personal/property/totalTrademark.vue'),
                            meta: {
                                needLogin: true // 需要登录
                              }
                    },
                    // 商标列表
                    {
                        path:'/personal/extension',
                        component:()=>
                            import('@/components/personal/property/extension.vue'),
                            meta: {
                                needLogin: true // 需要登录
                              },
                    },
                    // 全部公司全部商标列表
                    {
                        path:'/personal/companiesAll',
                        component:()=>
                            import('@/components/personal/property/companiesAll.vue'),
                            meta: {
                                needLogin: true // 需要登录
                              },
                    },
                    // 专利管理
                    {
                      path:'/personal/patentTube',
                      component:()=>import('@/components/personal/property/patentTube.vue'),
                      meta: { needLogin: true },
                    },
                    {
                      path:'/personal/patentAll',
                      component:()=>import('@/components/personal/property/patentAll.vue'),
                      meta: { needLogin: true },
                    },
                    {
                      path:'/personal/patentSingle',
                      component:()=>import('@/components/personal/property/patentSingle.vue'),
                      meta: { needLogin: true },
                    },

                    // 知产交易
                      // 我的求购商标
                    {
                      path:'/personal/buyingMarks',
                      component:()=>import('@/components/personal/bargain/buyingMarks.vue'),
                      meta: { needLogin: true },
                    },
                    // 我的求购需求
                    {
                      path:'/personal/buyingDemand',
                      component:()=>import('@/components/personal/bargain/buyingDemand.vue'),
                        meta: { needLogin: true },
                    },
                    // 我的发布
                    {
                      path:'/personal/myPublish',
                      component:()=>import('@/components/personal/bargain/myPublish.vue'),
                      meta: { needLogin: true },
                    },
                  // 我的收藏
                  {
                    path:'/personal/myFavorite',
                    component:()=>import('@/components/personal/bargain/myFavorite.vue'),
                    meta: { needLogin: true },
                  },
                    // 消息
                    {
                        path:'/personal/message',
                        component:()=>import('@/components/personal/message/messageIndex.vue'),
                            children:[{
                                path:'/personal/message',
                                name:'message',
                                component:()=>import('@/components/personal/message/message.vue'),
                                meta: {
                                    needLogin: true // 需要登录
                                  }
                            },{
                                path:'/personal/messageDetail',
                                name:'messageDetail',
                                component:()=>import('@/components/personal/message/messageDetail.vue'),
                                meta: {
                                    needLogin: true // 需要登录
                                  }
                            }]
        },
        {
          path:'/issue/issueList',
          name:'issueList',
          component: () =>
            import('@/components/issue/issueList.vue')
        },
        {
          path:'/issue/issueDetails',
          name:'issueDetails',
          component: () =>
            import('@/components/issue/issueDetails.vue')
        },
                ]
        },


        // 提交资料
        // 商标注册提交资料
        {
            path:'/registerData',
            component:()=>
                import('@/components/submitData/registerData.vue')
        },
        // 商标异议提交资料
        {
            path:'/objectData',
            component:()=>
                import('@/components/submitData/objectData.vue')
        },
        // 商标撤三答辩提交资料
        {
            path:'/threeAnswer',
            component:()=>
                import('@/components/submitData/threeAnswer.vue')
        },
        // 商标变更提交资料
        {
            path:'/changeData',
            component:()=>
                import('@/components/submitData/changeData.vue')
        },
        // 商标转让提交资料
        {
            path:'/transferData',
            component:()=>
                import('@/components/submitData/transferData.vue')
        },
        // 商标撤三申请提交资料
        {
            path:'/threeApply',
            component:()=>
                import('@/components/submitData/threeApply.vue')
        },
        // 商标续展提交资料
        {
            path:'/extension',
            component:()=>
                import('@/components/submitData/extension.vue')
        },
        // 补发商标注册证提交资料
        {
            path:'/resendData',
            component:()=>
                import('@/components/submitData/resendData.vue')
        },
        // 商标许可备案提交资料
        {
            path:'/filingData',
            component:()=>
                import('@/components/submitData/filingData.vue')
        },
        // 商标异议答辩提交资料
        {
            path:'/defence',
            component:()=>
                import('@/components/submitData/defence.vue')
        },
        // 商标驳回复审提交资料
        {
            path:'/recheck',
            component:()=>
                import('@/components/submitData/recheck.vue')
        },

        // 上传盖章资料
        // 商标续展上传资料
        {
            path:'/renewal',
            component:()=>
                import('@/components/uploadData/renewal.vue')
        },
        {
            path:'/threeApplyUpload',
            component:()=>
                import('@/components/uploadData/threeApplyUpload.vue')
        },
        // 商标注册上传资料
        {
            path:'/registerUpload',
            component:()=>
                import('@/components/uploadData/registerUpload.vue')
        },
        // 商标变更上传资料
        {
            path:'/change',
            component:()=>
                import('@/components/uploadData/change.vue')
        },
        // 商标许可备案上传资料
        {
            path:'/filing',
            component:()=>
                import('@/components/uploadData/filing.vue')
        },
        // 补发商标注册证上传资料
        {
            path:'/resend',
            component:()=>
                import('@/components/uploadData/resend.vue')
        },
        //  商标转让上传资料
        {
            path:'/transfer',
            component:()=>
                import('@/components/uploadData/transfer.vue')
        },


        // 邮寄资料
        // 支付尾款
        {
            path:'/finalpay',
            component:()=>
                import('@/components/post/finalpay.vue')
        },
        // 商标驳回复审邮寄
        {
            path:'/recheckPost',
            component:()=>
                import('@/components/post/recheckPost.vue')
        },
        // 商标撤三答辩邮寄
        {
            path:'/threeAnswerPost',
            component:()=>
                import('@/components/post/threeAnswerPost.vue')
        },
        // 商标异议答辩邮寄
        {
            path:'/objectAnswerPost',
            component:()=>
                import('@/components/post/objectAnswerPost.vue')
        },
        // 商标撤三申请邮寄
        // {
        //     path:'/threeApplyPost',
        //     component:()=>
        //         import('@/components/post/threeApplyPost.vue')
        // },
        // 商标异议邮寄
        {
            path:'/objectPost',
            component:()=>
                import('@/components/post/objectPost.vue')
        },

        // 查看正文页面
        {
            path:'/brand',
            component:()=>
                import('@/components/post/brand.vue')
        },


    {
      path: '/patentInvention',
      component: () =>
        import('@/components/patentUpload/patentInvention.vue')
    },
    {
      path: '/patentNew',
      component: () =>
        import('@/components/patentUpload/patentNew.vue')
    },
     {
      path:'/patentAppearance',
      component: () =>
        import('@/components/patentUpload/patentAppearance.vue')
    },
    {
      path:'/patentAlteration',
      component: () =>
        import('@/components/patentUpload/patentAlteration.vue')
    },
    {
      path:'/patentTransfer',
      component: () =>
        import('@/components/patentUpload/patentTransfer.vue')
    },
    {
      path:'/patentquicken',
      component: () =>
        import('@/components/patentUpload/patentquicken.vue')
    },
    {
      path:'/patentApplication',
      component: () =>
        import('@/components/patentNotarize/patentApplication.vue')
    },
    {
      path:'/patentExplain',
      component: () =>
        import('@/components/patentNotarize/patentExplain.vue')
    },
    {
      path:'/patentQuickenExplain',
      component: () =>
        import('@/components/patentNotarize/patentQuickenExplain.vue')
    },
    {
      path:'/patentNewExplain',
      component: () =>
        import('@/components/patentNotarize/patentNewExplain.vue')
    },
    {
      path:'/patentFacadeExplain',
      component: () =>
        import('@/components/patentNotarize/patentFacadeExplain.vue')
    },
    {
      path:'/patentPayment',
      component: () =>
        import('@/components/patentPay/patentPayment.vue')
    },
    {
      path:'/patentNewpay',
      component: () =>
        import('@/components/patentPay/patentNewpay.vue')
    },
    {
      path:'/patentFacadepay',
      component: () =>
        import('@/components/patentPay/patentFacadepay.vue')
    },
    {
      path:'/patentAuthorizationPay',
      component: () =>
        import('@/components/patentPay/patentAuthorizationPay.vue')
    },
    {
      path:'/patentNewAuthorizationPay',
      component: () =>
        import('@/components/patentPay/patentNewAuthorizationPay.vue')
    },
    {
      path:'/patentFacadeAuthorizationPay',
      component: () =>
        import('@/components/patentPay/patentFacadeAuthorizationPay.vue')
    },
    {
      path:'/patentTransferPay',
      component: () =>
        import('@/components/patentPay/patentTransferPay.vue')
    },
    {
      path:'/patentAlterationPay',
      component: () =>
        import('@/components/patentPay/patentAlterationPay.vue')
    },
    // 技术交底书问答
    {
      path:'/oneQuestion',
      component: () =>
        import('@/components/issue/oneQuestion.vue')
    },
    // 技术交底书修改
    {
      path:'/editQuestion',
      component: () =>
        import('@/components/issue/editQuestion.vue')
    },
    // 专利分析
    {
      path:'/patentAnalyse',
      component: () =>
        import('@/components/patentAnalyse/patentAnalyse.vue')
    },
    // 外观检测报告
    {
      path:'/patentReports',
      component: () =>
        import('@/components/patentAnalyse/patentReports.vue')
    },
    // 外观检测报告
    {
      path:'/appearanceAnalysis',
      component: () =>
        import('@/components/patentAnalyse/appearanceAnalysis.vue')
    },
    //  外观检测详细报告
    {
      path:'/appAnalysisDetailed',
      component: () =>
        import('@/components/patentAnalyse/appAnalysisDetailed.vue')
    },
    // 付款
    {
      path:'/twoQuestion',
      component: () =>
        import('@/components/issue/twoQuestion.vue')
    },
    // 版权服务
      // 版权列表详情
      {
        path:'/copyrightDetail',
        component: () =>
          import('@/components/copyright/copyrightDetail.vue')
      },
      // 工商核名
      {
        path:'/verification',
        component:()=>
            import('@/components/verification/verification.vue')
      },
      // 工商核名规则
      {
        path:'/verificationProtocol',
        component:()=>
            import('@/components/verification/verificationProtocol.vue')
      },
      // 商标交易
      {
        path:'/brandBuy',
        component:()=>
            import('@/components/brandBuy/brandBuy.vue')
      },
      // 发布商标
      {
        path:'/publish',
        component:()=>
            import('@/components/brandBuy/publish.vue')
      },
      // 商标详情
      {
        path:'/brandDetail',
        component:()=>
            import('@/components/brandBuy/brandDetail.vue')
      },
      // 国际商标注册
      {
        path:'/worldBrand',
        component:()=>
            import('@/components/worldBrand/worldBrand.vue')
      },
      // 国际商标注册提交说明
      {
        path:'/Instructions',
        component:()=>
            import('@/components/worldBrand/Instructions.vue')
      },
        //找回密码界面
        {
            path:'/forgetPassword',
            component:()=>
                import('@/components/forgetPassword.vue')
        },
        //404页面
        {
            path:'*',
            name:'notfound',
            component:()=>
                import('@/components/notFound.vue')
        }
    ]
});

export default router;
