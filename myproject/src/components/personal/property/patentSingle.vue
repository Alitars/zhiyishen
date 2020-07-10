<template>
  <div class="patentSingle-container">
    <div class="patentSingle-box">
      <!-- 标题 -->
      <div class="patentSingle-title">
        <img src="/static/images/yuanqu21.png" alt="">
        <router-link class="patentSingle-center" tag="div" to="/personal/assetsManagement">知产管理</router-link>
        <!-- 竖线 -->
        <div class="patentSingle-line"></div>
        <!-- 专利文字 -->
        <div class="patentSingle-text">{{this.$route.query.text}}</div>
        <!-- 公司 -->
        <div class="patentSingle-right">{{this.$route.query.click_type}}</div>
      </div>
      <!-- 主体 -->
      <div class="patentSingle-main">
        <div>
          <span>专利名称</span>
          <input type="text" placeholder="请输入" v-model="name">
          <span>注册号</span>
          <input type="text" placeholder="请输入" v-model="no">
          <span @click="search">查询</span>
          <span @click="resetting">重置</span>
        </div>
        <div>
          <span>专利总数</span>
          <span>{{total}}</span>
          <span @click="assets">导出专利</span>
        </div>
        <!-- 展示 -->
        <div class="patentSingle-main-category">
          <el-checkbox  @change="selectProduct(isSelectAll)" v-model="isSelectAll" class="patentSingle-main-category-checked"></el-checkbox>
          <ul>
            <li>专利名称</li>
            <li>专利类型</li>
            <li>申请日期</li>
            <li>有效日期</li>
            <li>申请人</li>
            <li>专利状态</li>
            <li>操作</li>
          </ul>
        </div>
        <!-- 后台渲染数据 -->
        <div class="patentSingle-main-data" v-for="(item,index) in listData" :key="index">
          <el-checkbox v-model="item.isSelect" class="patentSingle-main-data-checked"></el-checkbox>
          <ul>
            <!-- <li @mouseenter="enter(index)">
              <img :src="'data:image/png;base64,'+item.BrandImg" alt=""  >
              <div v-show="imgShouw&&index==current"  @mouseleave="leave()">
                <img :src="'data:image/png;base64,'+item.BrandImg" alt="">
              </div>
            </li> -->
            <li :title="item.ti?item.ti:'无'">{{item.ti?item.ti:"无"}}</li>
            <li :title="item.source_name?item.source_name:'无'">{{item.source_name?item.source_name:'无' }}</li>
            <li :title="item.ad?item.ad:'无'">{{item.ad?item.ad:'无'}}</li>
            <li :title="item.effect_time?item.effect_time:'无'">{{item.effect_time?item.effect_time:'无'}}</li>
            <li :title="item.in?item.in:'无'">{{item.in?item.in:'无'}}</li>
            <!-- <li :title="item.AppNewName?item.AppNewName:'无'">{{item.AppNewName?item.AppNewName:'无'}}</li> -->
            <li :title="item.lsn1?item.lsn1:'无'">{{item.lsn1?item.lsn1:'无'}}</li>
            <li>
              <span @click="todetail(item.RegId,item.IntCls)">详情</span>
            </li>
          </ul>
        </div>
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
    name:'patentSingle',
    data(){
      return {
        // 分页
        currentPage1:1,
        pageSize:10,
        total:null,
        name:'',
        no:'',
        listData:[],
        imgShouw:false,
        current:0,
      }
    },
    methods:{
      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.currentPage1 = val;
        this.getData();
      },
      // 数据
      getData(){
        this.$http.post(this.GLOBAL.base_url+'/api/assets/getTypeList',{
          user_id:this.$cookie.getCookie('u_id'),
          company:this.$route.query.click_type,
          type:this.$route.query.id,
          name:this.name,
          no:this.no,
          page:this.currentPage1,
          len:this.pageSize,
          cate:'patent'
        }).then( res => {
          console.log(res)
          if(res.data.code == 1) {
            this.listData = res.data.data
            this.total = res.data.others
            let _this = this;
            this.listData.map(function (item) {
              _this.$set(item, 'isSelect', false);
            })
          }
            if( res.data.code == 0) {
              var kong =[];
              this.listData = kong;
            }
        })
      },
      // 改变单选状态
      selectProduct:function(_isSelect){
        for (var i = 0; i< this.listData.length; i++) {
          this.listData[i].isSelect = !_isSelect;
        }
      },
      // 查询
      search(){
        this.currentPage1 = 1
        this.getData()
      },
      // 重置
      resetting(){
        this.name = ''
        this.no = ''
        this.getData()
      },
      // 导出专利
      assets(){
        var prolist = this.listData.filter(function (val) { return val.isSelect});
        if(prolist.length == 0){
          this.$alert('请选择要导出的专利','温馨提醒',{
            confirmButtonText: '确定'
          })
           return false
        }
        var arr = ''
        for (var i = 0;i< prolist.length; i++) {
          arr+=prolist[i].id+',';
        }
        arr =  arr.substring(0,arr.length-1)
        this.$http.post(this.GLOBAL.base_url+'/api/assets/exportData',{
          user_id:this.$cookie.getCookie('u_id'),
          type:this.$route.query.id,
          no:arr,
          company:this.$route.query.click_type,
          cate:'patent'
        }).then( res => {
          if(res.data.code == 0 ) {
            this.$alert('暂无导出专利','温馨提醒',{
              confirmButtonText: '确定'
            })
          }
          if(res.data.code == 1) {
            window.location.href = this.GLOBAL.base_url+res.data.data
          }
        })
      },
      todetail(value1,value2){
        // let routeData = this.$router.resolve({
        //               path: '/searchdetail',
        //               query: {
        //                 RegId:value1,
        //                 IntCls:value2
        //                 }
        // });
        //   window.open(routeData.href, '_blank');
        },
      // 移入
      enter(index){
        this.current = index;
        this.imgShouw = true
      },
      // 移出
      leave(){
        this.current = null;
        this.imgShouw = false
      }
    },
    computed:{
      // 全选
       isSelectAll:{
        get:function(){
            if(this.listData !=0){
                return this.listData.every(function (val) { return val.isSelect});
            }else{
                return false;
            }
          },
          set: function(){
             if(this.listData !=0){
                return this.listData.every(function (val) { return val.isSelect});
            }else{
                return false;
            }
          }
      },
    },
    mounted(){

      this.getData()
    }
  }
</script>

<style scoped>
  .patentSingle-box {
    min-height: 950px;
    width: 1015px;
    float: left;
    margin: 12px 0 0 16px;
    box-sizing: border-box;
  }
  /* 标题 */
  .patentSingle-title {
    height: 70px;
    background-color: #fff;
    line-height: 70px;
    margin-bottom: 16px;
  }
  .patentSingle-title > img {
    float: left;
    margin: 23px 0px 0 20px;
  }
  .patentSingle-center {
    font-family: "PingFangSC";
    font-size: 24px;
    color: #f96006 ;
    float: left;
    margin: 0 24px 0 19px;
    cursor: pointer;
  }
  .patentSingle-line {
    width: 2px;
    height: 36px;
    background-color: #f96006;
    margin: 17px 18px 0px 0px;
    float: left;
  }
  .patentSingle-text {
    font-family: "PingFangSC";
    font-size: 24px;
    color: #f96006 ;
    float: left;
  }
  .patentSingle-right {
    float: right;
    font-family: "PingFangSC";
    font-size: 20px;
    color: #333;
    margin-right: 24px;
    font-weight: 600;
  }
  /* 主体 */
  .patentSingle-main {
    height: 978px;
    background-color: #fff;
    margin-bottom: 22px;
    padding-top: 1px;
    box-sizing: border-box;
    position: relative;
  }
  .patentSingle-main > div:first-child {
    margin:29px 0 24px 30px;
    height: 32px;
    line-height: 32px;
  }
  .patentSingle-main > div:first-child > span {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }
  .patentSingle-main > div:first-child > span:nth-child(1) {
    margin-right: 18px;
  }
  .patentSingle-main > div:first-child > input {
    width: 230px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    background-color:#fff;
    padding: 6px 0 6px 12px;
    box-sizing: border-box;
    margin-right: 30px;
  }
  .patentSingle-main > div:first-child > span:nth-child(3) {
    margin-right: 18px;
  }
  .patentSingle-main > div:first-child > span:nth-child(5) {
    margin-right: 25px;
    width: 80px;
    height: 32px;
    border-radius: 4px;
    background-color:#f96006;
    display: inline-block;
    line-height: 32px;
    text-align: center;
    color: #fff;
  }
  .patentSingle-main > div:first-child > span:nth-child(6) {
    width: 80px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #f96006;
    background-color:#fbefe9;
    display: inline-block;
    line-height: 32px;
    text-align: center;
    color: #f96006;
  }
  .patentSingle-main > div:nth-child(2) {
    margin:29px 0 24px 30px;
    height: 32px;
    line-height: 32px;
    border: solid 1px #eeeeee;
    background-color: #fafafa;
    box-sizing: border-box;
    width: 955px;
  }
  .patentSingle-main > div:nth-child(2) > span {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }
  .patentSingle-main > div:nth-child(2) > span:nth-child(1) {
    margin-right: 18px;
    margin-left: 36px;
  }
  .patentSingle-main > div:nth-child(2) > span:nth-child(2) {
    font-size: 16px;
    color: #f96006;
    font-weight: 600;
  }
  .patentSingle-main > div:nth-child(2) > span:nth-child(3) {
    width: 80px;
    height: 32px;
    border-radius: 4px;
    background-color:#f96006;
    line-height: 32px;
    text-align: center;
    color: #fff;
    float: right;
  }
  /* 展示 */
  .patentSingle-main-category {
    width: 953px;
    height: 36px;
    background-color: #fafafa;
    margin-left: 31px;
    border: solid 1px #eeeeee;
    line-height: 36px;
  }
  .patentSingle-main-category > .patentSingle-main-category-checked {
    margin: 0px 0px 0px 20px;
    float: left;
  }
  .patentSingle-main-category > ul {
    padding: 0;
    list-style: none;
  }
  .patentSingle-main-category > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-left: 28px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .patentSingle-main-category > ul > li:nth-child(1) {
    width: 60px;
    text-align: center;
  }
  .patentSingle-main-category > ul > li:nth-child(2) {
    width: 98px;
    text-align: center;
  }
  .patentSingle-main-category > ul > li:nth-child(3) {
    width: 93px;
    text-align: center;
  }
  .patentSingle-main-category > ul > li:nth-child(4) {
    width: 130px;
    text-align: center;
  }
  .patentSingle-main-category > ul > li:nth-child(5) {
    width: 130px;
    text-align: center;
  }
  .patentSingle-main-category > ul > li:nth-child(6) {
    width: 75px;
    text-align: center;
  }
  .patentSingle-main-category > ul > li:nth-child(7) {
    width: 112px;
    text-align: center;
  }
  .patentSingle-main-category > ul > li:nth-child(8) {
    width: 70px;
    text-align: center;
    margin-left: 12px;
  }
  .patentSingle-main-category > ul > li:nth-child(9) {
    width: 56px;
    text-align: center;
    margin-left: 12px;
  }
  .patentSingle-main-category > ul > li:nth-child(10) {
    width: 68px;
    text-align: center;
  }
  /* 后台渲染数据 */
  .patentSingle-main-data {
    width: 953px;
    height: 68px;
    margin-left: 31px;
    border: solid 1px #eeeeee;
    line-height: 68px;
    border-top: none ;
  }
  .patentSingle-main-data > .patentSingle-main-data-checked {
    margin: 0px 0px 0px 20px;
    float: left;
  }
  .patentSingle-main-data > ul {
    padding: 0;
    list-style: none;
    position: relative;
  }
  .patentSingle-main-data > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #333;
    margin-left: 28px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .patentSingle-main-data > ul > li:nth-child(1) {
    width: 60px;
    height: 60px;
    margin-top: 4px;
    box-sizing: border-box;
    text-align: center;
  }
  .patentSingle-main-data > ul > li:nth-child(1) > img {
    width: 60px;
    height: 60px;
  }
  .patentSingle-main-data > ul > li:nth-child(1)>div {
    width: 180px;
    height: 180px;
    position: absolute;
    top: 0;
    left: 64px;
    z-index: 22;
  }

  .patentSingle-main-data > ul > li:nth-child(1)>div>img {
    width: 180px;
    height: 180px;
  }
  .patentSingle-main-data > ul > li:nth-child(2) {
    width: 98px;
    text-align: center;
  }
  .patentSingle-main-data > ul > li:nth-child(3) {
    width: 93px;
    text-align: center;
  }
  .patentSingle-main-data > ul > li:nth-child(4) {
    width: 130px;
    text-align: center;
  }
  .patentSingle-main-data > ul > li:nth-child(5) {
    width: 130px;
    text-align: center;
  }
  .patentSingle-main-data > ul > li:nth-child(6) {
    width: 75px;
    text-align: center;
  }
  .patentSingle-main-data > ul > li:nth-child(7) {
    width: 112px;
    text-align: center;
  }
  .patentSingle-main-data > ul > li:nth-child(8) {
    width: 70px;
    text-align: center;
    margin-left: 12px;

  }
  .patentSingle-main-data > ul > li:nth-child(9) {
    width: 56px;
    text-align: center;
    margin-left: 12px;
  }
  .patentSingle-main-data > ul > li:nth-child(7) > span:nth-child(1) {
    color: gray;
    cursor: default;
  }
  /* 分页 */
  .patentSingle-main > .block {
    position: absolute;
    bottom: 50px;
    right: 28px;
  }
</style>
