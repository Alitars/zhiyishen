<template>
  <div class="patentTube-container">
    <div class="patentTube-box">
      <!-- 标题 -->
      <div class="patentTube-title">
        <img src="/static/images/yuanqu21.png" alt="">
        <router-link class="patentTube-center" tag="div" to="/personal/assetsManagement">知产管理</router-link>
        <!-- <div class="patentTube-center" >个人中心</div> -->
        <!-- 竖线 -->
        <div class="patentTube-line"></div>
        <!-- 专利文字 -->
        <div class="patentTube-text">专利管理</div>
        <!-- 公司 -->
        <div class="patentTube-right">{{this.$route.query.click_type}}</div>
      </div>
      <!-- 导航 -->
      <div class="patentTube-navigation">
        <ul>
          <li @click="patentSingle('专利总数')">
            <img src="/static/images/zl20.png" alt="">
            <div>
              <span>专利总数</span>
              <span>{{total}}</span>
            </div>
          </li>
          <li @click="patentSingle('已授权专利')">
            <img src="/static/images/zl20.png" alt="">
           <div>
              <span>已授权专利</span>
              <span>{{y_total}}</span>
            </div>
          </li>
          <li @click="patentSingle('等待实质审查')">
            <img src="/static/images/zl20.png" alt="">
           <div>
              <span>等待实质审查</span>
              <span>{{d_total}}</span>
            </div>
          </li>
          <li @click="patentSingle('无权专利数')">
            <img src="/static/images/zl20.png" alt="">
           <div>
              <span>无权专利数</span>
              <span>{{w_total}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div style="clear :both"></div>
      <!-- 近5年专利申请数量统计 -->
      <div class="patentTube-count">
        <div id="count"></div>
      </div>
      <!-- 并排图表 -->
      <div class="patentTube-abreast">
        <div class="patentTube-abreast-left">
          <div id="abreastLeft"></div>
        </div>
        <div class="patentTube-abreast-right">
          <p>代理机构</p>
          <div class="patentTube-abreast-right-table">
            <div>
              <span>排名</span>
              <span>代理机构</span>
              <!-- <span>占比</span> -->
              <span>代理专利数量</span>
            </div>
            <div class="overshow">
               <div class="patentTube-abreast-right-table-list" v-for="(item,index) in agencyList" :key="index">
                <div>{{index+1}}</div>
                <div :title="item.name">{{item.name}}</div>
                <!-- <div>{{(item.Count/agencyCount*100).toFixed(2)}}%</div>
                <div class="pragrom-div1">
                  <div class="pragrom-div2" :style="{width:parseInt(item.Count/agencyCount*100)+'%'}"></div>
                </div> -->
                <div :title="item.value">{{item.value}}</div>
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
    name:'patentTube',
    props:['listData','yearData','numberData','categoryData','randomColor'],
    watch:{
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
        y_total:'',
        d_total:'',
        w_total:'',
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
      // 近10年专利申请数量统计柱状图
      drawCount(){
        let myChart2 = this.$echarts.init(document.getElementById('count'))
        var echartData = this.numberData ,
            option = {
               title: {
                text: '近10年专利申请数量统计',
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
                data: echartData,
              }]
            };
        myChart2.setOption(option)
      },
      //公司分布饼图
      drawAbreastLeft(){
        let myChart = this.$echarts.init(document.getElementById('abreastLeft'))
         let option = {
            title: {
                text: '专利类型',
                x: 'center',
                top:40,
                textStyle: {color: '#333333'}
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
              {
                name: '专利类型',
                type: 'pie',
                radius: '55%',
                center: ['50%', '55%'],
                // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}',
                data:this.categoryData,
                color:['#4AEAB0', '#FF8352', '#E271DE', '#F8456B'],
                label: {
                  normal: {
                      formatter: '{b|{b}}\n{hr|}\n{d|{d}%}',
                      rich: {
                          b: {
                              fontSize: 12,
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
                },
              }
            ]
        };
        myChart.setOption(option)
      },
      // 获取数据
      gitList(){
        const loading = this.$loading({
          lock: true,
          text: '获取中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)',
        });
        this.$http.post(this.GLOBAL.base_url+'/api/assets/index',{
          user_id:this.$cookie.getCookie('u_id'),
          company:this.$route.query.click_type,
          cate:'patent'
        }).then( res => {
          console.log(res)
          loading.close();
          if( res.data.code == 1) {
            this.loadshow = false;
            this.total = res.data.data.total
            this.y_total = res.data.data.y_total
            this.d_total = res.data.data.d_total
            this.w_total = res.data.data.w_total
            // 近10年专利申请数量统计柱状图数据
            var year = []
            var number = []
            for( let i in res.data.data.year) {
              year.push(i)
              number.push(res.data.data.year[i])
            }
            this.yearData = year
            this.numberData = number
            // 饼状图数据
            var category = []
            for(let i =0; i<res.data.data.data.length;i++) {
              category.push({
                name:res.data.data.data[i].source_name,
                value:res.data.data.data[i].num
              })
            }
            this.categoryData = category
            console.log(this.categoryData)
            // 随机颜色
//             var color = [];
//             for (var i = 0; i < this.categoryData.length; i++) {
//               var R = Math.floor(Math.random() * (255 - 0));
//               var G = Math.floor(Math.random() * (255 - 0));
//               var B = Math.floor(Math.random() * (255 - 0));
//               var colorItem = 'rgb(' + R + ',' + G + ',' + B + ')';
//               color.push(colorItem);
//             };
//             this.randomColor = color
            // 代理机构
            this.agencyList = res.data.data.agent
            this.agencyCount = res.data.data.agent.Count
          }
          if( res.data.code == 0) {
            loading.close();
            this.total = 0
            this.y_total =0
            this.d_total = 0
            this.w_total = 0
            this.listData = []
            this.yearData = [2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]
            this.numberData = []
            this.categoryData = []
            this.agencyList = []
            this.agencyCount = ''
          }
        })
      },
      patentSingle(val) {
        if(val == '专利总数') {
          this.$router.push({
            path:'/personal/patentSingle',
            query:{
              click_type:this.$route.query.click_type,
              text:'专利总数',
              id:''
            }
          })
        }
        if(val == '已授权专利') {
          this.$router.push({
            path:'/personal/patentSingle',
            query:{
              click_type:this.$route.query.click_type,
              text:'已授权专利',
              id:1
            }
          })
        }
        if(val == '无权专利数') {
          this.$router.push({
            path:'/personal/patentSingle',
            query:{
              click_type:this.$route.query.click_type,
              text:'无权专利数',
              id:2
            }
          })
        }
        if(val == '等待实质审查') {
          this.$router.push({
            path:'/personal/patentSingle',
            query:{
              click_type:this.$route.query.click_type,
              text:'等待实质审查',
              id:3
            }
          })
        }
      }
    },
    mounted(){
      this.drawCount();
      this.drawAbreastLeft();
      this.gitList()
    },
  }
</script>

<style scoped>
  .patentTube-box {
    min-height: 950px;
    width: 1015px;
    float: left;
    margin: 12px 0 0 16px;
    box-sizing: border-box;
    position: relative;
  }
  /* 标题 */
  .patentTube-title {
    height: 70px;
    background-color: #fff;
    line-height: 70px;
    margin-bottom: 16px;
  }
  .patentTube-title > img {
    float: left;
    margin: 23px 0px 0 20px;
  }
  .patentTube-center {
    font-family: "PingFangSC";
    font-size: 24px;
    color: #f96006 ;
    float: left;
    margin: 0 24px 0 19px;
    cursor: pointer;
  }
  .patentTube-line {
    width: 2px;
    height: 36px;
    background-color: #f96006;
    margin: 17px 18px 0px 0px;
    float: left;
  }
  .patentTube-text {
    font-family: "PingFangSC";
    font-size: 24px;
    color: #f96006 ;
    float: left;
  }
  .patentTube-right {
    float: right;
    font-family: "PingFangSC";
    font-size: 17px;
    color: #333;
    margin-right: 24px;
    font-weight: 500;
  }
  /* 导航 */
  .patentTube-navigation > ul {
    width: 1015px;
    padding: 0;
    list-style: none;
  }
  .patentTube-navigation > ul > li {
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
  .patentTube-navigation > ul > li:nth-child(4) {
    margin-right: 0px;
  }
  .patentTube-navigation > ul > li:nth-child(8) {
    margin-right: 0px;
  }
  .patentTube-navigation > ul > li > img {
    margin: 12px 0px 0px 0px;
    float: left;
  }
  .patentTube-navigation > ul > li > div {
    display: inline-block;
    width: 112px;
    margin-top: 26px;
  }
  .patentTube-navigation > ul > li > div > span{
    display: block;
  }
  .patentTube-navigation > ul > li > div > span:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color: #999999;
  }
  .patentTube-navigation > ul > li > div > span:nth-child(2) {
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
  /* 专利状态统计柱状图 */
  .patentTube-census {
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
  /* 近5年专利申请数量统计 */
  .patentTube-count {
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
  .patentTube-abreast-left {
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
  .patentTube-abreast-right {
    width: 500px;
    height: 400px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background-color: var(--white-two);
    float: right;
  }
  .patentTube-abreast-right > p {
    margin: 40px 0 31px 214px;
    font-family: "PingFangSC";
    font-size: 18px;
    font-weight: normal;
    color: #333333;
  }
  .patentTube-abreast-right > .patentTube-abreast-right-table {
    width: 457px;
    height: 280px;
    border: solid 1px #e4e4e4;
    margin-left: 20px;
  }
  .patentTube-abreast-right > .patentTube-abreast-right-table > div:nth-child(1) {
    height: 40px;
    line-height: 40px;
    border-bottom: solid 1px  #e4e4e4;
    box-sizing: border-box;
  }
  .patentTube-abreast-right > .patentTube-abreast-right-table > div:nth-child(1) > span {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color: #333333;
  }
  .patentTube-abreast-right > .patentTube-abreast-right-table > div:nth-child(1) > span:nth-child(1) {
    margin: 0px 30px 0 19px;
  }
  .patentTube-abreast-right > .patentTube-abreast-right-table > div:nth-child(1) > span:nth-child(2) {
    margin-left: 100px;
  }
  .patentTube-abreast-right > .patentTube-abreast-right-table > div:nth-child(1) > span:nth-child(3) {
    margin-left: 100px;
  }
  /* 列表 */
  .patentTube-abreast-right-table {
    position: relative;
  }
  .overshow {
    height: 240px;
    overflow: hidden;
    overflow-y: auto;
  }
  .patentTube-abreast-right-table-list {
    height: 40px;
    line-height: 40px;
    border-bottom: solid 1px  #e4e4e4;
    box-sizing: border-box;
  }
  .patentTube-abreast-right-table-list > div {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color: #333333;
  }
  .patentTube-abreast-right-table-list > div:first-child {
    margin: 0px 73px 0 30px;
    width: 16px;
    text-align: center;
  }
  .patentTube-abreast-right-table-list > div:nth-child(2) {
    width: 196px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 50px;
  }
  .patentTube-abreast-right-table-list > div:nth-child(3) {
    width: 43px;
    text-align: center;
  }
  .patentTube-abreast-right-table-list > div:nth-child(4) {
    margin: 17px 26px 0 8px;
  }
  .patentTube-abreast-right-table-list > div:nth-child(5) {
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
  .patentTube-abreast-right-table-foot {
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
