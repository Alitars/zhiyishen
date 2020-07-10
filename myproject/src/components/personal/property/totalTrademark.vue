<template>
  <div class="totalTrademark-container">
    <div class="totalTrademark-box">
      <!-- 标题 -->
      <div class="totalTrademark-title">
        <img src="/static/images/yuanqu21.png" alt="">
        <router-link class="totalTrademark-center" tag="div" to="/personal/assetsManagement">知产管理</router-link>
        <!-- 竖线 -->
        <div class="totalTrademark-line"></div>
        <!-- 商标文字 -->
        <div class="totalTrademark-text">商标管理</div>
        <!-- 公司 -->
        <div class="totalTrademark-right">{{this.$route.query.click_type}}</div>
      </div>
      <!-- 导航 -->
      <div class="totalTrademark-navigation">
        <ul>
          <li @click="trade1">
            <img src="/static/images/20.png" alt="">
            <div>
              <span>商标总数</span>
              <span>{{total}}</span>
            </div>
          </li>
          <li @click="trade2">
            <img src="/static/images/20.png" alt="">
           <div>
              <span>已注册商标</span>
              <span>{{zc_total}}</span>
            </div>
          </li>
          <li @click="trade3">
            <img src="/static/images/20.png" alt="">
           <div>
              <span>等待实质审查</span>
              <span>{{wait_total}}</span>
            </div>
          </li>
          <li @click="trade4">
            <img src="/static/images/20.png" alt="">
           <div>
              <span>初审公告</span>
              <span>{{cs_total}}</span>
              <span class="four_span">(即将到期续费)</span>
            </div>
          </li>
          <li @click="jump">
            <img src="/static/images/20.png" alt="">
           <div>
              <span>异议中</span>
              <span>{{yy_total}}</span>
              <!-- <span class="four_span">(过期半年续费)</span> -->
            </div>
          </li>
          <li @click="trade5">
            <img src="/static/images/20.png" alt="">
           <div>
              <span>无效商标</span>
              <span>{{wx_total}}</span>
            </div>
          </li>
          <li @click="trade6">
            <img src="/static/images/20.png" alt="">
           <div>
              <span>驳回复审</span>
              <span>{{bh_total}}</span>
            </div>
          </li>
          <li @click="trade7">
            <img src="/static/images/20.png" alt="">
           <div>
              <span>续展期商标</span>
              <span>{{xz_total}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div style="clear :both"></div>
      <!-- 商标状态统计柱状图 -->
      <div class="totalTrademark-census">
         <div id="columnarr"></div>
      </div>
      <!-- 近5年商标申请数量统计 -->
      <div class="totalTrademark-count">
        <div id="count"></div>
      </div>
      <!-- 并排图表 -->
      <div class="totalTrademark-abreast">
        <div class="totalTrademark-abreast-left">
          <div id="abreastLeft"></div>
        </div>
        <div class="totalTrademark-abreast-right">
          <p>代理机构</p>
          <div class="totalTrademark-abreast-right-table">
            <div>
              <span>排名</span>
              <span>代理机构</span>
              <!-- <span>占比</span> -->
              <span>代理商标数量</span>
            </div>
            <div class="overshow">
               <div class="totalTrademark-abreast-right-table-list" v-for="(item,index) in agencyList" :key="index">
                <div>{{index+1}}</div>
                <div :title="item.Value">{{item.Value}}</div>
                <!-- <div>{{(item.Count/agencyCount*100).toFixed(2)}}%</div>
                <div class="pragrom-div1">
                  <div class="pragrom-div2" :style="{width:parseInt(item.Count/agencyCount*100)+'%'}"></div>
                </div> -->
                <div title="100">{{item.Count}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="clear :both"></div>
  </div>
</template>

<script>
  export default {
    name:'totalTrademark',
    props:['listData','yearData','numberData','categoryData','randomColor'],
    watch:{
      listData:{
        handler(newVal, oldVal) {
          
          this.drawColumnar()
        },
         deep: true
      },
      yearData:{
        handler(newVal, oldVal) {
          this.drawCount()
        },
         deep: true
      },
      numberData:{
        handler(newVal, oldVal) {
          this.drawCount()
        },
         deep: true
      },
      categoryData:{
        handler(newVal, oldVal) {
          this.drawAbreastLeft()
        },
         deep: true
      },
      randomColor:{
        handler(newVal, oldVal) {
          this.drawAbreastLeft()
        },
         deep: true
      }
    },
    data(){
      return {
        progress:35,
        total:'',
        zc_total:'',
        wait_total:'',
        cs_total:'',
        yy_total:'',
        wx_total:'',
        bh_total:'',
        xz_total:'',
        // 代理机构
        agencyList:[],
        agencyCount:'',
        // loding效果
        loadshow:true,
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
      // 商标状态统计柱状图
      drawColumnar(){
        let myChart2 = this.$echarts.init(document.getElementById('columnarr'))
        var echartData = this.listData,
            option = {
               title: {
                text: '商标状态统计',
                  textStyle: {
                  color: '#333333'
                },
                x:'center',
                top:'5%'
              },
              tooltip: {
                   trigger: 'item',
                   formatter: "{b}<br/>{c}个",
              },
              grid: {
                  top: '15%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis: [{
                  type: 'category',
                  data: ['已注册', '等待实质审查', '初审公告',  '异议中', '商标无效','驳回复审'],
                  axisTick: {
                    show: false
                  }
              }],
              yAxis: [{
                  type: 'value',
                  axisTick: {
                    show: false
                  },
                  splitLine:{show: false},
              }],
              series: [{
                name: '人数统计',
                barMaxWidth: '40%',
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
                      var colorList = [
                          "#ff9191","#ff9191","#ff9191","#ff9191","#ff9191","#ff9191",
                      ];
                      return colorList[params.dataIndex]
                    },
                    // label: {
                    //   show: true,
                    //   position: 'top',
                    //   formatter: function(params) {
                    //       var total = 0;
                    //       var percent = 0;
                    //       echartData.forEach(function(value, index) {
                    //           total += value;
                    //       });
                    //       percent = ((params.value / total) * 100).toFixed(2);
                    //       return '' + params.name + '\n\n' + params.value + '个，' + '' + percent + '%';
                    //   },
                    // }
                  }
                },
                data: this.listData,
              }]
            };
        myChart2.setOption(option)
      },
      // 近10年商标申请数量统计柱状图
      drawCount(){
        let myChart2 = this.$echarts.init(document.getElementById('count'))
        var echartData =this.numberData,
            option = {
               title: {
                text: '近10年商标申请数量统计',
                  textStyle: {
                  color: '#333333'
                },
                x:'center',
                top:'5%'
              },
              tooltip: {
                   trigger: 'item',
                   formatter: "{b}<br/>{c}个",
              },
              grid: {
                  top: '15%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis: [{
                  type: 'category',
                  data: this.yearData,
                  axisTick: {
                    show: false
                  }
              }],
              yAxis: [{
                  type: 'value',
                  axisTick: {
                    show: false
                  },
                  splitLine:{show: false},
              }],
              series: [{
                name: '人数统计',
                barMaxWidth: '40%',
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
                      var colorList = [
                          "#6d97ff","#6d97ff","#6d97ff","#6d97ff","#6d97ff","#6d97ff","#6d97ff","#6d97ff","#6d97ff","#6d97ff","#6d97ff",
                      ];
                      return colorList[params.dataIndex]
                    },
                    // label: {
                    //   show: true,
                    //   position: 'top',
                    //   formatter: function(params) {
                    //       var total = 0;
                    //       var percent = 0;
                    //       echartData.forEach(function(value, index) {
                    //           total += value;
                    //       });
                    //       percent = ((params.value / total) * 100).toFixed(2);
                    //       return '' + params.name + '\n\n' + params.value + '个,' + '' + percent + '%';
                    //   },
                    // }
                  }
                },
                data: this.numberData,
              }]
            };
        myChart2.setOption(option)
      },
      //公司分布饼图
      drawAbreastLeft(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('abreastLeft'))

        // 绘制图表
         let option = {
            title: {
                text: '商标分类统计',
                x: 'center',
                top:40,
                textStyle: {color: '#333333'}
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            // legend: {
            //     orient: 'vertical',
            //     x: 'right',
            //     top:'30%',
            //     left:'80%',
            //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告']
            // },
            // labelLine: {
            //   lineStyle: {
            //     color: '#333'
            //   }
            // },
            series: [
              {
                name: '商标分类统计',
                type: 'pie',
                radius: '55%',
                center: ['50%', '55%'],
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}',
                data:this.categoryData,
                color:this.randomColor,
              }
            ]
        };
        myChart.setOption(option)
      },
      // 获取数据
      gitList(){
        const loading = this.$loading({
          lock: true,
          text: '获取中',
          spinner: 'el_icon-loading',
          background: 'rgba(0, 0, 0, 0.3)'
        })
        this.$http.post(this.GLOBAL.base_url+'/api/assets/index',{
          user_id:this.$cookie.getCookie('u_id'),
          company:this.$route.query.click_type,
        }).then( res => {
          if( res.data.code == 1) {
            loading.close();
            this.total = res.data.data.total
            this.zc_total = res.data.data.zc_total
            this.wait_total = res.data.data.wait_total
            this.cs_total = res.data.data.cs_total
            this.yy_total  = res.data.data.yy_total
            this.wx_total = res.data.data.wx_total
            this.bh_total = res.data.data.bh_total
            this.xz_total = res.data.data.xz_total
            // 商标状态统计柱状图数据
            this.listData = [this.zc_total,this.wait_total,this.cs_total,this.yy_total,this.wx_total,this.bh_total]
            // 近10年商标申请数量统计柱状图数据
            var year = []
            var number = []
            for( let i in res.data.data.number) {
              year.push(i)
              number.push(res.data.data.number[i])
            }
            this.yearData = year
            this.numberData = number
            // 饼状图数据
            var category = []
            var categoryNumber = []
            // console.log(res.data.data.brandType.IntCls)
            for(let i=0;i<res.data.data.brandType.IntCls.length;i++) {
              category.push({
                value:res.data.data.brandType.IntCls[i].Count,
                name:res.data.data.brandType.IntCls[i].Value+'类'
              })
            }
            this.categoryData = category
            // 随机颜色
            var color = [];
            for (var i = 0; i < this.categoryData.length; i++) {
              var R = Math.floor(Math.random() * (255 - 0));
              var G = Math.floor(Math.random() * (255 - 0));
              var B = Math.floor(Math.random() * (255 - 0));
              var colorItem = 'rgb(' + R + ',' + G + ',' + B + ')';
              color.push(colorItem);
            };
            this.randomColor = color
            // 代理机构
            this.agencyList = res.data.data.agent.AgentName
            this.agencyCount = res.data.data.agent.Count
          }
          if( res.data.code == 0) {
            this.loadshow = false;
            this.total = 0
            this.zc_total =0
            this.wait_total = 0
            this.cs_total = 0
            this.yy_total  = 0
            this.wx_total = 0
            this.bh_total = 0
            this.listData = []
            this.yearData = [2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]
            this.numberData = []
            this.categoryData = []
            this.agencyList = []
            this.agencyCount = '',
            this.xz_total = 0
          }
        })
      },
      // 跳转
      jump(){
        this.$router.push({
          path:'/personal/extension',
          query:{
            click_type:this.$route.query.click_type,
            text:'异议中',
            id:4
          }
        })
      },
      trade1(){
        this.$router.push({
          path:'/personal/extension',
          query:{
            click_type:this.$route.query.click_type,
            text:'商标总数',
            id:'0'
          }
        })
      },
      trade2(){
        this.$router.push({
          path:'/personal/extension',
          query:{
            click_type:this.$route.query.click_type,
            text:'已注册商标',
            id:1
          }
        })
      },
      trade3(){
        this.$router.push({
          path:'/personal/extension',
          query:{
            click_type:this.$route.query.click_type,
            text:'等待实质审查',
            id:2
          }
        })
      },
      trade4(){
        this.$router.push({
          path:'/personal/extension',
          query:{
            click_type:this.$route.query.click_type,
            text:'初审公告',
            id:3
          }
        })
      },
      trade5(){
        this.$router.push({
          path:'/personal/extension',
          query:{
            click_type:this.$route.query.click_type,
            text:'无效商标',
            id:5
          }
        })
      },
      trade6(){
        this.$router.push({
          path:'/personal/extension',
          query:{
            click_type:this.$route.query.click_type,
            text:'驳回复审',
            id:6
          }
        })
      },
      trade7(){
        this.$router.push({
          path:'/personal/extension',
          query:{
            click_type:this.$route.query.click_type,
            text:'续展期商标',
            id:7
          }
        })
      },
    },
    mounted(){
      this.drawColumnar();
      this.drawCount();
      this.drawAbreastLeft();
      this.gitList()
    },
  }
</script>

<style scoped>
  .totalTrademark-box {
    min-height: 950px;
    width: 1015px;
    float: left;
    margin: 12px 0 0 16px;
    box-sizing: border-box;
    position: relative;
  }
  /* 标题 */
  .totalTrademark-title {
    height: 70px;
    background-color: #fff;
    line-height: 70px;
    margin-bottom: 16px;
  }
  .totalTrademark-title > img {
    float: left;
    margin: 23px 0px 0 20px;
  }
  .totalTrademark-center {
    font-family: "PingFangSC";
    font-size: 24px;
    color: #f96006 ;
    float: left;
    margin: 0 24px 0 19px;
    cursor: pointer;
  }
  .totalTrademark-line {
    width: 2px;
    height: 36px;
    background-color: #f96006;
    margin: 17px 18px 0px 0px;
    float: left;
  }
  .totalTrademark-text {
    font-family: "PingFangSC";
    font-size: 24px;
    color: #f96006 ;
    float: left;
  }
  .totalTrademark-right {
    float: right;
    font-family: "PingFangSC";
    font-size: 17px;
    color: #333;
    margin-right: 24px;
    font-weight: 500;
  }
  /* 导航 */
  .totalTrademark-navigation > ul {
    width: 1015px;
    padding: 0;
    list-style: none;
  }
  .totalTrademark-navigation > ul > li {
    float: left;
    width: 245px;
    height: 100px;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background-color:#fff;
    margin: 0px 10px 12px 0;
    float: left;
    cursor: pointer;
  }
  .totalTrademark-navigation > ul > li:nth-child(4) {
    margin-right: 0px;
  }
  .totalTrademark-navigation > ul > li:nth-child(8) {
    margin-right: 0px;
  }
  .totalTrademark-navigation > ul > li > img {
    margin: 26px 35px 26px 35px;
    float: left;
  }
  .totalTrademark-navigation > ul > li > div {
    display: inline-block;
    width: 112px;
    margin-top: 26px;
  }
  .totalTrademark-navigation > ul > li > div > span{
    display: block;
  }
  .totalTrademark-navigation > ul > li > div > span:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color: #999999;
  }
  .totalTrademark-navigation > ul > li > div > span:nth-child(2) {
    font-family: "PingFangSC";
    font-size: 20px;
    font-weight: 600;
    color: #333333;
  }
  .four_span {
    font-family: "PingFangSC";
    font-size: 12px;
    font-weight: normal;
    color: #999999;
  }
  /* 商标状态统计柱状图 */
  .totalTrademark-census {
    width: 1015px;
    height: 510px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background-color:white;
    margin-bottom: 16px;
  }
  #columnarr {
    width: 1015px;
    height: 510px;
  }
  /* 近5年商标申请数量统计 */
  .totalTrademark-count {
    width: 1015px;
    height: 510px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background-color:white;
    margin-bottom: 16px;
  }
  #count {
    width: 1015px;
    height: 510px;
  }
  /* 并排图表 */
  .totalTrademark-abreast-left {
    width: 500px;
    height: 400px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background-color: var(--white-two);
    float: left;
    margin-bottom: 20px;
  }
  #abreastLeft {
    width: 500px;
    height: 400px;
  }
  .totalTrademark-abreast-right {
    width: 500px;
    height: 400px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background-color: var(--white-two);
    float: right;
  }
  .totalTrademark-abreast-right > p {
    margin: 40px 0 31px 214px;
    font-family: "PingFangSC";
    font-size: 18px;
    font-weight: normal;
    color: #333333;
  }
  .totalTrademark-abreast-right > .totalTrademark-abreast-right-table {
    width: 457px;
    height: 280px;
    border: solid 1px #e4e4e4;
    margin-left: 20px;
  }
  .totalTrademark-abreast-right > .totalTrademark-abreast-right-table > div:nth-child(1) {
    height: 40px;
    line-height: 40px;
    border-bottom: solid 1px  #e4e4e4;
    box-sizing: border-box;
  }
  .totalTrademark-abreast-right > .totalTrademark-abreast-right-table > div:nth-child(1) > span {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color: #333333;
  }
  .totalTrademark-abreast-right > .totalTrademark-abreast-right-table > div:nth-child(1) > span:nth-child(1) {
    margin: 0px 30px 0 19px;
  }
  .totalTrademark-abreast-right > .totalTrademark-abreast-right-table > div:nth-child(1) > span:nth-child(2) {
    margin-left: 100px;
  }
  .totalTrademark-abreast-right > .totalTrademark-abreast-right-table > div:nth-child(1) > span:nth-child(3) {
    margin-left: 100px;
  }
  /* 列表 */
  .totalTrademark-abreast-right-table {
    position: relative;
  }
  .overshow {
    height: 240px;
    overflow: hidden;
    overflow-y: auto;
  }
  .totalTrademark-abreast-right-table-list {
    height: 40px;
    line-height: 40px;
    border-bottom: solid 1px  #e4e4e4;
    box-sizing: border-box;
  }
  .totalTrademark-abreast-right-table-list > div {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color: #333333;
  }
  .totalTrademark-abreast-right-table-list > div:first-child {
    margin: 0px 73px 0 30px;
    width: 16px;
    text-align: center;
  }
  .totalTrademark-abreast-right-table-list > div:nth-child(2) {
    width: 196px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 50px;
  }
  .totalTrademark-abreast-right-table-list > div:nth-child(3) {
    width: 43px;
    text-align: center;
  }
  .totalTrademark-abreast-right-table-list > div:nth-child(4) {
    margin: 17px 26px 0 8px;
  }
  .totalTrademark-abreast-right-table-list > div:nth-child(5) {
    width: 63px;
    text-align: center;
  }
  .pragrom-div1 {
    width: 92px;
    height: 7px;
    background-color: #e4e4e4;
  }
  .pragrom-div2 {
    height: 7px;
    background-color: #ff9191;
  }
  /* 查看更多 */
  .totalTrademark-abreast-right-table-foot {
    text-align: center;
    line-height: 40px;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
     color:#f96006;
     cursor: pointer;
     position: absolute;
     bottom: 0;
     left: 210px;
  }
  /* londing效果 */
  .table{
    width: 1015px;
    height: 100%;
    position: absolute;
    top:0;
    background: rgba(255,255,255,1);
  }
 .table > img {
   position: absolute;
   top: 50%;
   left: 50%;
   margin-top: -77%;
   margin-left: -26%;
 }
</style>
