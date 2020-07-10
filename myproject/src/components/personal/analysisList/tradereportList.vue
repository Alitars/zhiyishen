<template>
  <div class="tradereportList-container">
    <div class="tradereportList-box">
        <div class="tradereportList-box-wrap">
            <!-- 头部 -->
            <div class="tradereportList-box-title">
                <div :class="changeStatus">
                    <div class="div1" @click="changeType('all')">全部订单</div>
                    <div class="div2" @click="changeType('wait')">待付款
                        <!-- <el-badge :value="nocount" class="item"></el-badge> -->
                    </div>
                    <div class="div3" @click="changeType('service')">评估中
                        <!-- <el-badge :value="servicecount" class="item"></el-badge> -->
                    </div>
                    <div class="div4" @click="changeType('finsh')">已完成</div>
                </div>
            </div>
            <!-- 搜索 -->
            <div class="tradereportList-search">
                <div class="search1">
                    <span>技术名称</span>
                    <input type="text">
                </div>
                <div class="search2">搜索</div>
            </div>
            <!-- 列表 -->
            <div class="tradereportList-list">
                <div class="tradereportList-list-title">
                    <div>订单编号</div>
                    <div>商标</div>
                    <div>价格</div>
                    <div>当前状态</div>
                    <div>操作</div>
                </div>
                <div class="tradereportList-list-detail">
                    <div v-for="(v,k) in 5">
                        <div>2020052816113760915</div>
                        <div>
                            <img src="/static/images/4.png" alt="">
                        </div>
                        <div>￥100.00</div>
                        <div>待付款</div>
                        <div class="list-do1">
                            <span @click="quiteorder">取消订单</span><span>|</span><span>去付款</span>
                        </div>
                        <!-- <div class="list-do2">查看报告</div> -->
                        <!-- <div class="list-do3">查看报告</div> -->
                    </div>
                </div>
            </div>
            <div class="tradereport-page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage1"
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
            <!-- 提示弹框 -->
                <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
                <span>请确认取消此订单吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="confireQuit">确 定</el-button>
                </span>
                </el-dialog>
        </div>
      
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script>
  export default {
    name:'tradereportList',
    data(){
      return {
        changeStatus:'all',
        total:0,
        currentPage1: 1,
        pageSize: 5,
        dialogVisible:false
      }
    },
    methods:{
      changeType(value){
          if(this.changeStatus != value){
              this.currentPage1 = 1;
          }
          var url = location.search;
            if (url.indexOf("?") != -1) {
                var str = url.substr(1),
                strs = str.split("=");
                }
                strs[1] = value;
                var host = window.location.host;
               window.location.href='http://'+host+"/personal/tradereportList?status="+strs[1];
               this.changeStatus = this.$route.query.status;
                if(this.changeStatus == value){
                    
                }
      },
      //   分页处理
      handleSizeChange(val) {
              this.pageSize = val;
              
            },

        handleCurrentChange(val) {
            this.currentPage1 = val;
            
        },
        quiteorder(){
            this.dialogVisible=true
        },
        confireQuit(){
        this.dialogVisible=false
        this.$http.post(this.GLOBAL.base_url+'/api/',{
          user_id:this.$cookie.getCookie('u_id'),
          
        }).then(res => {
          
        })
      },
    },
    mounted(){
      this.changeStatus = this.$route.query.status;
    }
  }
</script>

<style scoped>
  .tradereportList-box {
    width: 1015px;
    float: left;
    margin-left: 16px;
    min-height: 950px;
    background-color: #fff;
    margin-top: 12px;
    padding-top: 32px;
    padding-bottom: 64px;
    box-sizing: border-box;
  }
  .tradereportList-box-wrap{
      width: 887px;
      margin: 0 auto;
  }
  .tradereportList-box-title{
      height: 25px;
      margin-bottom: 16px;
  }
    .tradereportList-box-title>div{
        height: 25px;
        border-bottom: solid 1px #eeeeee;
    }
    .tradereportList-box-title>div>div{
        float: left;
        width: 60px;
        font-size: 14px;
        height: 25px;
        text-align: center;
        color: #666666;
        margin-right: 40px;
        cursor: pointer;
    }
  .all .div1,.wait .div2,.service .div3,.finsh .div4{
    border-bottom:1px solid  #353535;
    font-weight: 500;
    color: #000000;
  }
  .tradereportList-search{
      margin-left: 33px;
      margin-bottom: 37px;
      height: 36px;
  }
  .tradereportList-search>div{
      float: left;
  }
  .search1>span{
      font-size: 14px;
  }
  .search1>input{
      width: 266px;
      height: 34px;
      border-radius: 4px;
      padding-left: 12px;
      border: solid 1px #d6d6d6;
      outline: none;
      margin-left: 16px;
  }
  .search2{
      width: 80px;
      height: 36px;
      border-radius: 4px;
      background: url(/static/images/invalid-name1f.png) no-repeat;
      background-size: cover;
      color: white;
      text-align: center;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
  }
  .tradereportList-list{
      margin-left: 34px;
      width: 820px;
      margin-bottom: 30px;
      /* height: 760px;
      border:1px solid red; */
  }
  .tradereportList-list-title{
      height: 34px;
      background-color: #fafafa;
      border: solid 1px #d6d6d6;
  }
  .tradereportList-list-title>div{
      width: 163px;
      float: left;
      line-height: 34px;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
  }
  .tradereportList-list-detail>div{
      height: 144px;
      border: 1px solid #d6d6d6;
      border-top: none;
  }
  .tradereportList-list-detail>div>div{
      float: left;
      width: 163px;
      height: 144px;
      line-height: 144px;
      text-align: center;
      font-size: 14px;
      font-weight: 100;
  }
  .tradereportList-list-detail>div>div>img{
      width: 120px;
      height: 120px;
      margin-top: 12px;
  }
  .tradereportList-list-detail>div>div:nth-of-type(3){
      color: #f96006;
  }
  .list-do1>span:nth-of-type(1){
      color: #4a90e2;
      cursor: pointer;
  }
  .list-do1>span:nth-of-type(2){
      margin: 0 5px;
  }
  .list-do1>span:nth-of-type(3){
      color: #f96006;
      cursor: pointer;
  }
  .list-do2{
      font-size: 14px;
      font-weight: 100;
      text-align: center;
      color: #999999;
  }
  .list-do3{
      font-size: 14px;
      font-weight: 100;
      text-align: center;
      color: #4a90e2;
      cursor: pointer;
  }
  .tradereport-page{
      width: 820px;
      text-align: center;
  }
</style>
