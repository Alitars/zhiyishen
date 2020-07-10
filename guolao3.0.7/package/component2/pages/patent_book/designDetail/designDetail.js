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
import setEcharts from '../../../../../template/setEcharts.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SafeButtom: getApp().globalData.sysinfo.statusBarHeight * 4,
    ecBar: {
        onInit: {},
      },
      ecBarShow: false,
  },
  tofile(){
    //   wx.navigateTo({
    //     url: '/package/component2/pages/patent_book/designFile/designFile',
    //   })
    wx.downloadFile({
        url: this.data.pdf,//可以是后台传过来的路径
        success: function(res) {
            const filePath = res.tempFilePath
            wx.openDocument({
                filePath: filePath,
                success: function(res) {
                    console.log(res)
                }
            })
        }
    })
  },
  getData(){
    http({
        url:'/get_image_info',
        data:{
            id:this.data.id,
            image_url:this.data.imgurl
        },
    }).then((res)=>{
        var list = res.data.result
        var arr = []
        arr.push(list.score1,list.score2,list.score3,list.agg_score)
        var Iurl = 'http://47.99.214.190:8000/' + list.url
        // http://47.99.214.190:8000/download/CN305814788S_20200602.pdf
        var pdf = "http://47.99.214.190:8000/download/" +list.pn+'_'+list.pd+'.pdf'
        this.setData({
            Iurl:Iurl,
            list:list,
            pdf:pdf
        })
        var option ={
                backgroundColor: '#fff',
                tooltip: { //提示框组件
                    trigger: 'axis',
                    formatter: '{b} : {c}',
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
                xAxis: [{
                    type: 'category',
                    data:['色彩相似度', '外形相似度', '细节相似度', '综合相似度'],
                    axisLabel: { 
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
                        type: 'bar',
                        data: arr,
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
                 ]
        }
        setEcharts({
            option: option,
            setStr: 'ecBar'
        })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.sysinfo)
    this.setData({
        id:options.id,
        imgurl:options.url
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
  return ;
}