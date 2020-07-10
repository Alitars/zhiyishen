<template>
  <div class="totalTrademarks-container">
    <div class="totalTrademarks-box">
      <!-- 标题 -->
      <div class="totalTrademarks-title">
        <img src="/static/images/yuanqu21.png" alt="">
        <router-link class="totalTrademarks-center" tag="div" to="/personal">个人中心</router-link>
        <!-- <div class="totalTrademarks-center" tag="div" to="/personal">个人中心</div> -->
        <!-- 竖线 -->
        <div class="totalTrademarks-line"></div>
        <!-- 商标文字 -->
        <div class="totalTrademarks-text">{{this.$route.query.text}}</div>
        <!-- 公司 -->
        <div class="totalTrademarks-right">{{this.$route.query.click_type}}</div>
      </div>
      <!-- 主体 -->
      <div class="totalTrademarks-main">
        <div>
          <span>商标名称</span>
          <input type="text" placeholder="请输入" v-model="name">
          <span>注册号</span>
          <input type="text" placeholder="请输入" v-model="no">
          <span @click="search">查询</span>
          <span @click="resetting">重置</span>
        </div>
        <div>
          <span>商标总数</span>
          <span>{{total}}</span>
          <!-- <input type="text" placeholder="请输入" v-model="total" disabled="disabled"> -->
          <span @click="assets">导出商标</span>
        </div>
        <!-- 展示 -->
        <div class="totalTrademarks-main-category">
          <el-checkbox  @change="selectProduct(isSelectAll)" v-model="isSelectAll" class="totalTrademarks-main-category-checked"></el-checkbox>
          <ul>
            <li>商标图片</li>
            <!-- <li>商标名称</li> -->
            <li>注册号</li>
            <li>类别</li>
            <li>申请日期</li>
            <li>有效日期</li>
            <li>申请人</li>
            <li>商标状态</li>
            <li>操作</li>
          </ul>
        </div>
        <!-- 后台渲染数据 -->
        <div class="totalTrademarks-main-data" v-for="(item,index) in listData" :key="index">
          <el-checkbox v-model="item.isSelect" class="totalTrademarks-main-data-checked"></el-checkbox>
          <ul>
            <li @mouseenter="enter(index)">
              <img :src="'data:image/png;base64,'+item.BrandImg" alt=""  >
              <div v-show="imgShouw&&index==current"  @mouseleave="leave()">
                <img :src="'data:image/png;base64,'+item.BrandImg" alt="">
              </div>
            </li>
            <!-- <li :title="item.BrandName?item.BrandName:'无'">{{item.BrandName?item.BrandName:"无"}}</li> -->
            <li :title="item.RegId?item.RegId:'无'">{{item.RegId?item.RegId:'无'}}</li>
            <li :title="item.IntCls?item.IntCls:'无'">{{item.IntCls?item.IntCls:'无'}}</li>
            <li :title="item.AppDate?item.AppDate:'无'">{{item.AppDate?item.AppDate:'无'}}</li>
            <li :title="item.EffectiveEndDate?item.EffectiveEndDate:'无'">{{item.EffectiveEndDate?item.EffectiveEndDate:'无'}}</li>
            <li @click="jump(item.AppNewName)" :title="item.AppNewName?item.AppNewName:'无'">{{item.AppNewName?item.AppNewName:'无'}}</li>
            <li :title="item.BrandStatus?item.BrandStatus:'无'">{{item.BrandStatus?item.BrandStatus:'无'}}</li>
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
    name:'totalTrademarks',
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
          type:this.$route.query.id,
          name:this.name,
          no:this.no,
          page:this.currentPage1,
          len:this.pageSize,
        }).then( res => {
          // console.log(res)
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
      // 导出商标
      assets(){
        var prolist = this.listData.filter(function (val) { return val.isSelect});
        if(prolist.length == 0){
          this.$alert('请选择要导出的商标','温馨提醒',{
            confirmButtonText: '确定'
          })
           return false
        }
        var arr = ''
        for (var i = 0;i< prolist.length; i++) {
          arr+=prolist[i].RegId+',';
        }
        arr =  arr.substring(0,arr.length-1)
        this.$http.post(this.GLOBAL.base_url+'/api/assets/exportData',{
          user_id:this.$cookie.getCookie('u_id'),
          type:this.$route.query.id,
          no:arr,
          company:this.$route.query.click_type
        }).then( res => {
          // console.log(res)
          if(res.data.code == 0 ) {
            this.$alert('暂无导出商标','温馨提醒',{
              confirmButtonText: '确定'
            })
          }
          if(res.data.code == 1) {

            window.location.href = this.GLOBAL.base_url+res.data.data
          }
        })
      },
      todetail(value1,value2){
        let routeData = this.$router.resolve({
                      path: '/searchdetail',
                      query: {
                        RegId:value1,
                        IntCls:value2
                        }
        });
          window.open(routeData.href, '_blank');
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
      },
      // 公司个人
      jump(val){
        this.$router.push({
          path:'/personal/totalTrademark',
          query:{
            click_type:val
          }
        })
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
  .totalTrademarks-box {
    min-height: 950px;
    width: 1015px;
    float: left;
    margin: 12px 0 0 16px;
    box-sizing: border-box;
  }
  /* 标题 */
  .totalTrademarks-title {
    height: 70px;
    background-color: #fff;
    line-height: 70px;
    margin-bottom: 16px;
  }
  .totalTrademarks-title > img {
    float: left;
    margin: 23px 0px 0 20px;
  }
  .totalTrademarks-center {
    font-family: "PingFangSC";
    font-size: 24px;
    color: #f96006 ;
    float: left;
    margin: 0 24px 0 19px;
    cursor: pointer;
  }
  .totalTrademarks-line {
    width: 2px;
    height: 36px;
    background-color: #f96006;
    margin: 17px 18px 0px 0px;
    float: left;
  }
  .totalTrademarks-text {
    font-family: "PingFangSC";
    font-size: 24px;
    color: #f96006 ;
    float: left;
  }
  .totalTrademarks-right {
    float: right;
    font-family: "PingFangSC";
    font-size: 17px;
    color: #333;
    margin-right: 24px;
    font-weight: 500;
  }
  /* 主体 */
  .totalTrademarks-main {
    height: 978px;
    background-color: #fff;
    margin-bottom: 22px;
    padding-top: 1px;
    box-sizing: border-box;
    position: relative;
  }
  .totalTrademarks-main > div:first-child {
    margin:29px 0 24px 30px;
    height: 32px;
    line-height: 32px;
  }
  .totalTrademarks-main > div:first-child > span {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 500;
    /* color: #333333; */
    cursor: pointer;
  }
  .totalTrademarks-main > div:first-child > span:nth-child(1) {
    margin-right: 18px;
  }
  .totalTrademarks-main > div:first-child > input {
    width: 230px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    background-color:#fff;
    padding: 6px 0 6px 12px;
    box-sizing: border-box;
    margin-right: 30px;
  }
  .totalTrademarks-main > div:first-child > span:nth-child(3) {
    margin-right: 18px;
  }
  .totalTrademarks-main > div:first-child > span:nth-child(5) {
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
  .totalTrademarks-main > div:first-child > span:nth-child(6) {
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
  .totalTrademarks-main > div:nth-child(2) {
    margin:29px 0 24px 30px;
    height: 32px;
    line-height: 32px;
  }
  .totalTrademarks-main > div:nth-child(2) > span {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 500;
    /* color: #333333; */
    cursor: pointer;
  }
  .totalTrademarks-main > div:nth-child(2) > span:nth-child(1) {
    margin-right: 18px;
  }
  .totalTrademarks-main > div:nth-child(2) > span:nth-child(2) {
    font-size: 16px;
    color: #f96006;
    font-weight: 600;
  }
  .totalTrademarks-main > div:nth-child(2) > span:nth-child(3) {
    margin-right: 120px;
    width: 80px;
    height: 32px;
    border-radius: 4px;
    background-color:#f96006;
    /* display: inline-block; */
    line-height: 32px;
    text-align: center;
    color: #fff;
    float: right;
  }
  /* 展示 */
  .totalTrademarks-main-category {
    width: 953px;
    height: 36px;
    background-color: #fafafa;
    margin-left: 31px;
    border: solid 1px #eeeeee;
    line-height: 36px;
  }
  .totalTrademarks-main-category > .totalTrademarks-main-category-checked {
    margin: 0px 0px 0px 20px;
    float: left;
  }
  .totalTrademarks-main-category > ul {
    padding: 0;
    list-style: none;
  }
  .totalTrademarks-main-category > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-left: 30px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .totalTrademarks-main-category > ul > li:nth-child(1) {
    width: 60px;
    text-align: center;
  }
  .totalTrademarks-main-category > ul > li:nth-child(2) {
    width: 98px;
    text-align: center;
  }
  .totalTrademarks-main-category > ul > li:nth-child(3) {
    width: 93px;
    text-align: center;
  }
  .totalTrademarks-main-category > ul > li:nth-child(4) {
    width: 75px;
    text-align: center;
  }
  .totalTrademarks-main-category > ul > li:nth-child(5) {
    width: 75px;
    text-align: center;
  }
  .totalTrademarks-main-category > ul > li:nth-child(6) {
    width: 112px;
    text-align: center;
  }
  .totalTrademarks-main-category > ul > li:nth-child(7) {
    width: 112px;
    text-align: center;
  }
  .totalTrademarks-main-category > ul > li:nth-child(8) {
    width: 70px;
    text-align: center;
    margin-left: 12px;
  }
  .totalTrademarks-main-category > ul > li:nth-child(9) {
    width: 56px;
    text-align: center;
    margin-left: 12px;
  }
  .totalTrademarks-main-category > ul > li:nth-child(10) {
    width: 68px;
    text-align: center;
  }
  /* 后台渲染数据 */
  .totalTrademarks-main-data {
    width: 953px;
    height: 68px;
    margin-left: 31px;
    border: solid 1px #eeeeee;
    line-height: 68px;
    border-top: none ;
  }
  .totalTrademarks-main-data > .totalTrademarks-main-data-checked {
    margin: 0px 0px 0px 20px;
    float: left;
  }
  .totalTrademarks-main-data > ul {
    padding: 0;
    list-style: none;
    position: relative;
  }
  .totalTrademarks-main-data > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #333;
    margin-left: 30px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .totalTrademarks-main-data > ul > li:nth-child(1) {
    width: 60px;
    height: 60px;
    border:solid 1px #eeeeee ;
    margin-top: 4px;
    box-sizing: border-box;
  }
  .totalTrademarks-main-data > ul > li:nth-child(1) > img {
    width: 60px;
    height: 60px;
  }
  .totalTrademarks-main-data > ul > li:nth-child(1)>div {
    width: 180px;
    height: 180px;
    position: absolute;
    top: 0;
    left: 64px;
    z-index: 22;
  }

  .totalTrademarks-main-data > ul > li:nth-child(1)>div>img {
    width: 180px;
    height: 180px;
  }
  .totalTrademarks-main-data > ul > li:nth-child(2) {
    width: 98px;
    text-align: center;
  }
  .totalTrademarks-main-data > ul > li:nth-child(3) {
    width: 93px;
    text-align: center;
  }
  .totalTrademarks-main-data > ul > li:nth-child(4) {
    width: 75px;
    text-align: center;
  }
  .totalTrademarks-main-data > ul > li:nth-child(5) {
    width: 75px;
    text-align: center;
  }
  .totalTrademarks-main-data > ul > li:nth-child(6) {
    width: 112px;
    text-align: center;
    color: #4a90e2;
    cursor: pointer;
  }
  .totalTrademarks-main-data > ul > li:nth-child(7) {
    width: 112px;
    text-align: center;
  }
  .totalTrademarks-main-data > ul > li:nth-child(8) {
    width: 70px;
    text-align: center;
    color: #4a90e2;
    margin-left: 12px;
    cursor: pointer;
  }
  .totalTrademarks-main-data > ul > li:nth-child(9) {
    width: 56px;
    text-align: center;
    margin-left: 12px;
  }
  .totalTrademarks-main-data > ul > li:nth-child(7) > span:nth-child(1) {
    color: #4a90e2;
    cursor: pointer;
  }
  /* 分页 */
  .totalTrademarks-main > .block {
    position: absolute;
    bottom: 50px;
    right: 28px;
  }
</style>
