import Toast from '../../../../../dist/toast/toast';
import WxCanvas from '../../../../../dist/ec-canvas/wx-canvas';
import * as echarts from '../../../../../dist/ec-canvas/echarts';
import Notify from '../../../../../dist/notify/notify';
import NetworkRequest from '../../../../../template/network.js';
import http from '../../../../../template/networktest.js';
import setTime from '../../../../../template/setTime';
import func from '../../../../../template/func.js';
import vioceText from '../../../../../template/vioceText.js';
import animation from '../../../../../template/animation.js';
import canonical from '../../../../../template/canonical';
import recoderTS from '../../../../../template/recorder.js';
import selectQuery from '../../../../../template/selectQuery.js';
import setEcharts from '../../../../../template/setEcharts'
import remove from '../../../../../template/remove.js'
var barec1 = null
var barec2 = null
var barec3 = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    ecBar: {
        onInit: {},
    },
    ecBarShow:false,
    ec1: {
        onInit: {},
    },
    ec1Show:false,
    ec2: {
        onInit: {},
    },
    ec2Show:false,
  },
  getData(){
    wx.showLoading({
        title: '数据加载中',
    })
    NetworkRequest({
        url:'/patent/postMethod' ,
        data:{
         description:wx.getStorageSync('description'),
         ic: wx.getStorageSync('ic'),
         key_words: wx.getStorageSync('keywords'),
         patent_name: wx.getStorageSync('Patent_name'),
         patent_type: wx.getStorageSync('type'),
         product: wx.getStorageSync('product'),
         test: 0,
         upload_img_path: "",
         type1:wx.getStorageSync('type1'),
         type2:wx.getStorageSync('type2'),
         return_url:'http://47.99.214.190:8000/commit_search_patent_img'
        },
        method:'POST'
     }).then((res)=>{
        wx.hideLoading({
        })
        var json = JSON.parse(res.data.data)
        NetworkRequest({
            url:'/patent/analyAdd',
            data:{
                area:wx.getStorageSync('ic'),
                content:wx.getStorageSync('description'),//设计说明
                form:'',
                imgs:this.data.url,
                // industry:'',//行业
                key_word:wx.getStorageSync('keywords'),
                name:wx.getStorageSync('Patent_name'),//发明创造的名字
                no:json.id,//人工智能的id
                plan:wx.getStorageSync('plan'),//外观设计方案
                product:wx.getStorageSync('Patent_name'),
                type:wx.getStorageSync('type'),
            },
            method:'POST'
        }).then((e)=>{
        })
         // pie图片
        if(json.code == 200){
            var pieList=json.keywords_freq;
            var patentsList=json.related_company;
            var reactList=json.related_similar;
            var titleList = json.patents.patent_title
            var per = json.patents.similar
            var patent_title= []
            for (var i = 0;i<titleList.length&&i<per.length;i++){
                var perNum = per[i]
                // var str= Math.floor(perNum*100)/100 *100
                var str = Math.floor(perNum*100)
                str = str +'%'
                patent_title.push({name:titleList[i],per:str})
            }
            this.setData({
                comment1:json.comment1,
                comment2:json.comment2,
                comment3:json.comment3,
                patent_title:patent_title
            })
            wx.setStorageSync('reportList', json.patents.claim)
            var arr = []
            var brr = []
            var crr = []
            var drr = []
            for (var i in pieList){
                var obj = {}
                obj.name = i
                obj.value = pieList[i]
                arr.push(obj)
            }
            for (var i in patentsList){
               var obj = {}
               obj.name = i
               obj.value = patentsList[i]
               brr.push(obj)
           }
           for(var i in reactList){
               crr.push(i)
               drr.push(reactList[i])
           }
           // 图表3
            var option ={
                color:['#8fc31f','#f35833','#00ccff','#ffcc00','#337ab7'],
                tooltip: {
                    trigger: 'item'
                },
                series : [
                    {
                        type: 'pie',
                        radius : '50%',
                        center: ['48%', '50%'],
                        data:arr,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            
                        },
                        itemStyle: {
                            normal: {
                                label:{ 
                                    show: true, 
                                    formatter: '{b}:{d}%' 
                                }
                            },
                            labelLine :{
                                show:true,
                            }
                        }
                    }
                ]
            }
           //  图表2
            var option1 ={
               tooltip: {
                   trigger: 'item',
                   position: ['20%', '50%'],
                   formatter: "注册公司分布 \n {b} : {c} ({d}%)",
               },
               legend: {
                   type: 'scroll',
                   orient: 'vertical',
                   left: '10%',
                   bottom: '10%',
                   itemGap: 8,
                   selectedMode: false,
                   icon: 'pin',
                   textStyle: {
                       color: '#77899c',
                       rich: {
                           uname: {
                               width: 100
                           },
                           unum: {
                               color: '#4ed139',
                               padding:[0,6,0,6]
                           },
                           onum:{
                             color: '#000',
                             padding:[0,6,0,6]
                           }
                       }
                   },
                   formatter(name) {
                      return `{uname|${name}}`
                   }
               },
               color: ['rgb(73, 169, 238)','rgb(213, 116, 108)','rgb(223, 189, 96)','rgb(133, 189, 109)','rgba(120, 131, 201, 1)'],
               series: [
                   {
                       // name: '姓名',
                       type: 'pie',
                       radius: [40, 60],
                       center: ['50%', '25%'],
                       label: {
                           show: false
                       },
                       labelLine: {
                           show: false
                       },
                       itemStyle: {
                           borderWidth: 2,
                           borderColor: '#fff'
                       },
                       data: brr,
                   }
               ]
            }
            var optionbar = {
               backgroundColor: '#fff',
               grid: {
                   top: '20',
                   right: '30',
                   left: '50',
                   bottom: '30'
               },
               xAxis: [{
                   type: 'category',
                   color: '#59588D',
                   data: crr,
                   axisLabel: {
                       margin: 20,
                       color: '#999',
                       textStyle: {
                           fontSize: 12
                       },
                   },
                   axisLine: {
                       lineStyle: {
                           color: 'rgba(107,107,107,0.37)',
                       }
                   },
                   axisTick: {
                       show: false
                   },
               }],
               yAxis: [{
                   min: 0,
                   max: 60,
                   axisLabel: {
                       formatter: '{value}',
                       color: '#999',
                       textStyle: {
                           fontSize: 12
                       },
                   },
                   axisLine: {
                       lineStyle: {
                           color: 'rgba(107,107,107,0.37)',
                       }
                   },
                   axisTick: {
                       show: false
                   },
                   splitLine: {
                       lineStyle: {
                           color: 'rgba(131,101,101,0.2)',
                           type: 'dashed',
                       }
                   }
               }],
               series: [{
                   type: 'bar',
                   data: drr,
                   barWidth: '15px',
                   itemStyle: {
                       normal: {
                         color: function (params){
                           var colorList = ['rgb(73, 169, 238)','rgb(213, 116, 108)','rgb(223, 189, 96)','rgb(133, 189, 109)','rgba(120, 131, 201, 1)'];
                           return colorList[params.dataIndex];
                       }
                       }
                   },
                   label: {
                       normal: {
                           show: true,
                           fontSize: 12,
                           fontWeight: 'bold',
                           color: '#333',
                           position: 'top',
                       }
                   }
               }]
            }
            setEcharts({
                option: optionbar,
                setStr: 'ecBar'
            })
            setEcharts({
                option: option1,
                setStr: 'ec1'
            })
            setEcharts({
                option: option,
                setStr: 'ec2'
            })
        }else{
            wx.showModal({
                title:'没有相似的发明专利',
                confirmColor: '#66b1ff',
                showCancel: false,
                success:(res)=>{
                    if (res.confirm) {
                        wx.navigateBack({})
                    }
                }
            })
        }
     })
  },
  getIdData(){
    wx.showLoading({
        title: '数据加载中',
    })
    NetworkRequest({
        url:'/patent/getMethod',
        data:{
            id:this.data.pyId,
            return_url:'http://47.99.214.190:8000/get_search_patent_img'
        },
        method:'GET'
    }).then((res)=>{
        var jsonArr= JSON.parse(res.data.data)
        wx.hideLoading({})
        if(jsonArr.result.code == 200){
            var pieList=jsonArr.result.keywords_freq;
            var patentsList=jsonArr.result.related_company;
            var reactList=jsonArr.result.related_similar;
            var titleList = jsonArr.result.patents.patent_title
            var per = jsonArr.result.patents.similar
            var patent_title= []
            for (var i = 0;i<titleList.length&&i<per.length;i++){
                var perNum = per[i]
                var str = Math.floor(perNum*100)
                str = str +'%'
                patent_title.push({name:titleList[i],per:str})
            }
            this.setData({
                comment:jsonArr.result.comment,
                patent_title:patent_title
            })
            wx.setStorageSync('reportList', jsonArr.result.patents.claim)
            var arr = []
            var brr = []
            var crr = []
            var drr = []
            for (var i in pieList){
                var obj = {}
                obj.name = i
                obj.value = pieList[i]
                arr.push(obj)
            }
            for (var i in patentsList){
                var obj = {}
                obj.name = i
                obj.value = patentsList[i]
                brr.push(obj)
            }
            for(var i in reactList){
                crr.push(i)
                drr.push(reactList[i])
            }
            // 图表3
            var option ={
                color:['#8fc31f','#f35833','#00ccff','#ffcc00','#337ab7'],
                tooltip: {
                    trigger: 'item'
                },
                series : [
                    {
                        type: 'pie',
                        radius : '55%',
                        center: ['48%', '50%'],
                        data:arr,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        itemStyle: {
                            normal: {
                                label:{ 
                                    show: true, 
                                    formatter: '{b}:{d}%' 
                                }
                            },
                            labelLine :{
                                show:true,
                            }
                        }
                    }
                ]
            }
           //  图表2
            var option1 ={
               tooltip: {
                   trigger: 'item',
                   position: ['20%', '50%'],
                   formatter: "注册公司分布 \n {b} : {c} ({d}%)",
               },
               legend: {
                   type: 'scroll',
                   orient: 'vertical',
                   left: '10%',
                   bottom: '10%',
                   itemGap: 8,
                   selectedMode: false,
                   icon: 'pin',
                   textStyle: {
                       color: '#77899c',
                       rich: {
                           uname: {
                               width: 100
                           },
                           unum: {
                               color: '#4ed139',
                               padding:[0,6,0,6]
                           },
                           onum:{
                             color: '#000',
                             padding:[0,6,0,6]
                           }
                       }
                   },
                   formatter(name) {
                      return `{uname|${name}}`
                   }
               },
               color: ['rgb(73, 169, 238)','rgb(213, 116, 108)','rgb(223, 189, 96)','rgb(133, 189, 109)','rgba(120, 131, 201, 1)'],
               series: [
                   {
                       // name: '姓名',
                       type: 'pie',
                       radius: [40, 60],
                       center: ['50%', '25%'],
                       label: {
                           show: false
                       },
                       labelLine: {
                           show: false
                       },
                       itemStyle: {
                           borderWidth: 2,
                           borderColor: '#fff'
                       },
                       data: brr,
                   }
               ]
            }
            var optionbar = {
               backgroundColor: '#fff',
               grid: {
                   top: '20',
                   right: '30',
                   left: '50',
                   bottom: '30'
               },
               xAxis: [{
                   type: 'category',
                   color: '#59588D',
                   data: crr,
                   axisLabel: {
                       margin: 20,
                       color: '#999',
                       textStyle: {
                           fontSize: 12
                       },
                   },
                   axisLine: {
                       lineStyle: {
                           color: 'rgba(107,107,107,0.37)',
                       }
                   },
                   axisTick: {
                       show: false
                   },
               }],
               yAxis: [{
                   min: 0,
                   max: 60,
                   axisLabel: {
                       formatter: '{value}',
                       color: '#999',
                       textStyle: {
                           fontSize: 12
                       },
                   },
                   axisLine: {
                       lineStyle: {
                           color: 'rgba(107,107,107,0.37)',
                       }
                   },
                   axisTick: {
                       show: false
                   },
                   splitLine: {
                       lineStyle: {
                           color: 'rgba(131,101,101,0.2)',
                           type: 'dashed',
                       }
                   }
               }],
               series: [{
                   type: 'bar',
                   data: drr,
                   barWidth: '15px',
                   itemStyle: {
                       normal: {
                         color: function (params){
                           var colorList = ['rgb(73, 169, 238)','rgb(213, 116, 108)','rgb(223, 189, 96)','rgb(133, 189, 109)','rgba(120, 131, 201, 1)'];
                           return colorList[params.dataIndex];
                       }
                       }
                   },
                   label: {
                       normal: {
                           show: true,
                           fontSize: 12,
                           fontWeight: 'bold',
                           color: '#333',
                           position: 'top',
                       }
                   }
               }]
            }
            setEcharts({
                option: optionbar,
                setStr: 'ecBar'
            })
            setEcharts({
                option: option1,
                setStr: 'ec1'
            })
            setEcharts({
                option: option,
                setStr: 'ec2'
            })
        }else{
            wx.showModal({
                title:'没有相似的发明专利',
                confirmColor: '#66b1ff',
                showCancel: false,
                success:(res)=>{
                    if (res.confirm) {
                        wx.navigateBack({})
                    }
                }
            })
        }
    })
  },
  toDetail(e){
    wx.navigateTo({
      url: '/package/component2/pages/patent_book/reportDetail/reportDetail?id='+ e.currentTarget.dataset.id,
    })
  },
  toBuy(){
    // console.log("这里是跳转去购买")
    remove()
    wx.navigateTo({
      url: '../../../../component1/pages/services/dt/dt?id=9&title=专利申请',
    })
  },
  toCompose(){
      wx.showToast({
        title: '暂未开放',
        icon:'none'
      })
      remove()
    //   wx.switchTab({
    //     url: '/pages/index/index',
    //   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
        this.setData({
            pyId : options.id
        })
        
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.pyId){
        this.getIdData()
    }else{
        this.getData() 
    }
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