<template>
  <div class="appearanceAnalysis">
    <Top></Top>
    <Fix></Fix>
    <div class="appearanceAnalysis-box">
      <!-- 头部 -->
      <div class="appearanceAnalysis-box-header">
        外观专利详细分析
      </div>
      <!-- 线 -->
      <div class="appearanceAnalysis-box-line"></div>
      <!-- 标题 -->
      <div class="appearanceAnalysis-box-title">相似专利图片</div>
      <!-- 图形对比 -->
      <div class="appearanceAnalysis-box-comparison">
        <div class="comparison-text">
          <span>专利名称：</span>
          <span>{{title}}</span>
        </div>
        <div class="comparison-text">
          <span>专&nbsp;利&nbsp;号&nbsp;：</span>
          <span>{{pn}}</span>
        </div>
        <div class="comparison-text">
          <span>申请日期：</span>
          <span>{{pd}}</span>
        </div>
        <div class="comparison-img">
          <div>专利图片：</div>
          <div class="comparison-img-div2">
            <div>
              <img :src="url_img" alt="">
            </div>
            <div>
              <ul>
                <li>色彩相似：{{score1}}</li>
                <li>外形相似：{{score2}}</li>
                <li>细节相似：{{score3}}</li>
                <li>综合相似：{{agg_score}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 综合分析 -->
        <!-- 标题 -->
        <div class="appearanceAnalysis-box-title">综合分析</div>
        <!-- 柱形图 -->
        <div class="appearanceAnalysis-box-column">
          <div id="column1"></div>
        </div>
      <!-- 专利文件 -->
        <!-- 标题 -->
        <div class="appearanceAnalysis-box-title">专利文件</div>
        <!-- 文件 -->
        <div class="appearanceAnalysis-box-patentText">
          <div>
            <img src="/static/images/order.png" alt="">
          </div>
          <div>
            <p>{{title}}</p>
            <p @click="download">下载</p>
          </div>
        </div>
        <!-- 提交 -->
        <div class="appearanceAnalysis-box-big-title" >
          <span @click="back">返回</span>
          <span >生成技术交底书</span>
          <span>撰写技术交底书</span>
        </div>
    </div>
    <Foot></Foot>
  </div>
</template>
<script>
  import Top from '../ui/top.vue';
  import Foot from '../ui/foot.vue';
  import Fix from '../ui/fix.vue';
  export default {
    name:'appearanceAnalysis',
    components: {
      Top,
      Foot,
      Fix
    },
    data(){
      return {
        url_img:'',
        title:'',
        pn:'',
        pd:'',
        score1:'',
        score2:'',
        score3:'',
        agg_score:'',
        listData:[]
      }
    },
    methods:{
      // 弹框
      tip(type,msg){
        return this.$message({
            type:type,
            message:msg,
            showClose:true,
            duration:2000
        })
      },
      // 综合分析柱状图
      drawColumn1(){
        let myColumn1 = this.$echarts.init(document.getElementById('column1'))
        var option = {
          // backgroundColor: '#fff',
          tooltip: {
            trigger: "axis",
            padding: [8, 10],
            backgroundColor: 'rgba(0,0,0,0.5)',
            axisPointer: {
                type: "shadow",
                textStyle: {
                    color: "#fff"
                }
            }
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '8%',
            top: '20%',
            containLabel: true
          },
          label: {
            show: false,
            position: 'top',
            color: '#333',
            fontSize: 14,
            fontWeight: 700
          },
          xAxis: [{
            type: 'category',
            offset: 10,
            data: ['色彩相似度', '外形相似度', '细节相似度', '综合相似度'],
            axisLine: {
                show: true
            },
            axisTick: {
                show: true
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: "#333",
                    fontSize: 16,
                    fontWeight: 200
                }
            },
          }],
          yAxis: [{
            type: 'value',
            axisLabel: {
                show: true
            },
            axisTick: {
                show: true
            },
            axisLine: {
                show: true
            },
            splitLine: {
                show: true
              }
          }],
          series: [
            {
              name: '',
              type: 'bar',
              data: this.listData,
              barWidth: 22, //柱子宽度
              barGap: 0, //柱子之间间距
              itemStyle: {
                  normal: {
                    color: '#31d2fa',
                    opacity: 1,
                  }
              }
            },
            {
              name: '平均值',
              type: 'bar',
              data:[] ,
              barWidth: 22,
              barGap: 0,
              itemStyle: {
                normal: {
                  color: '#fd55c3',
                  opacity: 1,
                }
              }
            },
            {
              name: '最小值',
              type: 'bar',
              data: [],
              barWidth: 22,
              barGap: 0,
              itemStyle: {
                  normal: {
                    color: '#ffc400',
                    opacity: 1,
                  }
              }
            }
          ]
        };
        myColumn1.setOption(option)
      },
      // 获取数据
      getData(){
        var id = '?id=' + this.$route.query.id
        var url = '&image_url=' + this.$route.query.url
        var idUrl = id + url
        this.$http.get(this.GLOBAL.json+'/get_image_info'+idUrl).then(res => {
          // console.log(res)
          this.url_img = this.GLOBAL.json + '/' + res.data.result.url
          this.title = res.data.result.title
          this.pn = res.data.result.pn
          this.pd = res.data.result.pd
          this.score1 = res.data.result.score1
          this.score2 = res.data.result.score1
          this.score3 = res.data.result.score3
          this.agg_score = res.data.result.agg_score
          var list = [res.data.result.score1,res.data.result.score1,res.data.result.score3,res.data.result.agg_score]
          this.listData = list
        })
      },
      download(){
        var pn1 = "?pn="+ this.pn
        var pd1 = "&pd="+ this.pd
        var pnPd = pn1+pd1
        this.$http.get(this.GLOBAL.json+'/download'+pnPd).then(res => {
          // console.log(res)
          // this.pdf = res.data.path
          var a = document.createElement('a')
          a.setAttribute('target', '_blank')
          a.href =this.GLOBAL.json+ res.data.path
          a.click()
        })
      },
      back(){
        this.$router.back()
      }
    },
    mounted(){
      this.drawColumn1()
      this.getData()
    },
    watch:{
      listData:{
        handler(newVal, oldVal) {
          this.drawColumn1()
        },
         deep: true
      },
    }
  }
</script>

<style scoped>
  ul {
    list-style: none;
    padding: 0;
  }
  .appearanceAnalysis-box {
    background-color: #fcfcfc;
    padding-top:32px;
    font-family: 'PingFangSC';
    padding-bottom: 100px;
    box-sizing: border-box;
  }
    /* 头部 */
    .appearanceAnalysis-box-header {
      width: 1200px;
      margin: 0px auto;
      font-family: 'PingFangSC';
      font-size: 36px;
      font-weight: 500;
      color: #1f1f1f;
    }
    /* 线 */
    .appearanceAnalysis-box-line {
      width: 1200px;
      margin: 16px auto;
      height: 2px;
      background-color: #dddddd;
      margin-bottom: 110px;
    }
    /* 标题 */
    .appearanceAnalysis-box-title {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      font-family: 'PingFangSC';
      font-size: 28px;
      font-weight: normal;
      color: #333;
      margin-bottom: 32px;
    }
    /* 图形对比 */
    .appearanceAnalysis-box-comparison {
      width: 1200px;
      margin: 0 auto;
      height: 630px;
      box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
      background-color: #fff;
      padding: 48px 0 0 32px;
      margin-bottom: 48px;
    }
      .comparison-text {
        margin-bottom: 12px;
      }
      .comparison-text > span:nth-child(1) {
        color: #666666;
        font-weight: normal;
      }
      .comparison-text > span:nth-child(2) {
        color: #333;
        font-weight: 600;
      }
      .comparison-img {
        position: relative;
      }
      .comparison-img > div:first-child {
        float: left;
        color: #666666;
        font-weight: normal;
        position: absolute;
      }
      .comparison-img > .comparison-img-div2 {
        float: left;
        width: 964px;
        margin-left: 80px;
        margin-bottom: 36px;
      }
      .comparison-img > .comparison-img-div2 > div:first-child {
        float: left;
        width: 120px;
        height: 120px;
        background-color: #fafafa;
        margin-right: 24px;
        padding: 13px 0 0 13px;
        box-sizing: border-box;
      }
      .comparison-img > .comparison-img-div2 > div:first-child > img {
        height: 94px;
        width: 94px;
      }
      .comparison-img > .comparison-img-div2 > div:nth-child(2) {
        float: left;
      }
      .comparison-img > .comparison-img-div2 > div:nth-child(2) > ul > li {
        font-size: 12px;
        font-weight: 100;
        margin-bottom: 16px;
      }
      .comparison-img > .comparison-img-div2 > div:nth-child(2) > ul > li:nth-child(1) {
        margin-top: 5px;
      }
      .comparison-img > .comparison-img-div2 > div:nth-child(2) > ul > li:nth-child(4) {
        margin-bottom: 0;
      }
    /* 综合分析 */
      /* 柱形图 */
      .appearanceAnalysis-box-column {
        width: 1200px;
        height: 467px;
        margin: 0 auto;
        border-radius: 3px;
        box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
        background-color: #fff;
        margin-bottom: 48px;
      }
      #column1 {
        width: 1200px;
        height: 467px;
      }
    /* 专利文件 */
      /* 文件 */
      .appearanceAnalysis-box-patentText {
        width: 1200px;
        height: 160px;
        box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
        background-color: #fff;
        /* margin-bottom: 80px; */
        padding: 48px 0 0 32px;
        box-sizing: border-box;
        margin: 0 auto;
      }
      .appearanceAnalysis-box-patentText > div:first-child {
        float: left;
        width: 64px;
        height: 64px;
        padding: 5px 0 0 9px;
        box-sizing: border-box;
        margin-right: 24px;
      }
      .appearanceAnalysis-box-patentText > div:first-child > img {
        width: 46px;
        height: 51px;
      }
      .appearanceAnalysis-box-patentText > div:nth-child(2) {
        float: left;
      }
      .appearanceAnalysis-box-patentText > div:nth-child(2) > p:nth-child(1) {
        font-size: 20px;
        font-weight: 100;
        color: #4a4a4a;
        margin-bottom: 11px;
        margin-top: 5px;
      }
      .appearanceAnalysis-box-patentText > div:nth-child(2) > p:nth-child(2) {
        font-size: 12px;
        font-weight: normal;
        color: #f96006;
        cursor: pointer;
      }
  /* 提交 */
  .appearanceAnalysis-box-big-title {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  .appearanceAnalysis-box-big-title > span:nth-child(1) {
    display: inline-block;
    width: 214px;
    height: 54px;
    border-radius: 4px;
    background-color: #efefef;
    text-align: center;
    line-height: 54px;
    font-family: "PingFangSC";
    font-size: 18px;
    font-weight: normal;
    color: #f87e03;
    margin-right: 48px;
    margin-top: 80px;
    cursor: pointer;
  }
  .appearanceAnalysis-box-big-title > span:nth-child(2) {
    display: inline-block;
    width: 214px;
    height: 54px;
    border-radius: 4px;
    background-color: #f96006;
    text-align: center;
    line-height: 54px;
    font-family: "PingFangSC";
    font-size: 18px;
    font-weight: normal;
    color: #fff;
    cursor: pointer;
    margin-top: 80px;
    margin-right: 48px;
  }
  .appearanceAnalysis-box-big-title > span:nth-child(3) {
    display: inline-block;
    width: 214px;
    height: 54px;
    border-radius: 4px;
    background-color: #f96006;
    text-align: center;
    line-height: 54px;
    font-family: "PingFangSC";
    font-size: 18px;
    font-weight: normal;
    color: #fff;
    cursor: pointer;
    margin-top: 80px;
  }
</style>
