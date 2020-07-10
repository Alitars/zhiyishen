<template>
  <div class="companiesAll-container">
    <div class="companiesAll-box">
      <!-- 标题 -->
      <div class="companiesAll-title">
        <img src="/static/images/yuanqu21.png" alt="">
        <router-link class="companiesAll-center" tag="div" to="/personal/assetsManagement">知产管理</router-link>
        <!-- <div class="companiesAll-center" tag="div" to="/personal">个人中心</div> -->
        <!-- 竖线 -->
        <div class="companiesAll-line"></div>
        <!-- 商标文字 -->
        <div class="companiesAll-text">{{this.$route.query.text}}</div>
        <!-- 公司 -->
        <div class=""></div>
      </div>
      <!-- 主体 -->
      <div class="companiesAll-min">
        <!-- 查询 -->
        <div class="companiesAll-min-search">
          <span>企业名称</span>
          <input type="text" v-model="company">
          <span @click="search">查询</span>
          <!-- <span @click="resetting">重置</span> -->
        </div>
        <!-- 总数 -->
        <div class="companiesAll-min-total">
          <p>i</p>
          <p>商标总数{{count}}个</p>
          <p @click="assets">导出商标</p>
        </div>
        <!-- 展示 -->
        <div class="companiesAll-min-category">
          <!-- <el-checkbox  v-model="isSelectAll" @change="selectProduct(isSelectAll)" class="companiesAll-min-category-checked"></el-checkbox> -->
          <ul>
            <li>序号</li>
            <li>企业名称</li>
            <li>{{this.$route.query.text}}数量</li>
            <li>管理</li>
          </ul>
        </div>
        <!-- 后台渲染数据 -->
        <div class="companiesAll-min-data" v-for="(item,index) in agentData" :key="index">
          <el-checkbox v-model="item.isSelect" class="companiesAll-min-data-checked"></el-checkbox>
          <ul>
            <li>{{index+1}}</li>
            <li :title="item.name">{{item.name}}</li>
            <li>{{item.num?item.num:'0'}}</li>
            <li>
              <span v-if="item.num != null" @click="bayer(item.name)">查看详情</span>
              <span v-if="item.num == null" class="gray">查看详情</span>
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
  name:'companiesAll',
  data(){
    return {
      company:'',
      agentData:[],
      currentPage1:1,
      pageSize:10,
      total:0,
      count:0
    }
  },
  methods:{
    // 查询
    search() {
      this.currentPage1 = 1
      this.agent()
    },
    // 跳转
    bayer(val) {
      this.$router.push({
          path:'/personal/extension',
          query:{
            click_type:val,
            text:this.$route.query.text,
            id:this.$route.query.id
          }
        })
    },
    // 改变单选状态
    selectProduct:function(_isSelect){
      for (var i = 0; i< this.agentData.length; i++) {
        this.agentData[i].isSelect = !_isSelect;
      }
    },
    // 公司数据
    agent(){
      this.$http.post(this.GLOBAL.base_url+'/api/assets/companyList',{
        user_id:this.$cookie.getCookie('u_id'),
        page:this.currentPage1,
        company:this.company,
        len:this.pageSize,
        type:this.$route.query.id
      }).then( res => {
        // console.log( res)
        if( res.data.code == 1) {
          this.agentData = res.data.data.data
          this.total = res.data.data.count
          let _this = this;
          this.agentData.map(function (item) {
            _this.$set(item, 'isSelect', false);
          }),
          this.count = res.data.data.brand
        }
        if( res.data.code == 0) {
          var kong =[];
          this.agentData = kong;
        }
      })
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
      // 导出商标
      assets(){
        var prolist = this.agentData.filter(function (val) { return val.isSelect});
        if(prolist.length == 0){
          this.$alert('请选择要导出的商标','温馨提醒',{
            confirmButtonText: '确定'
          })
           return false
        }
        if(prolist.length > 1){
          this.$alert('只能选择单个导出','温馨提醒',{
            confirmButtonText: '确定'
          })
           return false
        }
        var arr = ''
        for (var i = 0;i< prolist.length; i++) {
          arr+=prolist[i].name+',';
        }
        arr =  arr.substring(0,arr.length-1)
        this.$http.post(this.GLOBAL.base_url+'/api/assets/exportData',{
          user_id:this.$cookie.getCookie('u_id'),
          type:this.$route.query.id,
          company:arr,
        }).then( res => {
          // console.log(res)
          window.location.href = this.GLOBAL.base_url+res.data.data
        })
      },
  },
  computed:{
    // 全选S
    isSelectAll:{
      get:function(){
          if(this.agentData !=0){
              return this.agentData.every(function (val) { return val.isSelect});
          }else{
              return false;
          }
        },
        set: function(){
           if(this.agentData !=0){
              return this.agentData.every(function (val) { return val.isSelect});
          }else{
              return false;
          }
        }
    },
  },
  mounted(){
    this.agent()
    // document.onselectstart = function () { return false; }
  },
}
</script>

<style scoped>
  .companiesAll-box {
    min-height: 1024px;
    width: 1015px;
    float: left;
    margin: 12px 0 0 16px;
    box-sizing: border-box;
    position: relative;
  }
  /* 标题 */
  .companiesAll-title {
    height: 70px;
    background-color: #fff;
    line-height: 70px;
    margin-bottom: 16px;
  }
  .companiesAll-title > img {
    float: left;
    margin: 23px 0px 0 20px;
  }
  .companiesAll-center {
    font-family: "PingFangSC";
    font-size: 24px;
    color: #f96006 ;
    float: left;
    margin: 0 24px 0 19px;
    cursor: pointer;
  }
  .companiesAll-line {
    width: 2px;
    height: 36px;
    background-color: #f96006;
    margin: 17px 18px 0px 0px;
    float: left;
  }
  .companiesAll-text {
    font-family: "PingFangSC";
    font-size: 24px;
    color: #f96006 ;
  }
  /* 主体 */
  .companiesAll-min {
    width: 1015px;
    height: 960px;
    background-color: #fff;
    margin-top: 16px;
    padding-top: 30px;
    box-sizing: border-box;
  }
  /* 查询 */
  .companiesAll-min  > .companiesAll-min-search {
    margin-left: 30px;
    margin-bottom: 30px;
  }
  .companiesAll-min  > .companiesAll-min-search > span{
     font-family: "PingFangSC";
     font-size: 14px;
     margin-right: 20px;
  }
  .companiesAll-min  > .companiesAll-min-search > input{
     width: 230px;
     height: 32px;
     border-radius: 4px;
     border: solid 1px #d6d6d6;
     background-color:#fff;
     padding: 6px 0 6px 12px;
     box-sizing: border-box;
     margin-right: 30px;
  }
  .companiesAll-min  > .companiesAll-min-search > span:nth-child(3){
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
  .companiesAll-min  > .companiesAll-min-search > span:nth-child(4){
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
  /*  */
  .companiesAll-min-total {
    width: 955px;
    height: 36px;
    border: solid 1px #eeeeee;
    background-color: #fafafa;
    margin: 0 auto;
    margin-bottom: 16px;
  }
  .companiesAll-min-total > p {
    float: left;
    font-family: 'PingFangSC';
  }
  .companiesAll-min-total > p:nth-child(1) {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #f96006;
    text-align: center;
    line-height: 14px;
    color: #fff;
    margin-top: 12px;
    font-size: 12px;
    margin-left: 16px;
    margin-right: 6px;
  }
  .companiesAll-min-total > p:nth-child(2) {
    font-size: 14px;
    font-weight: 100;
    color: #333;
    height: 36px;
    line-height: 36px;
  }
  .companiesAll-min-total > p:nth-child(3) {
    font-size: 14px;
    float: right;
    font-weight: 100;
    color: #f96006;
    height: 36px;
    line-height: 36px;
    margin-right: 32px;
    cursor: pointer;
  }
 /* 公司 */
 .companiesAll-min-category {
    width: 955px;
    height: 36px;
    background-color: #fafafa;
    margin: 0 auto;
    border: solid 1px #eeeeee;
    line-height: 36px;
  }
  .companiesAll-min-category > .companiesAll-min-category-checked {
    margin: 0px 0px 0px 20px;
    float: left;
  }
  .companiesAll-min-category > ul {
    padding: 0;
    list-style: none;
    margin-left: 32px;
  }
  .companiesAll-min-category > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 600;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .companiesAll-min-category > ul > li:first-child {
    margin-right: 114px;
    width: 29px;
    margin-left: 40px;
  }
  .companiesAll-min-category > ul > li:nth-child(2) {
    margin-right: 139px;
    width: 138px;
    text-align: center;
  }
  .companiesAll-min-category > ul > li:nth-child(3) {
    margin-right: 177px;
    width: 138px;
    text-align: center;
  }
  .companiesAll-min-category > ul > li:nth-child(4) {
    width: 138px;
    text-align: center;
  }
  /* 后台渲染数据 */
  .companiesAll-min-data{
    width: 955px;
    height: 50px;
    background-color: #fff;
    margin: 0 auto;
    border: solid 1px #eeeeee;
    line-height: 50px;
    border-top: none;
  }
  .companiesAll-min-data> .companiesAll-min-data-checked {
    margin: 0px 0px 0px 20px;
    float: left;
  }
  .companiesAll-min-data> ul {
    padding: 0;
    list-style: none;
  }
  .companiesAll-min-data> ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .companiesAll-min-data> ul > li:first-child {
    margin-right: 114px;
    width: 29px;
    margin-left: 40px;
    text-align: center;
  }
  .companiesAll-min-data> ul > li:nth-child(2) {
    margin-right: 139px;
    width: 138px;
    text-align: center;
  }
  .companiesAll-min-data> ul > li:nth-child(3) {
    margin-right: 177px;
    width: 138px;
    text-align: center;
  }
  .companiesAll-min-data> ul > li:nth-child(4) {
    width: 138px;
    text-align: center;
  }
  .companiesAll-min-data> ul > li:nth-child(4) > span:nth-child(1) {
    color: #4a90e2;
    cursor: pointer;
  }
  .companiesAll-min-data> ul > li:nth-child(4) > span:nth-child(3) {
    color: gray;
    cursor: default;
  }
  /* 分页 */
  .block {
    position: absolute;
    bottom: 204px;
    right: 16px;
  }
  .gray {
    color: gray !important;
    cursor: default !important;
  }
</style>
