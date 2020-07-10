<template>
  <div class="assetsManagement-container">
    <div class="assetsManagement-box">
      <!-- 标题 -->
      <div class="assetsManagement-title">
        <img src="/static/images/yuanqu21.png" alt="">
        <router-link class="assetsManagement-center" tag="div" to="/personal">个人中心</router-link>
        <!-- <div class="assetsManagement-center" tag="div" to="/personal">个人中心</div> -->
        <!-- 竖线 -->
        <div class="assetsManagement-line"></div>
        <!-- 商标文字 -->
        <div class="assetsManagement-text">知产管理</div>
        <!-- 公司 -->
        <div class=""></div>
      </div>
      <!-- 导航 -->
      <div class="assetsManagement-navigation">
        <p>商标统计</p>
        <ul>
          <li>
            <img src="/static/images/100.png" alt="">
          </li>
          <li @click="trade1">
            <p>商标总数</p>
            <p>{{total1}}</p>
          </li>
          <li @click="trade2">
            <p>已注册商标</p>
            <p>{{zc_total}}</p>
          </li>
          <li @click="trade3">
            <p>申请中商标</p>
            <p>{{app_total}}</p>
          </li>
          <li @click="trade4">
            <p>续展期中商标</p>
            <p>{{xz_total}}</p>
          </li>
          <li @click="trade5">
            <p>	宽展中商标</p>
            <p>{{k_total}}</p>
          </li>
          <li @click="trade6">
            <p>	无效商标</p>
            <p>{{wx_total}}</p>
          </li>
        </ul>
      </div>
      <div style="clear :both"></div>
      <!-- 商标状态统计柱状图 -->
      <div class="assetsManagement-census">
         <div id="trademark"></div>
      </div>
      <!-- 专利导航 -->
      <div class="assetsManagement-navigation">
        <p>专利统计</p>
        <ul>
          <li class="m0">
            <img class="imgzl19" src="/static/images/zl19.png" alt="">
          </li>
          <li @click="patentAll('专利总数')">
            <p>专利总数</p>
            <p>{{patentTotal}}</p>
          </li>
          <li @click="patentAll('已授权专利')">
            <p>已授权专利</p>
            <p>{{y_total}}</p>
          </li>
          <li @click="patentAll('等待实质审查')">
            <p>等待实质审查</p>
            <p>{{d_total}}</p>
          </li>
          <li @click="patentAll('无权专利数')">
            <p>无权专利数</p>
            <p>{{w_total}}</p>
          </li>
        </ul>
      </div>
      <div style="clear :both"></div>
      <!-- 专利状态统计柱状图 -->
      <div class="assetsManagement-census">
         <div id="patentMack"></div>
      </div>
      <!-- 已认证企业 -->
      <div class="assetsManagement-count">
        <p>已认证企业{{count}}家</p>
        <div class="assetsManagement-count-search">
          <span>企业名称</span>
          <input type="text" v-model="company">
          <span @click="search">查询</span>
          <span @click="resetting">重置</span>
        </div>
        <!-- 展示 -->
        <div class="assetsManagement-main-category">
          <!-- <el-checkbox  @change="selectProduct(isSelectAll)" class="assetsManagement-main-category-checked"></el-checkbox> -->
          <ul>
            <li>序号</li>
            <li>企业名称</li>
            <li>商标数量</li>
            <li>管理</li>
          </ul>
        </div>
        <!-- 后台渲染数据 -->
        <div class="assetsManagement-main-data" v-for="(item,index) in agentData" :key="index">
          <!-- <el-checkbox v-model="item.isSelect" class="assetsManagement-main-data-checked"></el-checkbox> -->
          <ul>
            <li>{{index+1}}</li>
            <li :title="item.name">{{item.name}}</li>
            <li>{{item.num?item.num:'0'}}</li>
            <li>
              <span @click="bayer(item.name)">商标</span>
              <span>|</span>
              <span @click="patentTube(item.name)">专利</span>
            </li>
          </ul>
        </div>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             :current-page="currentPage1"
             :page-size="pageSize"
             layout="total,prev, pager, next"
             :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div style="clear :both"></div>
  </div>
</template>

<script>
  export default {
    name:'assetsManagement',
    props:['listData','yearData','numberData',],
    data(){
      return {
        currentPage1:1,
        pageSize:5,
        total:null,
        total1:'',
        zc_total:'',
        app_total:'',
        cs_total:'',
        yy_total:'',
        k_total:'',
        wx_total:'',
        xz_total:'',
        // 专利数据
        patentTotal:'',
        y_total:'',
        d_total:'',
        w_total:'',
        // 公司
        agentData:[],
        company:'',
        count:0
      }
    },
    watch:{
      listData:{
        handler(newVal, oldVal) {
          //console.log("更新数据")
          this.drawTrademark()
         },
         deep: true
      },
      yearData:{
        handler(newVal, oldVal) {
          this.drawTrademark1()
        },
         deep: true
      },
      numberData:{
        handler(newVal, oldVal) {
          this.drawTrademark1()
        },
         deep: true
      },
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
      drawTrademark(){
        let myTrademark = this.$echarts.init(document.getElementById('trademark'))
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
                          if(percent !== NaN) {
                            percent = 0
                          }
                          return '' + params.name + '\n\n' + params.value + '个，' + '' + percent + '%';
                      },
                    }
                  }
                },
                data: this.listData,
              }]
            };
        myTrademark.setOption(option)
      },
      // 分页
      handleSizeChange(val){
        this.pageSize = val;
        this.agent();
      },
      handleCurrentChange(val){
        this.currentPage1 = val;
        this.agent();
      },
      // 数据
      gitData(){
        const loading = this.$loading({
          lock: true,
          text: '获取中',
          spinner: 'el_icon-loading',
          background: 'rgba(0, 0, 0, 0.3)'
        })
        this.$http.post(this.GLOBAL.base_url+'/api/assets/index',{
          user_id:this.$cookie.getCookie('u_id'),
        }).then( res => {
          // console.log(res)
          if(res.data.code == 1) {
            loading.close();
            this.total1 = res.data.data.total
            this.zc_total = res.data.data.zc_total
            this.app_total = res.data.data.app_total
            this.cs_total = res.data.data.cs_total
            this.xz_total  = res.data.data.xz_total
            this.k_total = res.data.data.k_total
            this.wx_total = res.data.data.wx_total
            this.yy_total = res.data.data.yy_total
            // 商标状态统计柱状图
            this.listData = [this.zc_total,this.app_total,this.cs_total,this.yy_total,this.k_total,this.wx_total]
          }
          if( res.data.code == 0) {
            loading.close();
            this.total = 0
            this.zc_total = 0
            this.app_total = 0
            this.cs_total = 0
            this.xz_total  = 0
            this.k_total = 0
            this.wx_total = 0
            this.yy_total = 0
            this.listData = []
          }
        })
      },
      // 数据
      patentData(){
        const loading = this.$loading({
          lock: true,
          text: '获取中',
          spinner: 'el_icon-loading',
          background: 'rgba(0, 0, 0, 0.3)'
        })
        this.$http.post(this.GLOBAL.base_url+'/api/assets/index',{
          user_id:this.$cookie.getCookie('u_id'),
          cate:'patent'
        }).then( res => {
          // console.log(res)
          if(res.data.code == 1) {
            this.loadshow = false;
            this.patentTotal = res.data.data.total
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
          }
          if( res.data.code == 0) {
            loading.close();
            this.patentTotal = 0
            this.y_total = 0
            this.d_total = 0
            this.w_total = 0
            this.yearData = [2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]
            this.numberData = []
          }
        })
      },
      // 商标公司数据
      agent(){
        this.$http.post(this.GLOBAL.base_url+'/api/assets/companyList',{
          user_id:this.$cookie.getCookie('u_id'),
          page:this.currentPage1,
          company:this.company,
          len:this.pageSize
        }).then( res => {
          // console.log( res)
          if( res.data.code == 1) {
            this.agentData = res.data.data.data
            this.total = res.data.data.count
            this.count = res.data.data.count
            let _this = this;
            this.agentData.map(function (item) {
              _this.$set(item, 'isSelect', false);
            })
          }
          if( res.data.code == 0) {
            var kong =[];
            this.agentData = kong;
          }
        })
      },
      // 查询
      search(){
        this.currentPage1 = 1
        this.agent()
      },
      // 重置
      resetting(){
        this.company = ''
        this.agent()
      },
      // 跳转公司商标
      bayer(val) {
        this.$router.push({
          path:'/personal/totalTrademark',
          query:{
            click_type:val
          }
        })
      },
      // 跳转公司专利
      patentTube(val) {
        this.$router.push({
          path:'/personal/patentTube',
          query:{
            click_type:val
          }
        })
      },
      // 跳转总的商标
      trade1(){
        this.$router.push({
          path:'/personal/companiesAll',
          query:{
            click_type:this.$route.query.click_type,
            text:'商标总数',
            id:'0'
          }
        })
      },
      trade2(){
        this.$router.push({
          path:'/personal/companiesAll',
          query:{
            click_type:this.$route.query.click_type,
            text:'已注册商标',
            id:'1'
          }
        })
      },
      trade3(){
        this.$router.push({
          path:'/personal/companiesAll',
          query:{
            click_type:this.$route.query.click_type,
            text:'申请中商标',
            id:'8'
          }
        })
      },
      trade4(){
        this.$router.push({
          path:'/personal/companiesAll',
          query:{
            click_type:this.$route.query.click_type,
            text:'续展期中商标',
            id:'7'
          }
        })
      },
      trade5(){
        this.$router.push({
          path:'/personal/companiesAll',
          query:{
            click_type:this.$route.query.click_type,
            text:'宽展中商标',
            id:'9'
          }
        })
      },
      trade6(){
        this.$router.push({
          path:'/personal/companiesAll',
          query:{
            click_type:this.$route.query.click_type,
            text:'无效商标',
            id:'5'
          }
        })
      },
      // 专利统计柱状图
      drawTrademark1(){
        let myTrademark1 = this.$echarts.init(document.getElementById('patentMack'))
        var echartData = this.numberData,
            option = {
               title: {
                text: '近五年专利申请量',
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
                          "#6d97ff","#6d97ff","#6d97ff","#6d97ff","#6d97ff","#6d97ff","#6d97ff","#6d97ff","#6d97ff","#6d97ff",
                      ];
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
                          if(percent !== NaN) {
                            percent = 0
                          }
                          return '' + params.name + '\n' + params.value + '个，' + '' + percent + '%';
                      },
                    }
                  }
                },
                data: echartData,
              }]
            };
        myTrademark1.setOption(option)
      },
      // 跳转公司专利详情
      patentAll(val) {
        if(val == '专利总数') {
          this.$router.push({
            path:'/personal/patentAll',
            query:{
              click_type:this.$route.query.click_type,
              text:'专利总数',
              id:''
            }
          })
        }
        if(val == '已授权专利') {
          this.$router.push({
            path:'/personal/patentAll',
            query:{
              click_type:this.$route.query.click_type,
              text:'已授权专利',
              id:'1'
            }
          })
        }
        if(val == '无权专利数') {
          this.$router.push({
            path:'/personal/patentAll',
            query:{
              click_type:this.$route.query.click_type,
              text:'无权专利数',
              id:'2'
            }
          })
        }
        if(val == '等待实质审查') {
          this.$router.push({
            path:'/personal/patentAll',
            query:{
              click_type:this.$route.query.click_type,
              text:'等待实质审查',
              id:'4'
            }
          })
        }
      }
    },
    computed:{
      // 全选S
    },
    mounted(){
      this.gitData()
      this.patentData()
      this.drawTrademark()
      this.drawTrademark1()
      this.agent()
    },
  }
</script>

<style scoped>
  .assetsManagement-box {
    min-height: 1024px;
    width: 1015px;
    float: left;
    margin: 12px 0 0 16px;
    box-sizing: border-box;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  /* 标题 */
  .assetsManagement-title {
    height: 70px;
    background-color: #fff;
    line-height: 70px;
    margin-bottom: 16px;
  }
  .assetsManagement-title > img {
    float: left;
    margin: 23px 0px 0 20px;
  }
  .assetsManagement-center {
    font-family: "PingFangSC";
    font-size: 24px;
    color: #f96006 ;
    float: left;
    margin: 0 24px 0 19px;
    cursor: pointer;
  }
  .assetsManagement-line {
    width: 2px;
    height: 36px;
    background-color: #f96006;
    margin: 17px 18px 0px 0px;
    float: left;
  }
  .assetsManagement-text {
    font-family: "PingFangSC";
    font-size: 24px;
    color: #f96006 ;
    float: left;
  }
  /* 导航 */
  .assetsManagement-navigation {
    width: 1015px;
    height: 217px;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background-color:white;
    padding-top: 1px;
    box-sizing: border-box;
    margin-bottom: 16px;
  }
  .assetsManagement-navigation > p {
    text-align: center;
    margin-top: 39px;
    margin-bottom: 20px;
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333333;
  }
  .assetsManagement-navigation > ul {
    width: 1015px;
    padding: 0;
    list-style: none;
  }
  .assetsManagement-navigation > ul > li {
    float: left;
    cursor: pointer;
  }
  .assetsManagement-navigation > ul > li:first-child {
    margin: 19px 39px 0 39px;
  }
  .assetsManagement-navigation > ul > li:first-child > img{
    width: 72px;
    height: 73px;
  }
  .assetsManagement-navigation > ul > li:nth-child(2) {
    margin: 27px 0 0 0;
    width: 129px;
    height: 60px;
    border-right: 2px solid #f96006;
  }
  .assetsManagement-navigation > ul > li:nth-child(2) > p:first-child{
    margin: 6px 0 10px;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color: #999;
  }
  .assetsManagement-navigation > ul > li:nth-child(2) > p:nth-child(2){
    font-family: "PingFangSC";
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    color: #333;
  }
  .assetsManagement-navigation > ul > li:nth-child(3) {
    margin: 27px 0 0 0;
    width: 151px;
    height: 60px;
    border-right: 2px solid #f4f4f4;
    padding-left: 40px;
    box-sizing: border-box;
  }
  .assetsManagement-navigation > ul > li:nth-child(3) > p:first-child{
    margin: 6px 0 10px;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color: #999;
  }
  .assetsManagement-navigation > ul > li:nth-child(3) > p:nth-child(2){
    font-family: "PingFangSC";
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    color: #333;
  }
  .assetsManagement-navigation > ul > li:nth-child(4) {
    margin: 27px 0 0 0;
    width: 142px;
    height: 60px;
    border-right: 2px solid #f4f4f4;
    padding-left: 31px;
    box-sizing: border-box;
  }
  .assetsManagement-navigation > ul > li:nth-child(4) > p:first-child{
    margin: 6px 0 10px;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color: #999;
  }
  .assetsManagement-navigation > ul > li:nth-child(4) > p:nth-child(2){
    font-family: "PingFangSC";
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    color: #333;
  }
  .assetsManagement-navigation > ul > li:nth-child(5) {
    margin: 27px 0 0 0;
    width: 142px;
    height: 60px;
    border-right: 2px solid #f4f4f4;
    padding-left: 31px;
    box-sizing: border-box;
  }
  .assetsManagement-navigation > ul > li:nth-child(5) > p:first-child{
    margin: 6px 0 10px;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color: #999;
  }
  .assetsManagement-navigation > ul > li:nth-child(5) > p:nth-child(2){
    font-family: "PingFangSC";
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    color: #333;
  }.assetsManagement-navigation > ul > li:nth-child(6) {
    margin: 27px 0 0 0;
    width: 142px;
    height: 60px;
    border-right: 2px solid #f4f4f4;
    padding-left: 31px;
    box-sizing: border-box;
  }
  .assetsManagement-navigation > ul > li:nth-child(6) > p:first-child{
    margin: 6px 0 10px;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color: #999;
  }
  .assetsManagement-navigation > ul > li:nth-child(6) > p:nth-child(2){
    font-family: "PingFangSC";
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    color: #333;
  }.assetsManagement-navigation > ul > li:nth-child(7) {
    margin: 27px 0 0 0;
    width: 142px;
    height: 60px;
    padding-left: 31px;
    box-sizing: border-box;
  }
  .assetsManagement-navigation > ul > li:nth-child(7) > p:first-child{
    margin: 6px 0 10px;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: normal;
    color: #999;
  }
  .assetsManagement-navigation > ul > li:nth-child(7) > p:nth-child(2){
    font-family: "PingFangSC";
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    color: #333;
  }
  /* 商标状态统计柱状图 */
  .assetsManagement-census {
    width: 1015px;
    height: 510px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background-color:white;
    margin-bottom: 16px;
  }
  #trademark {
    width: 1015px;
    height: 510px;
  }
  /* 已认证企业 */
  .assetsManagement-count {
    width: 1015px;
    height: 552px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background-color:white;
    margin-bottom: 16px;
    padding-top: 1px;
    position: relative;
  }
 .assetsManagement-count > p {
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333;
    text-align: center;
    margin: 39px 0 30px 0;
 }
 .assetsManagement-count  > .assetsManagement-count-search {
   margin-left: 30px;
   margin-bottom: 30px;
 }
 .assetsManagement-count  > .assetsManagement-count-search > span{
    font-family: "PingFangSC";
    font-size: 14px;
    margin-right: 20px;
 }
 .assetsManagement-count  > .assetsManagement-count-search > input{
    width: 230px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    background-color:#fff;
    padding: 6px 0 6px 12px;
    box-sizing: border-box;
    margin-right: 30px;
 }
 .assetsManagement-count  > .assetsManagement-count-search > span:nth-child(3){
    margin-right: 25px;
    width: 80px;
    height: 32px;
    border-radius: 4px;
    background-color:#f96006;
    display: inline-block;
    line-height: 32px;
    text-align: center;
    color: #fff;
    cursor: pointer;
 }
 .assetsManagement-count  > .assetsManagement-count-search > span:nth-child(4){
    width: 80px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #f96006;
    background-color:#fbefe9;
    display: inline-block;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
    color: #f96006;
 }
 /* 公司 */
 .assetsManagement-main-category {
    width: 953px;
    height: 36px;
    background-color: #fafafa;
    margin-left: 31px;
    border: solid 1px #eeeeee;
    line-height: 36px;
  }
  .assetsManagement-main-category > .assetsManagement-main-category-checked {
    margin: 0px 0px 0px 20px;
    float: left;
  }
  .assetsManagement-main-category > ul {
    padding: 0;
    list-style: none;
  }
  .assetsManagement-main-category > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 600;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .assetsManagement-main-category > ul > li:first-child {
    margin-right: 114px;
    width: 29px;
    margin-left: 40px;
  }
  .assetsManagement-main-category > ul > li:nth-child(2) {
    margin-right: 139px;
    width: 138px;
    text-align: center;
  }
  .assetsManagement-main-category > ul > li:nth-child(3) {
    margin-right: 177px;
    width: 138px;
    text-align: center;
  }
  .assetsManagement-main-category > ul > li:nth-child(4) {
    width: 138px;
    text-align: center;
  }
  /* 后台渲染数据 */
  .assetsManagement-main-data{
    width: 953px;
    height: 50px;
    background-color: #fff;
    margin-left: 31px;
    border: solid 1px #eeeeee;
    line-height: 50px;
    border-top: none;
  }
  .assetsManagement-main-data> .assetsManagement-main-data-checked {
    margin: 0px 0px 0px 20px;
    float: left;
  }
  .assetsManagement-main-data> ul {
    padding: 0;
    list-style: none;
  }
  .assetsManagement-main-data> ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .assetsManagement-main-data> ul > li:first-child {
    margin-right: 114px;
    width: 29px;
    margin-left: 40px;
    text-align: center;
  }
  .assetsManagement-main-data> ul > li:nth-child(2) {
    margin-right: 139px;
    width: 138px;
    text-align: center;
  }
  .assetsManagement-main-data> ul > li:nth-child(3) {
    margin-right: 177px;
    width: 138px;
    text-align: center;
  }
  .assetsManagement-main-data> ul > li:nth-child(4) {
    width: 138px;
    text-align: center;
  }
  .assetsManagement-main-data> ul > li:nth-child(4) > span:nth-child(1) {
    color:  #d0021b;
    cursor: pointer;
  }
  .assetsManagement-main-data> ul > li:nth-child(4) > span:nth-child(3) {
    color: #4a90e2;
    cursor: pointer;
  }
  /* 分页 */
  .block {
    position: absolute;
    bottom: 50px;
    right: 28px;
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
   top: 57%;
   left: 50%;
   margin-top: -77%;
   margin-left: -26%;
 }
 .imgzl19 {
   width: 150px !important;
   height: 112px !important;
 }
 .m0 {
   margin: 0 !important;
 }
  #patentMack {
    width: 1015px;
    height: 510px;
  }
</style>
