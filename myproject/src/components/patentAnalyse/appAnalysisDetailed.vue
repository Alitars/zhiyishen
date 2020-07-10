<template>
  <div class="appAnalysisDetailed">
    <Top></Top>
    <Fix></Fix>
    <div class="appAnalysisDetailed-box">
      <div class="appAnalysisDetailed-box-big">
        <div class="appAnalysisDetailed-box-big-one">
          <p>检测报告如下</p>
          <img src="/static/images/xiaoguo.png" alt="">
        </div>
        <!-- 相似专利图片 -->
        <div class="appAnalysisDetailed-box-big-title">
          <p>相似专利图片</p>
        </div>
        <!-- 图形展示 -->
        <div class="appAnalysisDetailed-box-big-imgshow">
          <ul>
            <li v-for="(v,k) in url_list" :key="k" @click="appearanceAnalysis(v.url_img)">
              <div>
                <img :src="'http://47.99.214.190:8000/'+v.url_img" alt="">
              </div>
              <p>{{v.title}}</p>
            </li>
          </ul>
        </div>
        <!-- 更多 -->
        <!-- <div class="appAnalysisDetailed-box-big-more">
          <img src="/static/images/invalid-rightname.png" alt="">
          <span>更多</span>
        </div> -->
        <div style="clear:both"></div>
        <!-- 热门公司 -->
        <div class="appAnalysisDetailed-box-big-title">
          热门公司
        </div>
        <div class="appAnalysisDetailed-box-big-company">
          <div class="company-header">
            <ul>
              <li>排名</li>
              <li>公司名称</li>
              <li>专利数量</li>
              <li>专利占比</li>
            </ul>
          </div>
          <!-- 后台渲染数据 -->
          <div class="exaggerate-company" v-for="(v,k) in companyData" :key="k">
            <ul >
              <li>{{k+1}}</li>
              <li :title="v.company">{{v.company}}</li>
              <li>{{v.number}}</li>
              <li>{{v.number/total*100+'%'}}</li>
            </ul>
          </div>
        </div>
        <!-- 综合分析 -->
        <div class="appAnalysisDetailed-box-big-title">
          综合分析
        </div>
        <!-- 综合分析柱状图 -->
        <div class="appAnalysisDetailed-tradeoffAnalysis">
          <div id="tradeoffAnalysis"></div>
        </div>
        <div class="appAnalysisDetailed-box-big-analysis"></div>
        <div style="clear:both"></div>
        <!-- 提交 -->
        <div class="appAnalysisDetailed-box-big-title" >
          <span @click="back">返回</span>
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
    name:'appAnalysisDetailed',
    components: {
      Top,
      Foot,
      Fix
    },
    // props:['maximum','minimum','avgimum'],
    data(){
      return {
        url_list:[],
        maximum:[],
        minimum:[],
        avgimum:[],
        companyData:[],
        total:''
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
      //  综合分析柱状图
      drawTradeoffAnalysis(){
        let myTradeoffAnalysis = this.$echarts.init(document.getElementById('tradeoffAnalysis'))
        var option = {
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
          legend: {
            data: ['最大值', '平均值', '最小值'],
            align: 'left',
            left: 32,
            top:40,
            textStyle: {
              color: "#333",
              fontSize: 14,
              fontWeight: 200
            },
            itemWidth: 14,
            itemHeight: 14,
            itemGap: 35
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
              name: '最大值',
              type: 'bar',
              data:this.maximum,
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
              data: this.avgimum,
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
              data: this.minimum,
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
        myTradeoffAnalysis.setOption(option)
      },
      // 数据
      getData(){
        const loading = this.$loading({
          lock: true,
          text: '提交中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)'
        });
        // var id = '?id=658449c8-31f9-46d3-b2ef-387cfef33449'
        var id = '?id=' + this.$route.query.good
        this.$http.get(this.GLOBAL.json+'/get_search_patent_img'+id).then(res => {
          // console.log(res)
          // 相似图片
          if(res.data.result.code == '01003') {
            loading.close();
            this.$confirm('没有相似的外观专利', '提示', {
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
              this.$confirm('没有相似的外观专利', '提示', {
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
              for(let i=0;i<res.data.result.url.length;i++) {
                for(let j=0;j<res.data.result.title.length;j++) {
                  if(i==j) {
                    this.url_list.push({
                      url_img:res.data.result.url[i],
                      title:res.data.result.title[i]
                    })
                  }
                }
              }
              // 综合分析
              var maxi = []
              maxi = [res.data.result.total_max_1,res.data.result.total_max_2,res.data.result.total_max_3,res.data.result.total_max_agg]
              this.maximum = maxi
              var mini = []
              mini = [res.data.result.total_min_1,res.data.result.total_min_2,res.data.result.total_min_3,res.data.result.total_min_agg]
              this.minimum = mini
              var avgi = []
              avgi = [res.data.result.total_avg_1,res.data.result.total_avg_2,res.data.result.total_avg_3,res.data.result.total_avg_agg]
              this.avgimum = avgi
              // console.log(maxi,this.maximum)
              // 热门公司
              var company = []
              for( let g in res.data.result.company) {
                this.total = res.data.result.company[g]
                company.push({
                  company:g,
                  number:res.data.result.company[g]
                })
              }
              this.companyData = company.slice(0,company.length-1)
            }
          }
          // console.log(this.companyData.slice(0,this.companyData.length-1))
        })
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
      appearanceAnalysis(val){
        // console.log(val)
        this.$router.push({
          path:'/appearanceAnalysis',
          query:{
            id:this.$route.query.good,
            url:val
          }
        })
      },
      back(){
        this.$router.back()
      }
    },
    mounted(){
      this.drawTradeoffAnalysis()
      this.getData()
    },
    watch:{
      maximum:{
        handler(newVal, oldVal) {
          this.drawTradeoffAnalysis()
        },
         deep: true
      },
      minimum:{
        handler(newVal, oldVal) {
          this.drawTradeoffAnalysis()
        },
         deep: true
      },
      avgimum:{
        handler(newVal, oldVal) {
          this.drawTradeoffAnalysis()
        },
         deep: true
      },
    },
  }
</script>

<style scoped>
  ul {
    list-style: none;
    padding: 0;
  }
  .appAnalysisDetailed-box {
    background-color:#fcfcfc;
  }
  .appAnalysisDetailed-box-big {
    width: 1200px;
    margin: 0 auto;
    padding-top: 30px;
    box-sizing: border-box;
    padding-bottom: 68px;
  }
  .appAnalysisDetailed-box-big-one {
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    text-align: center;
    padding-top: 24px;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 1px;
  }
  .appAnalysisDetailed-box-big-one > p:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 36px;
    font-weight: 600;
    color: #333;
    margin-bottom: 70px;
  }
  .appAnalysisDetailed-box-big-one > p:nth-child(2) {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color:#5b5b5b;
    margin-bottom: 40px;
  }
  .appAnalysisDetailed-box-big-one > img {
    position: absolute;
    top:24px;
    right: 328px;
    height: 86px;
    width: 76px;
  }
  /* 图形展示 */
  .appAnalysisDetailed-box-big-imgshow {
    width: 1200px;
    height: 688px;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    background-color: #fff;
    padding: 12px 0 0 32px;
    box-sizing: border-box;
    margin-bottom: 24px;
    overflow: auto;
  }
  .appAnalysisDetailed-box-big-imgshow > ul {
    list-style: none;
    padding: 0;
  }
  .appAnalysisDetailed-box-big-imgshow > ul > li {
    float: left;
    margin-right: 47px;
    text-align: center;
    margin-top: 32px;
    cursor: pointer;
  }
  .appAnalysisDetailed-box-big-imgshow > ul > li:nth-child(4) {
    margin-right: 32px;
  }
  .appAnalysisDetailed-box-big-imgshow > ul > li:nth-child(8) {
    margin-right: 32px;
  }
  .appAnalysisDetailed-box-big-imgshow > ul > li > div {
    width: 240px;
    height: 240px;
    background-color: #fafafa;
    margin-bottom: 16px;
  }
  .appAnalysisDetailed-box-big-imgshow > ul > li > div > img {
    width: 187px;
    height: 187px;
    margin-top: 27px;
  }
  /* 更多 */
  .appAnalysisDetailed-box-big-more {
    width: 1200px;
    padding-top:1px ;
    cursor: pointer;
  }
  .appAnalysisDetailed-box-big-more > span {
    float: right;
    font-size: 14px;
    color: #999999;
    font-weight: normal;
    vertical-align: bottom;
    margin-right: 8px;
  }
  .appAnalysisDetailed-box-big-more > img {
    float: right;
    width: 14px;
    height: 14px;
    vertical-align: bottom;
    margin-top: 2px;
  }
  /* 相似关键词 */
  .appAnalysisDetailed-box-big-tag {
    width: 1200px;
    height: 188px;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    padding: 24px 0 48px 37px;
    box-sizing: border-box;
  }
  .appAnalysisDetailed-box-big-tag > ul > li {
    float: left;
    width: 158px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border: solid 1px #d6d6d6;
    box-sizing: border-box;
    margin-right: 35px;
    margin-top: 24px;
    font-size: 14px;
    font-weight: 300;
    color: #333;
  }
  /* 热门公司 */
  .appAnalysisDetailed-box-big-company {
    width: 1200px;
    height: 385px;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    background-color: #fff;
    padding: 48px 32px;
    box-sizing: border-box;
  }
  .company-header {
    width: 1134px;
    height: 36px;
    background-color: #fafafa;
    border: solid 1px #eeeeee;
    box-sizing: border-box;
    line-height: 36px;
  }
  .company-header > ul > li {
    font-size: 14px;
    font-weight: 100;
    color: #333;
    float: left;
  }
  .company-header > ul > li:nth-child(1) {
    margin: 0px 295px 0 36px ;
    text-align: center;
    width: 28px;
  }
  .company-header > ul > li:nth-child(2) {
    width: 103px;
    text-align: center;
    margin-right: 274px;
  }
  .company-header > ul > li:nth-child(3) {
    width: 56px;
    text-align: center;
    margin-right: 209px;
  }
  .company-header > ul > li:nth-child(4) {
    width: 56px;
    text-align: center;
  }
  /* 后台渲染数据 */
  .exaggerate-company {
    width: 1134px;
    height: 36px;
    background-color: #fff;
    border: solid 1px #eeeeee;
    box-sizing: border-box;
    line-height: 36px;
    border-top: none;
  }
  .exaggerate-company > ul > li {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    float: left;

  }
  .exaggerate-company > ul > li:nth-child(1) {
    margin: 0px 295px 0 36px ;
    text-align: center;
    width: 28px;
  }
  .exaggerate-company > ul > li:nth-child(2) {
    width: 104px;
    text-align: center;
    margin-right: 274px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .exaggerate-company > ul > li:nth-child(3) {
    width: 56px;
    text-align: center;
    margin-right: 209px;
  }
  .exaggerate-company > ul > li:nth-child(4) {
    width: 56px;
    text-align: center;
  }
  /* 综合分析 */
  .appAnalysisDetailed-tradeoffAnalysis {
    width: 1200px;
    height: 467px;
    border-radius: 3px;
    box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
    background-color: #fff;
  }
  #tradeoffAnalysis {
    width: 1200px;
    height: 467px;
  }
  /* 标题 */
  .appAnalysisDetailed-box-big-title {
    margin: 48px 0 32px;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 28px;
    font-weight: normal;
    color: #333;
    padding-bottom:32px
  }
  /* 提交 */
  .appAnalysisDetailed-box-big-title > span:nth-child(1) {
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
  .appAnalysisDetailed-box-big-title > span:nth-child(2) {
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
    margin-right: 48px;
  }
  .appAnalysisDetailed-box-big-title > span:nth-child(3) {
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
  /*  */
</style>
