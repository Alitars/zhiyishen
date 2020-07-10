<template>
  <div class="patentReports">
    <Top></Top>
    <Fix></Fix>
    <div class="patentReports-box">
      <div class="patentReports-box-big">
        <div class="patentReports-box-big-one">
          <p>检测报告如下</p>
          <img src="/static/images/xiaoguo.png" alt="">
        </div>
        <!-- 数据饼图 -->
        <div>
          <div class="patentReports-box-big-main">
            <div id="main"></div>
          </div>
          <div class="patentReports-box-big-right">
            <div id="utterance"></div>
          </div>
        </div>
        <div style="clear:both"></div>
        <!-- 数据柱图 -->
        <div class="patentReports-box-big-conter">
          <div id="columnar"></div>
        </div>
        <!-- 根据分析塔推演 -->
          <!-- 标题 -->
          <div class="patentReports-box-big-title">根据分析塔推演</div>
          <!-- 内容 -->
          <div class="patentReports-box-big-leirong">
            <p>{{comment1}}</p>
            <p>{{comment2}}</p>
            <p>{{comment3}}</p>
          </div>
        <!-- 相关专利展现 -->
          <!-- 标题 -->
          <div class="patentReports-box-big-title">相关专利展现</div>
          <!-- 内容 -->
          <div class="patentReports-box-big-reveal">
            <div class="reveal" v-for="(v,k) in patent_title" :key="k">
              <div class="reveal-one">
                <div @click="revealShow(k)">
                  <img src="/static/images/juxing111.png" alt="">
                </div>
                <div>
                  <p :title="v.patent_title" @click="revealShow(k)">{{v.patent_title}}</p>
                  <span>{{parseInt(similarData[k]*100)+'%'}}</span>
                  <p @click="download(v.pub_date,v.pub_id)">下载</p>
                </div>
              </div>
              <div style="clear:both"></div>
              <!-- 三角 -->
              <div class="trigonometry"  v-show="k == reveal_show"></div>
              <!-- 简介 -->
              <div class="revealShow" v-show="k == reveal_show" v-html="patent_abstract[k]"></div>
            </div>
          </div>
        <!-- 提交 -->
        <div class="patentReports-box-big-title" >
          <span @click="back()">返回</span>
          <span @click="buy">立即购买</span>
          <span @click="oneQuestion">撰写技术交底书</span>
        </div>
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
    name:'patentReports',
    components: {
      Top,
      Foot,
      Fix
    },
    props:['categoryData','gonsiData','technicalData','discourseData','percentageData','recordData'],
    data(){
      return {
        patent_title:[],
        patent_abstract:[],
        reveal_show:null,
        h152:false,
        comment1:'',
        comment2:'',
        comment3:'',
        similarData:[]
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
      //公司分布饼图
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('main'))
        let data1 = this.categoryData
        // 绘制图表
         let option = {
            title: {
                text: '注册公司分布',
                x: 'left',
                top:18,
                left:32,
                textStyle: {color: '#3ec556'}
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            // labelLine: {
            //   lineStyle: {
            //     color: '#333'
            //   }
            // },
            series: [
              {
                name: '注册公司分布',
                type: 'pie',
                radius: '55%',
                center: ['30%', '50%'],
                // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}',
                data:this.categoryData,
                color:['#31d2fa','#ffc400','#bbcaff','#ff56c5','#f96006'],
                label: {
                    normal: {
                       position: 'inner',
                       show : false
                    }
                  },
              }
            ],
            legend: {
              type: 'scroll',
                orient: 'vertical',
                x: 'right',
                top:'33%',
                left:'53%',
                data:this.gonsiData,
                textStyle: {
                  fontSize: 14,
                },
            },
        };
        myChart.setOption(option)
      },
      // 热门技术话语
      drawUtterance(){
        let myChart1 = this.$echarts.init(document.getElementById('utterance'))
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {d}% <br/> {c}"
          },
          title: {
              text: '热门技术话语',
              x: 'center',
              textStyle: {color: '#3ec556'}
          },
        series: [{
          type: 'pie',
          radius: ['40%', '50%'],
          center: ['50%', '40%'],
          color: ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'],
          data:this.technicalData ,
          labelLine: {
            normal: {
                show: true,
                length: 20,
                length2: 20,
                lineStyle: {
                    color: '#12EABE',
                    width: 2
                }
            }
          },
          label: {
            normal: {
                formatter: '{b|{b}}\n{hr|}\n{d|{d}%}',
                rich: {
                    b: {
                        fontSize: 14,
                        color: '#333',
                        align: 'left',
                        padding: 4
                    },
                    hr: {
                        borderColor: '#0E7CE2',
                        width: '100%',
                        borderWidth: 2,
                        height: 0
                    },
                    d: {
                        fontSize: 14,
                        color: '#333',
                        align: 'left',
                        padding: 4
                    },
                }
            }
          }
        }]
        };
        myChart1.setOption(option)
      },
      // 柱状图
      drawColumnar(){
        let myChart2 = this.$echarts.init(document.getElementById('columnar'))
        var echartData = this.recordData,
            option = {
              title: {
                text: '相似度分布',
                textStyle: {color: '#00c7fc'},
                x:'center',
                top:'5%'
              },
              grid: {
                  top: '20%',
                  bottom: '3%',
                  containLabel: true
              },
              tooltip: {
                   trigger: 'item',
                   formatter: "{b}<br/>{c}个",
              },
              xAxis: [{
                  type: 'category',
                  axisLine: {
                    show: false,
                  },
                  data: this.percentageData,
              }],
              yAxis: [{
                  type: 'value',
                  axisLine: {
                    show: false,
                  },
              }],
              series: [{
                name: '人数统计',
                barMaxWidth: '20%',
                type: 'bar',
                label: {
                  normal: {
                      show: true,
                      position: 'top'
                  }
                },
                itemStyle: {
                  normal: {
                    color: function(params) {
                      var colorList = ['#9BCA63','#B5C334', '#E87C25', '#27727B','#FE8463','#C1232B',  '#FAD860', '#F3A43B', '#60C0DD',];
                      return colorList[params.dataIndex]
                    },
                    label: {
                      show: true,
                      position: 'top',
                      formatter: function(params) {
                          var total = 0;
                          var percent = 0;
                          echartData.forEach(function(value, index) {
                              total += value;
                          });
                          percent = ((params.value / total) * 100).toFixed(2);
                          return '' + params.name + '\n\n' + params.value + '个，' + '' + percent + '%';
                      },
                    }
                  }
                },
                data: echartData,
              }]
            };
        myChart2.setOption(option)
      },
      // 获取数据
      getData(){
        const loading = this.$loading({
          lock: true,
          text: '提交中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)'
        });
        var id = '?id=' + this.$route.query.good
        // var id = '?id=7bf0bf86-cf6a-41c3-9175-7f881d42a87b'
        this.$http.get(this.GLOBAL.json+'/get_search_patent_img'+id).then(res => {
          // console.log(res)
          // 注册公司分布
          if(res.data.code == '01003') {
            loading.close();
            this.$confirm('没有相似的专利', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type:false
            }).then(() => {
              this.$router.push('/personal/analysisList');
            }).catch(() => {
              this.$router.push('/personal/analysisList');
            });
          }
          if(res.data.code == '01004') {
            if(res.data.result.code == 300) {
              loading.close();
              this.$confirm('没有相似的专利', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:false
              }).then(() => {
              this.$router.push('/personal/analysisList');
              }).catch(() => {
                this.$router.push('/personal/analysisList');
              });
            }
            if(res.data.result.code == 200) {
              loading.close();
              var category = []
              var gonsi = []
              for(let i in res.data.result.related_company){
                category.push({
                  value:res.data.result.related_company[i],
                  name:i
                })
                gonsi.push(i)
              }
              this.categoryData = category
              this.gonsiData = gonsi
              // 热门技术话语 technical discourse
              var technical = []
              var discourse = []
              for(let i in res.data.result.keywords_freq){
                technical.push({
                  value:res.data.result.keywords_freq[i],
                  name:i
                })
                discourse.push(i)
              }
              this.technicalData = technical
              this.discourseData = discourse
              // 柱状图数据
              var percentage = []
              var record = []
              for(let i in res.data.result.related_similar){
                record.push(res.data.result.related_similar[i])
                percentage.push(i)
              }
              this.percentageData = percentage
              this.recordData = record
              // 相关专利展现数据
              // this.patent_title = res.data.result.patents.patent_title
              this.patent_abstract = res.data.result.patents.claim
              if(res.data.result.patents.patent_title.length == 0) {
                this.patent_title = []
              }else {
                for(let i=0;i<res.data.result.patents.patent_title.length;i++){
                  for(let j=0;j<res.data.result.patents.pub_date.length;j++){
                    for(let l=0;l<res.data.result.patents.pub_id.length;l++){
                      if(i==j&&i==l) {
                        this.patent_title.push({
                          patent_title:res.data.result.patents.patent_title[i],
                          pub_date:res.data.result.patents.pub_date[i],
                          pub_id:res.data.result.patents.pub_id[i]
                        })
                      }
                    }
                  }
                }
              }
              // console.log(this.patent_title)
              this.comment1 = res.data.result.comment1
              this.comment2 = res.data.result.comment2
              this.comment3 = res.data.result.comment3
              // 相似度
              this.similarData = res.data.result.patents.similar
            }
          }
        })
      },
      revealShow(val) {
        this.reveal_show = val
        this.h152 = true
      },
      buy(){
        this.$router.push({
          path:'/patent',
          query:{
           id:49
          }
        })
      },
      oneQuestion(){
        this.$router.push('/oneQuestion')
      },
      // 下载
      download(val,val1) {
        var pn = "?pn="+val1
        var pd = '&pd=' +val
        var pnPd = pn+pd
        // console.log(pnPd)
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
      this.getData()
      this.drawLine();
      this.drawUtterance();
      this.drawColumnar();
    },
    watch:{
      categoryData:{
        handler(newVal, oldVal) {
          this.drawLine()
        },
         deep: true
      },
      gonsiData:{
        handler(newVal, oldVal) {
          this.drawLine()
        },
         deep: true
      },
      technicalData:{
        handler(newVal, oldVal) {
          this.drawUtterance()
        },
         deep: true
      },
      discourseData:{
        handler(newVal, oldVal) {
          this.drawUtterance()
        },
         deep: true
      },
      recordData:{
        handler(newVal, oldVal) {
          this.drawColumnar()
        },
         deep: true
      },
      percentageData:{
        handler(newVal, oldVal) {
          this.drawColumnar()
        },
         deep: true
      },
    }
  }
</script>

<style scoped>
  a {
    text-decoration:none;
    color: #f96006;
  }
  .patentReports-box {
    background-color:#fcfcfc;
  }
  .patentReports-box-big {
    width: 1200px;
    margin: 0 auto;
    padding-top: 30px;
    box-sizing: border-box;
    padding-bottom: 68px;
  }
  .patentReports-box-big-one {
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    text-align: center;
    padding-top: 24px;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 1px;
  }
  .patentReports-box-big-one > p:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 36px;
    font-weight: 600;
    color: #333;
    margin-bottom: 70px;
  }
  .patentReports-box-big-one > p:nth-child(2) {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color:#5b5b5b;
    margin-bottom: 40px;
  }
  .patentReports-box-big-one > img {
    position: absolute;
    top:24px;
    right: 328px;
    height: 86px;
    width: 76px;
  }
  .patentReports-box-big-title {
    margin: 48px 0 0 32px;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 28px;
    font-weight: normal;
    color: #333;
    padding-bottom:32px
  }
  .patentReports-box-big-title > span:nth-child(1) {
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
    margin-top: 32px;
    cursor: pointer;
  }
  .patentReports-box-big-title > span:nth-child(2) {
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
    margin-right: 48px;
    margin-top: 32px;
  }
  .patentReports-box-big-title > span:nth-child(3) {
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
    margin-top: 32px;
  }
  .patentReports-box-big-main {
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    text-align: center;
    padding-top: 36px;
    box-sizing: border-box;
    padding-bottom: 1px;
    width: 699px;
    float: left;
    margin-right: 24px;
    box-sizing: border-box;
  }
  #main {
    width: 699px;
    height: 402px;
  }
  .patentReports-box-big-right {
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    text-align: center;
    padding-top: 36px;
    box-sizing: border-box;
    padding-bottom: 1px;
    float: right;
    width: 477px;
    height: 439px;
  }
  #utterance {
    width: 477px;
    height: 402px;
  }
  .patentReports-box-big-conter {
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    text-align: center;
    box-sizing: border-box;
    padding-bottom: 1px;
    width: 1200px;
    height: 467px;
  }
  #columnar {
    width: 1200px;
    height: 467px;
  }
  /* 根据分析塔推演 */
    /* 内容 */
    .patentReports-box-big-leirong {
      width: 1200px;
      height: 276px;
      box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
      background-color: #fff;
      padding: 24px 32px 48px 32px;
      box-sizing: border-box;
    }
    .patentReports-box-big-leirong > p {
      font-size: 20px;
      font-weight: 100;
      color: #333;
      margin-top: 24px;
    }
  /* 相关专利展现 */
    /* 内容 */
    .patentReports-box-big-reveal {
      width: 1200px;
      height: 420px;
      box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
      background-color: #fff;
      padding: 32px 0 10px 32px;
      box-sizing: border-box;
      overflow: auto;
    }
    .reveal {
      position: relative;
      margin-top: 16px;
      cursor: pointer;
    }
    .reveal > .reveal-one {
      height: 64px;
      margin-bottom: 8px;
    }
    .reveal > .reveal-one > div:first-child {
      float: left;
      width: 64px;
      height: 64px;
      box-sizing: border-box;
      margin-right: 24px;
    }
    .reveal > .reveal-one >  div:first-child > img {
      width: 64px;
      height: 64px;
    }
    .reveal > .reveal-one >  div:nth-child(2) {
      float: left;
      /* margin-right: 289px; */
      height: 64px;
      position: relative;
    }
    .reveal > .reveal-one >  div:nth-child(2) > p:nth-child(1) {
      font-size: 20px;
      font-weight: 100;
      color: #4a4a4a;
      margin-bottom: 11px;
      margin-top: 5px;
      width: 600px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .reveal > .reveal-one >  div:nth-child(2) > span:nth-child(2) {
      position: absolute;
      top:7px;
      left: 600px;
    }
    .reveal > .reveal-one >  div:nth-child(2) > p:nth-child(3) {
      font-size: 12px;
      font-weight: normal;
      color: #f96006;
      cursor: pointer;
    }
    .wi900 {
      width: 900px;
    }
    /* 三角 */
    .trigonometry {
      position: absolute;
      width: 0;
      height: 0;
      top: 69px;
      left: 22px;
      border-style: solid;
      border-width: 6px;
      border-color: transparent transparent #efefef #efefef;
      transform: rotate(135deg);
      -webkit-box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2);
      -moz-box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2);
      box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2);
      z-index: 9977;
    }
    /* 简介 */
    .revealShow {
      width: 1078px;
      height: 80px;
      background-color: #efefef;
      overflow: auto;
      word-break:break-all
    }
    .h152 {
      height: 152px;
    }
</style>
