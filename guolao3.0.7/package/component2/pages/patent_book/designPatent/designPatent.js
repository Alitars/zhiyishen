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
import setEcharts from '../../../../../template/setEcharts.js'
var barChart = null
// import setEcharts from '../../../../component1/pages/template/setEcharts'
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
  },
  getData(){
    wx.showLoading({
      title: '加载数据中',
    })
    http({
        url:'/get_search_patent_img',
        data:{
            id:this.data.id
        }
    }).then((res)=>{
        wx.hideLoading({})
        var result = res.data.result
        if(result.code == 200){
            var company =result.company
            var imgurl = result.url
            var title = result.title
            var arr = []
            var max = []
            max.push(result.total_max_1,result.total_max_2,result.total_max_3,result.total_max_agg,)
            var avg = []
            avg.push(result.total_avg_1,result.total_avg_2,result.total_avg_3,result.total_avg_agg,)
            var min = []
            min.push(result.total_min_1,result.total_min_2,result.total_min_3,result.total_min_agg,)
            for(var i in company){
                if(i=="总共"){
                }else{
                    var num = Math.round(company[i]/10 * 100) + "%"
                    arr.push({name:i,value:company[i],per:num})
                    
                }
            }
            var imgList = []
            for(var i = 0;i<imgurl.length&&title.length;i++){
                var img = 'http://47.99.214.190:8000/'+imgurl[i]
                imgList.push({title:title[i],imgurl:img,baseimg:imgurl[i]})
            }
            this.setData({
                company:arr,
                imgList:imgList
            })
            var option= {
                backgroundColor: '#fff',
                tooltip: { //提示框组件
                    trigger: 'axis',
                    formatter: '{b}\n{a0}: {c0}\n{a1}: {c1}\n{a2}: {c2}',
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    },
                    textStyle: {
                        color: '#fff',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑',
                        fontSize: 12,
                    }
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '10%',
                    top: '10%',
                    containLabel: true,
                },
                legend: { //图例组件，颜色和名字
                    right: '10%',
                    top: '3%',
                    itemGap: 16,
                    itemWidth: 18,
                    itemHeight: 10,
                    data: [{
                            name: '最大值',
                        },
                        {
                            name: '最小值',
                        },
                        {
                            name: '平均值',
                        }
                    ],
                    textStyle: {
                        color: '#a8aab0',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑',
                        fontSize: 12,
                    }
                },
                xAxis: [{
                    type: 'category',
                    //	boundaryGap: true,//坐标轴两边留白
                    data:['色彩相似度', '外形相似度', '细节相似度', '综合相似度'],
                    axisLabel: { //坐标轴刻度标签的相关设置。
                        //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                        //	margin:15,
                        textStyle: {
                            color: '#078ceb',
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            fontSize: 12,
                        },
                        rotate: 50,
                    },
                    axisTick: { //坐标轴刻度相关设置。
                        show: false,
                    },
                    axisLine: { //坐标轴轴线相关设置
                        lineStyle: {
                            color: '#fff',
                            opacity: 0.2
                        }
                    },
                    splitLine: { //坐标轴在 grid 区域中的分隔线。
                        show: false,
                    }
                }],
                yAxis: [{
                    min: 0,
                    max: 10,
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
                        name: '最大值',
                        type: 'bar',
                        data: max,
                        barWidth: 10,
                        barGap: 0,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: '#5768EF',
                                barBorderRadius: 50,
                                borderWidth: 0,
                            }
                        },
                    },
                    {
                        name: '最小值',
                        type: 'bar',
                        data: min,
                        barWidth: 10,
                        barGap: 0, 
                        itemStyle: {
                            normal: {
                                show: true,
                                color: '#69CBF2',
                                barBorderRadius: 50,
                                borderWidth: 0,
                            }
                        },
                    },
                    {
                        name: '平均值',
                        type: 'bar',
                        data: avg,
                        barWidth: 10,
                        barGap: 0, 
                        itemStyle: {
                            normal: {
                                show: true,
                                color: '#f91',
                                barBorderRadius: 50,
                                borderWidth: 0,
                            }
                        },
                    }
                 ]
            }
            setEcharts({
                option:option,
                setStr: 'ecBar'
            })
        }else{
            wx.showModal({
                title:'没有相似的外观专利',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.sysinfo)
    this.setData({
        id:options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getData()
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
function getBarOption(){
  return 
}